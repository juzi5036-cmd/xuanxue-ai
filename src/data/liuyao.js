// 六爻起卦数据

// 八卦
export const BAGUA = [
  { name: '乾', symbol: '☰', nature: '天', wuxing: '金' },
  { name: '兑', symbol: '☱', nature: '泽', wuxing: '金' },
  { name: '离', symbol: '☲', nature: '火', wuxing: '火' },
  { name: '震', symbol: '☳', nature: '雷', wuxing: '木' },
  { name: '巽', symbol: '☴', nature: '风', wuxing: '木' },
  { name: '坎', symbol: '☵', nature: '水', wuxing: '水' },
  { name: '艮', symbol: '☶', nature: '山', wuxing: '土' },
  { name: '坤', symbol: '☷', nature: '地', wuxing: '土' },
];

// 六十四卦（简化版，展示主要的）
export const LIU_SHI_SI_GUA = [
  { id: 1, name: '乾为天', upper: '乾', lower: '乾', meaning: '刚健中正，元亨利贞。大吉之卦。' },
  { id: 2, name: '坤为地', upper: '坤', lower: '坤', meaning: '厚德载物，柔顺之德。吉卦。' },
  { id: 3, name: '水雷屯', upper: '坎', lower: '震', meaning: '万物始生，艰难困苦。先难后易。' },
  { id: 4, name: '山水蒙', upper: '艮', lower: '坎', meaning: '蒙昧初开，启蒙教育。' },
  { id: 5, name: '水天需', upper: '坎', lower: '乾', meaning: '等待时机，不进则退。' },
  { id: 6, name: '天水讼', upper: '乾', lower: '坎', meaning: '争讼是非，宜和不宜争。' },
  { id: 7, name: '地水师', upper: '坤', lower: '坎', meaning: '师旅之象，用兵之道。' },
  { id: 8, name: '水地比', upper: '坎', lower: '坤', meaning: '亲比团结，吉庆之象。' },
  { id: 9, name: '风天小畜', upper: '巽', lower: '乾', meaning: '小有积蓄，蓄势待发。' },
  { id: 10, name: '天泽履', upper: '乾', lower: '兑', meaning: '履行实践，脚踏实地。' },
  { id: 11, name: '地天泰', upper: '坤', lower: '乾', meaning: '天地交泰，万事亨通。大吉。' },
  { id: 12, name: '天地否', upper: '乾', lower: '坤', meaning: '天地不交，闭塞不通。凶。' },
  { id: 13, name: '天火同人', upper: '乾', lower: '离', meaning: '志同道合，众人相助。吉。' },
  { id: 14, name: '火天大有', upper: '离', lower: '乾', meaning: '大有所获，富贵昌盛。大吉。' },
  { id: 15, name: '地山谦', upper: '坤', lower: '艮', meaning: '谦虚谨慎，终有成就。吉。' },
  { id: 16, name: '雷地豫', upper: '震', lower: '坤', meaning: '喜悦安乐，顺时而动。' },
  { id: 17, name: '泽雷随', upper: '兑', lower: '震', meaning: '随顺自然，择善而从。' },
  { id: 18, name: '山风蛊', upper: '艮', lower: '巽', meaning: '积弊成患，需要整治。' },
  { id: 19, name: '地泽临', upper: '坤', lower: '兑', meaning: '居高临下，领导有方。吉。' },
  { id: 20, name: '风地观', upper: '巽', lower: '坤', meaning: '观察审视，谋定后动。' },
];

// 数字起卦
export function numberQiGua(num1, num2, num3 = 6) {
  // 上卦 = 第一个数 % 8
  const upperIndex = (num1 - 1) % 8;
  // 下卦 = 第二个数 % 8
  const lowerIndex = (num2 - 1) % 8;
  // 动爻 = 第三个数 % 6
  const yao = num3 % 6;
  
  const upperGua = BAGUA[upperIndex];
  const lowerGua = BAGUA[lowerIndex];
  
  // 找本卦
  const guaName = findGuaName(upperGua.name, lowerGua.name);
  const gua = LIU_SHI_SI_GUA.find(g => g.name === guaName) || {
    name: `${upperGua.name}${lowerGua.name}`,
    upper: upperGua.name,
    lower: lowerGua.name,
    meaning: '卦象需进一步推演。'
  };
  
  // 变卦（简化：动爻变阴阳）
  const changedIndex = (yao + 3) % 8;
  const changedGua = BAGUA[changedIndex];
  
  return {
    method: '数字起卦',
    numbers: [num1, num2, num3],
    upperGua,
    lowerGua,
    gua,
    dongYao: yao + 1,
    meaning: gua.meaning,
    changedGua: { upper: changedGua.name, lower: lowerGua.name },
  };
}

// 时间起卦
export function timeQiGua(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  
  // 上卦 = (年+月+日) % 8
  const upperIndex = (year + month + day - 1) % 8;
  // 下卦 = (年+月+日+时) % 8
  const lowerIndex = (year + month + day + hour - 1) % 8;
  // 动爻 = (年+月+日+时) % 6
  const yao = (year + month + day + hour) % 6;
  
  const upperGua = BAGUA[upperIndex];
  const lowerGua = BAGUA[lowerIndex];
  
  const guaName = findGuaName(upperGua.name, lowerGua.name);
  const gua = LIU_SHI_SI_GUA.find(g => g.name === guaName) || {
    name: guaName,
    upper: upperGua.name,
    lower: lowerGua.name,
    meaning: '卦象需进一步推演。'
  };
  
  return {
    method: '时间起卦',
    time: `${year}年${month}月${day}日${hour}时`,
    upperGua,
    lowerGua,
    gua,
    dongYao: yao + 1,
    meaning: gua.meaning,
  };
}

// 文字起卦（简化版）
export function textQiGua(text) {
  const chars = text.split('');
  const half = Math.floor(chars.length / 2);
  
  let num1 = 0;
  let num2 = 0;
  
  chars.slice(0, half).forEach(c => {
    num1 += c.charCodeAt(0);
  });
  chars.slice(half).forEach(c => {
    num2 += c.charCodeAt(0);
  });
  
  const upperIndex = (num1 - 1) % 8;
  const lowerIndex = (num2 - 1) % 8;
  const yao = (num1 + num2) % 6;
  
  const upperGua = BAGUA[upperIndex];
  const lowerGua = BAGUA[lowerIndex];
  
  const guaName = findGuaName(upperGua.name, lowerGua.name);
  const gua = LIU_SHI_SI_GUA.find(g => g.name === guaName) || {
    name: guaName,
    upper: upperGua.name,
    lower: lowerGua.name,
    meaning: '卦象需进一步推演。'
  };
  
  return {
    method: '文字起卦',
    text,
    upperGua,
    lowerGua,
    gua,
    dongYao: yao + 1,
    meaning: gua.meaning,
  };
}

function findGuaName(upper, lower) {
  const gua = LIU_SHI_SI_GUA.find(g => g.upper === upper && g.lower === lower);
  return gua ? gua.name : `${upper}${lower}`;
}
