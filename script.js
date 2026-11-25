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

/* ---- Layout. Widths are in svh. The page is always 100svh high: a 25svh top strip, a 50svh middle layer
   and a 25svh bottom strip. The middle layer is split into 2 sub-rows (25svh each → 4 rows in total) or
   3 sub-rows (16.67svh each → 5 rows in total), varying along the run. Every tile cell is an exact
   16:9 / 2.35:1 / 1:1 / 4:3 rectangle (rows that must fill a fixed width are scaled <1%); a 3px dark
   gutter is drawn over each tile edge. Info areas are ragged holes where tiles have "fallen off". ---- */
const TILE_RATIOS = {"16-9":16/9, "2-35":2.35, "1":1, "4-3":4/3};
const WEIGHTS = [["16-9",.52],["2-35",.31],["1",.12],["4-3",.05]]; // most → least common
const SMALL = new Set(["1","4-3"]);
const T = 2400, PANEL = REEL_RATIO*50, ISL = 265, BLOCK_W = (T - PANEL - 3*ISL)/4, PHASE = [77.5, 0, 0, 192.5];
const SEGS = [["block",3],["reel",2],["block",2],["about",3],["block",3],["rightnow",2],["block",2],["contact",3]]; // [kind, sub-rows]
let seed = 20261;
const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
function pickRatio(prev) {
  for (;;) {
    let x = rand(), acc = 0, k = "16-9";
    for (const [key, w] of WEIGHTS) { acc += w; if (x < acc) { k = key; break; } }
    const a = prev[prev.length-1], b = prev[prev.length-2];
    if (SMALL.has(k) && a && SMALL.has(a)) continue;      // never two small tiles side by side
    if (a === k && b === k) continue;                      // never three identical in a row
    return k;
  }
}
function makeStrip(target, tol) { // tiles whose ratios sum to target ±tol (scaled to fit by flex)
  let best = null, bestErr = Infinity;
  for (let t = 0; t < 4000; t++) {
    const list = []; let sum = 0;
    while (sum < target * (1 - tol)) { const k = pickRatio(list); list.push(k); sum += TILE_RATIOS[k]; }
    const err = Math.abs(sum - target) / target;
    if (err < bestErr) { best = list; bestErr = err; if (err <= tol) break; }
  }
  return best;
}
function rangeList(lo, hi, h) { // unscaled tiles of row height h, total width within [lo,hi] svh
  for (;;) {
    const list = []; let s = 0;
    while (s * h < lo) { const k = pickRatio(list); list.push(k); s += TILE_RATIOS[k]; }
    if (s * h <= hi) return list;
  }
}
const sumOf = list => list.reduce((a,k) => a + TILE_RATIOS[k], 0);
function addEdges(ev, list, x0, h, total, shift, y0, y1) { // record tile edges for the seam check
  const sc = total ? total / sumOf(list) : h; let c = 0;
  const put = () => ev.push({x: (((x0 + c*sc - shift) % T) + T) % T, y0, y1});
  list.forEach(k => { put(); c += TILE_RATIOS[k]; }); put();
}
function hasLongSeam(ev) { // any vertical edge running unbroken through ≥55svh (≈ 2+ rows)?
  return ev.some(e => {
    const iv = ev.filter(f => { const d = Math.abs(f.x - e.x); return Math.min(d, T - d) < 1.2; })
                 .map(f => [f.y0, f.y1]).sort((a,b) => a[0] - b[0]);
    let cur = null, best = 0;
    for (const [a,b] of iv) { if (cur && a <= cur[1] + .01) cur[1] = Math.max(cur[1], b); else cur = [a,b]; best = Math.max(best, cur[1] - cur[0]); }
    return best >= 55;
  });
}
function buildPlan() {
  let plan;
  for (let attempt = 0; attempt < 400; attempt++) {
    plan = {top: makeStrip(T/25, .003), bottom: makeStrip(T/25, .003), mid: []};
    const ev = [];
    addEdges(ev, plan.top, 0, 25, T, PHASE[0], 0, 25); addEdges(ev, plan.bottom, 0, 25, T, PHASE[3], 75, 100);
    let x = 0;
    for (const [kind, n] of SEGS) {
      const h = 50 / n, seg = {kind, n, h, rows: []};
      const w = kind === "block" ? BLOCK_W : kind === "reel" ? PANEL : ISL;
      if (kind === "reel") ev.push({x: x % T, y0: 25, y1: 75}, {x: (x + w) % T, y0: 25, y1: 75});
      else for (let r = 0; r < n; r++) {
        const y0 = 25 + r*h, y1 = y0 + h;
        if (kind === "block") { const L = makeStrip(w / h, .006); seg.rows.push({L}); addEdges(ev, L, x, h, w, 0, y0, y1); }
        else {
          const L = rangeList(50, 75, h), R = rangeList(50, 75, h);
          seg.rows.push({L, R}); addEdges(ev, L, x, h, null, 0, y0, y1); addEdges(ev, R, x + w - sumOf(R)*h, h, null, 0, y0, y1);
        }
      }
      plan.mid.push(seg); x += w;
    }
    if (!hasLongSeam(ev)) break;
  }
  return plan;
}
//--pure-end
const cursor = {};
function pickProject(ratio) {
  const list = projects.filter(p => p.ratio === ratio);
  cursor[ratio] = (cursor[ratio] ?? -1) + 1;
  return list[cursor[ratio] % list.length];
}
const tiles = list => list.map(k => tile(pickProject(k), "wall-tile", false, `flex:${TILE_RATIOS[k]} 1 0`)).join("");
const exact = list => list.map(k => tile(pickProject(k), "wall-tile", false, `flex:0 0 calc(var(--h) * ${TILE_RATIOS[k]})`)).join("");
const strip = (list, shift) => `<div class="mrow strip" style="--h:25svh;transform:translateX(-${shift}svh)">${tiles(list)}</div>`;
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
// A few tiles that have "fallen" onto the edge of each hole: still approved ratios, slightly rotated.
const FALLEN = {
  about:    [["16-9","left:50svh;top:7svh;width:26.7svh;height:15svh;transform:rotate(-4deg)"],["1","left:184svh;top:27svh;width:17svh;height:17svh;transform:rotate(5deg)"]],
  rightnow: [["1","left:56svh;top:28svh;width:17svh;height:17svh;transform:rotate(4deg)"],["16-9","left:176svh;top:6svh;width:26.7svh;height:15svh;transform:rotate(-3deg)"]],
  contact:  [["16-9","left:48svh;top:30svh;width:26.7svh;height:15svh;transform:rotate(3deg)"],["1","left:186svh;top:6svh;width:17svh;height:17svh;transform:rotate(-5deg)"]]
};
function segHTML(seg) {
  if (seg.kind === "reel") return reelTile();
  const rowStyle = `--h:${seg.h}svh`;
  if (seg.kind === "block")
    return `<div class="side" style="width:${BLOCK_W}svh">${seg.rows.map(r => `<div class="mrow" style="${rowStyle}">${tiles(r.L)}</div>`).join("")}</div>`;
  return `<div class="island" style="width:${ISL}svh">${seg.rows.map(r =>
      `<div class="mrow" style="${rowStyle}">${exact(r.L)}<span class="hole"></span>${exact(r.R)}</div>`).join("")}${infoPanel(seg.kind)}${
      FALLEN[seg.kind].map(([ratio, st]) => tile(pickProject(ratio), "wall-tile fallen", false, st)).join("")}</div>`;
}
// Built once and repeated 3× so the loop join is invisible.
const plan = buildPlan();
const RUN_HTML = strip(plan.top, PHASE[0]) + `<div class="mid">${plan.mid.map(segHTML).join("")}</div>` + strip(plan.bottom, PHASE[3]);
const renderRun = copy => `<div class="world-run" data-copy="${copy}">${RUN_HTML}</div>`;

function render() {
  track.innerHTML = [0,1,2].map(renderRun).join("");
}

function middleRun() {
  return track.querySelector('.world-run[data-copy="1"]');
}

function stopActive() {
  clearTimeout(noteTimer);
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
