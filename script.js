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

const WALL_WIDTH = 250.76978907208147; // svh; derived from exact-ratio row packing
const RATIO = {"1":1,"4-3":4/3,"16-9":16/9,"2-35":2.35};
const ROW_COUNTS = [
  {"1":2,"4-3":3,"16-9":1,"2-35":2},
  {"1":2,"4-3":2,"16-9":0,"2-35":3},
  {"1":0,"4-3":1,"16-9":3,"2-35":3},
  {"1":3,"4-3":1,"16-9":3,"2-35":2},
  {"1":2,"4-3":1,"16-9":3,"2-35":1}
];
const WALL_ROW_HEIGHTS = ROW_COUNTS.map(c => WALL_WIDTH / Object.entries(c).reduce((s,[r,n])=>s+RATIO[r]*n,0));
const WALL_TOP_HEIGHT = WALL_WIDTH / (2*2.35 + 3*(16/9));
const REEL_MID_HEIGHT = 100 - 2*WALL_TOP_HEIGHT;
const REEL_WIDTH = 2.35 * REEL_MID_HEIGHT;
const SIDE_WIDTH = (WALL_WIDTH - REEL_WIDTH) / 2;

function absoluteTile(project, x, y, width, height, extra="") {
  const placement = `position:absolute;left:${x}svh;top:${y}svh;width:${width}svh;height:${height}svh;`;
  return tile(project, `wall-tile ${extra}`, false, placement);
}

function chooseProject(ratio, seed, used) {
  const candidates = projects.filter(p => p.ratio === ratio);
  if (!candidates.length) return projects[seed % projects.length];
  let index = ((seed % candidates.length) + candidates.length) % candidates.length;
  for (let tries=0; tries<candidates.length; tries++) {
    const p = candidates[(index+tries)%candidates.length];
    const count = used.get(p.id) || 0;
    if (count < 2) { used.set(p.id,count+1); return p; }
  }
  const p = candidates[index]; used.set(p.id,(used.get(p.id)||0)+1); return p;
}

function projectWall(seed = 0) {
  let y = 0;
  const pieces = [];
  const used = new Map();
  const bandOrder = [0,1,2,3,4].map(i => (i + seed) % 5);
  bandOrder.forEach((patternIndex, visualRow) => {
    const counts = ROW_COUNTS[patternIndex];
    const h = WALL_ROW_HEIGHTS[patternIndex];
    const ratios = [];
    ["1","4-3","16-9","2-35"].forEach(r => { for(let i=0;i<counts[r];i++) ratios.push(r); });
    // Seeded rotation changes the rhythm without changing the exact cover.
    const shift = (seed*3 + visualRow*2) % ratios.length;
    const ordered = ratios.slice(shift).concat(ratios.slice(0,shift));
    let x = 0;
    ordered.forEach((ratio, i) => {
      const w = RATIO[ratio] * h;
      const project = chooseProject(ratio, seed*11 + visualRow*7 + i*3, used);
      pieces.push(absoluteTile(project,x,y,w,h));
      x += w;
    });
    y += h;
  });
  return `<section class="project-wall" aria-label="Selected work">${pieces.join("")}</section>`;
}

function showreelSideStack(side, seed) {
  const rows = [
    {h:SIDE_WIDTH/4, ratios: seed%2 ? ["1","1","1","1"] : ["4-3","4-3","4-3"]},
    {h:SIDE_WIDTH/4, ratios: seed%2 ? ["4-3","4-3","4-3"] : ["1","1","1","1"]},
    {h:REEL_MID_HEIGHT - 2*(SIDE_WIDTH/4), ratios: seed%2 ? ["1","1","1","1"] : ["4-3","4-3","4-3"]}
  ];
  let y=0, n=0, html="";
  const used=new Map();
  rows.forEach(row=>{
    let x=0;
    row.ratios.forEach(r=>{
      const w=RATIO[r]*row.h;
      const p=chooseProject(r,seed*5+n*3,used);
      html+=absoluteTile(p,x,y,w,row.h);
      x+=w;n++;
    });
    y+=row.h;
  });
  return `<div class="reel-side-stack ${side}">${html}</div>`;
}

function showreelIsland() {
  const topRatios=["2-35","16-9","2-35","16-9","16-9"];
  const bottomRatios=["16-9","2-35","16-9","16-9","2-35"];
  function horizontalBand(ratios, top, seed){
    let x=0, html=""; const used=new Map();
    ratios.forEach((r,i)=>{
      const w=RATIO[r]*WALL_TOP_HEIGHT;
      html+=absoluteTile(chooseProject(r,seed+i*4,used),x,top,w,WALL_TOP_HEIGHT);
      x+=w;
    });
    return html;
  }
  return `<section class="showreel-island" aria-label="Cinematography showreel">
    ${horizontalBand(topRatios,0,3)}
    <div class="reel-middle">
      ${showreelSideStack("left",0)}
      <article class="tile reel-tile" data-id="showreel" data-anchor="showreel" style="position:absolute;left:${SIDE_WIDTH}svh;top:0;width:${REEL_WIDTH}svh;height:${REEL_MID_HEIGHT}svh" tabindex="0" role="button" aria-label="Play cinematography showreel"><div class="reel-invite"><span class="reel-play">▶</span><span class="reel-label">WATCH SHOWREEL</span></div></article>
      ${showreelSideStack("right",1)}
    </div>
    ${horizontalBand(bottomRatios,WALL_TOP_HEIGHT+REEL_MID_HEIGHT,17)}
  </section>`;
}

function infoIsland(kind) {
  const configs = {
    about: {
      bands:[[["2-35","4-3"],["16-9","2-35"]],[["1","16-9","4-3"],["2-35","16-9"]],[["2-35","16-9"],["1","4-3","16-9"]],[["4-3","4-3","1"],["2-35","2-35"]],[["2-35","1"],["16-9","4-3","1"]]],
      shape:'polygon(28% 20%,75% 20%,75% 30%,81% 30%,81% 50%,72% 50%,72% 60%,75% 60%,75% 80%,31% 80%,31% 70%,25% 70%,25% 60%,19% 60%,19% 50%,25% 50%,25% 30%,28% 30%)',
      copy:`<span class="kicker">BEHIND THE CAMERA</span><h1>Lucas<br>Lindgren<span>.</span></h1><p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>`
    },
    rightnow: {
      bands:[[["16-9","2-35"],["1","4-3","16-9"]],[["2-35","4-3"],["16-9","2-35"]],[["1","16-9","4-3"],["2-35","16-9"]],[["16-9","4-3","1"],["2-35","2-35"]],[["2-35","1"],["16-9","4-3","1"]]],
      shape:'polygon(22% 20%,75% 20%,75% 30%,78% 30%,78% 50%,72% 50%,72% 70%,78% 70%,78% 80%,25% 80%,25% 70%,19% 70%,19% 50%,28% 50%,28% 30%,22% 30%)',
      copy:`<span class="kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2><div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>`
    },
    contact: {
      bands:[[["4-3","16-9","1"],["2-35","16-9"]],[["2-35","1"],["16-9","4-3","1"]],[["1","4-3","16-9"],["2-35","16-9"]],[["16-9","2-35"],["1","4-3","16-9"]],[["2-35","4-3"],["16-9","2-35"]]],
      shape:'polygon(25% 20%,78% 20%,78% 40%,81% 40%,81% 50%,72% 50%,72% 70%,78% 70%,78% 80%,28% 80%,28% 70%,22% 70%,22% 50%,31% 50%,31% 40%,25% 40%)',
      copy:`<span class="kicker">HAVE SOMETHING IN MIND?</span><h2>Let's make<br>something<span>.</span></h2><a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a><span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>`
    }
  };
  const c=configs[kind]; let seed=kind==='about'?2:kind==='rightnow'?13:23;
  const pieces=[]; const used=new Map(); const bandHeight=20;
  c.bands.forEach((band,rowIndex)=>{
    const left=band[0], right=band[1];
    let x=0;
    left.forEach((ratio,i)=>{
      const w=RATIO[ratio]*bandHeight;
      const p=chooseProject(ratio,seed++ + rowIndex*5 + i,used);
      pieces.push(absoluteTile(p,x,rowIndex*bandHeight,w,bandHeight,"info-piece")); x+=w;
    });
    const rightWidth=right.reduce((sum,r)=>sum+RATIO[r]*bandHeight,0);
    x=WALL_WIDTH-rightWidth;
    right.forEach((ratio,i)=>{
      const w=RATIO[ratio]*bandHeight;
      const p=chooseProject(ratio,seed++ + rowIndex*7 + i,used);
      pieces.push(absoluteTile(p,x,rowIndex*bandHeight,w,bandHeight,"info-piece")); x+=w;
    });
  });
  return `<section class="info-island ${kind}-island" aria-label="${kind}">${pieces.join('')}<div class="info-copy" data-anchor="${kind}">${c.copy}</div></section>`;
}

function renderRun(copy) {
  return `<div class="world-run" data-copy="${copy}">
    ${showreelIsland()}
    ${projectWall(0)}
    ${infoIsland("about")}
    ${projectWall(3)}
    ${infoIsland("rightnow")}
    ${projectWall(6)}
    ${infoIsland("contact")}
    ${projectWall(9)}
  </div>`;
}

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
