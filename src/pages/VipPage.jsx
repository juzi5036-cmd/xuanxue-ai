import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, X, Star, Clock, Shield, Zap, FileText, BookOpen, TrendingUp, Sparkles, Scale, Calendar } from 'lucide-react';
import { MEMBERSHIP_PLANS, CORE_PRODUCTS } from '../data/products';

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-500 rounded-full text-sm font-medium mb-4">
            <Crown className="w-4 h-4 mr-2" />
            会员中心
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink-100 mb-3 font-serif">选择您的专属会员</h1>
          <p className="text-ink-400 max-w-2xl mx-auto">
            多档位会员套餐，满足不同需求，全部付费权益完全独立、互不赠送
          </p>
        </div>

        {/* 会员套餐 */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`card relative cursor-pointer transition-all ${
                  plan.popular
                    ? 'ring-2 ring-gold-400 shadow-xl md:scale-105 md:-mt-4'
                    : 'hover:shadow-lg'
                } ${selectedPlan === plan.id ? 'ring-2 ring-gold-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-white text-sm px-6 py-1 rounded-full font-bold shadow-lg">
                    ⭐ 最受欢迎
                  </div>
                )}
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      plan.tagColor === 'gold' ? 'bg-gold-500/20 text-gold-500' :
                      plan.tagColor === 'green' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {plan.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-ink-100 mt-4 font-serif">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-primary-500">
                        ¥{plan.price}
                      </span>
                      <span className="text-ink-500 ml-2">/ {plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="border-t border-dark-200 pt-4 mb-6">
                      <p className="text-xs text-ink-500 mb-2">不包含：</p>
                      {plan.limitations.map((lim, i) => (
                        <div key={i} className="flex items-start">
                          <X className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-ink-500">{lim}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-gold text-white hover:shadow-lg'
                      : 'border-2 border-gold-400 text-gold-400 hover:bg-gold-500/10'
                  }`}>
                    立即开通
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 核心单品 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-ink-100 mb-6 font-serif text-center">核心单品 · 独立付费</h2>
          <p className="text-center text-ink-400 mb-8">与会员权益完全分割，互不互通</p>
          
          <div className="max-w-2xl mx-auto">
            {CORE_PRODUCTS.map((product) => (
              <div key={product.id} className="card overflow-hidden">
                <div className={`h-2 ${product.tagColor === 'red' ? 'bg-gradient-to-r from-red-400 to-orange-400' : 'bg-gradient-to-r from-purple-400 to-pink-400'}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-ink-100 font-serif">{product.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          product.tagColor === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {product.tag}
                        </span>
                      </div>
                      <p className="text-ink-400 text-sm mt-1">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-ink-100">¥{product.price}</div>
                      {product.duration && <div className="text-xs text-ink-500">/ {product.duration}</div>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {product.features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-ink-300">
                        <Star className="w-4 h-4 text-gold-400 mr-2 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3 mb-4">
                    <p className="text-xs text-amber-400">⚠️ {product.notice}</p>
                    {product.binding && <p className="text-xs text-amber-400 mt-1">🔒 {product.binding}</p>}
                  </div>

                  <Link
                    to="/shichen"
                    className={`block text-center py-3 rounded-lg font-bold transition-all ${
                      product.tagColor === 'red'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {product.booking ? '立即预约' : '立即购买'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 会员权益详情 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-ink-100 mb-8 font-serif text-center">会员权益详情</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: '八字深度解析', desc: '格局划分、喜用神推导、终身命局详批', color: 'gold' },
              { icon: TrendingUp, title: '十年大运', desc: '8步大运逐段拆解、每步十年运势详解', color: 'primary' },
              { icon: Calendar, title: '流年吉凶', desc: '十年流年运势、每年吉凶详细解读', color: 'blue' },
              { icon: Scale, title: '刑冲合害', desc: '命局关系完整拆解、影响分析、化解建议', color: 'orange' },
              { icon: Sparkles, title: '神煞分析', desc: '命局神煞完整解读、吉凶影响详析', color: 'purple' },
              { icon: Zap, title: '无限测算', desc: '无人数限制，可测多位亲友命盘', color: 'teal' },
              { icon: FileText, title: '报告导出', desc: '所有测算报告一键生成PDF下载', color: 'blue' },
              { icon: Shield, title: '永久存档', desc: '命盘档案永久存储、随时查看历史记录', color: 'green' },
            ].map((item, i) => {
              const Icon = item.icon;
              const colorClasses = {
                gold: 'from-gold-400 to-gold-600',
                primary: 'from-primary-400 to-primary-600',
                pink: 'from-pink-400 to-pink-600',
                purple: 'from-purple-400 to-purple-600',
                green: 'from-green-400 to-green-600',
                blue: 'from-blue-400 to-blue-600',
                amber: 'from-amber-400 to-amber-600',
                teal: 'from-teal-400 to-teal-600',
              };
              return (
                <div key={i} className="card p-5 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${colorClasses[item.color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-ink-100 mb-1">{item.title}</h4>
                  <p className="text-sm text-ink-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 常见问题 */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-ink-100 mb-6 font-serif text-center">常见问题</h2>
          <div className="space-y-4">
            {[
              { q: '会员和时辰反推是分开的吗？', a: '是的，全部付费权益完全独立、互不赠送、权限隔离。月度会员不包含时辰反推，时辰反推也不赠送会员。' },
              { q: '时辰反推可以给别人算吗？', a: '不可以。68元套餐永久绑定1个人，禁止代算、更换测算人。如需给他人测算需重新购买。' },
              { q: '时辰反推有几次机会？', a: '一次性付费68元，仅提供2次完整问卷作答测算机会。限制无限复测是为了保证推算精准度，请如实谨慎作答。' },
              { q: '会员到期后数据还在吗？', a: '您的命盘档案和测算历史会永久保存在账号中。会员到期后只是无法使用会员功能，已有的数据不会删除。' },
            ].map((faq, i) => (
              <div key={i} className="border-b border-dark-200 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-ink-100 mb-2">Q: {faq.q}</h4>
                <p className="text-ink-400 text-sm">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/bazi" className="btn-primary text-lg px-10 py-4 inline-flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            先免费排盘，再决定开通
          </Link>
        </div>
      </div>
    </div>
  );
}
