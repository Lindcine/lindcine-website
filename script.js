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
let motionBlurNode = document.querySelector("#lindcine-motion-blur-x");
let motionBlurRaf = 0;
let motionBlurSigma = 0;
let motionBoost = 1;
let touchGesture = false;
let touchLastScroll = 0;
let touchBlurTimer = 0;

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

const WALL_WIDTH = 250.83333333333334;
const RATIO_KEYS = ["1", "4-3", "16-9", "2-35"];
const RATIO_VALUES = {"1":1, "4-3":4/3, "16-9":16/9, "2-35":2.35};

function pickProject(ratio, seed) {
  const candidates = projects.filter(p => p.ratio === ratio);
  if (!candidates.length) throw new Error(`No project available for ratio ${ratio}`);
  return candidates[((seed % candidates.length) + candidates.length) % candidates.length];
}

function ratioBoundaries(ratios) {
  const total = ratios.reduce((sum, ratio) => sum + RATIO_VALUES[ratio], 0);
  let cursor = 0;
  return ratios.slice(0, -1).map(ratio => {
    cursor += RATIO_VALUES[ratio];
    return cursor / total;
  });
}

function shuffledRatios(counts, seed, previousBoundaries = []) {
  const source = [];
  RATIO_KEYS.forEach((ratio, i) => {
    for (let n = 0; n < (counts[i] || 0); n++) source.push(ratio);
  });
  // Choose a deterministic ordering that staggers seams against preceding rows.
  let state = (seed + 1) * 2654435761 >>> 0;
  let best = source.slice();
  let bestScore = -Infinity;
  const prior = previousBoundaries.flat();
  for (let attempt = 0; attempt < 160; attempt++) {
    const candidate = source.slice();
    for (let i = candidate.length - 1; i > 0; i--) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const j = state % (i + 1);
      [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
    }
    const edges = ratioBoundaries(candidate);
    let score = 0;
    for (const edge of edges) {
      let nearest = 1;
      for (const oldEdge of prior) nearest = Math.min(nearest, Math.abs(edge - oldEdge));
      score += Math.min(nearest, 0.08) * 100;
      if (nearest < 0.018) score -= 18;
      else if (nearest < 0.032) score -= 7;
    }
    for (let i = 1; i < candidate.length; i++) {
      const small = r => r === "1" || r === "4-3";
      if (small(candidate[i - 1]) && small(candidate[i])) score -= 2.5;
    }
    if (score > bestScore) { bestScore = score; best = candidate; }
  }
  return best;
}

function exactRow(ratios, height, seed, className = "") {
  const tiles = ratios.map((ratio, i) => {
    const project = pickProject(ratio, seed * 11 + i * 7 + ratios.length);
    return tile(project, "wall-tile", false, "");
  }).join("");
  return `<div class="mosaic-row exact-row ${className}" style="--tile-h:${height}svh">${tiles}</div>`;
}

function projectWall(seed = 0) {
  // Every thumbnail is a true aspect-ratio rectangle. Four-row walls use
  // 25svh bands. Occasional five-row walls use mathematically solved band
  // heights; the five heights sum to exactly 100svh and every band fills the
  // same 250.833333svh wall width without stretching a tile.
  const fourRowPatterns = [
    [0, 0, 3, 2], // landscape-heavy row
    [4, 1, 0, 2], // square / 4:3 row, separated by landscape rows
    [0, 0, 3, 2], // landscape-heavy row
    [0, 4, 0, 2]  // 4:3 row
  ];
  const fiveRows = [
    {counts:[4,1,3,0]},
    {counts:[1,1,2,4]},
    {counts:[0,4,4,0]},
    {counts:[1,1,2,4]},
    {counts:[4,1,3,0]}
  ];
  const useFive = seed === 6;
  let rows = [];
  let previousEdges = [];
  if (useFive) {
    fiveRows.forEach((band, i) => {
      const ratioTotal = band.counts.reduce((sum, count, index) => sum + count * RATIO_VALUES[RATIO_KEYS[index]], 0);
      const height = WALL_WIDTH / ratioTotal;
      const ratios = shuffledRatios(band.counts, seed * 13 + i * 5, previousEdges);
      previousEdges.push(ratioBoundaries(ratios));
      rows.push(exactRow(ratios, height.toFixed(10), seed + i, "five-row-band"));
    });
  } else {
    fourRowPatterns.forEach((counts, i) => {
      const ratios = shuffledRatios(counts, seed * 13 + i * 5, previousEdges);
      previousEdges.push(ratioBoundaries(ratios));
      rows.push(exactRow(ratios, 25, seed + i, "four-row-band"));
    });
  }
  return `<section class="project-wall" aria-label="Selected work">${rows.join("")}</section>`;
}

function showreelIsland() {
  // Preserve the exact reel frame and overall island dimensions.
  // Each 66.6667svh side is now a compact, mixed-ratio 2-band mosaic.
  // The band heights vary (150/7 + 200/7 = 50svh) and every row fills its side exactly.
  const top = exactRow(shuffledRatios([0,0,3,2], 4), 25, 41, "reel-top");
  const bottom = exactRow(shuffledRatios([4,1,0,2], 9), 25, 53, "reel-bottom");

  const sideRowsLeft = [
    {height:150/7, ratios:["4-3","16-9"]},
    {height:200/7, ratios:["4-3","1"]}
  ];
  const sideRowsRight = [
    {height:200/7, ratios:["1","4-3"]},
    {height:150/7, ratios:["16-9","4-3"]}
  ];

  const side = (rows, seed) => `<div class="reel-side-stack">${rows.map((band, rowIndex) =>
    exactRow(band.ratios, band.height, seed + rowIndex * 13, "reel-side-row")
  ).join("")}</div>`;

  return `<section class="showreel-island" aria-label="Cinematography showreel">
    ${top}
    <div class="reel-middle">
      ${side(sideRowsLeft, 70)}
      ${reelTile()}
      ${side(sideRowsRight, 90)}
    </div>
    ${bottom}
  </section>`;
}

function infoIsland(kind) {
  // The stepped negative-space cut-out is preserved as a real hole in the
  // mosaic. Three irregular middle bands use larger landscape tiles; the
  // full-width 25svh bands above and below close the cut-out at both ends.
  const configs = {
    about: {
      bands:[
        {left:["2-35"],right:["16-9","16-9"]},
        {left:["16-9","16-9"],right:["2-35"]},
        {left:["16-9"],right:["2-35","2-35"]}
      ],
      copy:`<span class="kicker">BEHIND THE CAMERA</span><h1>Lucas<br>Lindgren<span>.</span></h1><p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>`
    },
    rightnow: {
      bands:[
        {left:["16-9","2-35"],right:["2-35"]},
        {left:["2-35"],right:["16-9","16-9"]},
        {left:["16-9","16-9"],right:["2-35"]}
      ],
      copy:`<span class="kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2><div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>`
    },
    contact: {
      bands:[
        {left:["16-9","16-9"],right:["2-35"]},
        {left:["2-35"],right:["16-9"]},
        {left:["16-9"],right:["2-35","2-35"]}
      ],
      copy:`<span class="kicker">HAVE SOMETHING IN MIND?</span><h2>Let's make<br>something<span>.</span></h2><a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a><span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>`
    }
  };
  const config = configs[kind];
  const leftWidths = [];
  const rightWidths = [];
  const bandHeights = [25, 50/3, 50/3, 50/3, 25];
  const fullCounts = [0,0,3,2];
  const bands = bandHeights.map((height, rowIndex) => {
    if (rowIndex === 0 || rowIndex === 4) {
      leftWidths.push(0); rightWidths.push(100);
      const ratios = shuffledRatios(fullCounts, 300 + rowIndex * 37 + kind.length);
      const tiles = ratios.map((ratio,i) => tile(pickProject(ratio, 300 + rowIndex*31+i*9), "wall-tile info-piece", false, "")).join("");
      return `<div class="info-band info-full-band" style="--tile-h:${height}svh"><div class="info-side info-left">${tiles}</div></div>`;
    }
    const band = config.bands[rowIndex - 1];
    const leftWidth = band.left.reduce((sum, ratio) => sum + RATIO_VALUES[ratio], 0) * height;
    const rightWidth = band.right.reduce((sum, ratio) => sum + RATIO_VALUES[ratio], 0) * height;
    leftWidths.push(leftWidth / WALL_WIDTH * 100);
    rightWidths.push(100 - rightWidth / WALL_WIDTH * 100);
    const left = band.left.map((ratio, i) => tile(pickProject(ratio, 100 + rowIndex * 17 + i * 3), "wall-tile info-piece", false, "")).join("");
    const right = band.right.map((ratio, i) => tile(pickProject(ratio, 180 + rowIndex * 19 + i * 5), "wall-tile info-piece", false, "")).join("");
    return `<div class="info-band" style="--tile-h:${height}svh"><div class="info-side info-left">${left}</div><div class="info-side info-right">${right}</div></div>`;
  }).join("");
  const boundaries = [0,25,25+50/3,25+100/3,75,100];
  const points = [];
  points.push(`${leftWidths[0]}% 0%`, `${rightWidths[0]}% 0%`);
  for (let i = 0; i < 5; i++) {
    points.push(`${rightWidths[i]}% ${boundaries[i+1]}%`);
    if (i < 4) points.push(`${rightWidths[i+1]}% ${boundaries[i+1]}%`);
  }
  points.push(`${leftWidths[4]}% 100%`);
  for (let i = 4; i >= 1; i--) {
    points.push(`${leftWidths[i]}% ${boundaries[i]}%`, `${leftWidths[i-1]}% ${boundaries[i]}%`);
  }
  points.push(`${leftWidths[0]}% 0%`);
  const shape = `polygon(${points.join(",")})`;
  return `<section class="info-island ${kind}-island" aria-label="${kind}">
    ${bands}
    <div class="info-copy" data-anchor="${kind}" style="--cutout-shape:${shape}">${config.copy}</div>
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

function setMotionBlur(distance) {
  if (!motionBlurNode || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const movement = Math.abs(distance);
  if (movement < 0.75) return;

  if (motionBlurRaf) {
    cancelAnimationFrame(motionBlurRaf);
    motionBlurRaf = 0;
  }

  // Blur scales with actual pixels moved per frame. A navigation flight
  // therefore gets more blur than a gentle wheel nudge. X-only sigma keeps
  // the effect directional and restrained.
  const height = Math.max(1, viewport.clientHeight);
  motionBlurSigma = Math.min(2.25, 0.07 + (movement / height) * 3.35 * motionBoost);
  motionBlurNode.setAttribute("stdDeviation", `${motionBlurSigma.toFixed(2)} 0.035`);
  viewport.classList.add("is-motion-blurred");
}

function releaseMotionBlur() {
  if (!motionBlurNode || !motionBlurSigma) {
    viewport.classList.remove("is-motion-blurred");
    return;
  }
  if (motionBlurRaf) cancelAnimationFrame(motionBlurRaf);

  const start = performance.now();
  const initialSigma = motionBlurSigma;
  const duration = 190;

  const fade = now => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const sigma = initialSigma * (1 - eased);
    motionBlurNode.setAttribute("stdDeviation", `${sigma.toFixed(2)} 0.035`);

    if (progress < 1) {
      motionBlurRaf = requestAnimationFrame(fade);
    } else {
      motionBlurRaf = 0;
      motionBlurSigma = 0;
      motionBlurNode.setAttribute("stdDeviation", "0 0");
      viewport.classList.remove("is-motion-blurred");
    }
  };

  motionBlurRaf = requestAnimationFrame(fade);
}

function animate() {
  const current = viewport.scrollLeft;
  const delta = targetScroll - current;
  const factor = 1 - Math.pow(.001, 16 / 1000);

  if (Math.abs(delta) < .5) {
    viewport.scrollLeft = targetScroll;
    rebase();
    animationFrame = 0;
    motionBoost = 1;
    releaseMotionBlur();
    return;
  }

  const next = current + delta * factor;
  viewport.scrollLeft = next;
  setMotionBlur(next - current);
  rebase();
  animationFrame = requestAnimationFrame(animate);
}

function scrollToX(value, intensity = 1) {
  targetScroll = value;
  motionBoost = Math.max(1, Math.min(1.4, intensity));
  if (!animationFrame) animationFrame = requestAnimationFrame(animate);
}

function goToAnchor(name) {
  const node = middleRun()?.querySelector(`[data-anchor="${name}"]`);
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  scrollToX(viewport.scrollLeft + center - viewport.clientWidth / 2, 1.3);
}

function goToReel() {
  const node = middleRun()?.querySelector(".reel-tile");
  if (!node) return;
  const rect = node.getBoundingClientRect();
  scrollToX(viewport.scrollLeft + rect.left + rect.width / 2 - viewport.clientWidth / 2, 1.18);
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

viewport.addEventListener("touchstart", () => {
  touchGesture = true;
  touchLastScroll = viewport.scrollLeft;
}, {passive:true});

viewport.addEventListener("touchend", () => {
  clearTimeout(touchBlurTimer);
  touchBlurTimer = window.setTimeout(() => {
    touchGesture = false;
    releaseMotionBlur();
  }, 150);
}, {passive:true});

viewport.addEventListener("scroll", () => {
  if (touchGesture && !animationFrame && !dragging) {
    const current = viewport.scrollLeft;
    const distance = current - touchLastScroll;
    if (Math.abs(distance) < cycleWidth * .45) setMotionBlur(distance);
    touchLastScroll = current;
    targetScroll = current;
    clearTimeout(touchBlurTimer);
    touchBlurTimer = window.setTimeout(releaseMotionBlur, 110);
  }
  if (!animationFrame) {
    rebase();
    if (touchGesture) touchLastScroll = viewport.scrollLeft;
  }
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
  const previous = viewport.scrollLeft;
  viewport.scrollLeft = dragScroll - (event.clientX - dragX);
  targetScroll = viewport.scrollLeft;
  setMotionBlur(viewport.scrollLeft - previous);
  rebase();
});
function endDrag() {
  dragging = false;
  viewport.classList.remove("is-dragging");
  releaseMotionBlur();
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
window.addEventListener("blur", releaseMotionBlur);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) releaseMotionBlur();
});
