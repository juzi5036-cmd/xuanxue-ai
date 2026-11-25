import { Link } from 'react-router-dom';
import {
  TrendingUp, Clock,
  Crown, ChevronRight, Shield,
  BookOpen, Star, Compass, Flower2
} from 'lucide-react';
import { VIP_FEATURES } from '../data/products';

const iconMap = {
  TrendingUp, Clock,
  BookOpen, Star, Compass, Flower2
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-500/10 via-dark-400 to-transparent py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold-300 blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-primary-200 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-500 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                传承千年国学智慧 · AI智能测算
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-ink-100 mb-6 leading-tight font-serif">
                探索命理奥秘
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-primary-500">
                  指引人生方向
                </span>
              </h1>
              <p className="text-lg text-ink-300 mb-8 leading-relaxed">
                基于传统八字命理、格局分析等国学经典，结合现代AI算法，
                为您提供精准的命理分析、运势预测等专业服务。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/bazi" className="btn-primary text-lg px-8 py-4">
                  <span className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>免费八字排盘</span>
                  </span>
                </Link>
                <Link to="/shichen" className="btn-secondary text-lg px-8 py-4">
                  <span className="flex items-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>时辰精准反推</span>
                  </span>
                </Link>
              </div>

            </div>
            
            {/* Hero Card */}
            <div className="relative">
              <div className="card p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gold-400">八字排盘</h3>
                  <p className="text-ink-400 text-sm">免费 · 即时生成</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">吉</div>
                    <div className="text-xs text-green-400">事业运</div>
                  </div>
                  <div className="text-center p-3 bg-gold-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-gold-400">平</div>
                    <div className="text-xs text-gold-500">财运</div>
                  </div>
                  <div className="text-center p-3 bg-pink-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-pink-400">吉</div>
                    <div className="text-xs text-pink-400">感情运</div>
                  </div>
                </div>
                
                <div className="bg-dark-300/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ink-300">今日宜忌</span>
                    <span className="text-xs text-ink-500">农历五月十八</span>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <span className="text-green-400 font-medium">宜：</span>
                      <span className="text-ink-300">嫁娶 出行 动土</span>
                    </div>
                  </div>
                  <div className="flex space-x-4 text-sm mt-1">
                    <div>
                      <span className="text-red-400 font-medium">忌：</span>
                      <span className="text-ink-300">开市 搬家 置业</span>
                    </div>
                  </div>
                </div>
                
                <Link to="/bazi" className="btn-primary w-full text-center block">
                  查看我的专属运势
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-gold rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature - 时辰反推 */}
      <section className="py-16 bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">独家核心功能</h2>
            <p className="section-subtitle">全网独家技术，精准到分钟的时辰校正</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* 时辰反推 */}
            <div className="card-hover relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-400 to-primary-500"></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full font-bold">
                    全网独家
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gold-400 mb-3 font-serif">时辰精准反推</h3>
                <p className="text-ink-300 mb-6 leading-relaxed">
                  30道分层大题系统校正生辰，AI算法遍历十二时辰，
                  对比人生重大事件、性格特征、六亲关系，推算精准到出生分钟。
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-ink-300">
                    <Shield className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                    <span>人生重大事件匹配（10题）</span>
                  </li>
                  <li className="flex items-center text-ink-300">
                    <Shield className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                    <span>性格五官身体特征（10题）</span>
                  </li>
                  <li className="flex items-center text-ink-300">
                    <Shield className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                    <span>六亲缘分验证（10题）</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gold-400">¥68</span>
                    <span className="text-ink-500 text-sm ml-2">/ 2次测算</span>
                  </div>
                  <Link to="/shichen" className="btn-primary">
                    <span className="flex items-center space-x-1">
                      <span>立即体验</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Features Preview */}
      <section className="py-16 bg-gradient-to-b from-dark-300/50 to-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">会员专属功能</h2>
            <p className="section-subtitle">开通会员，解锁全部深度测算</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {VIP_FEATURES.map((feature) => {
              const IconComponent = iconMap[feature.icon] || Star;
              return (
                <div key={feature.id} className="card p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold-400 to-primary-500 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-ink-100 text-sm">{feature.name}</h4>
                  <p className="text-xs text-ink-500 mt-1">{feature.category}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link to="/vip" className="btn-primary text-lg px-10 py-4 inline-flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              查看全部会员权益
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Plans Preview */}
      <section className="py-16 bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">选择适合您的套餐</h2>
            <p className="section-subtitle">多档位选择，满足不同需求</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '月度全站会员', price: 28, period: '30天', tag: '大众基础款', features: ['全部八字AI测算工具', '无人数限制', '命盘永久存档', 'PDF报告导出'] },
              { name: '季度全站会员', price: 68, period: '90天', tag: '高性价比', features: ['月度会员全部权益', '1次时辰反推', '专属客服', '最新报告推送'] },
              { name: '整年全站会员', price: 228, period: '365天', tag: '超值推荐', popular: true, features: ['季度会员全部权益', '5次时辰反推', '专属命理顾问', '每月深度运势报告'] },
            ].map((plan, index) => (
              <div
                key={index}
                className={`card p-8 relative ${plan.popular ? 'ring-2 ring-gold-400 shadow-xl scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-white text-xs px-4 py-1 rounded-full font-bold">
                    最受欢迎
                  </div>
                )}
                <div className="text-center mb-6">
                  <span className="text-ink-400 text-sm">{plan.tag}</span>
                  <h3 className="text-2xl font-bold text-gold-400 mt-2 font-serif">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gold-400">¥{plan.price}</span>
                    <span className="text-ink-500"> / {plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-ink-300 text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/vip"
                  className={`block text-center py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-gold text-white hover:shadow-lg'
                      : 'border-2 border-gold-400 text-gold-400 hover:bg-gold-500/10'
                  }`}
                >
                  立即开通
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-serif">
            开始探索您的命理奥秘
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            免费八字排盘，即刻了解您的命格特征
          </p>
          <Link to="/bazi" className="inline-flex items-center px-8 py-4 bg-white text-gold-500 rounded-lg font-bold text-lg hover:shadow-xl transition-all">
            <TrendingUp className="w-6 h-6 mr-2" />
            免费排盘测算
          </Link>
        </div>
      </section>
    </div>
  );
}
