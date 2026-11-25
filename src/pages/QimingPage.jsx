import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PenTool, User, Crown, Lock, ChevronRight, Sparkles,
  Baby, Store, Monitor, Award, AlertTriangle, Info,
  RefreshCw, Heart, Star, BookOpen, Shield
} from 'lucide-react';
import {
  generateNames,
  generateShopNames,
  NAMING_TIPS,
  NAMING_TABOOS,
  getIndustries,
} from '../data/naming';
import { calculateWuge, getLuckLevel, getScoreSummary } from '../data/wuge';

const namingTypes = [
  { id: 'baby', name: '宝宝起名', icon: Baby, desc: '根据生辰八字，为宝宝取一个吉祥好名' },
  { id: 'adult', name: '成人改名', icon: User, desc: '结合命理，改个好名提升运势' },
  { id: 'shop', name: '店铺取名', icon: Store, desc: '生意兴隆，财源广进的好店名' },
  { id: 'nickname', name: '网名测算', icon: Monitor, desc: '测测你的网名运势如何' },
];

export default function QimingPage() {
  const [activeTab, setActiveTab] = useState('score'); // score, baby, shop, knowledge

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium mb-4">
            <PenTool className="w-4 h-4 mr-2" />
            起名改名
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">智能起名系统</h1>
          <p className="text-ink-400 max-w-2xl mx-auto">
            结合八字喜用神、五格数理、音形寓意，为您量身定制好名字
          </p>
        </div>

        {/* Tab 导航 */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-dark-200 p-1">
            {[
              { id: 'score', name: '五格打分', icon: Award, free: true },
              { id: 'baby', name: '宝宝起名', icon: Baby, free: false },
              { id: 'shop', name: '店铺取名', icon: Store, free: false },
              { id: 'knowledge', name: '起名知识', icon: BookOpen, free: true },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-dark-400 text-ink-100 shadow-sm'
                      : 'text-ink-400 hover:text-ink-200'
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

        {/* 五格打分 */}
        {activeTab === 'score' && <WugeScoreSection />}

        {/* 宝宝起名 */}
        {activeTab === 'baby' && <BabyNamingSection />}

        {/* 店铺取名 */}
        {activeTab === 'shop' && <ShopNamingSection />}

        {/* 起名知识 */}
        {activeTab === 'knowledge' && <KnowledgeSection />}

        {/* 会员推广 */}
        <div className="mt-12 bg-gradient-to-r from-gold-50 to-primary-50 rounded-2xl p-6 border border-gold-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-100 mb-1">开通会员，解锁全部起名功能</h3>
              <p className="text-sm text-ink-300">宝宝起名、成人改名、店铺取名、网名测算全部开放</p>
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

// ===== 五格打分 =====
function WugeScoreSection() {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('男');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!surname || !name) return;
    const res = calculateWuge(surname, name);
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Award className="w-6 h-6 text-gold-500 mr-2" />
          姓名五格打分
          <span className="badge-free ml-3">免费</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">姓氏</label>
            <input
              type="text"
              placeholder="请输入姓氏"
              className="input-field"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">名字</label>
            <input
              type="text"
              placeholder="请输入名字"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
            <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleCalculate} className="btn-primary w-full">
              立即打分
            </button>
          </div>
        </div>
        <p className="text-xs text-ink-500 text-center">
          免费输出：总分 + 五格吉凶，五行匹配度、命格适配分析仅会员可见
        </p>
      </div>

      {result && (
        <div className="card p-8">
          {/* 总分 */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-primary-500 mb-2">
              {result.totalScore}
            </div>
            <div className="text-ink-400 mb-2">综合评分</div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              result.totalScore >= 90 ? 'bg-green-500/20 text-green-400' :
              result.totalScore >= 70 ? 'bg-blue-500/20 text-blue-400' :
              result.totalScore >= 60 ? 'bg-yellow-500/20 text-yellow-700' :
              'bg-red-500/20 text-red-400'
            }`}>
              {getLuckLevel(result.totalScore)}
            </span>
          </div>

          {/* 五格详情 */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {[
              { key: 'tianGe', label: '天格' },
              { key: 'renGe', label: '人格' },
              { key: 'diGe', label: '地格' },
              { key: 'waiGe', label: '外格' },
              { key: 'zongGe', label: '总格' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-dark-300/50 rounded-xl">
                <div className="text-2xl font-bold text-ink-100 mb-1">{result.wuge[item.key].value}</div>
                <div className="text-sm text-ink-400 mb-1">{item.label}</div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  result.wuge[item.key].luck === '吉' ? 'bg-green-500/20 text-green-400' :
                  result.wuge[item.key].luck === '半吉' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {result.wuge[item.key].luck}
                </span>
              </div>
            ))}
          </div>

          {/* 简评 */}
          <div className="bg-gold-500/10 rounded-xl p-5 border border-gold-200">
            <h3 className="font-bold text-ink-100 mb-2">简评</h3>
            <p className="text-sm text-ink-300 leading-relaxed">{getScoreSummary(result.totalScore)}</p>
          </div>

          {/* 会员解锁提示 */}
          <div className="relative mt-6">
            <div className="opacity-40 blur-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">五行匹配</h4>
                  <p className="text-sm text-ink-400">根据生辰八字分析名字五行补益...</p>
                </div>
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">音形寓意</h4>
                  <p className="text-sm text-ink-400">读音分析、字形结构、寓意深度解析...</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/vip" className="btn-primary">
                <Lock className="w-4 h-4 mr-2" />
                会员解锁详细分析
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 宝宝起名 =====
function BabyNamingSection() {
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('男');
  const [favoriteWuxing, setFavoriteWuxing] = useState('');
  const [nameCount, setNameCount] = useState(2);
  const [results, setResults] = useState(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!surname) return;
    const res = generateNames(surname, gender, favoriteWuxing, nameCount);
    setResults(res);
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Baby className="w-6 h-6 text-pink-500 mr-2" />
          宝宝起名
          <Crown className="w-5 h-5 text-gold-500 ml-2" />
        </h2>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">姓氏</label>
            <input
              type="text"
              placeholder="请输入姓氏"
              className="input-field"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
            <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="男">男宝宝</option>
              <option value="女">女宝宝</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">喜用神五行</label>
            <select className="input-field" value={favoriteWuxing} onChange={(e) => setFavoriteWuxing(e.target.value)}>
              <option value="">选填</option>
              <option value="金">金</option>
              <option value="木">木</option>
              <option value="水">水</option>
              <option value="火">火</option>
              <option value="土">土</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">名字字数</label>
            <select className="input-field" value={nameCount} onChange={(e) => setNameCount(Number(e.target.value))}>
              <option value={1}>单字名</option>
              <option value={2}>双字名</option>
            </select>
          </div>
        </div>
        <button onClick={handleGenerate} className="btn-primary w-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 mr-2" />
          智能起名
        </button>
      </div>

      {generated && results && (
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-ink-100">推荐名字</h3>
            <button
              onClick={handleGenerate}
              className="text-sm text-primary-600 hover:underline flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              换一批
            </button>
          </div>

          <div className="space-y-3">
            {results.slice(0, 3).map((item, idx) => (
              <div key={idx} className="p-5 border border-dark-300 rounded-xl hover:border-gold-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-ink-100">
                      {surname}{item.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(item.overallScore / 20)
                              ? 'text-gold-500 fill-gold-500'
                              : 'text-ink-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gold-400 font-bold">{item.overallScore}分</span>
                  </div>
                </div>
                <p className="text-sm text-ink-300 mb-3">{item.meaning}</p>
                <div className="flex flex-wrap gap-2">
                  {item.categories?.slice(0, 4).map((cat, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded">
                      {cat}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">
                    五格 {item.wugeScore}分
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                    五行匹配 {item.wuxingMatch}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 会员解锁更多 */}
          <div className="relative mt-6">
            <div className="opacity-30 blur-sm space-y-3">
              {results.slice(3, 6).map((item, idx) => (
                <div key={idx} className="p-5 border border-dark-300 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl font-bold text-ink-100">{surname}{item.name}</span>
                    <span className="text-gold-400">{item.overallScore}分</span>
                  </div>
                  <p className="text-sm text-ink-300">{item.meaning}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
                <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
                <p className="text-ink-200 font-medium mb-2">更多好名字等你解锁</p>
                <p className="text-sm text-ink-400 mb-4">开通会员，获取20+精选名字及详细分析</p>
                <Link to="/vip" className="btn-primary">
                  开通会员查看
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 店铺取名 =====
function ShopNamingSection() {
  const [industry, setIndustry] = useState('');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [generated, setGenerated] = useState(false);

  const industries = getIndustries();

  const handleGenerate = () => {
    if (!industry) return;
    const res = generateShopNames(industry, { keyword });
    setResults(res);
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
          <Store className="w-6 h-6 text-green-400 mr-2" />
          店铺取名
          <Crown className="w-5 h-5 text-gold-500 ml-2" />
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">行业类型</label>
            <select className="input-field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value="">请选择行业</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-2">关键词（选填）</label>
            <input
              type="text"
              placeholder="想包含的字/词"
              className="input-field"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button onClick={handleGenerate} className="btn-primary w-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              生成店名
            </button>
          </div>
        </div>
      </div>

      {generated && results && (
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-ink-100">推荐店名</h3>
            <button
              onClick={handleGenerate}
              className="text-sm text-primary-600 hover:underline flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              换一批
            </button>
          </div>

          <div className="space-y-3">
            {results.slice(0, 3).map((item, idx) => (
              <div key={idx} className="p-5 border border-dark-300 rounded-xl hover:border-gold-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-ink-100">{item.name}</span>
                    <span className="text-gold-400 font-bold">{item.score}分</span>
                  </div>
                </div>
                <p className="text-sm text-ink-300 mb-3">{item.meaning}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features?.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-6">
            <div className="opacity-30 blur-sm space-y-3">
              {results.slice(3, 5).map((item, idx) => (
                <div key={idx} className="p-5 border border-dark-300 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl font-bold text-ink-100">{item.name}</span>
                    <span className="text-gold-400">{item.score}分</span>
                  </div>
                  <p className="text-sm text-ink-300">{item.meaning}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/vip" className="btn-primary">
                <Lock className="w-4 h-4 mr-2" />
                会员解锁更多店名
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 起名知识 =====
function KnowledgeSection() {
  const [activeSubTab, setActiveSubTab] = useState('tips');

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveSubTab('tips')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'tips'
                ? 'bg-primary-500 text-white'
                : 'bg-dark-200 text-ink-300 hover:bg-ink-200'
            }`}
          >
            起名技巧
          </button>
          <button
            onClick={() => setActiveSubTab('taboos')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'taboos'
                ? 'bg-red-500 text-white'
                : 'bg-dark-200 text-ink-300 hover:bg-ink-200'
            }`}
          >
            起名禁忌
          </button>
        </div>

        {activeSubTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-4">
            {NAMING_TIPS.map((tip, i) => (
              <div key={i} className="p-5 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-100 mb-2 flex items-center">
                  <Info className="w-4 h-4 text-primary-500 mr-2" />
                  {tip.title}
                </h4>
                <p className="text-sm text-ink-300 leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'taboos' && (
          <div className="grid md:grid-cols-2 gap-4">
            {NAMING_TABOOS.map((taboo, i) => (
              <div key={i} className="p-5 bg-red-500/10 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-400 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {taboo.title}
                </h4>
                <p className="text-sm text-red-400 leading-relaxed">{taboo.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 起名优势 */}
      <div className="bg-gradient-to-r from-gold-50 to-primary-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-ink-100 mb-8 font-serif text-center">为什么选择我们的起名系统？</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: '八字喜用', desc: '结合命局喜用神选字，补益命格' },
            { icon: PenTool, title: '五格数理', desc: '天格地格人格外格总格全吉' },
            { icon: Heart, title: '音形寓意', desc: '好听好写好记，寓意美好' },
            { icon: Shield, title: '批量生成', desc: '一键生成多组名字备选方案' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-dark-400 shadow-lg flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold-500" />
                </div>
                <h4 className="font-bold text-ink-100 mb-2">{item.title}</h4>
                <p className="text-sm text-ink-400">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
