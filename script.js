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

function row(items, widths = null) {
  const cols = widths || items.map(() => 100 / items.length);
  const tracks = cols.map(v => `${v}%`).join(" ");
  return `<div class="mosaic-row" style="grid-template-columns:${tracks}">${items.map(item => tile(projects[item])).join("")}</div>`;
}

function projectWall(seed = 0) {
  // Exact-cover wall: 128 columns x 10 rows. Each band is 2 rows (20svh).
  // Widths 10 / 14 / 18 / 24 produce the approved 1:1, 4:3, 16:9
  // and 2.35:1 tile proportions at this wall's fixed dimensions.
  const layouts = [
    [10,10,18,18,24,24,24],
    [10,18,10,24,18,24,24],
    [18,10,24,10,18,24,24],
    [24,10,18,10,24,18,24],
    [10,24,18,10,24,18,24]
  ];
  const ratioByWidth = {10:"1",14:"4-3",18:"16-9",24:"2-35"};
  let y = 0;
  let tileIndex = 0;
  const tiles = [];
  layouts.forEach((widths, bandIndex) => {
    let x = 0;
    widths.forEach(width => {
      const ratio = ratioByWidth[width];
      const candidates = projects.filter(p => p.ratio === ratio);
      const project = candidates[(seed * 5 + bandIndex * 7 + tileIndex * 3) % candidates.length]
        || projects[(seed + tileIndex) % projects.length];
      const placement = `grid-column:${x+1} / span ${width};grid-row:${y+1} / span 2;`;
      tiles.push(tile(project, "wall-tile", false, placement));
      x += width;
      tileIndex++;
    });
    y += 2;
  });
  return `<section class="project-wall" aria-label="Selected work">${tiles.join("")}</section>`;
}

function sideMosaic(items, patterns) {
  return `<div class="reel-side-stack">
    ${patterns.map((widths, rowIndex) => {
      const rowItems = items.slice(patterns.slice(0, rowIndex).reduce((n, p) => n + p.length, 0),
        patterns.slice(0, rowIndex + 1).reduce((n, p) => n + p.length, 0));
      return `<div class="reel-side-row" style="grid-template-columns:${widths.map(w => `${w}fr`).join(" ")}">
        ${rowItems.map((id, i) => tile(projects[id], "wall-tile")).join("")}
      </div>`;
    }).join("")}
  </div>`;
}

function showreelIsland() {
  // A five-band composition around the reel: one varied band above and below,
  // plus three independently divided bands on either side. This avoids the
  // repeated two-large-tile stacks that made the reel feel boxed in.
  const top = [24, 9, 16, 3, 21, 7];
  const bottom = [14, 26, 1, 24, 9, 16, 3];
  return `<section class="showreel-island" aria-label="Cinematography showreel">
    ${row(top, [12,18,21,14,19,16])}
    <div class="reel-middle">
      ${sideMosaic([3,9,14,21,7], [[1],[0.58,0.42],[0.36,0.64]])}
      ${reelTile()}
      ${sideMosaic([16,7,26,24,1], [[0.46,0.54],[1],[0.62,0.38]])}
    </div>
    ${row(bottom, [15,12,18,13,17,11,14])}
  </section>`;
}

function infoIsland(kind) {
  // Same v38 stepped negative-space design, with tile dimensions recalculated
  // on a 128-column grid so every surrounding piece keeps an approved ratio.
  const configs = {
    about: {
      bands:[
        {left:[24,14],right:[18,24]},
        {left:[10,18,14],right:[24,18]},
        {left:[24,18],right:[10,14,18]},
        {left:[14,14,10],right:[24,24]},
        {left:[24,10],right:[18,14,10]}
      ],
      shape:'polygon(28% 20%,75% 20%,75% 30%,81% 30%,81% 50%,72% 50%,72% 60%,75% 60%,75% 80%,31% 80%,31% 70%,25% 70%,25% 60%,19% 60%,19% 50%,25% 50%,25% 30%,28% 30%)',
      copy:`<span class="kicker">BEHIND THE CAMERA</span><h1>Lucas<br>Lindgren<span>.</span></h1><p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>`
    },
    rightnow: {
      bands:[
        {left:[18,24],right:[10,14,18]},
        {left:[24,14],right:[18,24]},
        {left:[10,18,14],right:[24,18]},
        {left:[18,14,10],right:[24,24]},
        {left:[24,10],right:[18,14,10]}
      ],
      shape:'polygon(22% 20%,75% 20%,75% 30%,78% 30%,78% 50%,72% 50%,72% 70%,78% 70%,78% 80%,25% 80%,25% 70%,19% 70%,19% 50%,28% 50%,28% 30%,22% 30%)',
      copy:`<span class="kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2><div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>`
    },
    contact: {
      bands:[
        {left:[14,18,10],right:[24,18]},
        {left:[24,10],right:[18,14,10]},
        {left:[10,14,18],right:[24,18]},
        {left:[18,24],right:[10,14,18]},
        {left:[24,14],right:[18,24]}
      ],
      shape:'polygon(25% 20%,78% 20%,78% 40%,81% 40%,81% 50%,72% 50%,72% 70%,78% 70%,78% 80%,28% 80%,28% 70%,22% 70%,22% 50%,31% 50%,31% 40%,25% 40%)',
      copy:`<span class="kicker">HAVE SOMETHING IN MIND?</span><h2>Let's make<br>something<span>.</span></h2><a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a><span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>`
    }
  };
  const c = configs[kind];
  let seed = kind === 'about' ? 2 : kind === 'rightnow' ? 13 : 23;
  const ratioByWidth = {10:"1",14:"4-3",18:"16-9",24:"2-35"};
  const pieces = [];
  c.bands.forEach((band, rowIndex) => {
    let x = 0;
    band.left.forEach(width => {
      const candidates = projects.filter(p => p.ratio === ratioByWidth[width]);
      const project = candidates[(seed++ * 7 + rowIndex) % candidates.length] || projects[seed++ % projects.length];
      pieces.push(tile(project, 'wall-tile info-piece', false,
        `grid-column:${x+1} / span ${width};grid-row:${rowIndex*2+1} / span 2;`));
      x += width;
    });
    x = 128 - band.right.reduce((sum, width) => sum + width, 0);
    band.right.forEach(width => {
      const candidates = projects.filter(p => p.ratio === ratioByWidth[width]);
      const project = candidates[(seed++ * 5 + rowIndex) % candidates.length] || projects[seed++ % projects.length];
      pieces.push(tile(project, 'wall-tile info-piece', false,
        `grid-column:${x+1} / span ${width};grid-row:${rowIndex*2+1} / span 2;`));
      x += width;
    });
  });
  return `<section class="info-island ${kind}-island" aria-label="${kind}">
    ${pieces.join('')}
    <div class="info-copy" data-anchor="${kind}">${c.copy}</div>
  </section>`;
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
