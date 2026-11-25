// 财运自测题目
export const CAIYUN_QUESTIONS = [
  {
    id: 1,
    question: '你目前的储蓄状况是？',
    options: [
      { value: 'A', label: '有不少积蓄，投资理财都有', score: 3 },
      { value: 'B', label: '有一些存款，但不多', score: 2 },
      { value: 'C', label: '月光族，基本存不下钱', score: 1 },
      { value: 'D', label: '负债状态', score: 0 },
    ]
  },
  {
    id: 2,
    question: '你对投资理财的态度是？',
    options: [
      { value: 'A', label: '非常积极，经常研究', score: 3 },
      { value: 'B', label: '偶尔关注，有合适的就投', score: 2 },
      { value: 'C', label: '不太懂，存银行最安全', score: 1 },
      { value: 'D', label: '完全不关心', score: 0 },
    ]
  },
  {
    id: 3,
    question: '过去一年你的收入变化是？',
    options: [
      { value: 'A', label: '大幅增长，超过30%', score: 3 },
      { value: 'B', label: '稳步增长，10-30%', score: 2 },
      { value: 'C', label: '基本持平', score: 1 },
      { value: 'D', label: '有所下降', score: 0 },
    ]
  },
  {
    id: 4,
    question: '你有几份收入来源？',
    options: [
      { value: 'A', label: '3份以上（工资+投资+副业等）', score: 3 },
      { value: 'B', label: '2份（工资+投资/副业）', score: 2 },
      { value: 'C', label: '只有工资收入', score: 1 },
      { value: 'D', label: '目前没有稳定收入', score: 0 },
    ]
  },
  {
    id: 5,
    question: '你花钱的习惯是？',
    options: [
      { value: 'A', label: '很节俭，每笔钱都有规划', score: 3 },
      { value: 'B', label: '比较理性，该花就花', score: 2 },
      { value: 'C', label: '比较大手大脚', score: 1 },
      { value: 'D', label: '经常冲动消费、超前消费', score: 0 },
    ]
  },
  {
    id: 6,
    question: '你最近有没有意外之财（奖金、中奖、涨薪等）？',
    options: [
      { value: 'A', label: '有，而且金额不小', score: 3 },
      { value: 'B', label: '有一些小的意外收入', score: 2 },
      { value: 'C', label: '很少，几乎没有', score: 1 },
      { value: 'D', label: '不但没有，还破财了', score: 0 },
    ]
  },
  {
    id: 7,
    question: '你身边的贵人（能带你赚钱的人）多吗？',
    options: [
      { value: 'A', label: '很多，经常有人指点机会', score: 3 },
      { value: 'B', label: '有几个', score: 2 },
      { value: 'C', label: '很少', score: 1 },
      { value: 'D', label: '基本没有', score: 0 },
    ]
  },
  {
    id: 8,
    question: '你对买房/买车等大额消费的规划是？',
    options: [
      { value: 'A', label: '已经实现，正在规划下一个目标', score: 3 },
      { value: 'B', label: '有明确规划，正在攒钱', score: 2 },
      { value: 'C', label: '想过，但感觉很遥远', score: 1 },
      { value: 'D', label: '完全没考虑过', score: 0 },
    ]
  },
  {
    id: 9,
    question: '你觉得自己的财运如何？',
    options: [
      { value: 'A', label: '很好，赚钱对我来说不难', score: 3 },
      { value: 'B', label: '一般，够花但存不多', score: 2 },
      { value: 'C', label: '不好，总感觉缺钱', score: 1 },
      { value: 'D', label: '很差，经常入不敷出', score: 0 },
    ]
  },
  {
    id: 10,
    question: '如果有一笔闲钱，你会怎么处理？',
    options: [
      { value: 'A', label: '分散投资，稳健增值', score: 3 },
      { value: 'B', label: '存起来备用', score: 2 },
      { value: 'C', label: '买点自己喜欢的东西', score: 1 },
      { value: 'D', label: '全部花掉享受生活', score: 0 },
    ]
  },
];

// 财运结果
export function getCaiyunResult(score) {
  if (score >= 25) {
    return {
      level: '旺',
      color: 'green',
      title: '财运旺盛',
      summary: '你的财运非常好，收入稳定增长，投资理财也有不错的收益。继续保持这种势头，财富会越来越多。',
      advice: '建议继续多元化投资，同时注意风险管理。可以考虑增加长期稳健型投资的比例。',
    };
  } else if (score >= 18) {
    return {
      level: '平',
      color: 'gold',
      title: '财运平稳',
      summary: '你的财运处于中等水平，收入稳定但增长有限。有一定的储蓄意识，但还需要更好的财务规划。',
      advice: '建议学习更多理财知识，合理规划收支，尝试一些稳健的投资方式，让钱生钱。',
    };
  } else if (score >= 10) {
    return {
      level: '弱',
      color: 'orange',
      title: '财运偏弱',
      summary: '你的财运目前不太理想，收入增长缓慢，花钱也比较随意。需要加强理财意识，改善财务状况。',
      advice: '建议先从记账开始，了解自己的钱花在哪里。减少不必要的开支，强制储蓄，先积累第一桶金。',
    };
  } else {
    return {
      level: '差',
      color: 'red',
      title: '财运较差',
      summary: '你的财运目前比较差，可能处于负债或收入不稳定的状态。需要尽快改变现状，否则会越来越困难。',
      advice: '建议优先还清高息债务，找到稳定的收入来源。可以考虑发展副业增加收入，同时严格控制开支。',
    };
  }
}

// 性格速测（基于五行）
export function getXinggeResult(wuxingType) {
  const results = {
    '金': {
      traits: ['刚毅果断', '讲义气', '有领导力', '自尊心强', '追求完美'],
      strengths: '意志坚定，有决断力，做事有条理，能够承担责任，容易在事业上取得成功。',
      weaknesses: '性格偏硬，容易固执己见，不够圆融，人际关系可能比较紧张。',
      career: '适合管理、法律、金融、机械等需要决断力和条理性的工作。',
      advice: '学会柔软和变通，多倾听他人意见，刚柔并济才能走得更远。',
    },
    '木': {
      traits: ['仁慈善良', '有上进心', '喜欢学习', '性格直爽', '有创造力'],
      strengths: '心地善良，乐于助人，学习能力强，有创新精神，人脉通常不错。',
      weaknesses: '有时过于理想主义，可能不切实际，容易轻信他人。',
      career: '适合教育、文化、艺术、设计、新媒体等需要创意和表达的工作。',
      advice: '脚踏实地，学会辨别真伪，在善良的同时保护好自己。',
    },
    '水': {
      traits: ['聪明机智', '灵活变通', '心思细腻', '适应力强', '有智慧'],
      strengths: '智商高，反应快，适应能力强，善于处理复杂问题，学习能力出众。',
      weaknesses: '可能不够稳定，容易三心二意，情绪起伏较大，有时缺乏恒心。',
      career: '适合科研、IT、咨询、贸易等需要智慧和灵活性的工作。',
      advice: '培养专注力和毅力，选定方向后坚持下去，你的聪明才智才能真正发挥。',
    },
    '火': {
      traits: ['热情开朗', '有冲劲', '表达力强', '有魅力', '积极向上'],
      strengths: '充满激情和活力，感染力强，善于表达，社交能力出众，容易成为焦点。',
      weaknesses: '有时过于急躁，容易冲动行事，耐心不足，可能三分钟热度。',
      career: '适合销售、公关、演艺、教育等需要热情和表达的工作。',
      advice: '学会冷静和耐心，做决定前多思考，冲动是魔鬼，稳扎稳打才能成大事。',
    },
    '土': {
      traits: ['稳重踏实', '有责任感', '诚实守信', '有耐心', '重情重义'],
      strengths: '踏实可靠，值得信赖，有恒心有毅力，做事有始有终，是很好的合作伙伴。',
      weaknesses: '可能过于保守，不太愿意改变，适应新环境较慢，有时显得固执。',
      career: '适合行政、财务、建筑、农业等需要稳重和耐心的工作。',
      advice: '适当走出舒适区，拥抱变化和新事物，在稳定的基础上寻求突破。',
    },
  };
  
  return results[wuxingType] || results['土'];
}
