import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Compass, ChevronLeft, Lock, Crown, CheckCircle2,
  AlertTriangle, Shield, Sparkles, Star, DollarSign,
  Heart, Users, BookOpen
} from 'lucide-react';
import { HOUSE_ZUOXIANG, calculateHouseFengshui } from '../data/fengshui';

const houseKeys = Object.keys(HOUSE_ZUOXIANG);
const houseList = houseKeys.map(k => ({ key: k, ...HOUSE_ZUOXIANG[k] }));

export default function ZuoxiangPage() {
  const [zuoxiang, setZuoxiang] = useState('');
  const [dongximing, setDongximing] = useState('');
  const [result, setResult] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleCalculate = () => {
    if (!zuoxiang || !dongximing) return;
    const res = calculateHouseFengshui(zuoxiang, dongximing);
    setResult(res);
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
            住宅坐向吉凶
          </div>
          <h1 className="text-3xl font-bold text-ink-100 mb-3 font-serif">住宅坐向吉凶测算</h1>
          <p className="text-ink-400">输入住宅坐向与命卦，获取宅命匹配分析报告</p>
        </div>

        <div className="card p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">住宅坐向</label>
              <select value={zuoxiang} onChange={(e) => setZuoxiang(e.target.value)} className="input-field">
                <option value="">请选择坐向</option>
                {houseList.map((h, idx) => (
                  <option key={idx} value={h.key}>{h.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-2">您的命卦</label>
              <select value={dongximing} onChange={(e) => setDongximing(e.target.value)} className="input-field">
                <option value="">请选择</option>
                <option value="东四命">东四命</option>
                <option value="西四命">西四命</option>
              </select>
              <p className="text-xs text-ink-500 mt-1">
                不确定？<Link to="/tool/dongxi" className="text-gold-400 hover:underline">先测本命卦</Link>
              </p>
            </div>
          </div>
          <button onClick={handleCalculate} className="btn-primary w-full">
            开始分析
          </button>
        </div>

        {result && !result.success && (
          <div className="card p-6 text-center text-red-400">
            {result.message || '计算失败，请检查输入'}
          </div>
        )}

        {result && result.success && (
          <div className="space-y-5">
            {/* 宅命匹配度 */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-ink-100 text-lg">宅命匹配度</span>
                <span className="text-3xl font-bold text-gold-400">{result.matchScore}分</span>
              </div>
              <div className="w-full h-3 bg-dark-200 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-gold rounded-full transition-all duration-500" style={{ width: `${result.matchScore}%` }}></div>
              </div>
              <p className="text-sm text-ink-400">{result.matchDesc}</p>
            </div>

            {/* 基础分析 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-green-400 mb-3 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  风水优势
                </h3>
                <ul className="space-y-2">
                  {result.advantages.map((adv, i) => (
                    <li key={i} className="text-sm text-ink-400 flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-red-400 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  需注意
                </h3>
                <ul className="space-y-2">
                  {result.disadvantages.map((dis, i) => (
                    <li key={i} className="text-sm text-ink-400 flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 会员完整报告 */}
            {!showDetail ? (
              <div className="relative min-h-[500px]">
                <div className="opacity-30 blur-sm space-y-5">
                  {/* 大门宜忌 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-gold-400" />
                      大门方位宜忌
                    </h3>
                    <p className="text-sm text-ink-400">大门为纳气之口，坐向决定进气吉凶。需分析门向是否当运、是否犯煞...</p>
                  </div>

                  {/* 主卧方位 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-400" />
                      主卧方位分析
                    </h3>
                    <p className="text-sm text-ink-400">主卧位于吉方则夫妻和睦、身体健康；位于凶方则需调整床位或化解...</p>
                  </div>

                  {/* 厨房布局 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-orange-400" />
                      厨房灶台布局
                    </h3>
                    <p className="text-sm text-ink-400">灶台坐向需与宅命配合，坐凶向吉为基本原则。需分析灶台朝向、水火位置关系...</p>
                  </div>

                  {/* 财运文昌位 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-gold-400" />
                      财位与文昌位定位
                    </h3>
                    <p className="text-sm text-ink-400">根据宅卦定位财位与文昌位，指导家具摆放和风水布局...</p>
                  </div>

                  {/* 吉凶方位详解 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-400" />
                      八宅吉凶方位详解
                    </h3>
                    <p className="text-sm text-ink-400">四吉方（生气、延年、天医、伏位）与四凶方（绝命、五鬼、六煞、祸害）分布...</p>
                  </div>

                  {/* 化解方案 */}
                  <div className="card p-5">
                    <h3 className="font-bold text-amber-400 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      凶位化解方案
                    </h3>
                    <p className="text-sm text-amber-400">针对卫生间、厨房等位于凶位的情况，提供具体的化解方法...</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-dark-400/95 backdrop-blur-sm rounded-2xl px-8 py-8 text-center max-w-md w-full shadow-2xl border border-dark-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-ink-100 font-bold text-xl mb-3">解锁完整住宅坐向分析报告</h3>
                    <p className="text-sm text-ink-500 mb-6 leading-relaxed">
                      大门宜忌、主卧方位、厨房布局、财位文昌位、八宅吉凶详解、凶位化解方案
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button onClick={() => setShowDetail(true)} className="btn-secondary text-sm px-6 py-2.5 w-full sm:w-auto order-2 sm:order-1">
                        预览完整效果
                      </button>
                      <Link to="/vip" className="btn-primary text-sm px-6 py-2.5 w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center">
                        <Crown className="w-4 h-4 mr-1" />
                        开通会员
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* 大门方位宜忌 */}
                <div className="card p-5">
                  <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-gold-400" />
                    大门方位宜忌
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">宜</span>
                      <p className="text-sm text-ink-300">大门开在生气、延年吉方，纳旺气入宅，主家运昌隆、财运亨通。门向与宅卦配合得当，可收开门见吉之效。</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">忌</span>
                      <p className="text-sm text-ink-300">大门忌开在绝命、五鬼凶方，易招是非、破财、疾病。门向忌正对楼梯、电梯、路冲，犯煞需设玄关化解。</p>
                    </div>
                  </div>
                </div>

                {/* 主卧方位 */}
                <div className="card p-5">
                  <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-400" />
                    主卧方位分析
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-400">天医吉位</span>
                        <span className="text-lg font-bold text-green-400">88分</span>
                      </div>
                      <p className="text-sm text-ink-400">主卧位于天医吉方，主夫妻感情和睦、身体健康。床头靠实墙，避免横梁压顶。</p>
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-red-400">绝命凶位</span>
                        <span className="text-lg font-bold text-red-400">45分</span>
                      </div>
                      <p className="text-sm text-ink-400">若主卧位于绝命方，易导致夫妻争吵、健康受损。建议床头调向或放置铜葫芦化解。</p>
                    </div>
                  </div>
                </div>

                {/* 厨房灶台布局 */}
                <div className="card p-5">
                  <h3 className="font-bold text-ink-100 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-orange-400" />
                    厨房灶台布局
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                        <span className="font-medium text-ink-200 text-sm">灶台坐向原则</span>
                      </div>
                      <p className="text-sm text-ink-400 ml-9">灶台坐凶向吉为基本原则：灶口（火门）朝向吉方，灶背靠凶方，以火镇压凶方煞气。</p>
                    </div>
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                        <span className="font-medium text-ink-200 text-sm">水火关系</span>
                      </div>
                      <p className="text-sm text-ink-400 ml-9">灶台与水龙头、冰箱忌正对，水火相冲影响财运和健康。两者间距至少30厘米以上。</p>
                    </div>
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                        <span className="font-medium text-ink-200 text-sm">灶位禁忌</span>
                      </div>
                      <p className="text-sm text-ink-400 ml-9">灶台忌正对大门、卧室门；忌横梁压灶；忌灶台下方有水管通过。可在灶台上方挂葫芦化解横梁煞。</p>
                    </div>
                  </div>
                </div>

                {/* 财位与文昌位 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card p-5">
                    <h3 className="font-bold text-gold-500 mb-3 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      财位定位
                    </h3>
                    <p className="text-sm text-ink-400 mb-3">财位位于客厅的对角线方位，分为明财位和暗财位：</p>
                    <ul className="space-y-2">
                      <li className="text-sm text-ink-300 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span><strong className="text-gold-400">明财位</strong>：入户门对角线45度位置，宜明亮、干净，可摆放聚宝盆、貔貅</span>
                      </li>
                      <li className="text-sm text-ink-300 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span><strong className="text-gold-400">暗财位</strong>：根据宅卦定位，坎宅暗财位在东南方，宜摆放发财树</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card p-5">
                    <h3 className="font-bold text-blue-400 mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      文昌位定位
                    </h3>
                    <p className="text-sm text-ink-400 mb-3">文昌位主学业、考试、事业，适合设书房或书桌：</p>
                    <ul className="space-y-2">
                      <li className="text-sm text-ink-300 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span><strong className="text-blue-400">坎宅文昌</strong>：东北方艮位，宜设书桌，摆放文昌塔或四支毛笔</span>
                      </li>
                      <li className="text-sm text-ink-300 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span><strong className="text-blue-400">流年文昌</strong>：2026年流年文昌在正东方，可在此方位加强文昌气场</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 八宅吉凶方位 */}
                <div className="card p-5">
                  <h3 className="font-bold text-ink-100 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-400" />
                    八宅吉凶方位详解
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    {[
                      { pos: '西北', star: '六煞', level: '凶' },
                      { pos: '正北', star: '伏位', level: '吉' },
                      { pos: '东北', star: '五鬼', level: '凶' },
                      { pos: '正西', star: '祸害', level: '凶' },
                      { pos: '中宫', star: '—', level: '' },
                      { pos: '正东', star: '延年', level: '吉' },
                      { pos: '西南', star: '绝命', level: '凶' },
                      { pos: '正南', star: '天医', level: '吉' },
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
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <h4 className="text-sm font-bold text-green-400 mb-2">四吉方</h4>
                      <ul className="space-y-1 text-xs text-ink-400">
                        <li>• 生气（东南）：旺丁旺财，大吉</li>
                        <li>• 延年（正东）：旺姻缘人缘</li>
                        <li>• 天医（正南）：主健康长寿</li>
                        <li>• 伏位（正北）：主安稳平和</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <h4 className="text-sm font-bold text-red-400 mb-2">四凶方</h4>
                      <ul className="space-y-1 text-xs text-ink-400">
                        <li>• 绝命（西南）：大凶，主破财疾病</li>
                        <li>• 五鬼（东北）：主官非贼劫</li>
                        <li>• 六煞（西北）：主口舌是非</li>
                        <li>• 祸害（正西）：主灾祸损伤</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 凶位化解方案 */}
                <div className="card p-5">
                  <h3 className="font-bold text-amber-400 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    凶位化解方案
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="font-medium text-amber-400 text-sm mb-2">西北六煞位化解</div>
                      <div className="space-y-1 text-sm text-ink-400">
                        <p>1. 西北方位不宜设厨房或卫生间，如已设需挂铜葫芦化解</p>
                        <p>2. 可在西北方摆放金属摆件（铜麒麟、铜葫芦）泄土生金</p>
                        <p>3. 保持西北方位整洁明亮，避免堆放杂物</p>
                      </div>
                    </div>
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="font-medium text-amber-400 text-sm mb-2">东北五鬼位化解</div>
                      <div className="space-y-1 text-sm text-ink-400">
                        <p>1. 东北方忌设主卧，如已设需在床头放五帝钱化解</p>
                        <p>2. 可摆放陶瓷制品（陶瓷葫芦、陶瓷花瓶）化解火土煞气</p>
                        <p>3. 避免在东北方放置过多红色物品</p>
                      </div>
                    </div>
                    <div className="p-3 bg-dark-300/50 rounded-lg">
                      <div className="font-medium text-amber-400 text-sm mb-2">西南绝命位化解</div>
                      <div className="space-y-1 text-sm text-ink-400">
                        <p>1. 西南方忌设大门、主卧，如已设需调整或长期挂葫芦</p>
                        <p>2. 可摆放水晶簇或白水晶球化解金土相战</p>
                        <p>3. 保持西南方通风干燥，避免潮湿积水</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dark-200">
                  <span className="text-xs text-ink-500">以上为会员专享完整报告</span>
                  <button onClick={() => setShowDetail(false)} className="text-xs text-primary-600 hover:underline">
                    收起完整内容
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
