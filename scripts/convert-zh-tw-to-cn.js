// Traditional Chinese (zh-TW) to Simplified Chinese (zh-CN) converter
// For widget JS files: converts Traditional Chinese to Simplified Chinese
// Safe because all Chinese text in these files is in string literals/comments,
// while all code (variable names, functions, HTML tags, CSS, math) is ASCII/English

const fs = require('fs');
const path = require('path');

const WIDGETS_DIR = path.join(__dirname, '..', 'public', 'assets', 'widgets');

// Comprehensive zh-TW -> zh-CN character mapping
const CHARS = {
  '為': '为', '們': '们', '後': '后', '學': '学', '國': '国', '與': '与',
  '於': '于', '時': '时', '發': '发', '經': '经', '間': '间', '點': '点',
  '體': '体', '說': '说', '這': '这', '麼': '么', '機': '机', '動': '动',
  '題': '题', '現': '现', '變': '变', '應': '应', '實': '实', '選': '选',
  '較': '较', '並': '并', '還': '还', '無': '无', '務': '务', '導': '导',
  '餘': '余', '臺': '台', '係': '系', '裡': '里', '範': '范', '蹟': '迹',
  '跡': '迹', '準': '准', '幾': '几', '恥': '耻', '響': '响', '襯': '衬',
  '鬆': '松', '棄': '弃', '濫': '滥', '藥': '药', '飲': '饮', '鮮': '鲜',
  '魚': '鱼', '電': '电', '難': '难', '網': '网', '維': '维', '彎': '弯',
  '產': '产', '葉': '叶', '鐵': '铁', '靜': '静', '倉': '仓', '復': '复',
  '歎': '叹', '燭': '烛', '豔': '艳', '齋': '斋', '驛': '驿', '厭': '厌',
  '癡': '痴', '謊': '谎', '辯': '辨', '鬚': '须', '韌': '韧', '鬢': '鬓',
  '飭': '饬', '黽': '黾', '門': '门', '閉': '闭', '開': '开',
  '關': '关', '陣': '阵', '陽': '阳', '陰': '阴', '隨': '随',
  '測': '评', '評': '评', '數': '数', '雜': '杂', '訊': '讯',
  '擬': '拟', '樣': '样', '論': '论', '迴': '回', '啟': '启',
  '氣': '气', '溫': '温', '標': '标', '註': '注', '誤': '误',
  '導': '导', '務': '务', '臺': '台', '係': '系', '範': '范',
  '蹟': '迹', '跡': '迹', '準': '准', '幾': '几', '恥': '耻',
  '響': '响', '襯': '衬', '鬆': '松', '棄': '弃', '濫': '滥',
  '藥': '药', '飮': '饮', '鮮': '鲜', '魚': '鱼', '電': '电',
  '難': '难', '網': '网', '維': '维', '體': '体', '彎': '弯',
  '產': '产', '葉': '叶', '鐵': '铁', '靜': '静', '倉': '仓',
  '復': '复', '歎': '叹', '燭': '烛', '豔': '艳', '齋': '斋',
  '驛': '驿', '厭': '厌', '癡': '痴', '謊': '谎', '辯': '辨',
  '鬚': '须', '韌': '韧', '鬢': '鬓', '飭': '饬', '黽': '黾',
  '閉': '闭', '開': '开', '關': '关', '陣': '阵', '陽': '阳',
  '陰': '阴', '隨': '随', '迴': '回', '擬': '拟', '樣': '样',
  '論': '论', '啟': '启', '氣': '气', '溫': '温', '標': '标',
  '註': '注', '誤': '误', '務': '务', '導': '导', '餘': '余',
  '臺': '台', '係': '系', '裡': '里', '範': '范', '蹟': '迹',
  '跡': '迹', '準': '准', '幾': '几', '恥': '耻', '響': '响',
  '襯': '衬', '鬆': '松', '棄': '弃', '濫': '滥', '藥': '药',
  '飮': '饮', '鮮': '鲜', '魚': '鱼', '電': '电', '難': '难',
  '網': '网', '維': '维', '體': '体', '彎': '弯', '產': '产',
  '葉': '叶', '鐵': '铁', '靜': '静', '倉': '仓', '發': '发',
  '復': '复', '歎': '叹', '燭': '烛', '豔': '艳', '齋': '斋',
  '驛': '驿', '厭': '厌', '癡': '痴', '謊': '谎', '辯': '辨',
  '鬚': '须', '韌': '韧', '鬢': '鬓', '飭': '饬', '黽': '黾',
  '測': '测', '評': '评', '雜': '杂', '訊': '讯', '迴': '回',
  '氣': '气', '溫': '温', '標': '标', '註': '注', '誤': '误',
  '稱': '称', '條': '条', '碼': '码', '頭': '头', '雙': '双',
  '單': '单', '豐': '丰', '儘': '尽', '夠': '够', '箇': '个',
  '麵': '面', '麥': '麦', '衝': '冲', '疊': '叠', '牀': '床',
  '澀': '涩', '樸': '朴', '鹽': '盐', '隸': '隶', '階': '阶',
  '織': '织', '繫': '系', '辭': '辞', '壽': '寿', '齊': '齐',
  '卷': '卷', '鬥': '斗', '脩': '修', '臟': '脏', '從': '从',
  '鄴': '邺', '複': '复', '澗': '涧', '濄': '涡', '繄': '伊',
  '牋': '笺', '鎭': '镇', '餉': '饷', '驅': '驱', '譎': '谲',
  '齧': '啮', '黜': '黜', '皷': '鼓', '靄': '霭',
};

function convertLine(line) {
  let result = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const cp = ch.codePointAt(0);
    // CJK Unified Ideographs: U+4E00 to U+9FFF + extensions
    if (cp >= 0x2E80 && cp <= 0x9FFF) {
      result += CHARS[ch] || ch;
    } else if (cp >= 0xF900 && cp <= 0xFAFF) {
      // CJK Compatibility Ideographs
      result += CHARS[ch] || ch;
    } else {
      result += ch;
    }
  }
  return result;
}

// Process all widget files
const files = fs.readdirSync(WIDGETS_DIR).filter(f => f.endsWith('.js'));
let totalChanged = 0;

console.log(`Found ${files.length} widget files\n`);

for (const file of files) {
  const filePath = path.join(WIDGETS_DIR, file);
  const original = fs.readFileSync(filePath, 'utf-8');
  const lines = original.split('\n');
  const converted = lines.map(convertLine).join('\n');

  if (converted !== original) {
    // Count character changes
    let changes = 0;
    for (let i = 0; i < Math.max(original.length, converted.length); i++) {
      if (original[i] !== converted[i]) changes++;
    }
    console.log(`${file}: ${changes} character changes`);
    totalChanged += changes;
    fs.writeFileSync(filePath, converted, 'utf-8');
  } else {
    console.log(`${file}: no changes`);
  }
}

console.log(`\nTotal: ${totalChanged} character changes across ${files.length} files`);
