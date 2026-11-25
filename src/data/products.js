// 产品套餐数据

export const MEMBERSHIP_PLANS = [
  {
    id: 'monthly',
    name: '月度全站会员',
    price: 28,
    period: '30天',
    tag: '大众基础款',
    tagColor: 'gold',
    features: [
      '解锁全站八字AI测算工具',
      '无人数限制，可测算多位亲友、家人命盘',
      '八字深度全套解析（格局划分、喜用神推导、十年大运、流年吉凶、刑冲合害）',
      '高阶术数工具（刑冲合害、神煞分析）',
      '无限保存命盘档案，永久存储',
      '所有测算报告一键生成PDF下载'
    ],
    limitations: [
      '无精准时辰反推权限'
    ]
  },
  {
    id: 'quarterly',
    name: '季度全站会员',
    price: 68,
    period: '90天',
    tag: '高性价比',
    tagColor: 'green',
    features: [
      '包含月度会员全部权益',
      '额外赠送：1次时辰反推机会',
      '专属客服优先服务',
      '免费获取最新命理报告'
    ],
    limitations: []
  },
  {
    id: 'yearly',
    name: '整年全站会员',
    price: 228,
    period: '365天',
    tag: '超值推荐',
    tagColor: 'purple',
    popular: true,
    features: [
      '包含季度会员全部权益',
      '全年5次时辰反推',
      '专属命理顾问1V1答疑',
      '每月免费获取深度运势报告',
      '优先体验新功能'
    ],
    limitations: []
  }
];

export const CORE_PRODUCTS = [
  {
    id: 'shichen-fantui',
    name: '时辰精准反推',
    price: 68,
    type: 'single',
    tag: '全网独家',
    tagColor: 'red',
    description: '30道分层大题校正生辰，推算精准到出生分钟',
    features: [
      '30道分层大题系统校正',
      '人生重大事件匹配（10题）',
      '性格五官身体特征（10题）',
      '六亲缘分验证（10题）',
      'AI算法遍历十二时辰',
      '输出精准到5分钟区间',
      '生成专属校正报告'
    ],
    notice: '本套餐仅包含2次完整测算机会，次数用完需重新购买',
    binding: '永久绑定1个人，不可换人、不可代算'
  }
];

// VIP专属功能
export const VIP_FEATURES = [
  {
    id: 'bazi-shenpi',
    name: '八字终身详批',
    icon: 'BookOpen',
    category: '八字命理'
  },
  {
    id: 'dayun-liunian',
    name: '大运流年',
    icon: 'TrendingUp',
    category: '八字命理'
  },
  {
    id: 'geju-fenxi',
    name: '格局分析',
    icon: 'Star',
    category: '八字命理'
  },
  {
    id: 'shensha-fenxi',
    name: '神煞分析',
    icon: 'Compass',
    category: '八字命理'
  },
  {
    id: 'xingchong-hehai',
    name: '刑冲合害',
    icon: 'Flower2',
    category: '八字命理'
  }
];
