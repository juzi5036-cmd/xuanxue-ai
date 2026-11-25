// 风水基础数据

// 东西四命计算
export function calculateDongXiMing(year, gender) {
  // 男命公式：(100 - 出生年后两位) / 9 取余数
  // 女命公式：(出生年后两位 - 4) / 9 取余数
  
  const yearLastTwo = year % 100;
  let remainder;
  
  if (gender === '男') {
    remainder = (100 - yearLastTwo) % 9;
  } else {
    remainder = (yearLastTwo - 4) % 9;
  }
  
  if (remainder === 0) remainder = 9;
  
  // 九宫配卦
  const guaMap = {
    1: { name: '坎', type: '东四命', direction: '北', element: '水' },
    2: { name: '坤', type: '西四命', direction: '西南', element: '土' },
    3: { name: '震', type: '东四命', direction: '东', element: '木' },
    4: { name: '巽', type: '东四命', direction: '东南', element: '木' },
    5: gender === '男' 
      ? { name: '坤', type: '西四命', direction: '西南', element: '土' }
      : { name: '艮', type: '西四命', direction: '东北', element: '土' },
    6: { name: '乾', type: '西四命', direction: '西北', element: '金' },
    7: { name: '兑', type: '西四命', direction: '西', element: '金' },
    8: { name: '艮', type: '西四命', direction: '东北', element: '土' },
    9: { name: '离', type: '东四命', direction: '南', element: '火' },
  };
  
  const result = guaMap[remainder];
  
  return {
    year,
    gender,
    remainder,
    ...result,
    luckyDirection: result.type === '东四命' 
      ? ['东', '东南', '南', '北']
      : ['西', '西北', '西南', '东北'],
    unluckyDirection: result.type === '东四命'
      ? ['西', '西北', '西南', '东北']
      : ['东', '东南', '南', '北'],
    suggestion: getFengshuiSuggestion(result),
  };
}

function getFengshuiSuggestion(gua) {
  const suggestions = {
    '坎': '坎卦属水，适合坐北朝南的房子，卧室宜在北方或东方。',
    '坤': '坤卦属土，适合坐西南朝东北的房子，卧室宜在西南方。',
    '震': '震卦属木，适合坐东朝西的房子，卧室宜在东方或东南方。',
    '巽': '巽卦属木，适合坐东南朝西北的房子，卧室宜在东南方。',
    '乾': '乾卦属金，适合坐西北朝东南的房子，卧室宜在西北方。',
    '兑': '兑卦属金，适合坐西朝东的房子，卧室宜在西方。',
    '艮': '艮卦属土，适合坐东北朝西南的房子，卧室宜在东北方。',
    '离': '离卦属火，适合坐南朝北的房子，卧室宜在南方或东方。',
  };
  return suggestions[gua.name] || '';
}

// 五行配色
export const WUXING_COLORS = {
  '金': {
    colors: ['白色', '银色', '金色', '灰白色'],
    suitable: ['客厅', '书房', '办公室'],
    effect: '提升财运、增强决断力、带来贵人运',
    avoid: ['卧室', '厨房'],
  },
  '木': {
    colors: ['绿色', '青色', '翠绿色', '墨绿色'],
    suitable: ['书房', '客厅', '阳台'],
    effect: '促进健康、增强活力、带来学业运',
    avoid: ['卧室', '厨房'],
  },
  '水': {
    colors: ['黑色', '深蓝色', '灰色', '蓝黑色'],
    suitable: ['书房', '客厅', '玄关'],
    effect: '提升智慧、增强财运流动、带来事业运',
    avoid: ['卧室', '厨房', '儿童房'],
  },
  '火': {
    colors: ['红色', '橙色', '紫色', '粉红色'],
    suitable: ['客厅', '餐厅', '厨房'],
    effect: '提升热情、增强名气、带来桃花运',
    avoid: ['卧室', '书房', '卫生间'],
  },
  '土': {
    colors: ['黄色', '咖啡色', '棕色', '米色'],
    suitable: ['客厅', '卧室', '餐厅'],
    effect: '增强稳定、提升健康运、带来贵人运',
    avoid: ['书房', '儿童房'],
  },
};

// 根据喜用神推荐配色
export function getWuxingPeise(likes, dislikes) {
  const recommendations = [];
  
  likes.forEach(wuxing => {
    if (WUXING_COLORS[wuxing]) {
      recommendations.push({
        wuxing,
        type: '喜用',
        ...WUXING_COLORS[wuxing],
        tip: `可多用${WUXING_COLORS[wuxing].colors.join('、')}，有助于提升运势`
      });
    }
  });
  
  dislikes.forEach(wuxing => {
    if (WUXING_COLORS[wuxing]) {
      recommendations.push({
        wuxing,
        type: '忌用',
        ...WUXING_COLORS[wuxing],
        tip: `尽量少用${WUXING_COLORS[wuxing].colors.join('、')}`
      });
    }
  });
  
  return recommendations;
}

// ========== 一、住宅坐向吉凶数据 ==========

// 八宅坐向数据
export const HOUSE_ZUOXIANG = {
  '坐北朝南': {
    name: '坐北朝南（坎宅）',
    zhaiGua: '坎',
    element: '水',
    dongximing: '东四命',
    jixiongLevel: '吉',
    score: 85,
    advantages: [
      '采光充足，冬季温暖夏季凉爽',
      '符合中国传统风水理念，气场顺和',
      '有利于事业发展和学业进步',
      '家中男主人运势旺盛',
      '财运稳定，有积蓄之象',
    ],
    disadvantages: [
      '若前方有遮挡则运势受阻',
      '北方受寒气影响，需注意肾脏健康',
      '门窗过多则气散不聚',
    ],
    suitablePeople: [
      '东四命之人（坎、离、震、巽）',
      '从事文职、教育、科研工作者',
      '家中有读书子女的家庭',
      '追求事业稳定发展的人群',
    ],
    doorDirection: {
      auspicious: ['东', '东南', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '东南（生气方）',
      worst: '西南（绝命方）',
    },
    masterBedroom: {
      auspicious: ['北', '东', '东南', '南'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '北方（延年方）',
      worst: '西南方（绝命方）',
      tip: '床头宜靠北墙，避免靠窗',
    },
    kitchen: {
      auspicious: ['东', '东南', '南'],
      inauspicious: ['北', '西', '西北', '西南', '东北'],
      best: '东方（天医方）',
      worst: '北方（水火相冲）',
      tip: '灶台不宜正对北方水面，以免水火相克',
    },
  },
  '坐南朝北': {
    name: '坐南朝北（离宅）',
    zhaiGua: '离',
    element: '火',
    dongximing: '东四命',
    jixiongLevel: '中吉',
    score: 75,
    advantages: [
      '南方为离火，主名声与文采',
      '有利于人际关系和社交活动',
      '家中女主人地位较高',
      '有利于从事艺术、传媒行业者',
      '桃花运较旺',
    ],
    disadvantages: [
      '北向采光相对较弱',
      '冬季较为寒冷，取暖费用高',
      '火气过旺易有口舌是非',
      '财运起伏较大',
    ],
    suitablePeople: [
      '东四命之人（坎、离、震、巽）',
      '从事艺术、传媒、演艺工作者',
      '需要拓展人脉的商务人士',
      '单身求姻缘者',
    ],
    doorDirection: {
      auspicious: ['东', '东南', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '东方（生气方）',
      worst: '西北（绝命方）',
    },
    masterBedroom: {
      auspicious: ['南', '东', '东南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '南方（延年方）',
      worst: '西北方（绝命方）',
      tip: '床头宜靠南墙，有利于夫妻感情',
    },
    kitchen: {
      auspicious: ['南', '东', '东南'],
      inauspicious: ['北', '西', '西北', '西南', '东北'],
      best: '南方（伏位方）',
      worst: '北方（水火相冲）',
      tip: '厨房在南方火旺，宜用浅色调中和',
    },
  },
  '坐东朝西': {
    name: '坐东朝西（震宅）',
    zhaiGua: '震',
    element: '木',
    dongximing: '东四命',
    jixiongLevel: '吉',
    score: 80,
    advantages: [
      '东方为震木，主生发与朝气',
      '早晨阳光充足，充满活力',
      '有利于长子运势和事业发展',
      '家中人丁兴旺，身体健康',
      '贵人运较好',
    ],
    disadvantages: [
      '西晒问题影响居住舒适度',
      '下午室内温度较高',
      '木气过旺易有冲动决策',
      '需注意肝胆健康',
    ],
    suitablePeople: [
      '东四命之人（坎、离、震、巽）',
      '创业者和年轻奋斗者',
      '家中有男孩的家庭',
      '从事体育、运动行业者',
    ],
    doorDirection: {
      auspicious: ['东', '东南', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '南方（生气方）',
      worst: '西方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['东', '东南', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '东南方（延年方）',
      worst: '西方（绝命方）',
      tip: '床头宜靠东墙，象征蒸蒸日上',
    },
    kitchen: {
      auspicious: ['南', '东', '东南'],
      inauspicious: ['北', '西', '西北', '西南', '东北'],
      best: '南方（天医方）',
      worst: '西方（金克木）',
      tip: '厨房宜用绿色系装饰，助木火相生',
    },
  },
  '坐西朝东': {
    name: '坐西朝东（兑宅）',
    zhaiGua: '兑',
    element: '金',
    dongximing: '西四命',
    jixiongLevel: '中吉',
    score: 78,
    advantages: [
      '西方为兑金，主财运与口舌',
      '早晨采光良好，阳气充足',
      '有利于少女、幼女运势',
      '财运亨通，有意外之财',
      '口才和表达能力提升',
    ],
    disadvantages: [
      '下午采光不足，略显阴暗',
      '金气过旺易有口舌之争',
      '需注意肺部和呼吸系统健康',
      '感情生活易有波折',
    ],
    suitablePeople: [
      '西四命之人（乾、兑、坤、艮）',
      '从事销售、演讲、律师等以口才为生者',
      '家中有女孩的家庭',
      '经商求财之人',
    ],
    doorDirection: {
      auspicious: ['西', '西北', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '东北方（生气方）',
      worst: '东方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['西', '西北', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西北方（延年方）',
      worst: '东方（绝命方）',
      tip: '床头宜靠西墙，有助于聚财',
    },
    kitchen: {
      auspicious: ['南', '西南', '东北'],
      inauspicious: ['北', '东', '东南', '西', '西北'],
      best: '西南方（天医方）',
      worst: '西北方（火烧天门）',
      tip: '厨房不宜在西北方，以免火克金',
    },
  },
  '坐东南朝西北': {
    name: '坐东南朝西北（巽宅）',
    zhaiGua: '巽',
    element: '木',
    dongximing: '东四命',
    jixiongLevel: '吉',
    score: 82,
    advantages: [
      '东南为巽木，主文昌与财运',
      '通风良好，空气清新',
      '有利于长女运势和学业',
      '文昌位旺，读书考试运佳',
      '财运稳步上升',
    ],
    disadvantages: [
      '西北方向冬季寒风较盛',
      '湿气较重，需注意防潮',
      '木气过盛易导致优柔寡断',
      '需注意神经系统健康',
    ],
    suitablePeople: [
      '东四命之人（坎、离、震、巽）',
      '家中有学生的家庭',
      '从事文职、写作、教育工作者',
      '追求学业和事业进步的人',
    ],
    doorDirection: {
      auspicious: ['东', '东南', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '北方（生气方）',
      worst: '西北方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['东南', '东', '南', '北'],
      inauspicious: ['西', '西北', '西南', '东北'],
      best: '东方（延年方）',
      worst: '西北方（绝命方）',
      tip: '床头宜靠东南墙，旺文昌和贵人运',
    },
    kitchen: {
      auspicious: ['南', '东', '东南'],
      inauspicious: ['北', '西', '西北', '西南', '东北'],
      best: '南方（天医方）',
      worst: '西北方（金克木）',
      tip: '厨房宜保持干燥通风，避免潮湿',
    },
  },
  '坐西北朝东南': {
    name: '坐西北朝东南（乾宅）',
    zhaiGua: '乾',
    element: '金',
    dongximing: '西四命',
    jixiongLevel: '大吉',
    score: 90,
    advantages: [
      '西北为乾金，主官贵与权威',
      '东南朝向采光通风俱佳',
      '有利于男主人事业和地位',
      '贵人运旺盛，易得长辈提携',
      '家庭和睦，福寿双全',
    ],
    disadvantages: [
      '西北方冬季寒冷，需保暖',
      '金气过旺易刚愎自用',
      '需注意头面部和骨骼健康',
      '对家中男性要求较高',
    ],
    suitablePeople: [
      '西四命之人（乾、兑、坤、艮）',
      '企业高管、政府官员等领导层',
      '家中有长辈的大家庭',
      '追求社会地位和名誉者',
    ],
    doorDirection: {
      auspicious: ['西', '西北', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西南方（生气方）',
      worst: '南方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['西北', '西', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西方（延年方）',
      worst: '南方（绝命方）',
      tip: '床头宜靠西北墙，象征靠山稳固',
    },
    kitchen: {
      auspicious: ['西南', '东北', '南'],
      inauspicious: ['北', '东', '东南', '西', '西北'],
      best: '东北方（天医方）',
      worst: '西北方（火烧天门大忌）',
      tip: '厨房绝对不可设在西北方，为风水大忌',
    },
  },
  '坐东北朝西南': {
    name: '坐东北朝西南（艮宅）',
    zhaiGua: '艮',
    element: '土',
    dongximing: '西四命',
    jixiongLevel: '中吉',
    score: 76,
    advantages: [
      '东北为艮土，主稳定与积蓄',
      '西南朝向下午阳光充足',
      '有利于少男运势和健康',
      '财运稳定，善于积蓄',
      '家庭根基稳固',
    ],
    disadvantages: [
      '东北方向冬季寒冷',
      '土气过旺易固执保守',
      '需注意脾胃健康',
      '事业发展速度较慢',
    ],
    suitablePeople: [
      '西四命之人（乾、兑、坤、艮）',
      '追求稳定生活的家庭',
      '家中有小儿子的家庭',
      '从事房地产、建筑行业者',
    ],
    doorDirection: {
      auspicious: ['西', '西北', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西方（生气方）',
      worst: '东方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['东北', '西北', '西南', '西'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西南方（延年方）',
      worst: '东方（绝命方）',
      tip: '床头宜靠东北墙，有助于安稳睡眠',
    },
    kitchen: {
      auspicious: ['西南', '南', '东北'],
      inauspicious: ['北', '东', '东南', '西', '西北'],
      best: '西南方（天医方）',
      worst: '东北方（土重火熄）',
      tip: '厨房宜用暖色调，助火土相生',
    },
  },
  '坐西南朝东北': {
    name: '坐西南朝东北（坤宅）',
    zhaiGua: '坤',
    element: '土',
    dongximing: '西四命',
    jixiongLevel: '吉',
    score: 80,
    advantages: [
      '西南为坤土，主包容与生育',
      '东北朝向早晨采光良好',
      '有利于女主人和母亲运势',
      '生育运旺，人丁兴旺',
      '财运丰厚，家底殷实',
    ],
    disadvantages: [
      '西南方向夏季湿热',
      '土气过重易懒散拖延',
      '需注意肠胃和皮肤健康',
      '家中女性压力较大',
    ],
    suitablePeople: [
      '西四命之人（乾、兑、坤、艮）',
      '以女主人为核心的家庭',
      '计划生育或有幼儿的家庭',
      '从事农业、地产、服务业者',
    ],
    doorDirection: {
      auspicious: ['西', '西北', '西南', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '西北方（生气方）',
      worst: '北方（绝命方）',
    },
    masterBedroom: {
      auspicious: ['西南', '西北', '西', '东北'],
      inauspicious: ['东', '东南', '南', '北'],
      best: '东北方（延年方）',
      worst: '北方（绝命方）',
      tip: '床头宜靠西南墙，象征厚德载物',
    },
    kitchen: {
      auspicious: ['南', '西南', '东北'],
      inauspicious: ['北', '东', '东南', '西', '西北'],
      best: '南方（天医方）',
      worst: '北方（水土相克）',
      tip: '厨房宜保持整洁，避免杂物堆积',
    },
  },
};

// 坐向与宅卦对应表
export const ZUOXIANG_ZHAIGUA_MAP = {
  '坐北朝南': '坎',
  '坐南朝北': '离',
  '坐东朝西': '震',
  '坐西朝东': '兑',
  '坐东南朝西北': '巽',
  '坐西北朝东南': '乾',
  '坐东北朝西南': '艮',
  '坐西南朝东北': '坤',
};

/**
 * 计算住宅坐向综合风水分析
 * @param {string} zuoxiang - 坐向，如"坐北朝南"
 * @param {string} dongximing - 东西四命，"东四命"或"西四命"
 * @returns {object} 综合分析结果
 */
export function calculateHouseFengshui(zuoxiang, dongximing) {
  const house = HOUSE_ZUOXIANG[zuoxiang];
  if (!house) {
    return {
      success: false,
      message: '未找到该坐向的风水数据',
    };
  }

  // 判断命卦与宅卦是否相配
  const isMatch = house.dongximing === dongximing;
  let matchLevel = '';
  let matchScore = 0;
  let matchDesc = '';

  if (isMatch) {
    matchLevel = '上等婚配';
    matchScore = 100;
    matchDesc = '您的命卦与宅卦同属东四命或西四命，宅命相配，气场和谐，居住后运势亨通，诸事顺遂。';
  } else {
    matchLevel = '下等婚配';
    matchScore = 50;
    matchDesc = '您的命卦与宅卦不属于同一体系，宅命不相配，气场有所冲突。可通过调整内部布局、选用合适的颜色和摆件来化解。';
  }

  // 综合评分
  let totalScore = Math.round(house.score * 0.6 + matchScore * 0.4);

  // 综合等级
  let overallLevel = '';
  if (totalScore >= 90) overallLevel = '大吉';
  else if (totalScore >= 80) overallLevel = '吉';
  else if (totalScore >= 70) overallLevel = '中吉';
  else if (totalScore >= 60) overallLevel = '平';
  else overallLevel = '凶';

  return {
    success: true,
    zuoxiang: house.name,
    zhaiGua: house.zhaiGua,
    element: house.element,
    dongximing: house.dongximing,
    userDongximing: dongximing,
    jixiongLevel: house.jixiongLevel,
    baseScore: house.score,
    matchLevel,
    matchScore,
    matchDesc,
    overallLevel,
    totalScore,
    advantages: house.advantages,
    disadvantages: house.disadvantages,
    suitablePeople: house.suitablePeople,
    doorDirection: house.doorDirection,
    masterBedroom: house.masterBedroom,
    kitchen: house.kitchen,
    suggestions: generateHouseSuggestions(house, isMatch, dongximing),
  };
}

function generateHouseSuggestions(house, isMatch, dongximing) {
  const suggestions = [];

  if (isMatch) {
    suggestions.push('宅命相配，大吉大利，可放心居住。');
    suggestions.push(`建议大门开在${house.doorDirection.best}，可增旺家运。`);
    suggestions.push(`主卧宜设在${house.masterBedroom.best}，有利于夫妻感情和健康。`);
  } else {
    suggestions.push('宅命不相配，需通过内部布局调整来化解。');
    suggestions.push('可在吉方多活动、多停留，凶方少使用或做化解处理。');
    suggestions.push(`可多使用${house.element}属性的颜色和材质来增强宅气。`);
    suggestions.push('建议请专业风水师现场勘测，制定详细化解方案。');
  }

  suggestions.push(house.kitchen.tip);
  suggestions.push(house.masterBedroom.tip);

  return suggestions;
}

// ========== 二、厨卫五行适配数据 ==========

// 厨房风水数据 - 按方位
export const KITCHEN_FENGSHUI = {
  '东': {
    direction: '东方',
    element: '木',
    jixiong: '吉',
    score: 85,
    description: '东方属木，木生火，为厨房吉利方位。饮食健康，家人和睦。',
    advantages: [
      '木火相生，利于家人健康',
      '财运稳定，衣食无忧',
      '家中人丁兴旺，精神饱满',
      '有利于长子学业事业',
    ],
    disadvantages: [
      '木气过旺易脾气急躁',
      '需注意肝胆方面健康',
    ],
    stoveDirection: {
      auspicious: ['南', '东', '东南'],
      inauspicious: ['北', '西', '西北'],
      best: '坐东朝西',
      worst: '坐北朝南（水火相冲）',
      tip: '灶台宜坐东朝西或坐东南朝西北，忌坐北朝南。',
    },
    colors: {
      suitable: ['绿色', '青色', '木色', '浅棕色'],
      avoid: ['红色', '橙色（过旺）', '黑色', '深蓝色'],
      recommend: '建议以绿色系和木色系为主，搭配少量白色点缀。',
    },
    taboos: [
      '灶台不可正对厨房门',
      '灶台不可与水龙头相对',
      '厨房不可与卫生间相邻',
      '灶台上方不可有横梁压顶',
      '厨房不可设在两个卧室中间',
      '灶台不可背后无靠（靠窗）',
    ],
    layoutTip: '厨房在东方为木火通明之象，宜保持明亮整洁，可摆放绿植增强木气。',
    luckyItems: [
      '富贵竹、发财树等绿植',
      '木质餐具和橱柜',
      '陶瓷器皿（火生土、土生金）',
      '新鲜水果摆件',
      '福禄寿喜字贴',
    ],
    unluckyItems: [
      '金属刀具外露',
      '黑色、深蓝色装饰',
      '鱼缸等水景',
    ],
    colorSuggestion: ['绿色', '青色', '木色', '浅棕色'],
    avoidColors: ['红色', '黑色', '深蓝色'],
    healthEffect: '木火相生，利于家人健康，精力充沛，但木气过旺需注意肝胆方面的保养。',
    wealthEffect: '财运稳定，衣食无忧，有正财收入，善于积蓄，适合从事稳定职业的家庭。',
    familyEffect: '家中人丁兴旺，家人和睦，有利于长子学业和事业发展，长幼有序。',
    resolution: '此方位为吉，无需化解。若木气过旺，可适当增加白色系装饰以金克木调和。',
  },
  '东南': {
    direction: '东南方',
    element: '木',
    jixiong: '吉',
    score: 82,
    description: '东南方属木，为文昌位，木火相生，主学业和名声。',
    advantages: [
      '利于文昌运，家人聪明好学',
      '财运亨通，有意外之财',
      '人际关系和谐，贵人相助',
      '有利于长女运势',
    ],
    disadvantages: [
      '湿气较重，需注意防潮',
      '木气过盛易优柔寡断',
    ],
    stoveDirection: {
      auspicious: ['南', '东', '东南'],
      inauspicious: ['北', '西', '西北'],
      best: '坐东南朝西北',
      worst: '坐北朝南',
      tip: '灶台宜坐东南朝西北，忌坐北朝南水火相冲。',
    },
    colors: {
      suitable: ['浅绿色', '青色', '原木色', '米白色'],
      avoid: ['大红色', '黑色', '深蓝色'],
      recommend: '建议以浅绿和木色为主，营造清新自然的厨房氛围。',
    },
    taboos: [
      '灶台不可正对阳台门',
      '厨房不可堆放杂物',
      '灶台不可与冰箱相对',
      '厨房门不可正对卧室门',
      '抽油烟机和灶台之间不可开窗',
    ],
    layoutTip: '东南厨房通风良好，宜多开窗换气，可摆放富贵竹等水培植物。',
    luckyItems: [
      '富贵竹（水培，旺文昌）',
      '文昌塔或毛笔架',
      '陶瓷花瓶',
      '新鲜绿植如吊兰、常春藤',
      '木质收纳柜',
    ],
    unluckyItems: [
      '黑色、深蓝色装饰',
      '尖锐金属物品外露',
      '堆积杂物旧书',
    ],
    colorSuggestion: ['浅绿色', '青色', '原木色', '米白色'],
    avoidColors: ['大红色', '黑色', '深蓝色'],
    healthEffect: '木火相生，家人精神饱满，文昌运旺利于思考，但湿气较重需注意脾胃和关节保养。',
    wealthEffect: '财运亨通，有意外之财和贵人相助，人际关系带来的财运较为明显。',
    familyEffect: '家人关系和谐，贵人运旺，有利于长女运势和子女学业，家庭文化氛围浓厚。',
    resolution: '此方位为吉，无需化解。若木气过盛，可用白色系装饰调和，增强金气制约木气。',
  },
  '南': {
    direction: '南方',
    element: '火',
    jixiong: '中平',
    score: 65,
    description: '南方属火，火气过重，易有口舌是非，需适当化解。',
    advantages: [
      '采光充足，阳气旺盛',
      '有利于名声和社交运',
      '从事艺术行业者有助益',
      '女主人运势较强',
    ],
    disadvantages: [
      '火气过旺，易烦躁不安',
      '容易有口舌之争',
      '夏季室内温度过高',
      '需注意心脏和眼部健康',
    ],
    stoveDirection: {
      auspicious: ['东', '东南', '南'],
      inauspicious: ['北', '西', '西北'],
      best: '坐南朝北',
      worst: '坐北朝南',
      tip: '灶台宜坐南朝北，借助北方水气调和火气。',
    },
    colors: {
      suitable: ['白色', '银色', '浅灰色', '米黄色'],
      avoid: ['红色', '橙色', '紫色', '深棕色'],
      recommend: '建议以白色、银色等冷色调为主，中和过旺火气。',
    },
    taboos: [
      '厨房不宜用过多红色装饰',
      '灶台不可与窗户正对',
      '厨房不宜与卫生间共用一墙',
      '灶台上方不可装镜子',
      '厨房不可设在房屋正中央',
    ],
    layoutTip: '南方厨房火气重，宜用冷色调中和，可摆放水晶或水景装饰。',
    luckyItems: [
      '水晶摆件（中和火气）',
      '白色陶瓷器皿',
      '金属厨具（如不锈钢锅具）',
      '水培植物或小鱼缸',
      '葫芦（化口舌是非）',
    ],
    unluckyItems: [
      '红色装饰和红色灯具',
      '大量木质家具（木生火加重火气）',
      '紫色系装饰',
    ],
    colorSuggestion: ['白色', '银色', '浅灰色', '米黄色'],
    avoidColors: ['红色', '橙色', '紫色'],
    healthEffect: '火气过旺易导致心脑血管疾病、眼部不适、上火发炎，需注意心脏和血压保养。',
    wealthEffect: '财运起伏较大，来得快去得也快，易有意外开销，需注意理财规划。',
    familyEffect: '易有口舌是非和家庭争吵，女主人脾气较急躁，夫妻间需多沟通忍让。',
    resolution: '用土泄火气、金生水来调和。宜多用白色银色装饰，摆放陶瓷器皿和水晶，厨房地面用土黄色系。',
  },
  '西南': {
    direction: '西南方',
    element: '土',
    jixiong: '中吉',
    score: 75,
    description: '西南方属土，火生土，厨房在此主家庭和睦，饮食健康。',
    advantages: [
      '火土相生，家庭稳定',
      '女主人身体健康',
      '财运丰厚，积蓄较多',
      '有利于孕育后代',
    ],
    disadvantages: [
      '土气过重易懒散',
      '夏季较为闷热',
      '需注意脾胃健康',
    ],
    stoveDirection: {
      auspicious: ['南', '西南', '东北'],
      inauspicious: ['北', '东', '东南'],
      best: '坐西南朝东北',
      worst: '坐东北朝西南',
      tip: '灶台宜坐西南朝东北，火生土助旺家运。',
    },
    colors: {
      suitable: ['黄色', '米色', '咖啡色', '土棕色'],
      avoid: ['黑色', '深蓝色', '绿色'],
      recommend: '建议以暖黄色系为主，营造温馨的厨房氛围。',
    },
    taboos: [
      '厨房地面不可高于客厅',
      '灶台不可在横梁下方',
      '厨房门不可正对大门',
      '灶台不可紧靠卫生间墙',
      '厨房不宜阴暗潮湿',
    ],
    layoutTip: '西南厨房主女主人，宜保持整洁明亮，可摆放陶器增强土气。',
    luckyItems: [
      '陶瓷器皿和陶罐',
      '山石摆件或黄玉',
      '五谷丰登装饰画',
      '黄色系餐具和橱柜',
      '新鲜瓜果摆件',
    ],
    unluckyItems: [
      '黑色、深蓝色装饰',
      '大型鱼缸或水景',
      '过多绿植（木克土）',
    ],
    colorSuggestion: ['黄色', '米色', '咖啡色', '土棕色'],
    avoidColors: ['黑色', '深蓝色', '绿色'],
    healthEffect: '火生土，脾胃功能较好，饮食健康，女主人身体较为强健，但需注意湿气和体重管理。',
    wealthEffect: '财运丰厚，积蓄较多，正财运旺盛，适合稳健理财，有不动产运。',
    familyEffect: '家庭稳定和睦，女主人持家有道，有利于孕育后代，婆媳关系较和谐。',
    resolution: '此方位为中吉，无需重点化解。若土气过重，可用白色金属装饰泄土气。',
  },
  '西': {
    direction: '西方',
    element: '金',
    jixiong: '中平',
    score: 60,
    description: '西方属金，火克金，厨房在此易有口舌是非，需化解。',
    advantages: [
      '下午采光较好',
      '有利于口才和表达',
      '从事销售行业有帮助',
    ],
    disadvantages: [
      '火克金，财运有损耗',
      '易有口舌之争',
      '需注意肺部健康',
      '西晒问题影响使用',
    ],
    stoveDirection: {
      auspicious: ['南', '西南', '东北'],
      inauspicious: ['北', '西', '西北'],
      best: '坐西朝东',
      worst: '坐东朝西',
      tip: '灶台宜坐西朝东，迎东方木气助火。',
    },
    colors: {
      suitable: ['白色', '银色', '金色', '浅黄色'],
      avoid: ['红色', '橙色', '紫色'],
      recommend: '建议以白色系和金属色为主，减少火气对金的克制。',
    },
    taboos: [
      '厨房不宜用过多红色',
      '灶台不可正对西方窗户',
      '厨房门不可正对卧室',
      '灶台不可与水槽成一直线',
      '厨房不宜堆放金属刀具外露',
    ],
    layoutTip: '西方厨房火克金，宜多用白色和金属厨具化解，可摆放铜麒麟。',
    luckyItems: [
      '铜麒麟或铜象（化火克金）',
      '白色陶瓷器皿',
      '不锈钢厨具',
      '黄色系装饰（土生金）',
      '铜葫芦化煞',
    ],
    unluckyItems: [
      '红色装饰和红色厨具',
      '大量木质家具（木生火加重克金）',
      '紫色系物品',
    ],
    colorSuggestion: ['白色', '银色', '金色', '浅黄色'],
    avoidColors: ['红色', '橙色', '紫色'],
    healthEffect: '火克金伤肺，易有呼吸系统疾病和皮肤问题，需注意肺部和呼吸道保养，少女健康受影响较大。',
    wealthEffect: '财运有损耗，支出较多，积蓄困难，需注意理财，避免冲动消费和投资。',
    familyEffect: '易有口舌之争和家庭矛盾，尤其影响少女运势，夫妻间易因小事争吵。',
    resolution: '用土来通关（火生土、土生金）。宜多用黄色土色系和白色金属色装饰，摆放陶瓷器皿和铜制摆件，厨房地面用土黄色瓷砖。',
  },
  '西北': {
    direction: '西北方',
    element: '金',
    jixiong: '大凶',
    score: 30,
    description: '西北方属金，为乾位，厨房在此为"火烧天门"，是风水大忌。',
    advantages: [
      '通风条件一般尚可',
    ],
    disadvantages: [
      '火烧天门，大凶之象',
      '不利于男主人健康和事业',
      '易有官非口舌',
      '家中男性易出意外',
      '财运受损，开销增大',
      '易得头部和呼吸系统疾病',
    ],
    stoveDirection: {
      auspicious: ['南', '东南'],
      inauspicious: ['北', '西', '西北'],
      best: '坐南朝北',
      worst: '坐西北朝东南',
      tip: '灶台绝对不宜坐西北朝东南，应尽量改变灶台方向。',
    },
    colors: {
      suitable: ['白色', '银色', '土黄色', '咖啡色'],
      avoid: ['红色', '橙色', '紫色', '绿色'],
      recommend: '必须以白色和土色系为主，用土泄火气、生金气来化解。',
    },
    taboos: [
      '灶台绝对不可在西北方',
      '厨房不可设在整个住宅的西北方',
      '不可用红色系装饰',
      '不可在此方堆放杂物',
      '不可安装红色灯饰',
    ],
    layoutTip: '西北方厨房为"火烧天门"大忌，最好的方法是搬移厨房。若无法搬移，需用以下方法化解：1. 厨房全部用白色/银色装修；2. 悬挂铜葫芦或五帝钱；3. 摆放陶瓷器皿以土泄火生金；4. 保持厨房阴凉，减少开火频率。',
    luckyItems: [
      '铜葫芦（化煞生金）',
      '五帝钱（化煞旺财）',
      '白色陶瓷器皿（土泄火生金）',
      '黄色石材台面',
      '铜麒麟或铜象',
    ],
    unluckyItems: [
      '红色装饰和红色灯具',
      '木质橱柜和木色装饰',
      '紫色系物品',
      '绿植过多（木生火）',
    ],
    colorSuggestion: ['白色', '银色', '土黄色', '咖啡色'],
    avoidColors: ['红色', '橙色', '紫色', '绿色'],
    healthEffect: '大凶之象，严重影响男主人健康，易得头部疾病、心脑血管问题和呼吸系统疾病，家中男性易出意外。',
    wealthEffect: '财运严重受损，开销增大，入不敷出，易有破财之灾，事业受阻，官非口舌。',
    familyEffect: '家庭关系紧张，男主人事业不顺脾气暴躁，父子关系不和，家中男性运势普遍低迷。',
    resolution: '此为"火烧天门"大凶格局，最佳方案是搬移厨房。若无法搬移：1.厨房全部用白色银色装修；2.悬挂铜葫芦和五帝钱；3.大量使用陶瓷器皿以土泄火生金；4.减少开火频率，多使用电磁炉等无明火厨具；5.厨房门常关，加挂门帘。',
  },
  '北': {
    direction: '北方',
    element: '水',
    jixiong: '凶',
    score: 40,
    description: '北方属水，水火相冲，厨房在此为不吉，主肾脏和泌尿系统疾病。',
    advantages: [
      '夏季较为凉爽',
    ],
    disadvantages: [
      '水火相冲，气场不和',
      '易患肾脏和泌尿系统疾病',
      '财运起伏大，难以积蓄',
      '家中易有漏水等问题',
      '不利于子息运',
    ],
    stoveDirection: {
      auspicious: ['东', '东南', '南'],
      inauspicious: ['北', '西', '西北'],
      best: '坐东朝西',
      worst: '坐北朝南',
      tip: '灶台绝对忌坐北朝南，必须坐东朝西或坐东南朝西北。',
    },
    colors: {
      suitable: ['绿色', '青色', '木色', '浅黄色'],
      avoid: ['黑色', '深蓝色', '灰色', '白色'],
      recommend: '建议以绿色和木色系为主，用木来通关水火。',
    },
    taboos: [
      '灶台不可坐北朝南',
      '厨房不可与卫生间相对',
      '水龙头不可正对灶台',
      '厨房地面不可有积水',
      '不可摆放鱼缸等水景',
    ],
    layoutTip: '北方厨房水火相冲，需用木来通关（水生木、木生火）。宜多使用木质橱柜和绿色装饰，可摆放绿植化解。',
    luckyItems: [
      '绿植如发财树、绿萝（木通关水火）',
      '木质橱柜和餐具',
      '绿色系装饰',
      '葫芦（化水火相冲）',
      '黄色地垫（土制水）',
    ],
    unluckyItems: [
      '黑色、深蓝色装饰',
      '鱼缸和水景',
      '灰色系过多',
    ],
    colorSuggestion: ['绿色', '青色', '木色', '浅黄色'],
    avoidColors: ['黑色', '深蓝色', '灰色'],
    healthEffect: '水火相冲气场不和，易患肾脏和泌尿系统疾病，家中易有漏水问题，子息运受影响。',
    wealthEffect: '财运起伏大，难以积蓄，来财去财皆快，需注意理财规划，避免风险投资。',
    familyEffect: '家庭关系时好时坏，情绪波动大，不利于子女运势，夫妻间易有冷战。',
    resolution: '用木来通关水火（水生木、木生火）。宜多用木质橱柜和绿色装饰，摆放绿植，灶台改坐东朝西或坐东南朝西北，厨房地面用木色系地板。',
  },
  '东北': {
    direction: '东北方',
    element: '土',
    jixiong: '中吉',
    score: 72,
    description: '东北方属土，火生土，厨房在此主子孙兴旺，财运稳定。',
    advantages: [
      '火生土，家运稳固',
      '有利于少男运势',
      '财运稳定，善于积蓄',
      '家人身体健康',
    ],
    disadvantages: [
      '冬季较为寒冷',
      '土气过重易保守固执',
      '需注意脾胃健康',
    ],
    stoveDirection: {
      auspicious: ['南', '西南', '东北'],
      inauspicious: ['北', '东', '东南'],
      best: '坐东北朝西南',
      worst: '坐西南朝东北',
      tip: '灶台宜坐东北朝西南，火生土助旺子孙运。',
    },
    colors: {
      suitable: ['黄色', '米色', '咖啡色', '棕色'],
      avoid: ['黑色', '深蓝色', '绿色'],
      recommend: '建议以暖土色系为主，营造温馨安稳的厨房环境。',
    },
    taboos: [
      '厨房不可有缺角',
      '灶台不可背后靠窗',
      '厨房门不可正对楼梯',
      '灶台不可与卫生间共用墙体',
      '厨房不可堆放过多杂物',
    ],
    layoutTip: '东北厨房主少男和子孙运，宜保持整洁，可摆放山石或陶器增强土气。',
    luckyItems: [
      '陶瓷器皿和陶罐',
      '山石摆件或泰山石',
      '五谷丰登装饰',
      '黄色系餐具橱柜',
      '福禄寿三星摆件',
    ],
    unluckyItems: [
      '黑色、深蓝色装饰',
      '大型鱼缸水景',
      '过多绿植（木克土）',
    ],
    colorSuggestion: ['黄色', '米色', '咖啡色', '棕色'],
    avoidColors: ['黑色', '深蓝色', '绿色'],
    healthEffect: '火生土，脾胃功能较好，家人身体康健，但土气过重易有惰性，需注意运动和体重管理。',
    wealthEffect: '财运稳定，善于积蓄，正财运佳，适合稳健投资，有不动产方面的运势。',
    familyEffect: '家运稳固，子孙兴旺，有利于少男运势，家庭观念强，长幼有序。',
    resolution: '此方位为中吉，无需重点化解。若土气过重显沉闷，可用白色金属装饰增加活力。',
  },
};

// 卫生间风水数据 - 按方位
export const BATHROOM_FENGSHUI = {
  '东': {
    direction: '东方',
    element: '木',
    jixiong: '中平',
    score: 55,
    description: '东方属木，水生木，但卫生间为污浊之水，木气受污不利健康。',
    advantages: [
      '通风一般较好',
      '水生木有一定助益',
    ],
    disadvantages: [
      '污水伤木，不利健康',
      '影响长子运势',
      '易有肝胆方面疾病',
      '贵人运受损',
    ],
    colors: {
      suitable: ['白色', '银色', '浅黄色', '米色'],
      avoid: ['绿色', '青色', '黑色', '深蓝色'],
      recommend: '建议以白色和浅黄色为主，用金克木、土克水来减弱污水影响。',
    },
    taboos: [
      '卫生间门不可正对大门',
      '卫生间不可在房屋正中央',
      '马桶不可正对卫生间门',
      '卫生间不可与厨房相邻',
      '卫生间不可改作卧室',
    ],
    resolveMethods: [
      '保持卫生间干燥通风',
      '安装排风系统，常开排气扇',
      '摆放天然香料或熏香净化空气',
      '悬挂五帝钱化解煞气',
      '卫生间门常关，挂门帘遮挡',
      '摆放绿植（如绿萝、吊兰）净化空气',
    ],
    layoutTip: '东方卫生间污木气，需保持干燥清洁，多用白色系，可摆放铜制摆件以金泄土气。',
    luckyItems: [
      '铜葫芦（化煞收邪）',
      '五帝钱（化煞旺财）',
      '绿萝、吊兰等净化绿植',
      '天然香薰或熏香',
      '白色水晶簇',
    ],
    colorSuggestion: ['白色', '银色', '浅黄色', '米色'],
    avoidColors: ['绿色', '青色', '黑色'],
    healthEffect: '污水伤木，不利肝胆健康，易有肝气郁结、头痛目眩等问题，长子健康受影响较大。',
    wealthEffect: '贵人运受损，正财运下降，事业发展受阻，需注意维护人际关系带来的财运。',
    familyEffect: '影响长子运势，家人易有脾气急躁的情况，父子关系需多加维护。',
    resolutionMethods: [
      '保持卫生间干燥通风，常开排气扇',
      '用白色和金属色装饰，以金克木、土克水减弱污水影响',
      '悬挂铜葫芦或五帝钱化解煞气',
      '摆放天然香薰净化空气',
      '卫生间门常关，加挂布帘遮挡',
      '摆放绿萝、虎皮兰等净化植物',
    ],
    locationTaboo: '卫生间不宜设在住宅正东震位，尤其不可占据整面东墙，以免污伤长子运。',
  },
  '东南': {
    direction: '东南方',
    element: '木',
    jixiong: '凶',
    score: 45,
    description: '东南方为文昌位，卫生间在此污文昌，不利学业和事业。',
    advantages: [
      '通风条件较好',
    ],
    disadvantages: [
      '文昌位受污，学业受阻',
      '不利于考试和晋升',
      '贵人运下降',
      '长女运势受影响',
      '财运有损耗',
    ],
    colors: {
      suitable: ['白色', '银色', '米黄色', '浅棕色'],
      avoid: ['绿色', '青色', '黑色', '深蓝色'],
      recommend: '建议以白色和金属色为主，用金气化解污水对木的伤害。',
    },
    taboos: [
      '卫生间不可正对书房',
      '卫生间门不可常开',
      '马桶不可朝东南方',
      '卫生间不可阴暗潮湿',
      '不可在卫生间堆放书籍',
    ],
    resolveMethods: [
      '保持卫生间绝对干燥清洁',
      '安装强力排气扇',
      '悬挂铜葫芦化解煞气',
      '点香熏净化空气',
      '摆放常春藤等净化植物',
      '卫生间门常关，加挂门帘',
    ],
    layoutTip: '东南文昌位有卫生间为不吉，需重点化解。建议在卫生间外东南方摆放文昌塔或毛笔架，间接旺文昌。',
    luckyItems: [
      '铜葫芦（化煞）',
      '文昌塔（外置，旺文昌）',
      '常春藤等净化绿植',
      '天然香薰净化',
      '五帝钱挂饰',
    ],
    colorSuggestion: ['白色', '银色', '米黄色', '浅棕色'],
    avoidColors: ['绿色', '青色', '黑色'],
    healthEffect: '污水伤木，肝胆易出问题，也影响神经系统，易有失眠、焦虑等症状。',
    wealthEffect: '文昌位受污影响学业和事业运，贵人运下降，财运有损耗，考试晋升受阻。',
    familyEffect: '不利于长女运势，子女学业受影响，家庭文化氛围减弱，易有沟通不畅。',
    resolutionMethods: [
      '保持卫生间绝对干燥清洁',
      '安装强力排气扇，常开换气',
      '悬挂铜葫芦化解煞气',
      '点香熏净化空气',
      '摆放常春藤等净化植物',
      '卫生间门常关，加挂门帘',
      '卫生间外东南方摆放文昌塔或四支毛笔',
    ],
    locationTaboo: '卫生间绝对不宜设在住宅东南文昌位，主学业受阻、事业不顺，是文昌风水大忌。',
  },
  '南': {
    direction: '南方',
    element: '火',
    jixiong: '凶',
    score: 40,
    description: '南方属火，水火相冲，卫生间在此为不吉，主口舌是非。',
    advantages: [
      '采光较好，易于干燥',
    ],
    disadvantages: [
      '水火相冲，气场不和',
      '易有口舌是非和官司',
      '名声受损',
      '心脏和眼部易出问题',
      '女主人运势受影响',
    ],
    colors: {
      suitable: ['绿色', '青色', '木色', '白色'],
      avoid: ['红色', '橙色', '紫色', '黑色'],
      recommend: '建议以绿色系和白色为主，用木通关水火。',
    },
    taboos: [
      '卫生间门不可正对卧室',
      '马桶不可朝向南方',
      '卫生间不可用红色瓷砖',
      '卫生间不可设在房屋正中线上',
      '镜子不可正对马桶',
    ],
    resolveMethods: [
      '保持通风干燥',
      '用木色系装饰以通关水火',
      '摆放绿植如绿萝、虎皮兰',
      '悬挂水晶帘化解煞气',
      '卫生间内点长明灯',
    ],
    layoutTip: '南方卫生间水火相冲，用木来通关（水生木、木生火）。宜多用木质装饰和绿色植物，可在卫生间外南方挂中国结。',
    luckyItems: [
      '绿萝、虎皮兰等绿植（木通关水火）',
      '木质装饰和竹制品',
      '水晶帘（化煞）',
      '天然香薰',
      '中国结（外置，旺火气）',
    ],
    colorSuggestion: ['绿色', '青色', '木色', '白色'],
    avoidColors: ['红色', '橙色', '黑色'],
    healthEffect: '水火相冲，易患心脏和眼部疾病，也主口舌是非引起的身心压力，女主人健康受影响较大。',
    wealthEffect: '财运起伏较大，易有意外破财，名声受损影响事业财运，需注意口碑维护。',
    familyEffect: '易有口舌是非和家庭争吵，女主人运势受影响，夫妻间易因言语冲突产生矛盾。',
    resolutionMethods: [
      '保持通风干燥，安装强力排气扇',
      '用木色系装饰以通关水火（水生木、木生火）',
      '摆放绿植如绿萝、虎皮兰、常春藤',
      '悬挂水晶帘化解煞气',
      '卫生间内点长明灯增加阳气',
      '卫生间门外挂中国结增强火气',
    ],
    locationTaboo: '卫生间不宜设在住宅正南离位，水火相冲主口舌是非、名声受损，尤其不可正对大门。',
  },
  '西南': {
    direction: '西南方',
    element: '土',
    jixiong: '中平',
    score: 58,
    description: '西南方属土，土克水，卫生间在此对女主人和脾胃有影响。',
    advantages: [
      '土克水有一定制约作用',
      '下午采光较好',
    ],
    disadvantages: [
      '土气受污，不利脾胃健康',
      '女主人运势受影响',
      '家庭关系易有矛盾',
      '财运有损耗',
    ],
    colors: {
      suitable: ['白色', '银色', '金色', '浅黄色'],
      avoid: ['黄色', '棕色', '黑色', '深蓝色'],
      recommend: '建议以白色和金属色为主，用金泄土气、减少土水相战。',
    },
    taboos: [
      '卫生间不可正对厨房',
      '马桶不可朝西南',
      '卫生间不可设在西南坤位正中',
      '卫生间地面不可高于客厅',
      '卫生间不可堆放杂物',
    ],
    resolveMethods: [
      '保持清洁干燥',
      '安装排气扇常开',
      '摆放铜葫芦或五帝钱',
      '使用香熏净化空气',
      '卫生间门常关，挂布帘',
    ],
    layoutTip: '西南卫生间土水相战，用金来通关（土生金、金生水）。宜多用白色金属装饰，可摆放铜制摆件。',
    luckyItems: [
      '铜葫芦（化煞）',
      '五帝钱（化煞旺财）',
      '天然香薰',
      '白色水晶簇',
      '铜制摆件增强金气',
    ],
    colorSuggestion: ['白色', '银色', '金色', '浅黄色'],
    avoidColors: ['黄色', '棕色', '黑色'],
    healthEffect: '土气受污不利脾胃健康，易有肠胃疾病和皮肤问题，女主人健康受影响较大。',
    wealthEffect: '财运有损耗，积蓄困难，家庭开支增大，不动产运受影响。',
    familyEffect: '家庭关系易有矛盾，女主人运势受影响，婆媳关系需多加维护，家庭氛围偏沉闷。',
    resolutionMethods: [
      '保持清洁干燥，常开排气扇',
      '用白色和金属色装饰，以金通关土水（土生金、金生水）',
      '摆放铜葫芦或五帝钱化解',
      '使用香熏净化空气',
      '卫生间门常关，挂布帘遮挡',
      '卫生间外西南方放置黄色地毯增强土气',
    ],
    locationTaboo: '卫生间不宜设在住宅西南坤位正中，主女主人运势受损、脾胃不和、家庭矛盾增多。',
  },
  '西': {
    direction: '西方',
    element: '金',
    jixiong: '吉',
    score: 78,
    description: '西方属金，金生水，卫生间在此为泄秀，主口才和财运。',
    advantages: [
      '金生水，气场较和顺',
      '有利于口才和表达能力',
      '从事销售、演讲行业有助益',
      '少女运势较好',
      '有意外之财',
    ],
    disadvantages: [
      '金气过泄需注意肺部健康',
      '下午西晒可能潮湿',
      '易有口舌之争',
    ],
    colors: {
      suitable: ['白色', '银色', '金色', '浅蓝色'],
      avoid: ['红色', '橙色', '深棕色'],
      recommend: '建议以白色和金属色为主，保持金气纯净。',
    },
    taboos: [
      '卫生间不可正对大门',
      '卫生间不可改作厨房',
      '马桶不可朝西',
      '卫生间不可阴暗无光',
      '不可在卫生间堆放金属杂物',
    ],
    resolveMethods: [
      '保持卫生间明亮整洁',
      '安装白色灯饰',
      '可摆放金属装饰增强金气',
      '适当摆放绿植调和',
    ],
    layoutTip: '西方卫生间金生水为吉，宜保持明亮整洁，白色系装修最佳，可在卫生间外放一盆发财树。',
    luckyItems: [
      '金属装饰摆件',
      '白色水晶',
      '发财树（外置）',
      '天然香薰',
      '铜葫芦（化煞兼生金）',
    ],
    colorSuggestion: ['白色', '银色', '金色', '浅蓝色'],
    avoidColors: ['红色', '橙色', '深棕色'],
    healthEffect: '金生水气场和顺，但金气过泄需注意肺部和呼吸系统健康，少女健康总体较好。',
    wealthEffect: '有意外之财和偏财运，口才带来的财运较好，适合从事销售、演讲等以口为业的人群。',
    familyEffect: '有利于口才和表达能力，少女运势较好，但易有口舌之争，需注意家庭成员间的言语沟通。',
    resolutionMethods: [
      '保持卫生间明亮整洁',
      '安装白色灯饰增强金气',
      '可摆放金属装饰增强金气',
      '适当摆放绿植调和气场',
      '卫生间门保持干净整洁',
    ],
    locationTaboo: '卫生间虽在西方为吉，但仍需保持清洁干燥，不可正对大门或卧室门，马桶不可朝西。',
  },
  '西北': {
    direction: '西北方',
    element: '金',
    jixiong: '中吉',
    score: 70,
    description: '西北方属金，金生水，卫生间在此泄金气，对男主人有一定影响。',
    advantages: [
      '金生水，气场尚算和顺',
      '有利于智慧和思考',
      '通风条件一般尚可',
    ],
    disadvantages: [
      '泄金气，男主人精力不足',
      '事业运略有下降',
      '头部和呼吸系统易出问题',
      '贵人运减弱',
    ],
    colors: {
      suitable: ['白色', '银色', '金色', '米黄色'],
      avoid: ['黑色', '深蓝色', '红色'],
      recommend: '建议以白色和金属色为主，增强金气以抵御水气消耗。',
    },
    taboos: [
      '卫生间不可设在乾位正中',
      '马桶不可朝西北',
      '卫生间门不可正对卧室',
      '卫生间不可阴暗潮湿',
      '不可在西北方堆放杂物',
    ],
    resolveMethods: [
      '保持卫生间干燥明亮',
      '安装强力排气扇',
      '悬挂铜葫芦增强金气',
      '摆放五帝钱化解',
      '使用暖色调灯光',
    ],
    layoutTip: '西北卫生间泄金气，需增强金气化解。宜多用白色金属装饰，可放铜麒麟或铜葫芦。重要的是保持干燥，减少水气。',
    luckyItems: [
      '铜葫芦（增强金气化煞）',
      '五帝钱（化煞旺财）',
      '铜麒麟（旺事业贵人）',
      '天然香薰',
      '白色水晶簇',
    ],
    colorSuggestion: ['白色', '银色', '金色', '米黄色'],
    avoidColors: ['黑色', '深蓝色', '红色'],
    healthEffect: '泄金气影响男主人精力，易有头部和呼吸系统问题，需注意肺部、咽喉和鼻部保养。',
    wealthEffect: '事业运略有下降，贵人运减弱，正财运受影响，需注意事业上的人际关系维护。',
    familyEffect: '男主人精力不足易烦躁，父子关系需多加维护，家庭决策易犹豫不决。',
    resolutionMethods: [
      '保持卫生间干燥明亮',
      '安装强力排气扇减少水气',
      '悬挂铜葫芦增强金气化煞',
      '摆放五帝钱化解增强财运',
      '使用暖色调灯光增加阳气',
      '多用白色金属色装饰增强金气',
    ],
    locationTaboo: '卫生间不宜设在住宅西北乾位正中，主泄男主人金气、事业受阻、贵人运弱，乾位为天门不宜受污。',
  },
  '北': {
    direction: '北方',
    element: '水',
    jixiong: '凶',
    score: 35,
    description: '北方属水，卫生间在此水气过重，主肾脏疾病和财运流失。',
    advantages: [
      '夏季凉爽',
    ],
    disadvantages: [
      '水气过重，阴气太盛',
      '易患肾脏和泌尿系统疾病',
      '财运流失，难以积蓄',
      '事业运受阻',
      '子息运受影响',
      '家中易有漏水问题',
    ],
    colors: {
      suitable: ['绿色', '青色', '木色', '黄色'],
      avoid: ['黑色', '深蓝色', '灰色', '白色'],
      recommend: '建议以绿色和木色系为主，用木泄水气、用土制水。',
    },
    taboos: [
      '卫生间绝对不可在正北坎位',
      '马桶不可朝北',
      '卫生间不可有鱼缸',
      '卫生间不可有大面积水景',
      '卫生间地面不可低于其他房间过多',
    ],
    resolveMethods: [
      '保持卫生间绝对干燥',
      '安装强力排风系统',
      '使用暖色调灯光',
      '摆放木色家具和绿色植物',
      '铺设黄色地垫以土克水',
      '悬挂葫芦收煞',
    ],
    layoutTip: '北方卫生间水气太重，需重点化解。用木泄水气（水生木）和土制水（土克水）双管齐下。宜多木质装饰、绿色植物和黄色系软装。',
    luckyItems: [
      '葫芦（收煞化水）',
      '绿植如绿萝、虎皮兰（木泄水气）',
      '木质装饰和木色家具',
      '黄色地垫（土克水）',
      '五帝钱（化煞旺财）',
    ],
    colorSuggestion: ['绿色', '青色', '木色', '黄色'],
    avoidColors: ['黑色', '深蓝色', '灰色'],
    healthEffect: '水气过重阴气太盛，易患肾脏和泌尿系统疾病，也主妇科和男科问题，子息运受影响。',
    wealthEffect: '财运流失严重，难以积蓄，事业运受阻，财来财去如流水，需注意守财。',
    familyEffect: '家庭关系偏冷淡，家人易有肾脏方面的健康忧虑，子女运受影响，家中易有漏水等问题。',
    resolutionMethods: [
      '保持卫生间绝对干燥，及时清理积水',
      '安装强力排风系统，常开换气',
      '使用暖色调灯光增加阳气',
      '摆放木色家具和绿色植物（以木泄水气）',
      '铺设黄色地垫和使用黄色毛巾（以土克水）',
      '悬挂葫芦收煞化水',
      '马桶盖常关，防止水气外泄',
    ],
    locationTaboo: '卫生间绝对不宜设在住宅正北坎位，水气过重主肾病、财运流失、子息运弱，是卫生间方位大忌之一。',
  },
  '东北': {
    direction: '东北方',
    element: '土',
    jixiong: '中平',
    score: 60,
    description: '东北方属土，土克水，卫生间在此对少男和子孙运有影响。',
    advantages: [
      '土克水有制约作用',
      '水气被土所制',
    ],
    disadvantages: [
      '土气受污，影响子孙运',
      '少男运势受影响',
      '脾胃易出问题',
      '事业发展较慢',
    ],
    colors: {
      suitable: ['白色', '银色', '金色', '浅黄色'],
      avoid: ['黄色', '棕色', '黑色', '深蓝色'],
      recommend: '建议以白色和金属色为主，用金泄土气通关。',
    },
    taboos: [
      '卫生间不可在艮位正中',
      '马桶不可朝东北',
      '卫生间不可正对儿童房',
      '卫生间不可阴暗潮湿',
      '不可在卫生间堆放杂物',
    ],
    resolveMethods: [
      '保持清洁干燥',
      '安装排气扇',
      '摆放铜葫芦化解',
      '使用香熏净化',
      '卫生间门常关',
      '外方摆放绿植缓冲',
    ],
    layoutTip: '东北卫生间土水相战，用金来通关。宜白色金属装饰为主，可在卫生间外东北方放山石摆件增强吉气。',
    luckyItems: [
      '铜葫芦（化煞通关）',
      '五帝钱（化煞旺财）',
      '天然香薰',
      '白色水晶',
      '山石摆件（外置，增强土气）',
    ],
    colorSuggestion: ['白色', '银色', '金色', '浅黄色'],
    avoidColors: ['黄色', '棕色', '黑色'],
    healthEffect: '土气受污影响脾胃健康，易有肠胃不适，少男健康受影响较大，也主关节和皮肤问题。',
    wealthEffect: '事业发展较慢，正财运受影响，积蓄能力减弱，需注意稳健理财。',
    familyEffect: '影响少男和子孙运，子女发展受阻，家庭未来运势偏弱，需重视子孙教育。',
    resolutionMethods: [
      '保持清洁干燥，常开排气扇',
      '用白色和金属色装饰，以金通关土水',
      '摆放铜葫芦化解煞气',
      '使用香熏净化空气',
      '卫生间门常关，加挂门帘',
      '卫生间外东北方摆放山石摆件增强吉气',
    ],
    locationTaboo: '卫生间不宜设在住宅东北艮位正中，主子孙运受损、少男不利、事业发展缓慢。',
  },
};

/**
 * 计算厨房风水分析
 * @param {string} direction - 方位，如"东"、"南"、"西"、"北"、"东南"、"东北"、"西南"、"西北"
 * @param {string} wuxing - 宅主五行，可选参数
 * @returns {object} 厨房风水分析结果
 */
export function calculateKitchenFengshui(direction, wuxing = '') {
  const kitchen = KITCHEN_FENGSHUI[direction];
  if (!kitchen) {
    return {
      success: false,
      message: '未找到该方位的厨房风水数据',
    };
  }

  // 五行生克关系
  const shengkeMap = {
    '金': { sheng: '水', ke: '木', beiSheng: '土', beiKe: '火' },
    '木': { sheng: '火', ke: '土', beiSheng: '水', beiKe: '金' },
    '水': { sheng: '木', ke: '火', beiSheng: '金', beiKe: '土' },
    '火': { sheng: '土', ke: '金', beiSheng: '木', beiKe: '水' },
    '土': { sheng: '金', ke: '水', beiSheng: '火', beiKe: '木' },
  };

  let wuxingAnalysis = '';
  let adjustedScore = kitchen.score;

  if (wuxing && shengkeMap[wuxing]) {
    const relation = shengkeMap[wuxing];
    if (relation.beiSheng === kitchen.element) {
      wuxingAnalysis = `您的五行属${wuxing}，厨房方位五行属${kitchen.element}，${kitchen.element}生${wuxing}，为方位生我，大吉。厨房风水对你有助益。`;
      adjustedScore = Math.min(100, kitchen.score + 10);
    } else if (relation.sheng === kitchen.element) {
      wuxingAnalysis = `您的五行属${wuxing}，厨房方位五行属${kitchen.element}，${wuxing}生${kitchen.element}，为我生方位，有泄耗。需适当化解。`;
      adjustedScore = kitchen.score - 5;
    } else if (relation.ke === kitchen.element) {
      wuxingAnalysis = `您的五行属${wuxing}，厨房方位五行属${kitchen.element}，${wuxing}克${kitchen.element}，为我克方位，吉中有耗。`;
      adjustedScore = kitchen.score - 3;
    } else if (relation.beiKe === kitchen.element) {
      wuxingAnalysis = `您的五行属${wuxing}，厨房方位五行属${kitchen.element}，${kitchen.element}克${wuxing}，为方位克我，不吉。需重点化解。`;
      adjustedScore = kitchen.score - 10;
    } else {
      wuxingAnalysis = `您的五行属${wuxing}，与厨房方位五行${kitchen.element}相同，为比和，气场相近。`;
    }
  }

  return {
    success: true,
    direction: kitchen.direction,
    element: kitchen.element,
    jixiong: kitchen.jixiong,
    baseScore: kitchen.score,
    adjustedScore,
    description: kitchen.description,
    advantages: kitchen.advantages,
    disadvantages: kitchen.disadvantages,
    stoveDirection: kitchen.stoveDirection,
    colors: kitchen.colors,
    taboos: kitchen.taboos,
    layoutTip: kitchen.layoutTip,
    wuxingAnalysis: wuxingAnalysis || '未提供宅主五行，跳过五行分析',
    userWuxing: wuxing,
  };
}

/**
 * 计算卫生间风水分析
 * @param {string} direction - 方位，如"东"、"南"、"西"、"北"、"东南"、"东北"、"西南"、"西北"
 * @param {string} wuxing - 宅主五行，可选参数
 * @returns {object} 卫生间风水分析结果
 */
export function calculateBathroomFengshui(direction, wuxing = '') {
  const bathroom = BATHROOM_FENGSHUI[direction];
  if (!bathroom) {
    return {
      success: false,
      message: '未找到该方位的卫生间风水数据',
    };
  }

  // 五行生克关系
  const shengkeMap = {
    '金': { sheng: '水', ke: '木', beiSheng: '土', beiKe: '火' },
    '木': { sheng: '火', ke: '土', beiSheng: '水', beiKe: '金' },
    '水': { sheng: '木', ke: '火', beiSheng: '金', beiKe: '土' },
    '火': { sheng: '土', ke: '金', beiSheng: '木', beiKe: '水' },
    '土': { sheng: '金', ke: '水', beiSheng: '火', beiKe: '木' },
  };

  let wuxingAnalysis = '';
  let adjustedScore = bathroom.score;

  if (wuxing && shengkeMap[wuxing]) {
    const relation = shengkeMap[wuxing];
    // 卫生间属水，结合方位五行综合判断
    const bathroomElement = '水';
    if (relation.beiSheng === bathroomElement) {
      wuxingAnalysis = `您的五行属${wuxing}，卫生间五行属水，水${wuxing === '木' ? '生木' : ''}，卫生间的水气对您有一定助益，但需注意适度。`;
    } else if (relation.sheng === bathroomElement) {
      wuxingAnalysis = `您的五行属${wuxing}，卫生间五行属水，${wuxing}生水，您的气场被卫生间泄耗，需注意补肾益气。`;
      adjustedScore = bathroom.score - 5;
    } else if (relation.ke === bathroomElement) {
      wuxingAnalysis = `您的五行属${wuxing}，卫生间五行属水，${wuxing}克水，您能制约卫生间的水气，为吉。`;
      adjustedScore = Math.min(100, bathroom.score + 5);
    } else if (relation.beiKe === bathroomElement) {
      wuxingAnalysis = `您的五行属${wuxing}，卫生间五行属水，水克${wuxing}，卫生间的水气对您不利，需重点化解。`;
      adjustedScore = bathroom.score - 10;
    }
  }

  return {
    success: true,
    direction: bathroom.direction,
    element: bathroom.element,
    jixiong: bathroom.jixiong,
    baseScore: bathroom.score,
    adjustedScore,
    description: bathroom.description,
    advantages: bathroom.advantages,
    disadvantages: bathroom.disadvantages,
    colors: bathroom.colors,
    taboos: bathroom.taboos,
    resolveMethods: bathroom.resolveMethods,
    layoutTip: bathroom.layoutTip,
    wuxingAnalysis: wuxingAnalysis || '未提供宅主五行，跳过五行分析',
    userWuxing: wuxing,
  };
}

// ========== 三、八宅风水九星数据 ==========

// 九星基本信息
export const NINE_STARS_INFO = {
  '生气': {
    name: '生气贪狼木星',
    shortName: '生气',
    type: '吉星',
    level: '四吉星之首',
    element: '木',
    color: '绿色、青色',
    number: 1,
    meaning: '生发之气，主财运、事业、贵人、添丁',
    influence: {
      career: '大吉，事业蒸蒸日上，步步高升',
      wealth: '旺财，正财偏财皆旺',
      health: '健康长寿，精力充沛',
      love: '桃花旺盛，感情美满',
      family: '人丁兴旺，家庭和睦',
    },
    suitableFor: ['大门', '主卧', '客厅', '办公室', '书房'],
    enhanceMethods: [
      '摆放绿植如发财树、富贵竹',
      '使用绿色系装饰',
      '保持明亮通风',
      '摆放文昌塔或毛笔架',
    ],
    description: '生气星为九星中第一吉星，又称贪狼星，属木。主生发、旺运、贵人相助、事业有成、添丁进口。凡住宅之大门、主卧、客厅落在生气方，皆为大吉。',
  },
  '延年': {
    name: '延年武曲金星',
    shortName: '延年',
    type: '吉星',
    level: '四吉星之二',
    element: '金',
    color: '白色、金色、银色',
    number: 2,
    meaning: '延年益寿，主健康、长寿、婚姻、贵人',
    influence: {
      career: '吉，事业稳定，有贵人相助',
      wealth: '财运稳定，细水长流',
      health: '健康长寿，少病少灾',
      love: '婚姻美满，夫妻和睦',
      family: '家庭和谐，老少安康',
    },
    suitableFor: ['主卧', '老人房', '客厅', '大门'],
    enhanceMethods: [
      '使用白色、金色系装饰',
      '摆放铜葫芦、五帝钱',
      '保持整洁明亮',
      '悬挂福寿字画',
    ],
    description: '延年星为九星中第二吉星，又称武曲星，属金。主健康长寿、婚姻美满、贵人相助。最宜做为主卧室方位，有利夫妻感情和家人健康。',
  },
  '天医': {
    name: '天医巨门土星',
    shortName: '天医',
    type: '吉星',
    level: '四吉星之三',
    element: '土',
    color: '黄色、棕色、咖啡色',
    number: 3,
    meaning: '天降神医，主健康、治病、贵人、财运',
    influence: {
      career: '吉，事业稳步发展',
      wealth: '财运稳定，有正财',
      health: '祛病强身，身体健康',
      love: '感情平稳，真诚相待',
      family: '家人健康，无大病灾',
    },
    suitableFor: ['厨房', '老人房', '卧室', '客厅'],
    enhanceMethods: [
      '使用黄色、土色系装饰',
      '摆放陶瓷器皿',
      '摆放山石摆件',
      '悬挂葫芦化病符',
    ],
    description: '天医星为九星中第三吉星，又称巨门星，属土。主健康、治病、贵人。天医方做厨房最为吉利，主饮食健康、家人无病。体弱多病者宜住天医方。',
  },
  '伏位': {
    name: '伏位左辅右弼星',
    shortName: '伏位',
    type: '吉星',
    level: '四吉星之四',
    element: '木（辅弼）',
    color: '绿色、浅色系',
    number: 4,
    meaning: '伏藏本位，主平稳、积蓄、小吉',
    influence: {
      career: '小吉，平稳发展',
      wealth: '财运平稳，有积蓄',
      health: '身体健康，无大灾',
      love: '感情平淡，细水长流',
      family: '家庭平稳，无大风波',
    },
    suitableFor: ['次卧', '储藏室', '书房', '静室'],
    enhanceMethods: [
      '保持安静整洁',
      '摆放温和的绿植',
      '使用浅色调装饰',
      '摆放聚宝盆聚财',
    ],
    description: '伏位星为九星中第四吉星，又称左辅右弼星。主平稳、积蓄、小吉。伏位方宜静不宜动，适合做卧室、书房等安静的空间，有助于积蓄和稳定。',
  },
  '绝命': {
    name: '绝命破军金星',
    shortName: '绝命',
    type: '凶星',
    level: '四凶星之首',
    element: '金',
    color: '白色、金色（凶）',
    number: 5,
    meaning: '绝命亡身，主灾祸、疾病、破财、伤亡',
    influence: {
      career: '大凶，事业破败，官司缠身',
      wealth: '大破财，倾家荡产',
      health: '重病伤亡，意外灾祸',
      love: '感情破裂，生离死别',
      family: '家破人亡，妻离子散',
    },
    suitableFor: ['卫生间', '储藏室', '杂物间'],
    resolveMethods: [
      '保持干净整洁',
      '经常开启灯光增强阳气',
      '悬挂铜葫芦化煞',
      '摆放绿植缓冲煞气',
      '尽量少在此方停留',
    ],
    description: '绝命星为九星中第一凶星，又称破军星，属金。主灾祸、重病、伤亡、破财。绝命方不宜做大门、主卧、客厅等常用空间，最宜做卫生间、储藏室等少用空间。',
  },
  '五鬼': {
    name: '五鬼廉贞火星',
    shortName: '五鬼',
    type: '凶星',
    level: '四凶星之二',
    element: '火',
    color: '红色、紫色（凶）',
    number: 6,
    meaning: '五鬼作祟，主口舌、是非、官司、火灾、盗贼',
    influence: {
      career: '凶，小人当道，事业受阻',
      wealth: '破财连连，意外损耗',
      health: '易患心脑血管疾病、上火',
      love: '口舌之争，第三者插足',
      family: '家宅不宁，争吵不断',
    },
    suitableFor: ['卫生间', '杂物间'],
    resolveMethods: [
      '保持安静，避免吵闹',
      '不可用红色系装饰',
      '摆放绿植以木泄火气',
      '悬挂水晶帘化解',
      '摆放铜麒麟挡煞',
    ],
    description: '五鬼星为九星中第二凶星，又称廉贞星，属火。主口舌是非、官司诉讼、火灾盗贼、小人作祟。五鬼方不宜做卧室和厨房，否则易有口舌之争和意外灾祸。',
  },
  '祸害': {
    name: '祸害禄存土星',
    shortName: '祸害',
    type: '凶星',
    level: '四凶星之三',
    element: '土',
    color: '黄色、棕色（凶）',
    number: 7,
    meaning: '祸害缠身，主疾病、口舌、小人、损耗',
    influence: {
      career: '凶，事业不顺，小人破坏',
      wealth: '财运不佳，损耗较多',
      health: '体弱多病，脾胃不佳',
      love: '感情多舛，口舌纷争',
      family: '家人多病，矛盾较多',
    },
    suitableFor: ['卫生间', '储藏室'],
    resolveMethods: [
      '保持清洁干燥',
      '多用金属色装饰以金泄土气',
      '摆放铜葫芦化解',
      '悬挂五帝钱',
      '减少在此方活动',
    ],
    description: '祸害星为九星中第三凶星，又称禄存星，属土。主疾病、口舌、小人、损耗。祸害方不宜做卧室和客厅，否则易有小病不断、口舌是非。',
  },
  '六煞': {
    name: '六煞文曲水星',
    shortName: '六煞',
    type: '凶星',
    level: '四凶星之四',
    element: '水',
    color: '黑色、深蓝色（凶）',
    number: 8,
    meaning: '六煞桃花，主桃花、外遇、口舌、破财、水患',
    influence: {
      career: '小凶，事业起伏，人际复杂',
      wealth: '财运起伏，来快去快',
      health: '易患肾病、泌尿系统疾病',
      love: '桃花旺盛，但多为烂桃花',
      family: '家庭不和，外遇风波',
    },
    suitableFor: ['卫生间', '客厅（桃花用）'],
    resolveMethods: [
      '保持干燥通风',
      '不可用黑色系装饰',
      '摆放绿植以木泄水气',
      '使用暖色调中和',
      '已婚者需注意化解桃花煞',
    ],
    description: '六煞星为九星中第四凶星，又称文曲星，属水。主桃花、外遇、口舌、水患。六煞方又称桃花位，单身者可借此旺桃花，但已婚者易有外遇风波，需谨慎化解。',
  },
};

// 八宅九星分布表（按宅卦对应八方九星）
// 八方顺序：北、东北、东、东南、南、西南、西、西北
export const ZHAI_GUA_STARS = {
  '坎': { // 坎宅（坐北朝南）
    '北': '伏位',
    '东北': '绝命',
    '东': '天医',
    '东南': '生气',
    '南': '延年',
    '西南': '祸害',
    '西': '六煞',
    '西北': '五鬼',
  },
  '离': { // 离宅（坐南朝北）
    '北': '延年',
    '东北': '祸害',
    '东': '生气',
    '东南': '天医',
    '南': '伏位',
    '西南': '六煞',
    '西': '五鬼',
    '西北': '绝命',
  },
  '震': { // 震宅（坐东朝西）
    '北': '天医',
    '东北': '五鬼',
    '东': '伏位',
    '东南': '延年',
    '南': '生气',
    '西南': '绝命',
    '西': '祸害',
    '西北': '六煞',
  },
  '巽': { // 巽宅（坐东南朝西北）
    '北': '生气',
    '东北': '六煞',
    '东': '延年',
    '东南': '伏位',
    '南': '天医',
    '西南': '五鬼',
    '西': '绝命',
    '西北': '祸害',
  },
  '乾': { // 乾宅（坐西北朝东南）
    '北': '六煞',
    '东北': '天医',
    '东': '五鬼',
    '东南': '祸害',
    '南': '绝命',
    '西南': '生气',
    '西': '延年',
    '西北': '伏位',
  },
  '兑': { // 兑宅（坐西朝东）
    '北': '祸害',
    '东北': '生气',
    '东': '绝命',
    '东南': '五鬼',
    '南': '六煞',
    '西南': '天医',
    '西': '伏位',
    '西北': '延年',
  },
  '坤': { // 坤宅（坐西南朝东北）
    '北': '绝命',
    '东北': '延年',
    '东': '祸害',
    '东南': '六煞',
    '南': '五鬼',
    '西南': '伏位',
    '西': '生气',
    '西北': '天医',
  },
  '艮': { // 艮宅（坐东北朝西南）
    '北': '五鬼',
    '东北': '伏位',
    '东': '六煞',
    '东南': '绝命',
    '南': '祸害',
    '西南': '延年',
    '西': '天医',
    '西北': '生气',
  },
};

/**
 * 根据宅卦获取八方九星分布
 * @param {string} zhaiGua - 宅卦名称，如"坎"、"离"、"震"、"兑"、"巽"、"乾"、"坤"、"艮"
 * @returns {object} 八方九星分布详情
 */
export function getNineStars(zhaiGua) {
  const starsMap = ZHAI_GUA_STARS[zhaiGua];
  if (!starsMap) {
    return {
      success: false,
      message: '未找到该宅卦的九星数据',
    };
  }

  // 四吉四凶方位
  const auspiciousDirections = [];
  const inauspiciousDirections = [];

  const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
  const detailedStars = {};

  directions.forEach(dir => {
    const starName = starsMap[dir];
    const starInfo = NINE_STARS_INFO[starName];
    detailedStars[dir] = {
      direction: dir,
      star: starName,
      ...starInfo,
    };

    if (starInfo.type === '吉星') {
      auspiciousDirections.push({
        direction: dir,
        star: starName,
        level: starInfo.level,
        element: starInfo.element,
      });
    } else {
      inauspiciousDirections.push({
        direction: dir,
        star: starName,
        level: starInfo.level,
        element: starInfo.element,
      });
    }
  });

  // 按吉凶程度排序
  const starOrder = ['生气', '延年', '天医', '伏位', '六煞', '祸害', '五鬼', '绝命'];
  auspiciousDirections.sort((a, b) => starOrder.indexOf(a.star) - starOrder.indexOf(b.star));
  inauspiciousDirections.sort((a, b) => starOrder.indexOf(a.star) - starOrder.indexOf(b.star));

  return {
    success: true,
    zhaiGua,
    zhaiGuaName: getZhaiGuaName(zhaiGua),
    allStars: detailedStars,
    auspiciousDirections,
    inauspiciousDirections,
    bestDirection: auspiciousDirections[0],
    worstDirection: inauspiciousDirections[inauspiciousDirections.length - 1],
    summary: generateStarsSummary(zhaiGua, auspiciousDirections, inauspiciousDirections),
  };
}

function getZhaiGuaName(zhaiGua) {
  const names = {
    '坎': '坎宅（坐北朝南）',
    '离': '离宅（坐南朝北）',
    '震': '震宅（坐东朝西）',
    '兑': '兑宅（坐西朝东）',
    '巽': '巽宅（坐东南朝西北）',
    '乾': '乾宅（坐西北朝东南）',
    '坤': '坤宅（坐西南朝东北）',
    '艮': '艮宅（坐东北朝西南）',
  };
  return names[zhaiGua] || zhaiGua;
}

function generateStarsSummary(zhaiGua, auspicious, inauspicious) {
  const best = auspicious[0];
  const worst = inauspicious[inauspicious.length - 1];
  return [
    `此宅为${getZhaiGuaName(zhaiGua)}，八方九星分布如上。`,
    `最佳方位为${best.direction}方，为${best.star}星主事，宜做大门、主卧等重要空间。`,
    `最凶方位为${worst.direction}方，为${worst.star}星主事，宜做卫生间、储藏室等少用空间。`,
    `四吉方位为：${auspicious.map(a => `${a.direction}(${a.star})`).join('、')}`,
    `四凶方位为：${inauspicious.map(a => `${a.direction}(${a.star})`).join('、')}`,
    '建议在吉方多活动、多停留，凶方少使用或做化解处理。',
  ];
}

// ========== 四、风水知识百科数据 ==========

// 风水基础常识
export const FENGSHUI_BASICS = [
  {
    id: 1,
    title: '什么是风水',
    content: '风水，又称堪舆，是中国传统文化中一门研究环境与人类关系的学问。"风"指空气、气流，"水"指水流、水质。风水认为，居住环境的好坏会直接影响人的运势、健康和事业。其核心思想是"天人合一"，追求人与自然的和谐共处。',
    category: '基础概念',
  },
  {
    id: 2,
    title: '风水的核心理论',
    content: '风水的核心理论包括：阴阳学说、五行学说、八卦理论、天干地支、龙脉砂水等。阴阳讲求平衡，五行讲求生克，八卦讲求方位，天干地支讲求时间。这些理论相互交织，构成了完整的风水体系。',
    category: '基础概念',
  },
  {
    id: 3,
    title: '阴阳学说',
    content: '阴阳是中国哲学的基本概念，认为宇宙万物都有阴阳两面。在风水中，山为阴、水为阳；静为阴、动为阳；北为阴、南为阳。风水讲求阴阳平衡，过阴过阳都不好。住宅阴阳平衡则人丁兴旺、家庭和睦。',
    category: '核心理论',
  },
  {
    id: 4,
    title: '五行生克',
    content: '五行指金、木、水、火、土五种基本元素。五行相生：金生水、水生木、木生火、火生土、土生金。五行相克：金克木、木克土、土克水、水克火、火克金。风水根据五行生克来判断方位、颜色、材质的吉凶。',
    category: '核心理论',
  },
  {
    id: 5,
    title: '八卦与方位',
    content: '八卦指乾、坤、震、巽、坎、离、艮、兑，分别对应西北、西南、东、东南、北、南、东北、西八个方位。每个卦象有其对应的五行、家庭成员、身体部位等。八宅风水就是根据八卦来判断住宅吉凶的。',
    category: '核心理论',
  },
  {
    id: 6,
    title: '什么是宅命相配',
    content: '宅命相配是八宅风水的核心理念，指住宅的卦象（宅卦）与居住者的命卦要相配。东四命的人适合住东四宅，西四命的人适合住西四宅。宅命相配则吉，宅命不相配则凶。可通过调整内部布局来化解不相配的问题。',
    category: '八宅风水',
  },
  {
    id: 7,
    title: '什么是东西四命',
    content: '东西四命是根据出生年份和性别计算出的命卦分类。东四命包括坎、离、震、巽四卦，西四命包括乾、坤、艮、兑四卦。东四命的人吉方在东、东南、南、北；西四命的人吉方在西、西北、西南、东北。',
    category: '八宅风水',
  },
  {
    id: 8,
    title: '什么是九星',
    content: '九星指生气、延年、天医、伏位（四吉星）和绝命、五鬼、祸害、六煞（四凶星），共八星（伏位含辅弼两星合称九星）。每颗星有不同的吉凶属性和影响。根据宅卦不同，九星分布在八个方位也不同。',
    category: '八宅风水',
  },
  {
    id: 9,
    title: '风水的"形"与"气"',
    content: '风水讲究"形"与"气"。"形"指可见的山川地形、建筑形态等；"气"指不可见的能量场。形为气之体，气为形之用。形吉则气吉，形凶则气凶。看风水既要观形，也要察气。',
    category: '基础概念',
  },
  {
    id: 10,
    title: '什么是明堂',
    content: '明堂是风水术语，指宅前开阔明亮的空间。明堂要开阔、整洁、明亮，不宜有遮挡。明堂宽阔则心胸开阔、事业发展空间大；明堂狭窄则运势受阻、发展有限。住宅的客厅也叫内明堂，同样宜宽敞明亮。',
    category: '风水术语',
  },
  {
    id: 11,
    title: '什么是靠山',
    content: '靠山指住宅后方有稳固的依靠，如山丘、高楼等。有靠山则事业有贵人相助、家庭安稳。住宅坐方要有靠，向方要有照（明堂开阔）。床头也要有靠（靠墙），不宜靠窗或背后空虚。',
    category: '风水术语',
  },
  {
    id: 12,
    title: '风水的科学解读',
    content: '从现代科学角度看，风水许多理念与环境学、心理学、建筑学相通。如采光通风影响健康，空间布局影响心情，居住环境影响生活质量。取其精华、去其糟粕，用科学态度看待风水，才能真正受益。',
    category: '其他',
  },
];

// 常见风水禁忌及化解方法
export const FENGSHUI_TABOOS = [
  {
    id: 1,
    taboo: '大门正对电梯',
    description: '大门正对电梯口，电梯开合如虎口，会将宅内气运吸走，称为"开口煞"，主财运不济、是非缠身。',
    level: '凶',
    resolve: [
      '在大门处设置玄关或屏风遮挡',
      '门口摆放一对石狮子或铜麒麟挡煞',
      '悬挂五帝钱或八卦镜化解',
      '门内摆放绿植缓冲煞气',
    ],
  },
  {
    id: 2,
    taboo: '大门正对楼梯',
    description: '大门正对向下的楼梯，财运如水往下流，主破财；正对向上的楼梯，煞气直冲入门，主健康受损。',
    level: '凶',
    resolve: [
      '设置玄关或屏风遮挡',
      '门口摆放绿植或屏风',
      '门垫下放置五帝钱',
      '悬挂水晶帘化解',
    ],
  },
  {
    id: 3,
    taboo: '横梁压顶',
    description: '横梁压在沙发、床、书桌上方，会给人压迫感，主运势受阻、压力大、健康受损，尤其影响头部和肩颈。',
    level: '大凶',
    resolve: [
      '用吊顶将横梁包起来（最佳方法）',
      '在横梁两端悬挂铜葫芦化解',
      '避开横梁位置摆放家具',
      '安装向上的灯光照射横梁',
    ],
  },
  {
    id: 4,
    taboo: '卫生间在房屋中心',
    description: '卫生间在房屋正中央，为"中宫受污"，主家运衰败、家人多病、财运不济，是风水大忌。',
    level: '大凶',
    resolve: [
      '最好的方法是改造移动卫生间位置',
      '保持卫生间绝对干燥清洁',
      '常开排气扇，保持通风',
      '卫生间门常关，挂门帘',
      '在卫生间中心点长明灯',
    ],
  },
  {
    id: 5,
    taboo: '厨房门正对大门',
    description: '厨房门正对大门，为"开门见灶"，主财运外泄、钱财难聚，也不利于家人饮食健康。',
    level: '凶',
    resolve: [
      '设置玄关或屏风遮挡',
      '厨房门常关',
      '悬挂门帘化解',
      '在厨房门口摆放绿植',
    ],
  },
  {
    id: 6,
    taboo: '灶台与水槽相对',
    description: '灶台属火，水槽属水，两者正对为"水火相冲"，主夫妻不和、财运起伏、家人易有肠胃疾病。',
    level: '中凶',
    resolve: [
      '调整灶台或水槽位置，避免正对',
      '在中间放置切菜台等木质家具以木通关',
      '中间摆放绿植化解',
    ],
  },
  {
    id: 7,
    taboo: '床头靠窗',
    description: '床头靠窗为"背后无靠"，主睡眠不安稳、精神恍惚、贵人运差，也容易有第三者插足感情。',
    level: '凶',
    resolve: [
      '调整床的位置，让床头靠墙',
      '若无法调整，可用高背床头板',
      '窗户加装厚重窗帘',
      '床头两侧摆放床头柜增加安全感',
    ],
  },
  {
    id: 8,
    taboo: '镜子正对床',
    description: '镜子正对床，半夜醒来容易被镜中影像惊吓，长期影响精神健康，也主夫妻不和、桃花外遇。',
    level: '凶',
    resolve: [
      '将镜子移到不对床的位置（最佳方法）',
      '用布帘遮住镜子，用时再掀开',
      '选择带门的衣柜镜',
      '在镜子上贴磨砂膜减弱反射',
    ],
  },
  {
    id: 9,
    taboo: '尖角煞',
    description: '房屋外部有尖角正对门窗，或室内有尖锐的墙角、家具尖角，称为尖角煞，主意外受伤、口舌是非。',
    level: '中凶',
    resolve: [
      '用绿植或家具遮挡尖角',
      '在尖角处摆放圆形装饰品化煞',
      '悬挂水晶球化解',
      '室外尖角可摆放石狮子或八卦镜',
    ],
  },
  {
    id: 10,
    taboo: '客厅动线曲折',
    description: '客厅动线不畅、家具摆放杂乱，主事业受阻、人际不和、财运不通。客厅需要明亮通畅。',
    level: '小凶',
    resolve: [
      '重新规划家具布局，保持动线通畅',
      '减少不必要的家具杂物',
      '保持客厅明亮整洁',
      '增加照明提升阳气',
    ],
  },
  {
    id: 11,
    taboo: '房屋缺角',
    description: '房屋形状不方正、有缺角，所缺方位对应的家庭成员或运势会受影响。如西北缺角影响男主人，西南缺角影响女主人。',
    level: '中凶',
    resolve: [
      '在缺角方位摆放泰山石敢当',
      '放置相应五行属性的摆件补角',
      '用灯光照亮缺角方位',
      '种植绿植增强气场',
    ],
  },
  {
    id: 12,
    taboo: '卫生间正对卧室',
    description: '卫生间门正对卧室门，湿气和晦气直冲卧室，主睡眠质量差、健康受损、财运下降。',
    level: '中凶',
    resolve: [
      '卫生间门常关',
      '在卫生间门口挂门帘',
      '卧室内摆放绿植净化空气',
      '保持卫生间干燥通风',
      '卫生间内点长明灯',
    ],
  },
];

// 不同空间风水要点
export const ROOM_FENGSHUI = {
  '客厅': {
    name: '客厅风水',
    importance: '最高',
    description: '客厅是家庭活动中心，也是风水上的"内明堂"，主家运兴衰和人际关系。客厅风水的好坏直接影响全家运势。',
    keyPoints: [
      '宜宽敞明亮，光线充足',
      '宜方正，避免不规则形状',
      '动线要流畅，不可阻塞',
      '沙发宜有靠（靠墙）',
      '不宜有横梁压顶',
      '财位（大门对角线处）宜整洁明亮',
      '装饰画宜选吉祥寓意的题材',
      '绿植宜选大叶、圆叶植物',
    ],
    taboos: [
      '忌阴暗潮湿',
      '忌杂物堆积、灰尘满布',
      '忌沙发背门（背后无靠）',
      '忌镜子正对大门',
      '忌猛兽图画正对人坐处',
      '忌仙人掌等带刺植物放客厅',
    ],
    luckyItems: [
      '发财树、富贵竹等吉祥绿植',
      '山水画（水流向屋内）',
      '鱼缸（旺财，需放对位置）',
      '聚宝盆、貔貅等招财摆件',
      '中国结、福字等吉祥挂饰',
    ],
    colorSuggestion: '根据宅卦五行选择主色调，东四宅宜绿、蓝、红；西四宅宜白、金、黄。',
  },
  '卧室': {
    name: '卧室风水',
    importance: '高',
    description: '卧室是人休息睡眠的地方，人一生三分之一时间在卧室度过。卧室风水直接影响健康、感情和睡眠质量。',
    keyPoints: [
      '床头宜靠墙，背后有靠',
      '床不宜正对房门',
      '床不宜正对镜子',
      '卧室宜宁静温馨',
      '衣柜宜放在床的左侧（青龙位）',
      '床头两侧宜对称摆放床头柜',
      '卧室灯光宜柔和温暖',
      '床单被褥宜选舒适柔和的材质',
    ],
    taboos: [
      '忌床头靠窗',
      '忌横梁压床',
      '忌床下堆放杂物',
      '忌镜子正对床',
      '忌卫生间门正对床',
      '忌卧室过大（气散不聚）',
      '忌卧室内摆放鱼缸',
      '忌卧室内有尖角对床',
    ],
    luckyItems: [
      '成双成对的床头柜和台灯',
      '鸳鸯戏水图（增进夫妻感情）',
      '葫芦（化病保健康）',
      '薰衣草等助眠香薰',
      '柔和暖色调的床上用品',
    ],
    colorSuggestion: '宜选柔和温暖的颜色，如米色、浅粉、淡紫、奶白。避免大红大紫、纯黑纯白等极端色彩。',
  },
  '厨房': {
    name: '厨房风水',
    importance: '高',
    description: '厨房是饮食之源，主健康和财运。厨房风水好，家人身体健康、衣食无忧；厨房风水差，则疾病缠身、财运不济。',
    keyPoints: [
      '灶台宜坐吉朝凶',
      '灶台背后宜有靠（靠墙）',
      '厨房宜保持干燥整洁',
      '冰箱宜放在阴凉处',
      '刀具应收纳好，不可外露',
      '厨房宜有窗户，通风良好',
      '垃圾桶要加盖并及时清理',
      '食物储备要充足，象征丰衣足食',
    ],
    taboos: [
      '忌灶台坐北朝南（水火相冲）',
      '忌厨房在西北方（火烧天门）',
      '忌灶台正对厨房门',
      '忌灶台与水槽正对',
      '忌灶台背后靠窗',
      '忌厨房与卫生间相邻',
      '忌厨房在房屋正中央',
      '忌厨房地面高于客厅',
    ],
    luckyItems: [
      '陶瓷器皿（土生金、助财运）',
      '新鲜水果摆件',
      '五谷丰登装饰画',
      '福禄寿喜字贴',
      '竹制餐具（木生火、助健康）',
    ],
    colorSuggestion: '根据厨房方位五行选择。木位宜绿，火位宜白，金位宜白黄，土位宜黄，水位宜绿黄。',
  },
  '卫生间': {
    name: '卫生间风水',
    importance: '中高',
    description: '卫生间是排污之所，为家中阴气和浊气最重的地方。卫生间风水的关键是"保持清洁干燥"，防止晦气扩散到全屋。',
    keyPoints: [
      '保持干燥通风最重要',
      '卫生间门宜常关',
      '马桶宜朝凶方',
      '卫生间内要有充足照明',
      '排气扇常开，保持空气流通',
      '地面保持干燥，避免积水',
      '卫生洁具保持光洁',
      '可摆放净化空气的绿植',
    ],
    taboos: [
      '忌卫生间在房屋正中央',
      '忌卫生间在宅卦吉位',
      '忌卫生间门正对大门',
      '忌卫生间门正对卧室',
      '忌卫生间门正对厨房',
      '忌卫生间改作卧室',
      '忌镜子正对马桶',
      '忌卫生间阴暗潮湿',
    ],
    luckyItems: [
      '铜葫芦（化煞收邪）',
      '五帝钱（化煞旺财）',
      '绿萝、虎皮兰等净化植物',
      '香薰或熏香（净化空气）',
      '水晶球（化煞增气场）',
    ],
    colorSuggestion: '宜以白色、米色等干净清爽的颜色为主，忌黑色、深蓝色等阴寒色调。',
  },
  '书房': {
    name: '书房风水',
    importance: '中',
    description: '书房是学习工作的地方，主学业和事业。书房风水好，有助于提升学习效率、思维敏捷、事业顺利。',
    keyPoints: [
      '书桌宜放在文昌位',
      '坐姿宜背后有靠（靠墙）',
      '书房宜安静整洁',
      '光线要充足柔和',
      '书架宜整齐有序',
      '书桌上物品摆放有序',
      '宜摆放绿植净化空气',
      '宜挂励志或山水字画',
    ],
    taboos: [
      '忌书桌背对门口',
      '忌横梁压书桌',
      '忌书桌正对窗户（光煞）',
      '忌书房紧邻卫生间',
      '忌书房杂乱无章',
      '忌书桌上摆放过多杂物',
      '忌镜子正对书桌',
    ],
    luckyItems: [
      '文昌塔（旺学业事业）',
      '毛笔架（四支笔，旺文昌）',
      '富贵竹（四支，旺文昌）',
      '山水画（开阔眼界）',
      '麒麟摆件（旺事业贵人）',
    ],
    colorSuggestion: '宜以绿色、木色、米色为主，营造宁静致远的学习氛围。忌大红大紫等刺激颜色。',
  },
  '玄关': {
    name: '玄关风水',
    importance: '高',
    description: '玄关是住宅的咽喉要道，是外界与室内的过渡空间。玄关风水关系到财气能否顺利进入家中，也关系到家人的出入平安。',
    keyPoints: [
      '玄关宜明亮整洁',
      '玄关大小要适中',
      '鞋柜宜放在侧边',
      '玄关可设屏风（挡煞聚气）',
      '地面宜用防滑耐磨材质',
      '玄关灯光要明亮',
      '可悬挂吉祥装饰画',
      '宜摆放绿植迎财',
    ],
    taboos: [
      '忌玄关阴暗狭窄',
      '忌玄关堆放杂物',
      '忌镜子正对大门',
      '忌横梁压玄关',
      '忌玄关直通到底（穿堂煞）',
      '忌鞋柜高过人头',
      '忌鞋子外露不整洁',
    ],
    luckyItems: [
      '五帝钱（放在门垫下，化煞旺财）',
      '中国结（吉祥如意）',
      '福字（迎福纳祥）',
      '发财树（开门见绿，生机盎然）',
      '玄关柜上放聚宝盆',
    ],
    colorSuggestion: '宜明亮温暖的色调，如米白、浅黄、木色。根据大门方位选择相生的颜色。',
  },
};

// ========== 五、厨房风水常识 ==========
export const KITCHEN_TIPS = [
  {
    title: '厨房方位讲究',
    content: '厨房属火，宜设在东方或东南方（木生火）为吉，主家人健康、财运稳定。南方火气过旺不宜，北方水火相冲不吉，西北方为"火烧天门"大忌，最忌厨房设在乾位。',
  },
  {
    title: '灶台摆放禁忌',
    content: '灶台忌坐北朝南（水火相冲），忌坐西北朝东南（火烧天门），忌正对厨房门（开门见灶钱财多耗），忌背后靠窗（背后无靠），忌横梁压顶，忌与水槽正对（水火相冲）。',
  },
  {
    title: '厨房与卫生间的关系',
    content: '厨房属火，卫生间属水，水火不容。厨房门不可与卫生间门正对，厨房与卫生间不可共用一墙，更不可将厨房和卫生间合并在一起，否则主夫妻不和、健康受损。',
  },
  {
    title: '厨房颜色风水',
    content: '厨房颜色需根据方位五行来定。东方东南方宜绿色木色，南方宜白色银色（中和火气），西南方东北方宜黄色土色，西方西北方宜白色金色（火克金需化解），北方宜绿色木色（通关水火）。',
  },
  {
    title: '厨房财位与旺运',
    content: '厨房为财库之所，主家庭积蓄。冰箱米缸宜常满，象征丰衣足食。厨房宜保持整洁明亮，杂物要收纳整齐，灶台要擦拭干净，如此才能积聚财气，家运兴旺。',
  },
  {
    title: '灶台朝向吉凶',
    content: '灶台宜坐吉朝凶，即背靠吉方、面朝凶方，以吉气压凶气。坐东朝西、坐东南朝西北、坐南朝北、坐西南朝东北、坐东北朝西南为常见吉向。坐北朝南、坐西北朝东南为大忌。',
  },
  {
    title: '厨房吉祥物品',
    content: '厨房宜摆放陶瓷器皿（火生土、土生金助财运）、新鲜水果（象征丰衣足食）、五谷丰登装饰画、福禄寿喜字贴、竹制餐具（木生火助健康）。忌放猛兽图画、带刺植物、闲置的旧锅碗。',
  },
  {
    title: '厨房与健康',
    content: '厨房主饮食健康，其风水直接影响家人身体。灶台背后有靠则健康有保障，水火平衡则少病少灾。厨房宜保持干燥通风，食物要新鲜，垃圾要及时清理，否则易招阴邪、影响健康。',
  },
  {
    title: '厨房地面禁忌',
    content: '厨房地面不可高于客厅和卧室，否则主财运外泄、家道中落。厨房地面宜平整防滑，颜色宜深沉稳重（象征财库深厚），忌用反光强烈的材质，忌有缺角和高低不平。',
  },
  {
    title: '厨房刀具收纳',
    content: '厨房刀具属金，外露则煞气重，易有口舌是非和血光之灾。刀具应收纳在抽屉或刀架中，不可悬挂在墙上外露。刀架宜放在灶台侧面，不可正对人站立的位置。',
  },
];

// ========== 六、卫生间风水常识 ==========
export const BATHROOM_TIPS = [
  {
    title: '卫生间方位禁忌',
    content: '卫生间为藏污纳垢之所，属水、属阴，宜设在凶位不宜设在吉位。最忌在房屋正中央（中宫受污），忌在东南文昌位（污文昌），忌在正北方（水气过重），忌在西北乾位（污天门）。西方、西南方、东北方相对尚可。',
  },
  {
    title: '卫生间化煞方法',
    content: '卫生间化煞核心是"保持清洁干燥"。常用方法：常开排气扇保持通风、卫生间门常关加挂门帘、摆放铜葫芦或五帝钱化煞、放置绿植净化空气、使用香薰净化异味、安装长明灯增加阳气。',
  },
  {
    title: '马桶朝向风水',
    content: '马桶朝向宜朝凶方，不可朝吉方，也不可与住宅坐向一致。马桶不可正对卫生间门，不可正对镜子，不可正对床。从五行角度，马桶宜朝向与卫生间方位五行相克的方向，以制其凶。',
  },
  {
    title: '卫生间颜色选择',
    content: '卫生间颜色宜明亮干净，以白色、米色、浅色系为主，象征洁净。忌黑色、深蓝色等阴寒色调（加重水气），忌大红色（水火相冲）。根据方位五行调整：木位宜白色（金克木）、火位宜绿色（木通关）、金位宜白色（增强金气）、土位宜白色（金泄土）、水位宜绿色黄色（木制土克）。',
  },
  {
    title: '卫生间与大门的关系',
    content: '卫生间门不可正对大门，否则为"开门见厕"，主财运不济、家运衰败。若无法避免，可在大门与卫生间之间设置玄关或屏风遮挡，或在卫生间门口挂门帘，门内摆放绿植缓冲煞气。',
  },
  {
    title: '卫生间与卧室禁忌',
    content: '卫生间门不可正对卧室门，更不可正对床。湿气和晦气直冲卧室，主睡眠质量差、健康受损、财运下降。化解方法：卫生间门常关、挂门帘、卧室内摆放绿植净化、卫生间内点长明灯增加阳气。',
  },
  {
    title: '卫生间吉祥物品',
    content: '卫生间宜放铜葫芦（化煞收邪）、五帝钱（化煞旺财）、绿萝虎皮兰等净化绿植（净化空气兼化煞）、天然香薰（净化异味）、水晶球（化煞增气场）。忌放人形玩偶、旧衣物、猛兽图画等阴性或凶性物品。',
  },
  {
    title: '卫生间改卧室禁忌',
    content: '卫生间绝对不可改作卧室，因为上下楼层都是卫生间，污秽之气上下夹攻，住在其中必大病缠身、运势衰败。即使自家卫生间已改造，楼上楼下仍是卫生间，煞气依然存在，是风水大忌。',
  },
  {
    title: '卫生间镜子风水',
    content: '卫生间镜子不可正对马桶，不可正对卫生间门，不可过大过多。镜子属金，会反射煞气，也会加重阴寒之气。镜子宜安装在洗手台上方，尺寸适中，边框宜圆润，避免尖锐棱角。',
  },
  {
    title: '卫生间地面与排水',
    content: '卫生间地面宜低于其他房间，防止晦气和水气流向室内。地漏宜设在凶方角落，不可设在房屋中心线上。排水要通畅，积水则主财运停滞。地面宜用防滑材质，颜色宜浅净。',
  },
];

// ========== 七、户型图分析模拟数据 ==========

// 模拟户型图AI分析结果的模板
export const HUXING_ANALYSIS_TEMPLATE = {
  overallScore: 0, // 总分（0-100）
  houseType: '', // 宅型（如坎宅、离宅等）
  orientation: '', // 朝向（如坐北朝南）
  structure: '', // 结构评价（如方正、缺角等）
  advantages: [
    '户型方正，气场稳定',
    '采光良好，阳气充足',
    '动线流畅，布局合理',
  ], // 户型优点（3-5条）
  disadvantages: [
    '存在缺角问题',
    '部分空间布局欠佳',
  ], // 户型缺点（3-5条）
  rooms: {
    livingRoom: { direction: '', jixiong: '', suggestion: '' },
    masterBedroom: { direction: '', jixiong: '', suggestion: '' },
    secondBedroom: { direction: '', jixiong: '', suggestion: '' },
    kitchen: { direction: '', jixiong: '', suggestion: '' },
    bathroom: { direction: '', jixiong: '', suggestion: '' },
    study: { direction: '', jixiong: '', suggestion: '' },
  },
  wealthPosition: {
    direction: '',
    status: '', // 财位状态（明财位/暗财位/吉/凶/被压/缺角等）
    suggestion: '', // 财位优化建议
  }, // 财位
  missingCorners: [
    // { direction: '', effect: '', resolution: '' }
  ], // 缺角方位
  nineStars: {
    // '北': { star: '', type: '', suggestion: '' },
    // '东北': { star: '', type: '', suggestion: '' },
    // ... 八个方位
  }, // 九星分布
  colorSuggestions: [
    '客厅宜用...',
    '卧室宜用...',
    '厨房宜用...',
  ], // 全屋配色建议
  layoutSuggestions: [
    '大门方位优化建议',
    '主卧布局调整建议',
    '厨房灶台朝向建议',
    '卫生间化煞建议',
    '财位催旺建议',
    '文昌位布局建议',
  ], // 布局优化建议（5-8条）
  resolutions: [
    // { problem: '', method: '', level: '' }
  ], // 化解建议（针对凶位）
};
