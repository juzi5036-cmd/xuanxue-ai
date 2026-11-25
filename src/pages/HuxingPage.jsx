import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Compass, ChevronLeft, Lock, Crown, CheckCircle2,
  AlertTriangle, Shield, Sparkles, Star, DollarSign,
  Building2, BookOpen, Upload, Palette
} from 'lucide-react';

export default function HuxingPage() {
  const [step, setStep] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const analysisSteps = [
    { name: '户型识别', icon: Building2 },
    { name: '朝向分析', icon: Compass },
    { name: '财位定位', icon: DollarSign },
    { name: '缺角检测', icon: AlertTriangle },
    { name: '九星分布', icon: Star },
    { name: '配色建议', icon: Palette },
    { name: '布局优化', icon: Home },
    { name: '报告生成', icon: BookOpen },
  ];

  const handleUpload = () => {
    setUploaded(true);
    setStep(1);
    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      setStep(currentStep);
      if (currentStep >= 8) {
        clearInterval(interval);
        setTimeout(() => setStep(100), 500);
      }
    }, 600);
  };

  const mockResult = {
    overallScore: 78,
    houseType: '坎宅',
    orientation: '坐北朝南',
    structure: '整体格局方正，无明显缺角',
    advantages: [
      '坐北朝南，采光通风良好',
      '客厅位于东南延年吉位',
      '主卧位于南方天医吉位',
      '户型方正，空间利用率高',
    ],
    disadvantages: [
      '卫生间位于西北乾位，不利男主人运势',
      '厨房与卫生间相邻，水火相冲',
      '入户门正对客厅阳台，形成穿堂煞',
    ],
    wealthPosition: { direction: '东南方', status: '财位在客厅，状态良好', suggestion: '可摆放招财植物、聚宝盆等' },
    missingCorners: [],
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/fengshui" className="inline-flex items-center text-sm text-ink-400 hover:text-gold-400 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回风水测算
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-bold mb-4">
            <Compass className="w-4 h-4 mr-2" />
            户型图AI解析
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">AI智能户型风水分析</h1>
          <p className="text-ink-400">上传户型图，AI自动识别户型结构，8大维度深度分析</p>
        </div>

        <div className="card p-8">
          {/* 上传区 */}
          {step === 0 && (
            <div className="text-center">
              <div className="border-2 border-dashed border-dark-300 rounded-2xl p-10 mb-6 hover:border-primary-400 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary-500" />
                </div>
                <p className="text-ink-200 font-medium mb-2">上传您的户型图</p>
                <p className="text-sm text-ink-500 mb-4">支持 JPG、PNG 格式，建议清晰完整的户型图</p>
                <button onClick={handleUpload} className="btn-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  开始AI分析
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {analysisSteps.slice(0, 4).map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="p-3 bg-dark-300/50 rounded-lg text-center">
                      <Icon className="w-5 h-5 mx-auto mb-1 text-ink-500" />
                      <div className="text-xs text-ink-500">{s.name}</div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-ink-500">
                AI智能识别户型结构，8大维度深度分析，生成专属风水报告
              </p>
            </div>
          )}

          {/* 分析中 */}
          {step > 0 && step < 100 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-ink-100 mb-2">AI正在分析中...</h3>
              <p className="text-sm text-ink-500 mb-6">请稍候，正在进行{analysisSteps[step - 1]?.name || '深度分析'}</p>

              <div className="grid grid-cols-4 gap-2">
                {analysisSteps.map((s, i) => {
                  const Icon = s.icon;
                  const done = i < step;
                  const current = i === step - 1;
                  return (
                    <div key={i} className={`p-2 rounded-lg text-center transition-all ${
                      done ? 'bg-green-500/20' : current ? 'bg-primary-500/20 animate-pulse' : 'bg-dark-300/50'
                    }`}>
                      <Icon className={`w-4 h-4 mx-auto mb-1 ${
                        done ? 'text-green-400' : current ? 'text-primary-600' : 'text-ink-400'
                      }`} />
                      <div className={`text-xs ${
                        done ? 'text-green-400 font-medium' : current ? 'text-primary-700' : 'text-ink-500'
                      }`}>{s.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 分析结果 */}
          {step === 100 && (
            <div className="space-y-5">
              {/* 总分 */}
              <div className="text-center p-6 bg-gradient-to-br from-primary-500/10 to-gold-500/10 rounded-2xl">
                <div className="text-sm text-ink-500 mb-2">户型风水综合评分</div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-600 mb-2">
                  {mockResult.overallScore}
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-ink-400">
                  <span>{mockResult.orientation}</span>
                  <span className="w-1 h-1 bg-dark-300 rounded-full"></span>
                  <span>{mockResult.houseType}</span>
                </div>
                <p className="text-sm text-ink-500 mt-2">{mockResult.structure}</p>
              </div>

              {/* 优缺点 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    户型优点
                  </h4>
                  <ul className="space-y-2">
                    {mockResult.advantages.map((adv, i) => (
                      <li key={i} className="text-sm text-green-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    需要注意
                  </h4>
                  <ul className="space-y-2">
                    {mockResult.disadvantages.map((dis, i) => (
                      <li key={i} className="text-sm text-red-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 财位定位 */}
              <div className="p-4 bg-gold-500/10 rounded-xl border border-gold-500/30">
                <h4 className="font-bold text-gold-500 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  财位定位
                </h4>
                <p className="text-sm text-gold-500 mb-1">
                  <span className="font-medium">方位：</span>{mockResult.wealthPosition.direction}
                </p>
                <p className="text-sm text-gold-400 mb-1">
                  <span className="font-medium">状态：</span>{mockResult.wealthPosition.status}
                </p>
                <p className="text-sm text-gold-400">
                  <span className="font-medium">建议：</span>{mockResult.wealthPosition.suggestion}
                </p>
              </div>

              {/* 会员解锁完整报告 */}
              {!unlocked && (
                <div className="relative min-h-[320px]">
                  <div className="opacity-30 blur-sm space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {['客厅风水', '主卧风水', '厨房风水', '卫生间风水', '书房风水', '次卧风水'].map((r, i) => (
                        <div key={i} className="p-3 bg-dark-300/50 rounded-lg">
                          <div className="text-sm font-medium text-ink-200">{r}</div>
                          <div className="text-xs text-ink-500">详细吉凶分析与布局建议...</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-dark-300/50 rounded-xl">
                      <h4 className="font-bold text-ink-200 mb-2">九星分布</h4>
                      <p className="text-sm text-ink-500">八宅九星飞布、吉凶方位详解...</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                      <h4 className="font-bold text-amber-400 mb-2">化解方案</h4>
                      <p className="text-sm text-amber-400">针对凶位和煞气的具体化解方法...</p>
                    </div>
                    <div className="p-4 bg-dark-300/50 rounded-xl">
                      <h4 className="font-bold text-ink-200 mb-2">布局优化建议</h4>
                      <p className="text-sm text-ink-500">家具摆放、装修改造、软装搭配建议...</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-dark-400/95 backdrop-blur-sm rounded-xl px-8 py-7 text-center max-w-md w-full shadow-xl border border-dark-200">
                      <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-7 h-7 text-gold-500" />
                      </div>
                      <p className="text-ink-100 font-bold text-lg mb-2">解锁完整户型风水报告</p>
                      <p className="text-sm text-ink-500 mb-5 leading-relaxed">
                        各房间详细分析、九星分布、化解方案、布局优化建议
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => setUnlocked(true)} className="btn-secondary text-sm px-5">
                          预览完整效果
                        </button>
                        <Link to="/vip" className="btn-primary text-sm px-5 inline-flex items-center">
                          <Crown className="w-4 h-4 mr-1" />
                          开通会员
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 已解锁 - 完整报告 */}
              {unlocked && (
                <div className="space-y-5">
                  {/* 各房间详细分析 */}
                  <div>
                    <h4 className="font-bold text-ink-100 mb-3 flex items-center">
                      <Home className="w-4 h-4 mr-2 text-primary-500" />
                      各房间风水详解
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { name: '客厅风水', direction: '东南方', jixiong: '吉', score: 92, desc: '位于延年吉位，主家庭和睦、贵人相助。宽敞明亮，气场流通良好。', suggestion: '可在东南角摆放绿植或流水摆件增旺气场。' },
                        { name: '主卧风水', direction: '正南方', jixiong: '吉', score: 88, desc: '位于天医吉位，主健康长寿、夫妻感情和睦。采光充足，温度适宜。', suggestion: '床头靠南墙，避免床头靠窗，可放一对鸳鸯摆件增旺感情。' },
                        { name: '厨房风水', direction: '正东方', jixiong: '吉', score: 85, desc: '位于震位，木火相生，主家人健康、财运旺盛。通风良好，动线合理。', suggestion: '灶台坐东朝西，避免与水龙头正对，可挂葫芦化煞。' },
                        { name: '卫生间风水', direction: '西北方', jixiong: '凶', score: 45, desc: '位于乾位，不利男主人运势、事业发展和健康。污秽之气压制天位。', suggestion: '常关马桶盖、保持干燥通风，挂铜葫芦化解，放置粗盐吸煞。' },
                        { name: '书房风水', direction: '东北方', jixiong: '平', score: 68, desc: '位于艮位，适合读书学习，但气场稍显凝滞。需要适当布置增加活力。', suggestion: '书桌坐北朝南，摆放文昌塔或毛笔提升文昌运。' },
                        { name: '次卧风水', direction: '正西方', jixiong: '平', score: 72, desc: '位于兑位，气场平和，适合儿童或老人居住。但需要注意金属元素过多。', suggestion: '增加绿植调和气场，避免摆放过多金属物品。' },
                      ].map((room, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${
                          room.jixiong === '吉' ? 'bg-green-500/10 border-green-500/30' :
                          room.jixiong === '凶' ? 'bg-red-500/10 border-red-500/30' :
                          'bg-yellow-500/10 border-yellow-500/30'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-ink-100">{room.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm font-bold ${
                                room.jixiong === '吉' ? 'text-green-400' :
                                room.jixiong === '凶' ? 'text-red-400' :
                                'text-yellow-400'
                              }`}>{room.score}分</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${
                                room.jixiong === '吉' ? 'bg-green-500' :
                                room.jixiong === '凶' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`}>{room.jixiong}</span>
                            </div>
                          </div>
                          <div className="text-xs text-ink-500 mb-2">方位：{room.direction}</div>
                          <p className="text-sm text-ink-400 mb-2">{room.desc}</p>
                          <div className="text-xs text-ink-500 bg-dark-400/50 p-2 rounded-lg">
                            <span className="font-medium">建议：</span>{room.suggestion}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 九星分布 */}
                  <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
                    <h4 className="font-bold text-purple-400 mb-4 flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      八宅九星分布
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center mb-4">
                      {[
                        { pos: '西北', star: '六煞', level: '凶' },
                        { pos: '北', star: '伏位', level: '吉' },
                        { pos: '东北', star: '五鬼', level: '凶' },
                        { pos: '西', star: '祸害', level: '凶' },
                        { pos: '中', star: '—', level: '' },
                        { pos: '东', star: '延年', level: '吉' },
                        { pos: '西南', star: '绝命', level: '凶' },
                        { pos: '南', star: '天医', level: '吉' },
                        { pos: '东南', star: '生气', level: '吉' },
                      ].map((cell, i) => (
                        <div key={i} className={`p-3 rounded-lg ${
                          cell.level === '吉' ? 'bg-green-500/20' :
                          cell.level === '凶' ? 'bg-red-500/20' :
                          'bg-dark-400/50'
                        }`}>
                          <div className="text-xs text-ink-500 mb-1">{cell.pos}</div>
                          <div className={`text-sm font-bold ${
                            cell.level === '吉' ? 'text-green-400' :
                            cell.level === '凶' ? 'text-red-400' :
                            'text-ink-500'
                          }`}>{cell.star}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-6 text-xs">
                      <span className="flex items-center"><span className="w-3 h-3 bg-green-500/20 rounded mr-1"></span>吉方</span>
                      <span className="flex items-center"><span className="w-3 h-3 bg-red-500/20 rounded mr-1"></span>凶方</span>
                      <span className="text-ink-500">四吉四凶，吉方宜用，凶方宜化</span>
                    </div>
                  </div>

                  {/* 化解方案 */}
                  <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <h4 className="font-bold text-amber-400 mb-4 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      针对性化解方案
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: '西北卫生间（乾位受污）', method: '1. 常关马桶盖，保持卫生间干燥通风；2. 挂铜葫芦于卫生间门后；3. 地面铺深色地垫，放置粗盐吸煞；4. 点香薰或放艾草净化气场；5. 卫生间门挂长帘遮挡。' },
                        { title: '入户门对阳台（穿堂煞）', method: '1. 在客厅中间设置屏风或玄关柜；2. 阳台种植高大绿植遮挡；3. 悬挂珠帘或窗帘减缓气流；4. 客厅摆放聚宝盆聚气。' },
                        { title: '厨卫相邻（水火相冲）', method: '1. 在厨房和卫生间之间放一盆绿植；2. 中间的墙面挂葫芦或五帝钱化解；3. 保持厨卫门常关，避免气流对冲。' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-dark-400/60 rounded-lg">
                          <div className="font-medium text-amber-400 text-sm mb-2">{item.title}</div>
                          <p className="text-sm text-amber-400 leading-relaxed whitespace-pre-line">{item.method}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 布局优化建议 */}
                  <div className="p-5 bg-dark-300/50 rounded-xl">
                    <h4 className="font-bold text-ink-100 mb-4 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                      布局优化建议
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { icon: '沙发', title: '家具摆放', content: '沙发宜靠实墙摆放，忌背后无靠；电视柜不宜过高，避免压制气场。' },
                        { icon: '门窗', title: '门窗格局', content: '入户门不宜正对阳台，需设玄关缓冲；窗户不宜过多或过大，以免气散不聚。' },
                        { icon: '照明', title: '照明设计', content: '客厅宜明亮，卧室宜柔和；凶位可用灯光增旺，吉位宜保持明亮。' },
                        { icon: '绿植', title: '绿植布置', content: '客厅东南财位放发财树、绿萝；凶位放仙人掌化煞；卧室不宜放太多植物。' },
                        { icon: '色彩', title: '色彩搭配', content: '整体以暖色调为主，避免过多冷色调；根据宅命五行调整主色调。' },
                        { icon: '摆件', title: '吉祥摆件', content: '财位放聚宝盆、貔貅；玄关放铜葫芦化煞；书房放文昌塔助学业事业。' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-dark-400 rounded-lg border border-dark-200">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-medium text-ink-200">{item.icon}</span>
                            <span className="font-medium text-ink-200 text-sm ml-2">{item.title}</span>
                          </div>
                          <p className="text-xs text-ink-500 leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dark-200">
                    <span className="text-xs text-ink-500">以上为会员专享完整报告</span>
                    <button onClick={() => setUnlocked(false)} className="text-xs text-primary-600 hover:underline">
                      收起完整报告
                    </button>
                  </div>
                </div>
              )}

              {/* 重新上传 */}
              <div className="text-center">
                <button
                  onClick={() => { setStep(0); setUploaded(false); setUnlocked(false); }}
                  className="text-sm text-primary-600 hover:underline"
                >
                  重新上传户型图
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
