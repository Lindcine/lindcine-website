/* LINDCINE — clean rebuild. Edit the projects array to add your real work. */
const REEL_ID = "994186610";
const REEL_RATIO = 2.35; // update to the exact export ratio if different

const projects = [
  {id:"doc",title:"Documentary",ratio:"4-3",kind:"production"},
  {id:"commercial",title:"Commercial & Brand",ratio:"16-9",kind:"production"},
  {id:"light",title:"A study in available light",ratio:"1",kind:"fragment",note:"A study in available light.",noteType:"A SMALL OBSERVATION"},
  {id:"people",title:"People & Portraits",ratio:"4-3",kind:"production"},
  {id:"wedding",title:"Wedding moment",ratio:"16-9",kind:"moment",note:"The moments in between.",noteType:"A PERSONAL NOTE"},
  {id:"narrative",title:"Narrative",ratio:"1",kind:"production"},
  {id:"selected",title:"Selected Projects",ratio:"16-9",kind:"production"},
  {id:"landscape",title:"Somewhere between here and nowhere",ratio:"4-3",kind:"fragment",note:"Somewhere between here and nowhere.",noteType:"A SMALL OBSERVATION"},
  {id:"brand",title:"Brand Film",ratio:"1",kind:"production"},
  {id:"bts",title:"Behind the Scenes",ratio:"4-3",kind:"moment",note:"A little chaos behind the scenes.",noteType:"A PERSONAL NOTE"},
  {id:"campaign",title:"Campaign",ratio:"1",kind:"production"},
  {id:"events",title:"Live & Events",ratio:"16-9",kind:"production"},
  {id:"chasing",title:"Chasing the last light",ratio:"1",kind:"fragment",note:"Chasing the last light.",noteType:"A SMALL OBSERVATION"},
  {id:"music",title:"Music & Culture",ratio:"1",kind:"production"},
  {id:"docfilm",title:"Documentary Film",ratio:"16-9",kind:"production"},
  {id:"afternoon",title:"An afternoon that turned into something else",ratio:"1",kind:"moment",note:"Didn't plan this one. Glad it happened.",noteType:"A PERSONAL NOTE"},
  {id:"earlier",title:"Earlier Work",ratio:"4-3",kind:"production"},
  {id:"between",title:"Between takes",ratio:"16-9",kind:"moment",note:"The in-between is often where things happen.",noteType:"A PERSONAL NOTE"},
  {id:"study",title:"Light study",ratio:"1",kind:"fragment",note:"A little experiment with available light.",noteType:"A SMALL OBSERVATION"}
];

const track = document.querySelector("#worldTrack");
const viewport = document.querySelector("#work");
const noteBox = document.querySelector("#hoverNote");
const noteKicker = noteBox.querySelector("span");
const noteText = noteBox.querySelector("p");
let cycleWidth = 0;
let targetScroll = 0;
let raf = 0;
let activeTile = null;
let hoverDelay = 0;
let noteDelay = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartScroll = 0;

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function tileMarkup(project, extraClass = "") {
  const ratioClass = `tile-ratio-${project.ratio}`;
  const attrs = project.note ? `data-note="${escapeHTML(project.note)}" data-note-type="${escapeHTML(project.noteType || "A NOTE")}"` : "";
  const image = project.image ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" loading="lazy" decoding="async">` : "";
  const preview = project.preview ? `<video muted loop playsinline preload="none" src="${escapeHTML(project.preview)}"></video>` : "";
  const placeholder = project.image ? "" : `<div class="tile-placeholder" aria-hidden="true">L.</div>`;
  return `<article class="tile ${ratioClass} ${extraClass}" data-id="${project.id}" ${attrs} tabindex="0" role="button" aria-label="${escapeHTML(project.title)}">
    <div class="tile-media">${image}${preview}${placeholder}</div>
    <div class="tile-meta"><div class="tile-title">${escapeHTML(project.title)}</div></div>
  </article>`;
}

function showreelIsland() {
  const reel = `<article class="tile tile-showreel" data-id="showreel" tabindex="0" role="button" aria-label="Play cinematography showreel">
    <div class="tile-media"><div class="reel-invite"><span class="reel-play">▶</span><span class="reel-label">WATCH SHOWREEL</span></div></div>
    <div class="reel-caption"></div>
  </article>`;
  return `<section class="showreel-island" data-island="showreel">
    ${tileMarkup(projects[0],"reel-top-a")}
    ${tileMarkup(projects[1],"reel-top-b")}
    ${tileMarkup(projects[2],"reel-top-c")}
    ${tileMarkup(projects[3],"reel-bottom-a")}
    ${tileMarkup(projects[4],"reel-bottom-b")}
    ${tileMarkup(projects[5],"reel-bottom-c")}
    ${reel}
  </section>`;
}

function aboutIsland() {
  return `<section class="info-island about-island" data-island="about">
    <div class="info-piece info-copy" data-anchor="about">
      <span class="kicker">BEHIND THE CAMERA</span>
      <h1>Lucas<br>Lindgren<span>.</span></h1>
      <p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p>
      <div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>
    </div>
    ${tileMarkup(projects[6],"info-piece piece-a")}
    ${tileMarkup(projects[7],"info-piece piece-b")}
    ${tileMarkup(projects[8],"info-piece piece-c")}
  </section>`;
}
function rightNowIsland() {
  return `<section class="info-island rightnow-island" data-island="rightnow">
    <div class="info-piece info-copy" data-anchor="rightnow">
      <span class="kicker">A CURRENT CHAPTER</span>
      <h2>Right<br>now<span>.</span></h2>
      <div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>
    </div>
    ${tileMarkup(projects[9],"info-piece piece-a")}
    ${tileMarkup(projects[10],"info-piece piece-b")}
    ${tileMarkup(projects[11],"info-piece piece-c")}
  </section>`;
}
function contactIsland() {
  return `<section class="info-island contact-island" data-island="contact">
    <div class="info-piece info-copy" data-anchor="contact">
      <span class="kicker">HAVE SOMETHING IN MIND?</span>
      <h2>Let's make<br>something<span>.</span></h2>
      <a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a>
      <span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>
    </div>
    ${tileMarkup(projects[12],"info-piece piece-a")}
    ${tileMarkup(projects[13],"info-piece piece-b")}
    ${tileMarkup(projects[14],"info-piece piece-c")}
  </section>`;
}

function renderRun(copy) {
  const parts = [
    showreelIsland(),
    aboutIsland(),
    rightNowIsland(),
    tileMarkup(projects[15]),
    tileMarkup(projects[16]),
    contactIsland(),
    tileMarkup(projects[17]),
    tileMarkup(projects[18])
  ];
  return `<div class="world-run" data-copy="${copy}">${parts.join("")}</div>`;
}

function render() {
  track.innerHTML = [0,1,2].map(renderRun).join("");
}
function middleRun() { return track.querySelector('.world-run[data-copy="1"]'); }
function allMiddleTiles() { return middleRun()?.querySelectorAll(".tile") || []; }

function stopActive() {
  clearTimeout(noteDelay);
  noteBox.classList.remove("visible");
  if (activeTile) {
    activeTile.classList.remove("is-active");
    if (activeTile.classList.contains("tile-showreel") && !activeTile.classList.contains("is-full")) {
      activeTile.querySelector(".reel-frame")?.remove();
      activeTile.classList.remove("is-playing");
    }
    const video = activeTile.querySelector("video");
    if (video) { video.pause(); video.currentTime = 0; }
  }
  activeTile = null;
  document.body.classList.remove("has-active");
}

function showNote(tile) {
  if (!tile.dataset.note) return;
  noteKicker.textContent = tile.dataset.noteType || "A NOTE";
  noteText.textContent = tile.dataset.note;
  noteBox.classList.add("visible");
}

function makeReelFrame(tile, full = false) {
  tile.querySelector(".reel-frame")?.remove();
  const iframe = document.createElement("iframe");
  iframe.className = "reel-frame";
  iframe.title = "Lucas Lindgren cinematography showreel";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.src = full
    ? `https://player.vimeo.com/video/${REEL_ID}?autoplay=1&controls=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1`
    : `https://player.vimeo.com/video/${REEL_ID}?autoplay=1&muted=1&background=1&loop=1&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1`;
  tile.appendChild(iframe);
  tile.classList.add("is-playing");
  tile.classList.toggle("is-full", full);
}

function activate(tile) {
  if (!tile || activeTile === tile) return;
  stopActive();
  activeTile = tile;
  tile.classList.add("is-active");
  document.body.classList.add("has-active");
  if (tile.classList.contains("tile-showreel")) {
    makeReelFrame(tile, false);
  } else {
    const video = tile.querySelector("video");
    if (video) video.play().catch(() => {});
  }
  noteDelay = window.setTimeout(() => showNote(tile), 600);
}

function openReel(tile) {
  if (activeTile !== tile) {
    stopActive();
    activeTile = tile;
    tile.classList.add("is-active");
    document.body.classList.add("has-active");
  }
  makeReelFrame(tile, true);
}

function bindTiles() {
  track.querySelectorAll(".world-run .tile").forEach(tile => {
    tile.addEventListener("mouseenter", () => {
      clearTimeout(hoverDelay);
      hoverDelay = window.setTimeout(() => activate(tile), 180);
    });
    tile.addEventListener("mouseleave", () => {
      clearTimeout(hoverDelay);
      if (activeTile === tile && !tile.classList.contains("is-full")) stopActive();
    });
    tile.addEventListener("focus", () => activate(tile));
    tile.addEventListener("blur", () => {
      if (activeTile === tile && !tile.classList.contains("is-full")) stopActive();
    });
    tile.addEventListener("click", event => {
      if (event.target.closest("a")) return;
      if (tile.classList.contains("tile-showreel")) {
        openReel(tile);
      } else {
        const project = projects.find(item => item.id === tile.dataset.id);
        if (project?.video) window.open(project.video, "_blank", "noopener");
      }
    });
    tile.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (tile.classList.contains("tile-showreel")) openReel(tile);
      }
    });
  });
}

function measure() {
  const first = track.querySelector('.world-run[data-copy="0"]');
  const middle = middleRun();
  if (!first || !middle) return;
  cycleWidth = middle.getBoundingClientRect().left - first.getBoundingClientRect().left;
  if (!cycleWidth) return;
  const reel = middle.querySelector(".tile-showreel");
  const reelRect = reel.getBoundingClientRect();
  const reelCenterFromViewport = reelRect.left - viewport.getBoundingClientRect().left + viewport.scrollLeft + reelRect.width / 2;
  const start = cycleWidth + reelCenterFromViewport - viewport.clientWidth / 2;
  viewport.scrollLeft = start;
  targetScroll = start;
}

function rebase() {
  if (!cycleWidth) return;
  const left = viewport.scrollLeft;
  if (left < cycleWidth * .5) {
    viewport.scrollLeft = left + cycleWidth;
    targetScroll += cycleWidth;
  } else if (left > cycleWidth * 1.5) {
    viewport.scrollLeft = left - cycleWidth;
    targetScroll -= cycleWidth;
  }
}

function animate(time) {
  const current = viewport.scrollLeft;
  const difference = targetScroll - current;
  const ease = 1 - Math.pow(.001, 16 / 1000);
  if (Math.abs(difference) < .5) {
    viewport.scrollLeft = targetScroll;
    rebase();
    raf = 0;
    return;
  }
  viewport.scrollLeft = current + difference * ease;
  rebase();
  raf = requestAnimationFrame(animate);
}
function smoothTo(value) {
  targetScroll = value;
  if (!raf) raf = requestAnimationFrame(animate);
}
function moveBy(delta) { smoothTo(targetScroll + delta); }
function goTo(name) {
  const node = middleRun()?.querySelector(`[data-anchor="${name}"]`);
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  smoothTo(viewport.scrollLeft + center - viewport.clientWidth / 2);
}
function goToReel() {
  const node = middleRun()?.querySelector(".tile-showreel");
  if (!node) return;
  const rect = node.getBoundingClientRect();
  smoothTo(viewport.scrollLeft + rect.left + rect.width / 2 - viewport.clientWidth / 2);
}

viewport.addEventListener("wheel", event => {
  let dx = event.deltaX, dy = event.deltaY;
  if (event.deltaMode === 1) { dx *= 16; dy *= 16; }
  if (event.deltaMode === 2) { dx *= viewport.clientWidth; dy *= viewport.clientWidth; }
  const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  if (!delta) return;
  event.preventDefault();
  moveBy(delta * 1.25);
}, {passive:false});
viewport.addEventListener("scroll", () => { if (!raf) rebase(); });
viewport.addEventListener("pointerdown", event => {
  if (event.pointerType === "touch" || event.target.closest(".tile,.info-copy")) return;
  isDragging = true;
  dragStartX = event.clientX;
  dragStartScroll = viewport.scrollLeft;
  viewport.classList.add("is-dragging");
  viewport.setPointerCapture(event.pointerId);
  stopActive();
});
viewport.addEventListener("pointermove", event => {
  if (!isDragging) return;
  viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  targetScroll = viewport.scrollLeft;
  rebase();
});
function endDrag() { isDragging = false; viewport.classList.remove("is-dragging"); }
viewport.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);
viewport.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") { event.preventDefault(); moveBy(420); }
  if (event.key === "ArrowLeft") { event.preventDefault(); moveBy(-420); }
  if (event.key === "Home") { event.preventDefault(); goToReel(); }
});

document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => {
  const destination = button.dataset.go;
  if (destination === "showreel") goToReel(); else goTo(destination);
}));

render();
measure();
bindTiles();
window.addEventListener("resize", () => requestAnimationFrame(measure));
