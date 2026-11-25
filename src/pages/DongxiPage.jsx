import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, ChevronLeft, Compass, Crown, Lock, ArrowRight,
  CheckCircle2, AlertTriangle, Sparkles, Info,
} from 'lucide-react';
import { calculateDongXiMing } from '../data/fengshui';

export default function DongxiPage() {
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const y = parseInt(year);
    if (!y || y < 1900 || y > 2100) {
      setError('请输入有效的出生年份（1900-2100）');
      return;
    }
    if (!gender) {
      setError('请选择性别');
      return;
    }
    setError('');
    const res = calculateDongXiMing(y, gender);
    setResult(res);
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
            <Home className="w-4 h-4 mr-2" />
            免费基础查询
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">东西四命测算</h1>
          <p className="text-ink-500 max-w-2xl mx-auto">
            输入出生年份和性别，根据八宅风水推算您的本命卦，确定您属于东四命还是西四命
          </p>
        </div>

        {/* 输入区 */}
        <div className="card p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">出生年份</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="如：1990"
                className="input-field"
                min="1900"
                max="2100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input-field"
              >
                <option value="">请选择</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              开始测算
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* 结果展示 */}
        {result && (
          <div className="space-y-5">
            {/* 核心结果 */}
            <div className="card p-6 bg-gradient-to-br from-green-500/10 to-primary-500/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-ink-500 mb-1">您的命卦</p>
                  <h2 className="text-3xl font-bold text-ink-100">
                    {result.name}卦
                  </h2>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${
                    result.type === '东四命'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {result.type}
                  </div>
                  <p className="text-sm text-ink-500 mt-2">五行属{result.element} · 方位{result.direction}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                    <h4 className="font-bold text-green-400">吉利方位</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyDirection.map((dir, i) => (
                      <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {dir}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                    <h4 className="font-bold text-red-400">不利方位</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.unluckyDirection.map((dir, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        {dir}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 风水建议 */}
            <div className="card p-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-primary-500 mr-2" />
                <h4 className="font-bold text-ink-100">风水建议</h4>
              </div>
              <p className="text-sm text-ink-400 leading-relaxed">{result.suggestion}</p>
            </div>

            {/* 适配户型 */}
            <div className="card p-6">
              <h4 className="font-bold text-ink-100 mb-4 flex items-center">
                <Compass className="w-5 h-5 text-gold-500 mr-2" />
                适配户型朝向
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.luckyDirection.map((dir, i) => (
                  <div key={i} className="p-3 bg-green-500/10 rounded-lg text-center">
                    <div className="text-sm font-medium text-green-400">坐{dir}朝{getOpposite(dir)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 会员解锁更多 */}
            <div className="relative min-h-[300px]">
              <div className="opacity-30 blur-sm space-y-4">
                <div className="card p-6">
                  <h4 className="font-bold text-ink-100 mb-3">大门最佳朝向</h4>
                  <p className="text-sm text-ink-400">根据您的命卦，大门宜朝xxx方，忌朝xxx方...</p>
                </div>
                <div className="card p-6">
                  <h4 className="font-bold text-ink-100 mb-3">主卧方位建议</h4>
                  <p className="text-sm text-ink-400">主卧宜在xxx方，床头宜靠xxx墙...</p>
                </div>
                <div className="card p-6">
                  <h4 className="font-bold text-ink-100 mb-3">厨房布局方位</h4>
                  <p className="text-sm text-ink-400">厨房宜在xxx方，灶台坐向建议...</p>
                </div>
                <div className="card p-6">
                  <h4 className="font-bold text-ink-100 mb-3">财位与文昌位定位</h4>
                  <p className="text-sm text-ink-400">您的财位在xxx方，文昌位在xxx方...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center max-w-md w-full shadow-2xl border border-dark-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-ink-100 font-bold text-xl mb-3">解锁完整家居布局方案</h3>
                  <p className="text-sm text-ink-500 mb-6 leading-relaxed">
                    大门朝向、主卧方位、厨房布局、财位文昌位、凶位化解
                  </p>
                  <Link to="/vip" className="btn-primary inline-flex items-center justify-center px-8">
                    <Crown className="w-4 h-4 mr-1" />
                    开通会员
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 未测算时的提示 */}
        {!result && (
          <div className="card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <Compass className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-ink-400 mb-2">输入您的出生信息，立即测算本命卦</p>
            <p className="text-sm text-ink-500">免费查询，无需注册</p>
          </div>
        )}

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

function getOpposite(dir) {
  const map = {
    '东': '西',
    '西': '东',
    '南': '北',
    '北': '南',
    '东南': '西北',
    '西北': '东南',
    '西南': '东北',
    '东北': '西南',
  };
  return map[dir] || '';
}
