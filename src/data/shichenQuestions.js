// 时辰反推30道题目数据（基于五行/十神命理映射）
// 结构：问题 + 选项 + 命理映射（五行 / 十神 / 强弱）
// 算法：用户问卷 → 特征向量 → 与12时辰命盘特征向量做相似度计算

export const SHICHEN_QUESTIONS = {
  // 🧠 A. 性格维度（1-10题）
  personality: [
    {
      id: 1,
      question: '你更接近哪种性格？',
      options: [
        { value: 'A', label: '外向主动', mapping: { elements: { '火': 1 }, gods: { '食伤': 1 } } },
        { value: 'B', label: '内向理性', mapping: { elements: { '水': 1 }, gods: { '印': 1 } } },
        { value: 'C', label: '稳重踏实', mapping: { elements: { '土': 1 }, gods: { '比劫': 1 } } },
        { value: 'D', label: '果断直接', mapping: { elements: { '金': 1 }, gods: { '官杀': 1 } } }
      ]
    },
    {
      id: 2,
      question: '做决定时你更依赖：',
      options: [
        { value: 'A', label: '直觉', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '逻辑', mapping: { elements: { '金': 1, '水': 1 } } },
        { value: 'C', label: '经验', mapping: { elements: { '土': 1 } } },
        { value: 'D', label: '情绪', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 3,
      question: '别人评价你更像：',
      options: [
        { value: 'A', label: '热情', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '冷静', mapping: { elements: { '水': 1 } } },
        { value: 'C', label: '固执', mapping: { elements: { '土': 1 } } },
        { value: 'D', label: '敏感', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 4,
      question: '你更容易：',
      options: [
        { value: 'A', label: '冲动行动', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '反复思考', mapping: { elements: { '水': 1 } } },
        { value: 'C', label: '稳步推进', mapping: { elements: { '土': 1 } } },
        { value: 'D', label: '情绪波动', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 5,
      question: '你在团队中更像：',
      options: [
        { value: 'A', label: '表达者', mapping: { gods: { '食伤': 1 } } },
        { value: 'B', label: '执行者', mapping: { gods: { '官杀': 1 } } },
        { value: 'C', label: '协调者', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '资源整合', mapping: { gods: { '财星': 1 } } }
      ]
    },
    {
      id: 6,
      question: '面对压力你会：',
      options: [
        { value: 'A', label: '反击', mapping: { elements: { '金': 1 } } },
        { value: 'B', label: '逃避', mapping: { elements: { '水': 1 } } },
        { value: 'C', label: '扛住', mapping: { elements: { '土': 1 } } },
        { value: 'D', label: '情绪化', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 7,
      question: '你更看重：',
      options: [
        { value: 'A', label: '自由', mapping: { gods: { '食伤': 1 } } },
        { value: 'B', label: '稳定', mapping: { gods: { '印': 1 } } },
        { value: 'C', label: '控制', mapping: { gods: { '官杀': 1 } } },
        { value: 'D', label: '收益', mapping: { gods: { '财': 1 } } }
      ]
    },
    {
      id: 8,
      question: '你的节奏是：',
      options: [
        { value: 'A', label: '快', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '慢', mapping: { elements: { '土': 1 } } },
        { value: 'C', label: '波动', mapping: { elements: { '水': 1 } } },
        { value: 'D', label: '有计划', mapping: { elements: { '金': 1 } } }
      ]
    },
    {
      id: 9,
      question: '你更像：',
      options: [
        { value: 'A', label: '创意型', mapping: { gods: { '食伤': 1 } } },
        { value: 'B', label: '管理型', mapping: { gods: { '官': 1 } } },
        { value: 'C', label: '学习型', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '生意型', mapping: { gods: { '财': 1 } } }
      ]
    },
    {
      id: 10,
      question: '你的人际关系：',
      options: [
        { value: 'A', label: '广', mapping: { gods: { '食伤': 1 } } },
        { value: 'B', label: '深', mapping: { gods: { '印': 1 } } },
        { value: 'C', label: '利益导向', mapping: { gods: { '财': 1 } } },
        { value: 'D', label: '有距离', mapping: { gods: { '官杀': 1 } } }
      ]
    }
  ],

  // ❤️ B. 感情维度（11-18题）
  relationship: [
    {
      id: 11,
      question: '你的恋爱经历：',
      options: [
        { value: 'A', label: '顺利', mapping: { gods: { '正官': 1, '正财': 1 } } },
        { value: 'B', label: '波折', mapping: { gods: { '七杀': 1, '劫财': 1 } } },
        { value: 'C', label: '很少', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '多但不稳定', mapping: { gods: { '食伤': 1, '桃花': 1 } } }
      ]
    },
    {
      id: 12,
      question: '你更容易：',
      options: [
        { value: 'A', label: '主动追求', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '被动等待', mapping: { elements: { '水': 1 } } },
        { value: 'C', label: '理性选择', mapping: { elements: { '金': 1 } } },
        { value: 'D', label: '情绪投入', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 13,
      question: '感情中你是：',
      options: [
        { value: 'A', label: '强势', mapping: { gods: { '官杀': 1 } } },
        { value: 'B', label: '依赖', mapping: { gods: { '印': 1 } } },
        { value: 'C', label: '独立', mapping: { gods: { '比劫': 1 } } },
        { value: 'D', label: '多变', mapping: { gods: { '食伤': 1 } } }
      ]
    },
    {
      id: 14,
      question: '是否经历过刻骨铭心的感情？',
      options: [
        { value: 'A', label: '有', mapping: { gods: { '桃花': 1 } } },
        { value: 'B', label: '没有', mapping: { gods: { '命局平': 1 } } }
      ]
    },
    {
      id: 15,
      question: '分手原因多为：',
      options: [
        { value: 'A', label: '性格冲突', mapping: { gods: { '比劫': 1 } } },
        { value: 'B', label: '现实问题', mapping: { gods: { '财': 1 } } },
        { value: 'C', label: '情绪问题', mapping: { elements: { '木': 1 } } },
        { value: 'D', label: '外部干扰', mapping: { gods: { '七杀': 1 } } }
      ]
    },
    {
      id: 16,
      question: '你的婚姻观：',
      options: [
        { value: 'A', label: '稳定第一', mapping: { gods: { '正官': 1 } } },
        { value: 'B', label: '感觉第一', mapping: { gods: { '食伤': 1 } } },
        { value: 'C', label: '条件匹配', mapping: { gods: { '财': 1 } } },
        { value: 'D', label: '顺其自然', mapping: { gods: { '印': 1 } } }
      ]
    },
    {
      id: 17,
      question: '你更容易吸引：',
      options: [
        { value: 'A', label: '强势型', mapping: { gods: { '官杀': 1 } } },
        { value: 'B', label: '温和型', mapping: { gods: { '印': 1 } } },
        { value: 'C', label: '自由型', mapping: { gods: { '食伤': 1 } } },
        { value: 'D', label: '现实型', mapping: { gods: { '财': 1 } } }
      ]
    },
    {
      id: 18,
      question: '你的感情状态：',
      options: [
        { value: 'A', label: '稳定', mapping: { gods: { '正官': 1 } } },
        { value: 'B', label: '波动', mapping: { gods: { '七杀': 1 } } },
        { value: 'C', label: '空窗', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '复杂', mapping: { gods: { '桃花': 1, '劫财': 1 } } }
      ]
    }
  ],

  // 💰 C. 财运维度（19-24题）
  wealth: [
    {
      id: 19,
      question: '你的收入来源：',
      options: [
        { value: 'A', label: '工资', mapping: { gods: { '正财': 1 } } },
        { value: 'B', label: '副业', mapping: { gods: { '偏财': 1 } } },
        { value: 'C', label: '投资', mapping: { gods: { '偏财': 1, '食伤': 1 } } },
        { value: 'D', label: '不稳定', mapping: { gods: { '财弱': 1 } } }
      ]
    },
    {
      id: 20,
      question: '是否经历过大起大落？',
      options: [
        { value: 'A', label: '是', mapping: { gods: { '偏财': 1, '七杀': 1 } } },
        { value: 'B', label: '否', mapping: { gods: { '正财': 1 } } }
      ]
    },
    {
      id: 21,
      question: '你的花钱习惯：',
      options: [
        { value: 'A', label: '冲动', mapping: { elements: { '火': 1 } } },
        { value: 'B', label: '规划', mapping: { elements: { '金': 1 } } },
        { value: 'C', label: '保守', mapping: { elements: { '土': 1 } } },
        { value: 'D', label: '情绪消费', mapping: { elements: { '木': 1 } } }
      ]
    },
    {
      id: 22,
      question: '你的赚钱方式：',
      options: [
        { value: 'A', label: '稳定积累', mapping: { gods: { '正财': 1 } } },
        { value: 'B', label: '抓机会', mapping: { gods: { '偏财': 1 } } },
        { value: 'C', label: '靠能力', mapping: { gods: { '食伤': 1 } } },
        { value: 'D', label: '靠资源', mapping: { gods: { '官印': 1 } } }
      ]
    },
    {
      id: 23,
      question: '你是否存得住钱？',
      options: [
        { value: 'A', label: '能', mapping: { gods: { '财库': 1 } } },
        { value: 'B', label: '不能', mapping: { gods: { '比劫': 1 } } }
      ]
    },
    {
      id: 24,
      question: '你的财运整体：',
      options: [
        { value: 'A', label: '稳', mapping: { gods: { '正财': 1 } } },
        { value: 'B', label: '波动', mapping: { gods: { '偏财': 1 } } },
        { value: 'C', label: '弱', mapping: { gods: { '无财': 1 } } },
        { value: 'D', label: '偶尔爆发', mapping: { gods: { '食伤生财': 1 } } }
      ]
    }
  ],

  // 📈 D. 事业维度（25-30题）
  career: [
    {
      id: 25,
      question: '你的职业状态：',
      options: [
        { value: 'A', label: '稳定', mapping: { gods: { '官印': 1 } } },
        { value: 'B', label: '多变', mapping: { gods: { '食伤': 1 } } },
        { value: 'C', label: '自主', mapping: { gods: { '比劫': 1 } } },
        { value: 'D', label: '被动', mapping: { gods: { '印': 1 } } }
      ]
    },
    {
      id: 26,
      question: '是否创业？',
      options: [
        { value: 'A', label: '是', mapping: { gods: { '比劫': 1, '食伤': 1 } } },
        { value: 'B', label: '否', mapping: { gods: { '官印': 1 } } }
      ]
    },
    {
      id: 27,
      question: '你的职场表现：',
      options: [
        { value: 'A', label: '晋升快', mapping: { gods: { '官': 1 } } },
        { value: 'B', label: '技术强', mapping: { gods: { '食伤': 1 } } },
        { value: 'C', label: '学习强', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '关系强', mapping: { gods: { '财': 1 } } }
      ]
    },
    {
      id: 28,
      question: '你的工作风格：',
      options: [
        { value: 'A', label: '规则导向', mapping: { gods: { '官': 1 } } },
        { value: 'B', label: '灵活', mapping: { gods: { '食伤': 1 } } },
        { value: 'C', label: '稳定', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '利益导向', mapping: { gods: { '财': 1 } } }
      ]
    },
    {
      id: 29,
      question: '遇到瓶颈你会：',
      options: [
        { value: 'A', label: '硬扛', mapping: { elements: { '土': 1 } } },
        { value: 'B', label: '换方向', mapping: { elements: { '木': 1 } } },
        { value: 'C', label: '分析', mapping: { elements: { '金': 1 } } },
        { value: 'D', label: '情绪', mapping: { elements: { '水': 1 } } }
      ]
    },
    {
      id: 30,
      question: '你的未来倾向：',
      options: [
        { value: 'A', label: '管理', mapping: { gods: { '官': 1 } } },
        { value: 'B', label: '创作', mapping: { gods: { '食伤': 1 } } },
        { value: 'C', label: '稳定', mapping: { gods: { '印': 1 } } },
        { value: 'D', label: '商业', mapping: { gods: { '财': 1 } } }
      ]
    }
  ]
};

// 题目维度定义
export const QUESTION_DIMENSIONS = {
  personality: { name: '性格维度', idRange: [1, 10], weight: 0.30 },
  relationship: { name: '感情维度', idRange: [11, 18], weight: 0.25 },
  wealth: { name: '财运维度', idRange: [19, 24], weight: 0.25 },
  career: { name: '事业维度', idRange: [25, 30], weight: 0.20 }
};

// 获取全部题目（按顺序排列）
export function getAllQuestions() {
  return [
    ...SHICHEN_QUESTIONS.personality,
    ...SHICHEN_QUESTIONS.relationship,
    ...SHICHEN_QUESTIONS.wealth,
    ...SHICHEN_QUESTIONS.career
  ];
}

// 十二时辰对应时间
export const SHICHEN_TIME = {
  '子': '23:00 - 01:00',
  '丑': '01:00 - 03:00',
  '寅': '03:00 - 05:00',
  '卯': '05:00 - 07:00',
  '辰': '07:00 - 09:00',
  '巳': '09:00 - 11:00',
  '午': '11:00 - 13:00',
  '未': '13:00 - 15:00',
  '申': '15:00 - 17:00',
  '酉': '17:00 - 19:00',
  '戌': '19:00 - 21:00',
  '亥': '21:00 - 23:00'
};

// 十二时辰五行属性
export const SHICHEN_ELEMENTS = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};
