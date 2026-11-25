import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Settings, FileText, Heart, Clock, Crown,
  ChevronRight, LogOut, Download, Bell, Shield
} from 'lucide-react';

const menuItems = [
  { id: 'profile', name: '个人资料', icon: User },
  { id: 'orders', name: '订单与权限', icon: FileText },
  { id: 'archives', name: '命盘档案', icon: Heart },
  { id: 'downloads', name: '下载中心', icon: Download },
  { id: 'notifications', name: '消息通知', icon: Bell },
  { id: 'settings', name: '账号设置', icon: Settings },
];

export default function UserPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              {/* 用户信息卡片 */}
              <div className="text-center pb-6 border-b border-dark-200">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-gold flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-ink-100">玄学爱好者</h3>
                <p className="text-sm text-ink-500">138****8888</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-gold-500/20 text-gold-500 rounded-full text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  普通用户
                </div>
              </div>

              {/* 会员状态 */}
              <div className="py-4 border-b border-dark-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-ink-300">会员状态</span>
                  <span className="text-xs text-ink-500">未开通</span>
                </div>
                <Link to="/vip" className="btn-primary w-full text-center block text-sm py-2">
                  立即开通会员
                </Link>
              </div>

              {/* 菜单 */}
              <div className="pt-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        activeTab === item.id
                          ? 'bg-gold-500/10 text-gold-500 font-medium'
                          : 'text-ink-300 hover:bg-dark-300/50'
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* 退出登录 */}
              <div className="pt-4 border-t border-dark-200 mt-4">
                <button className="w-full flex items-center justify-center px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5 mr-2" />
                  退出登录
                </button>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-ink-100 font-serif">订单与权限</h2>
                
                {/* 权限概览 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ink-300">月度会员</span>
                      <Crown className="w-5 h-5 text-gold-400" />
                    </div>
                    <p className="text-2xl font-bold text-ink-100">未开通</p>
                    <Link to="/vip" className="text-gold-400 text-sm mt-2 inline-block hover:underline">
                      立即开通 →
                    </Link>
                  </div>
                  <div className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ink-300">时辰反推</span>
                      <Clock className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold text-ink-100">0 / 2 次</p>
                    <Link to="/shichen" className="text-gold-400 text-sm mt-2 inline-block hover:underline">
                      购买使用 →
                    </Link>
                  </div>
                </div>

                {/* 订单列表 */}
                <div className="card p-6">
                  <h3 className="font-bold text-ink-100 mb-4">历史订单</h3>
                  <div className="text-center py-12 text-ink-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无订单记录</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'archives' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-ink-100 font-serif">命盘档案</h2>
                  <Link to="/bazi" className="btn-primary text-sm py-2 px-4">
                    + 新建排盘
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: '本人', gender: '男', birth: '1990-01-15 12:30', type: '八字排盘' },
                    { name: '父亲', gender: '男', birth: '1965-05-20 08:00', type: '八字排盘' },
                  ].map((item, i) => (
                    <div key={i} className="card-hover p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-ink-100">{item.name}</h4>
                          <p className="text-sm text-ink-400">{item.gender} · {item.birth}</p>
                        </div>
                        <span className="badge-free">{item.type}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-dark-200">
                        <span className="text-xs text-ink-500">2024-01-15 创建</span>
                        <button className="text-gold-400 text-sm hover:underline">
                          查看详情 →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 添加更多档案引导 */}
                <div className="card p-8 text-center border-dashed border-2 border-dark-300">
                  <p className="text-ink-400 mb-4">可添加家人、亲友的命盘档案</p>
                  <Link to="/bazi" className="btn-secondary">
                    添加新命盘
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-ink-100 font-serif">个人资料</h2>
                
                <div className="card p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ink-200 mb-2">头像</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <button className="btn-secondary text-sm py-2 px-4">
                          更换头像
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-200 mb-2">昵称</label>
                      <input type="text" defaultValue="玄学爱好者" className="input-field max-w-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-200 mb-2">手机号</label>
                      <input type="text" defaultValue="138****8888" className="input-field max-w-md" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-200 mb-2">性别</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="gender" defaultChecked className="text-gold-500" />
                          <span>男</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="gender" className="text-gold-500" />
                          <span>女</span>
                        </label>
                      </div>
                    </div>
                    <button className="btn-primary">
                      保存修改
                    </button>
                  </div>
                </div>

                {/* 体质命格档案 */}
                <div className="card p-6">
                  <h3 className="font-bold text-ink-100 mb-4">体质命格档案</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-dark-300/50 rounded-lg">
                      <span className="text-sm text-ink-400">日主五行</span>
                      <p className="font-medium text-ink-100 mt-1">水（水旺身弱）</p>
                    </div>
                    <div className="p-4 bg-dark-300/50 rounded-lg">
                      <span className="text-sm text-ink-400">喜用神</span>
                      <p className="font-medium text-ink-100 mt-1">金、土</p>
                    </div>
                    <div className="p-4 bg-dark-300/50 rounded-lg">
                      <span className="text-sm text-ink-400">忌神</span>
                      <p className="font-medium text-ink-100 mt-1">木、火</p>
                    </div>
                    <div className="p-4 bg-dark-300/50 rounded-lg">
                      <span className="text-sm text-ink-400">体质特征</span>
                      <p className="font-medium text-ink-100 mt-1">水肿、怕冷</p>
                    </div>
                  </div>
                  <p className="text-xs text-ink-500 mt-4">
                    * 完成八字排盘后自动记录，后续测算将自动匹配对应调理建议
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-ink-100 font-serif">下载中心</h2>
                <div className="card p-6">
                  <div className="text-center py-12 text-ink-500">
                    <Download className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="mb-2">暂无下载记录</p>
                    <p className="text-sm">开通会员后，测算报告可一键生成PDF下载</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-ink-100 font-serif">消息通知</h2>
                <div className="card p-6">
                  <div className="text-center py-12 text-ink-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无消息通知</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-ink-100 font-serif">账号设置</h2>
                <div className="card p-6 space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-dark-200">
                    <div>
                      <h4 className="font-medium text-ink-100">修改密码</h4>
                      <p className="text-sm text-ink-400">定期修改密码保障账号安全</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-dark-200">
                    <div>
                      <h4 className="font-medium text-ink-100">绑定手机</h4>
                      <p className="text-sm text-ink-400">138****8888</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-dark-200">
                    <div>
                      <h4 className="font-medium text-ink-100">隐私设置</h4>
                      <p className="text-sm text-ink-400">管理您的隐私偏好</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-500" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium text-red-400">注销账号</h4>
                      <p className="text-sm text-ink-400">永久删除您的账号和所有数据</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
