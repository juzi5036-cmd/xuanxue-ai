// ============================================================
// 起名系统核心数据文件
// 包含：起名用字库、名字生成函数、起名知识、店铺起名数据
// ============================================================

// ------------------------------------------------------------
// 1. 起名用字库 - 按五行分类
// 每个字包含：字、五行、康熙笔画、寓意分类、寓意说明、性别倾向
// ------------------------------------------------------------
export const NAMING_CHARS = {
  // ========== 金属性 ==========
  jin: [
    // 钅字旁
    { char: '鑫', wuxing: '金', strokes: 24, category: ['财运', '事业'], meaning: '三金叠立，多金多福，兴旺发达', gender: 'neutral' },
    { char: '铭', wuxing: '金', strokes: 14, category: ['才华', '品德'], meaning: '铭记不忘，才华横溢，德高望重', gender: 'neutral' },
    { char: '锋', wuxing: '金', strokes: 15, category: ['才华', '事业'], meaning: '锋芒毕露，锐意进取，事业有成', gender: 'male' },
    { char: '锐', wuxing: '金', strokes: 15, category: ['智慧', '事业'], meaning: '敏锐聪慧，勇往直前，势如破竹', gender: 'male' },
    { char: '锦', wuxing: '金', strokes: 16, category: ['财运', '美貌'], meaning: '锦绣前程，锦衣玉食，前程似锦', gender: 'neutral' },
    { char: '钰', wuxing: '金', strokes: 13, category: ['财运', '美貌'], meaning: '珍宝美玉，富贵吉祥，温润如玉', gender: 'female' },
    { char: '铃', wuxing: '金', strokes: 13, category: ['才华', '美貌'], meaning: '铃音悦耳，聪明伶俐，活泼可爱', gender: 'female' },
    { char: '银', wuxing: '金', strokes: 14, category: ['财运', '品德'], meaning: '金银满仓，纯洁高贵，品德高尚', gender: 'neutral' },
    { char: '钦', wuxing: '金', strokes: 12, category: ['品德', '事业'], meaning: '钦佩敬仰，德高望重，受人尊敬', gender: 'male' },
    { char: '钧', wuxing: '金', strokes: 12, category: ['事业', '地位'], meaning: '千钧之力，稳重可靠，位高权重', gender: 'male' },
    { char: '铠', wuxing: '金', strokes: 18, category: ['健康', '事业'], meaning: '铠甲护身，坚强勇敢，战无不胜', gender: 'male' },
    { char: '铄', wuxing: '金', strokes: 23, category: ['才华', '事业'], meaning: '铄石流金，光彩夺目，才华出众', gender: 'male' },
    { char: '铉', wuxing: '金', strokes: 13, category: ['才华', '事业'], meaning: '铉台重臣，栋梁之才，国家栋梁', gender: 'male' },
    { char: '铮', wuxing: '金', strokes: 16, category: ['才华', '品德'], meaning: '铮铮铁骨，刚正不阿，才华出众', gender: 'male' },
    { char: '钢', wuxing: '金', strokes: 16, category: ['健康', '意志'], meaning: '钢铁意志，坚强不屈，百折不挠', gender: 'male' },
    { char: '铜', wuxing: '金', strokes: 14, category: ['财运', '健康'], meaning: '铜墙铁壁，坚固耐用，财运亨通', gender: 'neutral' },
    { char: '锡', wuxing: '金', strokes: 16, category: ['财运', '智慧'], meaning: '天赐良缘，锡福绵长，聪明睿智', gender: 'neutral' },
    { char: '钟', wuxing: '金', strokes: 17, category: ['才华', '事业'], meaning: '钟灵毓秀，钟情专一，才华出众', gender: 'male' },
    { char: '钱', wuxing: '金', strokes: 16, category: ['财运', '事业'], meaning: '财源广进，金钱满屋，富贵荣华', gender: 'neutral' },
    { char: '铖', wuxing: '金', strokes: 14, category: ['事业', '品德'], meaning: '兵器之锐，勇猛精进，品德端正', gender: 'male' },
    { char: '铨', wuxing: '金', strokes: 14, category: ['品德', '事业'], meaning: '铨选贤能，公正廉明，德才兼备', gender: 'male' },
    { char: '铧', wuxing: '金', strokes: 20, category: ['事业', '才华'], meaning: '犁铧开拓，勇于创新，事业有成', gender: 'male' },
    { char: '键', wuxing: '金', strokes: 17, category: ['事业', '智慧'], meaning: '关键核心，举足轻重，智慧过人', gender: 'male' },
    { char: '镇', wuxing: '金', strokes: 18, category: ['稳重', '事业'], meaning: '镇定自若，稳如泰山，镇守一方', gender: 'male' },
    { char: '镌', wuxing: '金', strokes: 21, category: ['才华', '艺术'], meaning: '镌刻铭记，技艺精湛，才华横溢', gender: 'male' },
    { char: '镜', wuxing: '金', strokes: 19, category: ['智慧', '美貌'], meaning: '明镜高悬，明察秋毫，貌美如花', gender: 'neutral' },
    { char: '镁', wuxing: '金', strokes: 17, category: ['美貌', '健康'], meaning: '美丽动人，光彩照人，健康活力', gender: 'female' },
    { char: '镶', wuxing: '金', strokes: 25, category: ['美貌', '财运'], meaning: '镶金嵌玉，华贵美丽，富贵满堂', gender: 'female' },
    { char: '镛', wuxing: '金', strokes: 19, category: ['品德', '事业'], meaning: '大钟之声，声名远播，品德高尚', gender: 'male' },
    { char: '铿', wuxing: '金', strokes: 19, category: ['才华', '品德'], meaning: '铿锵有力，掷地有声，才华出众', gender: 'male' },
    // 玉/王字旁（属金）
    { char: '瑞', wuxing: '金', strokes: 14, category: ['吉祥', '财运'], meaning: '瑞气祥云，吉祥如意，福寿安康', gender: 'neutral' },
    { char: '瑜', wuxing: '金', strokes: 14, category: ['美貌', '品德'], meaning: '美玉无瑕，品德高尚，温婉贤淑', gender: 'female' },
    { char: '瑾', wuxing: '金', strokes: 16, category: ['美貌', '品德'], meaning: '怀瑾握瑜，品德高洁，美丽动人', gender: 'female' },
    { char: '瑶', wuxing: '金', strokes: 15, category: ['美貌', '吉祥'], meaning: '瑶池仙境，美丽高贵，吉祥如意', gender: 'female' },
    { char: '璇', wuxing: '金', strokes: 16, category: ['美貌', '智慧'], meaning: '璇玑美玉，聪明美丽，高贵典雅', gender: 'female' },
    { char: '琪', wuxing: '金', strokes: 13, category: ['美貌', '吉祥'], meaning: '琪花瑶草，美丽珍贵，吉祥如意', gender: 'neutral' },
    { char: '琳', wuxing: '金', strokes: 13, category: ['美貌', '品德'], meaning: '琳琅满目，美玉天成，品德高尚', gender: 'female' },
    { char: '瑛', wuxing: '金', strokes: 14, category: ['美貌', '吉祥'], meaning: '玉之光彩，美丽动人，吉祥如意', gender: 'female' },
    { char: '玮', wuxing: '金', strokes: 14, category: ['品德', '事业'], meaning: '珍奇美玉，品德出众，事业有成', gender: 'male' },
    { char: '珍', wuxing: '金', strokes: 10, category: ['美貌', '财运'], meaning: '珍贵稀有，珍爱一生，富贵吉祥', gender: 'female' },
    { char: '珠', wuxing: '金', strokes: 11, category: ['美貌', '财运'], meaning: '掌上明珠，珠光宝气，珍贵无比', gender: 'female' },
    { char: '珊', wuxing: '金', strokes: 10, category: ['美貌', '气质'], meaning: '珊瑚玉树，美丽多姿，气质高雅', gender: 'female' },
    { char: '琛', wuxing: '金', strokes: 13, category: ['财运', '吉祥'], meaning: '珍宝美玉，富贵吉祥，前程似锦', gender: 'male' },
    { char: '琬', wuxing: '金', strokes: 13, category: ['美貌', '品德'], meaning: '琬圭美玉，温婉贤淑，品德高洁', gender: 'female' },
    { char: '琰', wuxing: '金', strokes: 13, category: ['美貌', '热情'], meaning: '美玉生辉，光彩照人，热情开朗', gender: 'female' },
    { char: '璐', wuxing: '金', strokes: 18, category: ['美貌', '财运'], meaning: '美玉无瑕，富贵荣华，美丽动人', gender: 'female' },
    { char: '琅', wuxing: '金', strokes: 12, category: ['才华', '品德'], meaning: '琅琅上口，才华出众，品德高尚', gender: 'male' },
    { char: '璧', wuxing: '金', strokes: 18, category: ['品德', '吉祥'], meaning: '完璧归赵，品德完美，吉祥如意', gender: 'neutral' },
    { char: '环', wuxing: '金', strokes: 18, category: ['吉祥', '圆满'], meaning: '环环相扣，圆满如意，福寿绵长', gender: 'neutral' },
    { char: '珀', wuxing: '金', strokes: 10, category: ['美貌', '吉祥'], meaning: '琥珀珍贵，美丽稀有，吉祥如意', gender: 'neutral' },
    { char: '琮', wuxing: '金', strokes: 13, category: ['品德', '吉祥'], meaning: '玉琮礼器，品德端正，吉祥富贵', gender: 'neutral' },
    // 刀/戈/斤/白字旁（属金）
    { char: '刚', wuxing: '金', strokes: 10, category: ['意志', '事业'], meaning: '刚正不阿，坚强果断，事业有成', gender: 'male' },
    { char: '剑', wuxing: '金', strokes: 15, category: ['勇气', '事业'], meaning: '剑胆琴心，英勇无畏，事业辉煌', gender: 'male' },
    { char: '初', wuxing: '金', strokes: 8, category: ['希望', '开始'], meaning: '初心不改，朝气蓬勃，充满希望', gender: 'neutral' },
    { char: '利', wuxing: '金', strokes: 7, category: ['财运', '事业'], meaning: '利路亨通，顺利如意，事业有成', gender: 'male' },
    { char: '秋', wuxing: '金', strokes: 9, category: ['成熟', '智慧'], meaning: '秋高气爽，成熟稳重，硕果累累', gender: 'neutral' },
    { char: '白', wuxing: '金', strokes: 5, category: ['纯洁', '美貌'], meaning: '洁白无瑕，纯洁高尚，美丽动人', gender: 'neutral' },
    { char: '皓', wuxing: '金', strokes: 12, category: ['光明', '品德'], meaning: '皓月当空，光明磊落，品德高尚', gender: 'male' },
    { char: '皎', wuxing: '金', strokes: 11, category: ['美貌', '纯洁'], meaning: '皎皎明月，美丽纯洁，温婉动人', gender: 'female' },
    { char: '庚', wuxing: '金', strokes: 8, category: ['事业', '地位'], meaning: '庚星高照，事业有成，地位尊贵', gender: 'male' },
    { char: '辞', wuxing: '金', strokes: 19, category: ['文才', '品德'], meaning: '辞章华美，文才出众，品德高尚', gender: 'male' },
    { char: '刻', wuxing: '金', strokes: 8, category: ['努力', '意志'], meaning: '刻苦努力，精益求精，意志坚定', gender: 'male' },
    { char: '剀', wuxing: '金', strokes: 12, category: ['正直', '事业'], meaning: '剀切正直，公正廉明，事业顺利', gender: 'male' },
    { char: '钦', wuxing: '金', strokes: 12, category: ['品德', '尊敬'], meaning: '令人钦佩，德高望重，受人敬仰', gender: 'male' },
  ],

  // ========== 木属性 ==========
  mu: [
    // 木字旁
    { char: '林', wuxing: '木', strokes: 8, category: ['事业', '健康'], meaning: '林木茂盛，生机勃勃，事业兴旺', gender: 'neutral' },
    { char: '森', wuxing: '木', strokes: 12, category: ['事业', '财运'], meaning: '森林浩瀚，财源茂盛，事业辉煌', gender: 'male' },
    { char: '松', wuxing: '木', strokes: 18, category: ['健康', '长寿'], meaning: '松柏常青，健康长寿，坚韧不拔', gender: 'male' },
    { char: '柏', wuxing: '木', strokes: 10, category: ['健康', '品德'], meaning: '柏树常青，品德高尚，健康长寿', gender: 'male' },
    { char: '桐', wuxing: '木', strokes: 10, category: ['才华', '事业'], meaning: '梧桐引凤，才华出众，事业有成', gender: 'neutral' },
    { char: '柳', wuxing: '木', strokes: 9, category: ['美貌', '温柔'], meaning: '柳弱花娇，温柔美丽，婀娜多姿', gender: 'female' },
    { char: '桃', wuxing: '木', strokes: 10, category: ['美貌', '吉祥'], meaning: '桃李满天下，美貌如花，吉祥如意', gender: 'female' },
    { char: '梅', wuxing: '木', strokes: 11, category: ['品德', '坚强'], meaning: '梅花傲雪，品德高洁，坚强不屈', gender: 'female' },
    { char: '兰', wuxing: '木', strokes: 23, category: ['品德', '美貌'], meaning: '兰心蕙质，品德高尚，美丽优雅', gender: 'female' },
    { char: '竹', wuxing: '木', strokes: 6, category: ['品德', '事业'], meaning: '竹报平安，高风亮节，事业有成', gender: 'neutral' },
    { char: '桂', wuxing: '木', strokes: 10, category: ['财运', '事业'], meaning: '桂子飘香，富贵荣华，事业有成', gender: 'neutral' },
    { char: '樱', wuxing: '木', strokes: 21, category: ['美貌', '浪漫'], meaning: '樱花烂漫，美丽动人，浪漫多情', gender: 'female' },
    { char: '梓', wuxing: '木', strokes: 11, category: ['事业', '家乡'], meaning: '梓里桑梓，事业有成，不忘故乡', gender: 'neutral' },
    { char: '楠', wuxing: '木', strokes: 13, category: ['事业', '珍贵'], meaning: '楠木珍贵，栋梁之才，事业辉煌', gender: 'neutral' },
    { char: '楷', wuxing: '木', strokes: 13, category: ['品德', '榜样'], meaning: '楷模典范，品德高尚，为人表率', gender: 'male' },
    { char: '槿', wuxing: '木', strokes: 15, category: ['美貌', '热情'], meaning: '木槿花开，美丽热情，朝气蓬勃', gender: 'female' },
    { char: '樱', wuxing: '木', strokes: 21, category: ['美貌', '纯洁'], meaning: '樱花纯洁，美丽动人，浪漫唯美', gender: 'female' },
    { char: '枫', wuxing: '木', strokes: 13, category: ['事业', '热情'], meaning: '枫叶红火，事业红火，热情洋溢', gender: 'neutral' },
    { char: '桓', wuxing: '木', strokes: 10, category: ['事业', '威武'], meaning: '盘桓威武，事业有成，威风凛凛', gender: 'male' },
    { char: '权', wuxing: '木', strokes: 22, category: ['事业', '地位'], meaning: '权势显赫，地位尊贵，事业辉煌', gender: 'male' },
    { char: '材', wuxing: '木', strokes: 7, category: ['才华', '事业'], meaning: '栋梁之材，才华出众，事业有成', gender: 'male' },
    { char: '村', wuxing: '木', strokes: 7, category: ['朴实', '健康'], meaning: '朴实无华，健康自然，踏实稳重', gender: 'neutral' },
    { char: '杉', wuxing: '木', strokes: 7, category: ['健康', '挺拔'], meaning: '杉木挺拔，健康向上，高大威猛', gender: 'male' },
    { char: '杞', wuxing: '木', strokes: 7, category: ['健康', '吉祥'], meaning: '枸杞养生，健康长寿，吉祥如意', gender: 'neutral' },
    { char: '杰', wuxing: '木', strokes: 12, category: ['才华', '事业'], meaning: '英雄豪杰，才华出众，事业辉煌', gender: 'male' },
    { char: '荣', wuxing: '木', strokes: 14, category: ['事业', '荣誉'], meaning: '荣华富贵，荣誉加身，事业有成', gender: 'neutral' },
    { char: '栋', wuxing: '木', strokes: 12, category: ['事业', '才华'], meaning: '栋梁之才，国家栋梁，事业有成', gender: 'male' },
    { char: '柱', wuxing: '木', strokes: 9, category: ['事业', '稳重'], meaning: '中流砥柱，稳重可靠，事业有成', gender: 'male' },
    { char: '树', wuxing: '木', strokes: 16, category: ['事业', '健康'], meaning: '十年树木，事业有成，健康成长', gender: 'male' },
    { char: '桥', wuxing: '木', strokes: 16, category: ['事业', '沟通'], meaning: '桥梁纽带，沟通顺畅，事业顺利', gender: 'neutral' },
    { char: '梁', wuxing: '木', strokes: 11, category: ['事业', '才华'], meaning: '栋梁之材，才华横溢，事业有成', gender: 'male' },
    { char: '根', wuxing: '木', strokes: 10, category: ['稳重', '家族'], meaning: '根深蒂固，基础稳固，家族兴旺', gender: 'male' },
    { char: '枝', wuxing: '木', strokes: 8, category: ['美貌', '发展'], meaning: '金枝玉叶，美丽高贵，蓬勃发展', gender: 'female' },
    { char: '栩', wuxing: '木', strokes: 10, category: ['生动', '才华'], meaning: '栩栩如生，生动活泼，才华出众', gender: 'neutral' },
    { char: '彬', wuxing: '木', strokes: 11, category: ['文才', '品德'], meaning: '文质彬彬，温文尔雅，品德高尚', gender: 'male' },
    { char: '梦', wuxing: '木', strokes: 14, category: ['梦想', '美好'], meaning: '梦想成真，美好向往，前程似锦', gender: 'female' },
    { char: '楚', wuxing: '木', strokes: 13, category: ['才华', '清晰'], meaning: '楚楚动人，才华出众，清晰明了', gender: 'neutral' },
    { char: '榆', wuxing: '木', strokes: 13, category: ['财运', '健康'], meaning: '榆树富贵，财运亨通，健康长寿', gender: 'neutral' },
    { char: '榕', wuxing: '木', strokes: 14, category: ['事业', '包容'], meaning: '榕树成荫，事业兴旺，胸怀宽广', gender: 'neutral' },
    { char: '榛', wuxing: '木', strokes: 14, category: ['健康', '自然'], meaning: '榛榛勃勃，健康自然，充满活力', gender: 'neutral' },
    { char: '樱', wuxing: '木', strokes: 21, category: ['美貌', '浪漫'], meaning: '樱花烂漫，美丽动人，浪漫多情', gender: 'female' },
    { char: '檬', wuxing: '木', strokes: 18, category: ['健康', '清新'], meaning: '柠檬清新，健康活力，清爽宜人', gender: 'female' },
    { char: '欗', wuxing: '木', strokes: 24, category: ['美貌', '高贵'], meaning: '兰桂齐芳，美丽高贵，品德高尚', gender: 'female' },
    // 艹字头（属木）
    { char: '芳', wuxing: '木', strokes: 10, category: ['美貌', '品德'], meaning: '芬芳四溢，美丽动人，品德高尚', gender: 'female' },
    { char: '草', wuxing: '木', strokes: 12, category: ['健康', '坚韧'], meaning: '草木旺盛，坚韧不拔，健康成长', gender: 'neutral' },
    { char: '花', wuxing: '木', strokes: 10, category: ['美貌', '吉祥'], meaning: '花好月圆，美丽如花，吉祥如意', gender: 'female' },
    { char: '萍', wuxing: '木', strokes: 14, category: ['美貌', '自由'], meaning: '萍水相逢，美丽自由，随遇而安', gender: 'female' },
    { char: '莹', wuxing: '木', strokes: 15, category: ['美貌', '纯洁'], meaning: '晶莹剔透，纯洁美丽，光彩照人', gender: 'female' },
    { char: '萱', wuxing: '木', strokes: 15, category: ['母爱', '健康'], meaning: '萱草忘忧，母爱伟大，健康快乐', gender: 'female' },
    { char: '菲', wuxing: '木', strokes: 14, category: ['美貌', '芬芳'], meaning: '芳菲四溢，美丽动人，香气扑鼻', gender: 'female' },
    { char: '萌', wuxing: '木', strokes: 14, category: ['可爱', '希望'], meaning: '萌芽生长，可爱动人，充满希望', gender: 'female' },
    { char: '蕾', wuxing: '木', strokes: 19, category: ['美貌', '希望'], meaning: '含苞待放，美丽期待，充满希望', gender: 'female' },
    { char: '蕊', wuxing: '木', strokes: 18, category: ['美貌', '娇嫩'], meaning: '花蕊娇嫩，美丽动人，温婉可爱', gender: 'female' },
    { char: '薇', wuxing: '木', strokes: 19, category: ['美貌', '坚强'], meaning: '蔷薇美丽，坚强独立，气质高雅', gender: 'female' },
    { char: '艺', wuxing: '木', strokes: 21, category: ['才华', '艺术'], meaning: '才艺双全，艺术天赋，才华出众', gender: 'neutral' },
    { char: '茂', wuxing: '木', strokes: 11, category: ['事业', '健康'], meaning: '茂盛繁荣，事业兴旺，健康成长', gender: 'male' },
    { char: '英', wuxing: '木', strokes: 11, category: ['才华', '美貌'], meaning: '英雄豪杰，英姿飒爽，才华出众', gender: 'neutral' },
    { char: '莹', wuxing: '木', strokes: 15, category: ['美貌', '纯洁'], meaning: '晶莹剔透，纯洁美丽，光彩照人', gender: 'female' },
    { char: '蔼', wuxing: '木', strokes: 22, category: ['品德', '温和'], meaning: '和蔼可亲，品德高尚，温和善良', gender: 'neutral' },
  ],

  // ========== 水属性 ==========
  shui: [
    // 氵/水字旁
    { char: '清', wuxing: '水', strokes: 12, category: ['纯洁', '品德'], meaning: '清风明月，纯洁高尚，品德清廉', gender: 'neutral' },
    { char: '海', wuxing: '水', strokes: 11, category: ['胸怀', '事业'], meaning: '海纳百川，胸怀宽广，事业宏大', gender: 'male' },
    { char: '洋', wuxing: '水', strokes: 10, category: ['广阔', '事业'], meaning: '洋洋大观，广阔无垠，事业兴旺', gender: 'male' },
    { char: '江', wuxing: '水', strokes: 7, category: ['事业', '才华'], meaning: '江河浩荡，才华横溢，事业有成', gender: 'male' },
    { char: '河', wuxing: '水', strokes: 9, category: ['事业', '财源'], meaning: '河水长流，财源滚滚，事业顺利', gender: 'male' },
    { char: '湖', wuxing: '水', strokes: 13, category: ['胸怀', '稳重'], meaning: '湖水平静，胸怀宽广，稳重踏实', gender: 'neutral' },
    { char: '波', wuxing: '水', strokes: 9, category: ['事业', '活力'], meaning: '波澜壮阔，事业有成，充满活力', gender: 'male' },
    { char: '涛', wuxing: '水', strokes: 18, category: ['事业', '气势'], meaning: '波涛汹涌，气势磅礴，事业辉煌', gender: 'male' },
    { char: '澜', wuxing: '水', strokes: 21, category: ['事业', '气势'], meaning: '力挽狂澜，气势宏大，事业有成', gender: 'male' },
    { char: '浩', wuxing: '水', strokes: 11, category: ['胸怀', '事业'], meaning: '浩然正气，胸怀宽广，事业宏大', gender: 'male' },
    { char: '瀚', wuxing: '水', strokes: 20, category: ['学识', '事业'], meaning: '浩瀚无垠，学识渊博，事业宏大', gender: 'male' },
    { char: '泽', wuxing: '水', strokes: 17, category: ['恩德', '财运'], meaning: '恩泽四方，福泽深厚，财运亨通', gender: 'male' },
    { char: '润', wuxing: '水', strokes: 16, category: ['财运', '健康'], meaning: '润物无声，滋润万物，财运亨通', gender: 'neutral' },
    { char: '涵', wuxing: '水', strokes: 12, category: ['修养', '胸怀'], meaning: '涵养深厚，内涵丰富，胸怀宽广', gender: 'neutral' },
    { char: '滢', wuxing: '水', strokes: 19, category: ['美貌', '纯洁'], meaning: '清澈晶莹，美丽纯洁，温婉动人', gender: 'female' },
    { char: '洁', wuxing: '水', strokes: 10, category: ['纯洁', '品德'], meaning: '洁白无瑕，品德高尚，纯洁善良', gender: 'female' },
    { char: '冰', wuxing: '水', strokes: 6, category: ['纯洁', '美貌'], meaning: '冰清玉洁，美丽纯洁，高贵典雅', gender: 'female' },
    { char: '雪', wuxing: '水', strokes: 11, category: ['纯洁', '美貌'], meaning: '白雪皑皑，纯洁美丽，高贵典雅', gender: 'female' },
    { char: '露', wuxing: '水', strokes: 21, category: ['美貌', '滋润'], meaning: '晨露晶莹，美丽动人，滋润万物', gender: 'female' },
    { char: '霜', wuxing: '水', strokes: 17, category: ['美貌', '高洁'], meaning: '霜雪高洁，美丽冷艳，品德高尚', gender: 'female' },
    { char: '雨', wuxing: '水', strokes: 8, category: ['滋润', '吉祥'], meaning: '雨露滋润，吉祥如意，生机盎然', gender: 'neutral' },
    { char: '雷', wuxing: '水', strokes: 13, category: ['气势', '事业'], meaning: '雷霆万钧，气势磅礴，事业有成', gender: 'male' },
    { char: '雯', wuxing: '水', strokes: 12, category: ['美貌', '吉祥'], meaning: '彩云美丽，吉祥如意，温婉动人', gender: 'female' },
    { char: '霞', wuxing: '水', strokes: 17, category: ['美貌', '光彩'], meaning: '彩霞满天，美丽动人，光彩照人', gender: 'female' },
    { char: '霖', wuxing: '水', strokes: 16, category: ['恩泽', '事业'], meaning: '甘霖普降，恩泽四方，事业有成', gender: 'male' },
    { char: '震', wuxing: '水', strokes: 15, category: ['气势', '事业'], meaning: '威震四方，声势浩大，事业辉煌', gender: 'male' },
    { char: '霄', wuxing: '水', strokes: 15, category: ['志向', '事业'], meaning: '直冲云霄，志向高远，事业有成', gender: 'male' },
    { char: '霆', wuxing: '水', strokes: 15, category: ['气势', '事业'], meaning: '雷霆万钧，气势磅礴，事业有成', gender: 'male' },
    { char: '泉', wuxing: '水', strokes: 9, category: ['财运', '健康'], meaning: '泉水叮咚，财源滚滚，健康活力', gender: 'neutral' },
    { char: '溪', wuxing: '水', strokes: 14, category: ['才华', '灵动'], meaning: '溪水潺潺，灵动聪慧，才华出众', gender: 'female' },
    { char: '沐', wuxing: '水', strokes: 8, category: ['健康', '滋润'], meaning: '沐浴春风，健康滋润，神清气爽', gender: 'neutral' },
    { char: '沛', wuxing: '水', strokes: 8, category: ['事业', '充沛'], meaning: '精力充沛，事业兴旺，充满活力', gender: 'male' },
    { char: '汶', wuxing: '水', strokes: 8, category: ['才华', '文化'], meaning: '汶水悠悠，才华横溢，文化底蕴深厚', gender: 'neutral' },
    { char: '沁', wuxing: '水', strokes: 8, category: ['美貌', '清新'], meaning: '沁人心脾，清新美丽，令人愉悦', gender: 'female' },
    { char: '沂', wuxing: '水', strokes: 8, category: ['品德', '吉祥'], meaning: '沂水春风，品德高尚，吉祥如意', gender: 'neutral' },
    { char: '沅', wuxing: '水', strokes: 8, category: ['才华', '事业'], meaning: '沅水汤汤，才华出众，事业有成', gender: 'neutral' },
    { char: '沫', wuxing: '水', strokes: 9, category: ['美貌', '灵动'], meaning: '泡沫轻盈，美丽灵动，可爱动人', gender: 'female' },
    { char: '泓', wuxing: '水', strokes: 9, category: ['胸怀', '智慧'], meaning: '一泓清泉，胸怀宽广，智慧深邃', gender: 'male' },
    { char: '沼', wuxing: '水', strokes: 9, category: ['财运', '积聚'], meaning: '池沼聚财，财运积聚，富贵吉祥', gender: 'neutral' },
    { char: '泰', wuxing: '水', strokes: 9, category: ['吉祥', '平安'], meaning: '国泰民安，吉祥如意，平安顺遂', gender: 'male' },
    { char: '洲', wuxing: '水', strokes: 10, category: ['事业', '广阔'], meaning: '五洲四海，事业广阔，前途无量', gender: 'male' },
    { char: '洵', wuxing: '水', strokes: 10, category: ['诚实', '品德'], meaning: '洵美且异，诚实可信，品德高尚', gender: 'neutral' },
    { char: '洛', wuxing: '水', strokes: 10, category: ['才华', '文化'], meaning: '洛水之滨，才华横溢，文化昌盛', gender: 'neutral' },
    { char: '津', wuxing: '水', strokes: 10, category: ['财运', '渡口'], meaning: '津梁渡口，财运亨通，事业顺利', gender: 'neutral' },
    { char: '涛', wuxing: '水', strokes: 18, category: ['事业', '气势'], meaning: '波涛汹涌，气势磅礴，事业辉煌', gender: 'male' },
    { char: '淇', wuxing: '水', strokes: 12, category: ['美貌', '温柔'], meaning: '淇水悠悠，温柔美丽，温婉贤淑', gender: 'female' },
    { char: '淑', wuxing: '水', strokes: 12, category: ['品德', '美貌'], meaning: '淑女贤淑，品德高尚，美丽端庄', gender: 'female' },
    { char: '渊', wuxing: '水', strokes: 12, category: ['学识', '深邃'], meaning: '学识渊博，深邃睿智，才华出众', gender: 'male' },
    { char: '淼', wuxing: '水', strokes: 12, category: ['事业', '广阔'], meaning: '水势浩大，事业广阔，前途无量', gender: 'male' },
    { char: '涯', wuxing: '水', strokes: 12, category: ['志向', '广阔'], meaning: '天涯海角，志向远大，广阔无垠', gender: 'neutral' },
    { char: '渡', wuxing: '水', strokes: 13, category: ['事业', '过渡'], meaning: '渡过难关，事业顺利，前程似锦', gender: 'neutral' },
    { char: '渝', wuxing: '水', strokes: 13, category: ['坚持', '爱情'], meaning: '矢志不渝，忠贞不二，坚持到底', gender: 'neutral' },
    { char: '温', wuxing: '水', strokes: 14, category: ['温柔', '品德'], meaning: '温文尔雅，温柔善良，品德高尚', gender: 'neutral' },
    { char: '源', wuxing: '水', strokes: 14, category: ['财运', '根源'], meaning: '源远流长，财源滚滚，根基深厚', gender: 'neutral' },
    { char: '溢', wuxing: '水', strokes: 14, category: ['财运', '才华'], meaning: '才华横溢，财运充溢，富贵吉祥', gender: 'neutral' },
    { char: '漫', wuxing: '水', strokes: 15, category: ['广阔', '自由'], meaning: '漫无边际，自由奔放，广阔无垠', gender: 'female' },
    { char: '漪', wuxing: '水', strokes: 15, category: ['美貌', '温柔'], meaning: '涟漪荡漾，美丽温柔，温婉动人', gender: 'female' },
    { char: '漾', wuxing: '水', strokes: 15, category: ['美貌', '灵动'], meaning: '碧波荡漾，美丽灵动，充满活力', gender: 'female' },
    { char: '潜', wuxing: '水', strokes: 16, category: ['智慧', '深沉'], meaning: '潜心钻研，智慧深沉，厚积薄发', gender: 'male' },
    { char: '潮', wuxing: '水', strokes: 16, category: ['事业', '潮流'], meaning: '思潮澎湃，事业兴旺，引领潮流', gender: 'male' },
    { char: '澳', wuxing: '水', strokes: 17, category: ['财运', '港湾'], meaning: '港湾停靠，财运安稳，事业稳定', gender: 'neutral' },
    // 雨字头
    { char: '云', wuxing: '水', strokes: 12, category: ['自由', '志向'], meaning: '云淡风轻，自由奔放，志向高远', gender: 'neutral' },
    { char: '霁', wuxing: '水', strokes: 22, category: ['开朗', '吉祥'], meaning: '雨过天晴，开朗乐观，吉祥如意', gender: 'neutral' },
  ],

  // ========== 火属性 ==========
  huo: [
    // 火/灬字旁
    { char: '炎', wuxing: '火', strokes: 8, category: ['热情', '事业'], meaning: '炎热旺盛，热情似火，事业兴旺', gender: 'male' },
    { char: '焱', wuxing: '火', strokes: 12, category: ['热情', '财运'], meaning: '三火叠立，热情洋溢，财运旺盛', gender: 'male' },
    { char: '明', wuxing: '火', strokes: 8, category: ['智慧', '光明'], meaning: '光明磊落，聪明睿智，前途光明', gender: 'neutral' },
    { char: '辉', wuxing: '火', strokes: 15, category: ['事业', '光彩'], meaning: '辉煌灿烂，事业有成，光彩照人', gender: 'male' },
    { char: '光', wuxing: '火', strokes: 6, category: ['光明', '事业'], meaning: '光明正大，前途光明，事业有成', gender: 'male' },
    { char: '耀', wuxing: '火', strokes: 20, category: ['事业', '光彩'], meaning: '光宗耀祖，光彩夺目，事业辉煌', gender: 'male' },
    { char: '灿', wuxing: '火', strokes: 17, category: ['美貌', '光彩'], meaning: '灿烂辉煌，美丽动人，光彩照人', gender: 'neutral' },
    { char: '烂', wuxing: '火', strokes: 21, category: ['事业', '光彩'], meaning: '灿烂光明，事业有成，前途光明', gender: 'neutral' },
    { char: '灵', wuxing: '火', strokes: 24, category: ['智慧', '灵气'], meaning: '灵秀聪慧，灵气逼人，聪明伶俐', gender: 'female' },
    { char: '灼', wuxing: '火', strokes: 7, category: ['热情', '才华'], meaning: '灼灼其华，热情洋溢，才华出众', gender: 'neutral' },
    { char: '炜', wuxing: '火', strokes: 13, category: ['事业', '光明'], meaning: '炜烨光明，事业有成，前途光明', gender: 'male' },
    { char: '炬', wuxing: '火', strokes: 9, category: ['事业', '光明'], meaning: '火炬照亮，事业光明，引领方向', gender: 'male' },
    { char: '炳', wuxing: '火', strokes: 9, category: ['事业', '光明'], meaning: '炳烛之明，事业辉煌，光明磊落', gender: 'male' },
    { char: '炫', wuxing: '火', strokes: 9, category: ['美貌', '光彩'], meaning: '炫彩夺目，美丽动人，光彩照人', gender: 'neutral' },
    { char: '烁', wuxing: '火', strokes: 19, category: ['光彩', '才华'], meaning: '闪烁发光，才华出众，光彩照人', gender: 'neutral' },
    { char: '煜', wuxing: '火', strokes: 13, category: ['光明', '事业'], meaning: '煜煜生辉，光明灿烂，事业有成', gender: 'male' },
    { char: '煦', wuxing: '火', strokes: 13, category: ['温暖', '品德'], meaning: '春风和煦，温暖善良，品德高尚', gender: 'male' },
    { char: '煌', wuxing: '火', strokes: 13, category: ['事业', '辉煌'], meaning: '金碧辉煌，事业辉煌，成就卓越', gender: 'male' },
    { char: '烨', wuxing: '火', strokes: 14, category: ['事业', '光彩'], meaning: '烨烨生辉，光彩照人，事业有成', gender: 'male' },
    { char: '熔', wuxing: '火', strokes: 14, category: ['坚韧', '事业'], meaning: '熔铸坚韧，百炼成钢，事业有成', gender: 'neutral' },
    { char: '熙', wuxing: '火', strokes: 13, category: ['吉祥', '光明'], meaning: '熙熙攘攘，吉祥如意，光明美好', gender: 'neutral' },
    { char: '熹', wuxing: '火', strokes: 16, category: ['光明', '希望'], meaning: '晨光熹微，充满希望，前途光明', gender: 'neutral' },
    { char: '熠', wuxing: '火', strokes: 15, category: ['光彩', '才华'], meaning: '熠熠生辉，光彩夺目，才华出众', gender: 'neutral' },
    { char: '燃', wuxing: '火', strokes: 16, category: ['热情', '事业'], meaning: '燃烧激情，热情似火，事业兴旺', gender: 'male' },
    { char: '燚', wuxing: '火', strokes: 16, category: ['事业', '旺盛'], meaning: '四火叠立，事业旺盛，红红火火', gender: 'male' },
    { char: '焰', wuxing: '火', strokes: 12, category: ['热情', '事业'], meaning: '火焰熊熊，热情高涨，事业兴旺', gender: 'male' },
    { char: '焱', wuxing: '火', strokes: 12, category: ['热情', '财运'], meaning: '三火叠立，热情洋溢，财运旺盛', gender: 'male' },
    { char: '暖', wuxing: '火', strokes: 13, category: ['温暖', '家庭'], meaning: '温暖如春，家庭和睦，幸福美满', gender: 'neutral' },
    { char: '晴', wuxing: '火', strokes: 12, category: ['开朗', '吉祥'], meaning: '晴空万里，开朗乐观，吉祥如意', gender: 'female' },
    { char: '旦', wuxing: '火', strokes: 5, category: ['希望', '开始'], meaning: '元旦曙光，充满希望，朝气蓬勃', gender: 'neutral' },
    { char: '早', wuxing: '火', strokes: 6, category: ['勤奋', '事业'], meaning: '早起勤奋，事业有成，前程似锦', gender: 'neutral' },
    { char: '旭', wuxing: '火', strokes: 6, category: ['希望', '事业'], meaning: '旭日东升，充满希望，事业有成', gender: 'male' },
    { char: '昂', wuxing: '火', strokes: 8, category: ['志向', '事业'], meaning: '斗志昂扬，志向高远，事业有成', gender: 'male' },
    { char: '昊', wuxing: '火', strokes: 8, category: ['广阔', '志向'], meaning: '昊天罔极，广阔无垠，志向远大', gender: 'male' },
    { char: '昕', wuxing: '火', strokes: 8, category: ['希望', '光明'], meaning: '黎明曙光，充满希望，前途光明', gender: 'neutral' },
    { char: '易', wuxing: '火', strokes: 8, category: ['智慧', '变化'], meaning: '易经智慧，聪明睿智，应变能力强', gender: 'neutral' },
    { char: '映', wuxing: '火', strokes: 9, category: ['美貌', '光彩'], meaning: '映照生辉，美丽动人，光彩照人', gender: 'female' },
    { char: '春', wuxing: '火', strokes: 9, category: ['希望', '活力'], meaning: '春暖花开，充满希望，活力四射', gender: 'neutral' },
    { char: '昭', wuxing: '火', strokes: 9, category: ['光明', '品德'], meaning: '昭如日月，光明磊落，品德高尚', gender: 'neutral' },
    { char: '昱', wuxing: '火', strokes: 9, category: ['光明', '事业'], meaning: '日光闪耀，光明灿烂，事业有成', gender: 'male' },
    { char: '晋', wuxing: '火', strokes: 10, category: ['事业', '晋升'], meaning: '晋升有加，事业顺利，步步高升', gender: 'male' },
    { char: '晟', wuxing: '火', strokes: 11, category: ['事业', '光明'], meaning: '光明兴盛，事业兴旺，前途光明', gender: 'male' },
    { char: '晨', wuxing: '火', strokes: 11, category: ['希望', '活力'], meaning: '晨光熹微，充满希望，活力四射', gender: 'neutral' },
    { char: '晶', wuxing: '火', strokes: 12, category: ['美貌', '智慧'], meaning: '晶莹剔透，聪明美丽，纯洁高贵', gender: 'female' },
    { char: '晴', wuxing: '火', strokes: 12, category: ['开朗', '美丽'], meaning: '晴空万里，开朗美丽，心情愉悦', gender: 'female' },
    { char: '景', wuxing: '火', strokes: 12, category: ['事业', '光彩'], meaning: '前程似锦，光景美好，事业有成', gender: 'neutral' },
    { char: '暄', wuxing: '火', strokes: 13, category: ['温暖', '开朗'], meaning: '风和日暄，温暖开朗，乐观向上', gender: 'neutral' },
    { char: '暘', wuxing: '火', strokes: 13, category: ['光明', '事业'], meaning: '日出天晴，光明磊落，事业有成', gender: 'male' },
    { char: '暖', wuxing: '火', strokes: 13, category: ['温暖', '家庭'], meaning: '温暖如春，家庭和睦，幸福美满', gender: 'neutral' },
    { char: '晓', wuxing: '火', strokes: 16, category: ['智慧', '光明'], meaning: '知晓万事，聪明智慧，前途光明', gender: 'neutral' },
    { char: '晔', wuxing: '火', strokes: 16, category: ['光彩', '事业'], meaning: '光彩照人，事业辉煌，前途光明', gender: 'male' },
    { char: '瞳', wuxing: '火', strokes: 17, category: ['美貌', '智慧'], meaning: '眼眸明亮，美丽聪慧，目光如炬', gender: 'female' },
    // 日字旁
    { char: '日', wuxing: '火', strokes: 4, category: ['光明', '阳刚'], meaning: '阳光普照，光明磊落，阳刚之气', gender: 'male' },
    { char: '旨', wuxing: '火', strokes: 6, category: ['美好', '品德'], meaning: '旨酒佳肴，美好高尚，品德优良', gender: 'neutral' },
    { char: '旺', wuxing: '火', strokes: 8, category: ['事业', '财运'], meaning: '兴旺发达，财运亨通，事业有成', gender: 'male' },
    { char: '昆', wuxing: '火', strokes: 8, category: ['兄弟', '事业'], meaning: '昆仲情深，事业有成，前程似锦', gender: 'male' },
    { char: '昕', wuxing: '火', strokes: 8, category: ['希望', '光明'], meaning: '黎明曙光，充满希望，前途光明', gender: 'neutral' },
  ],

  // ========== 土属性 ==========
  tu: [
    // 土字旁
    { char: '坤', wuxing: '土', strokes: 8, category: ['品德', '大地'], meaning: '坤厚载物，品德高尚，胸怀宽广', gender: 'neutral' },
    { char: '培', wuxing: '土', strokes: 11, category: ['培养', '事业'], meaning: '培养人才，事业有成，根基深厚', gender: 'male' },
    { char: '城', wuxing: '土', strokes: 10, category: ['事业', '稳重'], meaning: '众志成城，事业稳固，坚不可摧', gender: 'male' },
    { char: '域', wuxing: '土', strokes: 11, category: ['事业', '领域'], meaning: '领域广阔，事业有成，疆域辽阔', gender: 'male' },
    { char: '坚', wuxing: '土', strokes: 11, category: ['意志', '事业'], meaning: '坚如磐石，意志坚定，事业有成', gender: 'male' },
    { char: '基', wuxing: '土', strokes: 11, category: ['事业', '基础'], meaning: '基础稳固，事业有成，基业长青', gender: 'male' },
    { char: '堂', wuxing: '土', strokes: 11, category: ['家庭', '地位'], meaning: '堂堂正正，家庭和睦，地位尊贵', gender: 'male' },
    { char: '坚', wuxing: '土', strokes: 11, category: ['意志', '坚韧'], meaning: '坚韧不拔，意志坚定，不屈不挠', gender: 'male' },
    { char: '坡', wuxing: '土', strokes: 8, category: ['事业', '上升'], meaning: '步步高升，事业上升，稳步前进', gender: 'male' },
    { char: '坪', wuxing: '土', strokes: 8, category: ['稳重', '平安'], meaning: '平地安稳，平安顺遂，稳重踏实', gender: 'neutral' },
    { char: '坦', wuxing: '土', strokes: 8, category: ['正直', '平安'], meaning: '坦诚正直，平安坦荡，心胸开阔', gender: 'male' },
    { char: '坤', wuxing: '土', strokes: 8, category: ['品德', '包容'], meaning: '坤厚载物，包容万物，品德高尚', gender: 'neutral' },
    { char: '坷', wuxing: '土', strokes: 8, category: ['坚韧', '事业'], meaning: '坎坷前行，坚韧不拔，终成大业', gender: 'male' },
    { char: '型', wuxing: '土', strokes: 9, category: ['才华', '模范'], meaning: '模范榜样，才华出众，为人表率', gender: 'male' },
    { char: '垣', wuxing: '土', strokes: 9, category: ['保护', '稳重'], meaning: '墙垣护卫，稳重可靠，安全守护', gender: 'male' },
    { char: '城', wuxing: '土', strokes: 10, category: ['事业', '稳重'], meaning: '众志成城，事业稳固，坚不可摧', gender: 'male' },
    { char: '埔', wuxing: '土', strokes: 10, category: ['事业', '基础'], meaning: '基础深厚，事业有成，稳步发展', gender: 'neutral' },
    { char: '埕', wuxing: '土', strokes: 10, category: ['财运', '事业'], meaning: '酒埕藏财，财运亨通，事业有成', gender: 'neutral' },
    { char: '埂', wuxing: '土', strokes: 10, category: ['稳重', '边界'], meaning: '稳重可靠，守土有责，边界分明', gender: 'neutral' },
    { char: '堡', wuxing: '土', strokes: 12, category: ['保护', '事业'], meaning: '堡垒坚固，事业稳固，安全可靠', gender: 'male' },
    { char: '堤', wuxing: '土', strokes: 12, category: ['保护', '稳重'], meaning: '堤坝守护，稳重可靠，安全防护', gender: 'male' },
    { char: '堪', wuxing: '土', strokes: 12, category: ['能力', '事业'], meaning: '堪当大任，能力出众，事业有成', gender: 'male' },
    { char: '塔', wuxing: '土', strokes: 13, category: ['事业', '高升'], meaning: '宝塔高耸，事业高升，步步高升', gender: 'neutral' },
    { char: '塘', wuxing: '土', strokes: 13, category: ['财运', '家庭'], meaning: '荷塘月色，财运积聚，家庭美满', gender: 'neutral' },
    { char: '塬', wuxing: '土', strokes: 13, category: ['稳重', '广阔'], meaning: '黄土高原，稳重踏实，广阔无垠', gender: 'male' },
    { char: '境', wuxing: '土', strokes: 14, category: ['境界', '事业'], meaning: '境界高远，事业有成，追求卓越', gender: 'male' },
    { char: '墉', wuxing: '土', strokes: 14, category: ['保护', '事业'], meaning: '城墙高筑，事业稳固，安全防护', gender: 'male' },
    { char: '塾', wuxing: '土', strokes: 14, category: ['教育', '文化'], meaning: '私塾教育，文化底蕴深厚，学识渊博', gender: 'neutral' },
    { char: '增', wuxing: '土', strokes: 15, category: ['财运', '事业'], meaning: '与日俱增，财运增长，事业发展', gender: 'male' },
    { char: '墨', wuxing: '土', strokes: 15, category: ['文才', '艺术'], meaning: '墨香四溢，文才出众，艺术天赋高', gender: 'neutral' },
    { char: '墩', wuxing: '土', strokes: 15, category: ['稳重', '可靠'], meaning: '稳重墩实，可靠踏实，值得信赖', gender: 'male' },
    { char: '融', wuxing: '土', strokes: 16, category: ['和谐', '事业'], meaning: '融洽和谐，事业融合，和睦相处', gender: 'neutral' },
    { char: '壁', wuxing: '土', strokes: 16, category: ['保护', '稳重'], meaning: '铜墙铁壁，坚不可摧，稳重可靠', gender: 'neutral' },
    { char: '疆', wuxing: '土', strokes: 19, category: ['事业', '广阔'], meaning: '开疆拓土，事业广阔，疆域辽阔', gender: 'male' },
    { char: '壤', wuxing: '土', strokes: 20, category: ['财运', '土地'], meaning: '肥沃土壤，财运丰厚，事业有成', gender: 'neutral' },
    // 山字旁（属土）
    { char: '山', wuxing: '土', strokes: 3, category: ['稳重', '高大'], meaning: '高山仰止，稳重可靠，高大威猛', gender: 'male' },
    { char: '岩', wuxing: '土', strokes: 8, category: ['坚强', '事业'], meaning: '岩石坚硬，坚强不屈，事业稳固', gender: 'male' },
    { char: '峰', wuxing: '土', strokes: 10, category: ['事业', '成就'], meaning: '登峰造极，事业有成，成就卓越', gender: 'male' },
    { char: '峻', wuxing: '土', strokes: 10, category: ['品德', '高大'], meaning: '高风峻节，品德高尚，高大威猛', gender: 'male' },
    { char: '崇', wuxing: '土', strokes: 11, category: ['品德', '地位'], meaning: '崇高伟大，品德高尚，地位尊贵', gender: 'male' },
    { char: '崎', wuxing: '土', strokes: 11, category: ['坚韧', '事业'], meaning: '崎岖前行，坚韧不拔，终成大业', gender: 'male' },
    { char: '岚', wuxing: '土', strokes: 12, category: ['美貌', '气质'], meaning: '山岚雾气，美丽神秘，气质高雅', gender: 'female' },
    { char: '嵋', wuxing: '土', strokes: 12, category: ['美貌', '高大'], meaning: '峨眉山秀，美丽高大，气质非凡', gender: 'female' },
    { char: '嵘', wuxing: '土', strokes: 17, category: ['事业', '才华'], meaning: '峥嵘岁月，事业辉煌，才华出众', gender: 'male' },
    { char: '巍', wuxing: '土', strokes: 21, category: ['事业', '高大'], meaning: '巍然屹立，事业宏伟，高大威猛', gender: 'male' },
    { char: '岳', wuxing: '土', strokes: 8, category: ['事业', '高大'], meaning: '五岳独尊，事业有成，高大尊贵', gender: 'male' },
    { char: '岑', wuxing: '土', strokes: 7, category: ['文雅', '才华'], meaning: '小山清秀，文雅有才，气质高雅', gender: 'neutral' },
    { char: '岛', wuxing: '土', strokes: 10, category: ['独特', '自由'], meaning: '海岛独特，自由独立，与众不同', gender: 'neutral' },
    { char: '峡', wuxing: '土', strokes: 10, category: ['事业', '冒险'], meaning: '峡谷探险，勇于冒险，事业有成', gender: 'male' },
    // 其他属土字
    { char: '宇', wuxing: '土', strokes: 6, category: ['志向', '广阔'], meaning: '宇宙浩瀚，志向远大，广阔无垠', gender: 'male' },
    { char: '安', wuxing: '土', strokes: 6, category: ['平安', '家庭'], meaning: '平安幸福，家庭和睦，安居乐业', gender: 'neutral' },
    { char: '宇', wuxing: '土', strokes: 6, category: ['志向', '气度'], meaning: '气宇轩昂，志向远大，气度不凡', gender: 'male' },
    { char: '宏', wuxing: '土', strokes: 7, category: ['事业', '志向'], meaning: '宏图大志，事业宏伟，志向远大', gender: 'male' },
    { char: '完', wuxing: '土', strokes: 7, category: ['完美', '圆满'], meaning: '完美无缺，圆满如意，幸福美满', gender: 'neutral' },
    { char: '宛', wuxing: '土', strokes: 8, category: ['美貌', '温柔'], meaning: '宛转悠扬，美丽温柔，温婉动人', gender: 'female' },
    { char: '宜', wuxing: '土', strokes: 8, category: ['吉祥', '适宜'], meaning: '适宜美好，吉祥如意，万事皆宜', gender: 'neutral' },
    { char: '宥', wuxing: '土', strokes: 9, category: ['宽容', '品德'], meaning: '宽宥仁厚，品德高尚，心胸宽广', gender: 'neutral' },
    { char: '容', wuxing: '土', strokes: 10, category: ['品德', '美貌'], meaning: '容貌秀丽，宽容大度，品德高尚', gender: 'female' },
    { char: '寅', wuxing: '土', strokes: 11, category: ['尊敬', '地位'], meaning: '寅敬尊贵，地位崇高，受人尊敬', gender: 'male' },
    { char: '尉', wuxing: '土', strokes: 11, category: ['事业', '武官'], meaning: '尉官勇武，事业有成，威武不凡', gender: 'male' },
    { char: '岚', wuxing: '土', strokes: 12, category: ['美貌', '自然'], meaning: '山岚雾气，美丽自然，气质高雅', gender: 'female' },
    { char: '围', wuxing: '土', strokes: 12, category: ['保护', '团结'], meaning: '团结一心，互相保护，众志成城', gender: 'neutral' },
    { char: '园', wuxing: '土', strokes: 13, category: ['家庭', '圆满'], meaning: '家庭圆满，幸福美满，快乐无忧', gender: 'neutral' },
    { char: '圆', wuxing: '土', strokes: 13, category: ['圆满', '吉祥'], meaning: '圆满如意，吉祥团圆，幸福美满', gender: 'neutral' },
    { char: '圣', wuxing: '土', strokes: 13, category: ['品德', '智慧'], meaning: '圣贤之德，品德高尚，智慧超群', gender: 'male' },
    { char: '填', wuxing: '土', strokes: 13, category: ['充实', '财运'], meaning: '充实满足，财运充盈，富贵吉祥', gender: 'neutral' },
    { char: '嘉', wuxing: '土', strokes: 14, category: ['吉祥', '赞美'], meaning: '嘉言懿行，美好吉祥，备受赞美', gender: 'neutral' },
    { char: '境', wuxing: '土', strokes: 14, category: ['境界', '事业'], meaning: '境界高远，事业有成，追求卓越', gender: 'male' },
    { char: '墉', wuxing: '土', strokes: 14, category: ['保护', '稳重'], meaning: '城墙稳固，事业坚固，安全可靠', gender: 'male' },
    { char: '增', wuxing: '土', strokes: 15, category: ['财运', '事业'], meaning: '与日俱增，财运增长，事业发展', gender: 'male' },
    { char: '墨', wuxing: '土', strokes: 15, category: ['文才', '艺术'], meaning: '墨香四溢，文才出众，艺术天赋高', gender: 'neutral' },
  ],
};

// ------------------------------------------------------------
// 2. 名字生成函数
// ------------------------------------------------------------

/**
 * 根据姓氏、性别、喜用神五行、名字字数生成推荐名字
 * @param {string} surname - 姓氏
 * @param {string} gender - 性别 ('male' | 'female' | 'neutral')
 * @param {string|string[]} favoriteWuxing - 喜用神五行 ('jin'|'mu'|'shui'|'huo'|'tu' 或数组)
 * @param {number} nameCount - 名字字数 (1 或 2)
 * @param {object} options - 可选配置
 * @param {string[]} options.categories - 偏好的寓意分类
 * @param {number} options.resultCount - 返回结果数量 (默认15)
 * @param {number[]} options.bestStrokeCombos - 最佳笔画组合（五格数理）
 * @returns {Array} 推荐名字数组
 */
export function generateNames(surname, gender, favoriteWuxing, nameCount = 2, options = {}) {
  const {
    categories = [],
    resultCount = 15,
    bestStrokeCombos = null,
  } = options;

  // 处理喜用神（支持单个或数组）
  const wuxingList = Array.isArray(favoriteWuxing) ? favoriteWuxing : [favoriteWuxing];

  // 从所有指定五行中收集候选字
  let candidates = [];
  for (const wx of wuxingList) {
    if (NAMING_CHARS[wx]) {
      candidates = candidates.concat(NAMING_CHARS[wx]);
    }
  }

  // 如果没有找到候选字，使用全部字库
  if (candidates.length === 0) {
    for (const wx of Object.keys(NAMING_CHARS)) {
      candidates = candidates.concat(NAMING_CHARS[wx]);
    }
  }

  // 根据性别筛选
  if (gender && gender !== 'neutral') {
    candidates = candidates.filter(
      (c) => c.gender === gender || c.gender === 'neutral'
    );
  }

  // 根据寓意分类筛选（如果指定了）
  if (categories && categories.length > 0) {
    candidates = candidates.filter((c) =>
      c.category.some((cat) => categories.includes(cat))
    );
  }

  // 如果筛选后候选字太少，回退到性别筛选结果
  if (candidates.length < 10) {
    candidates = [];
    for (const wx of wuxingList) {
      if (NAMING_CHARS[wx]) {
        candidates = candidates.concat(NAMING_CHARS[wx]);
      }
    }
    if (gender && gender !== 'neutral') {
      candidates = candidates.filter(
        (c) => c.gender === gender || c.gender === 'neutral'
      );
    }
  }

  // 生成名字组合
  const results = [];
  const usedCombos = new Set();
  const maxAttempts = resultCount * 20;
  let attempts = 0;

  while (results.length < resultCount && attempts < maxAttempts) {
    attempts++;

    let nameChars = [];
    let comboKey = '';

    if (nameCount === 1) {
      // 单字名
      const char = candidates[Math.floor(Math.random() * candidates.length)];
      nameChars = [char];
      comboKey = char.char;
    } else {
      // 双字名：尝试不同五行搭配
      const char1 = candidates[Math.floor(Math.random() * candidates.length)];
      // 第二个字可以来自候选池中，尽量与第一个不同
      let char2 = candidates[Math.floor(Math.random() * candidates.length)];
      // 避免同字
      let safety = 0;
      while (char2.char === char1.char && safety < 20) {
        char2 = candidates[Math.floor(Math.random() * candidates.length)];
        safety++;
      }
      nameChars = [char1, char2];
      comboKey = char1.char + char2.char;
    }

    // 避免重复组合
    if (usedCombos.has(comboKey)) continue;
    usedCombos.add(comboKey);

    // 计算名字信息
    const fullName = surname + nameChars.map((c) => c.char).join('');
    const meaning = nameChars.map((c) => c.meaning).join('；');
    const categoriesSet = new Set();
    nameChars.forEach((c) => c.category.forEach((cat) => categoriesSet.add(cat)));
    const allCategories = Array.from(categoriesSet);

    // 计算笔画总数
    const totalStrokes = nameChars.reduce((sum, c) => sum + c.strokes, 0);

    // 计算五行匹配度（基于喜用神）
    const matchedWuxing = nameChars.filter((c) =>
      wuxingList.includes(c.wuxing)
    ).length;
    const wuxingMatchScore = Math.round(
      (matchedWuxing / nameChars.length) * 100
    );

    // 计算五格评分（简化版，基于笔画吉凶）
    const wugeScore = calculateWugeScore(surname, nameChars);

    // 综合评分
    const overallScore = Math.round(
      wugeScore * 0.6 + wuxingMatchScore * 0.4
    );

    results.push({
      name: fullName,
      givenName: nameChars.map((c) => c.char).join(''),
      chars: nameChars,
      meaning: meaning,
      categories: allCategories,
      totalStrokes: totalStrokes,
      wuxingMatchScore: wuxingMatchScore,
      wugeScore: wugeScore,
      overallScore: overallScore,
      wuxingList: nameChars.map((c) => c.wuxing),
    });
  }

  // 按综合评分排序
  results.sort((a, b) => b.overallScore - a.overallScore);

  return results.slice(0, resultCount);
}

/**
 * 计算五格评分（简化版）
 * 五格：天格、人格、地格、外格、总格
 * 基于笔画数的81数理吉凶
 */
function calculateWugeScore(surname, nameChars) {
  // 简化版：计算姓氏笔画（假设姓氏平均10画，实际应用中需要姓氏笔画库）
  const surnameStrokes = getSurnameStrokes(surname);
  const givenStrokes = nameChars.map((c) => c.strokes);

  // 五格计算（双字名）
  let tianGe, renGe, diGe, waiGe, zongGe;

  if (nameChars.length === 2) {
    tianGe = surnameStrokes + 1; // 单姓天格 = 姓笔画 + 1
    renGe = surnameStrokes + givenStrokes[0]; // 人格 = 姓 + 名首字
    diGe = givenStrokes[0] + givenStrokes[1]; // 地格 = 名首字 + 名末字
    zongGe = surnameStrokes + givenStrokes[0] + givenStrokes[1]; // 总格
    waiGe = zongGe - renGe + 1; // 外格 = 总格 - 人格 + 1
  } else {
    // 单字名
    tianGe = surnameStrokes + 1;
    renGe = surnameStrokes + givenStrokes[0];
    diGe = givenStrokes[0] + 1;
    zongGe = surnameStrokes + givenStrokes[0];
    waiGe = 2; // 单字名外格为2
  }

  // 计算各格吉凶
  const tianGeJi = getStrokeLuck(tianGe);
  const renGeJi = getStrokeLuck(renGe);
  const diGeJi = getStrokeLuck(diGe);
  const waiGeJi = getStrokeLuck(waiGe);
  const zongGeJi = getStrokeLuck(zongGe);

  // 综合评分（人格和总格权重最高）
  const score = Math.round(
    tianGeJi * 0.1 +
    renGeJi * 0.3 +
    diGeJi * 0.2 +
    waiGeJi * 0.1 +
    zongGeJi * 0.3
  );

  return Math.min(100, Math.max(0, score));
}

/**
 * 获取笔画数对应的吉凶分数（81数理简化版）
 * 吉：100分，半吉：70分，凶：40分
 */
function getStrokeLuck(strokes) {
  const num = (strokes - 1) % 81 + 1; // 81循环

  // 吉数
  const luckyNums = [
    1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29,
    31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 55, 57, 61, 63, 65,
    67, 68, 81,
  ];
  // 半吉数
  const halfLuckyNums = [
    2, 4, 9, 10, 12, 14, 19, 20, 22, 26, 27, 28, 30, 34, 36, 38,
    40, 42, 43, 44, 46, 49, 50, 51, 53, 54, 56, 58, 59, 60, 62, 64,
    66, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  ];

  if (luckyNums.includes(num)) return 100;
  if (halfLuckyNums.includes(num)) return 70;
  return 40; // 凶数
}

/**
 * 获取姓氏笔画数（简化版，常见姓氏）
 */
function getSurnameStrokes(surname) {
  const surnameStrokes = {
    '李': 7, '王': 4, '张': 11, '刘': 15, '陈': 16, '杨': 13, '黄': 12,
    '赵': 14, '周': 8, '吴': 7, '徐': 10, '孙': 10, '胡': 11, '朱': 6,
    '高': 10, '林': 8, '何': 7, '郭': 15, '马': 10, '罗': 20, '梁': 11,
    '宋': 7, '郑': 19, '谢': 17, '韩': 17, '唐': 10, '冯': 12, '于': 3,
    '董': 15, '萧': 19, '程': 12, '曹': 11, '袁': 10, '邓': 19, '许': 11,
    '傅': 12, '沈': 8, '曾': 12, '彭': 12, '吕': 7, '苏': 22, '卢': 16,
    '蒋': 17, '蔡': 17, '贾': 13, '丁': 2, '魏': 18, '薛': 19, '叶': 15,
    '阎': 16, '余': 7, '潘': 16, '杜': 7, '戴': 18, '夏': 10, '钟': 17,
    '汪': 8, '田': 5, '任': 6, '姜': 9, '范': 15, '方': 4, '石': 5,
    '姚': 9, '谭': 19, '廖': 14, '邹': 18, '熊': 14, '金': 8, '陆': 16,
    '郝': 14, '孔': 4, '白': 5, '崔': 11, '康': 11, '毛': 4, '邱': 12,
    '秦': 10, '江': 7, '史': 5, '顾': 21, '侯': 9, '邵': 12, '孟': 8,
    '龙': 16, '万': 15, '段': 9, '雷': 13, '钱': 16, '汤': 13, '尹': 4,
    '黎': 15, '易': 8, '常': 11, '武': 8, '乔': 12, '贺': 12, '赖': 16,
    '龚': 22, '文': 4,
  };
  return surnameStrokes[surname] || 10; // 默认10画
}

// ------------------------------------------------------------
// 3. 起名知识数据
// ------------------------------------------------------------

// 起名常见问题/技巧
export const NAMING_TIPS = [
  {
    title: '起名要注意什么？',
    content: '起名是人生大事，需要综合考虑多方面因素。首先要结合生辰八字，分析命局五行喜忌，选择能补益命局的字。其次要注意字音、字形、字义的协调统一，名字要朗朗上口、书写美观、寓意美好。还要考虑名字的独特性，避免过于常见或生僻的字。最后，名字要伴随人的一生，要经得起时间的考验，既有文化底蕴，又符合时代气息。',
  },
  {
    title: '如何根据生辰八字起名？',
    content: '根据生辰八字起名，首先要排出八字命盘，确定出生年月日时对应的天干地支。然后分析日主强弱，找出用神和喜神。用神是命局中最需要的五行，喜神是生助用神的五行。起名时优先选择用神五行的字，其次考虑喜神。同时要注意五行的平衡，不宜过偏过旺。还要结合五格数理，选择笔画搭配吉利的组合。',
  },
  {
    title: '什么是五格剖象法？',
    content: '五格剖象法是一种根据姓名笔画数推算吉凶的方法，由日本人熊崎健翁创立。五格包括：天格（姓+1，代表先天运势）、人格（姓+名首字，代表主运，是姓名的核心）、地格（名的笔画和，代表前运）、外格（总格-人格+1，代表副运）、总格（姓+名总笔画，代表后运）。通过81数理的吉凶来判断各格的运势好坏，其中人格和总格最为重要。',
  },
  {
    title: '起名如何选字？',
    content: '选字是起名的关键环节。首先要根据八字喜用神确定五行属性，选择对应五行的字。其次要考虑字义，选择寓意美好、积极向上的字，避免含义不佳或有歧义的字。再次要注意字音，名字的读音要响亮顺口，避免谐音不雅。还要注意字形，结构要均衡美观，笔画不宜过多或过少。最后要考虑性别差异，男孩名宜刚健大气，女孩名宜温婉柔美。',
  },
  {
    title: '起名有哪些讲究？',
    content: '起名讲究颇多：一要讲究五行补益，根据八字喜用神选字；二要讲究五格数理，选择吉数搭配；三要讲究字音韵律，平仄协调，朗朗上口；四要讲究字义内涵，寓意深远，积极向上；五要讲究字形结构，搭配均衡，书写美观；六要讲究避讳习俗，避开长辈名讳和不吉之字；七要讲究时代特色，既有文化底蕴，又不失现代感；八要讲究独特性，避免重名过多，但也不宜过于生僻。',
  },
  {
    title: '如何给男孩起名？',
    content: '给男孩起名，宜选用阳刚大气、寓意深远的字。可以从以下几个方面入手：一是品德志向类，如德、仁、义、礼、智、信、志、远等；二是事业功名类，如业、成、功、名、显、达、荣、华等；三是健康体魄类，如健、康、强、壮、威、武、雄、伟等；四是智慧才华类，如文、武、才、学、博、睿、哲、聪等；五是自然景物类，如山、海、江、河、松、柏、峰、岩等。名字整体要大气磅礴，有男子汉气概。',
  },
  {
    title: '如何给女孩起名？',
    content: '给女孩起名，宜选用温婉柔美、寓意美好的字。可以从以下几个方面入手：一是花草美玉类，如花、草、兰、梅、玉、珠、琳、瑶等；二是美貌气质类，如美、丽、娇、媚、婉、柔、雅、静等；三是品德贤淑类，如贤、淑、惠、敏、慧、颖、兰、馨等；四是自然景物类，如云、霞、雨、雪、月、星、虹、霓等；五是柔情爱意类，如爱、怜、惜、念、思、忆、婉、婷等。名字整体要柔美动听，有淑女气质。',
  },
  {
    title: '如何起一个独特的名字？',
    content: '想要起一个独特的名字，可以从以下几个角度入手：一是从诗词典籍中寻找灵感，唐诗宋词、诗经楚辞中蕴含大量优美的词句；二是结合姓氏特点，利用姓氏的字义或谐音创造巧妙的名字；三是使用不常见但寓意美好的字，避开高频用字；四是采用少见的组合方式，打破常规搭配；五是融入家族文化元素，如字辈、家训等；六是考虑季节、节气、出生地等特殊信息。但要注意，独特不等于生僻，过于生僻的字会给生活带来诸多不便。',
  },
  {
    title: '起名如何避免重名？',
    content: '避免重名可以从以下几方面入手：一是避开高频用字，如梓、轩、涵、宇、欣、怡等近年流行字；二是选择双字名，单字名重名率远高于双字名；三是巧用姓氏特点，结合姓氏创造独特组合；四是可以考虑使用三字名（姓+双字名），重名率更低；五是起名前可以查询重名数据，了解名字的常见程度；六是适当使用一些不常见但美好的字，但要避免过于生僻。适度的独特性是好的，但也不必为了追求独特而使用生僻字。',
  },
  {
    title: '什么是五行相生相克？',
    content: '五行相生：金生水，水生木，木生火，火生土，土生金。相生意味着相互滋生、促进、助长。五行相克：金克木，木克土，土克水，水克火，火克金。相克意味着相互制约、抑制、克服。起名时要考虑五行的生克关系，喜用神的五行宜得到生助，忌神的五行宜受到克制。名字中的五行搭配要和谐，不宜出现严重相克的情况，尤其是相邻两字的五行。',
  },
  {
    title: '起名要考虑生肖吗？',
    content: '生肖起名是传统起名文化的一部分，根据十二生肖的习性和特点来选择合适的字。例如属鼠的人宜用米、豆、鱼等字，寓意衣食无忧；属牛的人宜用艹、木等字，寓意有食有靠；属虎的人宜用山、林、王等字，寓意适得其所；属兔的人宜用月、艹、山等字；属龙的人宜用水、云、雨等字；属蛇的人宜用虫、豆、鱼等字；属马的人宜用艹、目等字；属羊的人宜用艹、木等字；属猴的人宜用木、禾等字；属鸡的人宜用米、豆、虫等字；属狗的人宜用人、亻等字；属猪的人宜用豆、米、鱼等字。生肖起名可以作为参考，但不宜过于迷信。',
  },
  {
    title: '改名需要注意什么？',
    content: '改名是人生中的一件大事，需要慎重考虑。首先要明确改名的原因，是因为运势不佳，还是名字不好听，或是其他原因。其次，改名要尽早，年龄越小改名的影响越大。第三，新名字的选择同样要遵循起名的原则，结合八字、五格、音形义等综合考虑。第四，改名后要多使用新名字，让新名字的能量逐渐发挥作用。第五，法律上的改名需要到户籍所在地派出所办理，准备好相关材料。最后，改名后要调整心态，积极面对新的人生。',
  },
];

// 起名禁忌
export const NAMING_TABOOS = [
  {
    title: '起名忌用生僻字',
    content: '起名忌用过于生僻的字。生僻字虽然独特，但会给日常生活带来诸多不便：一是很多人不认识，容易读错写错，造成尴尬；二是办理证件、银行开户、机票购买等可能遇到系统无法录入的问题；三是不利于社交，别人叫不出名字会减少交流机会；四是孩子学写名字时会很困难。起名追求独特是好的，但应以常用字范围内的巧妙组合为主，慎用生僻字。',
  },
  {
    title: '起名忌谐音不雅',
    content: '起名时一定要注意谐音问题，避免名字的读音与不好的词语相近。例如：杜子腾（肚子疼）、刘产（流产）、范建（犯贱）、杨伟（阳痿）等。这些名字会成为别人的笑柄，给当事人带来心理压力和困扰。起名时要多念几遍，用普通话和方言都读一下，看看有没有不好的谐音。还要注意名字与姓氏连起来的读音，有些字单独看没问题，和姓氏组合后就可能产生不雅谐音。',
  },
  {
    title: '起名忌用字过于大气',
    content: '起名忌用字过于大气或过于高贵，如天、帝、皇、圣、神、龙、凤等字。传统认为，名字太大太重，如果命格承受不住，反而会适得其反，对孩子的成长不利。虽然这是传统说法，但从实际角度看，名字太大会给孩子带来无形的压力，让人产生过高的期望。起名宜适度，寓意美好但不过分夸张，给孩子留有余地，让他们在成长中不断充实自己。',
  },
  {
    title: '起名忌用消极字',
    content: '起名忌用含义消极、悲观的字，如愁、苦、悲、哀、忧、伤、贫、贱、病、死等。名字具有心理暗示作用，长期使用消极的名字会对人的性格和运势产生不良影响。起名应选择积极向上、阳光开朗、寓意美好的字，给人带来正能量。即使命运多舛，一个积极的名字也能激励人奋发向上，改变命运。',
  },
  {
    title: '起名忌性别不分',
    content: '起名要注意性别差异，男孩名字宜刚健大气，女孩名字宜温婉柔美。如果男孩起了过于女性化的名字，容易被人嘲笑，影响性格发展；女孩起了过于男性化的名字，也可能影响气质和社交。当然，现代社会越来越多元，中性化的名字也很流行，但完全不分性别的名字还是要慎重。最好在起名时就明确性别定位，让名字与人的气质相得益彰。',
  },
  {
    title: '起名忌长辈名讳',
    content: '起名要避讳长辈的名字，这是中华民族的传统美德，表示对长辈的尊敬。一般来说，起名时要避开直系长辈（祖父母、外祖父母、父母）的名字中的字，有些地方还会避讳更远的祖辈。不仅要避开同字，还要避开同音。如果家族有家谱字辈，还要遵循字辈规定。这既是对家族文化的传承，也是对长辈的尊重。',
  },
  {
    title: '起名忌字形失衡',
    content: '起名要注意字形结构的平衡协调。如果姓是简单字（如王、丁、方），名字不宜太复杂；如果姓是复杂字（如龚、欧阳、慕容），名字可以适当简单一些。名字内部各字之间也要协调，不宜一个笔画特别多，一个特别少，看起来头重脚轻或左右失衡。另外，还要注意偏旁部首的搭配，避免全是同一偏旁，显得单调重复。字形美观的名字书写起来赏心悦目，给人留下好印象。',
  },
  {
    title: '起名忌赶时髦',
    content: '起名忌盲目跟风赶时髦。每个时代都有流行的名字，如建国、援朝、卫东、红梅、丽娟，到现在的梓轩、浩然、欣怡、子涵。过于流行的名字重名率极高，孩子上学后一个班可能有好几个同名的。而且流行的名字容易过时，等孩子长大后，名字可能显得有时代烙印，不够经典。起名最好选择经得起时间考验的经典好字，既有文化底蕴，又不会太过时。',
  },
];

// ------------------------------------------------------------
// 4. 店铺起名数据
// ------------------------------------------------------------

// 店铺起名常用字（按行业分类）
export const SHOP_NAMING_CHARS = {
  '餐饮美食': [
    { char: '香', strokes: 9, meaning: '香气四溢，美味诱人' },
    { char: '味', strokes: 8, meaning: '味道鲜美，回味无穷' },
    { char: '鲜', strokes: 17, meaning: '新鲜美味，口感绝佳' },
    { char: '美', strokes: 9, meaning: '美食美味，美不胜收' },
    { char: '食', strokes: 9, meaning: '美食佳肴，食全食美' },
    { char: '餐', strokes: 16, meaning: '餐饮美食，丰盛美味' },
    { char: '聚', strokes: 14, meaning: '宾朋满座，欢聚一堂' },
    { char: '福', strokes: 14, meaning: '福气满满，幸福美味' },
    { char: '顺', strokes: 12, meaning: '顺风顺水，生意顺利' },
    { char: '隆', strokes: 17, meaning: '生意兴隆，财源茂盛' },
    { char: '盛', strokes: 12, meaning: '繁荣昌盛，兴盛发达' },
    { char: '兴', strokes: 16, meaning: '兴旺发达，蒸蒸日上' },
    { char: '旺', strokes: 8, meaning: '生意兴旺，财源滚滚' },
    { char: '发', strokes: 12, meaning: '发财致富，发展壮大' },
    { char: '源', strokes: 14, meaning: '源远流长，财源广进' },
    { char: '泰', strokes: 9, meaning: '国泰民安，平安顺遂' },
    { char: '和', strokes: 8, meaning: '和气生财，和谐美满' },
    { char: '丰', strokes: 18, meaning: '丰盛富足，丰收美满' },
    { char: '悦', strokes: 11, meaning: '赏心悦目，愉悦味蕾' },
    { char: '品', strokes: 9, meaning: '品味美食，品质上乘' },
    { char: '轩', strokes: 10, meaning: '气宇轩昂，品味高雅' },
    { char: '阁', strokes: 14, meaning: '楼阁亭台，雅致高端' },
    { char: '居', strokes: 8, meaning: '居家美食，温馨舒适' },
    { char: '楼', strokes: 15, meaning: '酒楼食府，高端大气' },
    { char: '堂', strokes: 11, meaning: '堂堂正正，正规大气' },
    { char: '坊', strokes: 7, meaning: '作坊小店，传统地道' },
    { char: '铺', strokes: 15, meaning: '店铺林立，亲民实惠' },
    { char: '府', strokes: 8, meaning: '府邸气派，尊贵高端' },
    { char: '家', strokes: 10, meaning: '家的味道，温馨亲切' },
    { char: '厨', strokes: 15, meaning: '厨艺精湛，美味佳肴' },
  ],

  '服装服饰': [
    { char: '尚', strokes: 8, meaning: '时尚潮流，品味高尚' },
    { char: '美', strokes: 9, meaning: '美丽动人，美不胜收' },
    { char: '丽', strokes: 19, meaning: '美丽大方，光彩照人' },
    { char: '雅', strokes: 12, meaning: '优雅高贵，气质非凡' },
    { char: '衣', strokes: 6, meaning: '衣袂飘飘，服装专业' },
    { char: '布', strokes: 5, meaning: '布料优质，做工精细' },
    { char: '纺', strokes: 10, meaning: '纺织精美，品质优良' },
    { char: '绣', strokes: 13, meaning: '绣花精美，工艺精湛' },
    { char: '锦', strokes: 16, meaning: '锦绣前程，锦衣玉食' },
    { char: '缘', strokes: 15, meaning: '缘分天定，情缘衣牵' },
    { char: '梦', strokes: 14, meaning: '梦想成真，梦幻美丽' },
    { char: '幻', strokes: 4, meaning: '梦幻时尚，变幻多姿' },
    { char: '潮', strokes: 16, meaning: '潮流先锋，引领时尚' },
    { char: '风', strokes: 9, meaning: '风格独特，风采动人' },
    { char: '度', strokes: 9, meaning: '风度翩翩，气度不凡' },
    { char: '格', strokes: 10, meaning: '格调高雅，别具一格' },
    { char: '品', strokes: 9, meaning: '品味出众，品质上乘' },
    { char: '精', strokes: 14, meaning: '精致典雅，精益求精' },
    { char: '致', strokes: 10, meaning: '别致精美，细致入微' },
    { char: '优', strokes: 17, meaning: '优质优价，优雅大方' },
    { char: '佳', strokes: 8, meaning: '佳品佳人，美丽动人' },
    { char: '靓', strokes: 15, meaning: '靓丽动人，光彩夺目' },
    { char: '俏', strokes: 9, meaning: '俏丽可爱，俏皮时尚' },
    { char: '媚', strokes: 12, meaning: '妩媚动人，美丽多姿' },
    { char: '妍', strokes: 7, meaning: '妍丽多姿，美丽动人' },
    { char: '嫣', strokes: 14, meaning: '嫣然一笑，美丽动人' },
    { char: '姿', strokes: 9, meaning: '姿态万千，风姿绰约' },
    { char: '韵', strokes: 19, meaning: '韵味十足，风韵犹存' },
    { char: '阁', strokes: 14, meaning: '闺阁服饰，雅致高端' },
    { char: '坊', strokes: 7, meaning: '服饰工坊，匠心独运' },
  ],

  '美容美发': [
    { char: '美', strokes: 9, meaning: '美丽动人，美不胜收' },
    { char: '颜', strokes: 18, meaning: '容颜美丽，驻颜有术' },
    { char: '容', strokes: 10, meaning: '容貌秀丽，容颜焕发' },
    { char: '妍', strokes: 7, meaning: '妍丽动人，美丽多姿' },
    { char: '靓', strokes: 15, meaning: '靓丽动人，光彩照人' },
    { char: '丽', strokes: 19, meaning: '美丽大方，光彩夺目' },
    { char: '雅', strokes: 12, meaning: '优雅高贵，气质非凡' },
    { char: '芳', strokes: 10, meaning: '芬芳四溢，美丽动人' },
    { char: '菲', strokes: 14, meaning: '芳菲美丽，香气扑鼻' },
    { char: '薇', strokes: 19, meaning: '蔷薇美丽，气质高雅' },
    { char: '琳', strokes: 13, meaning: '琳琅满目，美玉天成' },
    { char: '瑶', strokes: 15, meaning: '瑶池仙境，美丽高贵' },
    { char: '梦', strokes: 14, meaning: '梦幻美丽，梦想成真' },
    { char: '幻', strokes: 4, meaning: '梦幻蜕变，焕发新生' },
    { char: '尚', strokes: 8, meaning: '时尚潮流，品味高尚' },
    { char: '潮', strokes: 16, meaning: '潮流先锋，引领时尚' },
    { char: '丝', strokes: 12, meaning: '丝般顺滑，秀发如丝' },
    { char: '发', strokes: 12, meaning: '美发造型，发丝动人' },
    { char: '剪', strokes: 11, meaning: '剪艺精湛，造型百变' },
    { char: '型', strokes: 9, meaning: '造型时尚，形象设计' },
    { char: '秀', strokes: 7, meaning: '秀发飘逸，秀丽动人' },
    { char: '纤', strokes: 23, meaning: '纤体瘦身，纤细动人' },
    { char: '瘦', strokes: 15, meaning: '瘦身塑形，美丽蜕变' },
    { char: '白', strokes: 5, meaning: '美白肌肤，洁白无瑕' },
    { char: '嫩', strokes: 14, meaning: '娇嫩肌肤，年轻焕发' },
    { char: '润', strokes: 16, meaning: '滋润肌肤，水润光泽' },
    { char: '肤', strokes: 15, meaning: '美肤护肤，肌肤焕新' },
    { char: '体', strokes: 7, meaning: '美体塑形，身体健康' },
    { char: 'spa', strokes: 0, meaning: '水疗养生，放松身心' },
    { char: '阁', strokes: 14, meaning: '美容会所，雅致高端' },
  ],

  '教育培训': [
    { char: '学', strokes: 16, meaning: '学习成长，学识渊博' },
    { char: '教', strokes: 11, meaning: '教书育人，教育为本' },
    { char: '育', strokes: 10, meaning: '培育人才，育德育人' },
    { char: '智', strokes: 12, meaning: '智慧启迪，聪明睿智' },
    { char: '慧', strokes: 15, meaning: '聪慧过人，智慧人生' },
    { char: '思', strokes: 9, meaning: '思维开拓，思考创新' },
    { char: '知', strokes: 8, meaning: '知识渊博，知行合一' },
    { char: '文', strokes: 4, meaning: '文化底蕴，文质彬彬' },
    { char: '博', strokes: 12, meaning: '博学多才，博古通今' },
    { char: '雅', strokes: 12, meaning: '儒雅博学，高雅脱俗' },
    { char: '书', strokes: 10, meaning: '书香门第，书山有路' },
    { char: '墨', strokes: 15, meaning: '墨香四溢，笔墨丹青' },
    { char: '笔', strokes: 10, meaning: '笔耕不辍，妙笔生花' },
    { char: '画', strokes: 12, meaning: '书画艺术，画意诗情' },
    { char: '琴', strokes: 13, meaning: '琴棋书画，才艺双全' },
    { char: '棋', strokes: 12, meaning: '棋艺精湛，思维敏捷' },
    { char: '舞', strokes: 14, meaning: '舞蹈艺术，舞姿翩翩' },
    { char: '乐', strokes: 15, meaning: '音乐艺术，快乐成长' },
    { char: '才', strokes: 4, meaning: '才华横溢，才高八斗' },
    { char: '英', strokes: 11, meaning: '英雄辈出，英才教育' },
    { char: '俊', strokes: 9, meaning: '俊才辈出，英俊潇洒' },
    { char: '优', strokes: 17, meaning: '优质教育，优秀人才' },
    { char: '精', strokes: 14, meaning: '精英教育，精益求精' },
    { char: '新', strokes: 13, meaning: '创新教育，新颖独特' },
    { char: '创', strokes: 12, meaning: '创新创业，创造未来' },
    { char: '启', strokes: 11, meaning: '启蒙教育，启迪智慧' },
    { char: '蒙', strokes: 16, meaning: '启蒙开智，蒙以养正' },
    { char: '堂', strokes: 11, meaning: '学堂书院，正规大气' },
    { char: '馆', strokes: 17, meaning: '学馆教室，专业正规' },
    { char: '院', strokes: 15, meaning: '学院机构，高端专业' },
  ],

  '医疗健康': [
    { char: '医', strokes: 18, meaning: '医术精湛，医德高尚' },
    { char: '药', strokes: 21, meaning: '药到病除，良药苦口' },
    { char: '健', strokes: 11, meaning: '健康长寿，健壮有力' },
    { char: '康', strokes: 11, meaning: '康复安康，康宁福寿' },
    { char: '寿', strokes: 14, meaning: '寿比南山，健康长寿' },
    { char: '福', strokes: 14, meaning: '福寿安康，福气满满' },
    { char: '安', strokes: 6, meaning: '平安健康，安心放心' },
    { char: '宁', strokes: 14, meaning: '安宁祥和，身心健康' },
    { char: '和', strokes: 8, meaning: '和气调和，和谐养生' },
    { char: '养', strokes: 15, meaning: '养生保健，养精蓄锐' },
    { char: '生', strokes: 5, meaning: '生机勃勃，生命健康' },
    { char: '元', strokes: 4, meaning: '元气充沛，固本培元' },
    { char: '气', strokes: 10, meaning: '气血调和，气定神闲' },
    { char: '血', strokes: 6, meaning: '血气方刚，血脉通畅' },
    { char: '阴', strokes: 16, meaning: '阴阳调和，滋阴补阳' },
    { char: '阳', strokes: 17, meaning: '阳气充足，阳光健康' },
    { char: '虚', strokes: 12, meaning: '补虚强身，扶正祛邪' },
    { char: '补', strokes: 13, meaning: '补益身体，滋补养生' },
    { char: '调', strokes: 15, meaning: '调理身体，调和阴阳' },
    { char: '理', strokes: 12, meaning: '理疗保健，理想康复' },
    { char: '疗', strokes: 17, meaning: '疗效显著，治疗康复' },
    { char: '治', strokes: 9, meaning: '治病救人，妙手回春' },
    { char: '诊', strokes: 12, meaning: '诊断精准，医德高尚' },
    { char: '仁', strokes: 4, meaning: '仁心仁术，医者仁心' },
    { char: '德', strokes: 15, meaning: '德艺双馨，医德高尚' },
    { char: '济', strokes: 18, meaning: '济世救人，悬壶济世' },
    { char: '世', strokes: 5, meaning: '世传医术，世代名医' },
    { char: '堂', strokes: 11, meaning: '药堂医馆，正规大气' },
    { char: '馆', strokes: 17, meaning: '医馆诊所，专业正规' },
    { char: '坊', strokes: 7, meaning: '药坊老店，传统地道' },
  ],

  '科技互联网': [
    { char: '科', strokes: 9, meaning: '科技创新，科学发展' },
    { char: '技', strokes: 8, meaning: '技术领先，技高一筹' },
    { char: '智', strokes: 12, meaning: '智能科技，智慧生活' },
    { char: '慧', strokes: 15, meaning: '聪慧创新，智慧赋能' },
    { char: '创', strokes: 12, meaning: '创新创业，创造未来' },
    { char: '新', strokes: 13, meaning: '新颖独特，创新驱动' },
    { char: '云', strokes: 12, meaning: '云计算，云端服务' },
    { char: '网', strokes: 14, meaning: '网络科技，互联互通' },
    { char: '数', strokes: 15, meaning: '数字科技，数据驱动' },
    { char: '信', strokes: 9, meaning: '信息技术，诚信可靠' },
    { char: '息', strokes: 10, meaning: '信息科技，消息灵通' },
    { char: '软', strokes: 11, meaning: '软件开发，软硬兼施' },
    { char: '硬', strokes: 12, meaning: '硬件制造，硬实力强' },
    { char: '联', strokes: 17, meaning: '互联互通，联合创新' },
    { char: '通', strokes: 14, meaning: '通达四海，畅通无阻' },
    { char: '达', strokes: 16, meaning: '达观创新，飞黄腾达' },
    { char: '腾', strokes: 20, meaning: '腾飞发展，龙腾虎跃' },
    { char: '飞', strokes: 9, meaning: '飞速发展，一飞冲天' },
    { char: '速', strokes: 14, meaning: '速度效率，快速响应' },
    { char: '捷', strokes: 12, meaning: '快捷高效，捷报频传' },
    { char: '锐', strokes: 15, meaning: '锐意进取，敏锐洞察' },
    { char: '锋', strokes: 15, meaning: '先锋科技，锋芒毕露' },
    { char: '极', strokes: 13, meaning: '极致体验，极限创新' },
    { char: '度', strokes: 9, meaning: '度量精准，高度创新' },
    { char: '维', strokes: 14, meaning: '思维创新，多维发展' },
    { char: '思', strokes: 9, meaning: '思维创新，思路开阔' },
    { char: '想', strokes: 13, meaning: '想象无限，理想实现' },
    { char: '梦', strokes: 14, meaning: '梦想成真，科技追梦' },
    { char: '幻', strokes: 4, meaning: '梦幻科技，变幻无穷' },
    { char: '未', strokes: 5, meaning: '未来科技，引领未来' },
  ],

  '零售百货': [
    { char: '百', strokes: 6, meaning: '百货齐全，百业兴旺' },
    { char: '货', strokes: 11, meaning: '货品齐全，货真价实' },
    { char: '商', strokes: 11, meaning: '商业繁荣，商道酬信' },
    { char: '店', strokes: 8, meaning: '店铺兴旺，生意兴隆' },
    { char: '铺', strokes: 15, meaning: '铺面繁荣，货铺兴旺' },
    { char: '市', strokes: 5, meaning: '市场繁荣，市井繁华' },
    { char: '场', strokes: 12, meaning: '商场如战场，场场爆满' },
    { char: '超', strokes: 12, meaning: '超市百货，超越期待' },
    { char: '购', strokes: 17, meaning: '购物愉快，购你所需' },
    { char: '物', strokes: 8, meaning: '物美价廉，物超所值' },
    { char: '优', strokes: 17, meaning: '优质优价，优秀品质' },
    { char: '惠', strokes: 12, meaning: '实惠优惠，惠民利民' },
    { char: '利', strokes: 7, meaning: '利国利民，互利共赢' },
    { char: '福', strokes: 14, meaning: '福气满满，福运连连' },
    { char: '顺', strokes: 12, meaning: '顺风顺水，生意顺利' },
    { char: '隆', strokes: 17, meaning: '生意兴隆，财源茂盛' },
    { char: '盛', strokes: 12, meaning: '繁荣昌盛，兴盛发达' },
    { char: '兴', strokes: 16, meaning: '兴旺发达，蒸蒸日上' },
    { char: '旺', strokes: 8, meaning: '生意兴旺，财运亨通' },
    { char: '发', strokes: 12, meaning: '发财致富，发展壮大' },
    { char: '源', strokes: 14, meaning: '源远流长，财源广进' },
    { char: '茂', strokes: 11, meaning: '茂盛繁荣，枝繁叶茂' },
    { char: '荣', strokes: 14, meaning: '荣华富贵，欣欣向荣' },
    { char: '华', strokes: 14, meaning: '华贵美丽，物华天宝' },
    { char: '美', strokes: 9, meaning: '物美价廉，美好购物' },
    { char: '佳', strokes: 8, meaning: '佳品云集，佳节购物' },
    { char: '精', strokes: 14, meaning: '精品百货，精益求精' },
    { char: '品', strokes: 9, meaning: '品质保证，品味生活' },
    { char: '全', strokes: 6, meaning: '品种齐全，全心全意' },
    { char: '多', strokes: 6, meaning: '多种多样，多多益善' },
  ],

  '金融理财': [
    { char: '金', strokes: 8, meaning: '金银满仓，金玉满堂' },
    { char: '银', strokes: 14, meaning: '金银财宝，财源滚滚' },
    { char: '财', strokes: 10, meaning: '财源广进，财运亨通' },
    { char: '富', strokes: 12, meaning: '富贵荣华，富甲一方' },
    { char: '贵', strokes: 12, meaning: '富贵吉祥，尊贵高端' },
    { char: '鑫', strokes: 24, meaning: '三金叠立，多金多福' },
    { char: '隆', strokes: 17, meaning: '生意兴隆，财源茂盛' },
    { char: '盛', strokes: 12, meaning: '繁荣昌盛，兴盛发达' },
    { char: '兴', strokes: 16, meaning: '兴旺发达，蒸蒸日上' },
    { char: '旺', strokes: 8, meaning: '财运兴旺，生意红火' },
    { char: '发', strokes: 12, meaning: '发财致富，发展壮大' },
    { char: '源', strokes: 14, meaning: '源远流长，财源广进' },
    { char: '通', strokes: 14, meaning: '金融通四海，财运亨通' },
    { char: '达', strokes: 16, meaning: '飞黄腾达，财富通达' },
    { char: '丰', strokes: 18, meaning: '丰收富足，丰衣足食' },
    { char: '盈', strokes: 9, meaning: '盈利丰厚，喜气盈门' },
    { char: '利', strokes: 7, meaning: '利润丰厚，利路亨通' },
    { char: '益', strokes: 10, meaning: '收益稳定，多多益善' },
    { char: '增', strokes: 15, meaning: '财富增值，与日俱增' },
    { char: '长', strokes: 8, meaning: '稳健增长，长盛不衰' },
    { char: '稳', strokes: 19, meaning: '稳健理财，稳操胜券' },
    { char: '安', strokes: 6, meaning: '安全可靠，安心投资' },
    { char: '信', strokes: 9, meaning: '诚信为本，信誉第一' },
    { char: '诚', strokes: 14, meaning: '诚实守信，以诚待人' },
    { char: '德', strokes: 15, meaning: '德才兼备，厚德载物' },
    { char: '融', strokes: 16, meaning: '金融融通，融合发展' },
    { char: '投', strokes: 8, meaning: '投资有道，投桃报李' },
    { char: '资', strokes: 13, meaning: '资本雄厚，资质优良' },
    { char: '汇', strokes: 13, meaning: '汇聚财富，汇通天下' },
    { char: '聚', strokes: 14, meaning: '聚财聚宝，汇聚精英' },
  ],
};

// ------------------------------------------------------------
// 5. 店铺起名生成函数
// ------------------------------------------------------------

/**
 * 根据行业和偏好生成店铺名称
 * @param {string} industry - 行业名称
 * @param {object} options - 可选配置
 * @param {number} options.nameLength - 名字字数 (2-4)
 * @param {number} options.resultCount - 返回结果数量
 * @returns {Array} 推荐店铺名数组
 */
export function generateShopNames(industry, options = {}) {
  const { nameLength = 3, resultCount = 15 } = options;

  const chars = SHOP_NAMING_CHARS[industry] || [];
  if (chars.length === 0) return [];

  const results = [];
  const usedNames = new Set();
  const maxAttempts = resultCount * 20;
  let attempts = 0;

  while (results.length < resultCount && attempts < maxAttempts) {
    attempts++;

    const selectedChars = [];
    const usedCharIndices = new Set();

    for (let i = 0; i < nameLength; i++) {
      let idx;
      let safety = 0;
      do {
        idx = Math.floor(Math.random() * chars.length);
        safety++;
      } while (usedCharIndices.has(idx) && safety < 30);

      if (safety >= 30) break;
      usedCharIndices.add(idx);
      selectedChars.push(chars[idx]);
    }

    if (selectedChars.length < nameLength) continue;

    const shopName = selectedChars.map((c) => c.char).join('');
    if (usedNames.has(shopName)) continue;
    usedNames.add(shopName);

    const meaning = selectedChars.map((c) => c.meaning).join('，');
    const totalStrokes = selectedChars.reduce((sum, c) => sum + c.strokes, 0);
    const luckScore = getStrokeLuck(totalStrokes);

    results.push({
      name: shopName,
      chars: selectedChars,
      meaning: meaning,
      totalStrokes: totalStrokes,
      luckScore: luckScore,
    });
  }

  // 按吉凶评分排序
  results.sort((a, b) => b.luckScore - a.luckScore);

  return results.slice(0, resultCount);
}

// ------------------------------------------------------------
// 6. 辅助工具函数导出
// ------------------------------------------------------------

/**
 * 获取所有五行分类列表
 */
export function getWuxingList() {
  return Object.keys(NAMING_CHARS);
}

/**
 * 根据五行获取该分类下的所有字
 */
export function getCharsByWuxing(wuxing) {
  return NAMING_CHARS[wuxing] || [];
}

/**
 * 搜索包含特定寓意分类的字
 */
export function searchCharsByCategory(category) {
  const results = [];
  for (const wuxing of Object.keys(NAMING_CHARS)) {
    for (const char of NAMING_CHARS[wuxing]) {
      if (char.category.includes(category)) {
        results.push(char);
      }
    }
  }
  return results;
}

/**
 * 获取所有寓意分类
 */
export function getAllCategories() {
  const categories = new Set();
  for (const wuxing of Object.keys(NAMING_CHARS)) {
    for (const char of NAMING_CHARS[wuxing]) {
      char.category.forEach((cat) => categories.add(cat));
    }
  }
  return Array.from(categories);
}

/**
 * 获取所有行业列表
 */
export function getIndustries() {
  return Object.keys(SHOP_NAMING_CHARS);
}
