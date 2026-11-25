import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Bath, ChevronLeft, Lock, Crown, CheckCircle2,
  AlertTriangle, Shield, Sparkles, Heart, DollarSign,
  Users, BookOpen, Palette, X, Droplets
} from 'lucide-react';
import {
  KITCHEN_FENGSHUI,
  BATHROOM_FENGSHUI,
  calculateKitchenFengshui,
  calculateBathroomFengshui,
  KITCHEN_TIPS,
  BATHROOM_TIPS,
} from '../data/fengshui';

export default function ChuweiPage() {
  const [type, setType] = useState('kitchen');
  const [directionKey, setDirectionKey] = useState('');
  const [wuxing, setWuxing] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const kitchenData = KITCHEN_FENGSHUI;
  const bathroomData = BATHROOM_FENGSHUI;
  const currentData = type === 'kitchen' ? kitchenData : bathroomData;
  const currentKeys = Object.keys(currentData);
  const tips = type === 'kitchen' ? KITCHEN_TIPS : BATHROOM_TIPS;

  const rawItem = directionKey ? currentData[directionKey] : null;

  const calcResult = directionKey
    ? (type === 'kitchen'
        ? calculateKitchenFengshui(directionKey, wuxing)
        : calculateBathroomFengshui(directionKey, wuxing))
    : null;

  const result = (calcResult && calcResult.success !== false) ? { ...rawItem, ...calcResult, ...rawItem } : null;

  if (result) {
    result.score = calcResult.adjustedScore || rawItem.score;
    result.suggestion = rawItem.description || calcResult.description;
    result.colorSuggestion = rawItem.colorSuggestion || (rawItem.colors && rawItem.colors.suitable) || [];
    result.avoidColors = rawItem.avoidColors || (rawItem.colors && rawItem.colors.avoid) || [];
    result.luckyItems = rawItem.luckyItems || [];
    result.unluckyItems = rawItem.unluckyItems || [];
    result.healthEffect = rawItem.healthEffect || '—';
    result.wealthEffect = rawItem.wealthEffect || '—';
    result.familyEffect = rawItem.familyEffect || '—';
    result.resolutionMethods = rawItem.resolutionMethods || rawItem.resolveMethods || [];
    result.resolution = rawItem.resolution || rawItem.layoutTip || '';
    result.locationTaboo = rawItem.locationTaboo || '';
  }

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
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/fengshui" className="inline-flex items-center text-sm text-ink-400 hover:text-gold-400 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回风水测算
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-bold mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            厨卫五行适配
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">厨卫方位风水测算</h1>
          <p className="text-ink-400">选择厨房或卫生间方位，获取吉凶分析与布局建议</p>
        </div>

        <div className="card p-8">
          {/* Tab切换 */}
          <div className="flex rounded-xl bg-dark-200 p-1 mb-6">
            {[
              { id: 'kitchen', name: '厨房风水', icon: Building2 },
              { id: 'bathroom', name: '卫生间风水', icon: Droplets },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => { setType(t.id); setDirectionKey(''); setUnlocked(false); }}
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
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">所在方位</label>
              <select value={directionKey} onChange={(e) => setDirectionKey(e.target.value)} className="input-field">
                <option value="">请选择方位</option>
                {currentKeys.map((key) => (
                  <option key={key} value={key}>{currentData[key].direction}</option>
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

          {/* 结果展示 */}
          {result && (
            <div className="space-y-4">
              {/* 吉凶总评 */}
              <div className={`rounded-xl p-5 border ${getJixiongBg(result.jixiong)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-ink-100">
                      {result.direction}{type === 'kitchen' ? '厨房' : '卫生间'}
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
                {result.wuxingAnalysis && (
                  <p className="text-sm text-gold-400 mt-2 pt-2 border-t border-dark-300/50">{result.wuxingAnalysis}</p>
                )}
              </div>

              {/* 优缺点 */}
              <div className="grid md:grid-cols-2 gap-4">
                {result.advantages && result.advantages.length > 0 && (
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h4 className="font-bold text-green-400 mb-3 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      风水优势
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
                )}
                {result.disadvantages && result.disadvantages.length > 0 && (
                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <h4 className="font-bold text-red-400 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      需注意
                    </h4>
                    <ul className="space-y-2">
                      {result.disadvantages.map((dis, i) => (
                        <li key={i} className="text-sm text-red-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {dis}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

              {/* 灶台朝向（厨房专属） */}
              {type === 'kitchen' && result.stoveDirection && (
                <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <h4 className="font-bold text-orange-400 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    灶台朝向建议
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-ink-500 mb-1">最佳朝向</div>
                      <div className="text-sm text-green-400 font-medium">{result.stoveDirection.best}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-500 mb-1">最差朝向</div>
                      <div className="text-sm text-red-400">{result.stoveDirection.worst}</div>
                    </div>
                  </div>
                  {result.stoveDirection.tip && (
                    <p className="text-sm text-ink-400 mt-3 pt-3 border-t border-dark-300/50">{result.stoveDirection.tip}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.stoveDirection.auspicious && result.stoveDirection.auspicious.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">宜：{d}</span>
                    ))}
                    {result.stoveDirection.inauspicious && result.stoveDirection.inauspicious.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">忌：{d}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* 布局禁忌 */}
              {result.taboos && result.taboos.length > 0 && (
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    布局禁忌
                  </h4>
                  <div className="space-y-2">
                    {result.taboos.map((taboo, i) => (
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
                    {result.luckyItems.map((item, i) => (
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
                  {result.colors && result.colors.recommend && (
                    <p className="text-sm text-ink-500 mt-3 pt-3 border-t border-dark-300/50">{result.colors.recommend}</p>
                  )}
                </div>
              )}

              {/* 会员解锁更多内容 */}
              {(!unlocked) && (
                <div className="relative min-h-[400px]">
                  <div className="opacity-30 blur-sm space-y-4">
                    {/* 化解方法 */}
                    {result.resolutionMethods && result.resolutionMethods.length > 0 && (
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                        <h4 className="font-bold text-amber-400 mb-3 flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          化解方法
                        </h4>
                        <div className="space-y-2">
                          {result.resolutionMethods.map((m, i) => (
                            <div key={i} className="text-sm text-amber-400 flex items-start">
                              <span className="w-5 h-5 bg-amber-200 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">{i + 1}</span>
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 详细化解方案 */}
                    {result.resolution && (
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                        <h4 className="font-bold text-amber-400 mb-2 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          布局化解读
                        </h4>
                        <p className="text-sm text-amber-400">{result.resolution}</p>
                      </div>
                    )}

                    {/* 忌放物品 */}
                    {result.unluckyItems && result.unluckyItems.length > 0 && (
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                        <h4 className="font-bold text-red-400 mb-2 flex items-center">
                          <X className="w-4 h-4 mr-2" />
                          忌放物品
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.unluckyItems.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">{item}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 忌用颜色 */}
                    {result.avoidColors && result.avoidColors.length > 0 && (
                      <div className="p-4 bg-dark-300/50 rounded-xl">
                        <h4 className="font-bold text-ink-200 mb-2 flex items-center">
                          <Palette className="w-4 h-4 mr-2" />
                          忌用颜色
                        </h4>
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
                        化解方法、忌放物品、布局化解读、忌用颜色
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm px-6 py-2.5 w-full sm:w-auto order-2 sm:order-1">
                          预览完整效果
                        </button>
                        <Link to="/vip" className="btn-primary text-sm px-6 py-2.5 w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center">
                          <Crown className="w-4 h-4 mr-1" />
                          开通会员
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 已解锁 - 完整内容 */}
              {unlocked && (
                <div className="space-y-4">
                  {/* 化解方法 */}
                  {result.resolutionMethods && result.resolutionMethods.length > 0 && (
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

                  {/* 详细化解方案 */}
                  {result.resolution && (
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                      <h4 className="font-bold text-amber-400 mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        布局化解读
                      </h4>
                      <p className="text-sm text-amber-400 leading-relaxed">{result.resolution}</p>
                    </div>
                  )}

                  {/* 忌放物品 */}
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

                  {/* 忌用颜色 */}
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
          <div className="border-t border-dark-200 pt-4 mt-6">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between text-sm text-ink-500 hover:text-ink-200"
            >
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {type === 'kitchen' ? '厨房风水' : '卫生间风水'}小常识
              </span>
              <ChevronLeft className={`w-4 h-4 transition-transform ${showTips ? '-rotate-90' : ''}`} />
            </button>
            {showTips && tips && (
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
      </div>
    </div>
  );
}
