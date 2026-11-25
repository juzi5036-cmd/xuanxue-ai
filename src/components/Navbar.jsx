import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Crown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '八字命理', path: '/bazi' },
    { name: '风水测算', path: '/fengshui' },
    { name: '时辰反推', path: '/shichen', highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-500/95 backdrop-blur-md border-b border-dark-200 shadow-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gold-400 font-serif text-gold-glow">玄学AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link flex items-center space-x-1 ${
                  location.pathname === link.path ? 'nav-link-active' : ''
                } ${link.highlight ? 'text-gold-400 font-bold' : ''} ${
                  link.premium ? 'text-purple-400' : ''
                }`}
              >
                {link.premium && <Crown className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/vip" className="btn-secondary text-sm py-2 px-4">
              <span className="flex items-center space-x-1">
                <Crown className="w-4 h-4" />
                <span>开通会员</span>
              </span>
            </Link>
            <Link to="/login" className="btn-ghost p-2">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-dark-500 border-t border-dark-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg nav-link ${
                  location.pathname === link.path ? 'bg-gold-500/10 text-gold-400' : ''
                } ${link.highlight ? 'text-gold-400 font-bold' : ''} ${
                  link.premium ? 'text-purple-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-2">
                  {link.premium && <Crown className="w-4 h-4" />}
                  <span>{link.name}</span>
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-dark-200 space-y-2">
              <Link
                to="/vip"
                className="btn-primary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                开通会员
              </Link>
              <Link
                to="/login"
                className="btn-secondary w-full text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                登录
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
