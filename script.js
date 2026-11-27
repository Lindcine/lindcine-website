/* LINDCINE v26 — organic edge-to-edge horizontal film wall.
   Edit the projects array to add real stills, previews and links. */
const REEL_ID = "994186610";
const REEL_RATIO = 2.35;

const projects = [
  {id:"doc",title:"The Beauty Of Gold",ratio:"2-35",platform:"vimeo",videoId:"746774915",video:"https://vimeo.com/746774915",image:"https://vumbnail.com/746774915.jpg",note:"Gold, light and the details between.",noteType:"A STUDY IN LIGHT"},
  {id:"commercial",title:"Lukas Graham",ratio:"16-9",platform:"youtube",videoId:"sKuBbALwygs",video:"https://www.youtube.com/watch?v=sKuBbALwygs",image:"https://img.youtube.com/vi/sKuBbALwygs/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/sKuBbALwygs/hqdefault.jpg",note:"A beat, a face, a moment that stays.",noteType:"MUSIC & MOVEMENT"},
  {id:"light",title:"KTH, Oscar",ratio:"4-3",platform:"youtube",videoId:"XnGmN8iuQmk",video:"https://www.youtube.com/watch?v=XnGmN8iuQmk",image:"https://img.youtube.com/vi/XnGmN8iuQmk/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/XnGmN8iuQmk/hqdefault.jpg",note:"An idea begins with a conversation.",noteType:"A PORTRAIT"},
  {id:"people",title:"Lärargalan 2023",ratio:"16-9",platform:"youtube",videoId:"f3GqDRXFZ_Y",video:"https://www.youtube.com/watch?v=f3GqDRXFZ_Y",image:"https://img.youtube.com/vi/f3GqDRXFZ_Y/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/f3GqDRXFZ_Y/hqdefault.jpg",note:"A room full of people making a difference.",noteType:"A NIGHT TO REMEMBER"},
  {id:"wedding",title:"Spritfabriken",ratio:"16-9",platform:"youtube",videoId:"q4J1hM7gOYU",video:"https://www.youtube.com/watch?v=q4J1hM7gOYU",image:"https://img.youtube.com/vi/q4J1hM7gOYU/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/q4J1hM7gOYU/hqdefault.jpg",note:"Character lives in the details.",noteType:"A SENSE OF PLACE"},
  {id:"narrative",title:"Vattenfall, Fjärrvärme",ratio:"16-9",platform:"vimeo",videoId:"772037309",video:"https://vimeo.com/772037309",image:"https://vumbnail.com/772037309.jpg",note:"Energy, just beneath the surface.",noteType:"A DIFFERENT CURRENT"},
  {id:"selected",title:"Aleris, Art Clinic",ratio:"16-9",platform:"youtube",videoId:"O1T5kZkfx6U",video:"https://www.youtube.com/watch?v=O1T5kZkfx6U",image:"https://img.youtube.com/vi/O1T5kZkfx6U/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/O1T5kZkfx6U/hqdefault.jpg",note:"Quiet precision. Human stories.",noteType:"PEOPLE FIRST"},
  {id:"landscape",title:"Ryder's Cup",ratio:"1",platform:"instagram",videoId:"CxutZ-Rt6jQ",video:"https://www.instagram.com/reel/CxutZ-Rt6jQ/",image:"https://www.instagram.com/p/CxutZ-Rt6jQ/media/?size=l",note:"A moment inside the noise.",noteType:"ON LOCATION",posterText:"RC"},
  {id:"brand",title:"Skånetrafiken",ratio:"16-9",platform:"youtube",videoId:"UMjSnObIrWg",video:"https://www.youtube.com/watch?v=UMjSnObIrWg",image:"https://img.youtube.com/vi/UMjSnObIrWg/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/UMjSnObIrWg/hqdefault.jpg",note:"The everyday, in motion.",noteType:"A REGION IN MOTION"},
  {id:"bts",title:"Demokrati Pågår",ratio:"16-9",platform:"youtube",videoId:"DoNzgCG3Fgs",video:"https://www.youtube.com/watch?v=DoNzgCG3Fgs",image:"https://img.youtube.com/vi/DoNzgCG3Fgs/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/DoNzgCG3Fgs/hqdefault.jpg",note:"A big idea, brought down to earth.",noteType:"IDEAS IN ACTION"},
  {id:"campaign",title:"Demokrativerkstaden",ratio:"4-3",platform:"youtube",videoId:"voEMRubg3p8",video:"https://www.youtube.com/watch?v=voEMRubg3p8",image:"https://img.youtube.com/vi/voEMRubg3p8/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/voEMRubg3p8/hqdefault.jpg",note:"Democracy is something we do together.",noteType:"PARTICIPATION"},
  {id:"events",title:"Uppdrag Ledamot",ratio:"16-9",platform:"youtube",videoId:"g80oZRFmm_E",video:"https://www.youtube.com/watch?v=g80oZRFmm_E",image:"https://img.youtube.com/vi/g80oZRFmm_E/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/g80oZRFmm_E/hqdefault.jpg",note:"A closer look at the work behind the role.",noteType:"BEHIND THE ROLE"},
  {id:"chasing",title:"Väddö",ratio:"2-35",platform:"youtube",videoId:"uZfV9U9B7TA",video:"https://www.youtube.com/watch?v=uZfV9U9B7TA",image:"https://img.youtube.com/vi/uZfV9U9B7TA/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/uZfV9U9B7TA/hqdefault.jpg",note:"A place, a rhythm, a little breathing room.",noteType:"A SMALL OBSERVATION"},
  {id:"music",title:"KTH, Innovation",ratio:"16-9",platform:"youtube",videoId:"wR9AfemNIOM",video:"https://www.youtube.com/watch?v=wR9AfemNIOM",image:"https://img.youtube.com/vi/wR9AfemNIOM/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/wR9AfemNIOM/hqdefault.jpg",note:"Curiosity turning into possibility.",noteType:"A STARTING POINT"},
  {id:"docfilm",title:"Skin — Short Film",ratio:"2-35",platform:"vimeo",videoId:"239191351",video:"https://vimeo.com/239191351",image:"https://vumbnail.com/239191351.jpg",note:"A story told in gestures and atmosphere.",noteType:"SHORT FILM"},
];

const track = document.querySelector("#worldTrack");
const viewport = document.querySelector("#work");
const noteBox = document.querySelector("#hoverNote");
const noteKicker = noteBox.querySelector("span");
const noteText = noteBox.querySelector("p");
const projectModal = document.querySelector("#projectModal");
const projectModalFrame = document.querySelector("#projectModalFrame");
const projectModalTitle = document.querySelector("#projectModalTitle");
const projectModalLink = document.querySelector("#projectModalLink");
let lastFocusedTile = null;

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
let motionBlurBoost = 1;

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));

function thumbnailFor(project) {
  if (!project.image) return null;
  const fallbacks = project.fallbackImage ? [project.fallbackImage] : [];
  return {
    src: project.image,
    fallbacks: [...new Set(fallbacks)].filter(url => url !== project.image)
  };
}

function tile(project, extra = "", tall = false, placement = "", tileRatio = project.ratio) {
  const ratio = tall ? "tile-tall" : `ratio-${tileRatio}`;
  const thumb = thumbnailFor(project);
  const image = thumb
    ? `<img class="tile-poster" src="${esc(thumb.src)}" data-fallbacks="${esc(thumb.fallbacks.join("|"))}" data-placeholder="${esc(project.posterText || "L.")}" alt="${esc(project.title)}" loading="lazy" decoding="async">`
    : `<span class="placeholder-mark" aria-hidden="true">${esc(project.posterText || "L.")}</span>`;
  const preview = project.preview
    ? `<video class="hover-video" muted loop playsinline preload="none" src="${esc(project.preview)}"></video>`
    : "";
  const platformData = project.platform
    ? `data-platform="${esc(project.platform)}" data-video-id="${esc(project.videoId)}" data-video-url="${esc(project.video)}"`
    : "";
  const note = project.note
    ? `data-note="${esc(project.note)}" data-note-type="${esc(project.noteType || "A NOTE")}"`
    : "";
  return `<article class="tile ${ratio} ${extra}" style="${placement}" data-id="${esc(project.id)}" data-ratio="${esc(tileRatio)}" ${platformData} ${note} tabindex="0" role="button" aria-label="${esc(project.title)}">
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
const WEIGHTS = [["16-9",.40],["2-35",.23],["1",.21],["4-3",.16]]; // landscape-led, with a genuine mix of all four formats
const SMALL = new Set(["1","4-3"]);
const T = 2400, HT = 26, HM = 48, HB = 26, PANEL = REEL_RATIO*HM, ISL = 210;
let seed = 20264;
const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
function pickRatio(ctx) {
  for (;;) {
    let x = rand(), acc = 0, k = "16-9";
    for (const [key, w] of WEIGHTS) { acc += w; if (x < acc) { k = key; break; } }
    const a = ctx[ctx.length-1], b = ctx[ctx.length-2];
    if (SMALL.has(k) && SMALL.has(a) && SMALL.has(b)) continue;
    if (k === "2-35" && a === k) continue; // avoid adjacent panorama cards in the same run
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
  if (depth === 0 || x < .28) return {leaf: pickRatio(ctx)};
  if (stackOK && x < .66) {
    const count = rand() < .88 ? 2 : 3;
    return {v: Array.from({length: count}, () => genNode(ctx, depth - 1, false))};
  }
  return {h: [genNode(ctx, depth - 1, true), genNode(ctx, depth - 1, true)]};
}
function okBlock(b, H) {
  const out = [];
  leaves(b, 0, 0, H * rho(b), H, out);
  return out.length > 0 && out.every(r => r.h >= 12 && r.w >= 22);
}
const genMid = ctx => {
  for (let tries = 0; ; tries++) {
    const c = ctx.slice();
    const depth = rand() < .28 ? 3 : 2;
    const b = genNode(c, depth, true);
    if (okBlock(b, HM)) { ctx.splice(0, ctx.length, ...c); return b; }
    if (tries > 5000) { const fallback = {leaf: pickRatio(ctx)}; return fallback; }
  }
};
const genEdge = (ctx, H) => {
  for (let tries = 0; ; tries++) {
    const c = ctx.slice();
    const mode = rand();
    let b;
    if (mode < .43) {
      // A loose horizontal run of 2–3 full-height tiles gives the outer
      // bands more internal rhythm without introducing gaps or distortion.
      const count = rand() < .62 ? 2 : 3;
      b = {h:Array.from({length:count}, () => ({leaf:pickRatio(c)}))};
    } else if (mode < .60) {
      // Occasional two-tier stack; alternate the two wide formats so the
      // stacked pair does not read like duplicated cards.
      const first = rand() < .66 ? "16-9" : "2-35";
      const second = first === "16-9" ? "2-35" : "16-9";
      c.push(first,second);
      b = {v:[{leaf:first},{leaf:second}]};
    } else if (mode < .90) {
      b = genNode(c, rand() < .7 ? 2 : 3, true);
    } else {
      b = {leaf:pickRatio(c)};
    }
    if (okBlock(b, H)) { ctx.splice(0, ctx.length, ...c); return b; }
    if (tries > 5000) { const fallback = {leaf: pickRatio(ctx)}; return fallback; }
  }
};
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
function rangeList(lo, hi, h, context = []) {
  for (;;) {
    const nextContext = context.slice(), list = [];
    let s = 0;
    while (s * h < lo) {
      list.push(pickRatio(nextContext));
      s += TILE_RATIOS[list[list.length-1]];
    }
    if (s * h <= hi) {
      context.splice(0, context.length, ...nextContext);
      return list;
    }
  }
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
function hasLongSeam(ev) { // reject an almost-continuous vertical edge ≥55svh
  const sorted = ev.map(e => ({
    x: ((e.x % T) + T) % T,
    y0: e.y0,
    y1: e.y1
  })).sort((a,b) => a.x - b.x);
  const groups = [];
  for (const e of sorted) {
    let g = groups[groups.length - 1];
    if (!g || e.x - g.startX >= 1.2) {
      g = {startX:e.x, intervals:[]};
      groups.push(g);
    }
    g.intervals.push([e.y0,e.y1]);
  }
  // Also test edges that coincide across the infinite-loop seam at x=0/T.
  if (groups.length > 1 && groups[0].startX + T - sorted[sorted.length-1].x < 1.2) {
    groups[0].intervals.push(...groups.pop().intervals);
  }
  for (const g of groups) {
    const intervals = g.intervals.sort((a,b) => a[0] - b[0]);
    let cur = null, best = 0;
    for (const [a,b] of intervals) {
      if (cur && a <= cur[1] + .01) cur[1] = Math.max(cur[1],b);
      else cur = [a,b];
      best = Math.max(best,cur[1]-cur[0]);
      if (best >= 55) return true;
    }
  }
  return false;
}
const shifted = (ev, d) => ev.map(e => ({x: (((e.x - d) % T) + T) % T, y0: e.y0, y1: e.y1}));
function chooseShift(layerEv, midEv) { for (let i = 0; i < 4000; i++) { const d = rand() * T; if (!hasLongSeam(shifted(layerEv, d).concat(midEv))) return d; } return 0; }
function buildPlan() {
  const mk = (H, target, tol, gen) => makeSeq(H, target, tol, gen);
  const plan = {top: mk(HT, T, .0003, c => genEdge(c, HT)), bottom: mk(HB, T, .0003, c => genEdge(c, HB)), mid: []};
  const free = T - PANEL - 3*ISL, wts = [0,1,2,3].map(() => .7 + rand()*.6), ws = wts.reduce((a,b) => a + b, 0), midEv = [];
  let x = 0, si = 0;
  for (const o of ["seg","reel","seg","about","seg","rightnow","seg","contact"]) {
    if (o === "seg") { const w = free * wts[si++] / ws; const blocks = mk(HM, w, .0005, genMid); plan.mid.push({kind:"seg", w, blocks});
      const ev = layerEvents(blocks, HM, HT, w); ev.forEach(e => midEv.push({x: e.x + x, y0: e.y0, y1: e.y1})); x += w; }
    else if (o === "reel") { plan.mid.push({kind:"reel", w: PANEL}); midEv.push({x, y0: HT, y1: HT+HM}, {x: x+PANEL, y0: HT, y1: HT+HM}); x += PANEL; }
    else {
      const isl = {kind: o, w: ISL, L: [], R: []};
      for (const side of ["L","R"]) {
        let y = HT;
        const sideContext = [];
        splitHeight().forEach(h => {
          const list = rangeList(26, 52, h, sideContext), wd = sumOf(list) * h;
          const x0 = side === "L" ? x : x + ISL - wd;
          let c = 0;
          for (const k of [...list, null]) {
            midEv.push({x: x0 + c*h, y0: y, y1: y + h});
            if (k) c += TILE_RATIOS[k];
          }
          isl[side].push({h, list});
          y += h;
        });
      }
      plan.mid.push(isl); x += ISL;
    }
  }
  plan.dT = chooseShift(layerEvents(plan.top, HT, 0, T), midEv); plan.dB = chooseShift(layerEvents(plan.bottom, HB, HT+HM, T), midEv);
  return plan;
}
//--pure-end
// Each clip is reserved for tiles with the same declared aspect ratio.
// Separate shuffled bags keep the wall varied without mixing formats.
const ratioKeys = Object.keys(TILE_RATIOS);
const projectPools = Object.fromEntries(ratioKeys.map(ratio => [
  ratio,
  projects.filter(p => p.ratio === ratio && p.platform && p.video && p.image)
]));
const projectBags = Object.fromEntries(ratioKeys.map(ratio => [ratio, []]));
const lastProjectByRatio = {};
function pickProject(tileRatio) {
  const pool = projectPools[tileRatio] || [];
  if (!pool.length) throw new Error(`No project supplied for tile ratio ${tileRatio}`);
  if (!projectBags[tileRatio].length) {
    const freshBag = pool.slice();
    for (let i = freshBag.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [freshBag[i], freshBag[j]] = [freshBag[j], freshBag[i]];
    }
    if (freshBag.length > 1 && freshBag[freshBag.length - 1].id === lastProjectByRatio[tileRatio]) {
      [freshBag[0], freshBag[freshBag.length - 1]] = [freshBag[freshBag.length - 1], freshBag[0]];
    }
    projectBags[tileRatio] = freshBag;
  }
  const project = projectBags[tileRatio].pop();
  lastProjectByRatio[tileRatio] = project.id;
  return project;
}
const tone = () => `--t:${Math.floor(rand() * 6)};`;
function nodeHTML(n, parent) { // tile geometry follows the layout ratio, artwork may come from any project
  const flex = parent === "col" ? 1 / rho(n) : rho(n);
  if (n.leaf) return tile(pickProject(n.leaf), "wall-tile", false, `${tone()}flex:${(flex*1000).toFixed(3)} 1 0`, n.leaf);
  const dir = n.h ? "row" : "col";
  return `<div class="cx ${dir}" style="flex:${(flex*1000).toFixed(3)} 1 0">${(n.h || n.v).map(c => nodeHTML(c, dir)).join("")}</div>`;
}
const exact = list => list.map(k => tile(pickProject(k), "wall-tile", false, `${tone()}flex:0 0 calc(var(--h) * ${TILE_RATIOS[k]})`, k)).join("");
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

function setWallGradientPositions() {
  track.querySelectorAll(".world-run").forEach(run => {
    const runRect = run.getBoundingClientRect();
    const runWidth = runRect.width || run.offsetWidth;
    if (!runWidth) return;

    run.querySelectorAll(".tile").forEach(tile => {
      const rect = tile.getBoundingClientRect();
      const x = Math.max(0, Math.min(runWidth - rect.width, rect.left - runRect.left));
      tile.style.setProperty("--wall-gradient-width", `${runWidth}px`);
      tile.style.setProperty("--wall-gradient-x", `${-x}px`);
    });
  });
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
    activeTile.querySelector(".tile-preview-frame")?.remove();
    const video = activeTile.querySelector(".hover-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
  activeTile = null;
  document.body.classList.remove("has-active");
}

const NOTE_POSITIONS = ["bottom-left","bottom-right","top-left","top-right","mid-left","mid-right"];
let lastNotePosition = "";
function showNote(tileNode) {
  if (!tileNode.dataset.note) return;
  noteKicker.textContent = tileNode.dataset.noteType || "A NOTE";
  noteText.textContent = tileNode.dataset.note;
  const options = NOTE_POSITIONS.filter(position => position !== lastNotePosition);
  const position = options[Math.floor(rand() * options.length)];
  lastNotePosition = position;
  noteBox.dataset.position = position;
  noteBox.classList.remove("visible");
  // Restart the small reveal transition even when two notes appear quickly.
  void noteBox.offsetWidth;
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

function projectEmbedUrl(project, mode = "preview") {
  const preview = mode === "preview";
  if (project.platform === "youtube") {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: preview ? "1" : "0",
      controls: preview ? "0" : "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      iv_load_policy: "3",
      disablekb: preview ? "1" : "0"
    });
    if (preview) {
      params.set("loop", "1");
      params.set("playlist", project.videoId);
    }
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.videoId)}?${params.toString()}`;
  }
  if (project.platform === "vimeo") {
    const params = new URLSearchParams({
      autoplay: "1",
      muted: preview ? "1" : "0",
      background: preview ? "1" : "0",
      loop: preview ? "1" : "0",
      autopause: "0",
      title: "0",
      byline: "0",
      portrait: "0",
      dnt: "1",
      playsinline: "1",
      controls: preview ? "0" : "1"
    });
    return `https://player.vimeo.com/video/${encodeURIComponent(project.videoId)}?${params.toString()}`;
  }
  if (project.platform === "instagram") {
    // Instagram's public embed is the best available fallback; its own
    // player controls autoplay, so hover autoplay cannot be guaranteed.
    return `https://www.instagram.com/reel/${encodeURIComponent(project.videoId)}/embed/`;
  }
  return project.preview || "";
}

function fitPreviewFrame(frame, tileNode, project) {
  if (project.platform === "instagram") {
    frame.style.width = "100%";
    frame.style.height = "100%";
    return;
  }
  const rect = tileNode.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const tileRatio = rect.width / rect.height;
  const playerRatio = TILE_RATIOS[project.ratio] || (16 / 9);
  if (tileRatio > playerRatio) {
    frame.style.width = `${rect.width}px`;
    frame.style.height = `${rect.width / playerRatio}px`;
  } else {
    frame.style.height = `${rect.height}px`;
    frame.style.width = `${rect.height * playerRatio}px`;
  }
}

function mountProjectPreview(tileNode, project) {
  if (tileNode.dataset.ratio !== project.ratio) return;
  tileNode.querySelector(".tile-preview-frame")?.remove();
  const frame = document.createElement("iframe");
  frame.className = `tile-preview-frame ${project.platform}-preview-frame`;
  frame.title = `${project.title} preview`;
  frame.loading = "eager";
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.tabIndex = -1;
  frame.src = projectEmbedUrl(project, "preview");
  frame.style.pointerEvents = "none";
  fitPreviewFrame(frame, tileNode, project);
  tileNode.querySelector(".tile-media").appendChild(frame);
  tileNode.classList.add("has-embed-preview");
}

function openProjectPlayer(tileNode, project) {
  if (!project || !project.video) return;
  stopActive();
  lastFocusedTile = tileNode;
  projectModalTitle.textContent = project.title;
  projectModalLink.href = project.video;
  projectModalLink.textContent = project.platform === "instagram" ? "OPEN ON INSTAGRAM ↗" : `OPEN ON ${project.platform.toUpperCase()} ↗`;
  projectModalFrame.replaceChildren();

  const frame = document.createElement("iframe");
  frame.className = `project-player-frame ${project.platform}-player-frame`;
  frame.title = `${project.title} player`;
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen; web-share";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.src = projectEmbedUrl(project, "full");
  projectModalFrame.appendChild(frame);
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("player-open");
  projectModal.querySelector(".project-modal-close").focus({preventScroll:true});
}

function closeProjectPlayer() {
  if (!projectModal.classList.contains("open")) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  projectModalFrame.replaceChildren();
  document.body.classList.remove("player-open");
  if (lastFocusedTile?.isConnected) lastFocusedTile.focus({preventScroll:true});
  lastFocusedTile = null;
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
    const project = projects.find(item => item.id === tileNode.dataset.id);
    if (project?.platform && project.ratio === tileNode.dataset.ratio) mountProjectPreview(tileNode, project);
    else tileNode.querySelector(".hover-video")?.play().catch(() => {});
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
  track.querySelectorAll(".tile-poster").forEach(image => {
    image.addEventListener("error", () => {
      const fallbacks = (image.dataset.fallbacks || "").split("|").filter(Boolean);
      const next = fallbacks.shift();
      if (next) {
        image.dataset.fallbacks = fallbacks.join("|");
        image.src = next;
      } else {
        const media = image.closest(".tile-media");
        image.remove();
        if (media && !media.querySelector(".placeholder-mark")) {
          const mark = document.createElement("span");
          mark.className = "placeholder-mark";
          mark.setAttribute("aria-hidden", "true");
          mark.textContent = image.dataset.placeholder || "L.";
          media.prepend(mark);
        }
      }
    }, {once:false});
  });
  projectModal.querySelectorAll("[data-close-project]").forEach(node => {
    node.addEventListener("click", closeProjectPlayer);
  });
  projectModal.querySelector(".project-modal-close").addEventListener("click", closeProjectPlayer);
  projectModalLink.addEventListener("click", event => event.stopPropagation());
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeProjectPlayer();
  });
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
        if (project?.video) openProjectPlayer(tileNode, project);
      }
    });
    tileNode.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (tileNode.classList.contains("reel-tile")) openReel(tileNode);
        else {
          const project = projects.find(item => item.id === tileNode.dataset.id);
          if (project?.video) openProjectPlayer(tileNode, project);
        }
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
    motionBlurBoost = 1;
    return;
  }
  viewport.scrollLeft = current + delta * factor;
  rebase();
  animationFrame = requestAnimationFrame(animate);
}

function scrollToX(value, navigationFlight = false) {
  targetScroll = value;
  if (navigationFlight) motionBlurBoost = 1.25;
  if (!animationFrame) animationFrame = requestAnimationFrame(animate);
}

function goToAnchor(name) {
  const node = middleRun()?.querySelector(`[data-anchor="${name}"]`);
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  scrollToX(viewport.scrollLeft + center - viewport.clientWidth / 2, true);
}

function goToReel() {
  const node = middleRun()?.querySelector(".reel-tile");
  if (!node) return;
  const rect = node.getBoundingClientRect();
  scrollToX(viewport.scrollLeft + rect.left + rect.width / 2 - viewport.clientWidth / 2, true);
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
requestAnimationFrame(() => {
  measure();
  setWallGradientPositions();
});
window.addEventListener("resize", () => requestAnimationFrame(() => {
  measure();
  setWallGradientPositions();
}));

/* Subtle horizontal motion blur. Navigation flights get a small extra lift;
   the filter fades away as soon as horizontal movement settles. */
document.body.insertAdjacentHTML("beforeend", '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mblur" x="-18%" y="-8%" width="136%" height="116%" color-interpolation-filters="sRGB"><feGaussianBlur id="mblurStd" stdDeviation="0 0"/></filter></svg>');
(function motionBlur() {
  const std = document.querySelector("#mblurStd");
  let last = viewport.scrollLeft, amount = 0, active = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  (function loop() {
    const current = viewport.scrollLeft;
    let dx = current - last;
    last = current;
    if (cycleWidth && Math.abs(dx) > cycleWidth * .3) dx = 0; // ignore seamless-loop rebasing
    const target = reduced.matches ? 0 : Math.min(3.2, Math.abs(dx) * .065 * motionBlurBoost);
    amount += (target - amount) * (target > amount ? .38 : .17);
    if (amount > .28) {
      std.setAttribute("stdDeviation", `${amount.toFixed(2)} 0.025`);
      if (!active) { viewport.style.filter = "url(#mblur)"; active = true; }
    } else if (active) {
      std.setAttribute("stdDeviation", "0 0");
      viewport.style.filter = "";
      active = false;
      amount = 0;
    }
    requestAnimationFrame(loop);
  })();
})();
