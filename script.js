/* LINDCINE v25 — a simple, edge-to-edge horizontal film wall.
   Edit the projects array to add real stills, previews and links. */
const REEL_ID = "994186610";
const REEL_RATIO = 2.35;

const projects = [
  {id:"doc",title:"Documentary",ratio:"4-3"},
  {id:"commercial",title:"Commercial & Brand",ratio:"16-9"},
  {id:"light",title:"A study in available light",ratio:"1",note:"A study in available light.",noteType:"A SMALL OBSERVATION"},
  {id:"people",title:"People & Portraits",ratio:"4-3"},
  {id:"wedding",title:"Wedding moment",ratio:"16-9",note:"The moments in between.",noteType:"A PERSONAL NOTE"},
  {id:"narrative",title:"Narrative",ratio:"1"},
  {id:"selected",title:"Selected Projects",ratio:"16-9"},
  {id:"landscape",title:"Somewhere between here and nowhere",ratio:"4-3",note:"Somewhere between here and nowhere.",noteType:"A SMALL OBSERVATION"},
  {id:"brand",title:"Brand Film",ratio:"1"},
  {id:"bts",title:"Behind the Scenes",ratio:"4-3",note:"A little chaos behind the scenes.",noteType:"A PERSONAL NOTE"},
  {id:"campaign",title:"Campaign",ratio:"1"},
  {id:"events",title:"Live & Events",ratio:"16-9"},
  {id:"chasing",title:"Chasing the last light",ratio:"1",note:"Chasing the last light.",noteType:"A SMALL OBSERVATION"},
  {id:"music",title:"Music & Culture",ratio:"1"},
  {id:"docfilm",title:"Documentary Film",ratio:"16-9"},
  {id:"afternoon",title:"An afternoon that turned into something else",ratio:"1",note:"Didn't plan this one. Glad it happened.",noteType:"A PERSONAL NOTE"},
  {id:"earlier",title:"Earlier Work",ratio:"4-3"},
  {id:"between",title:"Between takes",ratio:"16-9",note:"The in-between is often where things happen.",noteType:"A PERSONAL NOTE"},
  {id:"study",title:"Light study",ratio:"1",note:"A little experiment with available light.",noteType:"A SMALL OBSERVATION"},
  {id:"onset",title:"On set",ratio:"4-3"},
  {id:"portrait",title:"A quiet portrait",ratio:"16-9"},
  {id:"motion",title:"Motion study",ratio:"2-35"},
  {id:"afterlight",title:"After the light",ratio:"1"},
  {id:"fieldnotes",title:"Field notes",ratio:"4-3"},
  {id:"texture",title:"Texture & tone",ratio:"16-9"},
  {id:"cutaway",title:"A small cutaway",ratio:"1"},
  {id:"location",title:"Location scouting",ratio:"2-35"},
  {id:"process",title:"The process",ratio:"4-3"},
  {id:"night",title:"Night work",ratio:"16-9"},
  {id:"stillness",title:"Stillness",ratio:"1"}
];

const track = document.querySelector("#worldTrack");
const viewport = document.querySelector("#work");
const noteBox = document.querySelector("#hoverNote");
const noteKicker = noteBox.querySelector("span");
const noteText = noteBox.querySelector("p");

let cycleWidth = 0;
let targetScroll = 0;
let animationFrame = 0;
let activeTile = null;
let hoverTimer = 0;
let noteTimer = 0;
let dimTimer = 0;
let dragging = false;
let dragX = 0;
let dragScroll = 0;

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));

function tile(project, extra = "", tall = false, placement = "") {
  const ratio = tall ? "tile-tall" : `ratio-${project.ratio}`;
  const image = project.image
    ? `<img src="${esc(project.image)}" alt="${esc(project.title)}" loading="lazy" decoding="async">`
    : `<span class="placeholder-mark" aria-hidden="true">L.</span>`;
  const preview = project.preview
    ? `<video class="hover-video" muted loop playsinline preload="none" src="${esc(project.preview)}"></video>`
    : "";
  const note = project.note
    ? `data-note="${esc(project.note)}" data-note-type="${esc(project.noteType || "A NOTE")}"`
    : "";
  return `<article class="tile ${ratio} ${extra}" style="${placement}" data-id="${esc(project.id)}" ${note} tabindex="0" role="button" aria-label="${esc(project.title)}">
    <div class="tile-media">${image}${preview}</div>
    <div class="tile-meta">${esc(project.title)}</div>
  </article>`;
}

function reelTile() {
  return `<article class="tile reel-tile" data-id="showreel" data-anchor="showreel" tabindex="0" role="button" aria-label="Play cinematography showreel">
    <div class="reel-invite"><span class="reel-play">▶</span><span class="reel-label">WATCH SHOWREEL</span></div>
  </article>`;
}

/* ---- Layout v4. All widths/heights in svh. Page = top layer (26) + middle layer (48) + bottom layer (26).
   Each layer is an endless sequence of random "blocks". A block is one tile, or a tree of tiles stacked
   (same width, heights ∝ 1/ratio) or side by side (same height, widths ∝ ratio), so EVERY tile is an exact
   16:9 / 2.35:1 / 1:1 / 4:3 rectangle with no gaps. Layers are phase-shifted until no vertical edge runs
   through more than ~half the page. Info areas are stair-stepped holes: left and right side tiles stop at
   different x per row, and the two sides split the height differently. ---- */
const TILE_RATIOS = {"16-9":16/9, "2-35":2.35, "1":1, "4-3":4/3};
const WEIGHTS = [["16-9",.50],["2-35",.31],["1",.13],["4-3",.06]]; // most → least common
const SMALL = new Set(["1","4-3"]);
const T = 2400, HT = 26, HM = 48, HB = 26, PANEL = REEL_RATIO*HM, ISL = 210;
let seed = 20264;
const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
function pickRatio(ctx) {
  for (;;) {
    let x = rand(), acc = 0, k = "16-9";
    for (const [key, w] of WEIGHTS) { acc += w; if (x < acc) { k = key; break; } }
    const a = ctx[ctx.length-1], b = ctx[ctx.length-2];
    if (SMALL.has(k) && a && SMALL.has(a)) continue;
    if (a === k && b === k) continue;
    ctx.push(k); return k;
  }
}
const rho = n => n.leaf ? TILE_RATIOS[n.leaf] : n.h ? n.h.reduce((a,c) => a + rho(c), 0) : 1 / n.v.reduce((a,c) => a + 1/rho(c), 0);
function leaves(n, x, y, w, h, out) {
  if (n.leaf) { out.push({x, y, w, h}); return; }
  if (n.h) { const s = rho(n); let cx = x; n.h.forEach(c => { const cw = w * rho(c) / s; leaves(c, cx, y, cw, h, out); cx += cw; }); }
  else { const s = n.v.reduce((a,c) => a + 1/rho(c), 0); let cy = y; n.v.forEach(c => { const ch = h * (1/rho(c)) / s; leaves(c, x, cy, w, ch, out); cy += ch; }); }
}
function genNode(ctx, depth, stackOK) {
  const x = rand();
  if (depth === 0 || x < .5) return {leaf: pickRatio(ctx)};
  if (stackOK && x < .8) return {v: Array.from({length: rand() < .8 ? 2 : 3}, () => genNode(ctx, depth - 1, false))};
  return {h: [genNode(ctx, depth - 1, true), genNode(ctx, depth - 1, true)]};
}
function okBlock(b, H) { const out = []; leaves(b, 0, 0, H * rho(b), H, out); return out.every(r => r.h >= 12 && r.w >= 22); }
const genMid = ctx => { for (;;) { const c = ctx.slice(), b = genNode(c, 2, true); if (okBlock(b, HM)) { ctx.splice(0, ctx.length, ...c); return b; } } };
const genEdge = (ctx, H) => { for (;;) { const c = ctx.slice(), b = rand() < .1 ? {v: [{leaf: pickRatio(c)}, {leaf: pickRatio(c)}]} : {leaf: pickRatio(c)}; if (okBlock(b, H)) { ctx.splice(0, ctx.length, ...c); return b; } } };
function makeSeq(H, target, tol, gen) { // blocks whose natural widths sum to target ±tol (scaled to fit by flex)
  let best = null, bestErr = Infinity;
  for (let t = 0; t < 3000; t++) {
    const ctx = [], list = []; let sum = 0;
    while (sum < target * (1 - tol)) { const b = gen(ctx); list.push(b); sum += H * rho(b); }
    const err = Math.abs(sum - target) / target;
    if (err < bestErr) { best = list; bestErr = err; if (err <= tol) break; }
  }
  return best;
}
function rangeList(lo, hi, h) {
  for (;;) { const ctx = [], list = []; let s = 0; while (s * h < lo) { list.push(pickRatio(ctx)); s += TILE_RATIOS[list[list.length-1]]; } if (s * h <= hi) return list; }
}
const sumOf = list => list.reduce((a,k) => a + TILE_RATIOS[k], 0);
function splitHeight() { // 2 or 3 rows summing to HM
  for (;;) {
    if (rand() < .4) { const a = 18 + rand()*12; return [a, HM - a]; }
    const a = 14 + rand()*5, b = 14 + rand()*(34 - a - 14 + 5); if (HM - a - b >= 14) return [a, b, HM - a - b];
  }
}
function layerEvents(blocks, H, y0, total, out = []) {
  const s = total / blocks.reduce((a,b) => a + H * rho(b), 0); let x = 0;
  blocks.forEach(b => { const bw = H * rho(b) * s, lv = []; leaves(b, x, y0, bw, H, lv); lv.forEach(r => out.push({x: r.x, y0: r.y, y1: r.y + r.h}, {x: r.x + r.w, y0: r.y, y1: r.y + r.h})); x += bw; });
  return out;
}
function hasLongSeam(ev) { // an edge running unbroken through ≥55svh?
  return ev.some(e => {
    const iv = ev.filter(f => { const d = Math.abs(f.x - e.x); return Math.min(d, T - d) < 1.2; }).map(f => [f.y0, f.y1]).sort((a,b) => a[0] - b[0]);
    let cur = null, best = 0;
    for (const [a,b] of iv) { if (cur && a <= cur[1] + .01) cur[1] = Math.max(cur[1], b); else cur = [a,b]; best = Math.max(best, cur[1] - cur[0]); }
    return best >= 55;
  });
}
const shifted = (ev, d) => ev.map(e => ({x: (((e.x - d) % T) + T) % T, y0: e.y0, y1: e.y1}));
function chooseShift(layerEv, midEv) { for (let i = 0; i < 4000; i++) { const d = rand() * T; if (!hasLongSeam(shifted(layerEv, d).concat(midEv))) return d; } return 0; }
function buildPlan() {
  const mk = (H, target, tol, gen) => makeSeq(H, target, tol, gen);
  const plan = {top: mk(HT, T, .003, c => genEdge(c, HT)), bottom: mk(HB, T, .003, c => genEdge(c, HB)), mid: []};
  const free = T - PANEL - 3*ISL, wts = [0,1,2,3].map(() => .7 + rand()*.6), ws = wts.reduce((a,b) => a + b, 0), midEv = [];
  let x = 0, si = 0;
  for (const o of ["seg","reel","seg","about","seg","rightnow","seg","contact"]) {
    if (o === "seg") { const w = free * wts[si++] / ws; const blocks = mk(HM, w, .006, genMid); plan.mid.push({kind:"seg", w, blocks});
      const ev = layerEvents(blocks, HM, HT, w); ev.forEach(e => midEv.push({x: e.x + x, y0: e.y0, y1: e.y1})); x += w; }
    else if (o === "reel") { plan.mid.push({kind:"reel", w: PANEL}); midEv.push({x, y0: HT, y1: HT+HM}, {x: x+PANEL, y0: HT, y1: HT+HM}); x += PANEL; }
    else {
      const isl = {kind: o, w: ISL, L: [], R: []};
      for (const side of ["L","R"]) { let y = HT; splitHeight().forEach(h => { const list = rangeList(26, 52, h), wd = sumOf(list) * h;
        const x0 = side === "L" ? x : x + ISL - wd; let c = 0; for (const k of [...list, null]) { midEv.push({x: x0 + c*h, y0: y, y1: y + h}); if (k) c += TILE_RATIOS[k]; }
        isl[side].push({h, list}); y += h; }); }
      plan.mid.push(isl); x += ISL;
    }
  }
  plan.dT = chooseShift(layerEvents(plan.top, HT, 0, T), midEv); plan.dB = chooseShift(layerEvents(plan.bottom, HB, HT+HM, T), midEv);
  return plan;
}
//--pure-end
const lastPick = {};
function pickProject(ratio) { // random project of this ratio, never the same twice in a row
  const list = projects.filter(p => p.ratio === ratio); let i;
  do { i = Math.floor(rand() * list.length); } while (list.length > 1 && i === lastPick[ratio]);
  lastPick[ratio] = i; return list[i];
}
const tone = () => `--t:${Math.floor(rand() * 6)};`; // placeholder colour only
function nodeHTML(n, parent) { // flex-grow = ratio along rows, 1/ratio down columns → exact proportions
  const flex = parent === "col" ? 1 / rho(n) : rho(n);
  if (n.leaf) return tile(pickProject(n.leaf), "wall-tile", false, `${tone()}flex:${(flex*1000).toFixed(3)} 1 0`);
  const dir = n.h ? "row" : "col";
  return `<div class="cx ${dir}" style="flex:${(flex*1000).toFixed(3)} 1 0">${(n.h || n.v).map(c => nodeHTML(c, dir)).join("")}</div>`;
}
const exact = list => list.map(k => tile(pickProject(k), "wall-tile", false, `${tone()}flex:0 0 calc(var(--h) * ${TILE_RATIOS[k]})`)).join("");
const layerHTML = (blocks, H, shift) => `<div class="layer strip" style="--h:${H}svh;transform:translateX(-${shift}svh)">${blocks.map(b => nodeHTML(b, "layer")).join("")}</div>`;
  const configs = {
    about: {
      bands:[
        {left:["2-35","1"],right:["16-9","4-3"]},
        {left:["16-9","4-3"],right:["2-35","1"]},
        {left:["1","4-3"],right:["2-35","16-9"]},
        {left:["4-3","1"],right:["1","2-35"]},
        {left:["2-35","16-9"],right:["4-3","1"]}
      ],
      copy:`<span class="kicker">BEHIND THE CAMERA</span><h1>Lucas<br>Lindgren<span>.</span></h1><p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>`
    },
    rightnow: {
      bands:[
        {left:["4-3","1"],right:["2-35","16-9"]},
        {left:["2-35","1"],right:["16-9","4-3"]},
        {left:["1","4-3"],right:["16-9","2-35"]},
        {left:["2-35","16-9"],right:["4-3","1"]},
        {left:["16-9","4-3"],right:["2-35","1"]}
      ],
      copy:`<span class="kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2><div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>`
    },
    contact: {
      bands:[
        {left:["16-9","4-3"],right:["2-35","1"]},
        {left:["2-35","1"],right:["4-3","16-9"]},
        {left:["1","2-35"],right:["16-9","4-3"]},
        {left:["4-3","1"],right:["2-35","16-9"]},
        {left:["2-35","16-9"],right:["1","4-3"]}
      ],
      copy:`<span class="kicker">HAVE SOMETHING IN MIND?</span><h2>Let's make<br>something<span>.</span></h2><a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a><span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>`
    }
  };
const infoPanel = kind => `<div class="info-copy" data-anchor="${kind}">${configs[kind].copy}</div>`;
function segHTML(s) {
  if (s.kind === "reel") return reelTile();
  if (s.kind === "seg") return `<div class="mseg" style="width:${s.w}svh">${s.blocks.map(b => nodeHTML(b, "layer")).join("")}</div>`;
  const side = rows => rows.map(r => `<div class="mrow" style="--h:${r.h}svh">${exact(r.list)}</div>`).join("");
  return `<div class="island" style="width:${ISL}svh"><div class="iside l">${side(s.L)}</div><div class="iside r">${side(s.R)}</div>${infoPanel(s.kind)}</div>`;
}
// Built once and repeated 3× so the loop join is invisible.
const plan = buildPlan();
const RUN_HTML = layerHTML(plan.top, HT, plan.dT) + `<div class="mid">${plan.mid.map(segHTML).join("")}</div>` + layerHTML(plan.bottom, HB, plan.dB);
const renderRun = copy => `<div class="world-run" data-copy="${copy}">${RUN_HTML}</div>`;


function render() {
  track.innerHTML = [0,1,2].map(renderRun).join("");
}

function middleRun() {
  return track.querySelector('.world-run[data-copy="1"]');
}

function stopActive() {
  clearTimeout(noteTimer);
  clearTimeout(dimTimer);
  document.body.classList.remove("dim");
  noteBox.classList.remove("visible");
  if (activeTile) {
    activeTile.classList.remove("is-active");
    if (activeTile.classList.contains("reel-tile") && !activeTile.classList.contains("is-full")) {
      activeTile.querySelector(".reel-frame")?.remove();
      activeTile.classList.remove("is-playing");
    }
    const video = activeTile.querySelector(".hover-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
  activeTile = null;
  document.body.classList.remove("has-active");
}

function showNote(tileNode) {
  if (!tileNode.dataset.note) return;
  noteKicker.textContent = tileNode.dataset.noteType || "A NOTE";
  noteText.textContent = tileNode.dataset.note;
  noteBox.classList.add("visible");
}

function mountReel(tileNode, full = false) {
  tileNode.querySelector(".reel-frame")?.remove();
  const iframe = document.createElement("iframe");
  iframe.className = "reel-frame";
  iframe.title = "Lucas Lindgren cinematography showreel";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.src = full
    ? `https://player.vimeo.com/video/${REEL_ID}?autoplay=1&controls=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1`
    : `https://player.vimeo.com/video/${REEL_ID}?autoplay=1&muted=1&background=1&loop=1&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1`;
  tileNode.appendChild(iframe);
  tileNode.classList.add("is-playing");
  tileNode.classList.toggle("is-full", full);
}

function activate(tileNode) {
  if (!tileNode || activeTile === tileNode) return;
  stopActive();
  activeTile = tileNode;
  tileNode.classList.add("is-active");
  document.body.classList.add("has-active");
  if (tileNode.classList.contains("reel-tile")) {
    mountReel(tileNode, false);
  } else {
    tileNode.querySelector(".hover-video")?.play().catch(() => {});
  }
  noteTimer = window.setTimeout(() => showNote(tileNode), 650);
  clearTimeout(dimTimer);
  dimTimer = window.setTimeout(() => document.body.classList.add("dim"), 800);
}

function openReel(tileNode) {
  if (activeTile !== tileNode) {
    stopActive();
    activeTile = tileNode;
    tileNode.classList.add("is-active");
    document.body.classList.add("has-active");
  }
  mountReel(tileNode, true);
}

function bindTiles() {
  track.querySelectorAll(".tile").forEach(tileNode => {
    tileNode.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => activate(tileNode), 180);
    });
    tileNode.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      if (activeTile === tileNode && !tileNode.classList.contains("is-full")) stopActive();
    });
    tileNode.addEventListener("focus", () => activate(tileNode));
    tileNode.addEventListener("blur", () => {
      if (activeTile === tileNode && !tileNode.classList.contains("is-full")) stopActive();
    });
    tileNode.addEventListener("click", event => {
      if (event.target.closest("a")) return;
      if (tileNode.classList.contains("reel-tile")) {
        openReel(tileNode);
      } else {
        const project = projects.find(item => item.id === tileNode.dataset.id);
        if (project?.video) window.open(project.video, "_blank", "noopener");
      }
    });
    tileNode.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (tileNode.classList.contains("reel-tile")) openReel(tileNode);
      }
    });
  });
}

function measure() {
  const first = track.querySelector('.world-run[data-copy="0"]');
  const middle = middleRun();
  const reel = middle?.querySelector(".reel-tile");
  if (!first || !middle || !reel) return;
  cycleWidth = middle.getBoundingClientRect().left - first.getBoundingClientRect().left;
  const rect = reel.getBoundingClientRect();
  const center = rect.left - viewport.getBoundingClientRect().left + viewport.scrollLeft + rect.width / 2;
  const initial = cycleWidth + center - viewport.clientWidth / 2;
  viewport.scrollLeft = initial;
  targetScroll = initial;
}

function rebase() {
  if (!cycleWidth) return;
  const current = viewport.scrollLeft;
  if (current < cycleWidth * .5) {
    viewport.scrollLeft = current + cycleWidth;
    targetScroll += cycleWidth;
  } else if (current > cycleWidth * 1.5) {
    viewport.scrollLeft = current - cycleWidth;
    targetScroll -= cycleWidth;
  }
}

function animate() {
  const current = viewport.scrollLeft;
  const delta = targetScroll - current;
  const factor = 1 - Math.pow(.001, 16 / 1000);
  if (Math.abs(delta) < .5) {
    viewport.scrollLeft = targetScroll;
    rebase();
    animationFrame = 0;
    return;
  }
  viewport.scrollLeft = current + delta * factor;
  rebase();
  animationFrame = requestAnimationFrame(animate);
}

function scrollToX(value) {
  targetScroll = value;
  if (!animationFrame) animationFrame = requestAnimationFrame(animate);
}

function goToAnchor(name) {
  const node = middleRun()?.querySelector(`[data-anchor="${name}"]`);
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  scrollToX(viewport.scrollLeft + center - viewport.clientWidth / 2);
}

function goToReel() {
  const node = middleRun()?.querySelector(".reel-tile");
  if (!node) return;
  const rect = node.getBoundingClientRect();
  scrollToX(viewport.scrollLeft + rect.left + rect.width / 2 - viewport.clientWidth / 2);
}

viewport.addEventListener("wheel", event => {
  let dx = event.deltaX;
  let dy = event.deltaY;
  if (event.deltaMode === 1) { dx *= 16; dy *= 16; }
  if (event.deltaMode === 2) { dx *= viewport.clientWidth; dy *= viewport.clientWidth; }
  const amount = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  if (!amount) return;
  event.preventDefault();
  scrollToX(targetScroll + amount * 1.2);
}, {passive:false});

viewport.addEventListener("scroll", () => {
  if (!animationFrame) rebase();
});

viewport.addEventListener("pointerdown", event => {
  if (event.pointerType === "touch" || event.target.closest(".tile,.info-copy,.main-nav")) return;
  dragging = true;
  dragX = event.clientX;
  dragScroll = viewport.scrollLeft;
  viewport.classList.add("is-dragging");
  viewport.setPointerCapture(event.pointerId);
  stopActive();
});
viewport.addEventListener("pointermove", event => {
  if (!dragging) return;
  viewport.scrollLeft = dragScroll - (event.clientX - dragX);
  targetScroll = viewport.scrollLeft;
  rebase();
});
function endDrag() {
  dragging = false;
  viewport.classList.remove("is-dragging");
}
viewport.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);

viewport.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") { event.preventDefault(); scrollToX(targetScroll + 420); }
  if (event.key === "ArrowLeft") { event.preventDefault(); scrollToX(targetScroll - 420); }
  if (event.key === "Home") { event.preventDefault(); goToReel(); }
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const destination = button.dataset.go;
    if (destination === "showreel") goToReel();
    else goToAnchor(destination);
  });
});

render();
bindTiles();
requestAnimationFrame(measure);
window.addEventListener("resize", () => requestAnimationFrame(measure));

/* Horizontal motion blur: strength follows scroll speed, filter is removed when still. */
document.body.insertAdjacentHTML("beforeend", '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mblur" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feGaussianBlur id="mblurStd" stdDeviation="0 0"/></filter></svg>');
(function motionBlur() {
  const std = document.querySelector("#mblurStd");
  let last = viewport.scrollLeft, amt = 0, on = false;
  (function loop() {
    const x = viewport.scrollLeft; let dx = x - last; last = x;
    if (cycleWidth && Math.abs(dx) > cycleWidth * 0.3) dx = 0; // ignore the loop jump
    const target = Math.min(14, Math.abs(dx) * 0.35);
    amt += (target - amt) * (target > amt ? 0.5 : 0.25);
    if (amt > 0.4) { std.setAttribute("stdDeviation", amt.toFixed(2) + " 0"); if (!on) { viewport.style.filter = "url(#mblur)"; on = true; } }
    else if (on) { viewport.style.filter = ""; on = false; amt = 0; }
    requestAnimationFrame(loop);
  })();
})();
