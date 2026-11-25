import { Link } from 'react-router-dom';
import { BookOpen, Clock, ChevronRight, TrendingUp, Home, Sparkles } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: '八字入门：什么是生辰八字？',
    category: '八字基础',
    summary: '八字又称生辰八字，是人出生的年月日时对应的天干地支，共八个字...',
    date: '2024-01-15',
    readTime: '5分钟',
    featured: true
  },
  {
    id: 2,
    title: '时辰不准对运势的影响有多大？',
    category: '命理科普',
    summary: '出生时辰错一个，八字格局、喜用神、运势可能完全不同...',
    date: '2024-01-12',
    readTime: '8分钟',
    featured: true
  },
  {
    id: 3,
    title: '五行喜忌怎么分辨？一分钟教你看懂',
    category: '八字基础',
    summary: '金木水火土，五行相生相克，如何判断自己的喜用神...',
    date: '2024-01-10',
    readTime: '6分钟'
  },
  {
    id: 4,
    title: '装修必看：家居风水布局5大禁忌',
    category: '风水装修',
    summary: '入户门对着卫生间？床头靠窗？这些风水禁忌你知道吗...',
    date: '2024-01-08',
    readTime: '7分钟'
  },
  {
    id: 5,
    title: '水旺身弱人群的穿搭饮食指南',
    category: '命格调理',
    summary: '水旺身弱的人容易水肿、怕冷，日常穿搭饮食应该注意什么...',
    date: '2024-01-05',
    readTime: '4分钟'
  },
  {
    id: 6,
    title: '医美整形也看命理？这些部位不要乱动',
    category: '医美命理',
    summary: '颧骨、鼻子、额头...面部特征与运势的关系...',
    date: '2024-01-03',
    readTime: '6分钟'
  },
];

const categories = [
  { name: '全部文章', count: 128 },
  { name: '八字基础', count: 36 },
  { name: '命理科普', count: 28 },
  { name: '风水装修', count: 24 },
  { name: '命格调理', count: 20 },
  { name: '医美命理', count: 12 },
  { name: '择吉择日', count: 8 },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            命理百科
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">命理知识科普</h1>
          <p className="text-ink-400 max-w-2xl mx-auto">
            传承国学智慧，普及命理知识，让更多人了解传统文化
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {/* 精选文章 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
              <Sparkles className="w-5 h-5 text-gold-500 mr-2" />
              精选推荐
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.filter(a => a.featured).map((article) => (
                <div key={article.id} className="card-hover overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-gold-200 to-primary-200 flex items-center justify-center">
                  <span className="text-5xl">📜</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gold-400 font-medium">{article.category}</span>
                    <h3 className="font-bold text-ink-100 mt-1 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-ink-400 line-clamp-2 mb-3">{article.summary}</p>
                    <div className="flex items-center text-xs text-ink-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}阅读
                      <span className="mx-2">·</span>
                      {article.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* 最新文章 */}
            <div>
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                最新文章
              </h2>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="card p-5 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-dark-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">📜</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded">{article.category}</span>
                          <span className="text-xs text-ink-500">{article.date}</span>
                        </div>
                        <h3 className="font-bold text-ink-100 mb-1 hover:text-gold-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-ink-400 line-clamp-2">{article.summary}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-ink-400 flex-shrink-0 mt-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* 加载更多 */}
              <div className="text-center mt-8">
                <button className="btn-secondary">
                  加载更多文章
                </button>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 分类导航 */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-4">文章分类</h3>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      i === 0 ? 'bg-gold-500/10 text-gold-500 font-medium' : 'text-ink-300 hover:bg-dark-300/50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-ink-500">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 热门话题 */}
            <div className="card p-5">
              <h3 className="font-bold text-ink-100 mb-4">热门话题</h3>
              <div className="flex flex-wrap gap-2">
                {['喜用神', '时辰反推', '本命年', '犯太岁', '八字合婚', '招财', '桃花', '贵人运', '事业运', '健康运'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-dark-200 text-ink-300 text-sm rounded-full hover:bg-gold-500/20 hover:text-gold-500 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 引导开通会员 */}
            <div className="card p-6 bg-gradient-to-br from-gold-50 to-primary-50 border-gold-200">
              <h3 className="font-bold text-ink-100 mb-2">想了解更多？</h3>
              <p className="text-sm text-ink-300 mb-4">
                开通会员，解锁全部深度测算和专属命理报告
              </p>
              <Link to="/vip" className="btn-primary w-full text-center block text-sm">
                立即开通
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
