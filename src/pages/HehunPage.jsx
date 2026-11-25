import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Users, Crown, Lock, ChevronRight, Sparkles,
  Star, AlertTriangle, CheckCircle2, Info, Handshake,
  Baby, Briefcase, Home, BookOpen, RefreshCw, TrendingUp,
  Shield, UserCheck
} from 'lucide-react';
import {
  getShengxiaoPairing,
  calculateHehun,
  HEHUN_KNOWLEDGE,
  HEHUN_TIPS,
} from '../data/hehun';

const shengxiaoList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

export default function HehunPage() {
  const [activeTab, setActiveTab] = useState('shengxiao'); // shengxiao, bazi, partner, qinzi, knowledge

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            合婚配对
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">八字合婚</h1>
          <p className="text-ink-500 max-w-2xl mx-auto">
            深度分析双方八字匹配度，预测婚姻幸福指数
          </p>
        </div>

        {/* Tab 导航 */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-dark-200 p-1 flex-wrap gap-1 justify-center">
            {[
              { id: 'shengxiao', name: '生肖配对', icon: Star, free: true },
              { id: 'bazi', name: '八字合婚', icon: Heart, free: false },
              { id: 'partner', name: '合伙合盘', icon: Briefcase, free: false },
              { id: 'qinzi', name: '亲子缘分', icon: Baby, free: false },
              { id: 'knowledge', name: '合婚知识', icon: BookOpen, free: true },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-dark-400 text-ink-100 shadow-sm'
                      : 'text-ink-500 hover:text-ink-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                  {tab.free && (
                    <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded">免费</span>
                  )}
                  {!tab.free && (
                    <Crown className="w-3 h-3 ml-1.5 text-gold-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 生肖配对 */}
        {activeTab === 'shengxiao' && <ShengxiaoSection setActiveTab={setActiveTab} />}

        {/* 八字合婚 */}
        {activeTab === 'bazi' && <BaziHehunSection />}

        {/* 合伙合盘 */}
        {activeTab === 'partner' && <PartnerSection />}

        {/* 亲子缘分 */}
        {activeTab === 'qinzi' && <QinziSection />}

        {/* 合婚知识 */}
        {activeTab === 'knowledge' && <KnowledgeSection />}

        {/* 会员推广 */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-100 mb-1">开通会员，解锁全部合婚功能</h3>
              <p className="text-sm text-ink-300">八字合婚、合伙合盘、亲子缘分深度分析</p>
            </div>
            <Link to="/vip" className="btn-primary whitespace-nowrap">
              <Crown className="w-4 h-4 inline mr-1" />
              立即开通
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 生肖配对 =====
// 生肖配对完整报告示例数据（预览用）
const sampleShengxiaoReport = {
  score: 94,
  level: '上等婚配',
  type: '六合',
  maleShengxiao: '牛',
  femaleShengxiao: '鼠',
  summary: '鼠牛六合，乃天作之合。鼠的机敏与牛的稳重相得益彰，一动一静，一智一勤，互为补充，婚姻美满幸福。',
  description: '鼠与牛为十二生肖六合之首，属最佳婚配。属鼠人机灵聪慧，反应敏捷，善于交际；属牛人踏实稳重，勤劳肯干，有责任心。两人在一起，鼠的聪明才智与牛的踏实努力相结合，事业家庭双丰收，是令人羡慕的一对。',
  wuxing: {
    male: { wuxing: '土', desc: '土鼠之命，为人诚实守信，稳重踏实' },
    female: { wuxing: '水', desc: '水牛之命，聪明智慧，财运亨通' },
    relation: '土克水，男克中有生，虽然有小摩擦，但整体和谐',
    score: 80,
    detail: '男方五行属土，女方五行属水，土克水为财，男方在关系中略显强势。但土能克水也能生水（土生水？不，土克水。不过鼠牛六合之力大于五行相克，因此整体仍为吉配。'
  },
  character: {
    score: 92,
    male: '属牛男性格稳重，做事认真负责，有耐心有毅力，一旦认定的事情就会坚持到底。但有时过于固执，不善于变通。',
    female: '属鼠女性格活泼，聪明机智，善于观察，反应灵敏，适应能力强。但有时过于敏感，容易想太多。',
    complement: '牛的稳重给鼠安全感，鼠的灵给牛带来活力和乐趣，两人性格一动一静，一刚一柔，互补性极强。'
  },
  emotion: {
    score: 95,
    detail: '鼠牛六合，感情基础深厚，双方都很珍惜彼此。属牛人专一忠诚，属鼠人温柔体贴，感情生活甜蜜美满。虽然偶尔会有小摩擦，但都能很快和好如初。',
    advice: '多表达爱意，不要因为熟悉就忽略了浪漫和仪式感；遇到矛盾及时沟通，不要冷战。'
  },
  career: {
    score: 88,
    detail: '属牛人踏实肯干，属鼠人精明能干，两人在事业上能互相支持，共同进步。鼠的聪明才智加上牛的勤奋努力，事业财运都会越来越好。',
    advice: '可以考虑共同创业或投资，牛负责执行，鼠负责策划，配合默契；但要注意工作和生活分开，不要把工作上的矛盾带回家。'
  },
  family: {
    score: 90,
    detail: '双方都很重视家庭，家庭观念强。属牛人顾家有责任心，属鼠人细心会持家，家庭生活温馨和睦。与双方父母关系也相处融洽，家庭美满。',
    advice: '共同分担家务，不要让一方承担太多；定期家庭活动，增进家人之间的感情。'
  },
  health: {
    score: 85,
    detail: '属牛人体质较好，但要注意肠胃和关节方面的问题；属鼠人身体素质一般，要注意肾脏和泌尿系统方面的问题。两人互相监督，养成良好的生活习惯。',
    advice: '一起运动健身，养成良好的作息习惯；饮食均衡，不要暴饮暴食；定期体检，早发现早治疗。'
  },
  suggestions: [
    '互相尊重是基础，尊重对方的个性、爱好和朋友圈，给彼此留私人空间',
    '有效沟通是关键，遇到问题及时说出来，不要让对方猜，也不要冷战',
    '牛要学会灵活变通，不要太固执；鼠要学会控制情绪，不要太敏感',
    '共同成长很重要，一起学习新东西，一起旅行看世界，保持对生活的热情',
    '财务管理要透明，建立家庭共同账户，大额支出共同商量，避免因钱伤感情',
    '仪式感不能少，记住重要纪念日，偶尔制造小惊喜小浪漫，为感情保鲜',
    '包容理解是智慧，人无完人，多看对方的优点，包容对方的缺点，互相成就',
  ],
  luckyYears: [
    { year: '2025（蛇年）', desc: '巳酉丑三合，财运亨通，家庭和睦，适合置业生子' },
    { year: '2027（羊年）', desc: '运势平稳，感情甜蜜，适合拓展事业' },
    { year: '2028（猴年）', desc: '申子辰三合，贵人运旺，事业更上一层楼' },
  ],
  crisisYears: [
    { year: '2026（马年）', level: '中危', desc: '子午相冲，与女方生肖相冲，容易有口舌是非，感情波动', suggestion: '多沟通多理解，避免硬碰硬，一起旅行散散心' },
    { year: '2029（鸡年）', level: '低危', desc: '酉金克木，总体平稳，但要注意第三者干扰', suggestion: '加强信任，多陪伴对方，共同参与家庭活动' },
    { year: '2030（狗年）', level: '高危', desc: '丑戌相刑，与男方生肖相刑，是婚姻的一道坎，需格外注意', suggestion: '佩戴吉祥物化解，一起做公益积累福报，多包容多理解' },
  ],
  mascots: [
    { name: '六合贵人吊坠', effect: '增强六合之力，促进感情和谐', position: '佩戴在身' },
    { name: '粉晶鸳鸯摆件', effect: '增进夫妻感情，白头偕老', position: '卧室床头柜' },
    { name: '翡翠平安扣', effect: '保平安，化解流年不利', position: '佩戴在身' },
  ],
  fengshui: {
    bedroom: '卧室宜选在房屋的东北方或东南方，有利于感情稳定；床头宜朝北或朝东，不宜朝西；卧室颜色以暖色调为主，避免过多冷色',
    livingRoom: '客厅宜明亮通透，可摆放绿植增加生气；沙发宜靠实墙，背后不宜靠窗或门；可在客厅东北角放鸳鸯摆件增进感情',
    kitchen: '厨房要保持干净整洁，灶台和水槽不宜正对（水火相冲）；可摆放绿植增加生气',
  },
  strengths: [
    '生肖六合，天作之合，婚姻基础稳固',
    '性格互补，一动一静，一智一勤，相得益彰',
    '感情深厚，双方都很珍惜彼此，对感情忠诚专一',
    '事业财运能互相支持，共同进步，财运亨通',
    '家庭观念强，重视家庭，生活温馨和睦',
  ],
  weaknesses: [
    '五行土克水，男方有时略显强势，需要注意沟通方式',
    '牛过于固执，鼠过于敏感，容易因小事产生摩擦',
    '未来几年有几个危机年份需要格外注意',
    '健康方面各有薄弱环节，需要共同注意保养',
  ],
  conclusion: '总体而言，鼠牛配为上等婚配，综合匹配度94分。生肖六合，天作之合，性格互补，感情深厚，事业财运家庭皆佳，是非常理想的婚配组合。虽然五行略有相克之象，也有一些需要注意的地方，但只要用心经营，互相包容理解，一定能够白头偕老，幸福美满。'
};

function ShengxiaoSection({ setActiveTab }) {
  const [sx1, setSx1] = useState('');
  const [sx2, setSx2] = useState('');
  const [result, setResult] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  const handlePair = () => {
    if (!sx1 || !sx2) return;
    const res = getShengxiaoPairing(sx1, sx2);
    setResult(res);
    setUnlocked(false); // 重置解锁状态
  };

  return (
    <div className="space-y-6">
      {/* 生肖配对 */}
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Star className="w-6 h-6 text-gold-500 mr-2" />
          生肖配对速查
          <span className="badge-free ml-3">免费</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">男方生肖</label>
            <select className="input-field" value={sx1} onChange={(e) => setSx1(e.target.value)}>
              <option value="">请选择生肖</option>
              {shengxiaoList.map(sx => (
                <option key={sx} value={sx}>{sx}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">女方生肖</label>
            <select className="input-field" value={sx2} onChange={(e) => setSx2(e.target.value)}>
              <option value="">请选择生肖</option>
              {shengxiaoList.map(sx => (
                <option key={sx} value={sx}>{sx}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handlePair} className="btn-primary w-full flex items-center justify-center">
          <Heart className="w-4 h-4 mr-2" />
          开始配对
        </button>
      </div>

      {result && (
        <div className="card p-8">
          {/* 总分 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-4xl mb-1">{sx1}</div>
                <div className="text-sm text-ink-500">男方</div>
              </div>
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
              <div className="text-center">
                <div className="text-4xl mb-1">{sx2}</div>
                <div className="text-sm text-ink-500">女方</div>
              </div>
            </div>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              {result.score}
            </div>
            <div className="text-ink-500 mb-2">生肖配对指数</div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              result.level === '上等婚配' ? 'bg-green-500/20 text-green-400' :
              result.level === '中等婚配' ? 'bg-yellow-500/20 text-yellow-700' :
              'bg-red-500/20 text-red-400'
            }`}>
              {result.level}
            </span>
            {result.type && (
              <div className="mt-2 text-sm text-ink-500">
                <span className="px-2 py-0.5 bg-dark-200 rounded text-xs">{result.type}</span>
              </div>
            )}
          </div>

          {/* 描述 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 mb-6">
            <p className="text-ink-200 leading-relaxed">{result.description}</p>
          </div>

          {/* 优势与注意 */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-green-500/10 rounded-xl">
              <h4 className="font-bold text-green-400 mb-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                配对优势
              </h4>
              <ul className="space-y-2">
                {result.advantages.map((adv, i) => (
                  <li key={i} className="text-sm text-green-400 flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-orange-500/10 rounded-xl">
              <h4 className="font-bold text-orange-400 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                需要注意
              </h4>
              <ul className="space-y-2">
                {result.disadvantages.map((dis, i) => (
                  <li key={i} className="text-sm text-orange-400 flex items-start">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 建议 */}
          <div className="p-5 bg-blue-500/10 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              相处建议
            </h4>
            <p className="text-sm text-blue-400">{result.suggestion}</p>
          </div>

          {/* 会员解锁内容 */}
          {!unlocked && (
            <div className="relative mt-6 min-h-[260px]">
              <div className="opacity-30 blur-sm space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-200 mb-2">生肖五行分析</h4>
                    <p className="text-sm text-ink-500">双方生肖五行生克关系深度解析...</p>
                  </div>
                  <div className="p-4 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-200 mb-2">性格匹配详解</h4>
                    <p className="text-sm text-ink-500">生肖性格特点与互补性分析...</p>
                  </div>
                </div>
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">吉凶年份与化解</h4>
                  <p className="text-sm text-ink-500">冲合年份预警与化解方法详解...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-7 text-center w-full shadow-2xl border border-dark-200" style={{ minWidth: '320px', maxWidth: '420px' }}>
                  <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-ink-100 font-bold text-lg mb-2">
                    解锁生肖配对完整报告
                  </h3>
                  <p className="text-sm text-ink-500 mb-5 leading-relaxed px-2">
                    五行分析、性格详解、吉凶年份、化解方案、风水建议
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button 
                      onClick={() => setUnlocked(true)} 
                      className="btn-secondary text-sm px-5 py-2 w-full sm:w-auto order-2 sm:order-1"
                    >
                      预览完整效果
                    </button>
                    <Link to="/vip" className="btn-primary text-sm px-5 py-2 w-full sm:w-auto order-1 sm:order-2">
                      开通会员
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 已解锁 - 生肖配对完整报告（示例） */}
          {unlocked && (
            <div className="space-y-5 mt-6">
              {/* 示例标识 */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 flex items-center">
                <Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-400">以下为生肖配对完整报告示例</p>
                  <p className="text-xs text-amber-400">开通会员后可查看您和Ta的专属完整报告</p>
                </div>
                <button
                  onClick={() => setUnlocked(false)}
                  className="ml-auto text-sm text-amber-400 hover:text-amber-400 underline"
                >
                  收起预览
                </button>
              </div>

              {/* 总评 */}
              <div className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200">
                <div className="text-center mb-5">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">{sampleShengxiaoReport.maleShengxiao}</div>
                      <div className="text-xs text-ink-500">男方</div>
                    </div>
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-100" />
                    <div className="text-center">
                      <div className="text-3xl mb-1">{sampleShengxiaoReport.femaleShengxiao}</div>
                      <div className="text-xs text-ink-500">女方</div>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                    {sampleShengxiaoReport.score}
                  </div>
                  <div className="text-ink-500 mb-2">生肖配对指数</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400">
                      {sampleShengxiaoReport.level}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">{sampleShengxiaoReport.type}</span>
                  </div>
                </div>
                <div className="text-sm text-ink-200 leading-relaxed bg-dark-400/60 rounded-lg p-4">
                  {sampleShengxiaoReport.conclusion}
                </div>
              </div>

              {/* 生肖五行分析 */}
              <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                <h4 className="font-bold text-green-400 mb-4 flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  生肖五行分析
                  <span className="ml-auto text-sm font-normal bg-green-200 text-green-800 px-3 py-0.5 rounded-full">{sampleShengxiaoReport.wuxing.score}分</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-blue-400 mb-2">男方五行</div>
                    <div className="text-sm font-medium text-ink-100 mb-1">属{sampleShengxiaoReport.maleShengxiao} · {sampleShengxiaoReport.wuxing.male.wuxing}</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{sampleShengxiaoReport.wuxing.male.desc}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-pink-400 mb-2">女方五行</div>
                    <div className="text-sm font-medium text-ink-100 mb-1">属{sampleShengxiaoReport.femaleShengxiao} · {sampleShengxiaoReport.wuxing.female.wuxing}</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{sampleShengxiaoReport.wuxing.female.desc}</p>
                  </div>
                </div>
                <div className="p-3 bg-dark-400 rounded-lg">
                  <div className="text-xs font-medium text-ink-200 mb-2">五行关系</div>
                  <p className="text-sm text-green-400 leading-relaxed">{sampleShengxiaoReport.wuxing.relation}</p>
                </div>
              </div>

              {/* 性格匹配详解 */}
              <div className="p-5 bg-purple-500/10 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-400 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  性格匹配详解
                  <span className="ml-auto text-sm font-normal bg-purple-200 text-purple-800 px-3 py-0.5 rounded-full">{sampleShengxiaoReport.character.score}分</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-blue-400 mb-2">男方性格</div>
                    <p className="text-xs text-ink-300 leading-relaxed">{sampleShengxiaoReport.character.male}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-pink-400 mb-2">女方性格</div>
                    <p className="text-xs text-ink-300 leading-relaxed">{sampleShengxiaoReport.character.female}</p>
                  </div>
                </div>
                <div className="p-3 bg-dark-400 rounded-lg">
                  <div className="text-xs font-medium text-purple-400 mb-2">性格互补</div>
                  <p className="text-sm text-purple-400 leading-relaxed">{sampleShengxiaoReport.character.complement}</p>
                </div>
              </div>

              {/* 五维匹配 */}
              <div className="p-5 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-200 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  五维深度解析
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'emotion', label: '感情匹配', icon: Heart, data: sampleShengxiaoReport.emotion },
                    { key: 'career', label: '事业财运', icon: Briefcase, data: sampleShengxiaoReport.career },
                    { key: 'family', label: '家庭观念', icon: Home, data: sampleShengxiaoReport.family },
                    { key: 'health', label: '健康运势', icon: Shield, data: sampleShengxiaoReport.health },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-4 bg-dark-400 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Icon className={`w-5 h-5 mr-2 ${item.data.score >= 80 ? 'text-green-500' : item.data.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`} />
                            <span className="font-bold text-ink-100">{item.label}</span>
                          </div>
                          <span className={`text-lg font-bold ${item.data.score >= 80 ? 'text-green-400' : item.data.score >= 60 ? 'text-yellow-600' : 'text-red-400'}`}>{item.data.score}分</span>
                        </div>
                        <div className="w-full h-2 bg-dark-200 rounded-full overflow-hidden mb-3">
                          <div
                            className={`h-full rounded-full ${item.data.score >= 80 ? 'bg-green-500' : item.data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${item.data.score}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-ink-300 leading-relaxed mb-3">{item.data.detail}</p>
                        <div className="p-2.5 bg-blue-500/10 rounded-lg">
                          <div className="text-xs font-medium text-blue-400 mb-1 flex items-center">
                            <Info className="w-3.5 h-3.5 mr-1" />
                            改善建议
                          </div>
                          <p className="text-xs text-blue-400 leading-relaxed">{item.data.advice}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 相处建议 */}
              <div className="p-5 bg-blue-500/10 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-400 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  相处建议与化解方案
                </h4>
                <div className="space-y-3">
                  {sampleShengxiaoReport.suggestions.map((s, i) => (
                    <div key={i} className="p-3 bg-dark-400 rounded-lg flex items-start">
                      <span className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-ink-200 leading-relaxed pt-0.5">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 吉凶年份 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-400 mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    吉祥年份
                  </h4>
                  <div className="space-y-3">
                    {sampleShengxiaoReport.luckyYears.map((ly, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                          <span className="font-bold text-green-400">{ly.year}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">吉祥</span>
                        </div>
                        <p className="text-xs text-green-400 leading-relaxed">{ly.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-red-500/10 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-400 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    需注意的年份
                  </h4>
                  <div className="space-y-3">
                    {sampleShengxiaoReport.crisisYears.map((cy, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-red-400">{cy.year}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            cy.level === '高危' ? 'bg-red-200 text-red-800' :
                            cy.level === '中危' ? 'bg-orange-200 text-orange-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>{cy.level}</span>
                        </div>
                        <p className="text-xs text-red-400 leading-relaxed mb-2">{cy.desc}</p>
                        <div className="text-xs text-green-400 bg-green-500/10 rounded p-2">
                          💡 {cy.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 风水与吉祥物 */}
              <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-400 mb-4 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  风水调和与吉祥物
                </h4>
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">卧室风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{sampleShengxiaoReport.fengshui.bedroom}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">客厅风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{sampleShengxiaoReport.fengshui.livingRoom}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">厨房风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{sampleShengxiaoReport.fengshui.kitchen}</p>
                  </div>
                </div>
                <div className="border-t border-amber-200 pt-4">
                  <div className="text-sm font-medium text-amber-400 mb-3">推荐吉祥物</div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {sampleShengxiaoReport.mascots.map((m, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg text-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-ink-100 mb-1">{m.name}</div>
                        <div className="text-xs text-ink-500 mb-1">{m.effect}</div>
                        <div className="text-xs text-amber-400">{m.position}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 优势与挑战 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    核心优势
                  </h4>
                  <div className="space-y-2">
                    {sampleShengxiaoReport.strengths.map((s, i) => (
                      <div key={i} className="text-sm text-green-400 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-orange-500/10 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-400 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    需注意的问题
                  </h4>
                  <div className="space-y-2">
                    {sampleShengxiaoReport.weaknesses.map((w, i) => (
                      <div key={i} className="text-sm text-orange-400 flex items-start">
                        <span className="text-orange-500 mr-2">⚠</span>
                        <span className="leading-relaxed">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 总结祝福 */}
              <div className="p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200 text-center">
                <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3 fill-pink-100" />
                <p className="text-ink-200 leading-relaxed mb-3">
                  <span className="font-bold text-pink-400">温馨提示：</span>
                  生肖配对只是参考，婚姻的幸福关键在于双方的用心经营。
                  愿你们珍惜彼此，携手共创美好未来！
                </p>
                <Link to="/vip" className="inline-flex items-center btn-primary text-sm px-6">
                  <Crown className="w-4 h-4 mr-1" />
                  开通会员查看您的专属报告
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

// ===== 八字合婚 =====
// 完整报告示例数据（预览用）
const sampleFullReport = {
  overallScore: 82,
  level: '上等',
  maleInfo: {
    name: '男方（示例）',
    birth: '1990年6月15日 午时',
    shengXiao: '马',
    pillars: [
      { gan: '庚', zhi: '午' },
      { gan: '壬', zhi: '午' },
      { gan: '甲', zhi: '辰' },
      { gan: '庚', zhi: '午' },
    ],
    dayMaster: '甲木',
    wuxing: { 金: 2, 木: 2, 水: 2, 火: 3, 土: 2 },
    usefulGod: '水、木',
    pattern: '食神生财格',
  },
  femaleInfo: {
    name: '女方（示例）',
    birth: '1993年9月28日 卯时',
    shengXiao: '鸡',
    pillars: [
      { gan: '癸', zhi: '酉' },
      { gan: '辛', zhi: '酉' },
      { gan: '丁', zhi: '丑' },
      { gan: '癸', zhi: '卯' },
    ],
    dayMaster: '丁火',
    wuxing: { 金: 3, 木: 2, 水: 3, 火: 2, 土: 2 },
    usefulGod: '木、火',
    pattern: '偏财格',
  },
  fiveElements: {
    score: 85,
    summary: '双方五行互补性强，男方火旺缺水，女方水旺缺火，水火既济，阴阳调和，是难得的五行佳配。',
    details: [
      '男方甲木日主，生于午月，火旺木相，五行中火稍旺，喜水来滋润，金来修剪',
      '女方丁火日主，生于酉月，金旺火囚，五行中金水偏旺，喜木火来生助',
      '男方火旺可补女方火之不足，女方水旺可润男方火之燥热，水火既济，阴阳平衡',
      '双方五行互补，男方需水女方水旺，女方需木男方木有余，互相补益，相得益彰',
    ]
  },
  tenGods: {
    score: 78,
    summary: '男方对女方为正印，女方对男方为伤官，十神关系有生有泄，相处中女方较为主动，男方较为包容。',
    maleView: '女方对男方而言是伤官，代表女方聪明活泼，能给男方带来快乐和新鲜感，但有时也会让男方感到压力',
    femaleView: '男方对女方而言是正印，代表男方稳重可靠，能给女方带来安全感和依靠，是女方的贵人',
  },
  dimensions: {
    character: {
      score: 80,
      title: '性格匹配',
      detail: '男方甲木日主，性格正直善良，有上进心，做事认真负责，但有时过于固执；女方丁火日主，性格热情开朗，聪明伶俐，善于表达，但有时容易冲动。两人性格一静一动，一刚一柔，互补性强。',
      advice: '男方要学会灵活变通，不要太固执；女方要学会控制情绪，不要太冲动。多倾听对方的想法，互相理解包容。'
    },
    emotion: {
      score: 85,
      title: '感情匹配',
      detail: '双方日支辰丑相破，感情基础尚可，虽然偶尔会有小摩擦，但整体感情深厚。月柱壬午与辛酉，天干壬辛相生，地支午酉相破，说明感情发展有波折，但最终能修成正果。',
      advice: '多制造浪漫惊喜，保持感情新鲜感；遇到问题及时沟通，不要冷战；共同回忆美好时光，增进感情。'
    },
    career: {
      score: 78,
      title: '事业财运',
      detail: '男方年柱庚午，女方年柱癸酉，天干庚癸相生，说明双方事业上能互相支持。男方食神生财，有经商天赋；女方偏财格，财运较好。两人结合后财运会稳步上升。',
      advice: '可以考虑共同创业或投资，但要注意明确分工，避免因利益产生矛盾；财务公开透明，建立共同储蓄。'
    },
    family: {
      score: 82,
      title: '家庭观念',
      detail: '双方年支午酉相破，家庭背景和成长环境有所不同，家庭观念存在一定差异。但双方都是重视家庭的人，愿意为家庭付出。婚后需要一段时间磨合家庭观念。',
      advice: '尊重对方的家庭和成长背景；遇到家庭事务共同商量，不要独断专行；定期家庭会议，增进家人之间的沟通。'
    },
    health: {
      score: 75,
      title: '健康运势',
      detail: '男方火旺，要注意心脏、血压方面的问题；女方金水旺，要注意肾脏、呼吸系统方面的问题。双方五行互补，对健康有一定的调节作用，但也要注意保养。',
      advice: '一起运动健身，养成良好的生活习惯；饮食均衡，不要暴饮暴食；定期体检，早发现早治疗。'
    },
  },
  suggestions: [
    '互相尊重是基础，尊重对方的个性、爱好和朋友圈，给彼此留一定的私人空间',
    '有效沟通是关键，遇到问题及时沟通，不要冷战，也不要翻旧账，就事论事',
    '共同成长很重要，一起学习新技能，一起旅行看世界，保持对生活的热情',
    '财务管理要透明，建立家庭共同账户，大额支出共同商量，避免因钱伤感情',
    '仪式感不能少，记住重要纪念日，偶尔制造小浪漫，为感情保鲜',
    '包容理解是智慧，人无完人，多看对方的优点，包容对方的缺点，互相成就',
  ],
  crisisYears: [
    { year: '2026', level: '中危', desc: '丙午年，与男方日柱天克地冲，事业家庭压力较大，容易因琐事争吵', suggestion: '建议多外出旅行散心，保持沟通，互相体谅' },
    { year: '2028', level: '低危', desc: '戊申年，与女方月柱相合，感情总体平稳，但要注意第三方干扰', suggestion: '加强信任，多陪伴对方，共同参与家庭活动' },
    { year: '2030', level: '高危', desc: '庚戌年，与双方命局均有冲克，是婚姻的一道坎，需格外注意', suggestion: '建议佩戴吉祥物化解，可一起做公益积累福报' },
    { year: '2033', level: '中危', desc: '癸丑年，与男方年柱相合，与女方日柱相冲，感情波动较大', suggestion: '换位思考，多站在对方角度想问题，避免硬碰硬' },
  ],
  luckyYears: [
    { year: '2025', desc: '乙巳年，双方运势皆佳，适合置业、生子、创业', },
    { year: '2027', desc: '丁未年，与女方日主比和，财运亨通，家庭和睦', },
    { year: '2032', desc: '壬子年，水木相生，双方事业更上一层楼', },
  ],
  fengshui: {
    bedroom: '卧室宜选在房屋的东南方或西南方，有利于感情稳定；床头宜朝东或朝南，不宜朝西；卧室颜色以暖色调为主，避免过多冷色',
    livingRoom: '客厅宜明亮通透，可摆放粉晶、鸳鸯等吉祥物增进感情；沙发宜靠实墙，背后不宜靠窗或门',
    kitchen: '厨房要保持干净整洁，灶台和水槽不宜正对（水火相冲）；可摆放绿植增加生气',
    mascots: [
      { name: '粉晶七星阵', effect: '增进感情，促进姻缘和谐', position: '卧室床头柜' },
      { name: '鸳鸯摆件', effect: '促进夫妻恩爱，白头偕老', position: '客厅西南角' },
      { name: '和合二仙画像', effect: '化解矛盾，促进家庭和睦', position: '卧室墙面' },
    ],
    wear: [
      { item: '翡翠玉佩', material: '翡翠', effect: '保平安，增进感情运' },
      { item: '粉晶手链', material: '粉晶', effect: '旺桃花，稳固感情' },
    ],
  },
  summary: {
    strengths: [
      '五行互补性强，水火既济，阴阳平衡，对彼此运势有助益',
      '性格一动一静，一刚一柔，互补性强，相处有乐趣',
      '感情基础深厚，双方都是重感情的人，对婚姻认真负责',
      '事业财运能互相支持，婚后财运稳步上升',
    ],
    weaknesses: [
      '家庭观念有差异，需要时间磨合',
      '女方性子较急，男方较固执，容易因意见不合产生矛盾',
      '健康方面各有薄弱环节，需要共同注意保养',
      '未来几年有几个危机年份需要格外注意',
    ],
    conclusion: '总体而言，这是一对上等婚配，综合匹配度82分。双方五行互补，性格互补，感情基础扎实，虽然存在一些差异和挑战，但只要用心经营，互相包容理解，一定能够白头偕老，幸福美满。婚姻需要两个人共同努力，好的匹配是基础，更重要的是婚后的经营和珍惜。',
  }
};

function BaziHehunSection() {
  const [formData, setFormData] = useState({
    mYear: '', mMonth: '', mDay: '', mHour: '',
    fYear: '', fMonth: '', fDay: '', fHour: '',
  });
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // 使用示例数据展示完整报告
  const displayData = unlocked ? sampleFullReport : null;

  const handleCalculate = () => {
    if (!formData.mYear || !formData.mMonth || !formData.mDay ||
        !formData.fYear || !formData.fMonth || !formData.fDay) return;

    const birth1 = {
      year: parseInt(formData.mYear),
      month: parseInt(formData.mMonth),
      day: parseInt(formData.mDay),
      hour: parseInt(formData.mHour) || 12,
      gender: '男'
    };
    const birth2 = {
      year: parseInt(formData.fYear),
      month: parseInt(formData.fMonth),
      day: parseInt(formData.fDay),
      hour: parseInt(formData.fHour) || 12,
      gender: '女'
    };

    const res = calculateHehun(birth1, birth2, 'marriage');
    setResult(res);
    setCalculated(true);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Heart className="w-6 h-6 text-pink-500 mr-2" />
          八字合婚
          <Crown className="w-5 h-5 text-gold-500 ml-2" />
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 男方 */}
          <div>
            <h3 className="font-bold text-ink-200 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              男方出生时间
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="text" placeholder="年" className="input-field text-center"
                    value={formData.mYear}
                    onChange={(e) => setFormData({...formData, mYear: e.target.value})}
                    maxLength={4}
                  />
                </div>
                <div>
                  <input
                    type="text" placeholder="月" className="input-field text-center"
                    value={formData.mMonth}
                    onChange={(e) => setFormData({...formData, mMonth: e.target.value})}
                    maxLength={2}
                  />
                </div>
                <div>
                  <input
                    type="text" placeholder="日" className="input-field text-center"
                    value={formData.mDay}
                    onChange={(e) => setFormData({...formData, mDay: e.target.value})}
                    maxLength={2}
                  />
                </div>
              </div>
              <select
                className="input-field w-full"
                value={formData.mHour}
                onChange={(e) => setFormData({...formData, mHour: e.target.value})}
              >
                <option value="">出生时辰（选填）</option>
                {['子时 23-1点', '丑时 1-3点', '寅时 3-5点', '卯时 5-7点',
                  '辰时 7-9点', '巳时 9-11点', '午时 11-13点', '未时 13-15点',
                  '申时 15-17点', '酉时 17-19点', '戌时 19-21点', '亥时 21-23点'
                ].map((h, i) => (
                  <option key={i} value={i}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 女方 */}
          <div>
            <h3 className="font-bold text-ink-200 mb-4 flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              女方出生时间
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="text" placeholder="年" className="input-field text-center"
                    value={formData.fYear}
                    onChange={(e) => setFormData({...formData, fYear: e.target.value})}
                    maxLength={4}
                  />
                </div>
                <div>
                  <input
                    type="text" placeholder="月" className="input-field text-center"
                    value={formData.fMonth}
                    onChange={(e) => setFormData({...formData, fMonth: e.target.value})}
                    maxLength={2}
                  />
                </div>
                <div>
                  <input
                    type="text" placeholder="日" className="input-field text-center"
                    value={formData.fDay}
                    onChange={(e) => setFormData({...formData, fDay: e.target.value})}
                    maxLength={2}
                  />
                </div>
              </div>
              <select
                className="input-field w-full"
                value={formData.fHour}
                onChange={(e) => setFormData({...formData, fHour: e.target.value})}
              >
                <option value="">出生时辰（选填）</option>
                {['子时 23-1点', '丑时 1-3点', '寅时 3-5点', '卯时 5-7点',
                  '辰时 7-9点', '巳时 9-11点', '午时 11-13点', '未时 13-15点',
                  '申时 15-17点', '酉时 17-19点', '戌时 19-21点', '亥时 21-23点'
                ].map((h, i) => (
                  <option key={i} value={i}>{h}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button onClick={handleCalculate} className="btn-primary w-full mt-6 flex items-center justify-center">
          <Sparkles className="w-4 h-4 mr-2" />
          开始合婚分析
        </button>
        <p className="text-xs text-ink-500 text-center mt-3">
          免费展示：综合匹配度概览；会员解锁：完整八字分析、十神互补、大运流年、化解建议
        </p>
      </div>

      {calculated && result && (
        <div className="card p-8">
          {/* 总分 */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              {result.overallScore}
            </div>
            <div className="text-ink-500 mb-2">综合匹配度</div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              result.level === '上等' ? 'bg-green-500/20 text-green-400' :
              result.level === '中等' ? 'bg-yellow-500/20 text-yellow-700' :
              'bg-red-500/20 text-red-400'
            }`}>
              {result.level}婚配
            </span>
          </div>

          {/* 五维评分 */}
          <div className="space-y-3 mb-8">
            {Object.entries(result.dimensions).map(([key, dim], i) => {
              const labels = {
                character: '性格匹配', emotion: '感情匹配',
                career: '事业财运', family: '家庭观念', health: '健康运势'
              };
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-ink-300">{labels[key] || key}</span>
                    <span className="font-medium text-ink-100">{dim.score}分</span>
                  </div>
                  <div className="w-full h-2 bg-dark-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        dim.score >= 80 ? 'bg-green-500' :
                        dim.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dim.score}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 总评（免费可见） */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-ink-100 mb-2">总评</h4>
            <p className="text-sm text-ink-200 leading-relaxed">{result.summary}</p>
          </div>

          {/* 会员解锁内容 */}
          {!unlocked && (
            <div className="relative min-h-[360px]">
              <div className="opacity-30 blur-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-200 mb-2">五行互补分析</h4>
                    <p className="text-sm text-ink-500">{result.fiveElementsMatch?.desc || '...'}</p>
                  </div>
                  <div className="p-4 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-200 mb-2">十神互补分析</h4>
                    <p className="text-sm text-ink-500">{result.tenGodsAnalysis?.desc || '...'}</p>
                  </div>
                </div>
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">相处建议</h4>
                  <p className="text-sm text-ink-500">详细的相处建议和化解方案...</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-xl">
                  <h4 className="font-bold text-red-400 mb-2">需注意的年份</h4>
                  <p className="text-sm text-red-500">危机年份预警和化解方法...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center w-full shadow-2xl border border-dark-200" style={{ minWidth: '340px', maxWidth: '440px' }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-ink-100 font-bold text-xl mb-3">
                    解锁完整八字合婚报告
                  </h3>
                  <p className="text-sm text-ink-500 mb-6 leading-relaxed px-2">
                    四柱生克、十神互补、大运流年、相处建议、化解方案
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm px-6 py-2.5 w-full sm:w-auto order-2 sm:order-1">
                      预览完整效果
                    </button>
                    <Link to="/vip" className="btn-primary text-sm px-6 py-2.5 w-full sm:w-auto order-1 sm:order-2">
                      开通会员
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 已解锁 - 完整内容（示例数据） */}
          {unlocked && displayData && (
            <div className="space-y-5">
              {/* 示例标识 */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 flex items-center">
                <Sparkles className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-400">以下为完整报告示例内容</p>
                  <p className="text-xs text-amber-400">开通会员后可查看您和Ta的专属完整合婚报告</p>
                </div>
                <button
                  onClick={() => setUnlocked(false)}
                  className="ml-auto text-sm text-amber-400 hover:text-amber-400 underline"
                >
                  收起预览
                </button>
              </div>

              {/* 合婚总评 */}
              <div className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200">
                <div className="text-center mb-5">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                    {displayData.overallScore}
                  </div>
                  <div className="text-ink-500 mb-2">综合匹配度</div>
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400">
                    {displayData.level}婚配
                  </span>
                </div>
                <div className="text-sm text-ink-200 leading-relaxed bg-dark-400/60 rounded-lg p-4">
                  {displayData.summary.conclusion}
                </div>
              </div>

              {/* 双方八字排盘 */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-ink-100 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  双方八字排盘
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-400 rounded-lg">
                    <div className="text-sm font-bold text-blue-400 mb-3 flex items-center justify-between">
                      <span>{displayData.maleInfo.name}</span>
                      <span className="text-xs text-ink-500 font-normal">{displayData.maleInfo.birth}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center mb-3">
                      {['年柱', '月柱', '日柱', '时柱'].map((col, i) => (
                        <div key={i} className="p-2 bg-blue-500/10 rounded">
                          <div className="text-xs text-ink-500 mb-1">{col}</div>
                          <div className="text-lg font-bold text-ink-100">{displayData.maleInfo.pillars[i].gan}</div>
                          <div className="text-lg font-bold text-blue-400">{displayData.maleInfo.pillars[i].zhi}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-ink-300">日主：<span className="font-medium text-ink-100">{displayData.maleInfo.dayMaster}</span></div>
                      <div className="text-ink-300">生肖：<span className="font-medium text-ink-100">{displayData.maleInfo.shengXiao}</span></div>
                      <div className="text-ink-300">喜用神：<span className="font-medium text-ink-100">{displayData.maleInfo.usefulGod}</span></div>
                      <div className="text-ink-300">格局：<span className="font-medium text-ink-100">{displayData.maleInfo.pattern}</span></div>
                    </div>
                  </div>
                  <div className="p-4 bg-dark-400 rounded-lg">
                    <div className="text-sm font-bold text-pink-400 mb-3 flex items-center justify-between">
                      <span>{displayData.femaleInfo.name}</span>
                      <span className="text-xs text-ink-500 font-normal">{displayData.femaleInfo.birth}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center mb-3">
                      {['年柱', '月柱', '日柱', '时柱'].map((col, i) => (
                        <div key={i} className="p-2 bg-pink-500/10 rounded">
                          <div className="text-xs text-ink-500 mb-1">{col}</div>
                          <div className="text-lg font-bold text-ink-100">{displayData.femaleInfo.pillars[i].gan}</div>
                          <div className="text-lg font-bold text-pink-400">{displayData.femaleInfo.pillars[i].zhi}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-ink-300">日主：<span className="font-medium text-ink-100">{displayData.femaleInfo.dayMaster}</span></div>
                      <div className="text-ink-300">生肖：<span className="font-medium text-ink-100">{displayData.femaleInfo.shengXiao}</span></div>
                      <div className="text-ink-300">喜用神：<span className="font-medium text-ink-100">{displayData.femaleInfo.usefulGod}</span></div>
                      <div className="text-ink-300">格局：<span className="font-medium text-ink-100">{displayData.femaleInfo.pattern}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 五行互补分析 */}
              <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                <h4 className="font-bold text-green-400 mb-3 flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  五行互补分析
                  <span className="ml-auto text-sm font-normal bg-green-200 text-green-800 px-3 py-0.5 rounded-full">{displayData.fiveElements.score}分</span>
                </h4>
                <p className="text-sm text-green-400 leading-relaxed mb-4">{displayData.fiveElements.summary}</p>
                <div className="grid grid-cols-5 gap-2 text-center text-xs mb-4">
                  {['金', '木', '水', '火', '土'].map((wx, i) => (
                    <div key={i} className="p-2 bg-dark-400 rounded-lg">
                      <div className="text-ink-500 mb-1">{wx}</div>
                      <div className="text-ink-200 font-medium">{displayData.maleInfo.wuxing[wx]} : {displayData.femaleInfo.wuxing[wx]}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-ink-500 text-center mb-3">（男 : 女）</div>
                <div className="border-t border-green-200 pt-3 space-y-2">
                  {displayData.fiveElements.details.map((item, i) => (
                    <div key={i} className="text-sm text-green-400 flex items-start">
                      <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 十神互补分析 */}
              <div className="p-5 bg-purple-500/10 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-400 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  十神互补分析
                  <span className="ml-auto text-sm font-normal bg-purple-200 text-purple-800 px-3 py-0.5 rounded-full">{displayData.tenGods.score}分</span>
                </h4>
                <p className="text-sm text-purple-400 leading-relaxed mb-4">{displayData.tenGods.summary}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-blue-400 mb-1">男方视角</div>
                    <p className="text-xs text-ink-300 leading-relaxed">{displayData.tenGods.maleView}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-pink-400 mb-1">女方视角</div>
                    <p className="text-xs text-ink-300 leading-relaxed">{displayData.tenGods.femaleView}</p>
                  </div>
                </div>
              </div>

              {/* 五维深度解析 */}
              <div className="p-5 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-200 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  五维深度解析
                </h4>
                <div className="space-y-4">
                  {Object.entries(displayData.dimensions).map(([key, dim], i) => {
                    const iconMap = {
                      character: UserCheck, emotion: Heart, career: Briefcase, family: Home, health: Shield
                    };
                    const Icon = iconMap[key] || Info;
                    return (
                      <div key={i} className="p-4 bg-dark-400 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Icon className={`w-5 h-5 mr-2 ${dim.score >= 80 ? 'text-green-500' : dim.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`} />
                            <span className="font-bold text-ink-100">{dim.title}</span>
                          </div>
                          <span className={`text-lg font-bold ${dim.score >= 80 ? 'text-green-400' : dim.score >= 60 ? 'text-yellow-600' : 'text-red-400'}`}>{dim.score}分</span>
                        </div>
                        <div className="w-full h-2 bg-dark-200 rounded-full overflow-hidden mb-3">
                          <div
                            className={`h-full rounded-full ${dim.score >= 80 ? 'bg-green-500' : dim.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${dim.score}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-ink-300 leading-relaxed mb-3">{dim.detail}</p>
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                          <div className="text-xs font-medium text-blue-400 mb-1 flex items-center">
                            <Info className="w-3.5 h-3.5 mr-1" />
                            改善建议
                          </div>
                          <p className="text-xs text-blue-400 leading-relaxed">{dim.advice}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 相处建议 */}
              <div className="p-5 bg-blue-500/10 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-400 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  相处建议与化解方案
                </h4>
                <div className="space-y-3">
                  {displayData.suggestions.map((s, i) => (
                    <div key={i} className="p-3 bg-dark-400 rounded-lg flex items-start">
                      <span className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-ink-200 leading-relaxed pt-0.5">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 吉凶年份 */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* 需注意的年份 */}
                <div className="p-5 bg-red-500/10 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-400 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    需注意的年份
                  </h4>
                  <div className="space-y-3">
                    {displayData.crisisYears.map((cy, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-red-400">{cy.year}年</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            cy.level === '高危' ? 'bg-red-200 text-red-800' :
                            cy.level === '中危' ? 'bg-orange-200 text-orange-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>{cy.level}</span>
                        </div>
                        <p className="text-xs text-red-400 leading-relaxed mb-2">{cy.desc}</p>
                        <div className="text-xs text-green-400 bg-green-500/10 rounded p-2">
                          💡 {cy.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 吉祥年份 */}
                <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-400 mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    吉祥年份
                  </h4>
                  <div className="space-y-3">
                    {displayData.luckyYears.map((ly, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                          <span className="font-bold text-green-400">{ly.year}年</span>
                          <span className="ml-2 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">吉祥</span>
                        </div>
                        <p className="text-xs text-green-400 leading-relaxed">{ly.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 风水调和建议 */}
              <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-400 mb-4 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  风水调和建议
                </h4>
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">卧室风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{displayData.fengshui.bedroom}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">客厅风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{displayData.fengshui.livingRoom}</p>
                  </div>
                  <div className="p-3 bg-dark-400 rounded-lg">
                    <div className="text-xs font-medium text-ink-200 mb-2">厨房风水</div>
                    <p className="text-xs text-ink-500 leading-relaxed">{displayData.fengshui.kitchen}</p>
                  </div>
                </div>
                <div className="border-t border-amber-200 pt-4">
                  <div className="text-sm font-medium text-amber-400 mb-3">推荐吉祥物</div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {displayData.fengshui.mascots.map((m, i) => (
                      <div key={i} className="p-3 bg-dark-400 rounded-lg text-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-ink-100 mb-1">{m.name}</div>
                        <div className="text-xs text-ink-500 mb-1">{m.effect}</div>
                        <div className="text-xs text-amber-400">摆放：{m.position}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 优势与挑战总结 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    核心优势
                  </h4>
                  <div className="space-y-2">
                    {displayData.summary.strengths.map((s, i) => (
                      <div key={i} className="text-sm text-green-400 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-orange-500/10 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-400 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    需注意的问题
                  </h4>
                  <div className="space-y-2">
                    {displayData.summary.weaknesses.map((w, i) => (
                      <div key={i} className="text-sm text-orange-400 flex items-start">
                        <span className="text-orange-500 mr-2">⚠</span>
                        <span className="leading-relaxed">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 总结祝福 */}
              <div className="p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200 text-center">
                <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3 fill-pink-100" />
                <p className="text-ink-200 leading-relaxed mb-3">
                  <span className="font-bold text-pink-400">温馨提示：</span>
                  八字合婚只是参考，婚姻的幸福关键在于双方的用心经营。
                  愿你们珍惜彼此，携手共创美好未来！
                </p>
                <Link to="/vip" className="inline-flex items-center btn-primary text-sm px-6">
                  <Crown className="w-4 h-4 mr-1" />
                  开通会员查看您的专属报告
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== 合伙合盘 =====
function PartnerSection() {
  const [formData, setFormData] = useState({
    p1Year: '', p1Month: '', p1Day: '',
    p2Year: '', p2Month: '', p2Day: '',
  });
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    if (!formData.p1Year || !formData.p2Year) return;

    const birth1 = {
      year: parseInt(formData.p1Year) || 1990,
      month: parseInt(formData.p1Month) || 6,
      day: parseInt(formData.p1Day) || 15,
      hour: 12, gender: '男'
    };
    const birth2 = {
      year: parseInt(formData.p2Year) || 1990,
      month: parseInt(formData.p2Month) || 6,
      day: parseInt(formData.p2Day) || 15,
      hour: 12, gender: '男'
    };

    const res = calculateHehun(birth1, birth2, 'partner');
    setResult(res);
    setCalculated(true);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Handshake className="w-6 h-6 text-blue-500 mr-2" />
          合伙人合盘
          <Crown className="w-5 h-5 text-gold-500 ml-2" />
        </h2>
        <p className="text-sm text-ink-500 mb-6">
          分析双方事业财运匹配度、合作风险评估，为您的合作决策提供参考
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-ink-200 mb-4">合伙人A</h3>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder="年" className="input-field text-center"
                value={formData.p1Year}
                onChange={(e) => setFormData({...formData, p1Year: e.target.value})}
                maxLength={4} />
              <input type="text" placeholder="月" className="input-field text-center"
                value={formData.p1Month}
                onChange={(e) => setFormData({...formData, p1Month: e.target.value})}
                maxLength={2} />
              <input type="text" placeholder="日" className="input-field text-center"
                value={formData.p1Day}
                onChange={(e) => setFormData({...formData, p1Day: e.target.value})}
                maxLength={2} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-ink-200 mb-4">合伙人B</h3>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder="年" className="input-field text-center"
                value={formData.p2Year}
                onChange={(e) => setFormData({...formData, p2Year: e.target.value})}
                maxLength={4} />
              <input type="text" placeholder="月" className="input-field text-center"
                value={formData.p2Month}
                onChange={(e) => setFormData({...formData, p2Month: e.target.value})}
                maxLength={2} />
              <input type="text" placeholder="日" className="input-field text-center"
                value={formData.p2Day}
                onChange={(e) => setFormData({...formData, p2Day: e.target.value})}
                maxLength={2} />
            </div>
          </div>
        </div>

        <button onClick={handleCalculate} className="btn-primary w-full mt-6">
          <Briefcase className="w-4 h-4 inline mr-2" />
          分析合作运势
        </button>
      </div>

      {calculated && result && (
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-400 mb-2">{result.overallScore}</div>
            <div className="text-ink-500 mb-2">合作匹配度</div>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              result.overallScore >= 80 ? 'bg-green-500/20 text-green-400' :
              result.overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-700' :
              'bg-red-500/20 text-red-400'
            }`}>
              {result.level}合作
            </span>
          </div>

          <div className="relative">
            <div className="opacity-30 blur-sm space-y-4">
              <div className="p-4 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-200 mb-2">合作优势</h4>
                <p className="text-sm text-ink-500">双方事业运势互补分析...</p>
              </div>
              <div className="p-4 bg-red-500/10 rounded-xl">
                <h4 className="font-bold text-red-400 mb-2">合作风险</h4>
                <p className="text-sm text-red-500">破财风险、合作时长建议...</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/vip" className="btn-primary">
                <Lock className="w-4 h-4 mr-2" />
                会员解锁完整分析
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 亲子缘分 =====
function QinziSection() {
  const [formData, setFormData] = useState({
    parentYear: '', childYear: '', parentGender: '男', childGender: '男'
  });
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    if (!formData.parentYear || !formData.childYear) return;

    const birth1 = {
      year: parseInt(formData.parentYear) || 1985,
      month: 6, day: 15, hour: 12,
      gender: formData.parentGender
    };
    const birth2 = {
      year: parseInt(formData.childYear) || 2015,
      month: 6, day: 15, hour: 12,
      gender: formData.childGender
    };

    const res = calculateHehun(birth1, birth2, 'parent-child');
    setResult(res);
    setCalculated(true);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Baby className="w-6 h-6 text-green-500 mr-2" />
          亲子缘分测算
          <Crown className="w-5 h-5 text-gold-500 ml-2" />
        </h2>
        <p className="text-sm text-ink-500 mb-6">
          分析亲子缘分深浅、相处模式、子女发展方向，为家庭教育提供参考
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-ink-200 mb-4">父母</h3>
            <div className="space-y-3">
              <select className="input-field w-full" value={formData.parentGender}
                onChange={(e) => setFormData({...formData, parentGender: e.target.value})}>
                <option value="男">父亲</option>
                <option value="女">母亲</option>
              </select>
              <input type="text" placeholder="出生年份" className="input-field"
                value={formData.parentYear}
                onChange={(e) => setFormData({...formData, parentYear: e.target.value})}
                maxLength={4} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-ink-200 mb-4">子女</h3>
            <div className="space-y-3">
              <select className="input-field w-full" value={formData.childGender}
                onChange={(e) => setFormData({...formData, childGender: e.target.value})}>
                <option value="男">儿子</option>
                <option value="女">女儿</option>
              </select>
              <input type="text" placeholder="出生年份" className="input-field"
                value={formData.childYear}
                onChange={(e) => setFormData({...formData, childYear: e.target.value})}
                maxLength={4} />
            </div>
          </div>
        </div>

        <button onClick={handleCalculate} className="btn-primary w-full mt-6">
          <Home className="w-4 h-4 inline mr-2" />
          查看亲子缘分
        </button>
      </div>

      {calculated && result && (
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-green-400 mb-2">{result.overallScore}</div>
            <div className="text-ink-500 mb-2">亲子缘分指数</div>
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
              {result.level}
            </span>
          </div>

          <div className="relative">
            <div className="opacity-30 blur-sm space-y-4">
              <div className="p-4 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-200 mb-2">子女宫解读</h4>
                <p className="text-sm text-ink-500">子女运势、发展方向...</p>
              </div>
              <div className="p-4 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-200 mb-2">相处模式</h4>
                <p className="text-sm text-ink-500">亲子关系特点、沟通方式...</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-xl">
                <h4 className="font-bold text-green-400 mb-2">教育建议</h4>
                <p className="text-sm text-green-400">因材施教的教育方法...</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/vip" className="btn-primary">
                <Lock className="w-4 h-4 mr-2" />
                会员解锁完整分析
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 合婚知识 =====
function KnowledgeSection() {
  const [activeSubTab, setActiveSubTab] = useState('knowledge');

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveSubTab('knowledge')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'knowledge'
                ? 'bg-primary-500 text-white'
                : 'bg-dark-200 text-ink-300 hover:bg-dark-300'
            }`}
          >
            合婚知识
          </button>
          <button
            onClick={() => setActiveSubTab('tips')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'tips'
                ? 'bg-green-500 text-white'
                : 'bg-dark-200 text-ink-300 hover:bg-dark-300'
            }`}
          >
            合婚小贴士
          </button>
        </div>

        {activeSubTab === 'knowledge' && (
          <div className="grid md:grid-cols-2 gap-4">
            {HEHUN_KNOWLEDGE.map((item, i) => (
              <div key={i} className="p-5 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-100 mb-2 flex items-center">
                  <Info className="w-4 h-4 text-primary-500 mr-2" />
                  {item.title}
                </h4>
                <p className="text-sm text-ink-300 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-4">
            {HEHUN_TIPS.map((tip, i) => (
              <div key={i} className="p-5 bg-green-500/10 rounded-xl border border-green-100">
                <h4 className="font-bold text-green-400 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {tip.title}
                </h4>
                <p className="text-sm text-green-400 leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
