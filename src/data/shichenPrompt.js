// 时辰反推 AI 提示词系统（基于五行/十神特征向量相似度算法）
// 算法流程：
//   Step 1: 生成12个命盘（子~亥）
//   Step 2: 计算命盘特征向量（五行 + 十神 + 标签）
//   Step 3: 用户问卷 → 特征向量
//   Step 4: 相似度计算（cosine_similarity 或 dot product）
//   Step 5: 排序输出
//   Step 6: 概率归一化

import { QUESTION_DIMENSIONS } from './shichenQuestions';

/**
 * 十二时辰基础信息
 */
export const SHICHEN_INFO = {
  '子': { time: '23:00-01:00', element: '水', direction: '正北', traits: '夜半，阳气初生' },
  '丑': { time: '01:00-03:00', element: '土', direction: '东北偏北', traits: '鸡鸣，万物始萌' },
  '寅': { time: '03:00-05:00', element: '木', direction: '东北偏东', traits: '平旦，黎明破晓' },
  '卯': { time: '05:00-07:00', element: '木', direction: '正东', traits: '日出，万物萌动' },
  '辰': { time: '07:00-09:00', element: '土', direction: '东南偏东', traits: '食时，群龙行雨' },
  '巳': { time: '09:00-11:00', element: '火', direction: '东南偏南', traits: '隅中，蛇出洞行' },
  '午': { time: '11:00-13:00', element: '火', direction: '正南', traits: '日中，阳气至极' },
  '未': { time: '13:00-15:00', element: '土', direction: '西南偏南', traits: '日昳，羊出觅食' },
  '申': { time: '15:00-17:00', element: '金', direction: '西南偏西', traits: '哺时，猿啼日斜' },
  '酉': { time: '17:00-19:00', element: '金', direction: '正西', traits: '日入，鸡归巢息' },
  '戌': { time: '19:00-21:00', element: '土', direction: '西北偏西', traits: '黄昏，犬守夜始' },
  '亥': { time: '21:00-23:00', element: '水', direction: '西北偏北', traits: '人定，万物静寂' }
};

/**
 * 算法逻辑说明（供AI参考）
 */
const ALGORITHM_GUIDE = `
## 时辰推算算法（核心逻辑）

### Step 1：生成12个命盘
对每个时辰（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥），
结合用户出生年月日，生成对应的八字命盘。

### Step 2：计算命盘特征向量
每个命盘转化为特征向量：
{
  "五行": {"木":2,"火":3,"土":1,"金":2,"水":2},
  "十神": {"财":2,"官":1,"印":3,"食伤":2,"比劫":1},
  "标签": ["身强","食伤旺","偏财"]
}

### Step 3：用户问卷 → 特征向量
用户每道题的选择对应一组五行/十神映射，累计所有已答题目的映射值，
形成用户特征向量：
{
  "五行": {"火":4,"水":2,"木":1,"金":1,"土":2},
  "十神": {"食伤":5,"印":3,"官杀":1,"财":2,"比劫":1}
}

### Step 4：相似度计算
对每个时辰的命盘特征向量与用户特征向量计算相似度：
- 标准版：score = cosine_similarity(user_vector, bazi_vector)
- 简化版：score = sum(user[i] * bazi[i])  （点积）

### Step 5：排序输出
按相似度从高到低排序，取前3个时辰为候选。

### Step 6：概率归一化
prob[时辰] = score[时辰] / sum(所有时辰的score)
转换为概率百分比。

### 四维度权重
- 性格维度（Q1-Q10）：权重 0.30
- 感情维度（Q11-Q18）：权重 0.25
- 财运维度（Q19-Q24）：权重 0.25
- 事业维度（Q25-Q30）：权重 0.20
若某维度完全未答，该维度权重归零，剩余维度按比例重新分配。
`;

/**
 * 构建用户基本信息文本
 */
function buildUserInfo(userInfo) {
  return `
## 被测算人基本信息
- 姓名：${userInfo.name}
- 性别：${userInfo.gender}
- 出生日期：${userInfo.year}年${userInfo.month}月${userInfo.day}日
- 出生城市：${userInfo.city}
- 模糊出生时段：${userInfo.fuzzyTime}
`;
}

/**
 * 从答题数据构建用户特征向量
 */
function buildUserVector(answers, allQuestions) {
  const elements = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  const gods = {};

  allQuestions.forEach(q => {
    const answer = answers[q.id];
    if (!answer) return;

    const option = q.options.find(o => o.value === answer);
    if (!option || !option.mapping) return;

    if (option.mapping.elements) {
      Object.entries(option.mapping.elements).forEach(([key, val]) => {
        if (elements[key] !== undefined) {
          elements[key] += val;
        }
      });
    }

    if (option.mapping.gods) {
      Object.entries(option.mapping.gods).forEach(([key, val]) => {
        gods[key] = (gods[key] || 0) + val;
      });
    }
  });

  // 生成标签
  const tags = [];
  const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
  if (sortedElements[0][1] > 0) tags.push(`${sortedElements[0][0]}旺`);
  const sortedGods = Object.entries(gods).sort((a, b) => b[1] - a[1]);
  if (sortedGods[0] && sortedGods[0][1] > 0) tags.push(`${sortedGods[0][0]}旺`);

  return { elements, gods, tags };
}

/**
 * 构建答题数据文本（含特征向量）
 */
function buildAnswerData(answers, allQuestions) {
  const answeredQuestions = allQuestions.filter(q => answers[q.id]);
  const unansweredQuestions = allQuestions.filter(q => !answers[q.id]);
  const answeredCount = answeredQuestions.length;
  const totalCount = allQuestions.length;

  // 按维度统计
  const dimensions = {};
  Object.entries(QUESTION_DIMENSIONS).forEach(([key, dim]) => {
    dimensions[key] = {
      name: dim.name,
      weight: dim.weight,
      answered: 0,
      total: dim.idRange[1] - dim.idRange[0] + 1,
      questions: []
    };
  });

  answeredQuestions.forEach(q => {
    let dimKey;
    if (q.id <= 10) dimKey = 'personality';
    else if (q.id <= 18) dimKey = 'relationship';
    else if (q.id <= 24) dimKey = 'wealth';
    else dimKey = 'career';

    const dim = dimensions[dimKey];
    dim.answered++;
    const option = q.options.find(o => o.value === answers[q.id]);
    dim.questions.push({
      id: q.id,
      question: q.question,
      answer: answers[q.id],
      answerLabel: option?.label || '未知',
      mapping: option?.mapping || {}
    });
  });

  // 构建用户特征向量
  const userVector = buildUserVector(answers, allQuestions);

  let text = `
## 答题情况总览
- 已答题数：${answeredCount} / ${totalCount}
- 答题率：${((answeredCount / totalCount) * 100).toFixed(1)}%
`;

  Object.values(dimensions).forEach(dim => {
    text += `- ${dim.name}：已答${dim.answered}/${dim.total}题（权重${dim.weight}）\n`;
  });

  text += `
## 用户特征向量（由问卷映射累计得出）
五行：${JSON.stringify(userVector.elements)}
十神：${JSON.stringify(userVector.gods)}
标签：${JSON.stringify(userVector.tags)}
`;

  if (answeredCount > 0) {
    text += '\n## 已答题目明细\n';
    Object.entries(dimensions).forEach(([key, dim]) => {
      if (dim.questions.length > 0) {
        text += `\n### ${dim.name}（${dim.answered}/${dim.total}题，权重${dim.weight}）\n`;
        dim.questions.forEach(item => {
          text += `第${item.id}题：${item.question}\n`;
          text += `  选项：${item.answer}（${item.answerLabel}）\n`;
          text += `  命理映射：${JSON.stringify(item.mapping)}\n`;
        });
      } else {
        text += `\n### ${dim.name}（0/${dim.total}题）\n未作答\n`;
      }
    });
  }

  if (unansweredQuestions.length > 0) {
    text += '\n## 未答题目列表\n';
    text += unansweredQuestions.map(q => `第${q.id}题：${q.question}`).join('\n');
  }

  return text;
}

/**
 * 根据答题数量构建置信度说明
 */
function buildConfidenceNote(answeredCount) {
  if (answeredCount === 0) {
    return `
## 置信度说明
用户未答任何题目，仅根据模糊出生时段进行推算。
- 预估误差范围：2-4小时
- 置信度等级：低（仅参考）
- 推算方式：仅依据模糊时段（上午/下午/夜里/完全不清楚）对应2-3个时辰范围，取中位值
- 特征向量全为0，无法做相似度计算，退化为模糊时段匹配
`;
  } else if (answeredCount <= 8) {
    return `
## 置信度说明
用户答题量较少（${answeredCount}题），特征向量数据不足。
- 预估误差范围：1-2小时
- 置信度等级：中低
- 推算方式：基于已答题目的五行/十神映射构建不完整特征向量，结合模糊时段辅助缩小范围
- 注意：特征向量维度不全会影响相似度计算的准确性
`;
  } else if (answeredCount <= 18) {
    return `
## 置信度说明
用户答题量中等（${answeredCount}题），特征向量有一定代表性。
- 预估误差范围：30分钟-1小时
- 置信度等级：中
- 推算方式：多维度特征向量与12命盘做相似度计算，已答维度加权后取最佳匹配
`;
  } else if (answeredCount < 30) {
    return `
## 置信度说明
用户答题量较充足（${answeredCount}题），特征向量代表性较强。
- 预估误差范围：15-30分钟
- 置信度等级：中高
- 推算方式：四维度特征向量与12命盘做相似度计算，未答维度不影响整体判断
`;
  } else {
    return `
## 置信度说明
用户答题量完整（${answeredCount}题），特征向量数据充分。
- 预估误差范围：5-15分钟
- 置信度等级：高
- 推算方式：四维度全覆盖，特征向量与12命盘做完整相似度计算，多维度交叉验证
`;
  }
}

/**
 * 构建系统提示词（System Prompt）
 */
export function buildSystemPrompt() {
  return `你是一名专业八字命理师，精通五行、十神命理体系，擅长根据用户问卷特征向量与十二时辰命盘的相似度计算，反推出生时辰。

${ALGORITHM_GUIDE}

## 十二时辰对照
子(23:00-01:00)水 丑(01:00-03:00)土 寅(03:00-05:00)木 卯(05:00-07:00)木
辰(07:00-09:00)土 巳(09:00-11:00)火 午(11:00-13:00)火 未(13:00-15:00)土
申(15:00-17:00)金 酉(17:00-19:00)金 戌(19:00-21:00)土 亥(21:00-23:00)水

## 五行十神对照
五行：木、火、土、金、水
十神：食伤（食神+伤官）、印（正印+偏印）、官杀（正官+七杀）、财（正财+偏财）、比劫（比肩+劫财）
特殊标签：桃花、财库、命局平、财弱、无财、官印、食伤生财

## 推算步骤
1. 根据用户出生年月日，为12个时辰各生成一个八字命盘
2. 计算每个命盘的特征向量（五行分布+十神分布+标签）
3. 将用户问卷答案转化为用户特征向量（五行+十神）
4. 计算用户特征向量与12个命盘特征向量的相似度
5. 按相似度排序，取前3个时辰为候选
6. 概率归一化，输出匹配度百分比

## 模糊出生时段辅助
- "上午" → 辰(07-09)/巳(09-11)/午(11-13) 额外加分
- "下午" → 未(13-15)/申(15-17)/酉(17-19) 额外加分
- "夜里" → 戌(19-21)/亥(21-23)/子(23-01)/丑(01-03) 额外加分
- "完全不清楚" → 不额外加分，纯靠特征向量相似度

## 输出格式（严格JSON）
{
  "most_likely_shichen": "辰",
  "most_likely_time": "07:00-09:00",
  "most_likely_range": "07:30-08:15",
  "second_likely_shichen": "巳",
  "second_likely_time": "09:00-11:00",
  "third_likely_shichen": "午",
  "third_likely_time": "11:00-13:00",
  "confidence": 85,
  "shichen_scores": {
    "子": 0.08, "丑": 0.05, "寅": 0.10, "卯": 0.07,
    "辰": 0.22, "巳": 0.18, "午": 0.12, "未": 0.06,
    "申": 0.04, "酉": 0.03, "戌": 0.02, "亥": 0.03
  },
  "user_vector": {
    "五行": {"木":1,"火":4,"土":2,"金":1,"水":2},
    "十神": {"食伤":5,"印":3,"官杀":1,"财":2,"比劫":1},
    "标签": ["火旺","食伤旺"]
  },
  "dimension_analysis": {
    "personality": { "answered": 10, "weight": 0.30, "top_elements": "火", "top_gods": "食伤" },
    "relationship": { "answered": 8, "weight": 0.25, "top_elements": "火", "top_gods": "食伤" },
    "wealth": { "answered": 5, "weight": 0.25, "top_gods": "正财" },
    "career": { "answered": 5, "weight": 0.20, "top_gods": "食伤" }
  },
  "fuzzy_time_adjustment": "上午时段加分至辰/巳/午时",
  "confidence_level": "中高",
  "error_range": "15-30分钟",
  "analysis_summary": "综合特征向量相似度计算，辰时命盘（土旺、食伤得令）与用户特征向量（火旺、食伤旺）相似度最高(0.22)。性格维度火/食伤主导与辰时乙木日主食伤吐秀格局高度匹配；感情维度食伤旺对应辰时伤官生财格局；财运维度正财指向辰时财星有根。结合用户自述上午出生，辰时(07-09)在上午范围内，综合匹配度最高。",
  "risk_warning": "用户答题率约93%，事业维度有1题未答，对整体判断影响较小。建议结合实际出生时段进一步确认。"
}

## 重要约束
1. 必须输出完整JSON，不要输出JSON以外的内容
2. confidence取值0-100，根据答题数量和特征向量一致性动态计算
3. shichen_scores中十二个时辰的得分总和应为1.0（概率归一化）
4. 如用户跳过所有题目，特征向量全为0，退化为模糊时段匹配，confidence不超过30
5. analysis_summary需结合五行/十神具体分析，不能泛泛而谈，必须具体到命理格局
6. risk_warning需指出数据不足或异常情况`;
}

/**
 * 构建用户提示词（User Prompt）- 动态根据答题情况生成
 */
export function buildUserPrompt(userInfo, answers, allQuestions) {
  const answeredCount = Object.keys(answers).length;
  const userInfoText = buildUserInfo(userInfo);
  const answerDataText = buildAnswerData(answers, allQuestions);
  const confidenceText = buildConfidenceNote(answeredCount);

  let scenarioInstruction = '';

  if (answeredCount === 0) {
    scenarioInstruction = `
## 场景：用户跳过全部答题
用户未回答任何题目，仅提供了基本信息和模糊出生时段。
特征向量全为0，无法进行相似度计算。
请仅根据模糊时段推算最可能的时辰：
- 上午 → 辰/巳/午三选一，取辰时（覆盖概率最高）
- 下午 → 未/申/酉三选一，取申时
- 夜里 → 戌/亥/子/丑四选一，取子时
- 完全不清楚 → 十二时辰均分，取卯时（居中位置）

confidence不超过30，error_range为"2-4小时"。
shichen_scores退化为模糊时段范围内的均分。
analysis_summary简要说明仅依据模糊时段推算，特征向量不足。
`;
  } else if (answeredCount <= 8) {
    const dimsAnswered = countDimensionsAnswered(answers);
    scenarioInstruction = `
## 场景：用户部分答题（答题量不足1/3）
用户仅回答了${answeredCount}道题，已答维度：${dimsAnswered}。
特征向量数据不足，部分五行/十神维度为0。
处理策略：
1. 基于已答题目的映射构建不完整特征向量
2. 未答维度的权重归零，已答维度按比例重新分配权重
3. 模糊时段权重提升至辅助验证
4. 相似度计算时注意特征向量不完整对结果的影响
5. confidence不超过60
6. analysis_summary需明确指出特征向量不完整的影响
`;
  } else if (answeredCount <= 18) {
    scenarioInstruction = `
## 场景：用户部分答题（答题量1/3-2/3）
用户回答了${answeredCount}道题，有一定数据基础。
处理策略：
1. 正常构建特征向量，已答维度的映射值正常累计
2. 如某一维度完全未答，该维度权重归零，剩余维度按比例重新分配
3. 如四个维度均有答题但不完整，正常计算
4. 模糊时段作为辅助约束
5. confidence可至75
6. analysis_summary需指出哪些维度数据缺失及影响
`;
  } else if (answeredCount < 30) {
    scenarioInstruction = `
## 场景：用户大部分答题（答题量2/3以上）
用户回答了${answeredCount}道题，特征向量代表性较强。
处理策略：
1. 正常构建特征向量，四维度均有数据
2. 未答的个别题目不影响整体特征向量
3. confidence可至80-90
4. analysis_summary侧重于四维度特征向量的一致性分析
`;
  } else {
    scenarioInstruction = `
## 场景：用户全部答题
用户回答了全部30道题，特征向量数据完整。
处理策略：
1. 完整构建特征向量，四维度权重 0.30/0.25/0.25/0.20
2. 重点分析四维度特征向量与12命盘的相似度排序
3. 如四维度特征一致指向同一时辰，confidence可达90+
4. 如四维度特征分散，取加权最高者，confidence适当下调
5. analysis_summary需详细说明五行/十神的指向一致性或分歧
`;
  }

  return `${userInfoText}${answerDataText}${confidenceText}${scenarioInstruction}

请根据以上信息，按照特征向量相似度算法，推算最可能的出生时辰并输出结构化JSON结果。`;
}

/**
 * 统计已答维度
 */
function countDimensionsAnswered(answers) {
  const dims = [];
  Object.entries(QUESTION_DIMENSIONS).forEach(([key, dim]) => {
    const [min, max] = dim.idRange;
    const answered = Object.keys(answers).some(id => {
      const numId = parseInt(id);
      return numId >= min && numId <= max;
    });
    if (answered) dims.push(dim.name);
  });
  return dims.join('、') || '无';
}

/**
 * 构建单时辰评估提示词（第一阶段Prompt）
 * 用于评估单个时辰命盘与用户特征的匹配度
 */
export function buildPerHourPrompt(userInfo, answers, allQuestions, hour, baziFeatures) {
  const userVector = buildUserVector(answers, allQuestions);
  const answeredCount = Object.keys(answers).length;

  return `你是一名专业八字命理师。用户出生信息：
- 出生日期：${userInfo.year}年${userInfo.month}月${userInfo.day}日
- 候选时辰：${hour}（${SHICHEN_INFO[hour]?.time || ''}）
- 命盘特征：${JSON.stringify(baziFeatures)}

用户特征向量：
- 五行：${JSON.stringify(userVector.elements)}
- 十神：${JSON.stringify(userVector.gods)}
- 标签：${JSON.stringify(userVector.tags)}
- 已答题数：${answeredCount}/30

请完成以下任务：
1. 判断该时辰命盘是否符合用户特征向量
2. 给出匹配程度（0-100）
3. 分析匹配原因（必须具体到五行/十神的生克关系）
4. 指出不匹配点
5. 给出结论（是否推荐该时辰）

要求：
- 必须结合命理逻辑（五行生克/十神关系）
- 不能模糊
- 必须具体到行为或经历

输出JSON：
{
  "shichen": "${hour}",
  "match_score": 0,
  "match_reasons": [],
  "mismatch_points": [],
  "recommendation": true,
  "conclusion": ""
}`;
}

/**
 * 构建最终汇总提示词（第二阶段Prompt）
 * 用于汇总12个时辰的评估结果，输出最终推荐
 */
export function buildFinalSummaryPrompt(userInfo, hourResults) {
  const validResults = hourResults.filter(r => r !== null);

  return `以下是12个时辰的匹配结果：
${JSON.stringify(validResults, null, 2)}

用户基本信息：
- 姓名：${userInfo.name}
- 性别：${userInfo.gender}
- 出生日期：${userInfo.year}年${userInfo.month}月${userInfo.day}日
- 模糊出生时段：${userInfo.fuzzyTime}

请输出：
1. 最可能的3个时辰（按匹配度排序）
2. 每个时辰的匹配度
3. 推荐最优时辰（必须给理由）
4. 风险提示（说明不确定性）

要求：
- 语言自然、有说服力
- 有"被理解"的感觉
- 结合命理逻辑给出专业分析

输出JSON：
{
  "most_likely_shichen": "",
  "most_likely_time": "",
  "most_likely_range": "",
  "second_likely_shichen": "",
  "second_likely_time": "",
  "third_likely_shichen": "",
  "third_likely_time": "",
  "confidence": 0,
  "shichen_scores": {},
  "confidence_level": "",
  "error_range": "",
  "analysis_summary": "",
  "risk_warning": ""
}`;
}

/**
 * 一键生成完整提示词
 */
export function generateShichenPrompt(userInfo, answers, allQuestions) {
  return {
    system: buildSystemPrompt(),
    user: buildUserPrompt(userInfo, answers, allQuestions)
  };
}
