import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Compass, Palette, Lock, Crown, ChevronRight,
  Building2, Bath, BookOpen, AlertTriangle, CheckCircle2,
  Star, ArrowRight, Info, Shield, Upload, Sparkles,
  Heart, DollarSign, Users, Droplets, Sun, X
} from 'lucide-react';
import {
  calculateDongXiMing,
  WUXING_COLORS,
  HOUSE_ZUOXIANG,
  calculateHouseFengshui,
  KITCHEN_FENGSHUI,
  BATHROOM_FENGSHUI,
  calculateKitchenFengshui,
  calculateBathroomFengshui,
  FENGSHUI_BASICS,
  FENGSHUI_TABOOS,
  ROOM_FENGSHUI,
  KITCHEN_TIPS,
  BATHROOM_TIPS,
} from '../data/fengshui';

// 工具函数：对象转数组
const objToArray = (obj) => Object.values(obj);

export default function FengshuiPage() {
  const [activeSection, setActiveSection] = useState('tools');
  const [showZuoxiang, setShowZuoxiang] = useState(false);
  const [showChuwe, setShowChuwe] = useState(false);
  const [showHuxing, setShowHuxing] = useState(false);

  const houseList = objToArray(HOUSE_ZUOXIANG);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 text-primary-600 rounded-full text-sm font-medium mb-4">
            <Home className="w-4 h-4 mr-2" />
            风水测算
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">风水堪舆</h1>
          <p className="text-ink-500 max-w-2xl mx-auto">
            传承古法八宅风水理论，结合现代家居环境，为您提供专业的风水布局建议
          </p>
        </div>

        {/* Tab 导航 */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-dark-200 p-1">
            {[
              { id: 'tools', name: '风水工具', icon: Compass },
              { id: 'knowledge', name: '风水知识', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeSection === tab.id
                      ? 'bg-dark-400 text-ink-100 shadow-sm'
                      : 'text-ink-500 hover:text-ink-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 风水工具板块 */}
        {activeSection === 'tools' && (
          <div className="space-y-12">
            {/* 免费基础查询 */}
            <section>
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                免费基础查询
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* 东西四命 */}
                <Link to="/tool/dongxi" className="card-hover p-6 block">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Home className="w-7 h-7 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-ink-100">东西四命测算</h3>
                        <span className="badge-free">免费</span>
                      </div>
                      <p className="text-sm text-ink-500 mb-2">输入出生年份性别，自动算出本命卦</p>
                      <p className="text-xs text-ink-500 mb-3">仅告知基础适配户型朝向，家居完整布局方案会员解锁</p>
                      <div className="flex items-center text-green-400 text-sm font-medium">
                        立即测算 <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 五行配色 */}
                <Link to="/tool/peise" className="card-hover p-6 block">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Palette className="w-7 h-7 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-ink-100">五行配色参考</h3>
                        <span className="badge-free">免费</span>
                      </div>
                      <p className="text-sm text-ink-500 mb-2">基础五行对应颜色搭配参考</p>
                      <p className="text-xs text-ink-500 mb-3">仅基础色卡展示，全屋定制配色方案会员专属</p>
                      <div className="flex items-center text-green-400 text-sm font-medium">
                        立即测算 <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* 住宅坐向吉凶 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ink-100 font-serif flex items-center">
                  <span className="w-1 h-6 bg-gold-500 rounded-full mr-3"></span>
                  住宅坐向吉凶
                  <Crown className="w-5 h-5 text-gold-500 ml-2" />
                </h2>
                <span className="text-xs text-ink-500">示例展示</span>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                {houseList.slice(0, 4).map((house, idx) => (
                  <div key={idx} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-ink-100 text-sm">{house.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        house.jixiongLevel === '吉' ? 'bg-green-500/20 text-green-400' :
                        house.jixiongLevel === '中吉' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {house.jixiongLevel}
                      </span>
                    </div>
                    <p className="text-xs text-ink-500 mb-2">五行属{house.element}</p>
                    <p className="text-sm text-ink-400 line-clamp-2">{house.advantages?.[0] || ''}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <span className="text-xs text-ink-500 block mb-3">以上为示例，点击下方按钮测算您的专属住宅坐向吉凶</span>
                <Link to="/fengshui/zuoxiang" className="btn-primary inline-flex items-center justify-center px-8">
                  立即测算
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </section>

            {/* 厨卫五行适配 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ink-100 font-serif flex items-center">
                  <span className="w-1 h-6 bg-gold-500 rounded-full mr-3"></span>
                  厨卫五行适配
                  <Crown className="w-5 h-5 text-gold-500 ml-2" />
                </h2>
                <span className="text-xs text-ink-500">示例展示</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-100">厨房风水</h3>
                      <p className="text-sm text-ink-500">8方位吉凶、灶台朝向、配色建议</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['东方吉', '南方平', '西方凶', '北方平'].map((item, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded ${
                        item.includes('吉') ? 'bg-green-500/10 text-green-400' :
                        item.includes('凶') ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>{item}</span>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="opacity-40 blur-sm">
                      <p className="text-sm text-ink-500">厨房灶台坐向、橱柜颜色搭配、布局禁忌详解...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link to="/vip" className="btn-primary text-sm py-2 px-5">
                        <Lock className="w-4 h-4 mr-1" />
                        会员解锁
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Bath className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-100">卫生间风水</h3>
                      <p className="text-sm text-ink-500">8方位吉凶、化解方法、配色建议</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['东方凶', '南方凶', '西方平', '北方吉'].map((item, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded ${
                        item.includes('吉') ? 'bg-green-500/10 text-green-400' :
                        item.includes('凶') ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>{item}</span>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="opacity-40 blur-sm">
                      <p className="text-sm text-ink-500">卫生间方位吉凶、化解方法、颜色搭配建议...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link to="/vip" className="btn-primary text-sm py-2 px-5">
                        <Lock className="w-4 h-4 mr-1" />
                        会员解锁
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-ink-500 block mb-3">以上为示例，点击下方按钮测算您的专属厨卫方位吉凶</span>
                <Link to="/fengshui/chuwei" className="btn-primary inline-flex items-center justify-center px-8">
                  立即测算
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </section>

            {/* 户型图AI解析 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ink-100 font-serif flex items-center">
                  <span className="w-1 h-6 bg-gold-500 rounded-full mr-3"></span>
                  户型图AI解析
                  <Crown className="w-5 h-5 text-gold-500 ml-2" />
                </h2>
                <span className="text-xs text-ink-500">示例展示</span>
              </div>

              <div className="card p-8 bg-gradient-to-br from-primary-500/10 to-gold-500/10 mb-4">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-400 to-primary-500 flex items-center justify-center">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-100 mb-3">AI智能户型风水分析</h3>
                  <p className="text-ink-400 mb-6">
                    上传户型图，AI自动识别户型结构，分析入户朝向吉凶、房间五行分布、
                    财位文昌位定位、缺角煞化解建议
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {['朝向分析', '财位定位', '缺角检测', '布局建议'].map((item, i) => (
                      <div key={i} className="bg-dark-400/80 rounded-lg p-3">
                        <div className="text-sm font-medium text-ink-200">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-ink-500 block mb-3">以上为功能展示，点击下方按钮开始上传户型图解析</span>
                <Link to="/fengshui/huxing" className="btn-primary inline-flex items-center justify-center px-8">
                  立即测算
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* 风水知识板块 */}
        {activeSection === 'knowledge' && (
          <div className="space-y-10">
            {/* 风水基础常识 */}
            <section>
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                风水基础常识
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {FENGSHUI_BASICS.map((item, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <Info className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-ink-100 mb-1">{item.title}</h4>
                        <p className="text-sm text-ink-400">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 常见风水禁忌 */}
            <section>
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <span className="w-1 h-6 bg-red-500 rounded-full mr-3"></span>
                常见风水禁忌与化解
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {FENGSHUI_TABOOS.map((item, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.level === '大凶' ? 'bg-red-500/20' : item.level === '中凶' ? 'bg-orange-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 ${
                          item.level === '大凶' ? 'text-red-400' : item.level === '中凶' ? 'text-orange-400' : 'text-yellow-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-ink-100">{item.taboo}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.level === '大凶' ? 'bg-red-500/20 text-red-400' : item.level === '中凶' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.level}
                          </span>
                        </div>
                        <p className="text-sm text-ink-400 mb-3">{item.description}</p>
                        <div className="bg-green-500/10 rounded-lg p-3">
                          <div className="flex items-center text-sm font-bold text-green-400 mb-2">
                            <Shield className="w-4 h-4 mr-1" />
                            化解方法
                          </div>
                          <ul className="space-y-1.5">
                            {item.resolve.map((method, idx) => (
                              <li key={idx} className="text-sm text-ink-300 flex items-start">
                                <span className="text-green-400 mr-2 mt-0.5">{idx === 0 ? '★' : `${idx + 1}.`}</span>
                                <span>{method}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 各空间风水要点 */}
            <section>
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                各空间风水要点
              </h2>
              <RoomFengshuiTabs />
            </section>
          </div>
        )}

        {/* 会员推广 */}
        <div className="mt-12 bg-gradient-to-r from-gold-500/10 to-primary-500/10 rounded-2xl p-6 border border-gold-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-100 mb-1">开通会员，解锁全部深度风水测算</h3>
              <p className="text-sm text-ink-400">户型AI解析、住宅坐向详批、厨卫布局方案、全屋配色...</p>
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

// 住宅坐向测算组件
function ZuoxiangCalculator({ houseList }) {
  const [zuoxiang, setZuoxiang] = useState('');
  const [dongximing, setDongximing] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!zuoxiang || !dongximing) return;
    const res = calculateHouseFengshui(zuoxiang, dongximing);
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-2">住宅坐向</label>
          <select value={zuoxiang} onChange={(e) => setZuoxiang(e.target.value)} className="input-field">
            <option value="">请选择坐向</option>
            {houseList.map((h, idx) => (
              <option key={idx} value={h.name}>{h.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-2">您的命卦</label>
          <select value={dongximing} onChange={(e) => setDongximing(e.target.value)} className="input-field">
            <option value="">请选择</option>
            <option value="东四命">东四命</option>
            <option value="西四命">西四命</option>
          </select>
          <p className="text-xs text-ink-500 mt-1">
            不确定？<Link to="/tool/dongxi" className="text-gold-400 hover:underline">先测本命卦</Link>
          </p>
        </div>
      </div>
      <button onClick={handleCalculate} className="btn-primary w-full">
        开始分析
      </button>

      {result && (
        <div className="relative">
          <div className="space-y-4 opacity-40 blur-sm">
            <div className="bg-gradient-to-r from-gold-500/10 to-primary-500/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-ink-100">宅命匹配度</span>
                <span className="text-2xl font-bold text-gold-400">{result.matchScore}分</span>
              </div>
              <div className="w-full h-3 bg-dark-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${result.matchScore}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-green-500/10 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">优势</h4>
                <p className="text-sm text-green-400">{result.suggestion}</p>
              </div>
              <div className="p-4 bg-red-500/10 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">注意</h4>
                <p className="text-sm text-red-500">需要注意的风水问题...</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-7 text-center max-w-md w-full shadow-xl border border-dark-200">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-gold-500" />
              </div>
              <p className="text-ink-100 font-bold text-lg mb-2">解锁完整住宅坐向分析报告</p>
              <p className="text-sm text-ink-500 mb-5 leading-relaxed">
                大门宜忌、主卧方位、厨房布局、财运文昌位
              </p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setShowDetail(true)} className="btn-secondary text-sm px-5">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm px-5">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 厨卫测算组件
function ChuweCalculator() {
  const [type, setType] = useState('kitchen');
  const [direction, setDirection] = useState('');
  const [wuxing, setWuxing] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const kitchenList = objToArray(KITCHEN_FENGSHUI);
  const bathroomList = objToArray(BATHROOM_FENGSHUI);
  const currentList = type === 'kitchen' ? kitchenList : bathroomList;
  const tips = type === 'kitchen' ? KITCHEN_TIPS : BATHROOM_TIPS;

  const handleCalculate = () => {
    if (!direction) return null;
    if (type === 'kitchen') {
      return calculateKitchenFengshui(direction, wuxing);
    } else {
      return calculateBathroomFengshui(direction, wuxing);
    }
  };

  const result = direction ? handleCalculate() : null;

  const getJixiongColor = (jx) => {
    if (jx === '吉' || jx === '大吉') return 'bg-green-500';
    if (jx === '凶' || jx === '大凶') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getJixiongBg = (jx) => {
    if (jx === '吉' || jx === '大吉') return 'bg-green-500/10 border-green-500/30';
    if (jx === '凶' || jx === '大凶') return 'bg-red-500/10 border-red-500/30';
    return 'bg-yellow-500/10 border-yellow-500/30';
  };

  const getJixiongText = (jx) => {
    if (jx === '吉' || jx === '大吉') return 'text-green-400';
    if (jx === '凶' || jx === '大凶') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Tab切换 */}
      <div className="flex rounded-xl bg-dark-200 p-1">
        {[
          { id: 'kitchen', name: '厨房风水', icon: Building2 },
          { id: 'bathroom', name: '卫生间风水', icon: Droplets },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => { setType(t.id); setDirection(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center ${
                type === t.id
                  ? 'bg-dark-400 text-ink-100 shadow-sm'
                  : 'text-ink-500 hover:text-ink-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {t.name}
            </button>
          );
        })}
      </div>

      {/* 输入区 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-2">所在方位</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} className="input-field">
            <option value="">请选择方位</option>
            {currentList.map((item, idx) => (
              <option key={idx} value={item.direction}>{item.direction}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-2">您的喜用神五行</label>
          <select value={wuxing} onChange={(e) => setWuxing(e.target.value)} className="input-field">
            <option value="">选填（影响评分）</option>
            {['金', '木', '水', '火', '土'].map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 结果展示 - 基础版免费 */}
      {result && (
        <div className="space-y-4">
          {/* 吉凶总评 */}
          <div className={`rounded-xl p-5 border ${getJixiongBg(result.jixiong)}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl font-bold text-ink-100">
                  {direction}{type === 'kitchen' ? '厨房' : '卫生间'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getJixiongText(result.jixiong)}`}>
                    {result.score}分
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getJixiongColor(result.jixiong)}`}>
                  {result.jixiong}
                </span>
              </div>
            </div>
            <p className="text-sm text-ink-400">{result.suggestion || result.description || ''}</p>
          </div>

          {/* 三维影响 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-dark-300/50 rounded-xl text-center">
              <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <div className="text-xs text-ink-500 mb-1">健康影响</div>
              <div className="text-sm text-ink-200">{result.healthEffect || '—'}</div>
            </div>
            <div className="p-4 bg-dark-300/50 rounded-xl text-center">
              <DollarSign className="w-5 h-5 text-gold-500 mx-auto mb-1" />
              <div className="text-xs text-ink-500 mb-1">财运影响</div>
              <div className="text-sm text-ink-200">{result.wealthEffect || '—'}</div>
            </div>
            <div className="p-4 bg-dark-300/50 rounded-xl text-center">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-ink-500 mb-1">家庭关系</div>
              <div className="text-sm text-ink-200">{result.familyEffect || '—'}</div>
            </div>
          </div>

          {/* 布局禁忌 */}
          {result.taboos && result.taboos.length > 0 && (
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <h4 className="font-bold text-red-400 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                布局禁忌
              </h4>
              <div className="space-y-2">
                {result.taboos.slice(0, 3).map((taboo, i) => (
                  <div key={i} className="flex items-start text-sm text-red-400">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {taboo}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 宜放物品 */}
          {result.luckyItems && result.luckyItems.length > 0 && (
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-bold text-green-400 mb-3 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                宜放吉祥物品
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.luckyItems.slice(0, 5).map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 配色建议 */}
          {result.colorSuggestion && result.colorSuggestion.length > 0 && (
            <div className="p-4 bg-dark-300/50 rounded-xl">
              <h4 className="font-bold text-ink-200 mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                配色建议
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.colorSuggestion.map((color, i) => (
                  <span key={i} className="px-3 py-1 bg-dark-400 border border-dark-300 rounded-full text-sm text-ink-400">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 会员解锁更多内容 / 完整报告 */}
          {(type === 'bathroom' || result.jixiong !== '吉') && !unlocked && (
            <div className="relative min-h-[320px]">
              <div className="opacity-30 blur-sm space-y-4">
                {type === 'bathroom' && result.resolutionMethods && result.resolutionMethods.length > 0 && (
                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <h4 className="font-bold text-amber-400 mb-3">化解方法</h4>
                    {result.resolutionMethods.slice(0, 3).map((m, i) => (
                      <div key={i} className="text-sm text-amber-400">{m}</div>
                    ))}
                  </div>
                )}
                {result.jixiong !== '吉' && result.resolution && (
                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <h4 className="font-bold text-amber-400 mb-2">详细化解方案</h4>
                    <p className="text-sm text-amber-400">{result.resolution}</p>
                  </div>
                )}
                {result.unluckyItems && result.unluckyItems.length > 0 && (
                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <h4 className="font-bold text-red-400 mb-2">忌放物品</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.unluckyItems.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                {result.locationTaboo && (
                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <h4 className="font-bold text-red-400 mb-2">位置禁忌</h4>
                    <p className="text-sm text-red-400">{result.locationTaboo}</p>
                  </div>
                )}
                {result.avoidColors && result.avoidColors.length > 0 && (
                  <div className="p-4 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-200 mb-2">忌用颜色</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.avoidColors.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center w-full shadow-2xl border border-dark-200" style={{ minWidth: '340px', maxWidth: '420px' }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-ink-100 font-bold text-xl mb-3">
                    解锁{type === 'kitchen' ? '厨房' : '卫生间'}完整风水报告
                  </h3>
                  <p className="text-sm text-ink-500 mb-6 leading-relaxed px-2">
                    化解方法、忌放物品、完整布局建议、位置禁忌、配色方案
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

          {/* 已解锁 - 完整内容 */}
          {(type === 'bathroom' || result.jixiong !== '吉') && unlocked && (
            <div className="space-y-4">
              {type === 'bathroom' && result.resolutionMethods && result.resolutionMethods.length > 0 && (
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <h4 className="font-bold text-amber-400 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    化解方法
                  </h4>
                  <div className="space-y-2">
                    {result.resolutionMethods.map((m, i) => (
                      <div key={i} className="flex items-start text-sm text-amber-400">
                        <span className="w-5 h-5 bg-amber-200 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">{i + 1}</span>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.jixiong !== '吉' && result.resolution && (
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <h4 className="font-bold text-amber-400 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    详细化解方案
                  </h4>
                  <p className="text-sm text-amber-400 leading-relaxed">{result.resolution}</p>
                </div>
              )}

              {result.unluckyItems && result.unluckyItems.length > 0 && (
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-3 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    忌放物品
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.unluckyItems.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        ✕ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.locationTaboo && (
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    位置禁忌
                  </h4>
                  <p className="text-sm text-red-400">{result.locationTaboo}</p>
                </div>
              )}

              {result.avoidColors && result.avoidColors.length > 0 && (
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-3 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    忌用颜色
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.avoidColors.map((c, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-sm">
                        忌 {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-dark-200">
                <span className="text-xs text-ink-500">以上为会员专享内容</span>
                <button onClick={() => setUnlocked(false)} className="text-xs text-primary-600 hover:underline">
                  收起完整内容
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 风水常识折叠 */}
      <div className="border-t border-dark-200 pt-4">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between text-sm text-ink-500 hover:text-ink-200"
        >
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            {type === 'kitchen' ? '厨房风水' : '卫生间风水'}小常识
          </span>
          <ChevronRight className={`w-4 h-4 transition-transform ${showTips ? 'rotate-90' : ''}`} />
        </button>
        {showTips && (
          <div className="mt-4 grid gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="p-3 bg-dark-300/50 rounded-lg">
                <h5 className="font-medium text-ink-200 text-sm mb-1">{tip.title}</h5>
                <p className="text-xs text-ink-500">{tip.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 户型图AI解析
function HuxingAnalysis() {
  const [step, setStep] = useState(0); // 0:上传 1:分析中 2:结果
  const [uploaded, setUploaded] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const analysisSteps = [
    { name: '户型识别', icon: Building2 },
    { name: '朝向分析', icon: Compass },
    { name: '财位定位', icon: DollarSign },
    { name: '缺角检测', icon: AlertTriangle },
    { name: '九星分布', icon: Star },
    { name: '配色建议', icon: Palette },
    { name: '布局优化', icon: Home },
    { name: '报告生成', icon: BookOpen },
  ];

  const handleUpload = () => {
    setUploaded(true);
    setStep(1);
    // 模拟分析过程
    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      setStep(currentStep);
      if (currentStep >= 8) {
        clearInterval(interval);
        setTimeout(() => setStep(100), 500);
      }
    }, 600);
  };

  // 模拟分析结果
  const mockResult = {
    overallScore: 78,
    houseType: '坎宅',
    orientation: '坐北朝南',
    structure: '整体格局方正，无明显缺角',
    advantages: [
      '坐北朝南，采光通风良好',
      '客厅位于东南延年吉位',
      '主卧位于南方天医吉位',
      '户型方正，空间利用率高',
    ],
    disadvantages: [
      '卫生间位于西北乾位，不利男主人运势',
      '厨房与卫生间相邻，水火相冲',
      '入户门正对客厅阳台，形成穿堂煞',
    ],
    wealthPosition: { direction: '东南方', status: '财位在客厅，状态良好', suggestion: '可摆放招财植物、聚宝盆等' },
    missingCorners: [],
  };

  return (
    <div className="space-y-6">
      {/* 上传区 */}
      {step === 0 && (
        <div className="text-center">
          <div className="border-2 border-dashed border-dark-300 rounded-2xl p-10 mb-6 hover:border-primary-400 transition-colors">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-ink-200 font-medium mb-2">上传您的户型图</p>
            <p className="text-sm text-ink-500 mb-4">支持 JPG、PNG 格式，建议清晰完整的户型图</p>
            <button onClick={handleUpload} className="btn-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              开始AI分析
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {analysisSteps.slice(0, 4).map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="p-3 bg-dark-300/50 rounded-lg text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-ink-500" />
                  <div className="text-xs text-ink-500">{s.name}</div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-ink-500">
            AI智能识别户型结构，8大维度深度分析，生成专属风水报告
          </p>
        </div>
      )}

      {/* 分析中 */}
      {step > 0 && step < 100 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
            <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500" />
          </div>
          <h3 className="text-lg font-bold text-ink-100 mb-2">AI正在分析中...</h3>
          <p className="text-sm text-ink-500 mb-6">请稍候，正在进行{analysisSteps[step - 1]?.name || '深度分析'}</p>

          <div className="grid grid-cols-4 gap-2">
            {analysisSteps.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const current = i === step - 1;
              return (
                <div key={i} className={`p-2 rounded-lg text-center transition-all ${
                  done ? 'bg-green-500/20' : current ? 'bg-primary-500/20 animate-pulse' : 'bg-dark-300/50'
                }`}>
                  <Icon className={`w-4 h-4 mx-auto mb-1 ${
                    done ? 'text-green-400' : current ? 'text-primary-600' : 'text-ink-400'
                  }`} />
                  <div className={`text-xs ${
                    done ? 'text-green-400 font-medium' : current ? 'text-primary-700' : 'text-ink-500'
                  }`}>{s.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 分析结果（基础版免费预览） */}
      {step === 100 && (
        <div className="space-y-5">
          {/* 总分 */}
          <div className="text-center p-6 bg-gradient-to-br from-primary-500/10 to-gold-500/10 rounded-2xl">
            <div className="text-sm text-ink-500 mb-2">户型风水综合评分</div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-600 mb-2">
              {mockResult.overallScore}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-ink-400">
              <span>{mockResult.orientation}</span>
              <span className="w-1 h-1 bg-dark-300 rounded-full"></span>
              <span>{mockResult.houseType}</span>
            </div>
            <p className="text-sm text-ink-500 mt-2">{mockResult.structure}</p>
          </div>

          {/* 优缺点 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-bold text-green-400 mb-3 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                户型优点
              </h4>
              <ul className="space-y-2">
                {mockResult.advantages.map((adv, i) => (
                  <li key={i} className="text-sm text-green-400 flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <h4 className="font-bold text-red-400 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                需要注意
              </h4>
              <ul className="space-y-2">
                {mockResult.disadvantages.map((dis, i) => (
                  <li key={i} className="text-sm text-red-400 flex items-start">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 财位定位 */}
          <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-500/30">
            <h4 className="font-bold text-gold-500 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              财位定位
            </h4>
            <p className="text-sm text-gold-500 mb-1">
              <span className="font-medium">方位：</span>{mockResult.wealthPosition.direction}
            </p>
            <p className="text-sm text-gold-400 mb-1">
              <span className="font-medium">状态：</span>{mockResult.wealthPosition.status}
            </p>
            <p className="text-sm text-gold-400">
              <span className="font-medium">建议：</span>{mockResult.wealthPosition.suggestion}
            </p>
          </div>

          {/* 会员解锁完整报告 */}
          {!unlocked && (
            <div className="relative min-h-[320px]">
              <div className="opacity-30 blur-sm space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {['客厅风水', '主卧风水', '厨房风水', '卫生间风水', '书房风水', '次卧风水'].map((r, i) => (
                    <div key={i} className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="text-sm font-medium text-ink-200">{r}</div>
                      <div className="text-xs text-ink-500">详细吉凶分析与布局建议...</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">九星分布</h4>
                  <p className="text-sm text-ink-500">八宅九星飞布、吉凶方位详解...</p>
                </div>
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <h4 className="font-bold text-amber-400 mb-2">化解方案</h4>
                  <p className="text-sm text-amber-400">针对凶位和煞气的具体化解方法...</p>
                </div>
                <div className="p-4 bg-dark-300/50 rounded-xl">
                  <h4 className="font-bold text-ink-200 mb-2">布局优化建议</h4>
                  <p className="text-sm text-ink-500">家具摆放、装修改造、软装搭配建议...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-7 text-center max-w-md w-full shadow-xl border border-dark-200">
                  <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-gold-500" />
                  </div>
                  <p className="text-ink-100 font-bold text-lg mb-2">解锁完整户型风水报告</p>
                  <p className="text-sm text-ink-500 mb-5 leading-relaxed">
                    各房间详细分析、九星分布、化解方案、布局优化建议
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm px-5">
                      预览完整效果
                    </button>
                    <Link to="/vip" className="btn-primary text-sm px-5">
                      开通会员
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 已解锁 - 完整报告 */}
          {unlocked && (
            <div className="space-y-5">
              {/* 各房间详细分析 */}
              <div>
                <h4 className="font-bold text-ink-100 mb-3 flex items-center">
                  <Home className="w-4 h-4 mr-2 text-primary-500" />
                  各房间风水详解
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { name: '客厅风水', direction: '东南方', jixiong: '吉', score: 92, desc: '位于延年吉位，主家庭和睦、贵人相助。宽敞明亮，气场流通良好。', suggestion: '可在东南角摆放绿植或流水摆件增旺气场。' },
                    { name: '主卧风水', direction: '正南方', jixiong: '吉', score: 88, desc: '位于天医吉位，主健康长寿、夫妻感情和睦。采光充足，温度适宜。', suggestion: '床头靠南墙，避免床头靠窗，可放一对鸳鸯摆件增旺感情。' },
                    { name: '厨房风水', direction: '正东方', jixiong: '吉', score: 85, desc: '位于震位，木火相生，主家人健康、财运旺盛。通风良好，动线合理。', suggestion: '灶台坐东朝西，避免与水龙头正对，可挂葫芦化煞。' },
                    { name: '卫生间风水', direction: '西北方', jixiong: '凶', score: 45, desc: '位于乾位，不利男主人运势、事业发展和健康。污秽之气压制天位。', suggestion: '常关马桶盖、保持干燥通风，挂铜葫芦化解，放置粗盐吸煞。' },
                    { name: '书房风水', direction: '东北方', jixiong: '平', score: 68, desc: '位于艮位，适合读书学习，但气场稍显凝滞。需要适当布置增加活力。', suggestion: '书桌坐北朝南，摆放文昌塔或毛笔提升文昌运。' },
                    { name: '次卧风水', direction: '正西方', jixiong: '平', score: 72, desc: '位于兑位，气场平和，适合儿童或老人居住。但需要注意金属元素过多。', suggestion: '增加绿植调和气场，避免摆放过多金属物品。' },
                  ].map((room, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${
                      room.jixiong === '吉' ? 'bg-green-500/10 border-green-500/30' :
                      room.jixiong === '凶' ? 'bg-red-500/10 border-red-500/30' :
                      'bg-yellow-500/10 border-yellow-500/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-ink-100">{room.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${
                            room.jixiong === '吉' ? 'text-green-400' :
                            room.jixiong === '凶' ? 'text-red-400' :
                            'text-yellow-400'
                          }`}>{room.score}分</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full text-white ${
                            room.jixiong === '吉' ? 'bg-green-500' :
                            room.jixiong === '凶' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}>{room.jixiong}</span>
                        </div>
                      </div>
                      <div className="text-xs text-ink-500 mb-2">方位：{room.direction}</div>
                      <p className="text-sm text-ink-400 mb-2">{room.desc}</p>
                      <div className="text-xs text-ink-500 bg-dark-400/50 p-2 rounded-lg">
                        <span className="font-medium">建议：</span>{room.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 九星分布 */}
              <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-4 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  八宅九星分布
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  {[
                    { pos: '西北', star: '六煞', level: '凶' },
                    { pos: '北', star: '伏位', level: '吉' },
                    { pos: '东北', star: '五鬼', level: '凶' },
                    { pos: '西', star: '祸害', level: '凶' },
                    { pos: '中', star: '—', level: '' },
                    { pos: '东', star: '延年', level: '吉' },
                    { pos: '西南', star: '绝命', level: '凶' },
                    { pos: '南', star: '天医', level: '吉' },
                    { pos: '东南', star: '生气', level: '吉' },
                  ].map((cell, i) => (
                    <div key={i} className={`p-3 rounded-lg ${
                      cell.level === '吉' ? 'bg-green-500/20' :
                      cell.level === '凶' ? 'bg-red-500/20' :
                      'bg-dark-400/50'
                    }`}>
                      <div className="text-xs text-ink-500 mb-1">{cell.pos}</div>
                      <div className={`text-sm font-bold ${
                        cell.level === '吉' ? 'text-green-400' :
                        cell.level === '凶' ? 'text-red-400' :
                        'text-ink-500'
                      }`}>{cell.star}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 text-xs">
                  <span className="flex items-center"><span className="w-3 h-3 bg-green-500/20 rounded mr-1"></span>吉方</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-red-500/20 rounded mr-1"></span>凶方</span>
                  <span className="text-ink-500">四吉四凶，吉方宜用，凶方宜化</span>
                </div>
              </div>

              {/* 化解方案 */}
              <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <h4 className="font-bold text-amber-400 mb-4 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  针对性化解方案
                </h4>
                <div className="space-y-3">
                  {[
                    { title: '西北卫生间（乾位受污）', method: '1. 常关马桶盖，保持卫生间干燥通风；2. 挂铜葫芦于卫生间门后；3. 地面铺深色地垫，放置粗盐吸煞；4. 点香薰或放艾草净化气场；5. 卫生间门挂长帘遮挡。' },
                    { title: '入户门对阳台（穿堂煞）', method: '1. 在客厅中间设置屏风或玄关柜；2. 阳台种植高大绿植遮挡；3. 悬挂珠帘或窗帘减缓气流；4. 客厅摆放聚宝盆聚气。' },
                    { title: '厨卫相邻（水火相冲）', method: '1. 在厨房和卫生间之间放一盆绿植；2. 中间的墙面挂葫芦或五帝钱化解；3. 保持厨卫门常关，避免气流对冲。' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-dark-400/60 rounded-lg">
                      <div className="font-medium text-amber-400 text-sm mb-2">{item.title}</div>
                      <p className="text-sm text-amber-400 leading-relaxed whitespace-pre-line">{item.method}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 布局优化建议 */}
              <div className="p-5 bg-dark-300/50 rounded-xl">
                <h4 className="font-bold text-ink-100 mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  布局优化建议
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { icon: '🛋️', title: '家具摆放', content: '沙发宜靠实墙摆放，忌背后无靠；电视柜不宜过高，避免压制气场。' },
                    { icon: '🪟', title: '门窗格局', content: '入户门不宜正对阳台，需设玄关缓冲；窗户不宜过多或过大，以免气散不聚。' },
                    { icon: '💡', title: '照明设计', content: '客厅宜明亮，卧室宜柔和；凶位可用灯光增旺，吉位宜保持明亮。' },
                    { icon: '🌿', title: '绿植布置', content: '客厅东南财位放发财树、绿萝；凶位放仙人掌、仙人球化煞；卧室不宜放太多植物。' },
                    { icon: '🎨', title: '色彩搭配', content: '整体以暖色调为主，避免过多冷色调；根据宅命五行调整主色调。' },
                    { icon: '🔔', title: '吉祥摆件', content: '财位放聚宝盆、貔貅；玄关放铜葫芦化煞；书房放文昌塔助学业事业。' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-dark-400 rounded-lg border border-dark-200">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{item.icon}</span>
                        <span className="font-medium text-ink-200 text-sm">{item.title}</span>
                      </div>
                      <p className="text-xs text-ink-500 leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-dark-200">
                <span className="text-xs text-ink-500">以上为会员专享完整报告</span>
                <button onClick={() => setUnlocked(false)} className="text-xs text-primary-600 hover:underline">
                  收起完整报告
                </button>
              </div>
            </div>
          )}

          {/* 重新上传 */}
          <div className="text-center">
            <button
              onClick={() => { setStep(0); setUploaded(false); setUnlocked(false); }}
              className="text-sm text-primary-600 hover:underline"
            >
              重新上传户型图
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 各空间风水要点Tab
function RoomFengshuiTabs() {
  const [activeRoom, setActiveRoom] = useState('客厅');

  const rooms = Object.keys(ROOM_FENGSHUI);
  const roomData = ROOM_FENGSHUI[activeRoom];

  if (!roomData) return null;

  // colorSuggestion 可能是字符串也可能是数组，统一处理
  const colorList = Array.isArray(roomData.colorSuggestion)
    ? roomData.colorSuggestion
    : [roomData.colorSuggestion];

  return (
    <div className="card p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeRoom === room
                ? 'bg-primary-500 text-white'
                : 'bg-dark-200 text-ink-400 hover:bg-dark-300'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-ink-100 mb-3 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
            风水要点
          </h4>
          <div className="space-y-2">
            {roomData.keyPoints.map((tip, i) => (
              <div key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-ink-400">{tip}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-ink-100 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            风水禁忌
          </h4>
          <div className="space-y-2">
            {roomData.taboos.map((taboo, i) => (
              <div key={i} className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-ink-400">{taboo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-dark-200 grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-bold text-ink-200 mb-2 text-sm">吉祥物品</h5>
          <div className="flex flex-wrap gap-2">
            {roomData.luckyItems.map((item, i) => (
              <span key={i} className="px-3 py-1 bg-gold-500/10 text-gold-500 rounded-full text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-bold text-ink-200 mb-2 text-sm">颜色建议</h5>
          <div className="flex flex-wrap gap-2">
            {colorList.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-700 rounded-full text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
