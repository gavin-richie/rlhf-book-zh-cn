/* 附录 B 互动元件：话多的平衡（Chattiness Balance）体验器 */
(function () {
  'use strict';

  var LEVELS = ['超简短', '简短', '適中', '詳盡條列', '过度鋪陳'];

  var TEXTS = [
    'RLHF（基于人類反馈的强化學習）是一種利用人類偏好訊號来微调语言模型的训练方法。',

    'RLHF 是「基于人類反馈的强化學習」：先讓標註者比較模型的多个回覆并选出較好的那个，' +
    '用这些偏好数据训练一个奖励模型，再以强化學習讓语言模型往人類偏好的方向更新。' +
    'ChatGPT 等聊天助手「好聊」的特质，多半来自这一步。',

    '基于人類反馈的强化學習（RLHF）是机器學習的一个子領域，目標是把人類的判斷納入模型的训练迴圈。' +
    '流程通常分三步：先以監督式微调讓模型學会遵循指令；接着收集人類對成對回覆的偏好比較，' +
    '训练出一个奖励模型来近似人類的喜好；最后用 PPO 或 DPO 等算法，' +
    '讓语言模型在不偏離原模型太远的前提下最大化这个奖励。\n\n' +
    '相較于手工设计奖励函数，这種做法能捕捉「什么样的回答比較好」这類难以明文定义的主觀標準，' +
    '但也面臨標註成本高、反馈不一致与奖励駭客（reward hacking）等挑战。',

    '基于人類反馈的强化學習（**RLHF**）是强化學習的一个子集，其中引导學習的奖励由人類提供，' +
    '而非預先指定的数值奖励函数。这在难以设计奖励函数、或期望的表現涉及主觀判斷时特別有用。\n\n' +
    '**核心組成：**\n\n' +
    '1. **人類輸入：** 反馈来自人類评估者的定性判斷，形式包含数值評分、二元偏好、自然語言反馈或示范。\n' +
    '2. **奖励模型：** 原始人類反馈存在变异与偏誤，需先训练奖励模型，把偏好转换成稳定的學習訊號。\n' +
    '3. **策略优化：** 以 PPO、DPO 等算法迭代更新模型，使其行为逐步貼近人類偏好。\n\n' +
    '**應用領域：**\n\n' +
    '- **對話助手：** 讓回覆更有幫助、无害且誠实。\n' +
    '- **机器人學：** 教机器人執行难以用奖励函数描述的任务。\n' +
    '- **推薦系統：** 用人類反馈调整并改善推薦品质。\n\n' +
    '**主要挑战：**\n\n' +
    '1. **可扩展性：** 收集人類反馈既耗时又昂貴。\n' +
    '2. **偏誤与雜訊：** 人類反馈不一致，可能导致次佳的學習结果。\n' +
    '3. **对齐与奖励駭客：** 模型可能只學会討好表面訊號，而非真正的人類偏好。',

    '这是一个非常好的问題！基于人類反馈的强化學習（RLHF，Reinforcement Learning from Human ' +
    'Feedback）是一个内容相当丰富的主题，以下我將盡可能完整地为您说明。\n\n' +
    '首先，需要说明的是，RLHF 是一種利用人類偏好来训练语言模型的方法。換句話说，' +
    '它讓人類的反馈參与模型的學習过程。也就是说，模型的训练訊號来自人類的判斷，' +
    '而不是預先定义的奖励函数。\n\n' +
    '**詳細流程如下：**\n\n' +
    '1. **監督式微调：** 首先，模型会先經过監督式微调。这一步非常重要，因为它是后續一切训练的基礎；' +
    '沒有这一步，后面的步驟將难以进行。\n' +
    '2. **偏好收集：** 接着会收集人類的偏好数据。值得一提的是，这些数据的品质会直接影响最終效果，' +
    '因此数据品质非常关鍵，务必重視数据品质。\n' +
    '3. **奖励模型训练：** 然后训练奖励模型。如前所述，奖励模型的作用是把人類偏好转换成训练訊號，' +
    '这正是第 2 步收集偏好数据的目的所在。\n' +
    '4. **强化學習：** 最后进行强化學習优化。这一步会用到前面所有步驟的成果，' +
    '也就是说，它整合了前述的一切。\n\n' +
    '**不过，需要注意的是**，实際效果可能因模型規模、数据品质与具体應用情境而异，以上内容僅供參考，' +
    '不構成任何工程決策建議。在实際部署前，建議諮詢相关領域的专业人士，并进行充分的评估与测试。' +
    '同时也要提醒您，AI 領域发展迅速，本说明可能无法涵盖最新的进展。\n\n' +
    '总結来说，RLHF 就是用人類反馈来训练模型的方法——正如开头所说，' +
    '它讓人類的判斷參与模型的學習过程。希望以上说明對您有幫助！' +
    '如果您还有任何其他问題，欢迎隨时提出，我很樂意为您进一步说明！'
  ];

  /* 「適中」檔的 DPO 對照版：同样的内容，更长、更結構化（呼應 Tülu 3 SFT vs DPO） */
  var DPO_TEXT =
    '基于人類反馈的强化學習（**RLHF**）是讓语言模型对齐人類偏好的核心技术：' +
    '引导學習的奖励訊號来自人類判斷，而非預先寫定的奖励函数。\n\n' +
    '典型流程包含三个阶段：\n\n' +
    '1. **監督式微调（SFT）：** 以人工示范数据训练模型遵循指令，作为后續训练的起點。\n' +
    '2. **奖励模型训练：** 收集標註者對成對回覆的偏好比較（被选 ≻ 被拒），' +
    '训练一个能为任意回覆打分的奖励模型。\n' +
    '3. **强化學習优化：** 以 PPO 或 DPO 等算法更新策略，在最大化奖励的同时，' +
    '以 KL 懲罰約束模型不要偏離參考模型太远。\n\n' +
    '**为什么重要：** 这種做法能捕捉「什么样的回答比較好」这類难以明文定义的主觀標準，' +
    '是 ChatGPT 等助手好用的关鍵。\n\n' +
    '**主要挑战：** 標註成本高、人類反馈充滿雜訊与偏誤，' +
    '以及模型可能學会鑽奖励的漏洞（奖励駭客）。';

  var INTERPS = [
    '一句話回答的资訊密度最高，但在成對比較中，評審常覺得它「不夠周全」——精简的答案很容易輸給看起来更完整的對手。',
    '简短但有内容。Starling Beta 这類模型示范了「长得剛好」：平均回應变长了，但增加的方式確实幫助到人類評分者。',
    '接近甜蜜點。評審（人類与 LLM）平均偏好較长、較完整的回覆——这是 RLHF 模型越来越囉唆的原因之一。試試切換上方的 SFT／DPO 對照。',
    '偏好微调的典型风格：粗体、編號、條列清單。勝率仍高，但每个字承載的资訊已开始稀釋——「话多」不只是长度，也包含格式編排。',
    '超过甜蜜點后，冗长反而傷害体验，但自动評測不一定罰得到——这正是 AlpacaEval 与 WildBench 加入线性长度校正机制的原因。'
  ];
  var INTERP_DPO =
    '同样的内容，DPO 版多了結構、粗体与編號，长度也明顯增加——长度与格式編排正是偏好微调最一致的「指紋」，且已被反覆證明与評審偏好相关。';

  var CSS = '' +
    '.appbw-q{font-weight:700;color:var(--fg);}' +
    '.appbw-q code{background:var(--code-bg);border-radius:6px;padding:2px 8px;font-size:.9em;}' +
    '.appbw-toggle{margin-left:auto;display:flex;gap:6px;}' +
    '.appbw-toggle button.is-active{background:var(--accent-soft);border-color:var(--accent);color:var(--fg);}' +
    '.appbw-card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin:12px 0;}' +
    '.appbw-meta{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:.78rem;color:var(--fg-muted);}' +
    '.appbw-badge{padding:2px 10px;border-radius:999px;background:var(--accent-soft);color:var(--accent-2);border:1px solid var(--border);}' +
    '.appbw-count{margin-left:auto;}' +
    '.appbw-text{color:var(--fg);font-size:.92rem;line-height:1.85;max-height:300px;overflow-y:auto;transition:opacity .18s ease;}' +
    '.appbw-text p{margin:0 0 10px;white-space:pre-wrap;}' +
    '.appbw-text p:last-child{margin-bottom:0;}' +
    '.appbw-note{margin-top:10px;padding-top:8px;border-top:1px dashed var(--border);color:var(--fg-muted);font-size:.82rem;}' +
    '.appbw-sliderrow{align-items:center;margin-top:16px;}' +
    '.appbw-sliderrow label{color:var(--fg);font-size:.9rem;white-space:nowrap;}' +
    '.appbw-sliderrow input[type=range]{flex:1;min-width:120px;}' +
    '.appbw-levels{display:flex;justify-content:space-between;font-size:.76rem;color:var(--fg-muted);margin-top:4px;}' +
    '.appbw-levels span.is-active{color:var(--accent);font-weight:700;}' +
    '.appbw-legend{display:flex;flex-wrap:wrap;gap:16px;font-size:.8rem;color:var(--fg-muted);margin:16px 0 6px;}' +
    '.appbw-legend i{display:inline-block;width:18px;height:3px;border-radius:2px;vertical-align:middle;margin-right:6px;}' +
    '.appbw-chart svg{width:100%;height:auto;display:block;}' +
    '.appbw-interp{background:var(--accent-soft);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:12px;color:var(--fg);font-size:.88rem;line-height:1.7;}';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, cls, parent) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (parent) parent.appendChild(node);
    return node;
  }
  function svg(tag, attrs, parent) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }
  /* 依 \n\n 分段、支持 **粗体** 的極简渲染 */
  function renderRich(target, text) {
    target.textContent = '';
    text.split('\n\n').forEach(function (block) {
      var p = el('p', '', target);
      var parts = block.split(/\*\*([^*]+)\*\*/g);
      for (var i = 0; i < parts.length; i++) {
        if (!parts[i]) continue;
        if (i % 2 === 1) el('strong', '', p).textContent = parts[i];
        else p.appendChild(document.createTextNode(parts[i]));
      }
    });
  }

  /* 曲线：人類偏好勝率（倒 U，峰值中间偏右）与资訊密度（單調下降） */
  function fPref(t) { return 0.16 + 0.74 * Math.exp(-Math.pow(t - 0.58, 2) / (2 * 0.2 * 0.2)); }
  function fDens(t) { return 0.10 + 0.85 * Math.exp(-2.1 * t); }

  function render(rootEl) {
    var state = { value: 45, mode: 'sft' };

    var style = document.createElement('style');
    style.textContent = CSS;
    rootEl.appendChild(style);

    /* ── 頂列：提问 + SFT/DPO 切換 ── */
    var top = el('div', 'widget-row', rootEl);
    top.style.alignItems = 'center';
    var q = el('div', 'appbw-q', top);
    q.appendChild(document.createTextNode('提问：'));
    el('code', '', q).textContent = '什么是 RLHF？';
    var toggle = el('div', 'appbw-toggle', top);
    var btnSft = el('button', 'is-active', toggle); btnSft.type = 'button'; btnSft.textContent = 'SFT 模型';
    var btnDpo = el('button', '', toggle); btnDpo.type = 'button'; btnDpo.textContent = 'DPO 模型';

    /* ── 展示卡 ── */
    var card = el('div', 'appbw-card', rootEl);
    var meta = el('div', 'appbw-meta', card);
    var badge = el('span', 'appbw-badge', meta);
    var levelTag = el('span', '', meta);
    var count = el('span', 'appbw-count', meta);
    var textEl = el('div', 'appbw-text', card);
    var note = el('div', 'appbw-note', card);

    /* ── 滑桿 ── */
    var row = el('div', 'widget-row appbw-sliderrow', rootEl);
    var lab = el('label', '', row); lab.textContent = '回覆詳盡度';
    lab.htmlFor = 'appbw-range';
    var range = el('input', '', row);
    range.type = 'range'; range.id = 'appbw-range';
    range.min = '0'; range.max = '100'; range.value = String(state.value);
    var levelsBar = el('div', 'appbw-levels', rootEl);
    var levelSpans = LEVELS.map(function (name) {
      var s = el('span', '', levelsBar); s.textContent = name; return s;
    });

    /* ── SVG 曲线图 ── */
    var legend = el('div', 'appbw-legend', rootEl);
    var l1 = el('span', '', legend); var i1 = el('i', '', l1); i1.style.background = 'var(--accent)';
    l1.appendChild(document.createTextNode('人類偏好勝率'));
    var l2 = el('span', '', legend); var i2 = el('i', '', l2); i2.style.background = 'var(--accent-2)';
    l2.appendChild(document.createTextNode('资訊密度'));

    var W = 560, PL = 16, PR = 16, PT = 18, BOT = 188;
    function tx(t) { return PL + t * (W - PL - PR); }
    function ty(v) { return BOT - v * (BOT - PT); }
    function path(fn) {
      var d = '';
      for (var i = 0; i <= 60; i++) {
        var t = i / 60;
        d += (i ? 'L' : 'M') + tx(t).toFixed(1) + ',' + ty(fn(t)).toFixed(1);
      }
      return d;
    }
    var chart = el('div', 'appbw-chart', rootEl);
    var s = svg('svg', { viewBox: '0 0 560 232', role: 'img', 'aria-label': '回覆长度与偏好勝率、资訊密度的关係图' }, chart);
    /* 甜蜜點區带 */
    svg('rect', { x: tx(0.48), y: PT, width: tx(0.68) - tx(0.48), height: BOT - PT, fill: 'var(--accent-soft)' }, s);
    svg('text', { x: tx(0.58), y: PT + 12, 'text-anchor': 'middle', 'font-size': '11', fill: 'var(--fg-muted)' }, s)
      .textContent = '甜蜜點';
    /* 座標軸与檔位刻度 */
    svg('line', { x1: PL, y1: BOT, x2: W - PR, y2: BOT, stroke: 'var(--border)', 'stroke-width': 1.5 }, s);
    LEVELS.forEach(function (name, i) {
      var x = tx(0.1 + i * 0.2);
      svg('line', { x1: x, y1: BOT, x2: x, y2: BOT + 5, stroke: 'var(--border)' }, s);
      svg('text', { x: x, y: BOT + 18, 'text-anchor': 'middle', 'font-size': '10.5', fill: 'var(--fg-muted)' }, s)
        .textContent = name;
    });
    svg('text', { x: W - PR, y: BOT + 36, 'text-anchor': 'end', 'font-size': '11', fill: 'var(--fg-muted)' }, s)
      .textContent = '回覆长度 →';
    /* 兩條曲线 */
    svg('path', { d: path(fPref), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, s);
    svg('path', { d: path(fDens), fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, s);
    /* 当前位置標記 */
    var marker = svg('line', { y1: PT, y2: BOT, stroke: 'var(--fg-muted)', 'stroke-dasharray': '4 3' }, s);
    var dotPref = svg('circle', { r: 4.5, fill: 'var(--accent)', stroke: 'var(--bg)', 'stroke-width': 1.5 }, s);
    var dotDens = svg('circle', { r: 4.5, fill: 'var(--accent-2)', stroke: 'var(--bg)', 'stroke-width': 1.5 }, s);

    /* ── 动態解讀 ── */
    var interp = el('div', 'appbw-interp', rootEl);

    function levelOf(v) { return Math.min(4, Math.floor(v / 20)); }
    function currentText(lv) {
      return (state.mode === 'dpo' && lv === 2) ? DPO_TEXT : TEXTS[lv];
    }

    var lastKey = null, fadeTimer = null;
    function updateCard(lv) {
      var key = lv + '-' + state.mode;
      if (key === lastKey) return;
      lastKey = key;
      var text = currentText(lv);
      textEl.style.opacity = '0';
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = setTimeout(function () {
        renderRich(textEl, text);
        textEl.scrollTop = 0;
        textEl.style.opacity = '1';
      }, 180);
      badge.textContent = state.mode === 'dpo' ? 'DPO 模型' : 'SFT 模型';
      levelTag.textContent = '檔位：' + LEVELS[lv];
      count.textContent = '約 ' + text.replace(/\*\*/g, '').replace(/\s/g, '').length + ' 字';
      levelSpans.forEach(function (sp, i) { sp.classList.toggle('is-active', i === lv); });
      interp.textContent = (state.mode === 'dpo' && lv === 2) ? INTERP_DPO : INTERPS[lv];
      if (state.mode === 'dpo' && lv !== 2) {
        note.style.display = '';
        note.textContent = 'SFT／DPO 對照文本以「適中」檔最完整——把滑桿移到中段，看 DPO 如何把同样的内容变得更长、更結構化。';
      } else {
        note.style.display = 'none';
      }
    }
    function updateMarker() {
      var x = tx(state.value / 100).toFixed(1);
      marker.setAttribute('x1', x); marker.setAttribute('x2', x);
      dotPref.setAttribute('cx', x); dotPref.setAttribute('cy', ty(fPref(state.value / 100)).toFixed(1));
      dotDens.setAttribute('cx', x); dotDens.setAttribute('cy', ty(fDens(state.value / 100)).toFixed(1));
    }

    range.addEventListener('input', function () {
      state.value = Number(range.value);
      updateMarker();
      updateCard(levelOf(state.value));
    });
    btnSft.addEventListener('click', function () {
      state.mode = 'sft';
      btnSft.classList.add('is-active'); btnDpo.classList.remove('is-active');
      updateCard(levelOf(state.value));
    });
    btnDpo.addEventListener('click', function () {
      state.mode = 'dpo';
      btnDpo.classList.add('is-active'); btnSft.classList.remove('is-active');
      updateCard(levelOf(state.value));
    });

    updateMarker();
    updateCard(levelOf(state.value));
  }

  window.ChapterWidget = {
    title: '话多的平衡体验器',
    intro: '拖动「回覆詳盡度」滑桿，觀察同一个提问在五種詳盡度下的示范回覆，并對照曲线图上的人類偏好勝率（倒 U 型）与资訊密度（單調下降）；再切換 SFT／DPO 模型，体会偏好微调如何讓回覆变得更长、更結構化。',
    render: render
  };
})();
