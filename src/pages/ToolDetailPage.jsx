import { Link, useParams } from 'react-router-dom';
import { Sparkles, Lock, Crown, ChevronLeft } from 'lucide-react';
import { FREE_TOOLS } from '../data/products';

export default function ToolDetailPage() {
  const { toolId } = useParams();
  const tool = FREE_TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen py-16 text-center">
        <p className="text-ink-400">工具不存在</p>
        <Link to="/" className="text-gold-400 hover:underline mt-4 inline-block">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回 */}
        <Link to="/" className="inline-flex items-center text-ink-400 hover:text-gold-400 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回首页
        </Link>

        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gold-500/20 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-gold-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink-100 mb-2 font-serif">{tool.name}</h1>
            <p className="text-ink-400">{tool.description}</p>
            <div className="mt-3">
              <span className="badge-free">免费体验</span>
            </div>
          </div>

          {/* 工具演示区域 */}
          <div className="bg-dark-300/50 rounded-xl p-8 text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-dark-400 shadow-inner flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-ink-400" />
            </div>
            <h3 className="text-lg font-medium text-ink-300 mb-2">正在开发中</h3>
            <p className="text-ink-500 text-sm mb-6">该工具正在紧张开发中，敬请期待</p>
            
            <div className="bg-dark-400 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-sm text-ink-400 mb-3">
                您可以先体验我们的核心功能：
              </p>
              <div className="space-y-2">
                <Link to="/bazi" className="block w-full btn-primary text-sm py-2">
                  八字排盘（免费）
                </Link>
                <Link to="/shichen" className="block w-full btn-secondary text-sm py-2">
                  时辰反推（独家）
                </Link>
              </div>
            </div>
          </div>

          {/* 功能说明 */}
          <div className="space-y-4">
            <h3 className="font-bold text-ink-100">功能说明</h3>
            <div className="bg-amber-500/10 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-400">
                <Lock className="w-4 h-4 inline mr-1" />
                <strong>温馨提示：</strong>免费版仅提供基础内容，深度解读需开通会员。
              </p>
            </div>
            
            <ul className="space-y-2 text-sm text-ink-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                免费体验基础功能
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                无门槛使用，无需注册
              </li>
              <li className="flex items-start text-ink-500">
                <Lock className="w-4 h-4 mr-2 mt-0.5" />
                深度解读需开通会员
              </li>
            </ul>
          </div>
        </div>

        {/* 更多工具推荐 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink-100 mb-4 font-serif">更多免费工具</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FREE_TOOLS.filter(t => t.id !== toolId).slice(0, 4).map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="card-hover p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gold-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                </div>
                <h4 className="font-medium text-ink-100 text-sm">{t.name}</h4>
                <span className="badge-free mt-1 inline-block text-xs">免费</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link to="/vip" className="inline-flex items-center text-gold-400 hover:underline">
            <Crown className="w-4 h-4 mr-1" />
            开通会员，解锁全部功能
          </Link>
        </div>
      </div>
    </div>
  );
}
