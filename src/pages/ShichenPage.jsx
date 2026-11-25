import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, AlertTriangle, Shield, Star, ChevronRight, ChevronLeft,
  Lock, User, Calendar, MapPin, CheckCircle, Sparkles, X, Info
} from 'lucide-react';
import { getAllQuestions, SHICHEN_TIME } from '../data/shichenQuestions';

const allQuestions = getAllQuestions();

export default function ShichenPage() {
  const [step, setStep] = useState('intro'); // intro, info, questionnaire, result
  const [userInfo, setUserInfo] = useState({
    name: '',
    gender: '男',
    year: 1990,
    month: 1,
    day: 1,
    city: '',
    fuzzyTime: ''
  });
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setStep('questionnaire');
    setCurrentPage(0);
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getCurrentQuestions = () => {
    const start = currentPage * questionsPerPage;
    return allQuestions.slice(start, start + questionsPerPage);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // 提交问卷
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    setStep('result');
  };

  const progress = (getAnsweredCount() / allQuestions.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold mb-4">
            <Star className="w-4 h-4 mr-2" />
            全网独家功能
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">时辰精准反推</h1>
          <p className="text-ink-400">30道分层大题校正生辰，推算精准到出生分钟</p>
        </div>

        {/* 重要提示 */}
        <div className="bg-red-500/10 border border-red-200 rounded-xl p-5 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-400 mb-2">重要须知</h3>
              <ul className="text-sm text-red-400 space-y-1">
                <li>• 本套餐仅包含 <strong>2次</strong> 完整测算机会，次数用完需重新购买</li>
                <li>• 永久绑定 <strong>1个人</strong>，不可换人、不可帮他人代算</li>
                <li>• 请如实谨慎作答所有题目，随意修改选项会造成推算结果偏差</li>
                <li>• 本功能为独立单项，不赠送月度会员任何权限</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intro 阶段 */}
        {step === 'intro' && (
          <div className="space-y-8">
            {/* 功能介绍 */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif">为什么需要时辰反推？</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-100">时辰不准，全盘皆错</h4>
                      <p className="text-sm text-ink-400">出生时辰错一个，八字格局、喜用神、运势可能完全不同</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-100">传统方法不够精准</h4>
                      <p className="text-sm text-ink-400">仅靠性格、外貌判断误差大，需结合人生大事多方验证</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-100">30道大题系统校正</h4>
                      <p className="text-sm text-ink-400">人生大事、性格特征、六亲关系三大维度全面验证</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-100">精准到5分钟区间</h4>
                      <p className="text-sm text-ink-400">AI算法遍历十二时辰，输出最匹配的出生时间范围</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 三大题型 */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="font-bold text-ink-100 mb-2">人生重大事件</h3>
                <p className="text-sm text-ink-400">10道题</p>
                <p className="text-xs text-ink-500 mt-2">升学、结婚、生子、破财等关键年份匹配</p>
              </div>
              <div className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-bold text-ink-100 mb-2">性格五官特征</h3>
                <p className="text-sm text-ink-400">10道题</p>
                <p className="text-xs text-ink-500 mt-2">颧骨、身形、睡眠、体质等特征验证</p>
              </div>
              <div className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-bold text-ink-100 mb-2">六亲缘分</h3>
                <p className="text-sm text-ink-400">10道题</p>
                <p className="text-xs text-ink-500 mt-2">父母、兄弟姐妹、子女、伴侣关系验证</p>
              </div>
            </div>

            {/* 开始按钮 */}
            <div className="text-center">
              <div className="inline-block">
                <div className="bg-gradient-gold text-white rounded-t-xl px-6 py-2 text-sm font-bold">
                  ¥68 · 2次测算机会
                </div>
                <button
                  onClick={() => setStep('info')}
                  className="btn-primary text-lg px-12 py-4 rounded-t-none font-bold"
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>开始时辰反推</span>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
              <p className="text-xs text-ink-500 mt-3">
                点击即表示同意服务协议，绑定信息后不可更改
              </p>
            </div>
          </div>
        )}

        {/* 信息录入阶段 */}
        {step === 'info' && (
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-ink-100 font-serif">填写测算人信息</h2>
              <span className="text-sm text-ink-500">第 1 步 / 共 2 步</span>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-400">
                <Lock className="w-4 h-4 inline mr-1" />
                <strong>重要：</strong>以下信息提交后将永久锁定，不可修改。请务必确认填写正确。
              </p>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">姓名 *</label>
                  <input
                    type="text"
                    required
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(p => ({ ...p, name: e.target.value }))}
                    placeholder="请输入真实姓名"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-200 mb-2">性别 *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserInfo(p => ({ ...p, gender: '男' }))}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        userInfo.gender === '男'
                          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                          : 'border-dark-300 text-ink-400 hover:border-dark-400'
                      }`}
                    >
                      男
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserInfo(p => ({ ...p, gender: '女' }))}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        userInfo.gender === '女'
                          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                          : 'border-dark-300 text-ink-400 hover:border-dark-400'
                      }`}
                    >
                      女
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  出生日期 *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={userInfo.year}
                    onChange={(e) => setUserInfo(p => ({ ...p, year: parseInt(e.target.value) }))}
                    className="input-field text-sm"
                  >
                    {Array.from({ length: 120 }, (_, i) => 1920 + i).map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                  <select
                    value={userInfo.month}
                    onChange={(e) => setUserInfo(p => ({ ...p, month: parseInt(e.target.value) }))}
                    className="input-field text-sm"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>{month}月</option>
                    ))}
                  </select>
                  <select
                    value={userInfo.day}
                    onChange={(e) => setUserInfo(p => ({ ...p, day: parseInt(e.target.value) }))}
                    className="input-field text-sm"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day}日</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  出生城市 *
                </label>
                <select
                  required
                  value={userInfo.city}
                  onChange={(e) => setUserInfo(p => ({ ...p, city: e.target.value }))}
                  className="input-field"
                >
                  <option value="">请选择出生城市（用于真太阳时校正）</option>
                  <option value="beijing">北京市</option>
                  <option value="shanghai">上海市</option>
                  <option value="guangzhou">广州市</option>
                  <option value="shenzhen">深圳市</option>
                  <option value="hangzhou">杭州市</option>
                  <option value="chengdu">成都市</option>
                  <option value="wuhan">武汉市</option>
                  <option value="nanjing">南京市</option>
                  <option value="xian">西安市</option>
                  <option value="chongqing">重庆市</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-200 mb-2">
                  模糊出生时段 *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['上午', '下午', '夜里', '完全不清楚'].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setUserInfo(p => ({ ...p, fuzzyTime: time }))}
                      className={`py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        userInfo.fuzzyTime === time
                          ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                          : 'border-dark-300 text-ink-400 hover:border-dark-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('intro')}
                  className="btn-secondary flex-1"
                >
                  <span className="flex items-center justify-center space-x-1">
                    <ChevronLeft className="w-4 h-4" />
                    <span>返回</span>
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={!userInfo.name || !userInfo.city || !userInfo.fuzzyTime}
                  className="btn-primary flex-1"
                >
                  <span className="flex items-center justify-center space-x-1">
                    <span>确认并开始答题</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 问卷阶段 */}
        {step === 'questionnaire' && (
          <div className="card p-8">
            {/* 进度条 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-ink-200">
                  答题进度：{getAnsweredCount()} / {allQuestions.length} 题
                </span>
                <span className="text-sm text-ink-500">
                  第 {currentPage + 1} / {totalPages} 页
                </span>
              </div>
              <div className="w-full h-3 bg-dark-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 to-primary-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 题目分类标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                人生重大事件（1-10题）
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                性格五官特征（11-20题）
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                六亲缘分（21-30题）
              </span>
            </div>

            {/* 当前页题目 */}
            <div className="space-y-8">
              {getCurrentQuestions().map((q, index) => {
                const globalIndex = currentPage * questionsPerPage + index + 1;
                return (
                  <div key={q.id} className="border-b border-dark-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {globalIndex}
                      </span>
                      <h3 className="font-semibold text-ink-100 pt-1">{q.question}</h3>
                    </div>
                    <div className="ml-11 grid md:grid-cols-2 gap-3">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(q.id, option.value)}
                          className={`text-left p-4 rounded-lg border-2 transition-all ${
                            answers[q.id] === option.value
                              ? 'border-gold-500 bg-gold-500/10'
                              : 'border-dark-300 hover:border-dark-400 bg-dark-400'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                              answers[q.id] === option.value
                                ? 'border-gold-500 bg-gold-500'
                                : 'border-dark-400'
                            }`}>
                              {answers[q.id] === option.value && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </span>
                            <span className={`text-sm ${
                              answers[q.id] === option.value ? 'text-gold-500 font-medium' : 'text-ink-300'
                            }`}>
                              {option.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 分页按钮 */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-200">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center space-x-1">
                  <ChevronLeft className="w-4 h-4" />
                  <span>上一页</span>
                </span>
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentPage ? 'bg-gold-500 w-8' : 'bg-ink-200 hover:bg-ink-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={getAnsweredCount() < (currentPage + 1) * questionsPerPage && currentPage < totalPages - 1}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center space-x-1">
                  <span>{currentPage === totalPages - 1 ? '提交测算' : '下一页'}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>

            {/* 跳过答题按钮 */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setShowSkipModal(true)}
                className="text-ink-500 hover:text-gold-400 text-sm transition-colors"
              >
                跳过答题，直接查看结果 →
              </button>
            </div>
          </div>
        )}

        {/* 结果阶段 */}
        {step === 'result' && (
          <div className="space-y-6">
            {/* 核心结果 */}
            <div className="card p-8 text-center bg-gradient-to-b from-gold-50 to-white">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-ink-100 mb-2 font-serif">时辰推算结果</h2>
              <p className="text-ink-400 mb-6">基于30道题目综合分析得出</p>
              
              <div className="bg-dark-400 rounded-xl p-6 shadow-inner max-w-md mx-auto">
                <div className="text-sm text-ink-500 mb-2">最可能的出生时间</div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-primary-500 mb-2">
                  07:30 - 08:15
                </div>
                <div className="text-lg text-ink-200 font-medium">
                  辰时（{SHICHEN_TIME['辰']}）
                </div>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-sm text-ink-400">匹配度</span>
                  <span className="text-lg font-bold text-green-400">92%</span>
                </div>
              </div>
            </div>

            {/* 校正报告概览 */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-ink-100 mb-4 font-serif">校正报告摘要</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-lg">
                  <span className="text-ink-300">校正前八字（假设午时）</span>
                  <span className="font-mono text-ink-400">庚午 壬午 丙午 甲午</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl">↓</span>
                  <p className="text-xs text-ink-500 mt-1">时辰校正后</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-gold-500/10 rounded-lg border-2 border-gold-200">
                  <span className="text-ink-200 font-medium">校正后八字（辰时）</span>
                  <span className="font-mono text-gold-500 font-bold">庚午 壬午 丙午 壬辰</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">87%</div>
                  <div className="text-xs text-green-400">格局变化度</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">大</div>
                  <div className="text-xs text-blue-400">喜用神变化</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">显著</div>
                  <div className="text-xs text-purple-400">运势差异</div>
                </div>
              </div>
            </div>

            {/* 详细报告引导 */}
            <div className="card p-6 bg-gradient-to-r from-gold-50 to-primary-50 border-gold-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-ink-100 mb-2">开通会员，查看完整校正报告</h4>
                  <ul className="text-sm text-ink-300 space-y-1">
                    <li>✓ 校正后完整八字详细解读</li>
                    <li>✓ 十年大运走势预览</li>
                    <li>✓ 时辰误差对比详细分析</li>
                    <li>✓ 格局、喜用神完整推导</li>
                  </ul>
                  <div className="mt-4 flex items-center space-x-3">
                    <Link to="/vip" className="btn-primary">
                      开通会员 ¥28/月
                    </Link>
                    <span className="text-sm text-ink-500">剩余 1 次测算机会</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 再次测算 */}
            <div className="text-center">
              <button
                onClick={() => {
                  setStep('questionnaire');
                  setCurrentPage(0);
                  setAnswers({});
                }}
                className="btn-secondary"
              >
                重新测算（还剩1次机会）
              </button>
            </div>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-ink-500">
            本平台内容仅为中华传统民俗文化参考，不作为人生重大决策唯一依据，请理性看待。
          </p>
        </div>

        {/* 跳过提示弹窗 */}
        {showSkipModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-dark-500 border border-dark-200 rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
              <button
                onClick={() => setShowSkipModal(false)}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Info className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-ink-100 font-serif mb-2">确定要跳过答题吗？</h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  时辰反推的准确度取决于答题数量。完整答完30道题，
                  推算精度可达<span className="text-gold-400 font-bold">5分钟</span>以内；
                  跳过答题将只根据您填写的模糊时段给出参考结果，
                  <span className="text-red-400">误差可能达到2-4小时</span>。
                </p>
              </div>

              <div className="bg-amber-500/10 rounded-lg p-4 mb-6">
                <p className="text-xs text-amber-400 leading-relaxed">
                  💡 建议：如果您对出生时间完全没有概念，建议至少答完前10道"人生重大事件"题，
                  可以显著提升推算准确度。
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSkipModal(false)}
                  className="btn-secondary flex-1"
                >
                  继续答题
                </button>
                <button
                  onClick={handleSkipConfirm}
                  className="flex-1 py-3 px-4 rounded-lg font-medium border-2 border-red-400/50 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  仍要跳过
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
