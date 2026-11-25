// 八字排盘相关数据和算法

// 十天干
export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 十二地支
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 十二生肖
export const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 五行
export const WU_XING = ['金', '木', '水', '火', '土'];

// 天干五行
export const TIAN_GAN_WU_XING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行
export const DI_ZHI_WU_XING = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 地支藏干
export const DI_ZHI_CANG_GAN = {
  '子': [{ gan: '癸', type: '本气' }],
  '丑': [
    { gan: '己', type: '本气' },
    { gan: '辛', type: '余气' },
    { gan: '癸', type: '中干' }
  ],
  '寅': [
    { gan: '甲', type: '本气' },
    { gan: '丙', type: '余气' },
    { gan: '戊', type: '中干' }
  ],
  '卯': [{ gan: '乙', type: '本气' }],
  '辰': [
    { gan: '戊', type: '本气' },
    { gan: '乙', type: '余气' },
    { gan: '癸', type: '中干' }
  ],
  '巳': [
    { gan: '丙', type: '本气' },
    { gan: '庚', type: '余气' },
    { gan: '戊', type: '中干' }
  ],
  '午': [
    { gan: '丁', type: '本气' },
    { gan: '己', type: '余气' }
  ],
  '未': [
    { gan: '己', type: '本气' },
    { gan: '丁', type: '余气' },
    { gan: '乙', type: '中干' }
  ],
  '申': [
    { gan: '庚', type: '本气' },
    { gan: '壬', type: '余气' },
    { gan: '戊', type: '中干' }
  ],
  '酉': [{ gan: '辛', type: '本气' }],
  '戌': [
    { gan: '戊', type: '本气' },
    { gan: '丁', type: '余气' },
    { gan: '辛', type: '中干' }
  ],
  '亥': [
    { gan: '壬', type: '本气' },
    { gan: '甲', type: '余气' }
  ]
};

// 纳音五行（六十甲子）
export const NA_YIN = {
  '甲子': '海中金', '乙丑': '海中金',
  '丙寅': '炉中火', '丁卯': '炉中火',
  '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '剑锋金', '癸酉': '剑锋金',
  '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水',
  '戊寅': '城头土', '己卯': '城头土',
  '庚辰': '白蜡金', '辛巳': '白蜡金',
  '壬午': '杨柳木', '癸未': '杨柳木',
  '甲申': '泉中水', '乙酉': '泉中水',
  '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火',
  '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '沙中金', '乙未': '沙中金',
  '丙申': '山下火', '丁酉': '山下火',
  '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土',
  '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆灯火', '乙巳': '覆灯火',
  '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驿土', '己酉': '大驿土',
  '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木',
  '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木',
  '壬戌': '大海水', '癸亥': '大海水'
};

// 十神计算（以日干为核心）
export function calculateShiShen(dayGan, otherGan) {
  const ganIndex = { '甲': 0, '乙': 1, '丙': 2, '丁': 3, '戊': 4, '己': 5, '庚': 6, '辛': 7, '壬': 8, '癸': 9 };
  const dayIdx = ganIndex[dayGan];
  const otherIdx = ganIndex[otherGan];
  
  // 五行关系
  const wuxingRelation = getWuXingRelation(TIAN_GAN_WU_XING[dayGan], TIAN_GAN_WU_XING[otherGan]);
  const isSameYinYang = (dayIdx % 2) === (otherIdx % 2);
  
  if (wuxingRelation === 'same') {
    return isSameYinYang ? '比肩' : '劫财';
  } else if (wuxingRelation === 'sheng') {
    return isSameYinYang ? '食神' : '伤官';
  } else if (wuxingRelation === 'ke') {
    return isSameYinYang ? '偏财' : '正财';
  } else if (wuxingRelation === 'bei-ke') {
    return isSameYinYang ? '七杀' : '正官';
  } else if (wuxingRelation === 'bei-sheng') {
    return isSameYinYang ? '偏印' : '正印';
  }
  return '';
}

function getWuXingRelation(a, b) {
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  
  if (a === b) return 'same';
  if (sheng[a] === b) return 'sheng'; // 我生
  if (ke[a] === b) return 'ke'; // 我克
  if (sheng[b] === a) return 'bei-sheng'; // 生我
  if (ke[b] === a) return 'bei-ke'; // 克我
  return '';
}

// 月界节气表（近似值，适用于1900-2100年）
// 每个"节"标志一个月支的开始
const JIE_QI_BOUNDARIES = [
  { month: 1, day: 6, branch: '丑' },    // 小寒 → 丑月
  { month: 2, day: 4, branch: '寅' },     // 立春 → 寅月
  { month: 3, day: 6, branch: '卯' },     // 惊蛰 → 卯月
  { month: 4, day: 5, branch: '辰' },     // 清明 → 辰月
  { month: 5, day: 6, branch: '巳' },     // 立夏 → 巳月
  { month: 6, day: 6, branch: '午' },     // 芒种 → 午月
  { month: 7, day: 7, branch: '未' },     // 小暑 → 未月
  { month: 8, day: 8, branch: '申' },     // 立秋 → 申月
  { month: 9, day: 8, branch: '酉' },     // 白露 → 酉月
  { month: 10, day: 8, branch: '戌' },    // 寒露 → 戌月
  { month: 11, day: 7, branch: '亥' },    // 立冬 → 亥月
  { month: 12, day: 7, branch: '子' },    // 大雪 → 子月
];

// 根据公历日期判断月支（以节气为界）
function getMonthBranchByDate(month, day) {
  const dateNum = month * 100 + day;
  for (let i = JIE_QI_BOUNDARIES.length - 1; i >= 0; i--) {
    const b = JIE_QI_BOUNDARIES[i];
    if (dateNum >= b.month * 100 + b.day) {
      return b.branch;
    }
  }
  // 1月1日-1月5日在大雪(12月7日)之后，属于子月
  return '子';
}

// 判断是否在立春之前（决定年柱归属）
function isBeforeLiChun(month, day) {
  return month === 1 || (month === 2 && day < 4);
}

// 计算年柱（以立春为界）
export function getYearPillar(year, month, day) {
  let actualYear = year;
  if (isBeforeLiChun(month, day)) {
    actualYear = year - 1;
  }
  const yearGanIndex = (actualYear - 4) % 10;
  const yearZhiIndex = (actualYear - 4) % 12;
  return {
    gan: TIAN_GAN[yearGanIndex < 0 ? yearGanIndex + 10 : yearGanIndex],
    zhi: DI_ZHI[yearZhiIndex < 0 ? yearZhiIndex + 12 : yearZhiIndex]
  };
}

// 计算月柱（以节气为界）
export function getMonthPillar(year, month, day) {
  const zhi = getMonthBranchByDate(month, day);
  const yearGan = getYearPillar(year, month, day).gan;
  const wuHuDun = {
    '甲': '丙', '己': '丙',
    '乙': '戊', '庚': '戊',
    '丙': '庚', '辛': '庚',
    '丁': '壬', '壬': '壬',
    '戊': '甲', '癸': '甲'
  };
  const firstMonthGan = wuHuDun[yearGan];
  const monthBranchOrder = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
  const zhiOffset = monthBranchOrder.indexOf(zhi);
  const ganIndex = (TIAN_GAN.indexOf(firstMonthGan) + zhiOffset) % 10;
  return { gan: TIAN_GAN[ganIndex], zhi };
}

// 计算日柱（简化算法）
export function getDayPillar(year, month, day) {
  // 简化：使用基准日推算
  const baseDate = new Date(1900, 0, 1); // 1900年1月1日为甲戌日（简化）
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  // 1900年1月1日是甲戌日 (索引 10, 10)
  const baseGanIndex = 0; // 假设基准日为甲子
  const baseZhiIndex = 0;
  
  const ganIndex = (baseGanIndex + diffDays) % 10;
  const zhiIndex = (baseZhiIndex + diffDays) % 12;
  
  return {
    gan: TIAN_GAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
    zhi: DI_ZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
  };
}

// 计算时柱
export function getHourPillar(dayGan, hour) {
  // 十二时辰
  const shiChenZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const zhiIndex = Math.floor((hour + 1) / 2) % 12;
  const zhi = shiChenZhi[zhiIndex];
  
  // 五鼠遁时干
  const wuShuDun = {
    '甲': '甲', '己': '甲',
    '乙': '丙', '庚': '丙',
    '丙': '戊', '辛': '戊',
    '丁': '庚', '壬': '庚',
    '戊': '壬', '癸': '壬'
  };
  const firstHourGan = wuShuDun[dayGan];
  const ganIndex = (TIAN_GAN.indexOf(firstHourGan) + zhiIndex) % 10;
  
  return { gan: TIAN_GAN[ganIndex], zhi };
}

// 完整排盘
export function calculateBazi(year, month, day, hour, gender = '男') {
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(dayPillar.gan, hour);
  
  const pillars = [
    { name: '年柱', ...yearPillar, position: '年' },
    { name: '月柱', ...monthPillar, position: '月' },
    { name: '日柱', ...dayPillar, position: '日' },
    { name: '时柱', ...hourPillar, position: '时' }
  ];
  
  // 计算十神
  const dayGan = dayPillar.gan;
  pillars.forEach(pillar => {
    pillar.ganShiShen = calculateShiShen(dayGan, pillar.gan);
    const zhiCangGan = DI_ZHI_CANG_GAN[pillar.zhi];
    pillar.zhiCangGan = zhiCangGan.map(cg => ({
      ...cg,
      shiShen: calculateShiShen(dayGan, cg.gan)
    }));
  });
  
  // 五行统计
  const wuxingCount = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
  pillars.forEach(pillar => {
    wuxingCount[TIAN_GAN_WU_XING[pillar.gan]]++;
    const cangGan = DI_ZHI_CANG_GAN[pillar.zhi];
    cangGan.forEach(cg => {
      if (cg.type === '本气') wuxingCount[TIAN_GAN_WU_XING[cg.gan]]++;
    });
  });
  
  // 纳音
  pillars.forEach(pillar => {
    pillar.naYin = NA_YIN[pillar.gan + pillar.zhi] || '';
  });
  
  // 生肖（以立春为界，与年柱一致）
  const shengXiao = SHENG_XIAO[DI_ZHI.indexOf(yearPillar.zhi)];
  
  return {
    pillars,
    dayGan,
    wuxingCount,
    shengXiao,
    gender
  };
}

// 基础神煞（简化版）
export function getBasicShenSha(bazi) {
  const yearZhi = bazi.pillars[0].zhi;
  const dayZhi = bazi.pillars[2].zhi;
  
  const shensha = {
    tianYiGuiRen: [], // 天乙贵人
    taoHua: [], // 桃花
    yiMa: [] // 驿马
  };
  
  // 天乙贵人（年干或日干查）
  const tianYiMap = {
    '甲': ['丑', '未'], '乙': ['子', '申'],
    '丙': ['亥', '酉'], '丁': ['亥', '酉'],
    '戊': ['丑', '未'], '己': ['子', '申'],
    '庚': ['丑', '未'], '辛': ['寅', '午'],
    '壬': ['卯', '巳'], '癸': ['卯', '巳']
  };
  
  const dayGan = bazi.dayGan;
  const guiRenZhi = tianYiMap[dayGan] || [];
  bazi.pillars.forEach(p => {
    if (guiRenZhi.includes(p.zhi)) {
      shensha.tianYiGuiRen.push(p.position + '柱');
    }
  });
  
  // 桃花（年支或日支查）
  const taoHuaMap = {
    '子': '酉', '丑': '午', '寅': '卯', '卯': '子',
    '辰': '酉', '巳': '午', '午': '卯', '未': '子',
    '申': '酉', '酉': '午', '戌': '卯', '亥': '子'
  };
  const taoHuaZhi = taoHuaMap[dayZhi];
  bazi.pillars.forEach(p => {
    if (p.zhi === taoHuaZhi) {
      shensha.taoHua.push(p.position + '柱');
    }
  });
  
  // 驿马
  const yiMaMap = {
    '子': '寅', '丑': '亥', '寅': '申', '卯': '巳',
    '辰': '寅', '巳': '亥', '午': '申', '未': '巳',
    '申': '寅', '酉': '亥', '戌': '申', '亥': '巳'
  };
  const yiMaZhi = yiMaMap[dayZhi];
  bazi.pillars.forEach(p => {
    if (p.zhi === yiMaZhi) {
      shensha.yiMa.push(p.position + '柱');
    }
  });
  
  return shensha;
}
