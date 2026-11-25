// 合婚配对系统核心数据
// 包含：生肖配对、八字合婚计算、合婚知识、星座配对

// ========== 十二生肖基础数据 ==========
const SHENGXIAO_LIST = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 生肖五行属性
const SHENGXIAO_WUXING = {
  '鼠': '水', '牛': '土', '虎': '木', '兔': '木',
  '龙': '土', '蛇': '火', '马': '火', '羊': '土',
  '猴': '金', '鸡': '金', '狗': '土', '猪': '水'
};

// 生肖性格特征
const SHENGXIAO_CHARACTER = {
  '鼠': '机敏聪慧，善于交际，适应力强，感情细腻但略显多疑',
  '牛': '踏实稳重，勤劳坚韧，责任心强，性格偏内向固执',
  '虎': '勇敢自信，热情豪放，有领导力，占有欲较强',
  '兔': '温柔善良，体贴入微，追求和平，稍显优柔寡断',
  '龙': '志向高远，才华横溢，自信大气，有时过于强势',
  '蛇': '聪明睿智，心思缜密，直觉敏锐，略显神秘冷漠',
  '马': '热情奔放，自由洒脱，行动力强，缺乏耐心',
  '羊': '温顺善良，富有同情心，艺术气质浓，依赖性较强',
  '猴': '机智灵活，幽默风趣，创造力强，不够专注',
  '鸡': '勤劳认真，追求完美，责任心强，有时爱挑剔',
  '狗': '忠诚正直，责任感强，重情重义，略显悲观',
  '猪': '宽厚仁慈，乐观豁达，重感情，有时过于随性'
};

// ========== 生肖配对关系定义 ==========
// 六合（最吉）：鼠牛、虎猪、兔狗、龙鸡、蛇猴、马羊
const LIUHE_PAIRS = [
  ['鼠', '牛'], ['虎', '猪'], ['兔', '狗'],
  ['龙', '鸡'], ['蛇', '猴'], ['马', '羊']
];

// 三合（吉）：鼠龙猴、牛蛇鸡、虎马狗、兔羊猪
const SANHE_GROUPS = [
  ['鼠', '龙', '猴'],
  ['牛', '蛇', '鸡'],
  ['虎', '马', '狗'],
  ['兔', '羊', '猪']
];

// 相冲（凶）：鼠马、牛羊、虎猴、兔鸡、龙狗、蛇猪
const XIANGCHONG_PAIRS = [
  ['鼠', '马'], ['牛', '羊'], ['虎', '猴'],
  ['兔', '鸡'], ['龙', '狗'], ['蛇', '猪']
];

// 相害（次凶）：鼠羊、牛马、虎蛇、兔龙、猴猪、鸡狗
const XIANGHAI_PAIRS = [
  ['鼠', '羊'], ['牛', '马'], ['虎', '蛇'],
  ['兔', '龙'], ['猴', '猪'], ['鸡', '狗']
];

// 相刑（凶）：鼠兔、牛羊狗、虎蛇猴、龙马鸡猪
const XIANGXING_GROUPS = [
  ['鼠', '兔'],
  ['牛', '羊', '狗'],
  ['虎', '蛇', '猴'],
  ['龙', '马', '鸡', '猪']
];

// ========== 配对内容模板 ==========
// 六合配对描述（最吉）
const LIUHE_DESCRIPTIONS = {
  '鼠-牛': '鼠牛六合，乃天作之合。鼠的机敏与牛的稳重相得益彰，一静一动，一智一勤，互为补充，婚姻美满幸福。',
  '虎-猪': '虎猪六合，情义深厚。虎的豪迈与猪的宽厚相互吸引，虎能保护猪，猪能包容虎，是相互扶持的佳偶。',
  '兔-狗': '兔狗六合，情深意长。兔的温柔与狗的忠诚完美契合，双方都重视家庭，感情稳定长久，令人羡慕。',
  '龙-鸡': '龙鸡六合，龙凤呈祥。龙的大气与鸡的精明相互成就，事业上能共同发展，生活中互相欣赏，是富贵之配。',
  '蛇-猴': '蛇猴六合，智慧之配。蛇的沉稳与猴的灵动互补，两人都聪明过人，在思想上能产生共鸣，是心灵相通的伴侣。',
  '马-羊': '马羊六合，温馨之配。马的热情与羊的温柔相互温暖，生活充满浪漫与甜蜜，是令人称羡的神仙眷侣。'
};

const LIUHE_ADVANTAGES = {
  '鼠-牛': ['性格互补，一动一静', '生活默契度高', '事业家庭双丰收', '感情基础牢固'],
  '虎-猪': ['互相欣赏包容', '生活充满激情', '彼此信任忠诚', '共同成长进步'],
  '兔-狗': ['家庭观念一致', '感情忠贞不渝', '相处和谐融洽', '生活品质较高'],
  '龙-鸡': ['事业相互扶持', '精神层面契合', '生活追求一致', '财运亨通旺盛'],
  '蛇-猴': ['智力水平相当', '沟通顺畅无阻', '生活情趣相投', '解决问题能力强'],
  '马-羊': ['浪漫温情脉脉', '性格互补和谐', '生活充满阳光', '感情日益深厚']
};

const LIUHE_DISADVANTAGES = {
  '鼠-牛': ['牛过于固执时鼠会感到压抑', '鼠的多变让牛缺乏安全感'],
  '虎-猪': ['虎的强势可能让猪感到压力', '猪的随性有时让虎不满'],
  '兔-狗': ['双方都过于敏感多虑', '生活中缺乏激情和变化'],
  '龙-鸡': ['两人都争强好胜易起争执', '龙的理想主义与鸡的现实有冲突'],
  '蛇-猴': ['都过于聪明容易互相算计', '蛇的冷淡让猴感到不安'],
  '马-羊': ['马的自由让羊缺乏安全感', '羊的依赖让马感到束缚']
};

const LIUHE_SUGGESTIONS = {
  '鼠-牛': '建议多给彼此空间，鼠要理解牛的踏实，牛要欣赏鼠的灵活。遇事多商量，不要固执己见。',
  '虎-猪': '虎要注意控制自己的脾气，猪要学会表达自己的想法。互相尊重对方的生活方式。',
  '兔-狗': '培养共同的兴趣爱好，增加生活的情趣。遇到问题要坦诚沟通，不要藏在心里。',
  '龙-鸡': '学会欣赏对方的优点，放下争强好胜的心。在家里不要讲道理，要讲感情。',
  '蛇-猴': '以诚相待，不要在感情中耍小聪明。蛇要多表达感情，猴要多给蛇安全感。',
  '马-羊': '马要多顾及羊的感受，羊要培养自己的独立性。一起规划未来，增强彼此的归属感。'
};

// 三合配对描述（吉）
const SANHE_DESCRIPTIONS = {
  '鼠-龙': '鼠龙三合，智慧之合。鼠的机敏与龙的大气相结合，在事业和生活中都能相互扶持，共同进步。',
  '鼠-猴': '鼠猴三合，聪明之配。两人都机智过人，思维活跃，生活充满乐趣，是令人羡慕的智慧伴侣。',
  '龙-猴': '龙猴三合，贵人之配。龙的格局与猴的灵活相得益彰，事业上能大展宏图，感情也十分融洽。',
  '牛-蛇': '牛蛇三合，沉稳之配。牛的踏实与蛇的智谋相结合，生活井井有条，财富稳步积累。',
  '牛-鸡': '牛鸡三合，勤劳之配。两人都勤奋踏实，责任心强，家庭经营得有声有色，是典型的模范夫妻。',
  '蛇-鸡': '蛇鸡三合，谋略之配。蛇的智慧与鸡的精明相互配合，在投资理财方面颇有天赋，生活富足。',
  '虎-马': '虎马三合，热情之配。两人都充满活力和激情，生活丰富多彩，是一对令人艳羡的活力夫妻。',
  '虎-狗': '虎狗三合，忠义之配。虎的担当与狗的忠诚相互吸引，感情深厚稳固，能同甘共苦。',
  '马-狗': '马狗三合，真诚之配。两人都重情重义，坦诚相待，生活中相互支持，感情历久弥新。',
  '兔-羊': '兔羊三合，温柔之配。两人性格都温和善良，生活充满温馨，家庭氛围和谐美好。',
  '兔-猪': '兔猪三合，和美之配。兔的细腻与猪的宽厚相互包容，生活无忧无虑，感情甜蜜幸福。',
  '羊-猪': '羊猪三合，善良之配。两人都心地善良，富有同情心，生活中相互体贴，感情真挚深厚。'
};

const SANHE_ADVANTAGES = {
  '鼠-龙': ['思维方式相近', '事业上能互助', '生活情趣相投', '沟通顺畅自然'],
  '鼠-猴': ['都聪明机智', '生活充满乐趣', '学习能力强', '适应变化快'],
  '龙-猴': ['事业运旺盛', '互相成就对方', '眼界格局开阔', '贵人运旺盛'],
  '牛-蛇': ['做事踏实稳健', '理财能力出色', '生活井然有序', '感情细水长流'],
  '牛-鸡': ['都勤劳肯干', '家庭责任感强', '生活规划清晰', '财富积累快'],
  '蛇-鸡': ['心思细腻缜密', '理财眼光独到', '生活品质较高', '审美品味相似'],
  '虎-马': ['充满活力激情', '生活丰富多彩', '行动力超强', '共同语言多'],
  '虎-狗': ['都重情重义', '能同甘共苦', '彼此信任忠诚', '生活有安全感'],
  '马-狗': ['性格真诚坦率', '沟通没有障碍', '相互支持鼓励', '生活积极向上'],
  '兔-羊': ['性格温和体贴', '家庭氛围温馨', '艺术品味相近', '感情细腻深厚'],
  '兔-猪': ['都心地善良', '互相包容理解', '生活无忧无虑', '感情甜蜜温馨'],
  '羊-猪': ['都富有同情心', '待人真诚友善', '生活安逸舒适', '感情真挚纯粹']
};

const SANHE_DISADVANTAGES = {
  '鼠-龙': ['龙有时过于强势', '鼠容易缺乏安全感'],
  '鼠-猴': ['都不够沉稳', '容易三心二意'],
  '龙-猴': ['都比较自我', '缺乏耐心和坚持'],
  '牛-蛇': ['都偏内向', '沟通不够主动'],
  '牛-鸡': ['都比较固执', '生活缺少浪漫'],
  '蛇-鸡': ['都爱挑剔', '容易因小事起争执'],
  '虎-马': ['都比较冲动', '容易因小事争吵'],
  '虎-狗': ['虎过于强势', '狗过于忍让'],
  '马-狗': ['马的不安分', '狗的占有欲强'],
  '兔-羊': ['都偏软弱', '遇到困难易退缩'],
  '兔-猪': ['都缺乏主见', '容易随波逐流'],
  '羊-猪': ['都比较懒散', '缺乏进取心']
};

const SANHE_SUGGESTIONS = {
  '鼠-龙': '龙要多倾听鼠的意见，鼠要增强自信心。互相尊重，共同决策。',
  '鼠-猴': '做事要有始有终，培养专注力。对感情要专一，不要朝三暮四。',
  '龙-猴': '学会换位思考，多为对方着想。脚踏实地，不要好高骛远。',
  '牛-蛇': '主动表达感情，增加生活情趣。有话直说，不要闷在心里。',
  '牛-鸡': '偶尔制造浪漫，给生活加点料。学会妥协，不要钻牛角尖。',
  '蛇-鸡': '多看对方优点，少挑剔。学会包容，人无完人。',
  '虎-马': '遇事冷静处理，不要冲动。学会控制情绪，互相谦让。',
  '虎-狗': '虎要温柔一些，狗要勇敢表达。平等相处，互相尊重。',
  '马-狗': '马要给狗安全感，狗要给马自由空间。相互信任是感情的基石。',
  '兔-羊': '遇到困难要共同面对，不要逃避。增强独立性，互相扶持成长。',
  '兔-猪': '一起制定目标和计划，增加生活方向感。培养积极向上的生活态度。',
  '羊-猪': '树立共同的奋斗目标，互相激励进步。勤劳一些，生活会更美好。'
};

// 相冲配对描述（凶）
const XIANGCHONG_DESCRIPTIONS = {
  '鼠-马': '鼠马相冲，性格迥异。鼠的谨慎与马的奔放形成强烈反差，生活中容易产生摩擦和冲突，需要双方付出更多努力来磨合。',
  '牛-羊': '牛羊相冲，观念不同。牛的固执与羊的善变难以调和，在家庭规划和生活方式上容易产生分歧，需要相互理解包容。',
  '虎-猴': '虎猴相冲，互不相让。虎的强势与猴的反叛针锋相对，生活中充满较量和挑战，是一对欢喜冤家。',
  '兔-鸡': '兔鸡相冲，性格冲突。兔的温和与鸡的犀利形成对比，兔容易受伤，鸡容易不满，需要找到平衡点。',
  '龙-狗': '龙狗相冲，理念不合。龙的理想主义与狗的现实主义难以融合，在价值观和生活追求上存在差异。',
  '蛇-猪': '蛇猪相冲，差异巨大。蛇的深沉与猪的直率难以沟通，思维方式和生活态度截然不同，需要极大的包容心。'
};

const XIANGCHONG_ADVANTAGES = {
  '鼠-马': ['互补性强，能学到不同东西', '生活充满变化和挑战', '互相吸引，有新鲜感'],
  '牛-羊': ['都很善良有爱心', '生活中有许多温情时刻', '能激发对方的潜能'],
  '虎-猴': ['都很聪明有能力', '生活充满激情和刺激', '能互相激发斗志'],
  '兔-鸡': ['都有艺术天赋', '对生活品质有追求', '能互相学习优点'],
  '龙-狗': ['都有正义感', '对家庭都很负责', '能从对方身上学到东西'],
  '蛇-猪': ['都很真诚不虚伪', '生活中有意外的惊喜', '能互补对方不足']
};

const XIANGCHONG_DISADVANTAGES = {
  '鼠-马': ['生活节奏差异大', '沟通方式不同易误会', '价值观有较大分歧', '容易互相伤害'],
  '牛-羊': ['性格都很固执', '生活习惯差异大', '理财观念不同', '容易冷战'],
  '虎-猴': ['都争强好胜', '谁也不服谁', '容易发生激烈争吵', '互不信任'],
  '兔-鸡': ['性格反差太大', '兔觉得鸡太刻薄', '鸡觉得兔太软弱', '难以互相理解'],
  '龙-狗': ['理想与现实冲突', '龙觉得狗太保守', '狗觉得龙不切实际', '生活目标不同'],
  '蛇-猪': ['思维方式差异大', '沟通存在障碍', '生活追求不同', '容易互相猜疑']
};

const XIANGCHONG_SUGGESTIONS = {
  '鼠-马': '尊重差异，求同存异。鼠要学会放开，马要学会稳重。多站在对方角度思考问题。',
  '牛-羊': '学会妥协和让步，不要太固执。多沟通，了解对方的真实想法。',
  '虎-猴': '学会欣赏而不是较劲。虎要给猴自由，猴要尊重虎的权威。',
  '兔-鸡': '鸡说话要注意方式方法，兔要学会表达不满。互相包容对方的缺点。',
  '龙-狗': '龙要务实一些，狗要理解龙的梦想。一起找到理想与现实的平衡点。',
  '蛇-猪': '多花时间了解对方，增加沟通。蛇要主动表达，猪要多思考。'
};

// 相害配对描述（次凶）
const XIANGHAI_DESCRIPTIONS = {
  '鼠-羊': '鼠羊相害，暗中伤害。鼠的精明与羊的单纯形成反差，容易在不知不觉中伤害对方，需要更加用心经营感情。',
  '牛-马': '牛马相害，劳燕分飞。牛的安稳与马的不安分难以协调，马追求自由，牛渴望稳定，是一对需要磨合的组合。',
  '虎-蛇': '虎蛇相害，龙虎相斗。虎的直接与蛇的隐忍形成暗斗，表面平静实则暗流涌动，需要坦诚相待。',
  '兔-龙': '兔龙相害，云雾缭绕。兔的敏感与龙的大气难以协调，兔容易缺乏安全感，龙觉得兔小题大做。',
  '猴-猪': '猴猪相害，互相消耗。猴的精明与猪的实在形成对比，容易在相处中产生不平衡感。',
  '鸡-狗': '鸡狗相害，鸡犬不宁。鸡的挑剔与狗的直率容易产生摩擦，生活中争吵较多，需要互相包容。'
};

const XIANGHAI_ADVANTAGES = {
  '鼠-羊': ['都很细心体贴', '感情细腻丰富', '生活上互相照顾'],
  '牛-马': ['都很勤劳能干', '责任心强', '能一起创造美好生活'],
  '虎-蛇': ['都很有能力', '互相欣赏才华', '能共同成就事业'],
  '兔-龙': ['有很强的吸引力', '能互补性格缺陷', '生活有激情'],
  '猴-猪': ['都很乐观开朗', '生活充满欢笑', '能一起享受生活'],
  '鸡-狗': ['都很忠诚正直', '有共同的价值观', '能一起面对困难']
};

const XIANGHAI_DISADVANTAGES = {
  '鼠-羊': ['容易产生误会', '羊容易感到受伤', '鼠觉得羊太敏感', '沟通不畅'],
  '牛-马': ['生活节奏不同', '马的自由让牛不安', '牛的保守让马束缚', '追求不同'],
  '虎-蛇': ['沟通存在障碍', '虎太直接伤蛇', '蛇太隐忍憋出问题', '容易冷战'],
  '兔-龙': ['安全感问题严重', '龙的粗心伤兔心', '兔的敏感让龙累', '信任度不够'],
  '猴-猪': ['猴的精明让猪不安', '猪的实在让猴觉得闷', '价值观有差异', '容易互相抱怨'],
  '鸡-狗': ['吵架频率高', '鸡爱唠叨狗嫌烦', '狗太直鸡受伤', '都不够包容']
};

const XIANGHAI_SUGGESTIONS = {
  '鼠-羊': '多沟通多表达，不要让误会积累。鼠要更温柔，羊要更坚强。',
  '牛-马': '找到生活的平衡点，牛要学会放手，马要懂得回家。',
  '虎-蛇': '有话直说不要猜，虎要温柔一些，蛇要勇敢表达。',
  '兔-龙': '龙要多关心兔的感受，兔要给龙足够的信任和空间。',
  '猴-猪': '以诚相待，不要耍小聪明。猴要实在一些，猪要灵活一点。',
  '鸡-狗': '学会闭嘴和忍让，多看对方的优点。吵架不过夜，及时和解。'
};

// 相刑配对描述（凶）
const XIANGXING_DESCRIPTIONS = {
  '鼠-兔': '鼠兔相刑，无礼之刑。鼠的多疑与兔的敏感相互折磨，感情中容易因为小事产生隔阂，需要更多的信任和包容。',
  '牛-羊': '牛羊相刑，持势之刑。牛的固执与羊的倔强互不相让，都坚持自己的立场，容易陷入冷战和僵持。',
  '牛-狗': '牛狗相刑，互不相让。牛的固执与狗的倔强相互冲突，在很多事情上难以达成一致。',
  '羊-狗': '羊狗相刑，矛盾重重。羊的柔弱与狗的刚强难以调和，生活中摩擦不断。',
  '虎-蛇': '虎蛇相刑，无恩之刑。虎的强势与蛇的记仇相互伤害，恩怨情仇纠缠不清。',
  '虎-猴': '虎猴相刑，争斗不休。虎的霸道与猴的叛逆针锋相对，谁也不服谁。',
  '蛇-猴': '蛇猴相刑，恩恩怨怨。蛇的多疑与猴的善变相互折磨，信任难以建立。',
  '龙-马': '龙马相刑，自刑之苦。都很有主见和傲气，容易因为自尊心而产生矛盾。',
  '龙-鸡': '龙鸡相刑，互不相服。都争强好胜，喜欢争对错，家庭变成战场。',
  '龙-猪': '龙猪相刑，理念不合。龙的高远与猪的安逸难以协调，生活追求差异大。',
  '马-鸡': '马鸡相刑，争吵不断。马的自由与鸡的约束相互冲突，生活难以安宁。',
  '马-猪': '马猪相刑，互相消耗。马的奔波与猪的安逸形成对比，节奏不同步。',
  '鸡-猪': '鸡猪相刑，摩擦频发。鸡的挑剔与猪的随性难以兼容。'
};

// ========== 生成生肖配对数据 ==========
function generateShengxiaoPairing() {
  const result = {};
  
  // 辅助函数：判断配对类型
  const isPair = (a, b, pairs) => {
    return pairs.some(p => (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a));
  };
  
  const isSanhe = (a, b) => {
    return SANHE_GROUPS.some(g => g.includes(a) && g.includes(b) && a !== b);
  };
  
  const isXiangxing = (a, b) => {
    return XIANGXING_GROUPS.some(g => g.includes(a) && g.includes(b) && a !== b);
  };
  
  const getPairKey = (a, b) => `${a}-${b}`;
  const getReverseKey = (a, b) => `${b}-${a}`;
  
  // 生成所有144种组合
  for (let i = 0; i < SHENGXIAO_LIST.length; i++) {
    for (let j = 0; j < SHENGXIAO_LIST.length; j++) {
      const sx1 = SHENGXIAO_LIST[i];
      const sx2 = SHENGXIAO_LIST[j];
      const key = getPairKey(sx1, sx2);
      const reverseKey = getReverseKey(sx1, sx2);
      
      if (sx1 === sx2) {
        // 同生肖配对
        result[key] = generateSameShengxiaoPair(sx1);
      } else if (isPair(sx1, sx2, LIUHE_PAIRS)) {
        // 六合
        const descKey = LIUHE_DESCRIPTIONS[key] ? key : reverseKey;
        result[key] = {
          score: 92 + Math.floor(Math.random() * 4),
          level: '上等婚配',
          type: '六合',
          description: LIUHE_DESCRIPTIONS[descKey],
          advantages: LIUHE_ADVANTAGES[descKey],
          disadvantages: LIUHE_DISADVANTAGES[descKey],
          suggestion: LIUHE_SUGGESTIONS[descKey]
        };
      } else if (isSanhe(sx1, sx2)) {
        // 三合
        const descKey = SANHE_DESCRIPTIONS[key] ? key : reverseKey;
        result[key] = {
          score: 82 + Math.floor(Math.random() * 7),
          level: '上等婚配',
          type: '三合',
          description: SANHE_DESCRIPTIONS[descKey],
          advantages: SANHE_ADVANTAGES[descKey],
          disadvantages: SANHE_DISADVANTAGES[descKey],
          suggestion: SANHE_SUGGESTIONS[descKey]
        };
      } else if (isPair(sx1, sx2, XIANGCHONG_PAIRS)) {
        // 相冲
        const descKey = XIANGCHONG_DESCRIPTIONS[key] ? key : reverseKey;
        result[key] = {
          score: 45 + Math.floor(Math.random() * 11),
          level: '下等婚配',
          type: '相冲',
          description: XIANGCHONG_DESCRIPTIONS[descKey],
          advantages: XIANGCHONG_ADVANTAGES[descKey],
          disadvantages: XIANGCHONG_DISADVANTAGES[descKey],
          suggestion: XIANGCHONG_SUGGESTIONS[descKey]
        };
      } else if (isPair(sx1, sx2, XIANGHAI_PAIRS)) {
        // 相害
        const descKey = XIANGHAI_DESCRIPTIONS[key] ? key : reverseKey;
        result[key] = {
          score: 53 + Math.floor(Math.random() * 8),
          level: '下等婚配',
          type: '相害',
          description: XIANGHAI_DESCRIPTIONS[descKey],
          advantages: XIANGHAI_ADVANTAGES[descKey],
          disadvantages: XIANGHAI_DISADVANTAGES[descKey],
          suggestion: XIANGHAI_SUGGESTIONS[descKey]
        };
      } else if (isXiangxing(sx1, sx2)) {
        // 相刑
        const descKey = XIANGXING_DESCRIPTIONS[key] ? key : reverseKey;
        result[key] = generateXiangxingPair(sx1, sx2, descKey);
      } else {
        // 普通配对
        result[key] = generateNormalPair(sx1, sx2);
      }
    }
  }
  
  return result;
}

// 同生肖配对
function generateSameShengxiaoPair(sx) {
  const char = SHENGXIAO_CHARACTER[sx];
  const wx = SHENGXIAO_WUXING[sx];
  
  const samePairData = {
    '鼠': {
      score: 78, level: '中等婚配',
      description: '双鼠配对，聪慧机敏。两人都聪明灵活，善于交际，生活中默契十足，但也容易因为都太精明而互相算计，需要以诚相待。',
      advantages: ['性格相似，默契度高', '都很聪明，沟通顺畅', '生活有情趣', '适应能力强'],
      disadvantages: ['都缺乏安全感', '容易互相猜疑', '不够踏实稳定', '花钱都大手大脚'],
      suggestion: '建立信任是关键，不要在感情中耍小聪明。多一些真诚，少一些算计。共同规划未来，增强安全感。'
    },
    '牛': {
      score: 80, level: '中等婚配',
      description: '双牛配对，踏实稳固。两人都勤劳肯干，责任心强，家庭基础牢固，但生活可能略显平淡，需要增添情趣。',
      advantages: ['价值观一致', '都很有责任感', '生活稳定踏实', '能共同积累财富'],
      disadvantages: ['都太固执', '生活缺乏浪漫', '沟通不够主动', '容易冷战'],
      suggestion: '学会变通和妥协，偶尔制造一些浪漫惊喜。有话直说，不要闷在心里生闷气。'
    },
    '虎': {
      score: 68, level: '中等婚配',
      description: '双虎配对，强强联合。两人都强势有主见，生活充满激情，但也容易因为都不让步而产生激烈冲突。',
      advantages: ['都很有能力', '生活充满激情', '有共同的目标', '能互相激励'],
      disadvantages: ['都争强好胜', '容易发生争吵', '谁也不服谁', '控制欲都很强'],
      suggestion: '学会示弱和妥协，家里不是战场。多一些温柔和体贴，互相尊重对方的空间。'
    },
    '兔': {
      score: 76, level: '中等婚配',
      description: '双兔配对，温馨和谐。两人都温柔善良，体贴入微，生活充满温情，但也可能因为都太敏感而容易受伤。',
      advantages: ['性格温和体贴', '生活温馨浪漫', '都很细心', '感情细腻深厚'],
      disadvantages: ['都太敏感', '容易想太多', '缺乏主见', '遇到困难易退缩'],
      suggestion: '增强自信和独立性，不要过度依赖对方。有话直说，不要让对方猜心思。'
    },
    '龙': {
      score: 72, level: '中等婚配',
      description: '双龙配对，志存高远。两人都有远大志向和出色能力，事业上能相互成就，但家庭生活可能缺少烟火气。',
      advantages: ['都很优秀有能力', '有共同的理想追求', '能互相成就', '格局大眼界宽'],
      disadvantages: ['都比较自我', '容易争高低', '不够接地气', '家庭生活平淡'],
      suggestion: '在外面可以是龙，在家里要做回普通人。多关心家庭生活，平衡事业与感情。'
    },
    '蛇': {
      score: 70, level: '中等婚配',
      description: '双蛇配对，智计百出。两人都聪明睿智，心思缜密，但也容易因为都太深沉而产生猜疑和隔阂。',
      advantages: ['都很聪明智慧', '心思细腻缜密', '审美品味高', '精神交流丰富'],
      disadvantages: ['都爱猜心思', '不够坦诚', '容易记仇', '冷战时间长'],
      suggestion: '多一些坦诚和直接，少一些猜疑和试探。学会放下，不要把小事放在心上。'
    },
    '马': {
      score: 65, level: '中等婚配',
      description: '双马配对，自由奔放。两人都热爱自由，充满活力，生活丰富多彩，但都不安于室，家庭稳定性不足。',
      advantages: ['都充满活力', '生活丰富多彩', '有共同爱好', '性格开朗乐观'],
      disadvantages: ['都追求自由', '家庭观念薄弱', '缺乏耐心', '容易冲动'],
      suggestion: '增强家庭责任感，给对方自由也要给自己约束。一起成长，共同经营家庭。'
    },
    '羊': {
      score: 74, level: '中等婚配',
      description: '双羊配对，温情脉脉。两人都温柔善良，富有同情心，生活充满爱和温暖，但也可能因为都太软弱而难以面对困难。',
      advantages: ['都很善良有爱心', '感情真挚纯粹', '生活温馨', '艺术品味相似'],
      disadvantages: ['都比较软弱', '缺乏主见', '容易悲观', '抗压能力弱'],
      suggestion: '培养坚强独立的品格，一起面对生活的困难。互相鼓励，共同成长。'
    },
    '猴': {
      score: 73, level: '中等婚配',
      description: '双猴配对，欢乐多多。两人都机智幽默，生活充满笑声，但也容易因为都爱玩而不够踏实。',
      advantages: ['都聪明有趣', '生活充满欢乐', '学习能力强', '适应变化快'],
      disadvantages: ['都不够踏实', '容易三心二意', '耐心不足', '花钱大手大脚'],
      suggestion: '对感情要专一负责，不要朝三暮四。一起制定生活目标，增加稳定感。'
    },
    '鸡': {
      score: 71, level: '中等婚配',
      description: '双鸡配对，井井有条。两人都勤劳认真，追求完美，生活安排得有条不紊，但也容易因为都爱挑剔而产生矛盾。',
      advantages: ['都勤劳认真', '生活有条理', '责任心强', '注重生活品质'],
      disadvantages: ['都爱挑剔', '追求完美累人', '容易唠叨', '都很固执'],
      suggestion: '学会包容和欣赏，人无完人。多看对方的优点，少盯着缺点不放。'
    },
    '狗': {
      score: 77, level: '中等婚配',
      description: '双狗配对，忠诚可靠。两人都重情重义，忠诚可靠，感情稳固长久，但生活可能略显沉闷。',
      advantages: ['都忠诚可靠', '感情稳固长久', '重情重义', '有责任感'],
      disadvantages: ['都比较悲观', '生活缺少情趣', '容易钻牛角尖', '不够灵活'],
      suggestion: '培养乐观积极的心态，多尝试新鲜事物。给生活增添一些变化和惊喜。'
    },
    '猪': {
      score: 79, level: '中等婚配',
      description: '双猪配对，其乐融融。两人都宽厚乐观，重感情，生活安逸幸福，但要注意不要过于懒散。',
      advantages: ['都善良宽厚', '感情真挚深厚', '生活安逸舒适', '容易满足快乐'],
      disadvantages: ['都比较懒散', '缺乏进取心', '容易发胖', '理财观念弱'],
      suggestion: '树立共同的奋斗目标，互相激励进步。合理规划财务，为未来做好准备。'
    }
  };
  
  return {
    ...samePairData[sx],
    type: '同生肖'
  };
}

// 相刑配对生成
function generateXiangxingPair(sx1, sx2, descKey) {
  const baseDesc = XIANGXING_DESCRIPTIONS[descKey] || 
    `${sx1}${sx2}相刑，相处中容易产生摩擦和矛盾，需要双方共同努力经营感情，互相包容理解。`;
  
  return {
    score: 48 + Math.floor(Math.random() * 11),
    level: '下等婚配',
    type: '相刑',
    description: baseDesc,
    advantages: [
      `都有自己的特点和优点`,
      `如果能磨合好会很有成就感`,
      `能从对方身上学到很多`
    ],
    disadvantages: [
      `性格差异大，容易产生冲突`,
      `沟通方式不同，容易产生误会`,
      `价值观存在差异`,
      `需要付出更多努力来维持感情`
    ],
    suggestion: `学会换位思考，多站在${sx2}的角度考虑问题。遇到矛盾及时沟通，不要积累怨气。互相包容，共同成长。`
  };
}

// 普通配对生成
function generateNormalPair(sx1, sx2) {
  const wx1 = SHENGXIAO_WUXING[sx1];
  const wx2 = SHENGXIAO_WUXING[sx2];
  
  // 根据五行生克调整分数
  const wuxingRelation = getWuxingRelation(wx1, wx2);
  let baseScore = 68;
  let scoreAdjust = 0;
  let relationDesc = '';
  
  if (wuxingRelation === '相生') {
    scoreAdjust = 5;
    relationDesc = `五行相生（${wx1}生${wx2}），感情基础良好`;
  } else if (wuxingRelation === '相克') {
    scoreAdjust = -5;
    relationDesc = `五行相克（${wx1}克${wx2}），需要更多磨合`;
  } else {
    relationDesc = '五行平和，感情稳定发展';
  }
  
  const score = baseScore + scoreAdjust + Math.floor(Math.random() * 6) - 3;
  
  return {
    score: Math.max(60, Math.min(78, score)),
    level: '中等婚配',
    type: '普通',
    description: `${sx1}与${sx2}的配对属于中等婚配。${SHENGXIAO_CHARACTER[sx1].split('，')[0]}的${sx1}与${SHENGXIAO_CHARACTER[sx2].split('，')[0]}的${sx2}，${relationDesc}。虽然不是天作之合，但只要用心经营，也能拥有幸福美满的婚姻。`,
    advantages: [
      `性格有差异，能互补不足`,
      `生活中有新鲜感`,
      `能互相学习成长`,
      `感情有发展空间`
    ],
    disadvantages: [
      `需要时间磨合`,
      `生活习惯可能不同`,
      `沟通需要技巧`,
      `需要更多包容理解`
    ],
    suggestion: `多了解对方的性格特点，尊重彼此的差异。${sx1}要多理解${sx2}的想法，${sx2}也要多包容${sx1}的习惯。用心经营，感情会越来越好。`
  };
}

// 五行生克关系
function getWuxingRelation(wx1, wx2) {
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  
  if (sheng[wx1] === wx2 || sheng[wx2] === wx1) return '相生';
  if (ke[wx1] === wx2 || ke[wx2] === wx1) return '相克';
  return '平和';
}

// 输出生肖配对数据
export const SHENGXIAO_PAIRING = generateShengxiaoPairing();

// ========== 八字合婚计算 ==========
// 十天干
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 十二地支
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干五行
const TIAN_GAN_WUXING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行
const DI_ZHI_WUXING = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 判断是否在立春之前
function isBeforeLiChun(month, day) {
  return month === 1 || (month === 2 && day < 4);
}

// 计算年柱（以立春为界）
function getYearPillar(year, month, day) {
  let actualYear = year;
  if (month !== undefined && day !== undefined && isBeforeLiChun(month, day)) {
    actualYear = year - 1;
  }
  const ganIndex = (actualYear - 4) % 10;
  const zhiIndex = (actualYear - 4) % 12;
  return {
    gan: TIAN_GAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
    zhi: DI_ZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
  };
}

// 月界节气表
const HEHUN_JIE_QI = [
  { month: 1, day: 6, branch: '丑' },
  { month: 2, day: 4, branch: '寅' },
  { month: 3, day: 6, branch: '卯' },
  { month: 4, day: 5, branch: '辰' },
  { month: 5, day: 6, branch: '巳' },
  { month: 6, day: 6, branch: '午' },
  { month: 7, day: 7, branch: '未' },
  { month: 8, day: 8, branch: '申' },
  { month: 9, day: 8, branch: '酉' },
  { month: 10, day: 8, branch: '戌' },
  { month: 11, day: 7, branch: '亥' },
  { month: 12, day: 7, branch: '子' },
];

function getMonthBranchByDate(month, day) {
  const dateNum = month * 100 + day;
  for (let i = HEHUN_JIE_QI.length - 1; i >= 0; i--) {
    const b = HEHUN_JIE_QI[i];
    if (dateNum >= b.month * 100 + b.day) return b.branch;
  }
  return '子';
}

// 计算月柱（以节气为界）
function getMonthPillar(year, month, day) {
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
function getDayPillar(year, month, day) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  // 1900年1月1日为甲戌日 (甲索引0，戌索引10)
  // 实际修正：1900年1月1日是甲戌日
  const baseGanIndex = 0;  // 甲
  const baseZhiIndex = 10; // 戌
  
  const ganIndex = (baseGanIndex + diffDays) % 10;
  const zhiIndex = (baseZhiIndex + diffDays) % 12;
  
  return {
    gan: TIAN_GAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
    zhi: DI_ZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
  };
}

// 计算时柱
function getHourPillar(dayGan, hour) {
  const shiChenZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const zhiIndex = Math.floor((hour + 1) / 2) % 12;
  const zhi = shiChenZhi[zhiIndex];
  
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

// 排八字
function calculateBazi(birth) {
  const { year, month, day, hour = 12 } = birth;
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(dayPillar.gan, hour);
  
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  
  // 五行统计
  const wuxingCount = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
  pillars.forEach(p => {
    wuxingCount[TIAN_GAN_WUXING[p.gan]] += 1;
    wuxingCount[DI_ZHI_WUXING[p.zhi]] += 1;
  });
  
  // 找出最旺和最弱的五行
  let maxWuxing = '金', minWuxing = '金';
  let maxCount = 0, minCount = 99;
  Object.entries(wuxingCount).forEach(([wx, count]) => {
    if (count > maxCount) { maxCount = count; maxWuxing = wx; }
    if (count < minCount) { minCount = count; minWuxing = wx; }
  });
  
  return {
    pillars,
    dayGan: dayPillar.gan,
    wuxingCount,
    maxWuxing,
    minWuxing,
    shengXiao: getShengXiao(year)
  };
}

// 获取生肖
function getShengXiao(year) {
  const shengxiao = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const index = (year - 4) % 12;
  return shengxiao[index < 0 ? index + 12 : index];
}

// 十神计算
function calculateShiShen(dayGan, otherGan) {
  const ganIndex = { '甲': 0, '乙': 1, '丙': 2, '丁': 3, '戊': 4, '己': 5, '庚': 6, '辛': 7, '壬': 8, '癸': 9 };
  const dayIdx = ganIndex[dayGan];
  const otherIdx = ganIndex[otherGan];
  
  const relation = getWuxingRelationForShishen(TIAN_GAN_WUXING[dayGan], TIAN_GAN_WUXING[otherGan]);
  const isSameYinYang = (dayIdx % 2) === (otherIdx % 2);
  
  if (relation === 'same') return isSameYinYang ? '比肩' : '劫财';
  if (relation === 'sheng') return isSameYinYang ? '食神' : '伤官';
  if (relation === 'ke') return isSameYinYang ? '偏财' : '正财';
  if (relation === 'bei-ke') return isSameYinYang ? '七杀' : '正官';
  if (relation === 'bei-sheng') return isSameYinYang ? '偏印' : '正印';
  return '';
}

function getWuxingRelationForShishen(a, b) {
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  
  if (a === b) return 'same';
  if (sheng[a] === b) return 'sheng';
  if (ke[a] === b) return 'ke';
  if (sheng[b] === a) return 'bei-sheng';
  if (ke[b] === a) return 'bei-ke';
  return '';
}

// 天干地支生克关系评分
function getTianganScore(gan1, gan2) {
  const wx1 = TIAN_GAN_WUXING[gan1];
  const wx2 = TIAN_GAN_WUXING[gan2];
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  
  // 五合
  const wuHe = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
  if (wuHe[gan1] === gan2) return 95;
  
  if (wx1 === wx2) return 75; // 比和
  if (sheng[wx1] === wx2 || sheng[wx2] === wx1) return 80; // 相生
  if (ke[wx1] === wx2 || ke[wx2] === wx1) return 55; // 相克
  return 65;
}

function getDizhiScore(zhi1, zhi2) {
  // 六合
  const liuHe = { '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午' };
  if (liuHe[zhi1] === zhi2) return 95;
  
  // 三合
  const sanHe = [
    ['申', '子', '辰'], ['亥', '卯', '未'],
    ['寅', '午', '戌'], ['巳', '酉', '丑']
  ];
  if (sanHe.some(g => g.includes(zhi1) && g.includes(zhi2))) return 85;
  
  // 相冲
  const xiangchong = { '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅', '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳' };
  if (xiangchong[zhi1] === zhi2) return 35;
  
  // 相害
  const xianghai = { '子': '未', '未': '子', '丑': '午', '午': '丑', '寅': '巳', '巳': '寅', '卯': '辰', '辰': '卯', '申': '亥', '亥': '申', '酉': '戌', '戌': '酉' };
  if (xianghai[zhi1] === zhi2) return 45;
  
  // 相刑（简化）
  const xiangxing = [
    ['子', '卯'], ['丑', '未', '戌'], ['寅', '巳', '申'],
    ['辰', '午', '酉', '亥']
  ];
  if (xiangxing.some(g => g.includes(zhi1) && g.includes(zhi2))) return 40;
  
  const wx1 = DI_ZHI_WUXING[zhi1];
  const wx2 = DI_ZHI_WUXING[zhi2];
  if (wx1 === wx2) return 70;
  
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  if (sheng[wx1] === wx2 || sheng[wx2] === wx1) return 72;
  if (ke[wx1] === wx2 || ke[wx2] === wx1) return 55;
  
  return 65;
}

// 五行互补评分
function calculateWuxingComplement(bazi1, bazi2) {
  // 一方最旺的五行如果是另一方最缺的，互补性强
  if (bazi1.maxWuxing === bazi2.minWuxing && bazi2.maxWuxing === bazi1.minWuxing) {
    return { score: 92, desc: `双方五行高度互补，${bazi1.maxWuxing}旺与${bazi2.maxWuxing}旺相互补益，阴阳平衡，是难得的五行佳配。` };
  }
  if (bazi1.maxWuxing === bazi2.minWuxing || bazi2.maxWuxing === bazi1.minWuxing) {
    return { score: 82, desc: `五行互补性较好，一方旺相五行能补另一方不足，有助于双方运势提升。` };
  }
  
  // 五行生克
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  
  if (sheng[bazi1.maxWuxing] === bazi2.maxWuxing || sheng[bazi2.maxWuxing] === bazi1.maxWuxing) {
    return { score: 75, desc: `五行相生，${bazi1.maxWuxing}与${bazi2.maxWuxing}相互生发，感情基础良好。` };
  }
  if (ke[bazi1.maxWuxing] === bazi2.maxWuxing || ke[bazi2.maxWuxing] === bazi1.maxWuxing) {
    return { score: 55, desc: `五行相克，${bazi1.maxWuxing}与${bazi2.maxWuxing}相互制约，需要更多磨合。` };
  }
  
  return { score: 68, desc: '五行基本平和，无明显生克冲突，感情发展稳定。' };
}

// 十神分析
function calculateShiShenAnalysis(bazi1, bazi2, gender1, gender2) {
  // 简化版十神分析：以双方日干为核心
  const shishen1To2 = calculateShiShen(bazi1.dayGan, bazi2.dayGan);
  const shishen2To1 = calculateShiShen(bazi2.dayGan, bazi1.dayGan);
  
  // 正官正财为吉
  const positiveShishen = ['正官', '正财', '正印', '食神'];
  const negativeShishen = ['七杀', '劫财', '伤官', '偏印'];
  
  let score = 70;
  let desc = '';
  
  if (positiveShishen.includes(shishen1To2) && positiveShishen.includes(shishen2To1)) {
    score = 88;
    desc = `双方日干十神相生相济，${gender1}方对${gender2}方为${shishen1To2}，${gender2}方对${gender1}方为${shishen2To1}，关系和谐稳定。`;
  } else if (positiveShishen.includes(shishen1To2) || positiveShishen.includes(shishen2To1)) {
    score = 76;
    desc = `十神关系有吉有凶，${gender1}方对${gender2}方为${shishen1To2}，${gender2}方对${gender1}方为${shishen2To1}，需要互相包容。`;
  } else if (negativeShishen.includes(shishen1To2) && negativeShishen.includes(shishen2To1)) {
    score = 52;
    desc = `十神关系偏凶，${gender1}方对${gender2}方为${shishen1To2}，${gender2}方对${gender1}方为${shishen2To1}，容易产生矛盾冲突。`;
  } else {
    score = 68;
    desc = `十神关系一般，${gender1}方对${gender2}方为${shishen1To2}，${gender2}方对${gender1}方为${shishen2To1}，感情需要经营。`;
  }
  
  return { score, desc };
}

// 计算各维度匹配度
function calculateDimensions(bazi1, bazi2, type) {
  const dimensions = {};
  
  // 性格匹配：看日柱天干地支关系
  const riziganScore = getTianganScore(bazi1.pillars[2].gan, bazi2.pillars[2].gan);
  const rizhiScore = getDizhiScore(bazi1.pillars[2].zhi, bazi2.pillars[2].zhi);
  dimensions.character = {
    score: Math.round((riziganScore + rizhiScore) / 2),
    desc: `日干${bazi1.pillars[2].gan}与${bazi2.pillars[2].gan}、日支${bazi1.pillars[2].zhi}与${bazi2.pillars[2].zhi}的关系决定了性格匹配度。`
  };
  
  // 感情匹配：看月柱关系（感情宫）
  const yueganScore = getTianganScore(bazi1.pillars[1].gan, bazi2.pillars[1].gan);
  const yuezhiScore = getDizhiScore(bazi1.pillars[1].zhi, bazi2.pillars[1].zhi);
  dimensions.emotion = {
    score: Math.round((yueganScore + yuezhiScore) / 2),
    desc: `月柱代表感情宫，${bazi1.pillars[1].gan}${bazi1.pillars[1].zhi}与${bazi2.pillars[1].gan}${bazi2.pillars[1].zhi}的关系反映感情深度。`
  };
  
  // 事业财运：看年柱和时柱
  const nianganScore = getTianganScore(bazi1.pillars[0].gan, bazi2.pillars[0].gan);
  const shiganScore = getTianganScore(bazi1.pillars[3].gan, bazi2.pillars[3].gan);
  dimensions.career = {
    score: Math.round((nianganScore + shiganScore) / 2),
    desc: type === 'partner' 
      ? '双方事业运势匹配度高，适合合作创业，财运相辅相成。'
      : '双方事业财运各有特点，能在事业上互相支持。'
  };
  
  // 家庭观念：看年支关系
  const nianzhiScore = getDizhiScore(bazi1.pillars[0].zhi, bazi2.pillars[0].zhi);
  dimensions.family = {
    score: nianzhiScore,
    desc: `年柱代表家庭出身和观念，${bazi1.pillars[0].zhi}与${bazi2.pillars[0].zhi}的关系影响家庭和谐度。`
  };
  
  // 健康运势：综合五行平衡
  const wuxingBalance = Object.values(bazi1.wuxingCount).filter(c => c > 0).length + 
                        Object.values(bazi2.wuxingCount).filter(c => c > 0).length;
  dimensions.health = {
    score: Math.min(85, 55 + wuxingBalance * 3),
    desc: '双方五行互补有助于健康运势，五行平衡则身体康健。'
  };
  
  return dimensions;
}

// 获取等级
function getLevel(score) {
  if (score >= 85) return '上等婚配';
  if (score >= 70) return '中等婚配';
  return '下等婚配';
}

// 计算危机年份
function calculateCrisisYears(bazi1, bazi2) {
  const currentYear = new Date().getFullYear();
  const crisisYears = [];
  
  // 生肖相冲年份
  const chongMap = { '鼠': '马', '牛': '羊', '虎': '猴', '兔': '鸡', '龙': '狗', '蛇': '猪', '马': '鼠', '羊': '牛', '猴': '虎', '鸡': '兔', '狗': '龙', '猪': '蛇' };
  
  const shengxiaoList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  
  for (let i = 0; i < 10; i++) {
    const year = currentYear + i;
    const yearShengxiao = shengxiaoList[(year - 4) % 12];
    
    // 冲任一方生肖
    if (chongMap[yearShengxiao] === bazi1.shengXiao || chongMap[yearShengxiao] === bazi2.shengXiao) {
      crisisYears.push(`${year}年（${yearShengxiao}年，易有冲突）`);
    }
  }
  
  return crisisYears.slice(0, 4);
}

// 生成相处建议
function generateSuggestions(bazi1, bazi2, type) {
  const suggestions = [];
  
  // 根据五行差异给建议
  if (bazi1.maxWuxing !== bazi2.maxWuxing) {
    suggestions.push(`双方五行有差异，${bazi1.shengXiao}方${bazi1.maxWuxing}旺，${bazi2.shengXiao}方${bazi2.maxWuxing}旺，应互相学习对方优点。`);
  } else {
    suggestions.push(`双方五行同旺${bazi1.maxWuxing}，性格有相似之处，也容易因太像而产生摩擦，注意求同存异。`);
  }
  
  if (type === 'marriage') {
    suggestions.push('婚姻需要用心经营，遇到问题及时沟通，不要冷战。');
    suggestions.push('互相尊重对方的家庭和朋友，给彼此留一定的私人空间。');
    suggestions.push('共同规划未来，设立家庭目标，一起努力奋斗。');
  } else if (type === 'partner') {
    suggestions.push('合作中明确分工，权责清晰，避免因利益产生纠纷。');
    suggestions.push('财务公开透明，建立良好的信任机制。');
  } else {
    suggestions.push('亲子关系中，多站在对方角度思考，理解代沟差异。');
    suggestions.push('加强沟通，不要用命令的语气，平等交流。');
  }
  
  return suggestions;
}

/**
 * 八字合婚计算
 * @param {Object} birth1 - 第一个人生日 { year, month, day, hour, gender }
 * @param {Object} birth2 - 第二个人生日 { year, month, day, hour, gender }
 * @param {string} type - 类型：'marriage'(婚姻) | 'partner'(合伙) | 'parent-child'(亲子)
 * @returns {Object} 合婚结果
 */
export function calculateHehun(birth1, birth2, type = 'marriage') {
  const bazi1 = calculateBazi(birth1);
  const bazi2 = calculateBazi(birth2);
  
  const gender1 = birth1.gender || '男';
  const gender2 = birth2.gender || '女';
  
  // 计算各维度
  const dimensions = calculateDimensions(bazi1, bazi2, type);
  
  // 五行互补
  const fiveElementsMatch = calculateWuxingComplement(bazi1, bazi2);
  
  // 十神分析
  const tenGodsAnalysis = calculateShiShenAnalysis(bazi1, bazi2, gender1, gender2);
  
  // 生肖配对分数
  const shengxiaoKey = `${bazi1.shengXiao}-${bazi2.shengXiao}`;
  const shengxiaoScore = SHENGXIAO_PAIRING[shengxiaoKey]?.score || 65;
  
  // 计算综合分数（加权平均）
  const overallScore = Math.round(
    dimensions.character.score * 0.20 +
    dimensions.emotion.score * 0.20 +
    dimensions.career.score * 0.15 +
    dimensions.family.score * 0.15 +
    dimensions.health.score * 0.10 +
    fiveElementsMatch.score * 0.10 +
    tenGodsAnalysis.score * 0.05 +
    shengxiaoScore * 0.05
  );
  
  const level = getLevel(overallScore);
  
  // 生成总评
  const typeName = { 'marriage': '婚姻', 'partner': '合作', 'parent-child': '亲子' }[type] || '婚姻';
  let summary = '';
  if (overallScore >= 85) {
    summary = `此${typeName}配对为上等婚配，综合匹配度${overallScore}分。双方八字互补性强，${fiveElementsMatch.desc}${type === 'marriage' ? '婚后生活幸福美满，事业家庭双丰收。' : type === 'partner' ? '合作默契，能共同成就一番事业。' : '亲子关系融洽，家庭氛围和谐。'}`;
  } else if (overallScore >= 70) {
    summary = `此${typeName}配对为中等婚配，综合匹配度${overallScore}分。双方整体匹配度尚可，虽然存在一些差异，但只要用心经营，互相包容理解，${type === 'marriage' ? '婚姻生活会越来越幸福。' : type === 'partner' ? '合作也能取得不错的成果。' : '亲子关系会越来越融洽。'}`;
  } else {
    summary = `此${typeName}配对为下等婚配，综合匹配度${overallScore}分。双方性格差异较大，容易产生矛盾冲突，需要付出更多努力来经营这段关系。建议多沟通、多包容，必要时可寻求专业化解方法。`;
  }
  
  // 危机年份
  const crisisYears = calculateCrisisYears(bazi1, bazi2);
  
  // 相处建议
  const suggestions = generateSuggestions(bazi1, bazi2, type);
  
  return {
    overallScore,
    level,
    type,
    typeName,
    bazi1: {
      ...bazi1,
      gender: gender1,
      pillarsStr: bazi1.pillars.map(p => p.gan + p.zhi)
    },
    bazi2: {
      ...bazi2,
      gender: gender2,
      pillarsStr: bazi2.pillars.map(p => p.gan + p.zhi)
    },
    dimensions,
    fiveElementsMatch,
    tenGodsAnalysis,
    shengxiaoPairing: SHENGXIAO_PAIRING[shengxiaoKey] || null,
    summary,
    suggestions,
    crisisYears
  };
}

// ========== 合婚知识数据 ==========
export const HEHUN_KNOWLEDGE = [
  {
    title: '八字合婚的原理',
    content: '八字合婚是中国传统命理学的重要组成部分，其核心原理是通过对比男女双方的生辰八字（即出生年月日时的天干地支），分析两人命局中的五行生克、阴阳平衡、十神关系等，从而判断两人的婚姻匹配程度。八字合婚不仅看生肖属相，更重要的是看四柱整体的搭配是否和谐，五行是否互补，用神是否相生。'
  },
  {
    title: '生肖合婚的局限性',
    content: '很多人误以为生肖合婚就是八字合婚的全部，其实生肖只是八字中的年支，仅占八字的八分之一。生肖相合不一定婚姻美满，生肖相冲也不一定婚姻不幸。完整的八字合婚需要综合年柱、月柱、日柱、时柱四柱的生克关系，特别是日柱（夫妻宫）的匹配最为重要。因此，不要仅凭生肖就否定一段感情。'
  },
  {
    title: '日柱在合婚中的重要性',
    content: '日柱在八字中代表命主本人和配偶宫，日干为自己，日支为配偶。因此，合婚时日柱的匹配至关重要。日干相生相合说明两人性格投缘，日支相生相合说明夫妻感情和睦。如果日干相克、日支相冲，说明两人性格差异大，婚姻中容易产生矛盾。但日支也不宜完全相同，否则容易形成伏吟，反而不利。'
  },
  {
    title: '五行互补的重要意义',
    content: '五行互补是八字合婚的重要考量因素。每个人的八字中五行分布都不均匀，有的人火旺缺水，有的人金旺缺木。如果两人的八字能够互补，比如一方火旺而另一方水旺，或者一方缺金而另一方金旺，这样的组合往往能够互相补益，对彼此的运势都有提升作用，婚姻也更加稳定。'
  },
  {
    title: '十神与夫妻关系',
    content: '十神是八字分析的重要工具，在合婚中也有重要应用。男命以正财为妻，偏财为情人；女命以正官为夫，七杀为情人。如果男命正财清纯，女命正官一位，说明婚姻观念端正，感情专一。如果男命偏财多现，女命七杀混杂，则感情容易有波折。此外，双方日干之间的十神关系也能反映相处模式。'
  },
  {
    title: '纳音五行与合婚',
    content: '纳音五行是八字合婚的另一个重要参考。六十甲子各有纳音五行，如甲子乙丑海中金、丙寅丁卯炉中火等。纳音合婚主要看年命纳音的生克关系，金命与水命相生为吉，金命与木命相克为凶。但纳音只是合婚的一个方面，不能仅凭纳音判断婚姻好坏，需要结合整体命局综合分析。'
  },
  {
    title: '大运流年的同步性',
    content: '好的婚姻不仅要看原局的匹配度，还要看大运流年是否同步。如果两人在同一时间段内都走好运，说明事业家庭都能顺利发展；如果一方走好运而另一方走坏运，则容易出现一方旺另一方衰的情况，导致婚姻不平衡。此外，还要看是否有克妻克夫的大运，提前做好防范。'
  },
  {
    title: '合婚的正确目的',
    content: '很多人以为合婚就是算两个人合不合适，其实合婚的真正意义在于：了解双方的性格特点和相处模式，提前预判可能出现的问题，给出相应的化解建议，而不是简单地说合或不合。八字合婚的意义不在于否定一段感情，而在于帮助情侣更好地理解彼此，找到最适合彼此的相处方式，让婚姻更加幸福美满。'
  },
  {
    title: '合婚的正确观念',
    content: '八字合婚只是一种参考，不能作为决定婚姻的唯一标准。人的命运掌握在自己手中，婚姻的幸福与否更多取决于双方的经营和努力。八字合婚的意义在于帮助我们了解彼此的性格特点和潜在问题，提前做好心理准备，找到最适合的相处方式。再好的八字匹配，如果不懂得珍惜和经营，婚姻也不会幸福；再差的八字匹配，如果真心相爱、用心经营，也能收获美满的婚姻。'
  },
  {
    title: '理性看待合婚',
    content: '八字合婚是传统文化中的一种婚恋参考方式，其科学性有待验证。我们应该以理性和包容的心态看待八字合婚，既不要全盘否定，也不要过度迷信。婚姻的幸福与否，最终取决于两个人的感情基础、价值观是否一致、以及是否愿意为对方付出和改变。愿每一段感情都能被温柔以待，每一对恋人都能收获幸福。'
  }
];

// ========== 合婚小贴士 ==========
export const HEHUN_TIPS = [
  {
    title: '如何看待合婚结果',
    content: '合婚结果只是一种参考，不要因为分数高就掉以轻心，也不要因为分数低就轻言放弃。婚姻的幸福与否，关键在于两个人的用心经营。好的匹配是基础，但不是全部；不好的匹配也可以通过后天的努力来改善。'
  },
  {
    title: '生肖相冲就一定不好吗',
    content: '生肖相冲只是八字合婚的一个方面，不能仅凭生肖就判断婚姻好坏。现实中有很多生肖相冲但婚姻幸福的例子，也有很多生肖相合但婚姻不幸福的例子。完整的八字合婚需要看四柱整体搭配，还要考虑性格、价值观等因素。'
  },
  {
    title: '合婚的最佳时间',
    content: '合婚最好在确定关系之前或谈婚论嫁之前进行，这样可以提前了解双方的性格特点和潜在问题，有针对性地调整相处方式。如果已经结婚了再合婚，意义就不大了，因为婚姻已经是既定事实，更多的是如何经营好现有的婚姻。'
  },
  {
    title: '合婚看什么最重要',
    content: '合婚最重要的是看双方的性格是否合得来、价值观是否一致、有没有共同的生活目标。八字中的日柱匹配度、五行互补性、十神关系等都是参考指标。但最核心的还是两个人的感情基础和经营婚姻的意愿。'
  },
  {
    title: '如何改善婚姻运势',
    content: '改善婚姻运势的方法有很多：一是调整心态，多包容理解对方；二是改善居家风水，布置有利于感情的家居环境；三是佩戴或摆放有利于感情的吉祥物；四是多行善积德，积累福报；五是培养共同爱好，增进感情交流。'
  },
  {
    title: '合婚的正确心态',
    content: '对待合婚要有正确的心态：既不信迷，也不全盘否定。把合婚当作一面镜子，帮助我们更好地了解自己和对方，找到最适合的相处方式。不要因为合婚结果好就不珍惜，也不要因为结果不好就放弃。事在人为，命运掌握在自己手中。'
  },
  {
    title: '婚姻中的五行调和',
    content: '如果双方五行相克，可以通过一些方法来调和：比如在居家布置中增加通关五行的元素，穿着对应五行颜色的衣服，选择适合的行业和发展方向，在特定时间多做有益的事情等。但最重要的还是互相包容、互相理解。'
  },
  {
    title: '什么样的婚姻最稳定',
    content: '最稳定的婚姻不是激情四射的那种，而是细水长流、相濡以沫的那种。从八字来看，五行相对平衡、正官正财清纯、日支为喜用神、夫妻宫不受冲克的婚姻比较稳定。但说到底，最好的婚姻就是两个人都愿意为对方付出，一起经营好这个家。'
  }
];

// ========== 星座配对数据 ==========
export const CONSTELLATION_PAIRING = {
  '白羊座-狮子座': {
    score: 92,
    level: '天作之合',
    description: '白羊和狮子同属火象星座，两人都热情开朗、充满活力，在一起就像燃烧的火焰，激情四射。狮子的霸气能满足白羊的崇拜欲，白羊的率真也能打动狮子的心。',
    advantages: ['性格相似，一拍即合', '都很热情，生活充满激情', '互相欣赏，彼此成就', '有共同的兴趣爱好'],
    disadvantages: ['都比较冲动，容易吵架', '都爱面子，谁也不肯先低头', '脾气都比较火爆'],
    suggestion: '学会控制情绪，吵架时不要说伤人的话。白羊要多给狮子面子，狮子也要多体谅白羊的感受。'
  },
  '白羊座-射手座': {
    score: 90,
    level: '天作之合',
    description: '白羊和射手都是火象星座，两人都热爱自由、喜欢冒险，在一起永远不会觉得无聊。射手的乐观能感染白羊，白羊的行动力也能带动射手。',
    advantages: ['都爱自由，相处轻松', '生活充满乐趣和冒险', '价值观相似', '有说不完的话题'],
    disadvantages: ['都不安分，稳定性不足', '都比较粗心大意', '容易冲动做决定'],
    suggestion: '给对方足够的自由空间，但也要有共同的生活目标。一起规划未来，增加感情的稳定性。'
  },
  '金牛座-处女座': {
    score: 88,
    level: '非常般配',
    description: '金牛和处女同属土象星座，两人都踏实稳重、注重细节，对生活品质有追求。金牛的安全感能让处女安心，处女的细心也能照顾好金牛。',
    advantages: ['都很踏实，安全感强', '生活习惯相似', '对感情都很专一', '能一起创造美好生活'],
    disadvantages: ['都比较固执', '生活略显平淡', '都爱钻牛角尖'],
    suggestion: '偶尔给生活加点浪漫和惊喜，不要太拘泥于形式。学会变通，不要太固执己见。'
  },
  '金牛座-摩羯座': {
    score: 90,
    level: '天作之合',
    description: '金牛和摩羯都是土象星座，两人都务实上进、有责任感，对未来有清晰的规划。金牛的稳重能安抚摩羯的焦虑，摩羯的上进心也能激励金牛。',
    advantages: ['价值观高度一致', '都很有责任感', '能一起打拼事业', '感情稳定长久'],
    disadvantages: ['都不太懂浪漫', '工作狂倾向', '都比较内敛'],
    suggestion: '工作之余也要多关心对方，不要把所有精力都放在工作上。偶尔制造一些小浪漫，给生活加点料。'
  },
  '双子座-天秤座': {
    score: 86,
    level: '非常般配',
    description: '双子和天秤同属风象星座，两人都聪明机智、善于交际，在一起总有聊不完的话题。天秤的优雅能吸引双子，双子的风趣也能逗乐天秤。',
    advantages: ['都很聪明，沟通顺畅', '社交能力强', '生活丰富多彩', '审美品味相似'],
    disadvantages: ['都比较犹豫难做决定', '都爱交朋友，应酬多', '稳定性稍差'],
    suggestion: '做决定时要果断一些，不要总是犹豫不决。给对方足够的社交空间，但也要有二人独处的时间。'
  },
  '双子座-水瓶座': {
    score: 85,
    level: '非常般配',
    description: '双子和水瓶都是风象星座，两人都思维活跃、追求新奇，在一起永远不会觉得无聊。水瓶的独特能吸引双子，双子的多变也能跟上水瓶的节奏。',
    advantages: ['思维方式相近', '都追求新鲜事物', '精神层面契合', '相处轻松愉快'],
    disadvantages: ['都善变，难以捉摸', '情绪起伏大', '不够踏实'],
    suggestion: '感情需要稳定的经营，不要总是追求新鲜感。给对方一些安全感，让感情有根。'
  },
  '巨蟹座-天蝎座': {
    score: 95,
    level: '天作之合',
    description: '巨蟹和天蝎同属水象星座，两人都感情细腻、重视家庭，是灵魂伴侣般的存在。天蝎的深情能满足巨蟹的安全感，巨蟹的温柔也能融化天蝎的心。',
    advantages: ['感情深度高，灵魂契合', '都很重视家庭', '直觉敏锐，互相了解', '对感情专一忠诚'],
    disadvantages: ['都比较敏感多疑', '容易记仇', '占有欲都很强'],
    suggestion: '建立信任是关键，不要总是猜疑对方。有话直说，不要把事情放在心里发酵。'
  },
  '巨蟹座-双鱼座': {
    score: 92,
    level: '天作之合',
    description: '巨蟹和双鱼都是水象星座，两人都温柔善良、浪漫感性，感情生活充满诗情画意。巨蟹的保护欲能给双鱼安全感，双鱼的浪漫也能打动巨蟹的心。',
    advantages: ['都很温柔浪漫', '感情细腻深厚', '互相体谅包容', '生活充满温情'],
    disadvantages: ['都比较情绪化', '容易想太多', '都缺乏安全感'],
    suggestion: '一起建立安全感，不要互相试探。有问题及时沟通，不要让负面情绪积累。'
  },
  '狮子座-射手座': {
    score: 88,
    level: '非常般配',
    description: '狮子和射手都是火象星座，两人都热情开朗、热爱生活，在一起充满欢声笑语。狮子的霸气能吸引射手，射手的自由也能给狮子带来新鲜感。',
    advantages: ['都很热情开朗', '生活充满乐趣', '社交能力强', '价值观相近'],
    disadvantages: ['都爱自由，稳定性不足', '都比较冲动', '花钱大手大脚'],
    suggestion: '一起规划未来，增加生活的稳定感。学会理财，为共同的未来做准备。'
  },
  '处女座-摩羯座': {
    score: 87,
    level: '非常般配',
    description: '处女和摩羯都是土象星座，两人都认真踏实、有上进心，对生活有规划。处女的细心能帮助摩羯，摩羯的稳重也能让处女安心。',
    advantages: ['做事都很认真', '生活有条理', '能一起进步', '对感情负责'],
    disadvantages: ['都比较严肃', '生活缺少情趣', '都很固执'],
    suggestion: '学会放松，不要太紧绷。偶尔享受生活，给感情增加一些浪漫和情趣。'
  },
  '天秤座-水瓶座': {
    score: 86,
    level: '非常般配',
    description: '天秤和水瓶都是风象星座，两人都善于交际、思想前卫，在精神层面有很多共鸣。天秤的优雅能吸引水瓶，水瓶的独特也能让天秤着迷。',
    advantages: ['精神层面契合', '社交圈相似', '都追求自由平等', '审美品味相近'],
    disadvantages: ['都比较理性，感情浓度不够', '都爱交朋友', '做决定犹豫'],
    suggestion: '多表达感情，不要太理性。给对方明确的答案，不要总是模棱两可。'
  },
  '天蝎座-双鱼座': {
    score: 93,
    level: '天作之合',
    description: '天蝎和双鱼都是水象星座，两人都感情丰富、直觉敏锐，是灵魂深处的契合。天蝎的深情能保护双鱼，双鱼的温柔也能温暖天蝎。',
    advantages: ['灵魂深度契合', '感情浓度高', '直觉敏锐，心有灵犀', '浪漫而深刻'],
    disadvantages: ['都比较情绪化', '容易陷入情感漩涡', '都缺乏安全感'],
    suggestion: '建立健康的相处模式，不要过度依赖对方。保持独立的自我，感情才能长久。'
  },
  '白羊座-双子座': {
    score: 80,
    level: '十分般配',
    description: '白羊的热情与双子的灵动相互吸引，两人在一起充满活力和趣味。白羊能带动双子的行动力，双子能给白羊带来新鲜感。',
    advantages: ['都很有活力', '生活充满乐趣', '互相吸引', '沟通顺畅'],
    disadvantages: ['都没耐心', '容易三分钟热度', '稳定性不足'],
    suggestion: '培养共同的长期目标，增加感情的稳定性。学会坚持，不要轻易放弃。'
  },
  '金牛座-巨蟹座': {
    score: 83,
    level: '十分般配',
    description: '金牛的稳重与巨蟹的温柔相得益彰，两人都重视家庭和物质生活，能一起建立温馨的小家。',
    advantages: ['都重视家庭', '生活安稳舒适', '能互相照顾', '感情细水长流'],
    disadvantages: ['都比较宅', '生活节奏慢', '都爱吃容易发胖'],
    suggestion: '一起运动健身，保持健康的生活方式。偶尔出去走走，给生活增加一些变化。'
  },
  '双子座-狮子座': {
    score: 78,
    level: '比较般配',
    description: '双子的风趣与狮子的霸气互补，双子能逗狮子开心，狮子能给双子安全感。但两人都爱面子，容易产生争执。',
    advantages: ['社交能力强', '生活精彩', '互相吸引', '都很聪明'],
    disadvantages: ['都爱面子', '都比较自我', '容易吵架'],
    suggestion: '学会示弱，不要总是争强好胜。在家里不要讲面子，要讲感情。'
  },
  '巨蟹座-处女座': {
    score: 82,
    level: '十分般配',
    description: '巨蟹的温柔与处女的细心相互配合，两人都很会照顾人，生活细节上能互相体谅。',
    advantages: ['都很细心体贴', '生活照顾周到', '感情细腻', '能互相理解'],
    disadvantages: ['都比较敏感', '容易想太多', '都爱唠叨'],
    suggestion: '不要太纠结细节，学会看大局。有什么不满直接说出来，不要憋在心里。'
  },
  '狮子座-天秤座': {
    score: 75,
    level: '比较般配',
    description: '狮子的霸气与天秤的优雅互相吸引，狮子能保护天秤，天秤能平衡狮子。但两人都爱社交，容易忽略对方。',
    advantages: ['郎才女貌，外表般配', '社交能力强', '审美品味高', '互相欣赏'],
    disadvantages: ['都爱面子', '应酬太多', '容易忽略对方'],
    suggestion: '多留一些二人世界的时间，不要总是忙于社交。在朋友面前多给对方面子。'
  },
  '处女座-天蝎座': {
    score: 76,
    level: '比较般配',
    description: '处女的细心与天蝎的深情形成互补，处女能在生活上照顾天蝎，天蝎能在感情上满足处女。但两人都爱挑剔，容易产生摩擦。',
    advantages: ['都很专情', '能互相理解', '做事都很认真', '精神交流丰富'],
    disadvantages: ['都爱挑剔', '都比较敏感', '容易产生误会'],
    suggestion: '多看对方的优点，少盯着缺点不放。学会赞美，不要总是批评。'
  },
  '天秤座-射手座': {
    score: 72,
    level: '比较般配',
    description: '天秤的优雅与射手的自由相互吸引，天秤能给射手美感，射手能给天秤带来冒险。但两人都爱自由，感情稳定性不足。',
    advantages: ['都热爱自由', '生活丰富多彩', '社交能力强', '相处轻松'],
    disadvantages: ['都不定性', '承诺感不强', '容易产生误会'],
    suggestion: '给对方自由的同时也要有责任感。一起成长，让感情慢慢沉淀。'
  },
  '天蝎座-摩羯座': {
    score: 80,
    level: '十分般配',
    description: '天蝎的深情与摩羯的稳重形成互补，天蝎能给摩羯激情，摩羯能给天蝎安全感。两人都很有上进心，能一起打拼。',
    advantages: ['都很有上进心', '感情专一', '能互相成就', '目标一致'],
    disadvantages: ['都比较内敛', '沟通不够主动', '都很固执'],
    suggestion: '主动表达感情，不要总是让对方猜。有话直说，增加沟通的效率。'
  },
  '射手座-水瓶座': {
    score: 84,
    level: '十分般配',
    description: '射手的乐观与水瓶的独特相互吸引，两人都追求自由和新鲜事物，在一起永远不会无聊。',
    advantages: ['都爱自由', '兴趣相投', '思想前卫', '相处愉快'],
    disadvantages: ['都不安定', '责任感稍弱', '容易冲动'],
    suggestion: '在追求自由的同时也要承担责任。一起成长，让感情有更深的根基。'
  },
  '摩羯座-双鱼座': {
    score: 73,
    level: '比较般配',
    description: '摩羯的稳重与双鱼的浪漫形成互补，摩羯能给双鱼安全感，双鱼能给摩羯带来浪漫。但两人性格差异大，需要磨合。',
    advantages: ['性格互补', '能互相学习', '摩羯稳重双鱼浪漫', '生活有张有弛'],
    disadvantages: ['思维方式不同', '沟通有障碍', '价值观有差异'],
    suggestion: '多站在对方角度思考问题，理解彼此的差异。互相包容，共同成长。'
  },
  '水瓶座-白羊座': {
    score: 74,
    level: '比较般配',
    description: '水瓶的独特与白羊的率真相互吸引，两人都很有个性，在一起充满新鲜感。但两人都比较自我，容易产生冲突。',
    advantages: ['都很有个性', '生活充满变化', '互相吸引', '都很独立'],
    disadvantages: ['都比较自我', '容易产生争执', '稳定性不足'],
    suggestion: '学会换位思考，多为对方着想。适当妥协，感情才能长久。'
  },
  '双鱼座-金牛座': {
    score: 79,
    level: '比较般配',
    description: '双鱼的浪漫与金牛的稳重相互吸引，双鱼能给金牛带来梦幻，金牛能给双鱼带来安全感。两人都重视感情，能长久。',
    advantages: ['都重感情', '性格互补', '能互相照顾', '生活安稳'],
    disadvantages: ['节奏不同步', '沟通方式不同', '都比较被动'],
    suggestion: '主动一些，不要总是等对方付出。找到共同的节奏，一起前进。'
  },
  '白羊座-巨蟹座': {
    score: 55,
    level: '需要磨合',
    description: '白羊的直接与巨蟹的敏感形成强烈对比，白羊容易伤到巨蟹，巨蟹的情绪化也让白羊受不了。需要双方都做出改变。',
    advantages: ['性格互补，能学到东西', '白羊能保护巨蟹', '巨蟹能温柔白羊'],
    disadvantages: ['性格差异大', '沟通方式不同', '容易互相伤害'],
    suggestion: '白羊说话要注意方式，不要太直接。巨蟹要学会表达，不要总是生闷气。'
  },
  '金牛座-天蝎座': {
    score: 60,
    level: '需要磨合',
    description: '金牛的固执与天蝎的倔强不相上下，两人都很有主见，谁也不服谁。但如果能磨合好，感情会非常深厚。',
    advantages: ['都很专一', '都很有毅力', '感情深度够', '能一起坚持'],
    disadvantages: ['都很固执', '都爱记仇', '容易冷战'],
    suggestion: '学会妥协和退让，不要总是较劲。有问题及时解决，不要积累矛盾。'
  },
  '双子座-处女座': {
    score: 58,
    level: '需要磨合',
    description: '双子的多变与处女的稳定形成反差，双子受不了处女的挑剔，处女也受不了双子的善变。需要双方互相包容。',
    advantages: ['都很聪明', '能互相学习', '生活有变化'],
    disadvantages: ['性格差异大', '生活习惯不同', '容易互相嫌弃'],
    suggestion: '双子要稳定一些，处女要包容一些。多看对方优点，少挑缺点。'
  },
  '狮子座-天蝎座': {
    score: 50,
    level: '需要磨合',
    description: '狮子的霸气与天蝎的强势针锋相对，两人都想主导这段关系，容易产生激烈的冲突。是一对欢喜冤家。',
    advantages: ['都很有魅力', '感情浓烈', '互相吸引', '都很专一'],
    disadvantages: ['都很强势', '谁也不服谁', '容易激烈争吵', '占有欲都强'],
    suggestion: '学会平等相处，不要总是想控制对方。互相尊重，感情才能长久。'
  }
};

// ========== 便捷查询函数 ==========

/**
 * 获取生肖配对信息
 * @param {string} sx1 - 生肖1
 * @param {string} sx2 - 生肖2
 * @returns {Object|null} 配对信息
 */
export function getShengxiaoPairing(sx1, sx2) {
  const key = `${sx1}-${sx2}`;
  return SHENGXIAO_PAIRING[key] || null;
}

/**
 * 获取星座配对信息
 * @param {string} c1 - 星座1
 * @param {string} c2 - 星座2
 * @returns {Object|null} 配对信息
 */
export function getConstellationPairing(c1, c2) {
  const key1 = `${c1}-${c2}`;
  const key2 = `${c2}-${c1}`;
  return CONSTELLATION_PAIRING[key1] || CONSTELLATION_PAIRING[key2] || null;
}
