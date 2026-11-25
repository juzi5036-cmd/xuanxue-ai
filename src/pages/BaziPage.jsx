import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, User, Sparkles, ChevronRight, 
  Crown, Lock, TrendingUp, AlertCircle, Shield, Star, Heart,
  Briefcase, DollarSign, Home, Pill, Compass, Eye, EyeOff,
  ChevronDown, ChevronUp, Check, X, Activity, Target, Award,
  BookOpen, Lightbulb, Flame, Droplets, Wind, Leaf, Mountain,
  Sun, Moon, Gem, Zap, Scroll, Info
} from 'lucide-react';
import { calculateBazi, getBasicShenSha, TIAN_GAN_WU_XING, DI_ZHI_WU_XING } from '../data/bazi';
import {
  calculateDaYun,
  calculateLiuNian,
  analyzeGeju,
  analyzeXingChongHeHai,
} from '../data/baziAdvanced';

export default function BaziPage() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    calendarType: 'solar', // solar 公历, lunar 农历
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    province: '',
    city: '',
    unknownHour: false
  });
  
  const [showResult, setShowResult] = useState(false);
  const [baziResult, setBaziResult] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateBazi(
      parseInt(formData.year),
      parseInt(formData.month),
      parseInt(formData.day),
      parseInt(formData.hour),
      formData.gender
    );
    setBaziResult(result);
    setShowResult(true);
  };

  const handleUnknownHour = () => {
    setShowPayModal(true);
  };

  // 五行颜色映射
  const wuxingColors = {
    '金': 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
    '木': 'bg-green-500/20 text-green-400 border-green-300',
    '水': 'bg-blue-500/20 text-blue-400 border-blue-300',
    '火': 'bg-red-500/20 text-red-400 border-red-300',
    '土': 'bg-amber-500/20 text-amber-400 border-amber-300'
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-500 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            八字命理
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">八字排盘</h1>
          <p className="text-ink-400">输入出生信息，生成您的专属八字命盘</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <User className="w-5 h-5 text-gold-500 mr-2" />
                出生信息
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">姓名（选填）</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="请输入姓名"
                    className="input-field"
                  />
                </div>

                {/* 性别 */}
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, gender: '男' }))}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        formData.gender === '男'
                          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                          : 'border-dark-300 text-ink-400 hover:border-ink-300'
                      }`}
                    >
                      男
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, gender: '女' }))}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        formData.gender === '女'
                          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                          : 'border-dark-300 text-ink-400 hover:border-ink-300'
                      }`}
                    >
                      女
                    </button>
                  </div>
                </div>

                {/* 出生日期 */}
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    出生日期
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="input-field text-sm"
                    >
                      {Array.from({ length: 200 }, (_, i) => 1900 + i).map(year => (
                        <option key={year} value={year}>{year}年</option>
                      ))}
                    </select>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="input-field text-sm"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      className="input-field text-sm"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}日</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 出生时间 */}
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    出生时间
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="hour"
                      value={formData.hour}
                      onChange={handleInputChange}
                      disabled={formData.unknownHour}
                      className="input-field text-sm disabled:bg-dark-200"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                        <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}时</option>
                      ))}
                    </select>
                    <select
                      name="minute"
                      value={formData.minute}
                      onChange={handleInputChange}
                      disabled={formData.unknownHour}
                      className="input-field text-sm disabled:bg-dark-200"
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                        <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}分</option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center mt-2 text-sm text-ink-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name="unknownHour"
                      checked={formData.unknownHour}
                      onChange={handleInputChange}
                      className="mr-2 rounded text-gold-500 focus:ring-gold-400"
                    />
                    不清楚准确出生时辰
                  </label>
                </div>

                {/* 出生地点 */}
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    出生地点（选填）
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="input-field text-sm"
                    >
                      <option value="">省份</option>
                      <option value="beijing">北京市</option>
                      <option value="shanghai">上海市</option>
                      <option value="guangdong">广东省</option>
                      <option value="zhejiang">浙江省</option>
                      <option value="jiangsu">江苏省</option>
                    </select>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field text-sm"
                    >
                      <option value="">城市</option>
                      <option value="beijing">北京市</option>
                      <option value="shanghai">上海市</option>
                      <option value="guangzhou">广州市</option>
                      <option value="shenzhen">深圳市</option>
                      <option value="hangzhou">杭州市</option>
                    </select>
                  </div>
                  <p className="text-xs text-ink-500 mt-1">用于真太阳时自动校正</p>
                </div>

                {/* 提交按钮 */}
                {formData.unknownHour ? (
                  <button
                    type="button"
                    onClick={handleUnknownHour}
                    className="w-full bg-gradient-to-r from-gold-500 to-primary-500 text-white py-4 rounded-lg font-bold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                  >
                    <Crown className="w-5 h-5" />
                    <span>不知道时辰？AI精准反推</span>
                  </button>
                ) : (
                  <button type="submit" className="btn-primary w-full py-4 text-lg font-bold">
                    <span className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>开始排盘</span>
                    </span>
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-3">
            {!showResult ? (
              <div className="card p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-200 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-ink-300" />
                </div>
                <h3 className="text-xl font-semibold text-ink-300 mb-2">填写信息开始排盘</h3>
                <p className="text-ink-500">输入您的出生信息，即刻生成专属八字命盘</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 基础信息卡片 */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-ink-100 font-serif">命盘概览</h3>
                    <span className="badge-free">免费版</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-ink-500">姓名</span>
                      <p className="font-medium text-ink-200">{formData.name || '命主'}</p>
                    </div>
                    <div>
                      <span className="text-ink-500">性别</span>
                      <p className="font-medium text-ink-200">{formData.gender}</p>
                    </div>
                    <div>
                      <span className="text-ink-500">生肖</span>
                      <p className="font-medium text-ink-200">{baziResult.shengXiao}</p>
                    </div>
                    <div>
                      <span className="text-ink-500">日主</span>
                      <p className="font-medium text-gold-400">{baziResult.dayGan}（{TIAN_GAN_WU_XING[baziResult.dayGan]}）</p>
                    </div>
                  </div>
                </div>

                {/* 四柱八字 */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-ink-100 mb-6 font-serif">四柱八字</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {baziResult.pillars.map((pillar, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-ink-500 mb-2">{pillar.name}</div>
                        {/* 天干 */}
                        <div className={`py-4 rounded-t-lg border-2 border-b-0 ${wuxingColors[TIAN_GAN_WU_XING[pillar.gan]]}`}>
                          <div className="text-3xl font-bold font-serif">{pillar.gan}</div>
                          <div className="text-xs mt-1">{pillar.ganShiShen}</div>
                        </div>
                        {/* 地支 */}
                        <div className={`py-4 rounded-b-lg border-2 ${wuxingColors[DI_ZHI_WU_XING[pillar.zhi]]}`}>
                          <div className="text-3xl font-bold font-serif">{pillar.zhi}</div>
                          <div className="text-xs mt-1 space-y-0.5">
                            {pillar.zhiCangGan.map((cg, i) => (
                              <div key={i} className="text-xs">
                                {cg.gan}（{cg.type}）
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* 纳音 */}
                        <div className="mt-2 text-xs text-ink-500">{pillar.naYin}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 人生运势 */}
                <LifeFortuneSection baziResult={baziResult} />

                {/* 五行强弱 */}
                <WuxingSection baziResult={baziResult} />

                {/* 基础神煞 */}
                <ShenshaSection baziResult={baziResult} />

                {/* 十年大运 */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-ink-100 font-serif flex items-center">
                      <TrendingUp className="w-5 h-5 text-gold-500 mr-2" />
                      十年大运
                      <Crown className="w-4 h-4 text-gold-500 ml-2" />
                    </h3>
                    <span className="text-xs text-ink-500">前2步免费预览</span>
                  </div>
                  <DaYunSection baziResult={baziResult} formData={formData} />
                </div>

                {/* 流年吉凶 */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-ink-100 font-serif flex items-center">
                      <Calendar className="w-5 h-5 text-primary-500 mr-2" />
                      流年吉凶
                      <Crown className="w-4 h-4 text-gold-500 ml-2" />
                    </h3>
                    <span className="text-xs text-ink-500">前3年免费预览</span>
                  </div>
                  <LiuNianSection baziResult={baziResult} />
                </div>

                {/* 格局分析 */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-ink-100 font-serif flex items-center">
                      <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                      格局分析
                      <Crown className="w-4 h-4 text-gold-500 ml-2" />
                    </h3>
                    <span className="text-xs text-ink-500">基础版免费</span>
                  </div>
                  <GejuSection baziResult={baziResult} />
                </div>

                {/* 刑冲合害 */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-ink-100 font-serif flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      刑冲合害
                      <Crown className="w-4 h-4 text-gold-500 ml-2" />
                    </h3>
                    <span className="text-xs text-ink-500">基础版免费</span>
                  </div>
                  <XingChongSection baziResult={baziResult} />
                </div>

                {/* 会员解锁提示 */}
                <div className="card p-6 bg-gradient-to-r from-gold-50 to-primary-50 border-gold-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-ink-100 mb-2">开通会员，解锁完整深度解析</h4>
                      <ul className="text-sm text-ink-300 space-y-1">
                        <li>✓ 日主旺衰精准判定、格局划分、喜用神完整推导</li>
                        <li>✓ 十年大运逐段拆解、每年流年吉凶分析</li>
                        <li>✓ 事业、财运、感情、健康四大专项报告</li>
                        <li>✓ 五行居家化解完整方案</li>
                      </ul>
                      <div className="mt-4 flex items-center space-x-3">
                        <Link to="/vip" className="btn-primary">
                          立即开通 ¥28/月
                        </Link>
                        <Link to="/shichen" className="btn-secondary">
                          时辰反推
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 时辰反推弹窗 */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-dark-400 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-ink-100 font-serif">解锁完整功能</h3>
                <button 
                  onClick={() => setShowPayModal(false)}
                  className="text-ink-500 hover:text-ink-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {/* 时辰反推 */}
                <div className="p-4 border-2 border-gold-300 rounded-xl bg-gold-500/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-ink-100">时辰精准反推</span>
                        <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">独家</span>
                      </div>
                      <p className="text-sm text-ink-400 mt-1">30道题校正生辰，精准到分钟</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gold-400">¥68</span>
                      <span className="text-xs text-ink-500 block">/ 2次测算</span>
                    </div>
                  </div>
                  <Link 
                    to="/shichen" 
                    className="btn-primary w-full text-center block"
                    onClick={() => setShowPayModal(false)}
                  >
                    立即体验
                  </Link>
                </div>

                {/* 月度会员 */}
                <div className="p-4 border border-dark-300 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-ink-100">月度全站会员</span>
                        <span className="badge-vip">推荐</span>
                      </div>
                      <p className="text-sm text-ink-400 mt-1">解锁全部AI测算工具</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gold-400">¥28</span>
                      <span className="text-xs text-ink-500 block">/ 30天</span>
                    </div>
                  </div>
                  <Link 
                    to="/vip" 
                    className="btn-secondary w-full text-center block"
                    onClick={() => setShowPayModal(false)}
                  >
                    开通会员
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-3 bg-amber-500/10 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-400">
                  全部付费权益完全独立、互不赠送、权限隔离。请根据需求选择合适的服务。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 五行强弱组件 =====
function WuxingSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);

  const wuxingColors = {
    '金': 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
    '木': 'bg-green-500/20 text-green-400 border-green-300',
    '水': 'bg-blue-500/20 text-blue-400 border-blue-300',
    '火': 'bg-red-500/20 text-red-400 border-red-300',
    '土': 'bg-amber-500/20 text-amber-400 border-amber-300'
  };

  const wuxingIcons = {
    '金': Gem,
    '木': Leaf,
    '水': Droplets,
    '火': Flame,
    '土': Mountain
  };

  const maxCount = Math.max(...Object.values(baziResult.wuxingCount));
  const strongest = Object.entries(baziResult.wuxingCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const weakest = Object.entries(baziResult.wuxingCount).reduce((a, b) => a[1] < b[1] ? a : b)[0];

  // 模拟付费数据
  const premiumData = {
    wangshuai: {
      deLing: { score: 65, desc: '得令：日主生于当旺之月，得月令之气，基础力量较强' },
      deDi: { score: 45, desc: '得地：日主在地支中有根气，但根气不算深厚' },
      deShi: { score: 55, desc: '得势：天干有比劫印星相助，势均力敌' },
      total: 55,
      conclusion: '日主中和偏旺，需以泄耗为主，生扶为辅'
    },
    yongShen: ['金', '水'],
    xiShen: ['土'],
    jiShen: ['木', '火'],
    chouShen: ['木'],
    xianShen: ['土'],
    influences: [
      { aspect: '性格', icon: User, desc: '性格刚毅果断，有主见，但有时过于倔强，不易听取他人意见。待人真诚，重情重义。' },
      { aspect: '事业', icon: Briefcase, desc: '事业心强，有领导才能，适合独立创业或从事管理岗位。中年后事业运势更佳。' },
      { aspect: '财运', icon: DollarSign, desc: '财运中等偏上，正财稳定，偏财有机会但需谨慎。理财能力较强，懂得量入为出。' },
      { aspect: '感情', icon: Heart, desc: '感情专一但略显强势，配偶能力强但性格也较倔强，需注意沟通方式，避免争吵。' },
      { aspect: '健康', icon: Pill, desc: '体质较好但需注意肝胆和消化系统问题。忌熬夜，宜多运动，保持心情舒畅。' }
    ],
    suggestions: {
      colors: ['白色', '金色', '黑色', '蓝色'],
      directions: ['西方', '北方'],
      industries: ['金融', '金属', '水产', '物流', '贸易'],
      accessories: ['金饰', '银饰', '白玉', '黑曜石'],
      numbers: ['4', '9', '1', '6']
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-ink-100 mb-4 font-serif flex items-center">
        <Activity className="w-5 h-5 text-gold-500 mr-2" />
        五行强弱
      </h3>

      {/* 免费内容 - 五行条形图 */}
      <div className="space-y-3">
        {Object.entries(baziResult.wuxingCount).map(([wuxing, count]) => {
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          const IconComp = wuxingIcons[wuxing];
          return (
            <div key={wuxing} className="flex items-center">
              <span className={`w-12 text-sm font-medium flex items-center ${wuxingColors[wuxing].split(' ')[1]}`}>
                <IconComp className="w-4 h-4 mr-1" />
                {wuxing}
              </span>
              <div className="flex-1 mx-3 h-6 bg-dark-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${wuxingColors[wuxing].split(' ')[0]}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-sm text-ink-400 text-right">{count}个</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-ink-400">
        命局中 <span className="font-semibold">{strongest}</span> 偏旺，
        <span className="font-semibold">{weakest}</span> 偏弱
      </p>

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative mt-6">
          <div className="opacity-30 blur-sm space-y-4">
            {/* 日主旺衰预览 */}
            <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-200">
              <h4 className="font-bold text-gold-500 mb-3">日主旺衰详细分析</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>得令</span>
                  <span className="font-medium">65分</span>
                </div>
                <div className="w-full h-2 bg-gold-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>得地</span>
                  <span className="font-medium">45分</span>
                </div>
                <div className="w-full h-2 bg-gold-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>得势</span>
                  <span className="font-medium">55分</span>
                </div>
                <div className="w-full h-2 bg-gold-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
            {/* 喜用神预览 */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-green-500/10 rounded-lg text-center">
                <div className="text-xs text-green-400">喜用神</div>
                <div className="text-lg font-bold text-green-400">金、水</div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg text-center">
                <div className="text-xs text-red-500">忌神</div>
                <div className="text-lg font-bold text-red-400">木、火</div>
              </div>
              <div className="p-3 bg-dark-300/50 rounded-lg text-center">
                <div className="text-xs text-ink-400">闲神</div>
                <div className="text-lg font-bold text-ink-300">土</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Crown className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整五行分析</p>
              <p className="text-sm text-ink-400 mb-4">日主旺衰详判、喜用神完整推导、五行补益建议</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整内容 */}
      {unlocked && (
        <div className="mt-6 space-y-5 animate-fadeIn">
          {/* 日主旺衰详细分析 */}
          <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-200">
            <h4 className="font-bold text-gold-500 mb-3 flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              日主旺衰详细分析
            </h4>
            <div className="space-y-3">
              {Object.entries(premiumData.wangshuai).filter(([k]) => k !== 'total' && k !== 'conclusion').map(([key, val]) => (
                <div key={key} className="bg-dark-400/60 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-ink-200">{val.desc.split('：')[0]}</span>
                    <span className="font-bold text-gold-400">{val.score}分</span>
                  </div>
                  <div className="w-full h-2 bg-gold-500/20 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full" style={{ width: `${val.score}%` }}></div>
                  </div>
                  <p className="text-xs text-ink-400">{val.desc.split('：')[1]}</p>
                </div>
              ))}
              <div className="mt-3 p-3 bg-gold-500/20/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gold-500">综合旺衰指数</span>
                  <span className="text-lg font-bold text-gold-400">{premiumData.wangshuai.total}分</span>
                </div>
                <p className="text-sm text-gold-500">{premiumData.wangshuai.conclusion}</p>
              </div>
            </div>
          </div>

          {/* 五神完整列表 */}
          <div>
            <h4 className="font-bold text-ink-200 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-purple-500" />
              喜用神完整分析
            </h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-200">
                <div className="text-xs text-green-400 mb-1">用神</div>
                <div className="text-base font-bold text-green-400">{premiumData.yongShen.join('、')}</div>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="text-xs text-teal-600 mb-1">喜神</div>
                <div className="text-base font-bold text-teal-700">{premiumData.xiShen.join('、')}</div>
              </div>
              <div className="p-3 bg-dark-300/50 rounded-lg border border-dark-300">
                <div className="text-xs text-ink-400 mb-1">闲神</div>
                <div className="text-base font-bold text-ink-300">{premiumData.xianShen.join('、')}</div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-200">
                <div className="text-xs text-orange-600 mb-1">仇神</div>
                <div className="text-base font-bold text-orange-400">{premiumData.chouShen.join('、')}</div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-200">
                <div className="text-xs text-red-500 mb-1">忌神</div>
                <div className="text-base font-bold text-red-400">{premiumData.jiShen.join('、')}</div>
              </div>
            </div>
          </div>

          {/* 五行对各方面的影响 */}
          <div>
            <h4 className="font-bold text-ink-200 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
              五行对人生各方面的影响
            </h4>
            <div className="space-y-2">
              {premiumData.influences.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="p-3 bg-dark-300/50 rounded-lg">
                    <div className="flex items-center mb-1">
                      <IconComp className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="font-medium text-ink-200 text-sm">{item.aspect}</span>
                    </div>
                    <p className="text-sm text-ink-300 pl-6">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 五行补益建议 */}
          <div className="p-4 bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl border border-primary-200">
            <h4 className="font-bold text-primary-700 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              五行补益建议
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-dark-400/70 rounded-lg p-3">
                <div className="text-xs text-ink-400 mb-1">幸运颜色</div>
                <div className="font-medium text-ink-200">{premiumData.suggestions.colors.join('、')}</div>
              </div>
              <div className="bg-dark-400/70 rounded-lg p-3">
                <div className="text-xs text-ink-400 mb-1">有利方位</div>
                <div className="font-medium text-ink-200">{premiumData.suggestions.directions.join('、')}</div>
              </div>
              <div className="bg-dark-400/70 rounded-lg p-3">
                <div className="text-xs text-ink-400 mb-1">适合行业</div>
                <div className="font-medium text-ink-200">{premiumData.suggestions.industries.join('、')}</div>
              </div>
              <div className="bg-dark-400/70 rounded-lg p-3">
                <div className="text-xs text-ink-400 mb-1">吉祥饰品</div>
                <div className="font-medium text-ink-200">{premiumData.suggestions.accessories.join('、')}</div>
              </div>
            </div>
          </div>

          {/* 收起按钮 */}
          <div className="text-center">
            <button 
              onClick={() => setUnlocked(false)} 
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 基础神煞组件 =====
function ShenshaSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);
  const basicSha = getBasicShenSha(baziResult);

  // 模拟完整神煞数据
  const allShensha = {
    auspicious: [
      { name: '天乙贵人', position: basicSha.tianYiGuiRen.join('、') || '无', meaning: '最尊贵的吉神，主逢凶化吉、遇难呈祥', effect: '一生多得贵人相助，事业上易有提携' },
      { name: '文昌贵人', position: '申', meaning: '主聪明智慧、文才出众、科举功名', effect: '学习能力强，适合文职工作，有艺术天赋' },
      { name: '将星', position: '午', meaning: '主领导才能、武职显贵、掌权印', effect: '有领导气质，适合管理岗位，有权威' },
      { name: '华盖', position: '戌', meaning: '主艺术才华、僧道缘分、超然物外', effect: '聪明好学，喜独处，有宗教艺术天分' },
      { name: '羊刃', position: '卯', meaning: '主刚强勇猛、果断刚毅（亦带凶性）', effect: '性格刚烈，做事果断，但需防刚愎自用' },
      { name: '禄神', position: '寅', meaning: '主俸禄、食禄、福气', effect: '衣食无忧，生活富足，有口福' },
      { name: '桃花', position: basicSha.taoHua.join('、') || '无', meaning: '主人缘、异性缘、感情', effect: '人缘好，有魅力，感情丰富' },
      { name: '驿马', position: basicSha.yiMa.join('、') || '无', meaning: '主动迁、出行、变动', effect: '一生多变动，适合外出发展，有行动力' },
      { name: '福星贵人', position: '未', meaning: '主福气、平安、长寿', effect: '一生平安有福，逢凶化吉，晚年安康' },
      { name: '天德贵人', position: '丁', meaning: '最吉利的神煞之一，主大慈大悲', effect: '心地善良，积德行善，福报深厚' },
      { name: '月德贵人', position: '丙', meaning: '主吉祥、化解灾厄', effect: '有贵人相助，能逢凶化吉' },
      { name: '金舆', position: '辰', meaning: '主车马、出行、财富', effect: '出行顺利，有车运，财运佳' }
    ],
    inauspicious: [
      { name: '孤辰寡宿', position: '巳', meaning: '主孤独、六亲缘薄', effect: '性格较孤僻，早年离家，晚年易孤单' },
      { name: '空亡', position: '戌亥', meaning: '主虚空、不实、损耗', effect: '做事易半途而废，财运有损耗，需防虚诈' },
      { name: '劫煞', position: '亥', meaning: '主劫夺、破财、是非', effect: '易有意外破财，需防盗贼和小人暗算' },
      { name: '灾煞', position: '子', meaning: '主灾病、意外、官非', effect: '需防意外灾祸和疾病，注意安全' },
      { name: '六厄', position: '卯', meaning: '主困厄、阻碍、不顺利', effect: '人生多挫折，需坚持不懈方能成功' },
      { name: '勾绞煞', position: '丑', meaning: '主纠缠、是非、官司', effect: '易惹是非口舌，需防小人陷害和官非' },
      { name: '白虎煞', position: '寅', meaning: '主血光、外伤、脾气', effect: '性格急躁，易有外伤，需注意交通安全' },
      { name: '丧门', position: '辰', meaning: '主丧亡、孝服、不吉', effect: '需注意家中长辈健康，少探病问丧' },
      { name: '吊客', position: '午', meaning: '主吊丧、疾病、凶事', effect: '易遇丧事，自身健康需注意保养' },
      { name: '披麻', position: '酉', meaning: '主忧愁、悲伤、孝服', effect: '情绪易低落，需注意心理健康' }
    ],
    summary: '命局吉神多于凶煞，整体格局不错。天乙贵人和文昌贵人加持，事业上易得贵人相助，学业事业皆有所成。但需注意空亡和劫煞带来的财运损耗，以及孤辰带来的性格孤僻倾向。宜多行善积德，以增福避祸。'
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-ink-100 mb-4 font-serif flex items-center">
        <Star className="w-5 h-5 text-gold-500 mr-2" />
        神煞分析
      </h3>

      {/* 免费内容 - 三个基础神煞 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-500/10 rounded-lg">
          <div className="text-2xl mb-1">⭐</div>
          <div className="font-medium text-green-400">天乙贵人</div>
          <div className="text-xs text-green-400 mt-1">
            {basicSha.tianYiGuiRen.length > 0 ? basicSha.tianYiGuiRen.join('、') : '暂无'}
          </div>
        </div>
        <div className="text-center p-4 bg-pink-500/10 rounded-lg">
          <div className="text-2xl mb-1">🌸</div>
          <div className="font-medium text-pink-400">桃花</div>
          <div className="text-xs text-pink-400 mt-1">
            {basicSha.taoHua.length > 0 ? basicSha.taoHua.join('、') : '暂无'}
          </div>
        </div>
        <div className="text-center p-4 bg-blue-500/10 rounded-lg">
          <div className="text-2xl mb-1">🐴</div>
          <div className="font-medium text-blue-400">驿马</div>
          <div className="text-xs text-blue-400 mt-1">
            {basicSha.yiMa.length > 0 ? basicSha.yiMa.join('、') : '暂无'}
          </div>
        </div>
      </div>

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative mt-6">
          <div className="opacity-30 blur-sm space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {allShensha.auspicious.slice(0, 4).map((sha, idx) => (
                <div key={idx} className="p-2 bg-green-500/10 rounded-lg text-xs">
                  <span className="font-medium text-green-400">{sha.name}</span>
                  <span className="text-green-400 ml-1">{sha.position}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allShensha.inauspicious.slice(0, 4).map((sha, idx) => (
                <div key={idx} className="p-2 bg-red-500/10 rounded-lg text-xs">
                  <span className="font-medium text-red-400">{sha.name}</span>
                  <span className="text-red-400 ml-1">{sha.position}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Crown className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整神煞分析</p>
              <p className="text-sm text-ink-400 mb-4">20+神煞详判、吉凶影响、化解建议</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整内容 */}
      {unlocked && (
        <div className="mt-6 space-y-5 animate-fadeIn">
          {/* 神煞总评 */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-gold-50 rounded-xl border border-amber-200">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center">
              <Scroll className="w-4 h-4 mr-2" />
              神煞总评
            </h4>
            <p className="text-sm text-amber-400">{allShensha.summary}</p>
          </div>

          {/* 吉煞 */}
          <div>
            <h4 className="font-bold text-green-400 mb-3 flex items-center">
              <Check className="w-4 h-4 mr-2" />
              吉煞详列（{allShensha.auspicious.length}个）
            </h4>
            <div className="space-y-2">
              {allShensha.auspicious.map((sha, idx) => (
                <div key={idx} className="p-3 bg-green-500/10 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-green-400">{sha.name}</span>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">位置：{sha.position}</span>
                  </div>
                  <p className="text-sm text-ink-300 mb-1"><span className="text-ink-400">含义：</span>{sha.meaning}</p>
                  <p className="text-sm text-ink-300"><span className="text-ink-400">影响：</span>{sha.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 凶煞 */}
          <div>
            <h4 className="font-bold text-red-400 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              凶煞详列（{allShensha.inauspicious.length}个）
            </h4>
            <div className="space-y-2">
              {allShensha.inauspicious.map((sha, idx) => (
                <div key={idx} className="p-3 bg-red-500/10 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-red-400">{sha.name}</span>
                    <span className="text-sm text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full">位置：{sha.position}</span>
                  </div>
                  <p className="text-sm text-ink-300 mb-1"><span className="text-ink-400">含义：</span>{sha.meaning}</p>
                  <p className="text-sm text-ink-300"><span className="text-ink-400">影响：</span>{sha.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 收起按钮 */}
          <div className="text-center">
            <button 
              onClick={() => setUnlocked(false)} 
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 十年大运组件 =====
function DaYunSection({ baziResult, formData }) {
  const [unlocked, setUnlocked] = useState(false);

  const daYun = calculateDaYun(
    parseInt(formData.year),
    parseInt(formData.month),
    parseInt(formData.day),
    parseInt(formData.hour),
    formData.gender
  );

  const wuxingColors = {
    '金': 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
    '木': 'bg-green-500/20 text-green-400 border-green-300',
    '水': 'bg-blue-500/20 text-blue-400 border-blue-300',
    '火': 'bg-red-500/20 text-red-400 border-red-300',
    '土': 'bg-amber-500/20 text-amber-400 border-amber-300'
  };

  // 模拟完整大运详细数据
  const getFullDaYunData = (yun, idx) => {
    const base = {
      career: '事业运平稳，按部就班发展为宜。',
      wealth: '财运中等，正财稳定偏财一般。',
      love: '感情运势平顺，无大起大落。',
      health: '身体尚可，注意作息规律。',
      keyYears: []
    };
    if (idx % 3 === 0) {
      base.career = '事业运旺盛，有升职加薪机会，适合主动出击，开拓新领域。贵人运佳，易得上级赏识。';
      base.wealth = '财运亨通，正财偏财皆旺，投资机会多，可适当扩大投资规模。';
      base.love = '桃花运旺盛，单身者易遇良缘，有伴侣者感情升温。';
      base.health = '精力充沛，身体状态良好，但需注意劳逸结合。';
      base.keyYears = ['起步年', '转折年', '高峰年'];
    } else if (idx % 3 === 1) {
      base.career = '事业运一般，宜守不宜攻，稳扎稳打为上策。注意处理好人际关系。';
      base.wealth = '财运平平，支出较多，需精打细算，避免大额投资。';
      base.love = '感情有波折，需多沟通理解，避免争吵冷战。';
      base.health = '身体偏弱，注意饮食健康，定期体检。';
      base.keyYears = ['低谷年', '调整年'];
    } else {
      base.career = '事业运渐入佳境，前期积累开始见效，有新的发展机遇出现。';
      base.wealth = '财运逐步好转，收入稳步增长，可考虑中长期投资。';
      base.love = '感情趋于稳定，适合谈婚论嫁，家庭和睦。';
      base.health = '身体状态良好，精神面貌佳。';
      base.keyYears = ['起步年', '发展年'];
    }
    return base;
  };

  return (
    <div>
      {/* 免费内容 - 前2步大运 */}
      <div className="space-y-3">
        {daYun.slice(0, 2).map((yun, idx) => (
          <div key={idx} className={`p-4 rounded-xl border-2 ${wuxingColors[yun.wuxing] || 'bg-dark-200 text-ink-200 border-dark-300'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold font-serif">{yun.ganZhi}</span>
                <span className="text-sm opacity-75">{yun.wuxing}运</span>
              </div>
              <span className="text-sm font-medium">{yun.ageRange}</span>
            </div>
            <div className="text-sm opacity-80">
              <span className="font-medium">{yun.shiShenType}：</span>
              {yun.description}
            </div>
          </div>
        ))}
      </div>

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative mt-4">
          <div className="opacity-25 blur-sm space-y-3">
            {daYun.slice(2, 5).map((yun, idx) => (
              <div key={idx} className="p-4 rounded-xl border-2 bg-dark-200 border-dark-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold font-serif text-ink-300">{yun.ganZhi}</span>
                  <span className="text-sm text-ink-400">{yun.ageRange}</span>
                </div>
                <div className="text-sm text-ink-400">{yun.description}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整十年大运</p>
              <p className="text-sm text-ink-400 mb-4">8步大运完整解析，每步10年运势详解</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整大运 */}
      {unlocked && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          {/* 完整8步大运 */}
          {daYun.slice(2).map((yun, idx) => {
            const realIdx = idx + 2;
            const detail = getFullDaYunData(yun, realIdx);
            return (
              <div key={idx} className={`p-4 rounded-xl border-2 ${wuxingColors[yun.wuxing] || 'bg-dark-200 text-ink-200 border-dark-300'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold font-serif">{yun.ganZhi}</span>
                    <span className="text-sm opacity-75">{yun.wuxing}运 · {yun.shiShenType}</span>
                  </div>
                  <span className="text-sm font-medium">{yun.ageRange}</span>
                </div>
                <p className="text-sm opacity-80 mb-3">{yun.description}</p>
                
                {/* 四大维度 */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-dark-400/60 rounded-lg p-2">
                    <div className="flex items-center mb-1">
                      <Briefcase className="w-3 h-3 mr-1" />
                      <span className="font-medium">事业运</span>
                    </div>
                    <p className="opacity-80">{detail.career}</p>
                  </div>
                  <div className="bg-dark-400/60 rounded-lg p-2">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      <span className="font-medium">财运</span>
                    </div>
                    <p className="opacity-80">{detail.wealth}</p>
                  </div>
                  <div className="bg-dark-400/60 rounded-lg p-2">
                    <div className="flex items-center mb-1">
                      <Heart className="w-3 h-3 mr-1" />
                      <span className="font-medium">感情运</span>
                    </div>
                    <p className="opacity-80">{detail.love}</p>
                  </div>
                  <div className="bg-dark-400/60 rounded-lg p-2">
                    <div className="flex items-center mb-1">
                      <Pill className="w-3 h-3 mr-1" />
                      <span className="font-medium">健康运</span>
                    </div>
                    <p className="opacity-80">{detail.health}</p>
                  </div>
                </div>

                {/* 关键年份 */}
                {detail.keyYears.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {detail.keyYears.map((y, i) => (
                      <span key={i} className="text-xs bg-dark-400/70 px-2 py-0.5 rounded-full">
                        {y}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* 大运总评 */}
          <div className="p-4 bg-gradient-to-r from-gold-50 to-primary-50 rounded-xl border border-gold-200">
            <h4 className="font-bold text-gold-500 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              大运总评与人生建议
            </h4>
            <p className="text-sm text-ink-300">
              整体来看，您的人生大运起伏有致，早年运平平，中年后运势渐强。前两步大运为基础积累期，
              第三步大运开始进入上升通道，第五至第七步大运为人生黄金期，事业财运皆可达高峰。
              建议在青年时期努力学习积累，中年抓住机遇大展宏图，晚年安享成果。
              感情方面需注意在第三、第六步大运中的波折，健康方面需关注第四步大运的调养。
            </p>
          </div>

          {/* 收起按钮 */}
          <div className="text-center">
            <button 
              onClick={() => setUnlocked(false)} 
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 流年吉凶组件 =====
function LiuNianSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);
  const currentYear = new Date().getFullYear();
  const liuNian = calculateLiuNian(baziResult.dayGan, baziResult.dayZhi, currentYear, 10);

  const getLevelColor = (level) => {
    switch (level) {
      case '吉': return 'bg-green-500';
      case '小吉': return 'bg-green-400';
      case '平': return 'bg-yellow-400';
      case '小凶': return 'bg-orange-400';
      case '凶': return 'bg-red-500';
      default: return 'bg-ink-400';
    }
  };

  const getLevelBg = (level) => {
    switch (level) {
      case '吉': return 'bg-green-500/10 border-green-200';
      case '小吉': return 'bg-green-500/10 border-green-100';
      case '平': return 'bg-yellow-50 border-yellow-200';
      case '小凶': return 'bg-orange-500/10 border-orange-200';
      case '凶': return 'bg-red-500/10 border-red-200';
      default: return 'bg-dark-300/50 border-dark-300';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case '吉': return 'text-green-400';
      case '小吉': return 'text-green-400';
      case '平': return 'text-yellow-700';
      case '小凶': return 'text-orange-600';
      case '凶': return 'text-red-400';
      default: return 'text-ink-300';
    }
  };

  // 模拟每年详细数据
  const getYearDetail = (year, idx) => {
    return {
      career: 70 + ((idx * 7) % 25),
      wealth: 65 + ((idx * 5) % 30),
      love: 60 + ((idx * 8) % 35),
      health: 75 + ((idx * 3) % 20),
      advice: [
        '今年宜稳中求进，不宜冒进',
        '注意理财规划，控制支出',
        '多关心家人，保持沟通',
        '注意作息规律，适当运动'
      ],
      highlight: idx % 3 === 0 ? '今年贵人运旺，事业有突破机会' : 
                 idx % 3 === 1 ? '今年需防小人，低调行事为宜' :
                 '今年财运不错，可适当投资'
    };
  };

  return (
    <div>
      {/* 流年时间轴 - 免费显示前3年 */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {liuNian.slice(0, 3).map((year, idx) => (
          <div key={idx} className={`flex-shrink-0 w-24 p-3 rounded-xl border text-center ${getLevelBg(year.jixiongLevel)}`}>
            <div className="text-xs text-ink-400 mb-1">{year.year}年</div>
            <div className="text-sm font-bold text-ink-100 mb-1">{year.ganZhi}</div>
            <div className={`text-xs font-bold ${getLevelText(year.jixiongLevel)}`}>{year.jixiongLevel}</div>
            <div className="mt-2 w-full h-1.5 bg-dark-400/50 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${getLevelColor(year.jixiongLevel)}`} style={{ width: `${year.score}%` }}></div>
            </div>
          </div>
        ))}
        {/* 模糊的后续年份 */}
        {!unlocked && liuNian.slice(3, 7).map((year, idx) => (
          <div key={idx} className="flex-shrink-0 w-24 p-3 rounded-xl border border-dark-300 bg-dark-300/50 text-center opacity-30">
            <div className="text-xs text-ink-500 mb-1">{year.year}年</div>
            <div className="text-sm font-bold text-ink-400 mb-1">{year.ganZhi}</div>
            <div className="text-xs text-ink-500">--</div>
          </div>
        ))}
        {/* 已解锁时显示完整10年 */}
        {unlocked && liuNian.slice(3).map((year, idx) => (
          <div key={idx} className={`flex-shrink-0 w-24 p-3 rounded-xl border text-center ${getLevelBg(year.jixiongLevel)}`}>
            <div className="text-xs text-ink-400 mb-1">{year.year}年</div>
            <div className="text-sm font-bold text-ink-100 mb-1">{year.ganZhi}</div>
            <div className={`text-xs font-bold ${getLevelText(year.jixiongLevel)}`}>{year.jixiongLevel}</div>
            <div className="mt-2 w-full h-1.5 bg-dark-400/50 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${getLevelColor(year.jixiongLevel)}`} style={{ width: `${year.score}%` }}></div>
            </div>
          </div>
        ))}
        {!unlocked && (
          <div className="flex-shrink-0 w-24 flex items-center justify-center">
            <span className="text-xs text-ink-500">...共10年</span>
          </div>
        )}
      </div>

      {/* 当年详情 - 免费 */}
      {liuNian[0] && (
        <div className={`p-4 rounded-xl border ${getLevelBg(liuNian[0].jixiongLevel)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-bold ${getLevelText(liuNian[0].jixiongLevel)}`}>
              {liuNian[0].year}年 {liuNian[0].ganZhi}（{liuNian[0].shengXiao}年）
            </span>
            <span className={`text-lg font-bold ${getLevelText(liuNian[0].jixiongLevel)}`}>
              {liuNian[0].score}分
            </span>
          </div>
          <p className="text-sm text-ink-300">{liuNian[0].description}</p>
        </div>
      )}

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative mt-4">
          <div className="opacity-25 blur-sm">
            <div className="p-4 bg-dark-300/50 rounded-xl space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {['事业', '财运', '感情', '健康'].map((d, i) => (
                  <div key={i} className="text-center p-2 bg-dark-400 rounded-lg">
                    <div className="text-xs text-ink-400">{d}</div>
                    <div className="font-bold text-ink-300">80分</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-400">四大维度流年详细分析与建议...</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整流年分析</p>
              <p className="text-sm text-ink-400 mb-4">10年运势详解、每年四大维度评分与建议</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整流年详情 */}
      {unlocked && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          {/* 十年运势总评 */}
          <div className="p-4 bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl border border-primary-200">
            <h4 className="font-bold text-primary-700 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              十年运势总评
            </h4>
            <p className="text-sm text-ink-300">
              未来十年整体呈上升趋势，前三年为积累期，宜稳扎稳打；
              第四至第六年为快速发展期，机遇与挑战并存，需把握机会；
              第七至第十年为收获期，事业财运可达新高度。
              其中第3、6、9年为关键转折点，需特别注意。
            </p>
          </div>

          {/* 每年详细分析 */}
          {liuNian.slice(1).map((year, idx) => {
            const realIdx = idx + 1;
            const detail = getYearDetail(year, realIdx);
            return (
              <div key={idx} className={`p-4 rounded-xl border ${getLevelBg(year.jixiongLevel)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className={`font-bold ${getLevelText(year.jixiongLevel)}`}>
                      {year.year}年 {year.ganZhi}（{year.shengXiao}年）
                    </span>
                    {realIdx % 3 === 0 && (
                      <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">重点年</span>
                    )}
                  </div>
                  <span className={`text-lg font-bold ${getLevelText(year.jixiongLevel)}`}>
                    {year.score}分
                  </span>
                </div>

                {/* 四大维度评分 */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-ink-400 mb-1">事业</div>
                    <div className="text-sm font-bold text-ink-200">{detail.career}分</div>
                    <div className="w-full h-1 bg-dark-400/50 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${detail.career}%` }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-ink-400 mb-1">财运</div>
                    <div className="text-sm font-bold text-ink-200">{detail.wealth}分</div>
                    <div className="w-full h-1 bg-dark-400/50 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${detail.wealth}%` }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-ink-400 mb-1">感情</div>
                    <div className="text-sm font-bold text-ink-200">{detail.love}分</div>
                    <div className="w-full h-1 bg-dark-400/50 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: `${detail.love}%` }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-ink-400 mb-1">健康</div>
                    <div className="text-sm font-bold text-ink-200">{detail.health}分</div>
                    <div className="w-full h-1 bg-dark-400/50 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${detail.health}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* 年度亮点 */}
                <div className="text-sm text-ink-300 mb-2">
                  <span className="font-medium">年度亮点：</span>{detail.highlight}
                </div>

                {/* 注意事项 */}
                <div className="text-sm text-ink-300">
                  <span className="font-medium">注意事项：</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs">
                    {detail.advice.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* 收起按钮 */}
          <div className="text-center">
            <button 
              onClick={() => setUnlocked(false)} 
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 格局分析组件 =====
function GejuSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);
  const geju = analyzeGeju(baziResult.dayGan, baziResult.pillars);

  // 模拟详细格局数据
  const premiumGeju = {
    chengGeTiaoJian: [
      '月令为用神，且得天干透出',
      '日主有根气，能任财官',
      '格局清纯，无严重刑冲破坏',
      '用神有制有化，配合得当'
    ],
    gejuCengci: '中上等格局，格局清纯，用神有力，一生总体运势不错，中年后可达小康以上水平。',
    wuxingScores: [
      { name: '金', score: 25, level: '偏旺' },
      { name: '木', score: 15, level: '偏弱' },
      { name: '水', score: 20, level: '中和' },
      { name: '火', score: 22, level: '偏旺' },
      { name: '土', score: 18, level: '中和' }
    ],
    careerDirection: '适合从事金融、管理、技术类工作，有创业潜质',
    suitableIndustries: ['金融业', 'IT互联网', '管理咨询', '教育培训', '医疗健康'],
    personality: '性格刚毅果断，有主见有魄力，做事认真负责，追求完美。但有时过于倔强固执，不善于变通，待人较严格。',
    lifeTrend: '早年家境一般，学业运不错，青年时期事业起步较稳，中年进入黄金发展期，40岁后事业财运可达高峰。晚年生活富足，子女孝顺。整体人生呈稳步上升趋势。'
  };

  const wuxingColors = {
    '金': 'bg-yellow-500/20 text-yellow-700',
    '木': 'bg-green-500/20 text-green-400',
    '水': 'bg-blue-500/20 text-blue-400',
    '火': 'bg-red-500/20 text-red-400',
    '土': 'bg-amber-500/20 text-amber-400'
  };

  return (
    <div className="space-y-4">
      {/* 免费内容 */}
      {/* 日主强弱 */}
      <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
        <span className="text-ink-300">日主强弱</span>
        <span className={`font-bold ${
          geju.dayStrength === '身强' ? 'text-red-400' :
          geju.dayStrength === '身弱' ? 'text-blue-400' : 'text-green-400'
        }`}>
          {geju.dayStrength}
        </span>
      </div>

      {/* 格局名称 */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <div className="text-center mb-2">
          <span className="text-2xl font-bold text-purple-400">{geju.pattern}</span>
        </div>
        <p className="text-sm text-ink-300 text-center">{geju.patternDesc}</p>
        <div className="text-center mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            geju.overallLevel.includes('上') ? 'bg-green-500/20 text-green-400' :
            geju.overallLevel.includes('中') ? 'bg-yellow-500/20 text-yellow-700' :
            'bg-red-500/20 text-red-400'
          }`}>
            {geju.overallLevel}格局
          </span>
        </div>
      </div>

      {/* 喜用神（免费显示部分） */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-green-500/10 rounded-xl text-center">
          <div className="text-xs text-green-400 mb-1">喜用神</div>
          <div className="flex justify-center space-x-2">
            {geju.yongShen.slice(0, 2).map((s, i) => (
              <span key={i} className="text-lg font-bold text-green-400">{s}</span>
            ))}
          </div>
        </div>
        <div className="p-3 bg-red-500/10 rounded-xl text-center">
          <div className="text-xs text-red-500 mb-1">忌神</div>
          <div className="flex justify-center space-x-2">
            {geju.jiShen.slice(0, 2).map((s, i) => (
              <span key={i} className="text-lg font-bold text-red-400">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative">
          <div className="opacity-25 blur-sm">
            <div className="p-4 bg-dark-300/50 rounded-xl space-y-3">
              <p className="text-sm text-ink-400">格局详细分析、喜用神完整推导、取用建议...</p>
              <div className="grid grid-cols-5 gap-1">
                {['用神', '喜神', '闲神', '仇神', '忌神'].map((s, i) => (
                  <div key={i} className="text-center p-2 bg-dark-400 rounded-lg">
                    <div className="text-xs text-ink-500">{s}</div>
                    <div className="font-bold text-ink-400">金</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整格局分析</p>
              <p className="text-sm text-ink-400 mb-4">格局层次详判、五神完整分析、人生运势走向</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整内容 */}
      {unlocked && (
        <div className="space-y-4 animate-fadeIn">
          {/* 格局详细解析 */}
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-400 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              格局详细解析
            </h4>
            <div className="mb-3">
              <div className="text-sm font-medium text-ink-200 mb-2">成格条件：</div>
              <ul className="space-y-1">
                {premiumGeju.chengGeTiaoJian.map((cond, idx) => (
                  <li key={idx} className="text-sm text-ink-300 flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    {cond}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-dark-400/60 rounded-lg">
              <div className="text-sm font-medium text-ink-200 mb-1">格局层次：</div>
              <p className="text-sm text-ink-300">{premiumGeju.gejuCengci}</p>
            </div>
          </div>

          {/* 五神完整分析 */}
          <div>
            <h4 className="font-bold text-ink-200 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-purple-500" />
              五神完整分析
            </h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-200">
                <div className="text-xs text-green-400 mb-1">用神</div>
                <div className="text-lg font-bold text-green-400">{geju.yongShen[0] || '金'}</div>
                <div className="text-xs text-green-400 mt-1">最需补</div>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="text-xs text-teal-600 mb-1">喜神</div>
                <div className="text-lg font-bold text-teal-700">{geju.yongShen[1] || '水'}</div>
                <div className="text-xs text-teal-600 mt-1">有助益</div>
              </div>
              <div className="p-3 bg-dark-300/50 rounded-lg border border-dark-300">
                <div className="text-xs text-ink-400 mb-1">闲神</div>
                <div className="text-lg font-bold text-ink-300">土</div>
                <div className="text-xs text-ink-400 mt-1">无大害</div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-200">
                <div className="text-xs text-orange-600 mb-1">仇神</div>
                <div className="text-lg font-bold text-orange-400">{geju.jiShen[1] || '火'}</div>
                <div className="text-xs text-orange-600 mt-1">助忌神</div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-200">
                <div className="text-xs text-red-500 mb-1">忌神</div>
                <div className="text-lg font-bold text-red-400">{geju.jiShen[0] || '木'}</div>
                <div className="text-xs text-red-500 mt-1">需避免</div>
              </div>
            </div>
          </div>

          {/* 五行力量详细打分 */}
          <div>
            <h4 className="font-bold text-ink-200 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-gold-500" />
              五行力量详细打分
            </h4>
            <div className="space-y-2">
              {premiumGeju.wuxingScores.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <span className={`w-10 text-sm font-medium ${wuxingColors[item.name].split(' ')[1]}`}>
                    {item.name}
                  </span>
                  <div className="flex-1 mx-3 h-5 bg-dark-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${wuxingColors[item.name].split(' ')[0]}`}
                      style={{ width: `${item.score * 2}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-ink-400 text-right">{item.score}分</span>
                  <span className="w-12 text-xs text-ink-500 text-right">{item.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 格局对人生的影响 */}
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <div className="flex items-center mb-1">
                <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-medium text-blue-400 text-sm">事业方向</span>
              </div>
              <p className="text-sm text-ink-300 pl-6">{premiumGeju.careerDirection}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <div className="flex items-center mb-1">
                <Home className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-medium text-green-400 text-sm">适合行业</span>
              </div>
              <p className="text-sm text-ink-300 pl-6">{premiumGeju.suitableIndustries.join('、')}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <div className="flex items-center mb-1">
                <User className="w-4 h-4 mr-2 text-purple-500" />
                <span className="font-medium text-purple-400 text-sm">性格特点</span>
              </div>
              <p className="text-sm text-ink-300 pl-6">{premiumGeju.personality}</p>
            </div>
          </div>

          {/* 人生整体运势走向 */}
          <div className="p-4 bg-gradient-to-r from-gold-50 to-amber-50 rounded-xl border border-gold-200">
            <h4 className="font-bold text-gold-500 mb-2 flex items-center">
              <Compass className="w-4 h-4 mr-2" />
              人生整体运势走向
            </h4>
            <p className="text-sm text-ink-300">{premiumGeju.lifeTrend}</p>
          </div>

          {/* 收起按钮 */}
          <div className="text-center">
            <button 
              onClick={() => setUnlocked(false)} 
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 刑冲合害组件 =====
function XingChongSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);
  const result = analyzeXingChongHeHai(baziResult.pillars);
  const allRelations = [
    ...result.liuHe.map(r => ({ ...r, type: '六合', typeColor: 'text-green-400 bg-green-500/10' })),
    ...result.sanHe.map(r => ({ ...r, type: '三合', typeColor: 'text-blue-400 bg-blue-500/10' })),
    ...result.sanHui.map(r => ({ ...r, type: '三会', typeColor: 'text-teal-600 bg-teal-50' })),
    ...result.xiangChong.map(r => ({ ...r, type: '六冲', typeColor: 'text-red-400 bg-red-500/10' })),
    ...result.xiangXing.map(r => ({ ...r, type: '三刑', typeColor: 'text-orange-600 bg-orange-500/10' })),
    ...result.xiangHai.map(r => ({ ...r, type: '六害', typeColor: 'text-purple-400 bg-purple-500/10' })),
    ...(result.xiangPo || result.po || []).map(r => ({ ...r, type: '相破', typeColor: 'text-pink-400 bg-pink-500/10' })),
    ...result.tianGanWuHe.map(r => ({ ...r, type: '天干五合', typeColor: 'text-teal-600 bg-teal-50' })),
  ];

  // 模拟详细关系数据
  const getRelationDetail = (type) => {
    const details = {
      '六合': { desc: '地支六合是命局中最重要的合局之一，主和合、圆满、牵绊。', impact: '对感情婚姻影响最大，六合多者人缘好，易得贵人相助。' },
      '三合': { desc: '三合局是地支中三种五行的组合，力量强大，主团结、合作、成就。', impact: '三合局成格者事业易有大成就，适合团队合作，人脉广。' },
      '三会': { desc: '三会局是同一五行方位的三支会聚，力量比三合更大，主聚集、鼎盛。', impact: '三会局成格者力量集中，事业财运爆发力强，但也需防过犹不及。' },
      '六冲': { desc: '地支六冲是方位对冲，主冲突、变动、分离、不稳定。', impact: '六冲多者一生变动大，感情事业多波折，但也主冲则动，动中求财。' },
      '三刑': { desc: '三刑是地支之间的刑克关系，主刑伤、是非、官非、伤病。', impact: '三刑多者需注意官非口舌，健康方面易有刑伤，宜多行善积德。' },
      '六害': { desc: '六害是地支之间的相害关系，主损害、不和、暗伤、小人。', impact: '六害多者易遇小人暗算，人际关系需谨慎，注意防范暗地中伤。' },
      '相破': { desc: '相破是地支之间的破坏关系，主破损、消耗、不完整。', impact: '相破多者做事易半途而废，财运有损耗，感情易有裂痕。' },
      '天干五合': { desc: '天干五合是天干之间的化合，主合作、感情、牵绊。', impact: '天干五合对人际关系和感情影响显著，合多者人缘佳但也易受牵绊。' }
    };
    return details[type] || { desc: '暂无详细描述', impact: '暂无详细分析' };
  };

  const typeOrder = ['六合', '三合', '三会', '天干五合', '六冲', '三刑', '六害', '相破'];
  const groupedRelations = typeOrder.map(type => ({
    type,
    items: allRelations.filter(r => r.type === type)
  })).filter(g => g.items.length > 0);

  return (
    <div className="space-y-4">
      {/* 统计 - 免费 */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-3 bg-green-500/10 rounded-lg">
          <div className="text-lg font-bold text-green-400">
            {result.liuHe.length + result.sanHe.length}
          </div>
          <div className="text-xs text-green-400">合</div>
        </div>
        <div className="p-3 bg-red-500/10 rounded-lg">
          <div className="text-lg font-bold text-red-400">
            {result.xiangChong.length}
          </div>
          <div className="text-xs text-red-400">冲</div>
        </div>
        <div className="p-3 bg-orange-500/10 rounded-lg">
          <div className="text-lg font-bold text-orange-600">
            {result.xiangXing.length + result.xiangHai.length}
          </div>
          <div className="text-xs text-orange-600">刑害</div>
        </div>
      </div>

      {/* 主要关系列表 - 免费 */}
      {allRelations.length > 0 ? (
        <div className="space-y-2">
          {allRelations.slice(0, 4).map((rel, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${rel.typeColor.split(' ')[1]}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-bold ${rel.typeColor.split(' ')[0]}`}>{rel.type}</span>
                <span className="text-sm font-medium text-ink-200">
                  {rel.zhi1 || rel.gan1}{rel.zhi2 || rel.zhi3 ? '-' + (rel.zhi2 || '') : ''}
                  {rel.zhi3 ? '-' + rel.zhi3 : ''}
                  {rel.gan2 ? '-' + rel.gan2 : ''}
                </span>
              </div>
              <p className="text-xs text-ink-300">{rel.effect || rel.description || ''}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-ink-500 text-sm">
          命局刑冲合害关系较少，格局相对清纯
        </div>
      )}

      {/* 总体评价 - 免费 */}
      <div className="p-3 bg-dark-300/50 rounded-xl">
        <p className="text-sm text-ink-300">{result.summary}</p>
      </div>

      {/* 未解锁 - 模糊预览 + 双按钮 */}
      {!unlocked && (
        <div className="relative">
          <div className="opacity-25 blur-sm">
            <div className="p-4 bg-dark-300/50 rounded-xl space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {['六合', '三合', '六冲', '三刑'].map((t, i) => (
                  <div key={i} className="text-center p-2 bg-dark-400 rounded-lg">
                    <div className="text-xs text-ink-500">{t}</div>
                    <div className="font-bold text-ink-400">{i + 1}个</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-400">详细关系拆解、影响分析、化解建议...</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-6 text-center">
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-200 font-medium mb-2">解锁完整关系分析</p>
              <p className="text-sm text-ink-400 mb-4">八大关系详析、命局关系图、化解建议</p>
              <div className="flex items-center justify-center space-x-3">
                <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm">
                  预览完整效果
                </button>
                <Link to="/vip" className="btn-primary text-sm">
                  开通会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 已解锁 - 完整内容 */}
      {unlocked && (
        <div className="space-y-5 animate-fadeIn">
          {/* 完整关系分类统计 */}
          <div className="grid grid-cols-4 gap-2">
            {groupedRelations.map((group, idx) => (
              <div key={idx} className={`p-2 rounded-lg text-center ${group.items[0].typeColor.split(' ')[1]}`}>
                <div className={`text-lg font-bold ${group.items[0].typeColor.split(' ')[0]}`}>
                  {group.items.length}
                </div>
                <div className={`text-xs ${group.items[0].typeColor.split(' ')[0]}`}>
                  {group.type}
                </div>
              </div>
            ))}
          </div>

          {/* 各类关系详细解读 */}
          {groupedRelations.map((group, gIdx) => {
            const detail = getRelationDetail(group.type);
            const colorClass = group.items[0].typeColor;
            return (
              <div key={gIdx} className={`p-4 rounded-xl ${colorClass.split(' ')[1]} border ${colorClass.split(' ')[0].replace('text-', 'border-').replace('600', '200')}`}>
                <h4 className={`font-bold ${colorClass.split(' ')[0]} mb-2`}>
                  {group.type}（{group.items.length}个）
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {group.items.map((item, iIdx) => (
                    <span key={iIdx} className={`px-2 py-1 rounded-full text-xs font-medium bg-dark-400/60 ${colorClass.split(' ')[0]}`}>
                      {item.zhi1 || item.gan1}{item.zhi2 || item.zhi3 ? '-' + (item.zhi2 || '') : ''}
                      {item.zhi3 ? '-' + item.zhi3 : ''}
                      {item.gan2 ? '-' + item.gan2 : ''}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-300 mb-1"><span className="font-medium">含义：</span>{detail.desc}</p>
                <p className="text-sm text-ink-300"><span className="font-medium">影响：</span>{detail.impact}</p>
              </div>
            );
          })}

          {/* 命局关系图（文字描述） */}
          <div className="p-4 bg-dark-300/50 rounded-xl">
            <h4 className="font-bold text-ink-200 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-amber-500" />
              命局关系图
            </h4>
            <div className="bg-dark-400 rounded-lg p-4 font-mono text-sm text-ink-300">
              <div className="text-center mb-2">
                <span className="text-green-400">年柱</span>
                <span className="mx-2 text-ink-500">——</span>
                <span className="text-blue-400">月柱</span>
                <span className="mx-2 text-ink-500">——</span>
                <span className="text-purple-400">日柱</span>
                <span className="mx-2 text-ink-500">——</span>
                <span className="text-red-400">时柱</span>
              </div>
              <div className="text-xs text-ink-400 mt-4 space-y-1">
                <div>
                  <span className="text-green-400">● 合的关系：</span>
                  {result.liuHe.length > 0 ? `地支六合 ${result.liuHe.length}组` : ''}
                  {result.sanHe.length > 0 ? `，三合局 ${result.sanHe.length}组` : ''}
                  {result.tianGanWuHe.length > 0 ? `，天干五合 ${result.tianGanWuHe.length}组` : ''}
                </div>
                <div>
                  <span className="text-red-400">● 冲的关系：</span>
                  地支六冲 {result.xiangChong.length}组
                </div>
                <div>
                  <span className="text-orange-600">● 刑害关系：</span>
                  三刑 {result.xiangXing.length}组，六害 {result.xiangHai.length}组
                </div>
              </div>
            </div>
          </div>

          {/* 对人生各方面的影响 */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-400 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              对人生各方面的影响
            </h4>
            <div className="space-y-2 text-sm text-ink-300">
              <p><span className="font-medium text-purple-400">事业：</span>命局合多冲少，事业相对稳定，适合团队合作，人缘好易得贵人助。但冲的力量也需注意，事业中易有变动和竞争。</p>
              <p><span className="font-medium text-purple-400">感情：</span>有六合加持，感情缘分深，但刑害的存在也带来波折，需注意沟通方式，避免因小事产生误会。</p>
              <p><span className="font-medium text-purple-400">健康：</span>三刑六害对健康有一定影响，需注意肝胆脾胃保养，定期体检，保持良好作息。</p>
              <p><span className="font-medium text-purple-400">人际：</span>合多者人缘好，但刑害也预示有小人，需注意辨别真假朋友，远离是非之地。</p>
            </div>
          </div>

          {/* 化解建议 */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-gold-50 rounded-xl border border-amber-200">
            <h4 className="font-bold text-amber-400 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              化解建议
            </h4>
            <ul className="text-sm text-ink-300 space-y-1.5">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                佩戴与用神五行相应的饰品，增强用神力量以化解凶煞
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                居家风水调整，朝向和布局以喜用神方位为吉
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                多行善积德，积累福报，可化解部分命局中的不利因素
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                选择与自己命格相合的行业和伴侣，可减轻刑冲的影响
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                保持积极乐观的心态，性格的修养可改变命运的走向
              </li>
            </ul>
          </div>

          {/* 收起按钮 */}
          <div className="text-center">
            <button
              onClick={() => setUnlocked(false)}
              className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              收起完整内容
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 人生运势组件 =====
function LifeFortuneSection({ baziResult }) {
  const [unlocked, setUnlocked] = useState(false);

  const dayGan = baziResult.dayGan;
  const dayWuxing = TIAN_GAN_WU_XING[dayGan];
  const geju = analyzeGeju(dayGan, baziResult.pillars);
  const wuxingCount = baziResult.wuxingCount;
  const strongest = Object.entries(wuxingCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const weakest = Object.entries(wuxingCount).reduce((a, b) => a[1] < b[1] ? a : b)[0];

  const tagPool = ['早发晚成', '先苦后甜', '稳中求进', '贵人型', '技术型', '创意型', '管理型', '安稳型', '变动型', '独立型', '合作型'];
  const ganCode = dayGan.charCodeAt(0);
  const selectedTags = [tagPool[ganCode % 4], tagPool[(ganCode + 3) % 7], tagPool[(ganCode + 6) % 11]];

  const lifeData = {
    lifeOverview: {
      summary: `你是${dayWuxing}命之人，命中${strongest}气重、${weakest}气轻，整体人生呈${selectedTags[0]}的走势。性格上${dayWuxing === '金' ? '刚毅果决、做事不拖泥带水' : dayWuxing === '木' ? '正直向上、有同理心但容易心软' : dayWuxing === '水' ? '聪明灵活、善于变通但容易三分钟热度' : dayWuxing === '火' ? '热情奔放、感染力强但容易急躁冲动' : '踏实稳重、靠谱但有时过于保守固执'}。一生大方向是${geju.overallLevel.includes('上') ? '运势不错，只要选对赛道，中年后容易出成绩' : geju.overallLevel.includes('中') ? '比上不足比下有余，关键在于能否在35岁前找到方向' : '波折偏多，但每段低谷都会逼出真本事'}。`,
      tags: selectedTags,
      lifeArc: {
        youth: dayWuxing === '金' ? '少年时期家境尚可，但个性倔强，容易和长辈起冲突，学业靠后劲' : dayWuxing === '木' ? '早年家境普通，但学习能力强，靠读书走出第一步' : dayWuxing === '水' ? '少年时期变动多，可能转学或搬家，但适应力强' : dayWuxing === '火' ? '早年性格活泼，人缘好，但容易因为贪玩影响成绩' : '少年时期性格沉稳，比同龄人早熟，成绩中上',
        middle: dayWuxing === '金' ? '30到45岁是黄金期，事业发力明显，收入跳一个台阶，但也容易因脾气得罪人' : dayWuxing === '木' ? '28岁后逐渐找到方向，35到45岁是上升期，靠专业能力立足' : dayWuxing === '水' ? '中年是转折期，可能换行业或换城市，前几年折腾但后面会柳暗花明' : dayWuxing === '火' ? '中年是爆发期，如果踩准风口收入会猛涨，但也容易大起大落' : '中年是积累期，不追风口，稳扎稳打，资产靠时间滚雪球',
        late: dayWuxing === '金' ? '50岁后反而放慢节奏，开始关注健康和家庭，早年攒下的底子让晚年不愁' : dayWuxing === '木' ? '50岁后重心转向子女和健康，早年种的人缘开始回报' : dayWuxing === '水' ? '50岁后反而比中年更安稳，之前的折腾变成了经验，晚年有惊喜' : dayWuxing === '火' ? '50岁后需要主动收敛节奏，不再适合高强度冲刺，越慢反而越稳' : '50岁后是收获期，前半生的稳健积累在这一段集中回报',
      },
      basis: `日主${dayGan}（${dayWuxing}），${geju.pattern}，${strongest}偏旺${weakest}偏弱。`,
    },
    learningFortune: {
      summary: dayWuxing === '金' ? '你适合逻辑型学科，数学、物理、工程类科目上手快，但文科靠死记硬背的部分容易丢分。' : dayWuxing === '木' ? '你适合人文社科类，语言表达和理解能力强，文学、历史、生物是加分项。' : dayWuxing === '水' ? '你学东西快但容易浅尝辄止，适合跨学科、综合性强的方向，但需要逼自己深耕一个领域。' : dayWuxing === '火' ? '你思维跳跃，创意型学科是你的主场，但需要约束自己去完成枯燥的基础训练。' : '你适合系统性、长期性的学习路径，医学、法律、会计这种需要耐力的专业最对路。',
      level: geju.overallLevel.includes('上') ? '学习能力强' : geju.overallLevel.includes('中') ? '学习能力中等' : '学习能力一般',
      strength: dayWuxing === '金' ? ['逻辑推理', '条理清晰', '执行力强'] : dayWuxing === '木' ? ['阅读理解', '语言表达', '同理心强'] : dayWuxing === '水' ? ['思维敏捷', '触类旁通', '适应力强'] : dayWuxing === '火' ? ['创意发散', '表现力强', '灵感多'] : ['扎实稳健', '耐力强', '执行力持久'],
      weakness: dayWuxing === '金' ? ['过于刻板', '文科偏弱', '不善变通'] : dayWuxing === '木' ? ['理科偏弱', '优柔寡断', '容易分心'] : dayWuxing === '水' ? ['不够专注', '浅尝辄止', '缺乏深度'] : dayWuxing === '火' ? ['坐不住', '粗心大意', '三分钟热度'] : ['思维偏慢', '不善创新', '过于保守'],
      advice: dayWuxing === '金' ? '把优势放在理科和工程方向，文科靠方法补而不是硬背，考试前一定要模拟限时训练。' : dayWuxing === '木' ? '选专业往人文社科靠，理科找搭档互补，别逼自己死磕数学。' : dayWuxing === '水' ? '关键是选一个方向深耕至少三年，别频繁换赛道，本科学历不如一技之长。' : dayWuxing === '火' ? '把创意落到作品上，别只停在想法阶段，找一个执行型搭档合伙。' : '走长期路线，考证、考级、积累资质，别和快节奏的人比速度比厚度。',
      basis: `日主${dayWuxing}，${strongest}旺${weakest}弱影响思维模式。`,
    },
    wealthFortune: {
      summary: dayWuxing === '金' ? '你赚钱靠专业能力和管理，不是靠运气。正财比偏财稳，适合拿薪资+奖金的模式。' : dayWuxing === '木' ? '你的财运靠人脉和口碑慢慢积累，不适合投机，适合做长线生意或专业服务。' : dayWuxing === '水' ? '你的财路多但散，容易左手进右手出，关键不是赚多少而是留多少。' : dayWuxing === '火' ? '你的财运有爆发性，踩对风口能一波起来，但也容易因为冲动消费或投资回吐。' : '你的财运靠积累，不靠暴富。稳健型收入+固定资产增值是最适合你的模式。',
      level: strongest === dayWuxing ? '财运中上' : weakest === dayWuxing ? '财运中等' : '财运平稳',
      getWealthWay: dayWuxing === '金' ? '靠专业技能和职位晋升，正财为主，兼职咨询或技术入股可增收' : dayWuxing === '木' ? '靠人脉经营和长期合作，口碑带来的转介绍是主要财源' : dayWuxing === '水' ? '靠信息差和资源整合赚钱，适合做中间人或交易平台类业务' : dayWuxing === '火' ? '靠创意、流量和风口赚钱，适合做内容和品牌，但需要有人在后面管账' : '靠稳定薪资和不动产增值，适合体制内或大平台长期积累',
      risk: dayWuxing === '金' ? '风险在于过于自信，觉得自己判断不会错，重仓单一投资容易翻车。' : dayWuxing === '木' ? '风险在于心软借钱给朋友或亲戚，借出去容易要回来难。' : dayWuxing === '水' ? '风险在于花得太快，赚到钱就想花，没有储蓄习惯。' : dayWuxing === '火' ? '风险在于冲动投资和面子消费，看到机会就想冲，不设止损线。' : '风险在于过于保守，错过机会，通货膨胀会吃掉存款购买力。',
      advice: dayWuxing === '金' ? '把钱分三份：一份定存保底，一份买指数基金长期定投，一份留流动资金。别碰不懂的投资。' : dayWuxing === '木' ? '拒绝借钱给亲友，除非你打算送。投资选稳健型基金和不动产，别追热点。' : dayWuxing === '水' ? '开一个只进不出的账户，每月工资到账先转20%进去。投资找合伙人管，自己别管操作。' : dayWuxing === '火' ? '设一个止损线，亏到多少无条件离场。消费用预算制，每月花超就停。' : '适度配置权益类资产，别全放银行。买不动产要选核心地段，别贪便宜买偏远。',
      basis: `命局${strongest}旺，${weakest}弱，财星与日主关系决定求财方式。`,
    },
    careerFortune: {
      summary: dayWuxing === '金' ? '你适合需要决断力和执行力的岗位，管理和技术双线发展都行，但不适合做纯协调型角色。' : dayWuxing === '木' ? '你适合需要专业深度和人脉积累的行业，做久了会越老越值钱，但不适合快进快出的行业。' : dayWuxing === '水' ? '你适合需要信息整合和灵活应变的工作，跨行业跳槽反而能找到最优解，但频繁跳槽是双刃剑。' : dayWuxing === '火' ? '你适合需要创意和表现力的工作，做内容、品牌、营销是主场，但纯执行型工作会让你窒息。' : '你适合需要稳定和系统性的工作，体制内、大企业、医疗教育是你能沉得住气的赛道。',
      level: geju.overallLevel,
      suitableStyle: dayWuxing === '金' ? '管理+技术复合型，适合做带团队的负责人' : dayWuxing === '木' ? '专业型+人脉型，适合做顾问或资深专家路线' : dayWuxing === '水' ? '灵活型+整合型，适合做项目制或平台型工作' : dayWuxing === '火' ? '创意型+表现型，适合做IP或品牌操盘手' : '稳健型+系统型，适合做大平台里深耕一个领域',
      suitableIndustries: dayWuxing === '金' ? ['金融', '机械制造', 'IT技术', '法律', '军警'] : dayWuxing === '木' ? ['教育', '出版', '中医药', '农林', '心理咨询'] : dayWuxing === '水' ? ['物流', '贸易', '传媒', '旅游', '信息咨询'] : dayWuxing === '火' ? ['广告营销', '影视文娱', '餐饮', '电商直播', '设计'] : ['房地产', '政务', '医疗', '银行', '基建'],
      avoidIndustries: dayWuxing === '金' ? ['纯服务业', '低端代工'] : dayWuxing === '木' ? ['快消品', '短期炒作型生意'] : dayWuxing === '水' ? ['重资产制造业', '需要长期坐班的行业'] : dayWuxing === '火' ? ['纯后台数据岗', '重复性高的流水线工作'] : ['高风险创投', '快节奏互联网创业'],
      advice: dayWuxing === '金' ? '30岁前把专业能力打扎实，30到40岁争取带团队，别跳频繁跳槽。' : dayWuxing === '木' ? '选一个行业深耕至少五年，人脉和口碑需要时间发酵，别急。' : dayWuxing === '水' ? '每次跳槽确保行业有关联性，别跨太远。积累资源比拿高薪重要。' : dayWuxing === '火' ? '把创意变成可复制的产品或流程，别只靠灵感吃饭。找一个执行型合伙人。' : '选平台比选岗位重要，进大平台后靠耐力往上走，别频繁跳。',
      basis: `日主${dayWuxing}，格局${geju.pattern}，决定事业适配方向。`,
    },
    healthFortune: {
      summary: dayWuxing === '金' ? '你体质偏硬朗，但要注意肺和呼吸道，年轻时能扛，35岁后开始走下坡。' : dayWuxing === '木' ? '你要注意肝胆和神经系统，容易因为压力导致失眠或情绪问题。' : dayWuxing === '水' ? '你要注意肾和泌尿系统，容易因为久坐或熬夜导致免疫力下降。' : dayWuxing === '火' ? '你要注意心脏和血液循环，容易因为激动或熬夜导致心血管问题。' : '你要注意脾胃和消化系统，容易因为饮食不规律或湿气重导致肠胃问题。',
      level: '中等',
      strongSystems: dayWuxing === '金' ? ['骨骼', '皮肤'] : dayWuxing === '木' ? ['筋骨', '四肢'] : dayWuxing === '水' ? ['泌尿', '循环'] : dayWuxing === '火' ? ['心脏', '视力'] : ['肌肉', '口腔'],
      weakSystems: dayWuxing === '金' ? ['肺', '呼吸道', '大肠'] : dayWuxing === '木' ? ['肝胆', '神经', '眼睛'] : dayWuxing === '水' ? ['肾脏', '泌尿', '耳'] : dayWuxing === '火' ? ['心脏', '血液', '舌'] : ['脾胃', '消化', '皮肤'],
      advice: dayWuxing === '金' ? '35岁后每年做一次低剂量肺部CT，秋冬注意戴口罩防雾霾，戒烟限酒。' : dayWuxing === '木' ? '别熬夜，23点前必须睡。压力大时去运动出汗，别憋着。每年查肝功能。' : dayWuxing === '水' ? '别久坐，每小时起来走5分钟。多喝水但别喝冰。每年查尿常规和肾功能。' : dayWuxing === '火' ? '控制情绪波动，少喝浓茶咖啡。有氧运动比无氧更适合你。每年查血脂血压。' : '饮食规律，少吃生冷甜腻。饭后散步20分钟。每年查胃镜和糖化血红蛋白。',
      basis: `日主${dayWuxing}对应脏腑为薄弱环节，${strongest}旺${weakest}弱影响体质。`,
    },
    loveFortune: {
      summary: dayWuxing === '金' ? '你在感情中比较直接，喜欢就追、不合适就断，但容易因为说话太直伤到对方。' : dayWuxing === '木' ? '你在感情中比较温和包容，愿意付出，但容易因为心软而离不开不该留的人。' : dayWuxing === '水' ? '你在感情中比较灵活浪漫，但容易因为给对方安全感不够而导致关系不稳定。' : dayWuxing === '火' ? '你在感情中热烈主动，喜欢的时候全情投入，但退热也快，容易让对方觉得你忽冷忽热。' : '你在感情中比较慢热但稳定，一旦确定关系就很忠诚，但表达不够让对方觉得你不够爱。',
      level: '中等',
      partnerTrait: dayWuxing === '金' ? '适合找一个性格柔软、能包容你的脾气、同时有自己主见的伴侣' : dayWuxing === '木' ? '适合找一个有主见、能替你做决定、不被你的心软绑架的伴侣' : dayWuxing === '水' ? '适合找一个稳定踏实、给你安全感、能接住你的善变的人' : dayWuxing === '火' ? '适合找一个冷静理性、能给你降温、同时欣赏你的热情的人' : '适合找一个活泼一点、能带动你的情绪、让你不那么沉闷的人',
      relationshipStyle: dayWuxing === '金' ? '直线型沟通，有话直说，不喜欢猜来猜去。需要学会温柔表达。' : dayWuxing === '木' ? '陪伴型恋爱，喜欢默默付出，但需要对方给予明确回应。' : dayWuxing === '水' ? '朋友型恋爱，先做朋友再谈恋爱，但需要刻意制造仪式感。' : dayWuxing === '火' ? '激情型恋爱，喜欢轰轰烈烈，但需要学会在平淡期也维持温度。' : '慢热型恋爱，需要时间确认关系，但一旦认定就很持久。',
      advice: dayWuxing === '金' ? '学会说软话，吵架时先听对方说完再回应。别用对错思维处理感情问题。' : dayWuxing === '木' ? '设立底线，对方触碰底线要敢说分手。别因为心软而消耗自己。' : dayWuxing === '水' ? '给对方确定感，主动报备和规划未来。别让善变变成伤害。' : dayWuxing === '火' ? '平淡期也要保持表达和肢体接触。别因为不刺激就觉得不爱了。' : '主动表达感受，别闷在心里等对方猜。偶尔制造小惊喜。',
      basis: `日主${dayWuxing}与夫妻宫关系，${strongest}弱影响感情模式。`,
    },
    overallAdvice: `你这一生的大方向是${selectedTags[0]}。关键是：30岁前找到方向比赚到钱更重要，30到45岁集中发力别分心，45岁后学会借力而不是自己死扛。${dayWuxing === '金' ? '修炼脾气和沟通方式，别让性格成为天花板。' : dayWuxing === '木' ? '设立边界感，心软是你最大的成本。' : dayWuxing === '水' ? '选一个领域深耕，别什么都碰什么都不精。' : dayWuxing === '火' ? '学会降速和止损，别让冲动吃掉利润。' : '适度冒险，太稳反而会错过时代红利。'}`,
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-ink-100 font-serif flex items-center">
          <Star className="w-5 h-5 text-gold-500 mr-2" />
          人生运势
        </h3>
        <span className="text-xs text-ink-500">总览版免费</span>
      </div>

      {/* 免费内容 - 人生总览 */}
      <div className="space-y-4">
        {/* 总体概述 */}
        <div className="p-4 bg-gradient-to-r from-gold-500/10 to-primary-500/10 rounded-xl border border-gold-500/20">
          <div className="flex flex-wrap gap-2 mb-3">
            {lifeData.lifeOverview.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-300 leading-relaxed">{lifeData.lifeOverview.summary}</p>
        </div>

        {/* 人生三阶段 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl text-center">
            <div className="text-xs text-blue-400 mb-1">青年期</div>
            <div className="text-sm text-ink-300 leading-snug">{lifeData.lifeOverview.lifeArc.youth}</div>
          </div>
          <div className="p-3 bg-gold-500/10 rounded-xl text-center">
            <div className="text-xs text-gold-500 mb-1">中年期</div>
            <div className="text-sm text-ink-300 leading-snug">{lifeData.lifeOverview.lifeArc.middle}</div>
          </div>
          <div className="p-3 bg-green-500/10 rounded-xl text-center">
            <div className="text-xs text-green-400 mb-1">晚年期</div>
            <div className="text-sm text-ink-300 leading-snug">{lifeData.lifeOverview.lifeArc.late}</div>
          </div>
        </div>

        {/* 五大运势预览 */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { icon: BookOpen, label: '学习', color: 'text-blue-400 bg-blue-500/10' },
            { icon: DollarSign, label: '财运', color: 'text-gold-500 bg-gold-500/10' },
            { icon: Briefcase, label: '事业', color: 'text-purple-400 bg-purple-500/10' },
            { icon: Heart, label: '感情', color: 'text-red-400 bg-red-500/10' },
            { icon: Pill, label: '健康', color: 'text-green-400 bg-green-500/10' },
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <div key={i} className={`p-3 rounded-xl text-center ${item.color}`}>
                <IconComp className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* 未解锁 - 五大运势详情 */}
        {!unlocked && (
          <div className="relative min-h-[320px]">
            <div className="opacity-25 blur-sm space-y-4">
              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  学习运势
                </h4>
                <p className="text-sm text-ink-400">{lifeData.learningFortune.summary}</p>
              </div>
              <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-500/20">
                <h4 className="font-bold text-gold-500 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  财富运势
                </h4>
                <p className="text-sm text-ink-400">{lifeData.wealthFortune.summary}</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  事业运势
                </h4>
                <p className="text-sm text-ink-400">{lifeData.careerFortune.summary}</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center max-w-md w-full shadow-2xl border border-dark-200">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-ink-100 font-bold text-xl mb-3">解锁五大运势详解</h3>
                <p className="text-sm text-ink-500 mb-6 leading-relaxed">
                  学习·财运·事业·健康·感情，逐项深度解析与针对性建议
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

        {/* 已解锁 - 五大运势完整内容 */}
        {unlocked && (
          <div className="space-y-4 animate-fadeIn">
            {/* 学习运 */}
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                学习运势
                <span className="ml-2 text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{lifeData.learningFortune.level}</span>
              </h4>
              <p className="text-sm text-ink-300 mb-3">{lifeData.learningFortune.summary}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-green-400 mb-1">优势</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.learningFortune.strength.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-red-400 mb-1">弱项</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.learningFortune.weakness.map((w, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 bg-dark-400/60 rounded-lg">
                <p className="text-sm text-ink-400"><span className="font-medium">建议：</span>{lifeData.learningFortune.advice}</p>
              </div>
              <p className="text-xs text-ink-500 mt-2">{lifeData.learningFortune.basis}</p>
            </div>

            {/* 财运 */}
            <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-500/20">
              <h4 className="font-bold text-gold-500 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                财富运势
                <span className="ml-2 text-xs px-2 py-0.5 bg-gold-500/20 text-gold-500 rounded-full">{lifeData.wealthFortune.level}</span>
              </h4>
              <p className="text-sm text-ink-300 mb-3">{lifeData.wealthFortune.summary}</p>
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-dark-400/60 rounded-lg">
                  <span className="text-xs font-medium text-gold-500">求财方式：</span>
                  <span className="text-sm text-ink-400">{lifeData.wealthFortune.getWealthWay}</span>
                </div>
                <div className="p-2 bg-red-500/5 rounded-lg">
                  <span className="text-xs font-medium text-red-400">风险提示：</span>
                  <span className="text-sm text-ink-400">{lifeData.wealthFortune.risk}</span>
                </div>
              </div>
              <div className="p-2 bg-dark-400/60 rounded-lg">
                <p className="text-sm text-ink-400"><span className="font-medium">建议：</span>{lifeData.wealthFortune.advice}</p>
              </div>
              <p className="text-xs text-ink-500 mt-2">{lifeData.wealthFortune.basis}</p>
            </div>

            {/* 事业运 */}
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <h4 className="font-bold text-purple-400 mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                事业运势
                <span className="ml-2 text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">{lifeData.careerFortune.level}</span>
              </h4>
              <p className="text-sm text-ink-300 mb-3">{lifeData.careerFortune.summary}</p>
              <div className="p-2 bg-dark-400/60 rounded-lg mb-2">
                <span className="text-xs font-medium text-purple-400">适合风格：</span>
                <span className="text-sm text-ink-400">{lifeData.careerFortune.suitableStyle}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-green-400 mb-1">适合行业</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.careerFortune.suitableIndustries.map((ind, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">{ind}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-red-400 mb-1">不宜行业</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.careerFortune.avoidIndustries.map((ind, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">{ind}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 bg-dark-400/60 rounded-lg">
                <p className="text-sm text-ink-400"><span className="font-medium">建议：</span>{lifeData.careerFortune.advice}</p>
              </div>
              <p className="text-xs text-ink-500 mt-2">{lifeData.careerFortune.basis}</p>
            </div>

            {/* 健康运 */}
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-bold text-green-400 mb-3 flex items-center">
                <Pill className="w-4 h-4 mr-2" />
                健康运势
                <span className="ml-2 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">{lifeData.healthFortune.level}</span>
              </h4>
              <p className="text-sm text-ink-300 mb-3">{lifeData.healthFortune.summary}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-green-400 mb-1">较强系统</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.healthFortune.strongSystems.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-red-400 mb-1">薄弱系统</div>
                  <div className="flex flex-wrap gap-1">
                    {lifeData.healthFortune.weakSystems.map((w, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 bg-dark-400/60 rounded-lg">
                <p className="text-sm text-ink-400"><span className="font-medium">建议：</span>{lifeData.healthFortune.advice}</p>
              </div>
              <p className="text-xs text-ink-500 mt-2">{lifeData.healthFortune.basis}</p>
            </div>

            {/* 感情运 */}
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <h4 className="font-bold text-red-400 mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                感情运势
                <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full">{lifeData.loveFortune.level}</span>
              </h4>
              <p className="text-sm text-ink-300 mb-3">{lifeData.loveFortune.summary}</p>
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-dark-400/60 rounded-lg">
                  <span className="text-xs font-medium text-red-400">理想伴侣：</span>
                  <span className="text-sm text-ink-400">{lifeData.loveFortune.partnerTrait}</span>
                </div>
                <div className="p-2 bg-dark-400/60 rounded-lg">
                  <span className="text-xs font-medium text-red-400">相处模式：</span>
                  <span className="text-sm text-ink-400">{lifeData.loveFortune.relationshipStyle}</span>
                </div>
              </div>
              <div className="p-2 bg-dark-400/60 rounded-lg">
                <p className="text-sm text-ink-400"><span className="font-medium">建议：</span>{lifeData.loveFortune.advice}</p>
              </div>
              <p className="text-xs text-ink-500 mt-2">{lifeData.loveFortune.basis}</p>
            </div>

            {/* 整体建议 */}
            <div className="p-4 bg-gradient-to-r from-gold-500/10 to-primary-500/10 rounded-xl border border-gold-500/20">
              <h4 className="font-bold text-gold-500 mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                整体建议
              </h4>
              <p className="text-sm text-ink-300 leading-relaxed">{lifeData.overallAdvice}</p>
            </div>

            {/* 收起 */}
            <div className="text-center">
              <button
                onClick={() => setUnlocked(false)}
                className="text-sm text-ink-400 hover:text-ink-200 flex items-center justify-center mx-auto"
              >
                <ChevronUp className="w-4 h-4 mr-1" />
                收起完整内容
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
