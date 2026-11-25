import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronLeft, Crown, Lock, Sparkles } from 'lucide-react';
import { getHuangli } from '../data/huangli';
import { DREAM_CATEGORIES, DREAM_LIST, searchDreams } from '../data/zhougong';
import { calculateWuge } from '../data/wuge';
import { calculateLifeNumber } from '../data/lifeNumber';
import { drawQian, ceZi } from '../data/qian';
import { numberQiGua, timeQiGua, textQiGua, BAGUA } from '../data/liuyao';
import { calculateDongXiMing, WUXING_COLORS } from '../data/fengshui';
import { CAIYUN_QUESTIONS, getCaiyunResult, getXinggeResult } from '../data/tests';
import { SHENG_XIAO, getDayPillar, TIAN_GAN_WU_XING, DI_ZHI_WU_XING } from '../data/bazi';

export default function ToolsPage({ toolType }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 黄历查询
  const HuangliTool = () => {
    const [date, setDate] = useState(new Date());
    const huangli = getHuangli(date);
    
    return (
      <div className="space-y-6">
        {/* 日期选择 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink-100 font-serif">每日黄历</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gold-500" />
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="input-field text-sm py-2"
            />
          </div>
        </div>

        {/* 黄历主卡片 */}
        <div className="bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-red-400 mb-2 font-serif">
              {date.getDate()}
            </div>
            <div className="text-ink-300">{huangli.date} {huangli.weekDay}</div>
            <div className="text-ink-400 text-sm mt-1">{huangli.lunarDate}</div>
            {huangli.solarTerms && (
              <div className="mt-2 inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                {huangli.solarTerms}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-xs text-ink-500">农历</div>
              <div className="font-medium text-ink-200">{huangli.lunarDate}</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-xs text-ink-500">生肖</div>
              <div className="font-medium text-ink-200">{huangli.shengXiao}年</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-xs text-ink-500">日五行</div>
              <div className="font-medium text-ink-200">{huangli.wuxing}</div>
            </div>
          </div>

          {/* 宜忌 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-200">
              <div className="text-center mb-3">
                <span className="text-2xl font-bold text-green-400">宜</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {huangli.yi.slice(0, 6).map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-dark-400 rounded text-sm text-green-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-200">
              <div className="text-center mb-3">
                <span className="text-2xl font-bold text-red-500">忌</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {huangli.ji.slice(0, 6).map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-dark-400 rounded text-sm text-red-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 冲煞 */}
          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div className="bg-white/70 rounded-lg p-3">
              <span className="text-ink-500">冲：</span>
              <span className="text-red-500 font-medium">{huangli.chong}</span>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <span className="text-ink-500">煞：</span>
              <span className="text-red-500 font-medium">{huangli.sha}</span>
            </div>
          </div>
        </div>

        {/* 彭祖百忌 */}
        <div className="card p-5">
          <h3 className="font-bold text-ink-100 mb-2">彭祖百忌</h3>
          <p className="text-ink-300 text-sm">{huangli.pengzu}</p>
        </div>

        {/* 二十八宿 */}
        <div className="card p-5">
          <h3 className="font-bold text-ink-100 mb-2">二十八宿</h3>
          <p className="text-ink-300 text-sm">今日值日：{huangli.ershibaxiu}</p>
        </div>

        {/* 吉神凶煞 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-bold text-green-400 mb-3">吉神宜趋</h3>
            <div className="flex flex-wrap gap-2">
              {huangli.jishen.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-red-500 mb-3">凶煞宜忌</h3>
            <div className="flex flex-wrap gap-2">
              {huangli.xiongsha.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-ink-500">
          <Lock className="w-3 h-3 inline mr-1" />
          择时精准时段、完整吉时查询
          <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
        </p>
      </div>
    );
  };

  // 周公解梦
  const ZhougongTool = () => {
    const [keyword, setKeyword] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
      const results = searchDreams(keyword);
      setSearchResults(results);
      setHasSearched(true);
      setActiveCategory(null);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">周公解梦</h2>
        
        {/* 搜索框 */}
        <div className="flex gap-3">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入梦境关键词，如：蛇、水、钱..."
            className="input-field flex-1"
          />
          <button onClick={handleSearch} className="btn-primary px-8">
            解梦
          </button>
        </div>

        {/* 搜索结果 */}
        {hasSearched && (
          <div className="card p-5">
            <h3 className="font-bold text-ink-100 mb-4">
              搜索结果：{searchResults.length} 条
            </h3>
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((dream) => (
                  <div key={dream.id} className="p-4 bg-dark-300/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-ink-100">{dream.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dream.level === '吉' ? 'bg-green-500/20 text-green-400' :
                        dream.level === '凶' ? 'bg-red-500/20 text-red-500' :
                        'bg-yellow-500/20 text-yellow-600'
                      }`}>
                        {dream.level}
                      </span>
                    </div>
                    <p className="text-sm text-ink-300">{dream.summary}</p>
                    <p className="text-xs text-gold-500 mt-2 cursor-pointer">
                      <Lock className="w-3 h-3 inline mr-1" />
                      详细解梦、流年对应预兆 会员解锁
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-ink-500 py-8">未找到相关梦境，请尝试其他关键词</p>
            )}
          </div>
        )}

        {/* 分类浏览 */}
        <div>
          <h3 className="font-bold text-ink-100 mb-4">按分类浏览</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {DREAM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  activeCategory === cat.id
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-dark-300 hover:border-dark-400'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-medium text-ink-100 text-sm">{cat.name}</div>
                <div className="text-xs text-ink-500">{cat.count}条</div>
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="card p-5">
              <h4 className="font-bold text-ink-100 mb-4">
                {DREAM_CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h4>
              <div className="space-y-3">
                {(DREAM_LIST[activeCategory] || []).map((dream) => (
                  <div key={dream.id} className="p-3 bg-dark-300/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-ink-100">{dream.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        dream.level === '吉' ? 'bg-green-500/20 text-green-400' :
                        dream.level === '凶' ? 'bg-red-500/20 text-red-500' :
                        'bg-yellow-500/20 text-yellow-600'
                      }`}>
                        {dream.level}
                      </span>
                    </div>
                    <p className="text-sm text-ink-400 line-clamp-2">{dream.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 姓名五格
  const WugeTool = () => {
    const [surname, setSurname] = useState('');
    const [givenName, setGivenName] = useState('');
    const [gender, setGender] = useState('男');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
      if (!surname || !givenName) return;
      const res = calculateWuge(surname, givenName, gender);
      setResult(res);
    };

    const getLuckColor = (luck) => {
      switch (luck) {
        case '吉': return 'text-green-400 bg-green-500/20';
        case '半吉': return 'text-yellow-600 bg-yellow-500/20';
        case '凶': return 'text-red-500 bg-red-500/20';
        default: return 'text-ink-300 bg-dark-200';
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">姓名五格打分</h2>
        
        {/* 输入表单 */}
        <div className="card p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">姓氏</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="请输入姓氏"
                className="input-field"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">名字</label>
              <input
                type="text"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                placeholder="请输入名字"
                className="input-field"
                maxLength={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            开始测算
          </button>
        </div>

        {/* 结果 */}
        {result && (
          <div className="space-y-6">
            {/* 总分 */}
            <div className="bg-gradient-to-br from-gold-50 to-primary-50 rounded-2xl p-8 text-center border border-gold-200">
              <div className="text-ink-400 mb-2">{result.fullName} 姓名评分</div>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-primary-500 mb-2">
                {result.totalScore}
              </div>
              <div className="text-ink-300">{result.summary}</div>
            </div>

            {/* 五格 */}
            <div className="card p-6">
              <h3 className="font-bold text-ink-100 mb-4">五格详解</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { name: '天格', key: 'tianGe', desc: '祖业' },
                  { name: '人格', key: 'renGe', desc: '主运' },
                  { name: '地格', key: 'diGe', desc: '前运' },
                  { name: '外格', key: 'waiGe', desc: '副运' },
                  { name: '总格', key: 'zongGe', desc: '后运' },
                ].map((item) => (
                  <div key={item.key} className="text-center p-3 bg-dark-300/50 rounded-xl">
                    <div className="text-xs text-ink-500 mb-1">{item.name}</div>
                    <div className="text-2xl font-bold text-ink-100">
                      {result.wuge[item.key].value}
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${getLuckColor(result.wuge[item.key].luck)}`}>
                      {result.wuge[item.key].luck}
                    </div>
                    <div className="text-xs text-ink-500 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 性格分析 */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-2">性格简析</h3>
              <p className="text-ink-300 text-sm">{result.characterAnalysis}</p>
            </div>

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              五行匹配度、命格适配分析、事业财运感情详解
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 生命灵数
  const LifeNumberTool = () => {
    const [year, setYear] = useState(1990);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
      const res = calculateLifeNumber(year, month, day);
      setResult(res);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">生命灵数测算</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">出生年份</label>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="input-field">
                {Array.from({ length: 100 }, (_, i) => 1930 + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">月份</label>
              <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="input-field">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">日期</label>
              <select value={day} onChange={(e) => setDay(parseInt(e.target.value))} className="input-field">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            开始测算
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 主命数 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
              <div className="text-ink-400 mb-2">主命数（命运数）</div>
              <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                {result.mainNumber}
              </div>
              <div className="text-sm text-ink-400 mt-2">{result.birthdayAnalysis}</div>
            </div>

            {/* 各灵数 */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: '天赋数', value: result.talentNumber, desc: result.talentAnalysis?.slice(0, 20) + '...' },
                { name: '内心灵数', value: result.innerNumber, desc: result.innerAnalysis?.slice(0, 20) + '...' },
                { name: '外在灵数', value: result.outerNumber, desc: result.outerAnalysis?.slice(0, 20) + '...' },
                { name: '生日数', value: result.birthdayNumber, desc: '天生气质' },
              ].map((item, i) => (
                <div key={i} className="card p-4 text-center">
                  <div className="text-xs text-ink-500 mb-1">{item.name}</div>
                  <div className="text-3xl font-bold text-ink-100">{item.value}</div>
                  <div className="text-xs text-ink-500 mt-1 line-clamp-2">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* 性格分析 */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-3">性格特征</h3>
              <p className="text-ink-300 text-sm leading-relaxed">{result.personality}</p>
            </div>

            {/* 天赋才能（免费展示） */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-3">天赋才能</h3>
              <p className="text-ink-300 text-sm leading-relaxed">{result.talent}</p>
            </div>

            {/* 人生课题（免费展示） */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-3">人生课题</h3>
              <p className="text-ink-300 text-sm leading-relaxed">{result.lifeLesson}</p>
            </div>

            {/* 会员锁定内容 */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 opacity-40 blur-sm">
                <div className="card p-5">
                  <h3 className="font-bold text-blue-400 mb-2">事业运势</h3>
                  <p className="text-ink-300 text-sm">{result.career}</p>
                </div>
                <div className="card p-5">
                  <h3 className="font-bold text-green-400 mb-2">财运解析</h3>
                  <p className="text-ink-300 text-sm">{result.wealth}</p>
                </div>
                <div className="card p-5">
                  <h3 className="font-bold text-pink-400 mb-2">感情婚姻</h3>
                  <p className="text-ink-300 text-sm">{result.love}</p>
                </div>
                <div className="card p-5">
                  <h3 className="font-bold text-red-500 mb-2">健康注意</h3>
                  <p className="text-ink-300 text-sm">{result.health}</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                  <Lock className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <p className="text-ink-300 mb-3 text-sm">解锁事业财运感情健康完整解读</p>
                  <Link to="/vip" className="btn-primary text-sm py-2 px-6 inline-block">
                    开通会员查看
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 抽签测字
  const QianTool = () => {
    const [activeTab, setActiveTab] = useState('guanyin');
    const [result, setResult] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [ceziChar, setCeziChar] = useState('');
    const [ceziResult, setCeziResult] = useState(null);

    const handleDraw = () => {
      setDrawing(true);
      setResult(null);
      setTimeout(() => {
        const qian = drawQian(activeTab);
        setResult(qian);
        setDrawing(false);
      }, 1500);
    };

    const handleCezi = () => {
      if (!ceziChar) return;
      const res = ceZi(ceziChar);
      setCeziResult(res);
    };

    const tabs = [
      { id: 'guanyin', name: '观音灵签' },
      { id: 'yuelao', name: '月老灵签' },
      { id: 'shiye', name: '事业灵签' },
      { id: 'cezi', name: '单字测字' },
    ];

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">抽签测字</h2>

        {/* Tab切换 */}
        <div className="flex rounded-xl bg-dark-200 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setResult(null); setCeziResult(null); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-dark-400 text-ink-100 shadow-sm'
                  : 'text-ink-400 hover:text-ink-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* 抽签 */}
        {activeTab !== 'cezi' && (
          <div className="text-center">
            {!result && !drawing && (
              <div className="card p-12">
                <div className="text-6xl mb-6">🎋</div>
                <p className="text-ink-300 mb-6">
                  心中默念所求之事，然后点击抽签
                </p>
                <button onClick={handleDraw} className="btn-primary text-lg px-10 py-4">
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  开始抽签
                </button>
              </div>
            )}

            {drawing && (
              <div className="card p-12">
                <div className="text-6xl mb-6 animate-bounce">🎋</div>
                <p className="text-ink-400">正在摇签...</p>
              </div>
            )}

            {result && (
              <div className="card overflow-hidden">
                <div className="bg-gradient-to-b from-red-600 to-red-700 text-white py-6">
                  <div className="text-2xl font-bold font-serif">{result.name}</div>
                  {result.title && <div className="text-red-200 mt-1">{result.title}</div>}
                </div>
                <div className="p-6">
                  <div className="bg-dark-300/50 rounded-xl p-6 mb-6">
                    <p className="text-lg text-ink-100 font-serif leading-relaxed">
                      {result.poem}
                    </p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-ink-100 mb-2">签文释义</h4>
                    <p className="text-ink-300 text-sm">{result.meaning}</p>
                  </div>
                  {result.fortune && (
                    <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <span className="text-sm text-green-400 font-medium">整体运势：{result.fortune.overall}</span>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <span className="text-sm text-blue-400 font-medium">事业：{result.fortune.career}</span>
                      </div>
                    </div>
                  )}
                  {result.love && (
                    <div className="mt-4 p-3 bg-pink-500/10 rounded-lg text-left">
                      <span className="text-sm text-pink-400 font-medium">感情：{result.love}</span>
                    </div>
                  )}
                  {result.career && (
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg text-left">
                      <span className="text-sm text-blue-400 font-medium">事业：{result.career}</span>
                    </div>
                  )}
                </div>
                <div className="px-6 pb-6">
                  <button onClick={handleDraw} className="btn-secondary w-full">
                    再抽一签
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 测字 */}
        {activeTab === 'cezi' && (
          <div className="space-y-6">
            <div className="card p-6">
              <p className="text-ink-300 mb-4">输入一个汉字，测字知吉凶</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={ceziChar}
                  onChange={(e) => setCeziChar(e.target.value.slice(0, 1))}
                  placeholder="请输入一个汉字"
                  className="input-field flex-1 text-center text-2xl"
                  maxLength={1}
                />
                <button onClick={handleCezi} className="btn-primary px-8">
                  测字
                </button>
              </div>
            </div>

            {ceziResult && (
              <div className="card p-6 text-center">
                <div className="text-6xl font-bold text-ink-100 mb-4 font-serif">
                  {ceziResult.char}
                </div>
                <div className="inline-block px-4 py-2 bg-gold-500/20 text-gold-500 rounded-full text-sm font-medium mb-4">
                  五行属{ceziResult.wuxing}
                </div>
                <p className="text-ink-300">{ceziResult.meaning}</p>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-xs text-ink-500">
          <Lock className="w-3 h-3 inline mr-1" />
          完整解签、流年指引
          <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
        </p>
      </div>
    );
  };

  // 六爻起卦
  const LiuyaoTool = () => {
    const [activeMethod, setActiveMethod] = useState('number');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);

    const handleNumberQiGua = () => {
      if (!num1 || !num2) return;
      const res = numberQiGua(parseInt(num1), parseInt(num2), parseInt(num3) || 6);
      setResult(res);
    };

    const handleTimeQiGua = () => {
      const res = timeQiGua(new Date());
      setResult(res);
    };

    const handleTextQiGua = () => {
      if (!text) return;
      const res = textQiGua(text);
      setResult(res);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">六爻起卦</h2>

        <div className="flex rounded-xl bg-dark-200 p-1 mb-6">
          {[
            { id: 'number', name: '数字起卦' },
            { id: 'time', name: '时间起卦' },
            { id: 'text', name: '文字起卦' },
          ].map(method => (
            <button
              key={method.id}
              onClick={() => { setActiveMethod(method.id); setResult(null); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeMethod === method.id
                  ? 'bg-dark-400 text-ink-100 shadow-sm'
                  : 'text-ink-400 hover:text-ink-200'
              }`}
            >
              {method.name}
            </button>
          ))}
        </div>

        {/* 数字起卦 */}
        {activeMethod === 'number' && (
          <div className="card p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">第一个数</label>
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="上卦数"
                  className="input-field text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">第二个数</label>
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="下卦数"
                  className="input-field text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">动爻数</label>
                <input
                  type="number"
                  value={num3}
                  onChange={(e) => setNum3(e.target.value)}
                  placeholder="选填"
                  className="input-field text-center"
                />
              </div>
            </div>
            <button onClick={handleNumberQiGua} className="btn-primary w-full">
              起卦
            </button>
          </div>
        )}

        {/* 时间起卦 */}
        {activeMethod === 'time' && (
          <div className="card p-6 text-center">
            <p className="text-ink-300 mb-6">以当前时间起卦</p>
            <button onClick={handleTimeQiGua} className="btn-primary px-10 py-4">
              立即起卦
            </button>
          </div>
        )}

        {/* 文字起卦 */}
        {activeMethod === 'text' && (
          <div className="card p-6">
            <p className="text-ink-300 mb-4">输入文字起卦（字数需在2字以上）</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入想问的事情..."
              className="input-field mb-4"
            />
            <button onClick={handleTextQiGua} className="btn-primary w-full">
              起卦
            </button>
          </div>
        )}

        {/* 结果 */}
        {result && (
          <div className="card p-6">
            <h3 className="font-bold text-ink-100 mb-4 text-center">{result.method}结果</h3>
            
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-xs text-ink-500 mb-2">上卦</div>
                <div className="text-5xl">{result.upperGua.symbol}</div>
                <div className="text-ink-200 mt-1">{result.upperGua.name}卦</div>
                <div className="text-xs text-ink-500">{result.upperGua.nature}·{result.upperGua.wuxing}</div>
              </div>
              <div className="text-2xl text-ink-500">☯</div>
              <div className="text-center">
                <div className="text-xs text-ink-500 mb-2">下卦</div>
                <div className="text-5xl">{result.lowerGua.symbol}</div>
                <div className="text-ink-200 mt-1">{result.lowerGua.name}卦</div>
                <div className="text-xs text-ink-500">{result.lowerGua.nature}·{result.lowerGua.wuxing}</div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-ink-100 font-serif">{result.gua.name}</div>
              <div className="text-sm text-gold-500 mt-1">第{result.dongYao}爻动</div>
            </div>

            <div className="bg-dark-300/50 rounded-xl p-4">
              <p className="text-ink-300 text-center">{result.meaning}</p>
            </div>

            <p className="text-center text-xs text-ink-500 mt-4">
              <Lock className="w-3 h-3 inline mr-1" />
              六亲、世应、用神、吉凶断语
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁完整解卦</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 生肖配对
  const ShengxiaoTool = () => {
    const [sx1, setSx1] = useState('');
    const [sx2, setSx2] = useState('');
    const [result, setResult] = useState(null);

    const shengxiaoList = SHENG_XIAO.map((name, i) => ({ name, index: i }));

    const handlePeidui = () => {
      if (!sx1 || !sx2) return;
      
      const idx1 = SHENG_XIAO.indexOf(sx1);
      const idx2 = SHENG_XIAO.indexOf(sx2);
      const diff = Math.abs(idx1 - idx2);
      
      let level, desc;
      if (diff === 0) {
        level = '平';
        desc = '同生肖，性格相似，但也容易产生矛盾。需要互相包容理解。';
      } else if (diff === 6) {
        level = '凶';
        desc = '六冲生肖，性格差异大，容易产生冲突。需要更多的磨合和沟通。';
      } else if (diff === 3 || diff === 9) {
        level = '平';
        desc = '三刑/三合，关系较为复杂，有吉有凶。需具体分析八字。';
      } else if (diff === 4 || diff === 8) {
        level = '吉';
        desc = '三合生肖，相处融洽，默契十足，是很好的搭配。';
      } else if (diff === 2 || diff === 10) {
        level = '吉';
        desc = '六合生肖，天作之合，感情深厚，是最佳配对。';
      } else {
        level = '平';
        desc = '一般配对，关系平稳，需要双方共同经营。';
      }

      setResult({ sx1, sx2, level, desc });
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">生肖配对</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">男方生肖</label>
              <select value={sx1} onChange={(e) => setSx1(e.target.value)} className="input-field">
                <option value="">请选择生肖</option>
                {shengxiaoList.map(sx => (
                  <option key={sx.index} value={sx.name}>{sx.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">女方生肖</label>
              <select value={sx2} onChange={(e) => setSx2(e.target.value)} className="input-field">
                <option value="">请选择生肖</option>
                {shengxiaoList.map(sx => (
                  <option key={sx.index} value={sx.name}>{sx.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handlePeidui} className="btn-primary w-full">
            开始配对
          </button>
        </div>

        {result && (
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-4xl">{getEmoji(result.sx1)}</div>
              <div className="text-2xl text-ink-500">❤</div>
              <div className="text-4xl">{getEmoji(result.sx2)}</div>
            </div>
            <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold mb-4 ${
              result.level === '吉' ? 'bg-green-500/20 text-green-400' :
              result.level === '凶' ? 'bg-red-500/20 text-red-500' :
              'bg-yellow-500/20 text-yellow-600'
            }`}>
              {result.level}
            </div>
            <p className="text-ink-300">{result.desc}</p>
            <p className="text-xs text-ink-500 mt-4">
              <Lock className="w-3 h-3 inline mr-1" />
              八字深度合婚分析
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  function getEmoji(sx) {
    const emojis = {
      '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰',
      '龙': '🐲', '蛇': '🐍', '马': '🐴', '羊': '🐑',
      '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷'
    };
    return emojis[sx] || '🐾';
  }

  // 财运自测
  const CaiyunTest = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const currentQuestion = CAIYUN_QUESTIONS[step];
    const totalQuestions = CAIYUN_QUESTIONS.length;

    const handleAnswer = (value) => {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
      if (step < totalQuestions - 1) {
        setStep(step + 1);
      } else {
        // 计算结果
        let totalScore = 0;
        Object.values(answers).forEach(a => {
          const q = CAIYUN_QUESTIONS.find(q => q.id === Object.keys(answers)[Object.values(answers).indexOf(a)]);
          const option = q?.options.find(o => o.value === a);
          if (option) totalScore += option.score;
        });
        // 加上当前题
        const currentOption = currentQuestion.options.find(o => o.value === value);
        if (currentOption) totalScore += currentOption.score;
        
        const res = getCaiyunResult(totalScore);
        setResult(res);
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">财运自测</h2>
        
        {!result ? (
          <div className="card p-8">
            {/* 进度 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-ink-400 mb-2">
                <span>第 {step + 1} / {totalQuestions} 题</span>
                <span>{Math.round((step / totalQuestions) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-dark-200 rounded-full">
                <div 
                  className="h-full bg-gradient-gold rounded-full transition-all"
                  style={{ width: `${(step / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-ink-100 mb-6">{currentQuestion.question}</h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 border-2 border-dark-300 rounded-xl hover:border-gold-400 hover:bg-gold-500/10 transition-all"
                >
                  <span className="font-medium text-ink-200">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`card p-8 text-center ${
              result.color === 'green' ? 'bg-green-500/10 border-green-200' :
              result.color === 'gold' ? 'bg-yellow-500/10 border-yellow-200' :
              result.color === 'orange' ? 'bg-orange-500/10 border-orange-200' :
              'bg-red-500/10 border-red-200'
            }`}>
              <div className="text-6xl mb-4">
                {result.color === 'green' ? '💰' : result.color === 'gold' ? '💴' : result.color === 'orange' ? '💵' : '📉'}
              </div>
              <div className="text-3xl font-bold text-ink-100 mb-2">{result.title}</div>
              <div className="text-ink-300">{result.summary}</div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-2">建议</h3>
              <p className="text-ink-300 text-sm">{result.advice}</p>
            </div>

            <button onClick={() => { setStep(0); setAnswers({}); setResult(null); }} className="btn-secondary w-full">
              重新测试
            </button>

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              分年份财运规划、详细财运走势
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 今日运势
  const JinriyunshiTool = () => {
    const [bazi, setBazi] = useState('');
    const [result, setResult] = useState(null);

    // 五行生克关系判定（以日主五行为基准）
    const getWuXingRelation = (dayMaster, otherWuxing) => {
      // 五行相生：木生火、火生土、土生金、金生水、水生木
      const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
      // 五行相克：木克土、土克水、水克火、火克金、金克木
      const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

      if (dayMaster === otherWuxing) return 'same';       // 比劫（同五行）
      if (sheng[otherWuxing] === dayMaster) return 'bei-sheng'; // 印星（生我）
      if (sheng[dayMaster] === otherWuxing) return 'sheng';     // 食伤（我生）
      if (ke[otherWuxing] === dayMaster) return 'bei-ke';      // 官杀（克我）
      if (ke[dayMaster] === otherWuxing) return 'ke';          // 财星（我克）
      return '';
    };

    // 关系到运势等级和分数
    const getRelationFortune = (relation) => {
      switch (relation) {
        case 'bei-sheng': return { level: '吉', score: 2 };    // 印星：吉
        case 'sheng': return { level: '小吉', score: 1 };       // 食伤：小吉
        case 'same': return { level: '平', score: 0 };          // 比劫：平
        case 'ke': return { level: '平', score: 0 };            // 财星：平
        case 'bei-ke': return { level: '凶', score: -2 };       // 官杀：凶
        default: return { level: '平', score: 0 };
      }
    };

    // 综合日干（权重60%）和日支（权重40%）判断运势等级
    const getOverallFortune = (ganScore, zhiScore) => {
      const total = ganScore * 0.6 + zhiScore * 0.4;
      if (total >= 1.4) return '吉';
      if (total >= 0.5) return '小吉';
      if (total > -0.5) return '平';
      if (total > -1.4) return '小凶';
      return '凶';
    };

    const handleCalculate = () => {
      if (!bazi) return;

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      // 获取今日日柱
      const dayPillar = getDayPillar(year, month, day);
      const dayGanWuxing = TIAN_GAN_WU_XING[dayPillar.gan];
      const dayZhiWuxing = DI_ZHI_WU_XING[dayPillar.zhi];

      // 计算日干、日支与日主五行的关系
      const ganRelation = getWuXingRelation(bazi, dayGanWuxing);
      const zhiRelation = getWuXingRelation(bazi, dayZhiWuxing);

      const ganFortune = getRelationFortune(ganRelation);
      const zhiFortune = getRelationFortune(zhiRelation);

      // 综合运势
      const overallFortune = getOverallFortune(ganFortune.score, zhiFortune.score);

      // 印星五行（生日主的五行）—— 最吉利的五行
      const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
      const shengWoWuxing = shengMap[bazi];

      // 幸运色（印星五行对应颜色）
      const wuxingColors = {
        '金': ['白色', '金色'],
        '木': ['绿色', '青色'],
        '水': ['黑色', '蓝色'],
        '火': ['红色', '紫色'],
        '土': ['黄色', '棕色']
      };
      const luckyColor = wuxingColors[shengWoWuxing][0];

      // 幸运数字（印星五行对应数字：河图数）
      const wuxingNumbers = {
        '金': [4, 9],
        '木': [3, 8],
        '水': [1, 6],
        '火': [2, 7],
        '土': [5, 0]
      };
      const luckyNumber = wuxingNumbers[shengWoWuxing][0];

      // 幸运方位（印星五行对应方位）
      const wuxingDirections = {
        '金': '西',
        '木': '东',
        '水': '北',
        '火': '南',
        '土': '中'
      };
      const luckyDirection = wuxingDirections[shengWoWuxing];

      // 宜忌事项 —— 根据运势等级
      const yiJiByFortune = {
        '吉': {
          yi: ['求财', '签约', '出行', '约会', '开业', '投资', '升迁', '谈判'],
          buyi: ['争执', '冒险', '贪心']
        },
        '小吉': {
          yi: ['学习', '工作', '约会', '社交', '谈判', '规划'],
          buyi: ['投资', '争执', '远行']
        },
        '平': {
          yi: ['学习', '工作', '日常事务', '修身'],
          buyi: ['投资', '冒险', '重大决策']
        },
        '小凶': {
          yi: ['静养', '反思', '低调行事', '内省'],
          buyi: ['投资', '签约', '远行', '争执']
        },
        '凶': {
          yi: ['修身养性', '低调', '内省', '祈福'],
          buyi: ['投资', '出行', '签约', '争执', '动土']
        }
      };

      const yiji = yiJiByFortune[overallFortune] || yiJiByFortune['平'];

      setResult({
        fortune: overallFortune,
        dayPillar: dayPillar.gan + dayPillar.zhi,
        dayGanWuxing,
        dayZhiWuxing,
        shiyi: yiji.yi.slice(0, 4),
        buyi: yiji.buyi.slice(0, 4),
        luckyColor,
        luckyNumber,
        luckyDirection,
      });
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">今日运势</h2>
        
        <div className="card p-6">
          <p className="text-ink-300 mb-4">根据您的八字日主五行，查看今日运势</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">日主五行</label>
              <select value={bazi} onChange={(e) => setBazi(e.target.value)} className="input-field">
                <option value="">请选择</option>
                <option value="金">金</option>
                <option value="木">木</option>
                <option value="水">水</option>
                <option value="火">火</option>
                <option value="土">土</option>
              </select>
            </div>
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            查看今日运势
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gold-50 to-primary-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">
                {result.fortune === '吉' ? '🌟' : result.fortune === '小吉' ? '✨' : result.fortune === '小凶' ? '⚠️' : result.fortune === '凶' ? '🔴' : '☀️'}
              </div>
              <div className="text-2xl font-bold text-ink-100">今日运势：{result.fortune}</div>
              <div className="text-sm text-ink-400 mt-2">今日日柱：{result.dayPillar}（日干{result.dayGanWuxing}·日支{result.dayZhiWuxing}）</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-bold text-green-400 mb-2">宜做</h4>
                <div className="flex flex-wrap gap-2">
                  {result.shiyi.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card p-4">
                <h4 className="font-bold text-red-500 mb-2">忌做</h4>
                <div className="flex flex-wrap gap-2">
                  {result.buyi.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="card p-3 text-center">
                <div className="text-xs text-ink-500">幸运色</div>
                <div className="font-bold text-ink-100">{result.luckyColor}</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-xs text-ink-500">幸运数字</div>
                <div className="font-bold text-ink-100">{result.luckyNumber}</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-xs text-ink-500">幸运方位</div>
                <div className="font-bold text-ink-100">{result.luckyDirection}</div>
              </div>
            </div>

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              流月流时细分、详细运势
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 性格速测
  const XinggeTest = () => {
    const [wuxing, setWuxing] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
      if (!wuxing) return;
      const res = getXinggeResult(wuxing);
      setResult(res);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">性格速测</h2>
        
        <div className="card p-6">
          <p className="text-ink-300 mb-4">选择您的日主五行，快速了解性格特征</p>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {['金', '木', '水', '火', '土'].map(w => (
              <button
                key={w}
                onClick={() => setWuxing(w)}
                className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${
                  wuxing === w
                    ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                    : 'border-dark-300 text-ink-300 hover:border-dark-400'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            查看性格分析
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-3">性格特质</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.traits.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-green-400 mb-2">优点</h3>
              <p className="text-ink-300 text-sm">{result.strengths}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-red-500 mb-2">不足</h3>
              <p className="text-ink-300 text-sm">{result.weaknesses}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-blue-400 mb-2">适合职业</h3>
              <p className="text-ink-300 text-sm">{result.career}</p>
            </div>

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              六亲、感情、事业细分分析
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 东西四命
  const DongxiSiming = () => {
    const [year, setYear] = useState(1990);
    const [gender, setGender] = useState('男');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
      const res = calculateDongXiMing(year, gender);
      setResult(res);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">东西四命测算</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">出生年份</label>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="input-field">
                {Array.from({ length: 100 }, (_, i) => 1930 + i).map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            测算本命卦
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary-50 to-gold-50 rounded-2xl p-6 text-center border border-primary-200">
              <div className="text-ink-400 mb-2">您的本命卦</div>
              <div className="text-5xl font-bold text-ink-100 mb-2 font-serif">{result.name}卦</div>
              <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                result.type === '东四命' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {result.type}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-bold text-ink-100 mb-2">五行属性</h4>
                <p className="text-2xl font-bold text-gold-400">{result.element}</p>
              </div>
              <div className="card p-4">
                <h4 className="font-bold text-ink-100 mb-2">本命方位</h4>
                <p className="text-2xl font-bold text-primary-600">{result.direction}</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-green-400 mb-2">吉利方位</h3>
              <div className="flex flex-wrap gap-2">
                {result.luckyDirection.map((d, i) => (
                  <span key={i} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                    {d}方
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-red-500 mb-2">不利方位</h3>
              <div className="flex flex-wrap gap-2">
                {result.unluckyDirection.map((d, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm">
                    {d}方
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-2">基础风水建议</h3>
              <p className="text-ink-300 text-sm">{result.suggestion}</p>
            </div>

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              家居完整布局方案
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  // 五行配色
  const WuxingPeise = () => {
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [result, setResult] = useState(null);

    const wuxingList = ['金', '木', '水', '火', '土'];

    const toggleLike = (w) => {
      if (likes.includes(w)) {
        setLikes(likes.filter(x => x !== w));
      } else {
        setLikes([...likes, w]);
        if (dislikes.includes(w)) {
          setDislikes(dislikes.filter(x => x !== w));
        }
      }
    };

    const toggleDislike = (w) => {
      if (dislikes.includes(w)) {
        setDislikes(dislikes.filter(x => x !== w));
      } else {
        setDislikes([...dislikes, w]);
        if (likes.includes(w)) {
          setLikes(likes.filter(x => x !== w));
        }
      }
    };

    const handleCalculate = () => {
      const results = [];
      likes.forEach(w => {
        if (WUXING_COLORS[w]) {
          results.push({ type: '喜用', wuxing: w, ...WUXING_COLORS[w] });
        }
      });
      dislikes.forEach(w => {
        if (WUXING_COLORS[w]) {
          results.push({ type: '忌用', wuxing: w, ...WUXING_COLORS[w] });
        }
      });
      // 如果没选，默认展示全部
      if (likes.length === 0 && dislikes.length === 0) {
        wuxingList.forEach(w => {
          results.push({ type: '参考', wuxing: w, ...WUXING_COLORS[w] });
        });
      }
      setResult(results);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">五行配色参考</h2>
        
        <div className="card p-6">
          <p className="text-ink-300 mb-4">选择您的喜用神和忌神，查看配色建议</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-ink-200 mb-2">喜用神（可多选）</label>
            <div className="grid grid-cols-5 gap-2">
              {wuxingList.map(w => (
                <button
                  key={w}
                  onClick={() => toggleLike(w)}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                    likes.includes(w)
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : 'border-dark-300 text-ink-300 hover:border-dark-400'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-ink-200 mb-2">忌神（可多选）</label>
            <div className="grid grid-cols-5 gap-2">
              {wuxingList.map(w => (
                <button
                  key={w}
                  onClick={() => toggleDislike(w)}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                    dislikes.includes(w)
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-dark-300 text-ink-300 hover:border-dark-400'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleCalculate} className="btn-primary w-full">
            查看配色建议
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            {result.map((item, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-ink-100">
                    五行属{item.wuxing}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      item.type === '喜用' ? 'bg-green-500/20 text-green-400' :
                      item.type === '忌用' ? 'bg-red-500/20 text-red-500' :
                      'bg-dark-200 text-ink-300'
                    }`}>
                      {item.type}
                    </span>
                  </h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm text-ink-400">推荐颜色：</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.colors.map((color, j) => (
                      <span 
                        key={j} 
                        className="px-3 py-1 rounded-full text-sm border"
                        style={{
                          backgroundColor: getColorHex(color),
                          color: isLightColor(color) ? '#333' : '#fff',
                          borderColor: getColorHex(color)
                        }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-ink-300">
                  <p><span className="font-medium">效果：</span>{item.effect}</p>
                  <p className="mt-1"><span className="font-medium">适合空间：</span>{item.suitable.join('、')}</p>
                </div>
              </div>
            ))}

            <p className="text-center text-xs text-ink-500">
              <Lock className="w-3 h-3 inline mr-1" />
              全屋吊顶、电视墙、厨卫定制配色方案
              <Link to="/vip" className="text-gold-500 ml-1">会员解锁</Link>
            </p>
          </div>
        )}
      </div>
    );
  };

  function getColorHex(colorName) {
    const colorMap = {
      '白色': '#FFFFFF', '银色': '#C0C0C0', '金色': '#FFD700', '灰白色': '#F5F5F5',
      '绿色': '#4CAF50', '青色': '#00BCD4', '翠绿色': '#009688', '墨绿色': '#2E7D32',
      '黑色': '#212121', '深蓝色': '#1565C0', '灰色': '#9E9E9E', '蓝黑色': '#1A237E',
      '红色': '#E53935', '橙色': '#FF9800', '紫色': '#9C27B0', '粉红色': '#E91E63',
      '黄色': '#FFC107', '咖啡色': '#795548', '棕色': '#8D6E63', '米色': '#FFF8E1',
    };
    return colorMap[colorName] || '#CCCCCC';
  }

  function isLightColor(colorName) {
    const lightColors = ['白色', '银色', '金色', '灰白色', '米色', '黄色'];
    return lightColors.includes(colorName);
  }

  // 吉日择时
  const JiriTool = () => {
    const [eventType, setEventType] = useState('');
    const [months, setMonths] = useState(3);
    const [result, setResult] = useState(null);

    const events = [
      { id: 'jiaqu', name: '嫁娶', keywords: ['嫁娶', '纳采', '订盟'] },
      { id: 'dongtu', name: '自建房动土', keywords: ['动土', '修造', '破土', '上梁'] },
      { id: 'zhuangxiu', name: '全屋装修', keywords: ['修造', '动土', '拆卸', '安床'] },
      { id: 'kaiye', name: '新店开业', keywords: ['开市', '交易', '立券', '纳财'] },
      { id: 'chuxing', name: '长途出行', keywords: ['出行'] },
      { id: 'banjia', name: '搬家入宅', keywords: ['移徙', '入宅', '安床'] },
    ];

    const handleCalculate = () => {
      if (!eventType) return;
      const event = events.find(e => e.id === eventType);
      if (!event) return;

      const luckyDays = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const totalDays = months * 30;

      for (let i = 0; i < totalDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const huangli = getHuangli(date);

        // 检查当日「宜」中是否包含相关关键词
        const matchedYi = event.keywords.filter(kw =>
          huangli.yi.some(item => item.includes(kw) || kw.includes(item))
        );

        // 检查当日「忌」中是否包含相关关键词（如在忌中则排除）
        const matchedJi = event.keywords.filter(kw =>
          huangli.ji.some(item => item.includes(kw) || kw.includes(item))
        );

        // 如果有匹配的宜事项，且不在忌中，则为吉日
        if (matchedYi.length > 0 && matchedJi.length === 0) {
          // 判定吉日等级：根据吉神凶煞数量 + 匹配关键词数量
          const jishenCount = huangli.jishen?.length || 0;
          const xiongshaCount = huangli.xiongsha?.length || 0;
          let level = '吉';
          if (matchedYi.length >= 2 && jishenCount > xiongshaCount) {
            level = '大吉';
          }

          luckyDays.push({
            date: `${date.getMonth() + 1}月${date.getDate()}日`,
            lunar: huangli.lunarDate,
            level,
            shiyi: matchedYi.join('、'),
          });
        }
      }

      setResult(luckyDays.slice(0, 9));
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink-100 font-serif">吉日择时</h2>
        
        <div className="card p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-ink-200 mb-2">选择事项</label>
            <div className="grid grid-cols-3 gap-2">
              {events.map(e => (
                <button
                  key={e.id}
                  onClick={() => setEventType(e.id)}
                  className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    eventType === e.id
                      ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                      : 'border-dark-300 text-ink-300 hover:border-dark-400'
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-ink-200 mb-2">查询范围</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-ink-300 font-medium w-16 text-right">未来{months}个月</span>
            </div>
          </div>

          <button onClick={handleCalculate} className="btn-primary w-full">
            查询吉日
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink-100">为您找到 {result.length} 个吉日</h3>
              <span className="badge-free">免费版展示3个</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {result.slice(0, 3).map((day, i) => (
                <div key={i} className="card p-4 text-center">
                  <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                    day.level === '大吉' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {day.level}
                  </div>
                  <div className="text-xl font-bold text-ink-100">{day.date}</div>
                  <div className="text-sm text-ink-500">{day.lunar}</div>
                  <div className="text-xs text-gold-400 mt-2">宜：{day.shiyi}</div>
                </div>
              ))}
            </div>

            {/* 锁定的更多吉日 */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-3 opacity-40 blur-sm">
                {result.slice(3, 9).map((day, i) => (
                  <div key={i} className="card p-4 text-center">
                    <div className="text-xl font-bold text-ink-100">{day.date}</div>
                    <div className="text-sm text-ink-500">{day.lunar}</div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                  <Lock className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <p className="text-ink-300 mb-3">解锁完整吉时、避煞规则</p>
                  <Link to="/vip" className="btn-primary text-sm py-2 px-6">
                    开通会员查看
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 渲染对应工具
  const renderTool = () => {
    switch (toolType) {
      case 'huangli': return <HuangliTool />;
      case 'zhougong': return <ZhougongTool />;
      case 'wuge': return <WugeTool />;
      case 'lingshu': return <LifeNumberTool />;
      case 'chouqian': return <QianTool />;
      case 'liuyao': return <LiuyaoTool />;
      case 'shengxiao': return <ShengxiaoTool />;
      case 'caiyun': return <CaiyunTest />;
      case 'jinri': return <JinriyunshiTool />;
      case 'xingge': return <XinggeTest />;
      case 'dongxi': return <DongxiSiming />;
      case 'peise': return <WuxingPeise />;
      case 'jiri': return <JiriTool />;
      default: return <div className="text-center py-12 text-ink-500">功能开发中...</div>;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-ink-400 hover:text-gold-400 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回首页
        </Link>

        <div className="card p-6 md:p-8">
          {renderTool()}
        </div>

        {/* 会员推广 */}
        <div className="mt-8 bg-gradient-to-r from-gold-50 to-primary-50 rounded-2xl p-6 border border-gold-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-100 mb-1">开通会员，解锁全部深度测算</h3>
              <p className="text-sm text-ink-300">八字详批、大运流年、风水布局、起名改名...</p>
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
