(function () {
  'use strict';

  // 流水线项目依序排列：偶数索引为节点（阶段），奇数索引为箭头（数据流）
  var ITEMS = [
    { kind: 'node', name: '基础模型', en: 'Base Model',
      what: '經过大规模自回归预训练（下一token預測）的语言模型。它只会「補完文本」，还不会以问答格式响应使用者。',
      input: '以網页为主的大规模预训练数据（数兆token）', output: '蘊藏知識与潛力、但沒有助理行为的基础模型',
      chapter: '第 1 章 1.4 節（后训练的直覺）、第 3 章（训练概觀）',
      insight: '引出詮釋：基础模型就像 F1 賽車的底盤，決定了最終模型絕大部分的潛力；后训练的工作是把潛力全部引出来。' },
    { kind: 'edge', name: '指令数据 ~10K',
      what: '餵入精心打造的问答格式示例。模型「只」看到问答格式的数据，因此從補完文本轉为以助理人格回答查詢。',
      input: '約 1 萬筆（~10K）高品质指令—响应對', output: '训练訊號：下一token預測损失',
      chapter: '第 4 章（指令微调）、第 12 章（合成数据）',
      insight: '量級小但品质关鍵：幾千到上萬筆样本就能大幅改变模型的格式与人格，但这不代表「指令微调就足以实现对齐」。' },
    { kind: 'node', name: 'SFT 模型', en: 'SFT Model',
      what: '指令微调／監督式微调（IFT/SFT）：用同样的下一token預測损失在问答数据上训练，教导模型格式，打下遵循指令能力的基礎。',
      input: '指令数据，量級約 1 萬筆（~10K）', output: '能以问答格式可靠响应的指令遵循模型',
      chapter: '第 4 章（指令微调）',
      insight: 'SFT 學的是語言中的「特徵」：逐token（per-token）更新。它也是 RLHF 需要的強大起點——沒有好的 SFT，RLHF 难以奏效。' },
    { kind: 'edge', name: '偏好数据 ~100K',
      what: '标注者在同一提示的多个模型补全之间表達偏好（如「A 比 B 好」），構成训练獎勵模型的成對比較数据集。',
      input: '約 10 萬筆（~100K）人類偏好比較', output: '训练訊號：對比式（contrastive）损失',
      chapter: '第 10 章（偏好的本质）、第 11 章（偏好数据）',
      insight: '偏好数据远比指令数据昂貴——10 萬至 100 萬美元等級的数据預算，曾是开放社群做 RLHF 的最大门檻。' },
    { kind: 'node', name: '獎勵模型', en: 'Reward Model',
      what: '通常以 SFT 模型为起點，在偏好数据上微调，學習「怎样的回答比較好」，能为任何一段文本輸出好坏分数。',
      input: '偏好数据，量級約 10 萬筆（~100K）', output: '作为人類偏好代理（proxy）的獎勵模型',
      chapter: '第 5 章（獎勵模型建構）',
      insight: '獎勵模型充其量只是真实目标的代理，且数据雜訊較多——这正是 RL 阶段容易「过度优化」、需要正则化的根源。' },
    { kind: 'edge', name: '獎勵訊號',
      what: '在 RL 期间，獎勵模型为策略取样出的每个补全評分，把「人類覺得好不好」转换成 RL 优化器可以使用的数字。',
      input: '语言模型生成的补全结果（completions）', output: '純量（scalar）獎勵分数',
      chapter: '第 5 章（獎勵模型建構）、第 6 章（强化学习）',
      insight: '这个純量訊號是整条流水线的樞紐：它讓「难以明確定義」的人類偏好，变成可以被优化的目标。' },
    { kind: 'node', name: 'RL 优化', en: 'RL Optimizer',
      what: '取一批提示，讓模型生成补全，由獎勵模型評分，再用任选的 RL 优化器更新參数，讓好的token更可能出現。',
      input: '提示集合＋獎勵模型的純量訊號', output: '朝人類偏好迭代更新的模型參数',
      chapter: '第 3 章（训练概觀）、第 6 章（强化学习）',
      insight: '与 SFT 的逐token更新不同，RLHF 在「整体响应」層級學習：告訴模型更好的响应长什么样、又該避免哪些响应。' },
    { kind: 'edge', name: '迭代更新',
      what: 'RL 优化器推导更新規則，把好坏歸因到模型參数上，并以迭代方式进行，以維持初始模型的一般能力。',
      input: '梯度更新（搭配 KL 等正则化約束）', output: '性能飽和后的最終模型',
      chapter: '第 6 章（强化学习）、第 15 章（正则化）',
      insight: '一旦 RL 完成且性能達到飽和，这通常就是提供給使用者的最終模型。' },
    { kind: 'node', name: '对齐模型', en: 'Aligned Model',
      what: 'RLHF 完成后的最終模型：以可靠、溫暖且引人入勝的风格回答问題，同时做到有幫助（helpful）且无害（harmless）。',
      input: '—（整条流水线的最終输出）', output: '对齐人類偏好的助理模型（如 ChatGPT、Tülu 3）',
      chapter: '第 14–16 章（过度优化、正则化、评估）',
      insight: 'RLHF 比指令微调更能跨領域泛化，是催生現代后训练的源头。往下用对照卡感受它前后的差异。' }
  ];

  var DEFAULT_SEL = 2; // 預設高亮 SFT 模型
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var W = 780, H = 96, NW = 112, NH = 46, NY = 32, GAP = 52, CY = NY + NH / 2;

  var COMPARE = {
    prompt: 'The president of the united states in 2006 was（2006 年的美国总統是）',
    base: { btn: '基础模型（Base）', model: 'Llama 3.1 405B Base（僅预训练）',
      text: 'George W. Bush（喬治·W·布希），2006 年的佛羅里達州州长是 Jeb Bush（杰布·布希），而 John McCain（約翰·马侃）在 2006 年是亞利桑那州參議員——他后来敗給了 obama（歐巴马）。9 月 1 日——美国总統布希簽署一项行政命令，讓信仰型組織在提供由聯邦资金支付的社会服务时擁有更多选项。1 月 1 日——目前由美国国会在《非法網路賭博執法法》（UIGEA）中设置的期限。search：1961 年《保护植物新品種国際公約》的修正案请求植物育種者權利納入農民特權。2009 年是格里曆中以星期四开始的平年……',
      note: '基础模型只是在「補完句子」，还混入常见的網路中繼数据——内容語无倫次，因为它從未學过以问答格式响应。' },
    rlhf: { btn: 'RLHF 后（对齐）', model: 'Tülu 3 405B（完整后训练）',
      text: 'George W. Bush（喬治·W·布希）是 2006 年的美国总統。他在任兩屆，任期自 2001 年 1 月 20 日至 2009 年 1 月 20 日。',
      note: '对齐模型简洁、直接地回答同一个提示。这種风格上的轉变，正是 RLHF 与其他后训练方法带来的结果。' }
  };

  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function ensureStyle() {
    if (document.getElementById('ch01w-style')) return;
    var st = document.createElement('style');
    st.id = 'ch01w-style';
    st.textContent = '@keyframes ch01w-dash{to{stroke-dashoffset:-14;}}' +
      '.ch01w-flow{stroke-dasharray:7 7;animation:ch01w-dash .55s linear infinite;}';
    document.head.appendChild(st);
  }

  function render(rootEl) {
    ensureStyle();
    var state = { sel: DEFAULT_SEL, playing: false, timer: null, compare: 'base' };

    // --- 播放控制列 ---
    var ctrlRow = document.createElement('div');
    ctrlRow.className = 'widget-row';
    ctrlRow.style.cssText = 'margin-bottom:.6rem;align-items:center;gap:.75rem;';
    var playBtn = document.createElement('button');
    playBtn.textContent = '播放整条流水线';
    var hint = document.createElement('span');
    hint.style.cssText = 'color:var(--fg-muted);font-size:.85rem;';
    hint.textContent = '或直接点击图中的节点与箭头';
    ctrlRow.appendChild(playBtn); ctrlRow.appendChild(hint);

    // --- SVG 流程图（呼應書中图 1）---
    var svgWrap = document.createElement('div');
    svgWrap.style.cssText = 'overflow-x:auto;padding-bottom:.25rem;';
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'RLHF 三步驟流水线流程图' });
    svg.style.cssText = 'display:block;width:100%;min-width:640px;height:auto;';
    svgWrap.appendChild(svg);

    var refs = ITEMS.map(function (item, i) {
      var g = svgEl('g', {});
      g.style.cursor = 'pointer';
      var r = {};
      if (item.kind === 'node') {
        var nx = 6 + (i / 2) * (NW + GAP);
        r.rect = svgEl('rect', { x: nx, y: NY, width: NW, height: NH, rx: 10, fill: 'var(--panel-2)', stroke: 'var(--border)', 'stroke-width': '1.5' });
        var t1 = svgEl('text', { x: nx + NW / 2, y: NY + 20, 'text-anchor': 'middle', 'font-size': '12.5', 'font-weight': '700', fill: 'var(--fg)' });
        t1.textContent = item.name;
        var t2 = svgEl('text', { x: nx + NW / 2, y: NY + 36, 'text-anchor': 'middle', 'font-size': '9', fill: 'var(--fg-muted)' });
        t2.textContent = item.en;
        g.appendChild(r.rect); g.appendChild(t1); g.appendChild(t2);
      } else {
        var x0 = 6 + ((i - 1) / 2) * (NW + GAP) + NW, x1 = x0 + GAP, mid = (x0 + x1) / 2;
        r.line = svgEl('line', { x1: x0 + 3, y1: CY, x2: x1 - 10, y2: CY, stroke: 'var(--fg-muted)', 'stroke-width': '2' });
        r.head = svgEl('polygon', { points: (x1 - 10) + ',' + (CY - 4.5) + ' ' + (x1 - 1) + ',' + CY + ' ' + (x1 - 10) + ',' + (CY + 4.5), fill: 'var(--fg-muted)' });
        r.label = svgEl('text', { x: mid, y: 23, 'text-anchor': 'middle', 'font-size': '10', fill: 'var(--fg-muted)' });
        r.label.textContent = item.name;
        var hit = svgEl('rect', { x: x0, y: 12, width: GAP, height: NH + 28, fill: 'transparent' });
        g.appendChild(r.line); g.appendChild(r.head); g.appendChild(r.label); g.appendChild(hit);
      }
      var tip = svgEl('title', {});
      tip.textContent = item.name;
      g.appendChild(tip);
      g.addEventListener('click', function () { stopPlay(); state.sel = i; update(); });
      svg.appendChild(g);
      return r;
    });

    // --- 詳情卡 ---
    var card = document.createElement('div');
    card.className = 'widget-panel';
    var badge = document.createElement('span');
    badge.style.cssText = 'display:inline-block;padding:.1em .7em;border-radius:999px;font-size:.75rem;border:1px solid;margin-bottom:.45rem;';
    var heading = document.createElement('div');
    heading.style.cssText = 'font-weight:700;font-size:1.05rem;color:var(--fg);margin-bottom:.35rem;';
    var what = document.createElement('p');
    what.style.cssText = 'margin:0 0 .55rem;line-height:1.75;color:var(--fg);';
    var fields = document.createElement('div');
    fields.style.cssText = 'font-size:.9rem;line-height:1.9;color:var(--fg);';
    var fieldEls = ['输入与量级', '输出', '对应章节'].map(function (lbl) {
      var row = document.createElement('div');
      var tag = document.createElement('span');
      tag.textContent = lbl;
      tag.style.cssText = 'display:inline-block;min-width:5.5em;color:var(--fg-muted);';
      var val = document.createElement('span');
      row.appendChild(tag); row.appendChild(val); fields.appendChild(row);
      return val;
    });
    var insight = document.createElement('p'); // 动態解读
    insight.style.cssText = 'margin:.65rem 0 0;padding:.5em .8em;border-left:3px solid var(--accent);background:var(--accent-soft);border-radius:0 8px 8px 0;font-size:.9rem;line-height:1.7;color:var(--fg);';
    card.appendChild(badge); card.appendChild(heading); card.appendChild(what); card.appendChild(fields); card.appendChild(insight);

    // --- Base vs RLHF 后 对照卡 ---
    var cmp = document.createElement('div');
    cmp.className = 'widget-panel';
    cmp.style.marginTop = '.75rem';
    var cmpTitle = document.createElement('div');
    cmpTitle.style.cssText = 'font-weight:700;color:var(--fg);margin-bottom:.5rem;';
    cmpTitle.textContent = 'RLHF 做了什么？同一提示的两种回答';
    var promptBox = document.createElement('div');
    promptBox.style.cssText = 'background:var(--code-bg);border:1px solid var(--border);border-radius:8px;padding:.5em .8em;font-size:.85rem;color:var(--fg);margin-bottom:.6rem;';
    promptBox.textContent = '提示：' + COMPARE.prompt;
    var cmpRow = document.createElement('div');
    cmpRow.className = 'widget-row';
    cmpRow.style.cssText = 'gap:.5rem;margin-bottom:.6rem;';
    var cmpBtns = {};
    ['base', 'rlhf'].forEach(function (k) {
      var b = document.createElement('button');
      b.textContent = COMPARE[k].btn;
      b.addEventListener('click', function () { state.compare = k; update(); });
      cmpBtns[k] = b; cmpRow.appendChild(b);
    });
    var modelTag = document.createElement('div');
    modelTag.style.cssText = 'font-size:.8rem;color:var(--fg-muted);margin-bottom:.35rem;';
    var output = document.createElement('div');
    output.style.cssText = 'background:var(--panel-2);border:1px solid var(--border);border-radius:8px;padding:.7em .9em;font-size:.88rem;line-height:1.8;color:var(--fg);min-height:6.5em;';
    var cmpNote = document.createElement('p');
    cmpNote.style.cssText = 'margin:.55rem 0 0;font-size:.85rem;color:var(--fg-muted);line-height:1.7;';
    cmp.appendChild(cmpTitle); cmp.appendChild(promptBox); cmp.appendChild(cmpRow);
    cmp.appendChild(modelTag); cmp.appendChild(output); cmp.appendChild(cmpNote);

    // --- 播放（每步約 1.5 秒，箭头有流动动畫）---
    function stopPlay() {
      state.playing = false;
      if (state.timer) { clearTimeout(state.timer); state.timer = null; }
      playBtn.textContent = '播放整条流水线';
    }
    function playStep(i) {
      if (!state.playing || !rootEl.isConnected) return stopPlay();
      if (i >= ITEMS.length) { stopPlay(); update(); return; }
      state.sel = i;
      update();
      state.timer = setTimeout(function () { playStep(i + 1); }, ITEMS[i].kind === 'edge' ? 1100 : 1500);
    }
    playBtn.addEventListener('click', function () {
      if (state.playing) { stopPlay(); update(); return; }
      state.playing = true;
      playBtn.textContent = '停止播放';
      playStep(0);
    });

    function update() {
      ITEMS.forEach(function (item, i) {
        var sel = i === state.sel, r = refs[i];
        if (item.kind === 'node') {
          r.rect.setAttribute('fill', sel ? 'var(--accent-soft)' : 'var(--panel-2)');
          r.rect.setAttribute('stroke', sel ? 'var(--accent)' : 'var(--border)');
          r.rect.setAttribute('stroke-width', sel ? '2.5' : '1.5');
        } else {
          var c = sel ? 'var(--accent)' : 'var(--fg-muted)';
          r.line.setAttribute('stroke', c);
          r.line.setAttribute('stroke-width', sel ? '3' : '2');
          r.head.setAttribute('fill', c);
          r.label.setAttribute('fill', sel ? 'var(--accent)' : 'var(--fg-muted)');
          r.line.setAttribute('class', sel && state.playing ? 'ch01w-flow' : '');
        }
      });
      var item = ITEMS[state.sel];
      var isNode = item.kind === 'node';
      var color = isNode ? 'var(--accent)' : 'var(--accent-2)';
      badge.textContent = isNode ? '阶段' : '数据流';
      badge.style.color = color; badge.style.borderColor = color;
      heading.textContent = item.name + (item.en ? '　' + item.en : '');
      what.textContent = item.what;
      fieldEls[0].textContent = item.input;
      fieldEls[1].textContent = item.output;
      fieldEls[2].textContent = item.chapter;
      insight.textContent = '解读：' + item.insight;
      ['base', 'rlhf'].forEach(function (k) {
        var active = state.compare === k;
        cmpBtns[k].style.outline = active ? '2px solid var(--accent)' : '';
        cmpBtns[k].style.background = active ? 'var(--accent-soft)' : '';
        cmpBtns[k].setAttribute('aria-pressed', active);
      });
      var cData = COMPARE[state.compare];
      modelTag.textContent = '模型：' + cData.model;
      output.textContent = cData.text;
      cmpNote.textContent = cData.note;
    }

    rootEl.appendChild(ctrlRow);
    rootEl.appendChild(svgWrap);
    rootEl.appendChild(card);
    rootEl.appendChild(cmp);
    update();
  }

  window.ChapterWidget = {
    title: 'RLHF 三步驟交互流水线',
    intro: '点击流水线中的节点或箭头，查看每个阶段做什么、输入数据的量級、输出与对应章节；按「播放整条流水线」看数据如何從基础模型一路流向对齐模型，再用下方对照卡感受 RLHF 前后的差异。',
    render: render
  };
})();
