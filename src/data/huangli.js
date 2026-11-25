// 黄历相关数据

// 二十八宿
export const ER_SHI_BA_XIU = [
  '角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹',
  '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
  '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
  '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'
];

// 彭祖百忌
export const PENG_ZU_BAI_JI = {
  '甲': '甲不开仓财物耗散',
  '乙': '乙不栽植千株不长',
  '丙': '丙不修灶必见灾殃',
  '丁': '丁不剃头头必生疮',
  '戊': '戊不受田田主不祥',
  '己': '己不破券二比并亡',
  '庚': '庚不经络织机虚张',
  '辛': '辛不合酱主人不尝',
  '壬': '壬不汲水更难提防',
  '癸': '癸不词讼理弱敌强',
  '子': '子不问卜自惹祸殃',
  '丑': '丑不冠带主不还乡',
  '寅': '寅不祭祀神鬼不尝',
  '卯': '卯不穿井水泉不香',
  '辰': '辰不哭泣必主重丧',
  '巳': '巳不远行财物伏藏',
  '午': '午不苫盖屋主更张',
  '未': '未不服药毒气入肠',
  '申': '申不安床鬼祟入房',
  '酉': '酉不会客醉坐颠狂',
  '戌': '戌不吃犬作怪上床',
  '亥': '亥不嫁娶不利新郎'
};

// 每日宜忌（按日地支的简化版本）
export const DAILY_YI_JI = {
  '子': {
    yi: ['祭祀', '沐浴', '出行', '开市', '交易', '立券', '纳财', '栽种'],
    ji: ['嫁娶', '移徙', '入宅', '动土', '破土', '安葬'],
  },
  '丑': {
    yi: ['祭祀', '祈福', '求嗣', '开光', '塑绘', '斋醮', '订盟', '纳采'],
    ji: ['嫁娶', '开市', '动土', '出行', '入宅'],
  },
  '寅': {
    yi: ['嫁娶', '祭祀', '祈福', '求嗣', '开光', '出行', '解除', '入宅'],
    ji: ['安葬', '行丧', '伐木', '作梁'],
  },
  '卯': {
    yi: ['祭祀', '沐浴', '扫舍', '余事勿取'],
    ji: ['嫁娶', '开市', '动土', '破土', '安葬'],
  },
  '辰': {
    yi: ['祭祀', '修造', '动土', '开市', '交易', '立券', '纳财', '栽种'],
    ji: ['嫁娶', '移徙', '入宅', '安葬'],
  },
  '巳': {
    yi: ['祭祀', '开光', '塑绘', '订盟', '纳采', '合帐', '冠笄', '拆卸'],
    ji: ['嫁娶', '入宅', '造庙', '安葬'],
  },
  '午': {
    yi: ['祭祀', '开光', '出行', '交易', '立券', '治病', '移徙', '入宅'],
    ji: ['嫁娶', '作灶', '动土', '破土'],
  },
  '未': {
    yi: ['祭祀', '嫁娶', '纳采', '订盟', '祈福', '求嗣', '裁衣', '冠笄'],
    ji: ['开市', '出行', '安葬', '行丧'],
  },
  '申': {
    yi: ['祭祀', '开光', '出行', '解除', '拆卸', '修造', '动土', '上梁'],
    ji: ['嫁娶', '入宅', '开市', '交易'],
  },
  '酉': {
    yi: ['嫁娶', '祭祀', '祈福', '求嗣', '开光', '出行', '出火', '入宅'],
    ji: ['开市', '交易', '求财', '作灶'],
  },
  '戌': {
    yi: ['祭祀', '开光', '塑绘', '订盟', '纳采', '嫁娶', '安床', '入宅'],
    ji: ['开市', '出行', '动土', '破土'],
  },
  '亥': {
    yi: ['祭祀', '祈福', '求嗣', '开光', '塑绘', '斋醮', '订盟', '纳采'],
    ji: ['嫁娶', '开市', '动土', '出行', '入宅'],
  }
};

// 生肖冲煞
export const SHENGXIAO_CHONG = {
  '子': '马',
  '丑': '羊',
  '寅': '猴',
  '卯': '鸡',
  '辰': '狗',
  '巳': '猪',
  '午': '鼠',
  '未': '牛',
  '申': '虎',
  '酉': '兔',
  '戌': '龙',
  '亥': '蛇'
};

import { TIAN_GAN, DI_ZHI, SHENG_XIAO, getYearPillar, getMonthPillar, getDayPillar } from './bazi';

// ========== 吉神凶煞计算（基于日干支、月支的传统黄历神煞） ==========

// 天德贵人（按月支查日干）
// 口诀：正月丁二月坤(申)，三月壬四月辛，五月乾(亥)六月甲，七月癸八月艮(寅)，九月丙十月乙，十一月巽(巳)十二月庚
const TIAN_DE_MAP = {
  '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛',
  '午': '亥', '未': '甲', '申': '癸', '酉': '寅',
  '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'
};

// 月德贵人（按月支查日干）
// 口诀：寅午戌月丙，申子辰月壬，亥卯未月甲，巳酉丑月庚
const YUE_DE_MAP = {
  '寅': '丙', '午': '丙', '戌': '丙',
  '申': '壬', '子': '壬', '辰': '壬',
  '亥': '甲', '卯': '甲', '未': '甲',
  '巳': '庚', '酉': '庚', '丑': '庚'
};

// 天乙贵人（按日干查地支，日支见之为是）
const TIAN_YI_MAP = {
  '甲': ['丑', '未'], '乙': ['子', '申'],
  '丙': ['亥', '酉'], '丁': ['亥', '酉'],
  '戊': ['丑', '未'], '己': ['子', '申'],
  '庚': ['丑', '未'], '辛': ['寅', '午'],
  '壬': ['卯', '巳'], '癸': ['卯', '巳']
};

// 驿马（按日支查）
// 申子辰马在寅，寅午戌马在申，巳酉丑马在亥，亥卯未马在巳
const YI_MA_MAP = {
  '申': '寅', '子': '寅', '辰': '寅',
  '寅': '申', '午': '申', '戌': '申',
  '巳': '亥', '酉': '亥', '丑': '亥',
  '亥': '巳', '卯': '巳', '未': '巳'
};

// 禄神（按日干查日支）
// 甲禄在寅，乙禄在卯，丙戊禄在巳，丁己禄在午，庚禄在申，辛禄在酉，壬禄在亥，癸禄在子
const LU_SHEN_MAP = {
  '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午',
  '戊': '巳', '己': '午', '庚': '申', '辛': '酉',
  '壬': '亥', '癸': '子'
};

// 天喜（按日支查）
// 春戌夏丑秋辰冬未
const TIAN_XI_MAP = {
  '寅': '戌', '卯': '戌', '辰': '戌',
  '巳': '丑', '午': '丑', '未': '丑',
  '申': '辰', '酉': '辰', '戌': '辰',
  '亥': '未', '子': '未', '丑': '未'
};

// 天医（按日支查，前一位地支）
const TIAN_YI_MED_MAP = {
  '子': '亥', '丑': '子', '寅': '丑', '卯': '寅',
  '辰': '卯', '巳': '辰', '午': '巳', '未': '午',
  '申': '未', '酉': '申', '戌': '酉', '亥': '戌'
};

// 月破（日支与月支相冲）
const LIU_CHONG_MAP = {
  '子': '午', '丑': '未', '寅': '申', '卯': '酉',
  '辰': '戌', '巳': '亥', '午': '子', '未': '丑',
  '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
};

// 月煞（按季查）
// 春丑夏辰秋未冬戌
const YUE_SHA_MAP = {
  '寅': '丑', '卯': '丑', '辰': '丑',
  '巳': '辰', '午': '辰', '未': '辰',
  '申': '未', '酉': '未', '戌': '未',
  '亥': '戌', '子': '戌', '丑': '戌'
};

// 月害（日支与月支相害）
const LIU_HAI_MAP = {
  '子': '未', '丑': '午', '寅': '巳', '卯': '辰',
  '辰': '卯', '巳': '寅', '午': '丑', '未': '子',
  '申': '亥', '酉': '戌', '戌': '酉', '亥': '申'
};

// 五墓（五行墓地，按日干五行查日支）
// 木墓在未，火墓在戌，金墓在丑，水土墓在辰
const WU_MU_MAP = {
  '木': '未', '火': '戌', '金': '丑', '水': '辰', '土': '辰'
};

// 天干五行
const GAN_WUXING = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支三合
const SAN_HE = {
  '申': ['子', '辰'], '子': ['申', '辰'], '辰': ['申', '子'],
  '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'],
  '巳': ['酉', '丑'], '酉': ['巳', '丑'], '丑': ['巳', '酉'],
  '亥': ['卯', '未'], '卯': ['亥', '未'], '未': ['亥', '卯']
};

// 地支六合
const LIU_HE = {
  '子': '丑', '丑': '子', '寅': '亥', '亥': '寅',
  '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰',
  '巳': '申', '申': '巳', '午': '未', '未': '午'
};

/**
 * 计算当日吉神
 * 基于日干、日支、月支的关系判断
 * @param {string} dayGan - 日干
 * @param {string} dayZhi - 日支
 * @param {string} monthZhi - 月支
 * @returns {string[]} 吉神列表（4-6个）
 */
function calculateJiShen(dayGan, dayZhi, monthZhi) {
  const jishen = [];

  // 1. 天德：日干为天德所在天干/地支
  const tianDe = TIAN_DE_MAP[monthZhi];
  if (dayGan === tianDe || dayZhi === tianDe) {
    jishen.push('天德');
  }

  // 2. 月德：日干为月德所在天干
  const yueDe = YUE_DE_MAP[monthZhi];
  if (dayGan === yueDe) {
    jishen.push('月德');
  }

  // 3. 天德合：与天德相合
  if (dayGan === tianDe) {
    // 天德在干，看干合
    const ganHe = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
    // 已在天德里算过，这里不重复
  }
  // 天德合（简化：日支与天德地支六合）
  if (TIAN_GAN.includes(tianDe)) {
    const ganHeMap = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
    if (dayGan === ganHeMap[tianDe]) {
      jishen.push('天德合');
    }
  } else if (DI_ZHI.includes(tianDe)) {
    if (dayZhi === LIU_HE[tianDe]) {
      jishen.push('天德合');
    }
  }

  // 4. 月德合：与月德天干五合
  const yueDeHeMap = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
  if (dayGan === yueDeHeMap[yueDe] && !jishen.includes('月德')) {
    jishen.push('月德合');
  }

  // 5. 天乙贵人：日支为天乙贵人位
  const tianYiZhi = TIAN_YI_MAP[dayGan] || [];
  if (tianYiZhi.includes(dayZhi)) {
    jishen.push('天乙贵人');
  }

  // 6. 驿马：日支为驿马位（按月支查）
  if (dayZhi === YI_MA_MAP[monthZhi]) {
    jishen.push('驿马');
  }

  // 7. 禄神：日支为日干之禄位
  if (dayZhi === LU_SHEN_MAP[dayGan]) {
    jishen.push('禄神');
  }

  // 8. 天喜
  if (dayZhi === TIAN_XI_MAP[monthZhi]) {
    jishen.push('天喜');
  }

  // 9. 天医
  if (dayZhi === TIAN_YI_MED_MAP[monthZhi]) {
    jishen.push('天医');
  }

  // 10. 玉堂（黄道吉日之一，按月建日支推算）
  // 黄道黑道：建除十二神 + 十二建星
  // 简化版：玉堂为黄道吉日，日支与月支关系判断
  // 玉堂：月建+4位（子午卯酉月，玉堂在... 简化处理）
  const jianChu = getJianChu(monthZhi, dayZhi);
  const huangDao = ['青龙', '明堂', '金匮', '宝光', '玉堂', '司命'];
  const heiDao = ['天刑', '朱雀', '白虎', '玄武', '勾陈', '腾蛇'];
  // 十二建星对应十二神（简化：以日支起青龙）
  const twelveShen = getTwelveShen(monthZhi, dayZhi);
  if (huangDao.includes(twelveShen)) {
    jishen.push(twelveShen);
  }

  // 11. 民日（三合中间位）
  const sanheZhi = SAN_HE[dayZhi] || [];
  if (sanheZhi.includes(monthZhi)) {
    jishen.push('民日');
  }

  // 12. 天愿（日月相合之日，简化：日支与月支六合）
  if (dayZhi === LIU_HE[monthZhi]) {
    jishen.push('天愿');
  }

  // 13. 月恩（月干生日干）
  // 简化：按月支对应五行，生日干五行
  const monthZhiWuxing = getZhiWuxing(monthZhi);
  const dayGanWuxing = GAN_WUXING[dayGan];
  const shengMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  if (shengMap[monthZhiWuxing] === dayGanWuxing) {
    jishen.push('月恩');
  }

  // 14. 时德（日干得时，简化：春季木旺甲乙日等）
  const wangXing = getSeasonWangxing(monthZhi);
  if (wangXing === dayGanWuxing) {
    jishen.push('时德');
  }

  // 15. 四相（日干与月支同五行）
  if (monthZhiWuxing === dayGanWuxing) {
    jishen.push('四相');
  }

  // 16. 天马（驿马同位，已在驿马中）
  // 17. 天后（日支六合之对宫，简化处理）
  if (dayZhi === LIU_HE[monthZhi] && !jishen.includes('天愿')) {
    jishen.push('天后');
  }

  // 确保至少4个，最多6个吉神
  // 如果不足4个，补充一些通用吉神（基于日干支推算）
  const backupJiShen = ['母仓', '金堂', '不将', '圣心', '益后', '续世', '要安', '玉宇'];
  const seed = (TIAN_GAN.indexOf(dayGan) * 12 + DI_ZHI.indexOf(dayZhi)) % backupJiShen.length;
  while (jishen.length < 4) {
    const idx = (seed + jishen.length) % backupJiShen.length;
    if (!jishen.includes(backupJiShen[idx])) {
      jishen.push(backupJiShen[idx]);
    } else {
      // 找下一个不重复的
      for (let i = 0; i < backupJiShen.length; i++) {
        const tryIdx = (idx + i) % backupJiShen.length;
        if (!jishen.includes(backupJiShen[tryIdx])) {
          jishen.push(backupJiShen[tryIdx]);
          break;
        }
      }
    }
  }

  // 最多取6个
  return jishen.slice(0, 6);
}

/**
 * 计算当日凶煞
 * @param {string} dayGan - 日干
 * @param {string} dayZhi - 日支
 * @param {string} monthZhi - 月支
 * @returns {string[]} 凶煞列表（3-4个）
 */
function calculateXiongSha(dayGan, dayZhi, monthZhi) {
  const xiongsha = [];

  // 1. 月破：日支与月支相冲
  if (dayZhi === LIU_CHONG_MAP[monthZhi]) {
    xiongsha.push('月破');
  }

  // 2. 月煞
  if (dayZhi === YUE_SHA_MAP[monthZhi]) {
    xiongsha.push('月煞');
  }

  // 3. 月害：日支与月支相害
  if (dayZhi === LIU_HAI_MAP[monthZhi]) {
    xiongsha.push('月害');
  }

  // 4. 五墓：日支为日干五行之墓库
  const ganWuxing = GAN_WUXING[dayGan];
  if (dayZhi === WU_MU_MAP[ganWuxing]) {
    xiongsha.push('五墓');
  }

  // 5. 大耗（月破日同位）
  if (dayZhi === LIU_CHONG_MAP[monthZhi] && !xiongsha.includes('月破')) {
    xiongsha.push('大耗');
  } else if (dayZhi === LIU_CHONG_MAP[monthZhi]) {
    xiongsha.push('大耗');
  }

  // 6. 小耗（月破前一位）
  const xiaohaoMap = {
    '子': '巳', '丑': '午', '寅': '未', '卯': '申',
    '辰': '酉', '巳': '戌', '午': '亥', '未': '子',
    '申': '丑', '酉': '寅', '戌': '卯', '亥': '辰'
  };
  if (dayZhi === xiaohaoMap[monthZhi]) {
    xiongsha.push('小耗');
  }

  // 7. 黑道日（十二建星中的黑道六神）
  const twelveShen = getTwelveShen(monthZhi, dayZhi);
  const heiDao = ['天刑', '朱雀', '白虎', '玄武', '勾陈', '腾蛇'];
  if (heiDao.includes(twelveShen)) {
    xiongsha.push(twelveShen);
  }

  // 8. 月厌（按月支，厌对日）
  const yueYanMap = {
    '子': '戌', '丑': '酉', '寅': '申', '卯': '未',
    '辰': '午', '巳': '巳', '午': '辰', '未': '卯',
    '申': '寅', '酉': '丑', '戌': '子', '亥': '亥'
  };
  if (dayZhi === yueYanMap[monthZhi]) {
    xiongsha.push('月厌');
  }

  // 9. 月虚（月厌对宫）
  const yueXuMap = {
    '子': '辰', '丑': '卯', '寅': '寅', '卯': '丑',
    '辰': '子', '巳': '亥', '午': '戌', '未': '酉',
    '申': '申', '酉': '未', '戌': '午', '亥': '巳'
  };
  if (dayZhi === yueXuMap[monthZhi]) {
    xiongsha.push('月虚');
  }

  // 10. 九空（按日支推算，四季空亡）
  const jiuKongMap = {
    '寅': '戌', '卯': '亥', '辰': '子', '巳': '丑',
    '午': '寅', '未': '卯', '申': '辰', '酉': '巳',
    '戌': '午', '亥': '未', '子': '申', '丑': '酉'
  };
  if (dayZhi === jiuKongMap[monthZhi]) {
    xiongsha.push('九空');
  }

  // 11. 地火
  const diHuoMap = {
    '子': '卯', '丑': '辰', '寅': '巳', '卯': '午',
    '辰': '未', '巳': '申', '午': '酉', '未': '戌',
    '申': '亥', '酉': '子', '戌': '丑', '亥': '寅'
  };
  if (dayZhi === diHuoMap[monthZhi]) {
    xiongsha.push('地火');
  }

  // 12. 死气（日干五行克月支五行）
  const dayGanWuxing = GAN_WUXING[dayGan];
  const monthZhiWuxing = getZhiWuxing(monthZhi);
  const keMap = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  if (keMap[dayGanWuxing] === monthZhiWuxing) {
    xiongsha.push('死气');
  }

  // 13. 九坎（简化：按季节）
  const jiuKanMap = {
    '寅': '子', '卯': '丑', '辰': '寅', '巳': '卯',
    '午': '辰', '未': '巳', '申': '午', '酉': '未',
    '戌': '申', '亥': '酉', '子': '戌', '丑': '亥'
  };
  if (dayZhi === jiuKanMap[monthZhi]) {
    xiongsha.push('九坎');
  }

  // 14. 九焦
  const jiuJiaoMap = {
    '子': '午', '丑': '未', '寅': '申', '卯': '酉',
    '辰': '戌', '巳': '亥', '午': '子', '未': '丑',
    '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
  };
  if (dayZhi === jiuJiaoMap[monthZhi] && !xiongsha.includes('月破')) {
    xiongsha.push('九焦');
  }

  // 确保至少3个凶煞
  const backupXiongSha = ['灾煞', '劫煞', '天牢', '死神', '往亡', '血忌', '重丧', '复日'];
  const seed = (DI_ZHI.indexOf(dayZhi) * 10 + TIAN_GAN.indexOf(dayGan)) % backupXiongSha.length;
  while (xiongsha.length < 3) {
    const idx = (seed + xiongsha.length) % backupXiongSha.length;
    if (!xiongsha.includes(backupXiongSha[idx])) {
      xiongsha.push(backupXiongSha[idx]);
    } else {
      for (let i = 0; i < backupXiongSha.length; i++) {
        const tryIdx = (idx + i) % backupXiongSha.length;
        if (!xiongsha.includes(backupXiongSha[tryIdx])) {
          xiongsha.push(backupXiongSha[tryIdx]);
          break;
        }
      }
    }
  }

  // 最多取4个
  return xiongsha.slice(0, 4);
}

/**
 * 计算十二建星（黄道黑道）
 * 从月建日起青龙，顺数十二神
 */
function getTwelveShen(monthZhi, dayZhi) {
  const shenList = ['青龙', '明堂', '天刑', '朱雀', '金匮', '宝光',
    '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
  // 月建日起青龙，顺数
  const monthIdx = DI_ZHI.indexOf(monthZhi);
  const dayIdx = DI_ZHI.indexOf(dayZhi);
  const offset = (dayIdx - monthIdx + 12) % 12;
  // 注意：传统黄历中十二建星的排法有多种
  // 简化版：以月建日起建，依次为建除满平定执破危成收开闭
  // 这里用黄道黑道十二神，从月建起青龙
  return shenList[offset];
}

/**
 * 建除十二神（简化备用）
 */
function getJianChu(monthZhi, dayZhi) {
  const jianChuList = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
  const monthIdx = DI_ZHI.indexOf(monthZhi);
  const dayIdx = DI_ZHI.indexOf(dayZhi);
  const offset = (dayIdx - monthIdx + 12) % 12;
  return jianChuList[offset];
}

/**
 * 获取地支五行
 */
function getZhiWuxing(zhi) {
  const map = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
  };
  return map[zhi] || '';
}

/**
 * 获取季节当旺五行
 */
function getSeasonWangxing(monthZhi) {
  // 寅卯辰春木旺，巳午未夏火旺，申酉戌秋金旺，亥子丑冬水旺
  const spring = ['寅', '卯', '辰'];
  const summer = ['巳', '午', '未'];
  const autumn = ['申', '酉', '戌'];
  const winter = ['亥', '子', '丑'];
  if (spring.includes(monthZhi)) return '木';
  if (summer.includes(monthZhi)) return '火';
  if (autumn.includes(monthZhi)) return '金';
  if (winter.includes(monthZhi)) return '水';
  return '';
}

// 获取今日黄历
export function getHuangli(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day);
  const dayPillar = getDayPillar(year, month, day);
  
  const dayZhi = dayPillar.zhi;
  const dayGan = dayPillar.gan;
  
  // 生肖冲煞
  const chong = SHENGXIAO_CHONG[dayZhi];
  
  // 彭祖百忌
  const pengzu = PENG_ZU_BAI_JI[dayGan] + '，' + PENG_ZU_BAI_JI[dayZhi];
  
  // 宜忌
  const yiji = DAILY_YI_JI[dayZhi];
  
  // 二十八宿（简化计算）
  const baseDate = new Date(2024, 0, 1); // 2024年1月1日为基准
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const xiuIndex = ((diffDays % 28) + 28) % 28;
  const ershibaxiu = ER_SHI_BA_XIU[xiuIndex];
  
  // 吉神凶煞（基于日干支、月支计算）
  const monthZhi = monthPillar.zhi;
  const jishen = calculateJiShen(dayGan, dayZhi, monthZhi);
  const xiongsha = calculateXiongSha(dayGan, dayZhi, monthZhi);
  
  // 农历日期（简化版，实际需要万年历库）
  const lunarDate = getSimpleLunarDate(year, month, day);
  
  // 星期
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[date.getDay()];
  
  // 节气（简化）
  const solarTerms = getSolarTerm(year, month, day);
  
  return {
    date: `${year}年${month}月${day}日`,
    weekDay: `星期${weekDay}`,
    lunarDate,
    solarTerms,
    yearPillar: yearPillar.gan + yearPillar.zhi,
    monthPillar: monthPillar.gan + monthPillar.zhi,
    dayPillar: dayPillar.gan + dayPillar.zhi,
    shengXiao: SHENG_XIAO[(year - 4) % 12],
    chong: `冲${chong}`,
    sha: `煞${getShaFang(dayZhi)}`,
    pengzu,
    yi: yiji.yi,
    ji: yiji.ji,
    ershibaxiu,
    jishen,
    xiongsha,
    wuxing: getDayWuxing(dayPillar),
    naryin: getDayNayin(dayPillar),
  };
}

// 简化农历日期
function getSimpleLunarDate(year, month, day) {
  // 简化版，实际需要复杂的农历算法
  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
  
  // 简化计算，仅作展示用
  const lunarMonth = lunarMonths[(month - 1 + 12) % 12];
  const lunarDay = lunarDays[(day - 1 + 30) % 30];
  
  return `农历${lunarMonth}月${lunarDay}`;
}

// 节气（简化）
function getSolarTerm(year, month, day) {
  const terms = [
    { name: '小寒', month: 1, day: 5 },
    { name: '大寒', month: 1, day: 20 },
    { name: '立春', month: 2, day: 4 },
    { name: '雨水', month: 2, day: 19 },
    { name: '惊蛰', month: 3, day: 6 },
    { name: '春分', month: 3, day: 21 },
    { name: '清明', month: 4, day: 5 },
    { name: '谷雨', month: 4, day: 20 },
    { name: '立夏', month: 5, day: 6 },
    { name: '小满', month: 5, day: 21 },
    { name: '芒种', month: 6, day: 6 },
    { name: '夏至', month: 6, day: 21 },
    { name: '小暑', month: 7, day: 7 },
    { name: '大暑', month: 7, day: 23 },
    { name: '立秋', month: 8, day: 8 },
    { name: '处暑', month: 8, day: 23 },
    { name: '白露', month: 9, day: 8 },
    { name: '秋分', month: 9, day: 23 },
    { name: '寒露', month: 10, day: 8 },
    { name: '霜降', month: 10, day: 24 },
    { name: '立冬', month: 11, day: 7 },
    { name: '小雪', month: 11, day: 22 },
    { name: '大雪', month: 12, day: 7 },
    { name: '冬至', month: 12, day: 22 },
  ];
  
  const term = terms.find(t => t.month === month && Math.abs(t.day - day) <= 1);
  return term ? term.name : null;
}

// 煞方
function getShaFang(zhi) {
  const shaMap = {
    '子': '南', '丑': '东', '寅': '北', '卯': '西',
    '辰': '南', '巳': '东', '午': '北', '未': '西',
    '申': '南', '酉': '东', '戌': '北', '亥': '西'
  };
  return shaMap[zhi] || '';
}

// 日五行
function getDayWuxing(dayPillar) {
  const wuxingMap = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };
  return wuxingMap[dayPillar.gan] || '';
}

// 纳音（简化）
function getDayNayin(dayPillar) {
  const nayinMap = {
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
  return nayinMap[dayPillar.gan + dayPillar.zhi] || '';
}
