import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-700 border-t border-dark-300 text-ink-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-serif text-gold-400">玄学AI</span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed">
              传承千年国学智慧，结合现代AI技术，为您提供专业的命理测算服务。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400">热门测算</h4>
            <ul className="space-y-2 text-ink-400 text-sm">
              <li><Link to="/bazi" className="hover:text-gold-400 transition-colors">八字排盘</Link></li>
              <li><Link to="/shichen" className="hover:text-gold-400 transition-colors">时辰反推</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-400">会员服务</h4>
            <ul className="space-y-2 text-ink-400 text-sm">
              <li><Link to="/vip" className="hover:text-gold-400 transition-colors">会员权益</Link></li>
              <li><Link to="/user" className="hover:text-gold-400 transition-colors">个人中心</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-400">联系我们</h4>
            <ul className="space-y-3 text-ink-400 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@xuanxueai.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>工作时间：9:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-10 pt-6 border-t border-dark-300">
          <p className="text-center text-ink-500 text-sm">
            本平台内容仅为中华传统民俗文化参考，不作为人生重大决策唯一依据，请理性看待。
          </p>
          <p className="text-center text-ink-600 text-xs mt-4">
            © 2024 玄学AI 版权所有 | 沪ICP备XXXXXXXX号
          </p>
        </div>
      </div>
    </footer>
  );
}
