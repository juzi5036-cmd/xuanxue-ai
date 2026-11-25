import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown, Clock,
  Shield, Award, CheckCircle
} from 'lucide-react';

const timeSlots = [
  { date: '今天', slots: ['14:00', '15:00', '16:00', '19:00', '20:00'] },
  { date: '明天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00'] },
  { date: '后天', slots: ['09:00', '10:00', '14:00', '15:00', '19:00', '20:00'] },
];

export default function ZhenrenPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBook = () => {
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold mb-4">
            <Crown className="w-4 h-4 mr-2" />
            高端专属服务
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink-100 mb-3 font-serif">真人1V1咨询</h1>
          <p className="text-ink-400 max-w-2xl mx-auto">
            资深命理师傅一对一语音深度答疑，定制化拆解命理、风水高阶难题
          </p>
        </div>

        {/* 服务介绍 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-12 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">5分钟深度对话</h3>
              <p className="text-white/80 text-sm">高效解答，直击核心问题</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">资深师傅团队</h3>
              <p className="text-white/80 text-sm">平均20年以上从业经验</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">隐私安全保障</h3>
              <p className="text-white/80 text-sm">严格保密，放心咨询</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <span className="text-4xl font-bold">¥1600</span>
            <span className="text-white/80 ml-2">/ 单次5分钟</span>
          </div>
        </div>

        {/* 咨询范围 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-ink-100 mb-6 font-serif text-center">咨询覆盖范围</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '📊', title: '八字格局深度拆解', desc: '命局结构、格局层次、喜用神精准判定' },
              { icon: '💰', title: '事业财运长期规划', desc: '职业方向、创业时机、投资理财建议' },
              { icon: '🏠', title: '住宅风水定制布局', desc: '户型分析、方位调整、软装布置' },
              { icon: '💄', title: '医美整形命理适配', desc: '面部调整、发型选择、形象优化' },
              { icon: '💕', title: '婚姻矛盾化解', desc: '感情危机、婚姻经营、正缘判断' },
              { icon: '🧘', title: '居家全套调理', desc: '穿搭饮食、家居布局、开运方法' },
            ].map((item, i) => (
              <div key={i} className="card p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-ink-100 mb-1">{item.title}</h4>
                <p className="text-sm text-ink-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 预约时间 */}
        <div className="card p-6 mb-12">
            <h2 className="text-xl font-bold text-ink-100 mb-6 font-serif">选择预约时间</h2>
            
            {/* 日期选择 */}
            <div className="mb-6">
              <p className="text-sm text-ink-300 mb-3">选择日期</p>
              <div className="flex space-x-3">
                {timeSlots.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedTime(null);
                    }}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedDate?.date === day.date
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-dark-300 text-ink-300 hover:border-dark-400'
                    }`}
                  >
                    {day.date}
                  </button>
                ))}
              </div>
            </div>

            {/* 时间选择 */}
            {selectedDate && (
              <div className="mb-6">
                <p className="text-sm text-ink-300 mb-3">选择时段</p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {selectedDate.slots.map((time, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedTime === time
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-dark-300 text-ink-300 hover:border-dark-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 确认预约 */}
            {selectedTime && (
              <div className="bg-purple-500/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-ink-100">预约确认</h4>
                    <p className="text-sm text-ink-400 mt-1">
                      {selectedDate.date} {selectedTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-purple-400">¥1600</span>
                    <span className="text-sm text-ink-500 block">5分钟语音咨询</span>
                  </div>
                </div>
                <button
                  onClick={handleBook}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
                >
                  立即预约
                </button>
              </div>
            )}
          </div>

        {/* 服务须知 */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-ink-100 mb-4 font-serif">服务须知</h2>
          <div className="space-y-3 text-sm text-ink-300">
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
              <p>下单后不可即时连线，需提前选择师傅空闲时段预约，系统将推送预约提醒。</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
              <p>单次咨询限时5分钟，计时从双方接通对话开始，时间到自动终止沟通，无延时、无补时。</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
              <p>本服务为独立付费项目，不赠送月度会员、不赠送时辰反推次数。</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
              <p>咨询内容仅供参考，不作为人生重大决策唯一依据，请理性看待。</p>
            </div>
          </div>
        </div>

        {/* 返回 */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-ink-400 hover:text-gold-400 transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>

      {/* 预约确认弹窗 */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-dark-400 rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-ink-100 mb-2">预约提交成功</h3>
              <p className="text-ink-400 mb-6">
                我们已收到您的预约申请，师傅确认后将通过短信通知您。
              </p>
              <div className="bg-dark-300/50 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-ink-400">预约时间</span>
                  <span className="font-medium text-ink-100">{selectedDate?.date} {selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-400">咨询费用</span>
                  <span className="font-bold text-purple-400">¥1600</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link
                  to="/user"
                  className="flex-1 btn-secondary"
                  onClick={() => setShowBookingModal(false)}
                >
                  查看订单
                </Link>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 btn-primary"
                >
                  我知道了
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
