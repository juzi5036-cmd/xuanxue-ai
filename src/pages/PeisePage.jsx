import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette, ChevronLeft, Crown, Lock, ArrowRight,
  CheckCircle2, AlertTriangle, Sparkles, Info,
} from 'lucide-react';
import { WUXING_COLORS, getWuxingPeise } from '../data/fengshui';

const WUXING_ICONS = {
  '金': { color: 'text-gray-300', bg: 'bg-gray-500/20', label: '金' },
  '木': { color: 'text-green-400', bg: 'bg-green-500/20', label: '木' },
  '水': { color: 'text-blue-400', bg: 'bg-blue-500/20', label: '水' },
  '火': { color: 'text-red-400', bg: 'bg-red-500/20', label: '火' },
  '土': { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: '土' },
};

export default function PeisePage() {
  const [selectedWuxing, setSelectedWuxing] = useState('金');
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [result, setResult] = useState(null);

  const currentData = WUXING_COLORS[selectedWuxing];

  const handlePeise = () => {
    if (likes.length === 0 && dislikes.length === 0) return;
    const res = getWuxingPeise(likes, dislikes);
    setResult(res);
  };

  const toggleLike = (w) => {
    setLikes(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
    setDislikes(prev => prev.filter(x => x !== w));
  };

  const toggleDislike = (w) => {
    setDislikes(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
    setLikes(prev => prev.filter(x => x !== w));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回 */}
        <Link to="/fengshui" className="inline-flex items-center text-ink-400 hover:text-gold-400 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回风水测算
        </Link>

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            免费基础查询
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">五行配色参考</h1>
          <p className="text-ink-500 max-w-2xl mx-auto">
            基于五行理论，为您提供各五行对应的开运颜色搭配参考
          </p>
        </div>

        {/* 五行色卡展示 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-ink-100 mb-4 flex items-center">
            <span className="w-1 h-5 bg-green-500 rounded-full mr-3"></span>
            五行基础色卡
          </h3>
          <div className="grid md:grid-cols-5 gap-3">
            {Object.entries(WUXING_COLORS).map(([wuxing, data]) => {
              const icon = WUXING_ICONS[wuxing];
              return (
                <div
                  key={wuxing}
                  onClick={() => setSelectedWuxing(wuxing)}
                  className={`card p-4 cursor-pointer transition-all ${
                    selectedWuxing === wuxing ? 'ring-2 ring-gold-500' : ''
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${icon.bg} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${icon.color}`}>{wuxing}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {data.colors.slice(0, 2).map((c, i) => (
                      <span key={i} className="text-xs text-ink-500">{c}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 选中五行详情 */}
        <div className="card p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className={`w-14 h-14 rounded-xl ${WUXING_ICONS[selectedWuxing].bg} flex items-center justify-center mr-4`}>
              <span className={`text-3xl font-bold ${WUXING_ICONS[selectedWuxing].color}`}>{selectedWuxing}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink-100">{selectedWuxing}行配色</h3>
              <p className="text-sm text-ink-500">{currentData.effect}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {currentData.colors.map((color, i) => (
              <div key={i} className="p-3 bg-dark-300/50 rounded-lg text-center">
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{ background: getColorHex(color) }}
                ></div>
                <span className="text-sm text-ink-200">{color}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-bold text-green-400">适用空间</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentData.suitable.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-sm font-bold text-red-400">不宜空间</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentData.avoid.map((a, i) => (
                  <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 个性化配色 */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-bold text-ink-100 mb-2 flex items-center">
            <Sparkles className="w-5 h-5 text-gold-500 mr-2" />
            个性化配色推荐
          </h3>
          <p className="text-sm text-ink-500 mb-4">选择您的喜用神和忌神五行，获取专属配色建议</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">喜用神五行（可多选）</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(WUXING_COLORS).map((w) => (
                  <button
                    key={w}
                    onClick={() => toggleLike(w)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      likes.includes(w)
                        ? 'bg-green-500/30 text-green-400 ring-2 ring-green-500'
                        : 'bg-dark-200 text-ink-400 hover:bg-dark-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">忌神五行（可多选）</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(WUXING_COLORS).map((w) => (
                  <button
                    key={w}
                    onClick={() => toggleDislike(w)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      dislikes.includes(w)
                        ? 'bg-red-500/30 text-red-400 ring-2 ring-red-500'
                        : 'bg-dark-200 text-ink-400 hover:bg-dark-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handlePeise}
              disabled={likes.length === 0 && dislikes.length === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              生成配色方案
            </button>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              {result.map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    item.type === '喜用'
                      ? 'bg-green-500/10 border-green-500/20'
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold mr-2 ${WUXING_ICONS[item.wuxing].color}`}>
                        {item.wuxing}
                      </span>
                      <span className="text-sm text-ink-300">{item.type}五行</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.type === '喜用' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.colors.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded" style={{ background: getColorHex(c) }}></div>
                        <span className="text-sm text-ink-300">{c}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-ink-400">{item.tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 会员解锁 */}
        <div className="relative min-h-[260px]">
          <div className="opacity-30 blur-sm space-y-4">
            <div className="card p-6">
              <h4 className="font-bold text-ink-100 mb-3">全屋定制配色方案</h4>
              <p className="text-sm text-ink-400">根据您的命卦和喜用神，生成客厅、主卧、厨房、书房、卫生间等各空间的完整配色方案...</p>
            </div>
            <div className="card p-6">
              <h4 className="font-bold text-ink-100 mb-3">色彩搭配比例</h4>
              <p className="text-sm text-ink-400">主色调、辅助色、点缀色的比例建议，软装搭配方案...</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center max-w-md w-full shadow-2xl border border-dark-200">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-ink-100 font-bold text-xl mb-3">解锁全屋定制配色方案</h3>
              <p className="text-sm text-ink-500 mb-6 leading-relaxed">
                各空间专属配色、色彩搭配比例、软装建议
              </p>
              <Link to="/vip" className="btn-primary inline-flex items-center justify-center px-8">
                <Crown className="w-4 h-4 mr-1" />
                开通会员
              </Link>
            </div>
          </div>
        </div>

        {/* 底部导航 */}
        <div className="mt-8 flex items-center justify-between">
          <Link to="/fengshui" className="text-sm text-ink-500 hover:text-gold-400 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            返回风水测算
          </Link>
          <Link to="/fengshui/zuoxiang" className="text-sm text-gold-400 hover:underline flex items-center">
            住宅坐向吉凶测算
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function getColorHex(name) {
  const map = {
    '白色': '#ffffff',
    '银色': '#c0c0c0',
    '金色': '#ffd700',
    '灰白色': '#e8e8e8',
    '绿色': '#22c55e',
    '青色': '#00bda4',
    '翠绿色': '#10b981',
    '墨绿色': '#0d5c3f',
    '黑色': '#1a1a1a',
    '深蓝色': '#1e3a5f',
    '灰色': '#808080',
    '蓝黑色': '#1a2744',
    '红色': '#ef4444',
    '橙色': '#f97316',
    '紫色': '#a855f7',
    '粉红色': '#ec4899',
    '黄色': '#eab308',
    '咖啡色': '#795548',
    '棕色': '#8b4513',
    '米色': '#f5e6c8',
  };
  return map[name] || '#666666';
}
