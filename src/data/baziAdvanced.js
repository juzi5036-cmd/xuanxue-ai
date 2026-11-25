// 八字高级分析数据与算法
// 基于 bazi.js 的基础数据，提供大运、流年、格局、刑冲合害等高级分析功能

import {
  TIAN_GAN,
  DI_ZHI,
  SHENG_XIAO,
  WU_XING,
  TIAN_GAN_WU_XING,
  DI_ZHI_WU_XING,
  DI_ZHI_CANG_GAN,
  NA_YIN,
  calculateShiShen,
  getMonthPillar,
  getYearPillar
} from './bazi.js';

// ============================================================
// 一、基础辅助数据与函数
// ============================================================

// 天干阴阳：奇数位(0,2,4,6,8)为阳，偶数位(1,3,5,7,9)为阴
export const TIAN_GAN_YIN_YANG = {
  '甲': '阳', '乙': '阴',
  '丙': '阳', '丁': '阴',
  '戊': '阳', '己': '阴',
  '庚': '阳', '辛': '阴',
  '壬': '阳', '癸': '阴'
};

// 地支阴阳
export const DI_ZHI_YIN_YANG = {
  '子': '阳', '丑': '阴',
  '寅': '阳', '卯': '阴',
  '辰': '阳', '巳': '阴',
  '午': '阳', '未': '阴',
  '申': '阳', '酉': '阴',
  '戌': '阳', '亥': '阴'
};

// 五行相生
const WU_XING_SHENG = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };

// 五行相克
const WU_XING_KE = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

// 获取两个五行的关系（以a为主体）
function getWuXingRelation(a, b) {
  if (a === b) return 'same';        // 同我（比劫）
  if (WU_XING_SHENG[a] === b) return 'sheng';  // 我生（食伤）
  if (WU_XING_KE[a] === b) return 'ke';       // 我克（财星）
  if (WU_XING_SHENG[b] === a) return 'bei-sheng'; // 生我（印星）
  if (WU_XING_KE[b] === a) return 'bei-ke';    // 克我（官杀）
  return '';
}

// 五行关系对应的十神大类
const WUXING_RELATION_TO_SHISHEN_GROUP = {
  'same': '比劫运',
  'sheng': '食伤运',
  'ke': '财星运',
  'bei-sheng': '印星运',
  'bei-ke': '官杀运'
};

// ============================================================
// 二、十年大运计算
// ============================================================

/**
 * 计算十年大运
 * @param {number} year - 出生年
 * @param {number} month - 出生月
 * @param {number} day - 出生日
 * @param {number} hour - 出生时
 * @param {string} gender - 性别 '男' | '女'
 * @param {number} startAge - 起始年龄（默认0岁起排）
 * @returns {Array} 8步大运数组
 */
export function calculateDaYun(year, month, day, hour, gender, startAge = 0) {
  // 1. 获取月柱
  const monthPillar = getMonthPillar(year, month, day);
  const monthGanIndex = TIAN_GAN.indexOf(monthPillar.gan);
  const monthZhiIndex = DI_ZHI.indexOf(monthPillar.zhi);
  
  // 2. 获取年干判断阴阳，确定顺排还是逆排
  const yearPillar = getYearPillar(year, month, day);
  const yearGan = yearPillar.gan;
  const isYangGan = TIAN_GAN_YIN_YANG[yearGan] === '阳';
  const isMale = gender === '男';
  
  // 阳男阴女顺排，阴男阳女逆排
  const isShun = (isYangGan && isMale) || (!isYangGan && !isMale);
  
  // 3. 排出8步大运
  const dayunList = [];
  const dayGan = getYearPillar(year, month, day).gan; // 简化，实际需要日柱天干
  
  // 为了获取日柱天干，我们需要一个更可靠的方式
  // 这里使用日柱天干的推算（简化版，使用出生日推算）
  const dayGanFinal = getDayGanSimple(year, month, day);
  
  for (let i = 1; i <= 8; i++) {
    let ganIndex, zhiIndex;
    if (isShun) {
      ganIndex = (monthGanIndex + i) % 10;
      zhiIndex = (monthZhiIndex + i) % 12;
    } else {
      ganIndex = (monthGanIndex - i + 10) % 10;
      zhiIndex = (monthZhiIndex - i + 12) % 12;
    }
    
    const dayunGan = TIAN_GAN[ganIndex];
    const dayunZhi = DI_ZHI[zhiIndex];
    const ageStart = startAge + (i - 1) * 10;
    const ageEnd = startAge + i * 10 - 1;
    
    // 大运五行属性（以天干为主，参考地支）
    const dayunWuxing = TIAN_GAN_WU_XING[dayunGan];
    const dayZhiWuxing = DI_ZHI_WU_XING[dayunZhi];
    
    // 计算大运与日主的关系
    const dayMasterWuxing = TIAN_GAN_WU_XING[dayGanFinal];
    const relation = getWuXingRelation(dayMasterWuxing, dayunWuxing);
    const shiShenGroup = WUXING_RELATION_TO_SHISHEN_GROUP[relation] || '';
    
    // 运势描述
    const description = generateDayunDescription(shiShenGroup, dayunWuxing, isShun, i);
    
    dayunList.push({
      index: i,
      ganZhi: dayunGan + dayunZhi,
      gan: dayunGan,
      zhi: dayunZhi,
      ageStart,
      ageEnd,
      ageRange: `${ageStart}-${ageEnd}岁`,
      wuxing: dayunWuxing,
      zhiWuxing: dayZhiWuxing,
      naYin: NA_YIN[dayunGan + dayunZhi] || '',
      shiShenGroup,
      direction: isShun ? '顺行' : '逆行',
      description
    });
  }
  
  return dayunList;
}

// 简化版日柱天干推算（用于大运分析）
function getDayGanSimple(year, month, day) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  // 1900年1月1日 甲戌日，甲为索引0
  const ganIndex = ((diffDays % 10) + 10) % 10;
  return TIAN_GAN[ganIndex];
}

// 生成大运运势描述
function generateDayunDescription(shiShenGroup, wuxing, isShun, step) {
  const descriptions = {
    '比劫运': {
      positive: '此运为比劫运，主朋友助力、同辈竞争。事业上易有合作伙伴出现，但也需防破财纷争。宜守不宜攻，稳扎稳打为上。',
      negative: '此运为比劫运，竞争压力增大，钱财易散。需谨慎理财，避免与人合伙投资，以防朋友拖累。'
    },
    '食伤运': {
      positive: '此运为食伤运，主才华发挥、智慧开启。学业事业皆有进步，适合创作、表达、技术发展。财源广进，名利双收。',
      negative: '此运为食伤运，虽有才华发挥之机，但易因言语得罪人。女性需注意感情波折，男性则宜专注事业。'
    },
    '财星运': {
      positive: '此运为财星运，财运亨通，事业发展顺利。适合投资创业，正财偏财皆有收获。但需注意身体健康，勿因财伤身。',
      negative: '此运为财星运，财运虽旺但身弱不胜财。需量力而行，不可贪多求快，以防财来财去一场空。'
    },
    '官杀运': {
      positive: '此运为官杀运，主事业升迁、名望提升。适合从政或管理岗位发展，有贵人提携。但压力较大，需注意身心健康。',
      negative: '此运为官杀运，压力重重，易遇小人阻碍。事业上多波折，需谨小慎微，忍耐待时，不可冲动行事。'
    },
    '印星运': {
      positive: '此运为印星运，主学业进步、贵人相助。适合学习深造、考证考级。长辈缘佳，易得上级赏识提拔。',
      negative: '此运为印星运，虽有贵人但易生依赖。需独立自主，不可过分安逸。注意肠胃消化方面的健康问题。'
    }
  };
  
  const desc = descriptions[shiShenGroup];
  if (!desc) return `${wuxing}运，运势平稳，需根据命局具体分析。`;
  
  // 根据步数和方向选择正面或负面描述（简化逻辑：奇数步正面，偶数步负面）
  const isPositive = (step % 2 === 1);
  return isPositive ? desc.positive : desc.negative;
}

// ============================================================
// 三、流年吉凶分析
// ============================================================

/**
 * 计算近10年流年吉凶
 * @param {string} dayGan - 日主天干
 * @param {string} dayZhi - 日支
 * @param {number} currentYear - 当前年份
 * @param {number} count - 流年数量
 * @returns {Array} 流年数组
 */
export function calculateLiuNian(dayGan, dayZhi, currentYear, count = 10) {
  const liuNianList = [];
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  
  for (let i = 0; i < count; i++) {
    const year = currentYear + i;
    const yearPillar = getYearPillar(year, 1, 1);
    const liuNianGan = yearPillar.gan;
    const liuNianZhi = yearPillar.zhi;
    const liuNianGanZhi = liuNianGan + liuNianZhi;
    
    // 生肖
    const shengXiaoIndex = (year - 4) % 12;
    const shengXiao = SHENG_XIAO[shengXiaoIndex < 0 ? shengXiaoIndex + 12 : shengXiaoIndex];
    
    // 流年天干与日主的十神关系
    const ganShiShen = calculateShiShen(dayGan, liuNianGan);
    
    // 流年地支与日支的关系（刑冲合害）
    const zhiRelation = analyzeZhiRelation(dayZhi, liuNianZhi);
    
    // 流年地支藏干与日主的关系
    const cangGanList = DI_ZHI_CANG_GAN[liuNianZhi] || [];
    const cangGanShiShen = cangGanList.map(cg => calculateShiShen(dayGan, cg.gan));
    
    // 计算吉凶评分
    const { score, jixiongLevel, description } = calculateLiuNianJixiong(
      dayMasterWuxing,
      TIAN_GAN_WU_XING[liuNianGan],
      DI_ZHI_WU_XING[liuNianZhi],
      zhiRelation,
      ganShiShen,
      cangGanShiShen,
      year
    );
    
    liuNianList.push({
      year,
      ganZhi: liuNianGanZhi,
      gan: liuNianGan,
      zhi: liuNianZhi,
      shengXiao,
      naYin: NA_YIN[liuNianGanZhi] || '',
      ganShiShen,
      zhiRelation,
      zhiRelationType: zhiRelation.type,
      jixiongLevel,
      score,
      description,
      cangGan: cangGanList.map((cg, idx) => ({
        ...cg,
        shiShen: cangGanShiShen[idx]
      }))
    });
  }
  
  return liuNianList;
}

// 分析两个地支的关系
function analyzeZhiRelation(zhi1, zhi2) {
  if (zhi1 === zhi2) {
    return { type: '伏吟', effect: 'neutral', description: '地支相同，为伏吟，主重复、拖延' };
  }
  
  // 六合
  const liuHeMap = {
    '子': '丑', '丑': '子', '寅': '亥', '亥': '寅',
    '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰',
    '巳': '申', '申': '巳', '午': '未', '未': '午'
  };
  if (liuHeMap[zhi1] === zhi2) {
    return { type: '六合', effect: 'positive', description: `地支${zhi1}${zhi2}相合，主和合、顺利` };
  }
  
  // 六冲
  const liuChongMap = {
    '子': '午', '午': '子', '丑': '未', '未': '丑',
    '寅': '申', '申': '寅', '卯': '酉', '酉': '卯',
    '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳'
  };
  if (liuChongMap[zhi1] === zhi2) {
    return { type: '六冲', effect: 'negative', description: `地支${zhi1}${zhi2}相冲，主变动、冲突` };
  }
  
  // 三刑（两两相刑）
  const xingMap = {
    '寅': '巳', '巳': '申', '申': '寅',
    '丑': '戌', '戌': '未', '未': '丑',
    '子': '卯', '卯': '子'
  };
  if (xingMap[zhi1] === zhi2) {
    return { type: '相刑', effect: 'negative', description: `地支${zhi1}${zhi2}相刑，主刑伤、纠纷` };
  }
  
  // 六害
  const haiMap = {
    '子': '未', '未': '子', '丑': '午', '午': '丑',
    '寅': '巳', '巳': '寅', '卯': '辰', '辰': '卯',
    '申': '亥', '亥': '申', '酉': '戌', '戌': '酉'
  };
  if (haiMap[zhi1] === zhi2) {
    return { type: '六害', effect: 'negative', description: `地支${zhi1}${zhi2}相害，主妨害、阻碍` };
  }
  
  // 三合（部分合）
  const sanHeGroups = [
    ['申', '子', '辰'],
    ['亥', '卯', '未'],
    ['寅', '午', '戌'],
    ['巳', '酉', '丑']
  ];
  for (const group of sanHeGroups) {
    if (group.includes(zhi1) && group.includes(zhi2)) {
      return { type: '半合', effect: 'positive', description: `地支${zhi1}${zhi2}半合局，有相助之力` };
    }
  }
  
  return { type: '无特殊关系', effect: 'neutral', description: '地支无特殊刑冲合害关系' };
}

// 计算流年吉凶评分
function calculateLiuNianJixiong(dayMasterWuxing, ganWuxing, zhiWuxing, zhiRelation, ganShiShen, cangGanShiShen, year) {
  let score = 50; // 基础分
  let factors = [];
  
  // 天干十神对运势的影响（正面加分，负面减分）
  const shiShenScore = {
    '正官': 8, '七杀': -5,
    '正印': 10, '偏印': 5,
    '正财': 7, '偏财': 3,
    '食神': 6, '伤官': 2,
    '比肩': 0, '劫财': -8
  };
  
  if (shiShenScore[ganShiShen] !== undefined) {
    score += shiShenScore[ganShiShen];
    factors.push(`天干${ganShiShen}(${shiShenScore[ganShiShen] > 0 ? '+' : ''}${shiShenScore[ganShiShen]}分)`);
  }
  
  // 地支关系对运势的影响
  if (zhiRelation.effect === 'positive') {
    score += 15;
    factors.push(`${zhiRelation.type}(+15分)`);
  } else if (zhiRelation.effect === 'negative') {
    score -= 15;
    factors.push(`${zhiRelation.type}(-15分)`);
  } else {
    factors.push(`${zhiRelation.type}(±0分)`);
  }
  
  // 地支藏干影响（本气为主）
  if (cangGanShiShen.length > 0) {
    const mainQiShiShen = cangGanShiShen[0];
    if (shiShenScore[mainQiShiShen] !== undefined) {
      score += Math.floor(shiShenScore[mainQiShiShen] * 0.5);
      factors.push(`地支本气${mainQiShiShen}(${shiShenScore[mainQiShiShen] > 0 ? '+' : ''}${Math.floor(shiShenScore[mainQiShiShen] * 0.5)}分)`);
    }
  }
  
  // 限制分数范围
  score = Math.max(0, Math.min(100, score));
  
  // 判断吉凶等级
  let jixiongLevel;
  if (score >= 80) {
    jixiongLevel = '吉';
  } else if (score >= 65) {
    jixiongLevel = '小吉';
  } else if (score >= 45) {
    jixiongLevel = '平';
  } else if (score >= 25) {
    jixiongLevel = '小凶';
  } else {
    jixiongLevel = '凶';
  }
  
  // 生成描述
  const description = generateLiuNianDescription(jixiongLevel, ganShiShen, zhiRelation, factors);
  
  return { score, jixiongLevel, description };
}

// 生成流年描述
function generateLiuNianDescription(jixiongLevel, ganShiShen, zhiRelation, factors) {
  const levelDesc = {
    '吉': '流年大吉，诸事顺遂。事业财运双丰收，贵人相助，把握机会可大有作为。',
    '小吉': '流年小吉，整体向好。虽有小波折，但总体发展顺利，宜稳扎稳打。',
    '平': '流年平稳，吉凶参半。无功无过，宜守不宜进，蓄力待时。',
    '小凶': '流年小凶，需谨慎行事。多有不顺，宜低调做人，保守理财，防破财伤身。',
    '凶': '流年大凶，诸事多舛。需格外小心，重大决策宜暂缓，注意健康与安全。'
  };
  
  let desc = levelDesc[jixiongLevel] || '';
  desc += ` 流年天干为${ganShiShen}，${zhiRelation.type}。`;
  
  return desc;
}

// ============================================================
// 四、格局分析
// ============================================================

/**
 * 分析八字格局
 * @param {string} dayGan - 日主天干
 * @param {Array} pillars - 四柱数组 [{gan, zhi, ...}, ...]
 * @returns {Object} 格局分析结果
 */
export function analyzeGeju(dayGan, pillars) {
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  const dayGanIndex = TIAN_GAN.indexOf(dayGan);
  
  // 1. 计算日主强弱
  const strengthResult = calculateDayStrength(dayGan, pillars);
  const dayStrength = strengthResult.level;
  
  // 2. 判断格局类型
  const patternResult = determinePattern(dayGan, pillars, dayStrength);
  
  // 3. 判断喜用神、忌神
  const yongJiResult = determineYongJiShen(dayMasterWuxing, dayStrength, patternResult.pattern);
  
  // 4. 整体评价
  const overallResult = evaluateOverall(dayStrength, patternResult.pattern, strengthResult.score);
  
  return {
    dayStrength,
    dayStrengthScore: strengthResult.score,
    dayStrengthDesc: strengthResult.description,
    pattern: patternResult.pattern,
    patternDesc: patternResult.description,
    patternEvidence: patternResult.evidence,
    yongShen: yongJiResult.yongShen,
    jiShen: yongJiResult.jiShen,
    xianShen: yongJiResult.xianShen,
    overallLevel: overallResult.level,
    overallScore: overallResult.score,
    analysis: generateGejuAnalysis(dayGan, dayStrength, patternResult, yongJiResult, overallResult)
  };
}

// 计算日主强弱
function calculateDayStrength(dayGan, pillars) {
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  let score = 0;
  let details = [];
  
  // 月令是判断强弱的关键
  const monthZhi = pillars[1].zhi;
  const monthZhiWuxing = DI_ZHI_WU_XING[monthZhi];
  const monthCangGan = DI_ZHI_CANG_GAN[monthZhi] || [];
  
  // 月令得令：五行相同或被生
  if (monthZhiWuxing === dayMasterWuxing) {
    score += 30;
    details.push('得令于月令(+30)');
  } else if (WU_XING_SHENG[monthZhiWuxing] === dayMasterWuxing) {
    score += 15;
    details.push('月令生扶(+15)');
  } else if (WU_XING_SHENG[dayMasterWuxing] === monthZhiWuxing) {
    score -= 15;
    details.push('月令泄秀(-15)');
  } else if (WU_XING_KE[monthZhiWuxing] === dayMasterWuxing) {
    score -= 20;
    details.push('月令克伐(-20)');
  } else if (WU_XING_KE[dayMasterWuxing] === monthZhiWuxing) {
    score -= 10;
    details.push('月令耗泄(-10)');
  }
  
  // 通根：地支中有日主五行的藏干
  let tongGenCount = 0;
  pillars.forEach((pillar, idx) => {
    const cangGan = DI_ZHI_CANG_GAN[pillar.zhi] || [];
    cangGan.forEach(cg => {
      if (TIAN_GAN_WU_XING[cg.gan] === dayMasterWuxing) {
        if (cg.type === '本气') {
          score += 15;
          tongGenCount++;
          details.push(`${pillar.position}支本气通根(+15)`);
        } else if (cg.type === '余气') {
          score += 8;
          tongGenCount++;
          details.push(`${pillar.position}支余气通根(+8)`);
        } else {
          score += 5;
          tongGenCount++;
          details.push(`${pillar.position}支中干通根(+5)`);
        }
      }
    });
  });
  
  // 天干比助
  pillars.forEach((pillar, idx) => {
    if (pillar.gan !== dayGan && TIAN_GAN_WU_XING[pillar.gan] === dayMasterWuxing) {
      score += 10;
      details.push(`${pillar.position}干比助(+10)`);
    }
  });
  
  // 印星生扶
  const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
  pillars.forEach((pillar, idx) => {
    if (TIAN_GAN_WU_XING[pillar.gan] === shengWuxing) {
      score += 8;
      details.push(`${pillar.position}干印星生扶(+8)`);
    }
  });
  
  // 官杀克伐
  const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
  pillars.forEach((pillar, idx) => {
    if (TIAN_GAN_WU_XING[pillar.gan] === keWuxing) {
      score -= 8;
      details.push(`${pillar.position}干官杀克伐(-8)`);
    }
  });
  
  // 食伤泄秀
  const shengTarget = WU_XING_SHENG[dayMasterWuxing];
  pillars.forEach((pillar, idx) => {
    if (TIAN_GAN_WU_XING[pillar.gan] === shengTarget) {
      score -= 6;
      details.push(`${pillar.position}干食伤泄秀(-6)`);
    }
  });
  
  // 财星耗泄
  const keTarget = WU_XING_KE[dayMasterWuxing];
  pillars.forEach((pillar, idx) => {
    if (TIAN_GAN_WU_XING[pillar.gan] === keTarget) {
      score -= 5;
      details.push(`${pillar.position}干财星耗泄(-5)`);
    }
  });
  
  // 根据地支中的克泄耗调整
  pillars.forEach((pillar) => {
    const cangGan = DI_ZHI_CANG_GAN[pillar.zhi] || [];
    cangGan.forEach(cg => {
      const cgWuxing = TIAN_GAN_WU_XING[cg.gan];
      if (cg.type === '本气') {
        if (WU_XING_KE[cgWuxing] === dayMasterWuxing) {
          score -= 5;
          details.push(`${pillar.position}支本气官杀(-5)`);
        } else if (WU_XING_SHENG[dayMasterWuxing] === cgWuxing) {
          score -= 4;
          details.push(`${pillar.position}支本气食伤(-4)`);
        }
      }
    });
  });
  
  // 确定强弱等级
  let level;
  if (score >= 60) {
    level = '身强';
  } else if (score >= 20) {
    level = '中和';
  } else if (score >= -20) {
    level = '身弱';
  } else {
    level = '极弱';
  }
  
  const description = `日主得分为${score}分，${level}。${details.join('，')}。`;
  
  return { level, score, details, description };
}

// 判断格局类型
function determinePattern(dayGan, pillars, dayStrength) {
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  const monthZhi = pillars[1].zhi;
  const monthCangGan = DI_ZHI_CANG_GAN[monthZhi] || [];
  
  // 格局主要以月令为核心判断
  // 先看月令本气对应的十神
  
  const mainQiGan = monthCangGan.find(cg => cg.type === '本气');
  const mainQiShiShen = mainQiGan ? calculateShiShen(dayGan, mainQiGan.gan) : '';
  
  let pattern = '';
  let evidence = [];
  let description = '';
  
  // 正官格
  if (mainQiShiShen === '正官') {
    pattern = '正官格';
    evidence.push('月令本气为正官');
    description = '正官格为贵气之格，主品行端正、遵纪守法、有领导才能。正官清纯者多为公职人员或企业管理阶层，事业稳步发展。';
  }
  // 七杀格
  else if (mainQiShiShen === '七杀') {
    pattern = '七杀格';
    evidence.push('月令本气为七杀');
    description = '七杀格为权威之格，主果断勇猛、有魄力、富冒险精神。七杀有制化为权，无制则为祸，宜配印星或食伤制杀。';
  }
  // 正印格
  else if (mainQiShiShen === '正印') {
    pattern = '正印格';
    evidence.push('月令本气为正印');
    description = '正印格为文贵之格，主聪明好学、心地善良、有贵人相助。适合从事教育、文化、学术等领域，易得长辈提携。';
  }
  // 偏印格
  else if (mainQiShiShen === '偏印') {
    pattern = '偏印格';
    evidence.push('月令本气为偏印');
    description = '偏印格为异路之格，主思维独特、悟性极高、善于钻研。适合从事偏门、技术、研究、玄学等领域，有特殊才能。';
  }
  // 正财格
  else if (mainQiShiShen === '正财') {
    pattern = '正财格';
    evidence.push('月令本气为正财');
    description = '正财格为富格之一种，主财运稳定、勤俭持家、务实肯干。正财旺相者多经商或从事财务工作，财富稳步积累。';
  }
  // 偏财格
  else if (mainQiShiShen === '偏财') {
    pattern = '偏财格';
    evidence.push('月令本气为偏财');
    description = '偏财格为富格之一种，主偏财运旺、交际广泛、有商业头脑。偏财旺相者易有意外之财，适合投资、贸易、销售等行业。';
  }
  // 食神格
  else if (mainQiShiShen === '食神') {
    pattern = '食神格';
    evidence.push('月令本气为食神');
    description = '食神格为福寿之格，主心地仁厚、生活富足、有口福。食神生财者财源广进，食神制杀者以谋略取胜。';
  }
  // 伤官格
  else if (mainQiShiShen === '伤官') {
    pattern = '伤官格';
    evidence.push('月令本气为伤官');
    description = '伤官格为才华之格，主聪明过人、才华横溢、富有创造力。伤官佩印者贵，伤官生财者富，伤官见官者多灾。';
  }
  // 建禄格（月令为比肩，即日支五行与月令相同且为禄位）
  else if (mainQiShiShen === '比肩' && isLuPosition(dayGan, monthZhi)) {
    pattern = '建禄格';
    evidence.push('月令为建禄');
    description = '建禄格为自立之格，主独立自主、白手起家、身体强健。建禄格不喜多见比劫，宜财官旺相，方能富贵双全。';
  }
  // 羊刃格
  else if (mainQiShiShen === '劫财' && isRenPosition(dayGan, monthZhi)) {
    pattern = '羊刃格';
    evidence.push('月令为羊刃');
    description = '羊刃格为刚猛之格，主性格刚强、意志坚定、有闯劲。羊刃驾杀者大贵，羊刃无制者多灾，宜官杀制伏。';
  }
  // 如果月令本气不构成明显格局，看余气
  else {
    // 检查是否为从格
    const congResult = checkCongGe(dayGan, pillars, dayStrength);
    if (congResult.isCong) {
      pattern = congResult.pattern;
      evidence = congResult.evidence;
      description = congResult.description;
    } else {
      // 以月令余气或其他方式取格
      const yuQiGan = monthCangGan.find(cg => cg.type === '余气');
      if (yuQiGan) {
        const yuQiShiShen = calculateShiShen(dayGan, yuQiGan.gan);
        if (['正官', '七杀', '正印', '偏印', '正财', '偏财', '食神', '伤官'].includes(yuQiShiShen)) {
          pattern = yuQiShiShen + '格（杂气）';
          evidence.push(`月令余气为${yuQiShiShen}`);
          description = `杂气${yuQiShiShen}格，格局不纯，需配合其他干支综合判断。透干清纯者亦可为用。`;
        }
      }
      
      if (!pattern) {
        pattern = '普通格局';
        evidence.push('月令无明显格局可取');
        description = '八字格局较为普通，无特殊格局可取。需根据五行平衡综合判断，以中和为贵。';
      }
    }
  }
  
  return { pattern, evidence, description };
}

// 判断是否为禄位
function isLuPosition(dayGan, zhi) {
  const luMap = {
    '甲': '寅', '乙': '卯',
    '丙': '巳', '丁': '午',
    '戊': '巳', '己': '午',
    '庚': '申', '辛': '酉',
    '壬': '亥', '癸': '子'
  };
  return luMap[dayGan] === zhi;
}

// 判断是否为羊刃
function isRenPosition(dayGan, zhi) {
  const renMap = {
    '甲': '卯', '乙': '寅',
    '丙': '午', '丁': '巳',
    '戊': '午', '己': '巳',
    '庚': '酉', '辛': '申',
    '壬': '子', '癸': '亥'
  };
  return renMap[dayGan] === zhi;
}

// 检查从格
function checkCongGe(dayGan, pillars, dayStrength) {
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  
  // 统计各五行数量
  const wuxingCount = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
  pillars.forEach(pillar => {
    wuxingCount[TIAN_GAN_WU_XING[pillar.gan]]++;
    const cangGan = DI_ZHI_CANG_GAN[pillar.zhi] || [];
    cangGan.forEach(cg => {
      if (cg.type === '本气') wuxingCount[TIAN_GAN_WU_XING[cg.gan]]++;
    });
  });
  
  // 从强格：日主极旺，无比劫印星之外的五行或极少
  if (dayStrength === '身强' || wuxingCount[dayMasterWuxing] >= 5) {
    const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
    const totalTongLei = wuxingCount[dayMasterWuxing] + (wuxingCount[shengWuxing] || 0);
    if (totalTongLei >= 6) {
      return {
        isCong: true,
        pattern: '从强格',
        evidence: ['日主极旺', '同类五行数量占绝对优势'],
        description: '从强格为特殊格局，日主旺极无制，顺其势而用之。喜比劫印星，忌官杀克伐。从强格者多性格刚毅，事业有成，但人生大起大落。'
      };
    }
  }
  
  // 从弱格：日主极弱，无比劫印星或极少
  if (dayStrength === '身弱' || dayStrength === '极弱') {
    if (wuxingCount[dayMasterWuxing] <= 1) {
      return {
        isCong: true,
        pattern: '从弱格',
        evidence: ['日主极弱', '同类五行极少'],
        description: '从弱格为特殊格局，日主弱极无根，弃命从之。喜财官食伤，忌比劫印星生扶。从弱格者多随遇而安，得贵人相助则发达。'
      };
    }
  }
  
  return { isCong: false };
}

// 判断喜用神和忌神
function determineYongJiShen(dayMasterWuxing, dayStrength, pattern) {
  let yongShen = [];
  let jiShen = [];
  let xianShen = []; // 闲神
  
  // 基本规则：身强喜克泄耗，身弱喜生扶
  if (dayStrength === '身强') {
    // 身强：喜官杀(克我)、食伤(我生)、财星(我克)
    const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
    const shengTarget = WU_XING_SHENG[dayMasterWuxing];
    const keTarget = WU_XING_KE[dayMasterWuxing];
    
    yongShen = [keWuxing, shengTarget, keTarget];
    // 忌比劫、印星
    const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
    jiShen = [dayMasterWuxing, shengWuxing];
    
    // 闲神取中间的
    xianShen = WU_XING.filter(w => !yongShen.includes(w) && !jiShen.includes(w));
  } else if (dayStrength === '身弱' || dayStrength === '极弱') {
    // 身弱：喜比劫(同我)、印星(生我)
    const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
    yongShen = [dayMasterWuxing, shengWuxing];
    // 忌官杀、财星、食伤
    const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
    const shengTarget = WU_XING_SHENG[dayMasterWuxing];
    const keTarget = WU_XING_KE[dayMasterWuxing];
    jiShen = [keWuxing, keTarget, shengTarget];
    
    xianShen = WU_XING.filter(w => !yongShen.includes(w) && !jiShen.includes(w));
  } else {
    // 中和：以格局喜用为主
    if (pattern.includes('官')) {
      // 官格喜印星、财星
      const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
      const keTarget = WU_XING_KE[dayMasterWuxing];
      yongShen = [shengWuxing, keTarget];
    } else if (pattern.includes('财')) {
      // 财格喜官杀、食伤
      const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
      const shengTarget = WU_XING_SHENG[dayMasterWuxing];
      yongShen = [keWuxing, shengTarget];
    } else if (pattern.includes('印')) {
      // 印格喜官杀、比劫
      const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
      yongShen = [keWuxing, dayMasterWuxing];
    } else {
      yongShen = [dayMasterWuxing];
    }
    jiShen = WU_XING.filter(w => !yongShen.includes(w)).slice(0, 2);
    xianShen = WU_XING.filter(w => !yongShen.includes(w) && !jiShen.includes(w));
  }
  
  // 从格特殊处理
  if (pattern === '从强格') {
    const shengWuxing = Object.keys(WU_XING_SHENG).find(k => WU_XING_SHENG[k] === dayMasterWuxing);
    yongShen = [dayMasterWuxing, shengWuxing];
    const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
    jiShen = [keWuxing];
  } else if (pattern === '从弱格') {
    const keWuxing = Object.keys(WU_XING_KE).find(k => WU_XING_KE[k] === dayMasterWuxing);
    const shengTarget = WU_XING_SHENG[dayMasterWuxing];
    const keTarget = WU_XING_KE[dayMasterWuxing];
    yongShen = [keWuxing, shengTarget, keTarget];
    jiShen = [dayMasterWuxing];
  }
  
  return {
    yongShen: yongShen.slice(0, 3),
    jiShen: jiShen.slice(0, 3),
    xianShen: xianShen.slice(0, 2)
  };
}

// 整体评价
function evaluateOverall(dayStrength, pattern, strengthScore) {
  let score = 50;
  
  // 日主强弱适中加分
  if (dayStrength === '中和') {
    score += 20;
  } else if (dayStrength === '身强' || dayStrength === '身弱') {
    score += 5;
  } else {
    score -= 10;
  }
  
  // 格局纯正加分
  const purePatterns = ['正官格', '正印格', '正财格', '食神格'];
  const partialPatterns = ['七杀格', '偏印格', '偏财格', '伤官格'];
  
  if (purePatterns.includes(pattern)) {
    score += 15;
  } else if (partialPatterns.includes(pattern)) {
    score += 8;
  } else if (pattern === '建禄格' || pattern === '羊刃格') {
    score += 10;
  } else if (pattern === '从强格' || pattern === '从弱格') {
    score += 12;
  }
  
  // 限制分数
  score = Math.max(0, Math.min(100, score));
  
  let level;
  if (score >= 80) {
    level = '上等';
  } else if (score >= 60) {
    level = '中上等';
  } else if (score >= 40) {
    level = '中等';
  } else if (score >= 25) {
    level = '中下等';
  } else {
    level = '下等';
  }
  
  return { level, score };
}

// 生成格局分析详细文字
function generateGejuAnalysis(dayGan, dayStrength, patternResult, yongJiResult, overallResult) {
  const dayMasterWuxing = TIAN_GAN_WU_XING[dayGan];
  
  let analysis = `日主${dayGan}${dayMasterWuxing}，${dayStrength}。`;
  analysis += `格局为${patternResult.pattern}，${patternResult.description} `;
  analysis += `喜用神为${yongJiResult.yongShen.join('、')}，`;
  analysis += `忌神为${yongJiResult.jiShen.join('、')}。`;
  analysis += `命局整体评价为${overallResult.level}，综合得分${overallResult.score}分。`;
  analysis += `建议多接触喜用神五行相关的事物，避开忌神五行的不利影响。`;
  
  return analysis;
}

// ============================================================
// 五、刑冲合害分析
// ============================================================

/**
 * 分析命局刑冲合害
 * @param {Array} pillars - 四柱数组
 * @returns {Object} 刑冲合害分析结果
 */
export function analyzeXingChongHeHai(pillars) {
  const zhiList = pillars.map(p => p.zhi);
  const ganList = pillars.map(p => p.gan);
  const positionNames = pillars.map(p => p.position);
  
  // 1. 地支六合
  const liuHeResult = findLiuHe(zhiList, positionNames);
  
  // 2. 地支三合
  const sanHeResult = findSanHe(zhiList, positionNames);
  
  // 3. 地支三会
  const sanHuiResult = findSanHui(zhiList, positionNames);
  
  // 4. 地支六冲
  const xiangChongResult = findXiangChong(zhiList, positionNames);
  
  // 5. 地支三刑
  const xiangXingResult = findXiangXing(zhiList, positionNames);
  
  // 6. 地支六害
  const xiangHaiResult = findXiangHai(zhiList, positionNames);
  
  // 7. 天干五合
  const tianGanWuHeResult = findTianGanWuHe(ganList, positionNames);
  
  // 8. 总体评价
  const summary = generateXingChongHeHaiSummary(
    liuHeResult.length,
    sanHeResult.length,
    sanHuiResult.length,
    xiangChongResult.length,
    xiangXingResult.length,
    xiangHaiResult.length,
    tianGanWuHeResult.length
  );
  
  return {
    liuHe: liuHeResult,
    sanHe: sanHeResult,
    sanHui: sanHuiResult,
    xiangChong: xiangChongResult,
    xiangXing: xiangXingResult,
    xiangHai: xiangHaiResult,
    tianGanWuHe: tianGanWuHeResult,
    totalHe: liuHeResult.length + sanHeResult.length + sanHuiResult.length,
    totalChong: xiangChongResult.length,
    totalXing: xiangXingResult.length,
    totalHai: xiangHaiResult.length,
    summary
  };
}

// 查找地支六合
function findLiuHe(zhiList, positionNames) {
  const liuHePairs = [
    ['子', '丑'], ['寅', '亥'], ['卯', '戌'],
    ['辰', '酉'], ['巳', '申'], ['午', '未']
  ];
  const liuHeDesc = {
    '子丑': '子丑合化土，主稳重踏实',
    '寅亥': '寅亥合化木，主仁爱慈祥',
    '卯戌': '卯戌合化火，主热情有礼',
    '辰酉': '辰酉合化金，主义气果敢',
    '巳申': '巳申合化水，主智慧灵动',
    '午未': '午未合化土，主包容厚道'
  };
  
  const result = [];
  for (let i = 0; i < zhiList.length; i++) {
    for (let j = i + 1; j < zhiList.length; j++) {
      for (const pair of liuHePairs) {
        if ((zhiList[i] === pair[0] && zhiList[j] === pair[1]) ||
            (zhiList[i] === pair[1] && zhiList[j] === pair[0])) {
          const key = pair[0] + pair[1];
          result.push({
            zhi1: zhiList[i],
            zhi2: zhiList[j],
            pos1: positionNames[i],
            pos2: positionNames[j],
            position: `${positionNames[i]}${positionNames[j]}`,
            effect: 'positive',
            description: liuHeDesc[key] || `${pair[0]}${pair[1]}相合`
          });
        }
      }
    }
  }
  return result;
}

// 查找地支三合局
function findSanHe(zhiList, positionNames) {
  const sanHeGroups = [
    { zhi: ['申', '子', '辰'], hua: '水', desc: '申子辰三合水局，主智慧通达、流动性强' },
    { zhi: ['亥', '卯', '未'], hua: '木', desc: '亥卯未三合木局，主仁爱生发、事业拓展' },
    { zhi: ['寅', '午', '戌'], hua: '火', desc: '寅午戌三合火局，主热情光明、文彩焕发' },
    { zhi: ['巳', '酉', '丑'], hua: '金', desc: '巳酉丑三合金局，主义气刚健、财富汇聚' }
  ];
  
  const result = [];
  for (const group of sanHeGroups) {
    const found = [];
    const foundPos = [];
    for (let i = 0; i < zhiList.length; i++) {
      if (group.zhi.includes(zhiList[i])) {
        found.push(zhiList[i]);
        foundPos.push(positionNames[i]);
      }
    }
    if (found.length >= 3) {
      result.push({
        zhi1: found[0],
        zhi2: found[1],
        zhi3: found[2],
        positions: foundPos,
        position: foundPos.join(''),
        huaWuxing: group.hua,
        effect: 'positive',
        description: group.desc
      });
    } else if (found.length === 2) {
      // 半合局
      result.push({
        zhi1: found[0],
        zhi2: found[1],
        zhi3: '',
        positions: foundPos,
        position: foundPos.join(''),
        huaWuxing: group.hua,
        isBanHe: true,
        effect: 'positive',
        description: `${found.join('')}半合${group.hua}局，力量较弱`
      });
    }
  }
  return result;
}

// 查找地支三会局
function findSanHui(zhiList, positionNames) {
  const sanHuiGroups = [
    { zhi: ['寅', '卯', '辰'], hua: '木', desc: '寅卯辰三会木局，东方一气，力量最强' },
    { zhi: ['巳', '午', '未'], hua: '火', desc: '巳午未三会火局，南方一气，气势最盛' },
    { zhi: ['申', '酉', '戌'], hua: '金', desc: '申酉戌三会金局，西方一气，金气最纯' },
    { zhi: ['亥', '子', '丑'], hua: '水', desc: '亥子丑三会水局，北方一气，水势最大' }
  ];
  
  const result = [];
  for (const group of sanHuiGroups) {
    const found = [];
    const foundPos = [];
    for (let i = 0; i < zhiList.length; i++) {
      if (group.zhi.includes(zhiList[i])) {
        found.push(zhiList[i]);
        foundPos.push(positionNames[i]);
      }
    }
    if (found.length >= 3) {
      result.push({
        zhi1: found[0],
        zhi2: found[1],
        zhi3: found[2],
        positions: foundPos,
        position: foundPos.join(''),
        huaWuxing: group.hua,
        effect: 'positive',
        description: group.desc
      });
    }
  }
  return result;
}

// 查找地支六冲
function findXiangChong(zhiList, positionNames) {
  const chongPairs = [
    ['子', '午'], ['丑', '未'], ['寅', '申'],
    ['卯', '酉'], ['辰', '戌'], ['巳', '亥']
  ];
  const chongDesc = {
    '子午': '子午相冲，主奔波变动、心肾不交',
    '丑未': '丑未相冲，主财库动荡、脾胃不和',
    '寅申': '寅申相冲，主道路奔波、肝胆相冲',
    '卯酉': '卯酉相冲，主门户之争、肺肝不和',
    '辰戌': '辰戌相冲，主墓库开阖、脾胃疾病',
    '巳亥': '巳亥相冲，主精神恍惚、心肾不交'
  };
  
  const result = [];
  for (let i = 0; i < zhiList.length; i++) {
    for (let j = i + 1; j < zhiList.length; j++) {
      for (const pair of chongPairs) {
        if ((zhiList[i] === pair[0] && zhiList[j] === pair[1]) ||
            (zhiList[i] === pair[1] && zhiList[j] === pair[0])) {
          const key = pair[0] + pair[1];
          result.push({
            zhi1: zhiList[i],
            zhi2: zhiList[j],
            pos1: positionNames[i],
            pos2: positionNames[j],
            position: `${positionNames[i]}${positionNames[j]}`,
            effect: 'negative',
            description: chongDesc[key] || `${pair[0]}${pair[1]}相冲`
          });
        }
      }
    }
  }
  return result;
}

// 查找地支三刑
function findXiangXing(zhiList, positionNames) {
  const result = [];
  
  // 寅巳申三刑（无恩之刑）
  const yinSiShen = ['寅', '巳', '申'];
  const foundYinSiShen = [];
  const foundYinSiShenPos = [];
  for (let i = 0; i < zhiList.length; i++) {
    if (yinSiShen.includes(zhiList[i])) {
      foundYinSiShen.push(zhiList[i]);
      foundYinSiShenPos.push(positionNames[i]);
    }
  }
  if (foundYinSiShen.length >= 3) {
    result.push({
      zhi1: foundYinSiShen[0],
      zhi2: foundYinSiShen[1],
      zhi3: foundYinSiShen[2],
      positions: foundYinSiShenPos,
      position: foundYinSiShenPos.join(''),
      xingType: '无恩之刑',
      effect: 'negative',
      description: '寅巳申三刑，为无恩之刑，主忘恩负义、口舌是非、易有官非'
    });
  } else if (foundYinSiShen.length === 2) {
    result.push({
      zhi1: foundYinSiShen[0],
      zhi2: foundYinSiShen[1],
      zhi3: '',
      positions: foundYinSiShenPos,
      position: foundYinSiShenPos.join(''),
      xingType: '无恩之刑（两刑）',
      effect: 'negative',
      description: `${foundYinSiShen.join('')}相刑，无恩之刑，主恩中招怨`
    });
  }
  
  // 丑戌未三刑（恃势之刑）
  const chouXuWei = ['丑', '戌', '未'];
  const foundChouXuWei = [];
  const foundChouXuWeiPos = [];
  for (let i = 0; i < zhiList.length; i++) {
    if (chouXuWei.includes(zhiList[i])) {
      foundChouXuWei.push(zhiList[i]);
      foundChouXuWeiPos.push(positionNames[i]);
    }
  }
  if (foundChouXuWei.length >= 3) {
    result.push({
      zhi1: foundChouXuWei[0],
      zhi2: foundChouXuWei[1],
      zhi3: foundChouXuWei[2],
      positions: foundChouXuWeiPos,
      position: foundChouXuWeiPos.join(''),
      xingType: '恃势之刑',
      effect: 'negative',
      description: '丑戌未三刑，为恃势之刑，主仗势欺人、易招灾祸'
    });
  } else if (foundChouXuWei.length === 2) {
    result.push({
      zhi1: foundChouXuWei[0],
      zhi2: foundChouXuWei[1],
      zhi3: '',
      positions: foundChouXuWeiPos,
      position: foundChouXuWeiPos.join(''),
      xingType: '恃势之刑（两刑）',
      effect: 'negative',
      description: `${foundChouXuWei.join('')}相刑，恃势之刑，主争权夺利`
    });
  }
  
  // 子卯刑（无礼之刑）
  const ziMaoPairs = [['子', '卯']];
  for (let i = 0; i < zhiList.length; i++) {
    for (let j = i + 1; j < zhiList.length; j++) {
      if ((zhiList[i] === '子' && zhiList[j] === '卯') ||
          (zhiList[i] === '卯' && zhiList[j] === '子')) {
        result.push({
          zhi1: zhiList[i],
          zhi2: zhiList[j],
          zhi3: '',
          pos1: positionNames[i],
          pos2: positionNames[j],
          position: `${positionNames[i]}${positionNames[j]}`,
          xingType: '无礼之刑',
          effect: 'negative',
          description: '子卯相刑，为无礼之刑，主不讲礼仪、易有桃花纠纷'
        });
      }
    }
  }
  
  // 自刑：辰午酉亥
  const ziXingZhi = ['辰', '午', '酉', '亥'];
  const ziXingCount = {};
  zhiList.forEach((zhi, idx) => {
    if (ziXingZhi.includes(zhi)) {
      if (!ziXingCount[zhi]) {
        ziXingCount[zhi] = [];
      }
      ziXingCount[zhi].push(positionNames[idx]);
    }
  });
  for (const [zhi, positions] of Object.entries(ziXingCount)) {
    if (positions.length >= 2) {
      result.push({
        zhi1: zhi,
        zhi2: zhi,
        zhi3: '',
        positions,
        position: positions.join(''),
        xingType: '自刑',
        effect: 'negative',
        description: `${zhi}${zhi}自刑，主自我纠结、内心矛盾、易有自残倾向`
      });
    }
  }
  
  return result;
}

// 查找地支六害
function findXiangHai(zhiList, positionNames) {
  const haiPairs = [
    ['子', '未'], ['丑', '午'], ['寅', '巳'],
    ['卯', '辰'], ['申', '亥'], ['酉', '戌']
  ];
  const haiDesc = {
    '子未': '子未相害，主骨肉疏离、脾胃不和',
    '丑午': '丑午相害，主官非口舌、心血管疾',
    '寅巳': '寅巳相害，主口舌是非、肝胆疾病',
    '卯辰': '卯辰相害，主门户相争、脾胃不和',
    '申亥': '申亥相害，主道路惊险、心肾不交',
    '酉戌': '酉戌相害，主口舌争斗、肺金受损'
  };
  
  const result = [];
  for (let i = 0; i < zhiList.length; i++) {
    for (let j = i + 1; j < zhiList.length; j++) {
      for (const pair of haiPairs) {
        if ((zhiList[i] === pair[0] && zhiList[j] === pair[1]) ||
            (zhiList[i] === pair[1] && zhiList[j] === pair[0])) {
          const key = pair[0] + pair[1];
          result.push({
            zhi1: zhiList[i],
            zhi2: zhiList[j],
            pos1: positionNames[i],
            pos2: positionNames[j],
            position: `${positionNames[i]}${positionNames[j]}`,
            effect: 'negative',
            description: haiDesc[key] || `${pair[0]}${pair[1]}相害`
          });
        }
      }
    }
  }
  return result;
}

// 查找天干五合
function findTianGanWuHe(ganList, positionNames) {
  const wuHePairs = [
    { gan: ['甲', '己'], hua: '土', desc: '甲己合化土，主中正之合，为人诚信稳重' },
    { gan: ['乙', '庚'], hua: '金', desc: '乙庚合化金，主义气之合，为人刚柔并济' },
    { gan: ['丙', '辛'], hua: '水', desc: '丙辛合化水，主威制之合，为人威严有谋' },
    { gan: ['丁', '壬'], hua: '木', desc: '丁壬合化木，主淫昵之合，为人多情重欲' },
    { gan: ['戊', '癸'], hua: '火', desc: '戊癸合化火，主无情之合，为人外表俊美但寡情' }
  ];
  
  const result = [];
  for (let i = 0; i < ganList.length; i++) {
    for (let j = i + 1; j < ganList.length; j++) {
      for (const pair of wuHePairs) {
        if ((ganList[i] === pair.gan[0] && ganList[j] === pair.gan[1]) ||
            (ganList[i] === pair.gan[1] && ganList[j] === pair.gan[0])) {
          result.push({
            gan1: ganList[i],
            gan2: ganList[j],
            pos1: positionNames[i],
            pos2: positionNames[j],
            position: `${positionNames[i]}${positionNames[j]}`,
            huaWuxing: pair.hua,
            effect: 'positive',
            description: pair.desc
          });
        }
      }
    }
  }
  return result;
}

// 生成刑冲合害总体评价
function generateXingChongHeHaiSummary(liuHeCount, sanHeCount, sanHuiCount, chongCount, xingCount, haiCount, tianGanHeCount) {
  const totalHe = liuHeCount + sanHeCount + sanHuiCount + tianGanHeCount;
  const totalBuHe = chongCount + xingCount + haiCount;
  
  let summary = '';
  
  if (sanHuiCount > 0) {
    summary += '命局有三会局，力量强大，五行气势专一。';
  }
  if (sanHeCount > 0) {
    summary += '命局有三合局，合化有力，人缘佳，事业有帮扶。';
  }
  if (liuHeCount > 0) {
    summary += `命局有${liuHeCount}处六合，为人随和，善于交际。`;
  }
  if (tianGanHeCount > 0) {
    summary += `天干有${tianGanHeCount}处五合，外表温和，人缘好。`;
  }
  
  if (chongCount > 0) {
    summary += `命局有${chongCount}处相冲，人生多变动，性格较急躁。`;
  }
  if (xingCount > 0) {
    summary += `命局有${xingCount}处相刑，易有纠纷官非，需谨言慎行。`;
  }
  if (haiCount > 0) {
    summary += `命局有${haiCount}处相害，易遇小人暗算，人际关系需小心。`;
  }
  
  if (totalHe > totalBuHe) {
    summary += '总体来看，命局合多冲少，人际关系和谐，人生较为顺利。';
  } else if (totalHe < totalBuHe) {
    summary += '总体来看，命局冲刑害多合少，人生波折较多，需加倍努力。';
  } else {
    summary += '总体来看，命局合与冲刑害相当，人生吉凶参半，需趋吉避凶。';
  }
  
  return summary;
}

// ============================================================
// 六、八字格局类型数据
// ============================================================

export const GEJU_TYPES = [
  {
    name: '正官格',
    category: '正格',
    description: '月令本气为正官，且天干透出正官。正官格为贵格，主品行端正、遵纪守法、有领导才能。适合从政或从事管理工作，一生事业稳步发展。',
    characteristics: ['正直负责', '奉公守法', '有领导才能', '重名誉地位'],
    favorable: ['财星（财生官）', '印星（官生印）'],
    unfavorable: ['伤官（伤官见官）', '七杀（官杀混杂）'],
    level: '上格'
  },
  {
    name: '七杀格',
    category: '正格',
    description: '月令本气为七杀。七杀格为权威之格，主果断勇猛、有魄力、富冒险精神。七杀有制化为权，无制则为祸。宜配印星化杀或食伤制杀。',
    characteristics: ['果断勇敢', '有魄力', '富攻击性', '好胜心强'],
    favorable: ['印星（化杀生身）', '食神（食神制杀）'],
    unfavorable: ['财星（财生杀旺）', '官星（官杀混杂）'],
    level: '中上等'
  },
  {
    name: '正印格',
    category: '正格',
    description: '月令本气为正印。正印格为文贵之格，主聪明好学、心地善良、有贵人相助。适合从事教育、文化、学术等领域，易得长辈提携。',
    characteristics: ['聪明好学', '心地善良', '有贵人运', '重视精神生活'],
    favorable: ['官杀（官生印）', '比劫（印生身）'],
    unfavorable: ['财星（财坏印）', '食伤（泄印气）'],
    level: '上格'
  },
  {
    name: '偏印格',
    category: '正格',
    description: '月令本气为偏印。偏印格为异路之格，主思维独特、悟性极高、善于钻研。适合从事偏门、技术、研究、玄学等领域，有特殊才能。',
    characteristics: ['思维独特', '悟性高', '善于钻研', '性格孤僻'],
    favorable: ['七杀（杀印相生）', '偏财（偏财制偏印）'],
    unfavorable: ['食神（枭神夺食）', '正财'],
    level: '中等'
  },
  {
    name: '正财格',
    category: '正格',
    description: '月令本气为正财。正财格为富格之一种，主财运稳定、勤俭持家、务实肯干。正财旺相者多经商或从事财务工作，财富稳步积累。',
    characteristics: ['务实肯干', '勤俭持家', '财运稳定', '重实际利益'],
    favorable: ['官杀（财生官）', '食伤（食伤生财）'],
    unfavorable: ['比劫（比劫夺财）', '印星（印耗财）'],
    level: '上格'
  },
  {
    name: '偏财格',
    category: '正格',
    description: '月令本气为偏财。偏财格为富格之一种，主偏财运旺、交际广泛、有商业头脑。偏财旺相者易有意外之财，适合投资、贸易、销售等行业。',
    characteristics: ['交际广泛', '商业头脑', '偏财运旺', '慷慨大方'],
    favorable: ['官杀（财生官）', '食伤（食伤生财）'],
    unfavorable: ['比劫（比劫分财）', '印星'],
    level: '中上等'
  },
  {
    name: '食神格',
    category: '正格',
    description: '月令本气为食神。食神格为福寿之格，主心地仁厚、生活富足、有口福。食神生财者财源广进，食神制杀者以谋略取胜。',
    characteristics: ['心地仁厚', '有口福', '才华内敛', '生活安逸'],
    favorable: ['财星（食神生财）', '七杀（食神制杀）'],
    unfavorable: ['偏印（枭神夺食）', '印星'],
    level: '中上等'
  },
  {
    name: '伤官格',
    category: '正格',
    description: '月令本气为伤官。伤官格为才华之格，主聪明过人、才华横溢、富有创造力。伤官佩印者贵，伤官生财者富，伤官见官者多灾。',
    characteristics: ['聪明过人', '才华横溢', '富有创造力', '性格叛逆'],
    favorable: ['印星（伤官佩印）', '财星（伤官生财）'],
    unfavorable: ['官星（伤官见官）', '七杀'],
    level: '中等'
  },
  {
    name: '建禄格',
    category: '特别格',
    description: '月令为日主之禄位。建禄格为自立之格，主独立自主、白手起家、身体强健。建禄格不喜多见比劫，宜财官旺相，方能富贵双全。',
    characteristics: ['独立自主', '白手起家', '身体强健', '自尊心强'],
    favorable: ['财星（禄神生财）', '官杀（禄逢官贵）'],
    unfavorable: ['比劫（比劫夺禄）', '印星'],
    level: '中等'
  },
  {
    name: '羊刃格',
    category: '特别格',
    description: '月令为日主之羊刃。羊刃格为刚猛之格，主性格刚强、意志坚定、有闯劲。羊刃驾杀者大贵，羊刃无制者多灾，宜官杀制伏。',
    characteristics: ['性格刚强', '意志坚定', '有闯劲', '易走极端'],
    favorable: ['七杀（羊刃驾杀）', '官星'],
    unfavorable: ['比劫（刃多伤身）', '财星（财生杀）'],
    level: '中下等'
  },
  {
    name: '从强格',
    category: '从格',
    description: '日主旺极无制，满盘比劫印星，无财官或极少。从强格为特殊格局，顺其势而用之。喜比劫印星，忌官杀克伐。人生大起大落。',
    characteristics: ['意志坚强', '独立自主', '大起大落', '不喜约束'],
    favorable: ['比劫', '印星'],
    unfavorable: ['官杀', '财星'],
    level: '特殊格局'
  },
  {
    name: '从弱格',
    category: '从格',
    description: '日主弱极无根，满盘财官食伤，无比劫印星或极少。从弱格为特殊格局，弃命从之。喜财官食伤，忌比劫印星生扶。多随遇而安。',
    characteristics: ['随遇而安', '适应力强', '贵人运佳', '缺乏主见'],
    favorable: ['财星', '官杀', '食伤'],
    unfavorable: ['比劫', '印星'],
    level: '特殊格局'
  }
];

// ============================================================
// 七、其他辅助数据
// ============================================================

// 十神大类详解
export const SHISHEN_DETAIL = {
  '比肩': {
    meaning: '同我且同性',
    positive: '独立自主、意志坚定、有朋相助',
    negative: '固执己见、竞争激烈、破财分利',
    wuxingRelation: '同我'
  },
  '劫财': {
    meaning: '同我且异性',
    positive: '热情积极、善于交际、有冲劲',
    negative: '冲动好胜、易招小人、破财耗财',
    wuxingRelation: '同我'
  },
  '食神': {
    meaning: '我生且同性',
    positive: '聪明智慧、才华横溢、有口福',
    negative: '贪图享乐、好逸恶劳、不思进取',
    wuxingRelation: '我生'
  },
  '伤官': {
    meaning: '我生且异性',
    positive: '才华出众、创造力强、思维敏捷',
    negative: '恃才傲物、叛逆不羁、口舌是非',
    wuxingRelation: '我生'
  },
  '正财': {
    meaning: '我克且异性',
    positive: '财运稳定、勤俭务实、事业有成',
    negative: '过于现实、吝啬小气、劳心劳力',
    wuxingRelation: '我克'
  },
  '偏财': {
    meaning: '我克且同性',
    positive: '偏财运旺、交际广泛、慷慨大方',
    negative: '挥霍浪费、贪多求快、财来财去',
    wuxingRelation: '我克'
  },
  '正官': {
    meaning: '克我且异性',
    positive: '正直负责、奉公守法、有领导才能',
    negative: '墨守成规、压力山大、优柔寡断',
    wuxingRelation: '克我'
  },
  '七杀': {
    meaning: '克我且同性',
    positive: '果断勇敢、有魄力、富冒险精神',
    negative: '暴躁易怒、好勇斗狠、易招灾祸',
    wuxingRelation: '克我'
  },
  '正印': {
    meaning: '生我且异性',
    positive: '聪明好学、心地善良、有贵人相助',
    negative: '依赖性强、过于理想化、不切实际',
    wuxingRelation: '生我'
  },
  '偏印': {
    meaning: '生我且同性',
    positive: '思维独特、悟性极高、善于钻研',
    negative: '性格孤僻、多疑善变、偏激极端',
    wuxingRelation: '生我'
  }
};
