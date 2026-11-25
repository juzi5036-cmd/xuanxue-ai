import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Phone, ChevronLeft, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

const PHONE_REGEX = /^1[3-9]\d{9}$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [agree, setAgree] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);

  const isPhoneValid = PHONE_REGEX.test(phone);
  const showPhoneHint = phoneTouched && phone.length > 0 && !isPhoneValid;

  const handlePhoneChange = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 11);
    setPhone(cleaned);
    if (error) setError('');
  };

  const handleSendCode = () => {
    if (!isPhoneValid) {
      setError('请输入正确的11位手机号');
      setPhoneTouched(true);
      return;
    }
    setError('');
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setPhoneTouched(true);
    if (!isPhoneValid) {
      setError('请输入正确的11位手机号');
      return;
    }
    if (code.length !== 6) {
      setError('请输入6位验证码');
      return;
    }
    if (!agree) {
      setError('请先同意用户协议和隐私政策');
      return;
    }
    setError('');
    navigate('/');
  };

  const phoneBorderClass = phone.length === 0
    ? 'border-dark-300 focus-within:border-gold-400'
    : isPhoneValid
      ? 'border-green-500/50 focus-within:border-green-400'
      : 'border-red-500/50 focus-within:border-red-400';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* 返回 */}
        <Link to="/" className="inline-flex items-center text-ink-400 hover:text-gold-400 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回首页
        </Link>

        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gold-400 font-serif">玄学AI</h1>
            <p className="text-ink-400 text-sm mt-2">手机验证码登录</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* 手机号 */}
            <div>
              <div className={`flex items-center border rounded-lg overflow-hidden transition-colors ${phoneBorderClass}`}>
                <div className="px-4 py-3 text-ink-400 border-r border-dark-300">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => setPhoneTouched(true)}
                  className="flex-1 bg-transparent px-4 py-3 text-ink-100 placeholder-ink-500 outline-none"
                />
                {isPhoneValid && (
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                )}
              </div>
              {/* 实时提示 */}
              {showPhoneHint && (
                <div className="flex items-center mt-2 text-red-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  {phone.length < 11
                    ? `手机号不足11位（当前${phone.length}位）`
                    : '手机号格式不正确，需以1[3-9]开头的11位数字'}
                </div>
              )}
            </div>

            {/* 验证码 */}
            <div>
              <div className="flex items-center border border-dark-300 rounded-lg overflow-hidden focus-within:border-gold-400 transition-colors">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-transparent px-4 py-3 text-ink-100 placeholder-ink-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0 || !isPhoneValid}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    countdown > 0 || !isPhoneValid
                      ? 'text-ink-500 cursor-not-allowed'
                      : 'text-gold-400 hover:text-gold-300'
                  }`}
                >
                  {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* 协议 */}
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-dark-300 bg-dark-400 text-gold-500 focus:ring-gold-400"
              />
              <span className="text-xs text-ink-400 leading-relaxed">
                我已阅读并同意
                <span className="text-gold-400">《用户协议》</span>
                和
                <span className="text-gold-400">《隐私政策》</span>
              </span>
            </label>

            {/* 登录按钮 */}
            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg font-bold"
            >
              登 录
            </button>
          </form>

          {/* 安全提示 */}
          <div className="mt-6 flex items-center justify-center text-ink-500 text-xs">
            <ShieldCheck className="w-4 h-4 mr-1" />
            <span>登录即表示同意协议，您的信息已加密保护</span>
          </div>
        </div>
      </div>
    </div>
  );
}
