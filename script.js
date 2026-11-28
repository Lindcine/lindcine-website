/* LINDCINE — ratio-locked, infinite horizontal portfolio mosaic. */
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
  {id:"hostprommis",title:"Höstprommis",ratio:"1",platform:"local",video:"assets/hostprommis.mp4",image:"assets/hostprommis-poster.jpg",preview:"assets/hostprommis.mp4",previewPoster:"assets/hostprommis-poster.jpg"},
  {id:"brand",title:"Skånetrafiken",ratio:"16-9",platform:"youtube",videoId:"UMjSnObIrWg",video:"https://www.youtube.com/watch?v=UMjSnObIrWg",image:"https://img.youtube.com/vi/UMjSnObIrWg/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/UMjSnObIrWg/hqdefault.jpg",note:"The everyday, in motion.",noteType:"A REGION IN MOTION"},
  {id:"bts",title:"Demokrati Pågår",ratio:"16-9",platform:"youtube",videoId:"DoNzgCG3Fgs",video:"https://www.youtube.com/watch?v=DoNzgCG3Fgs",image:"https://img.youtube.com/vi/DoNzgCG3Fgs/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/DoNzgCG3Fgs/hqdefault.jpg",note:"A big idea, brought down to earth.",noteType:"IDEAS IN ACTION"},
  {id:"campaign",title:"Demokrativerkstaden",ratio:"4-3",platform:"youtube",videoId:"voEMRubg3p8",video:"https://www.youtube.com/watch?v=voEMRubg3p8",image:"https://img.youtube.com/vi/voEMRubg3p8/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/voEMRubg3p8/hqdefault.jpg",note:"Democracy is something we do together.",noteType:"PARTICIPATION"},
  {id:"events",title:"Uppdrag Ledamot",ratio:"16-9",platform:"youtube",videoId:"g80oZRFmm_E",video:"https://www.youtube.com/watch?v=g80oZRFmm_E",image:"https://img.youtube.com/vi/g80oZRFmm_E/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/g80oZRFmm_E/hqdefault.jpg",note:"A closer look at the work behind the role.",noteType:"BEHIND THE ROLE"},
  {id:"chasing",title:"Väddö",ratio:"2-35",platform:"youtube",videoId:"uZfV9U9B7TA",video:"https://www.youtube.com/watch?v=uZfV9U9B7TA",image:"https://img.youtube.com/vi/uZfV9U9B7TA/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/uZfV9U9B7TA/hqdefault.jpg",note:"A place, a rhythm, a little breathing room.",noteType:"A SMALL OBSERVATION"},
  {id:"music",title:"KTH, Innovation",ratio:"16-9",platform:"youtube",videoId:"wR9AfemNIOM",video:"https://www.youtube.com/watch?v=wR9AfemNIOM",image:"https://img.youtube.com/vi/wR9AfemNIOM/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/wR9AfemNIOM/hqdefault.jpg",note:"Curiosity turning into possibility.",noteType:"A STARTING POINT"},
  {id:"docfilm",title:"Skin — Short Film",ratio:"2-35",platform:"vimeo",videoId:"239191351",video:"https://vimeo.com/239191351",image:"https://vumbnail.com/239191351.jpg",note:"A story told in gestures and atmosphere.",noteType:"SHORT FILM"},
  {id:"new01",title:"Project 01",ratio:"16-9",platform:"youtube",videoId:"97A397zoDRQ",video:"https://www.youtube.com/watch?v=97A397zoDRQ",image:"https://img.youtube.com/vi/97A397zoDRQ/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/97A397zoDRQ/hqdefault.jpg"},
  {id:"new02",title:"Project 02",ratio:"16-9",platform:"youtube",videoId:"7bjct80YFVU",video:"https://www.youtube.com/watch?v=7bjct80YFVU",image:"https://img.youtube.com/vi/7bjct80YFVU/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/7bjct80YFVU/hqdefault.jpg"},
  {id:"new03",title:"Project 03",ratio:"16-9",platform:"mediaflow",videoId:"03LEWFM2AD",video:"https://m.mediaflow.com/m3u8/03LEWFM2AD?multiRes=1",image:"",posterText:"MF"},
  {id:"new04",title:"Project 04",ratio:"1",platform:"youtube",videoId:"XDRftVQ9QGM",video:"https://www.youtube.com/shorts/XDRftVQ9QGM",image:"https://img.youtube.com/vi/XDRftVQ9QGM/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/XDRftVQ9QGM/hqdefault.jpg"},
  {id:"new05",title:"Project 05",ratio:"4-3",platform:"youtube",videoId:"rEvU1r6oW34",video:"https://www.youtube.com/watch?v=rEvU1r6oW34",image:"https://img.youtube.com/vi/rEvU1r6oW34/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/rEvU1r6oW34/hqdefault.jpg"},
  {id:"new06",title:"Project 06",ratio:"16-9",platform:"youtube",videoId:"SRKoVi9C5b8",video:"https://www.youtube.com/watch?v=SRKoVi9C5b8",image:"https://img.youtube.com/vi/SRKoVi9C5b8/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/SRKoVi9C5b8/hqdefault.jpg"},
  {id:"new07",title:"Project 07",ratio:"2-35",platform:"youtube",videoId:"Zq7xl2nZD2M",video:"https://www.youtube.com/watch?v=Zq7xl2nZD2M",image:"https://img.youtube.com/vi/Zq7xl2nZD2M/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/Zq7xl2nZD2M/hqdefault.jpg"},
  {id:"new08",title:"Project 08",ratio:"16-9",platform:"youtube",videoId:"j-7in2cY4rA",video:"https://www.youtube.com/watch?v=j-7in2cY4rA",image:"https://img.youtube.com/vi/j-7in2cY4rA/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/j-7in2cY4rA/hqdefault.jpg"},
  {id:"new09",title:"Project 09",ratio:"16-9",platform:"youtube",videoId:"acMafsKQiK8",video:"https://www.youtube.com/watch?v=acMafsKQiK8",image:"https://img.youtube.com/vi/acMafsKQiK8/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/acMafsKQiK8/hqdefault.jpg"},
  {id:"new10",title:"Project 10",ratio:"16-9",platform:"youtube",videoId:"lcQXgpyjHrw",video:"https://www.youtube.com/watch?v=lcQXgpyjHrw",image:"https://img.youtube.com/vi/lcQXgpyjHrw/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/lcQXgpyjHrw/hqdefault.jpg"},
  {id:"new11",title:"Project 11",ratio:"2-35",platform:"youtube",videoId:"hHhT0DtJwB4",video:"https://www.youtube.com/watch?v=hHhT0DtJwB4",image:"https://img.youtube.com/vi/hHhT0DtJwB4/maxresdefault.jpg",fallbackImage:"https://img.youtube.com/vi/hHhT0DtJwB4/hqdefault.jpg"}
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
let noteTypeTimer = 0;
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
  const fallbacks = [];
  if (project.platform === "youtube" && project.videoId) {
    const id = encodeURIComponent(project.videoId);
    fallbacks.push(
      `https://img.youtube.com/vi/${id}/sddefault.jpg`,
      `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${id}/0.jpg`,
      `https://img.youtube.com/vi/${id}/mqdefault.jpg`
    );
  } else if (project.fallbackImage) {
    fallbacks.push(project.fallbackImage);
  }
  return {
    src: project.image,
    fallbacks: [...new Set(fallbacks)].filter(url => url !== project.image)
  };
}

function tile(project, extra = "", tall = false, placement = "", tileRatio = project?.ratio || "16-9") {
  const ratio = tall ? "tile-tall" : `ratio-${tileRatio}`;
  if (!project) {
    return `<article class="tile ${ratio} ${extra} placeholder-tile" style="${placement}" aria-hidden="true"><div class="tile-media"><span class="placeholder-mark"></span></div></article>`;
  }
  const thumb = thumbnailFor(project);
  const image = project.platform === "mediaflow"
    ? `<span class="project-fallback" aria-hidden="true"><span>MEDIAFLOW</span><b>03</b></span>`
    : thumb
      ? `<img class="tile-poster" src="${esc(thumb.src)}" data-fallbacks="${esc(thumb.fallbacks.join("|"))}" data-placeholder="${esc(project.posterText || "")}" alt="" loading="lazy" decoding="async">`
      : `<span class="placeholder-mark" aria-hidden="true"></span>`;
  const preview = project.platform === "mediaflow"
    ? `<video class="hover-video mediaflow-preview" muted loop playsinline preload="none"></video>`
    : project.preview
      ? `<video class="hover-video local-preview" muted loop playsinline preload="none" ${project.previewPoster ? `poster="${esc(project.previewPoster)}"` : ""} data-src="${esc(project.preview)}"></video>`
      : "";
  const platformData = project.platform
    ? `data-platform="${esc(project.platform)}" data-video-id="${esc(project.videoId)}" data-video-url="${esc(project.video)}"`
    : "";
  const note = project.note && COMMENT_PROJECT_IDS.has(project.id)
    ? `data-note="${esc(project.note)}" data-note-type="${esc(project.noteType || "A NOTE")}"`
    : "";
  return `<article class="tile ${ratio} ${extra}" style="${placement}" data-id="${esc(project.id)}" data-ratio="${esc(tileRatio)}" ${platformData} ${note} tabindex="0" role="button" aria-label="Open project film">
    <div class="tile-media">${image}${preview}</div>
  </article>`;
}

function reelTile() {
  return `<article class="tile reel-tile" data-id="showreel" data-anchor="showreel" tabindex="0" role="button" aria-label="Play cinematography showreel">
    <img class="reel-poster" src="https://vumbnail.com/${REEL_ID}.jpg" alt="Lucas Lindgren cinematography showreel thumbnail" loading="eager" decoding="async">
    <div class="reel-invite"><span class="reel-name">Lucas Lindgren</span><span class="reel-label">SHOWREEL</span><span class="reel-play">▶</span></div>
  </article>`;
}

/* LINDCINE V47 — four-row, ratio-locked horizontal mosaic.
   One complete run contains each of the 26 projects exactly once. */
const TILE_RATIOS = {"16-9":16/9, "2-35":2.35, "1":1, "4-3":4/3};
const COMMENT_PROJECT_IDS = new Set(["doc","commercial","light","wedding","bts","events","docfilm"]);
const projectById = Object.fromEntries(projects.map(p => [p.id,p]));
let noteRandomSeed = 0x51F15E;
function rand() { noteRandomSeed = (noteRandomSeed * 1664525 + 1013904223) >>> 0; return noteRandomSeed / 4294967296; }
const ROW_H = 25;
const SEGMENTS = {
  A: {ratio: 3.5555555555555554, width: 88.88888888888889},
  B: {ratio: 4.127777777777778, width: 103.19444444444445},
  C: {ratio: 4.127777777777778, width: 103.19444444444445}
};
const PANEL_W = 117.5; // 2.35:1 at 50svh high
const X_SHOWREEL = SEGMENTS.A.width;
const X_MIDDLE = X_SHOWREEL + PANEL_W;
const X_RIGHTNOW = X_MIDDLE + SEGMENTS.B.width;
const X_RIGHT = X_RIGHTNOW + PANEL_W;
const RUN_WIDTH = X_RIGHT + SEGMENTS.C.width;
const ROW_GROUPS = [
  {x:0, y:0, width:SEGMENTS.A.width, ids:["wedding","events"]},
  {x:0, y:25, width:SEGMENTS.A.width, ids:["commercial","new09"]},
  {x:X_MIDDLE, y:0, width:SEGMENTS.B.width, ids:["new07","new08"]},
  {x:X_MIDDLE, y:25, width:SEGMENTS.B.width, ids:["hostprommis","campaign","new10"]},
  {x:X_RIGHT, y:0, width:SEGMENTS.C.width, ids:["new04","new05","new03"]},
  {x:X_RIGHT, y:25, width:SEGMENTS.C.width, ids:["docfilm","bts"]},
  {x:0, y:50, width:SEGMENTS.A.width, ids:["selected","new06"]},
  {x:0, y:75, width:SEGMENTS.A.width, ids:["music","new02"]},
  {x:X_MIDDLE, y:50, width:SEGMENTS.B.width, ids:["brand","new01"]},
  {x:X_MIDDLE, y:75, width:SEGMENTS.B.width, ids:["light","new11"]},
  {x:X_RIGHT, y:50, width:SEGMENTS.C.width, ids:["narrative","doc"]},
  {x:X_RIGHT, y:75, width:SEGMENTS.C.width, ids:["chasing","people"]}
];

const configs = {
  about: {
    copy:`<span class="kicker">BEHIND THE CAMERA</span><h1>Lucas<br>Lindgren<span>.</span></h1><p class="info-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><div class="info-body"><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing.</p><p>I’m interested in people, atmosphere and images that serve a story. Available for selected projects in Sweden and internationally.</p></div>`
  },
  rightnow: {
    copy:`<span class="kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2><div class="current-work"><span class="kicker">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>`
  },
  contact: {
    copy:`<span class="kicker">HAVE SOMETHING IN MIND?</span><h2>Let's make<br>something<span>.</span></h2><a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a><span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>`
  }
};

function infoPanel(kind, x, y) {
  return `<section class="feature-panel info-copy info-copy--${kind}" style="left:${x}svh;top:${y}svh;width:${PANEL_W}svh;height:50svh" data-anchor="${kind}">
    <div class="info-backdrop" aria-hidden="true"><span class="info-backdrop-shade"></span></div>
    <div class="info-content">${configs[kind].copy}</div>
  </section>`;
}

function projectRow(group) {
  let cursor = group.x;
  let html = '';
  for (const id of group.ids) {
    const project = projectById[id];
    if (!project) throw new Error(`Unknown project in layout: ${id}`);
    const ratio = TILE_RATIOS[project.ratio];
    if (!ratio) throw new Error(`Unknown ratio for ${id}: ${project.ratio}`);
    const width = ROW_H * ratio;
    html += tile(project, 'wall-tile', false,
      `left:${cursor.toFixed(5)}svh;top:${group.y}svh;width:${width.toFixed(5)}svh;height:${ROW_H}svh`, project.ratio);
    cursor += width;
  }
  const remaining = group.x + group.width - cursor;
  if (remaining < -0.05) {
    throw new Error(`Mosaic row overflows its segment by ${Math.abs(remaining).toFixed(3)}svh`);
  }
  if (remaining > 0.05) {
    // Use a tightly cropped continuation of the final real project image rather
    // than an empty plus tile. This is a decorative crop, not another project.
    const source = projectById[group.ids[group.ids.length - 1]];
    const poster = source?.image || source?.previewPoster || "";
    html += `<div class="tile wall-tile segment-filler" aria-hidden="true"
      style="left:${cursor.toFixed(5)}svh;top:${group.y}svh;width:${remaining.toFixed(5)}svh;height:${ROW_H}svh">
      <div class="tile-media">${poster ? `<img src="${esc(poster)}" alt="" loading="lazy" decoding="async">` : `<span class="project-fallback"><span>SELECTED WORK</span></span>`}</div>
    </div>`;
  }
  return html;
}

function renderRun(copy) {
  const tiles = ROW_GROUPS.map(projectRow).join('');
  return `<div class="world-run" data-copy="${copy}" style="--run-width:${RUN_WIDTH.toFixed(5)}svh">
    ${tiles}
    ${reelTilePositioned(X_SHOWREEL,0)}
    ${infoPanel('rightnow',X_RIGHTNOW,0)}
    ${infoPanel('about',X_SHOWREEL,50)}
    ${infoPanel('contact',X_RIGHTNOW,50)}
  </div>`;
}

function reelTilePositioned(x,y) {
  return reelTile().replace('class="tile reel-tile"','class="tile reel-tile" style="left:'+x+'svh;top:'+y+'svh;width:'+PANEL_W+'svh;height:50svh"');
}


function validateProjectData() {
  const allowed = new Set(["1", "4-3", "16-9", "2-35"]);
  const ids = new Set();
  for (const project of projects) {
    if (ids.has(project.id)) throw new Error(`Duplicate project id: ${project.id}`);
    ids.add(project.id);
    if (!allowed.has(project.ratio)) throw new Error(`Unsupported tile ratio for ${project.id}: ${project.ratio}`);
  }
}

function render() {
  validateProjectData();
  track.innerHTML = [0,1,2].map(renderRun).join('');
  const used = ROW_GROUPS.flatMap(group => group.ids);
  const unique = new Set(used);
  if (used.length !== projects.length || unique.size !== projects.length || projects.some(p => !unique.has(p.id))) {
    throw new Error('Layout validation failed: every project must appear exactly once per run.');
  }
}

function setWallGradientPositions() { /* Ratios and coordinates are fixed; no per-tile gradient remapping needed. */ }
function middleRun() { return track.querySelector('.world-run[data-copy="1"]'); }

function stopActive() {
  clearTimeout(noteTimer);
  clearTimeout(noteTypeTimer);
  clearTimeout(dimTimer);
  document.body.classList.remove("dim");
  noteBox.classList.remove("visible", "typing");
  noteText.textContent = "";
  if (activeTile) {
    activeTile.classList.remove("is-active");
    if (activeTile.classList.contains("reel-tile") && !activeTile.classList.contains("is-full")) {
      activeTile.querySelector(".reel-frame")?.remove();
      activeTile.classList.remove("is-playing");
    }
    activeTile.querySelector(".tile-preview-frame")?.remove();
    const video = activeTile.querySelector(".hover-video");
    if (video) {
      if (video.classList.contains("mediaflow-preview")) {
        releaseHlsVideo(video);
      } else {
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    }
  }
  activeTile = null;
  document.body.classList.remove("has-active");
}

const NOTE_POSITIONS = ["bottom-left","bottom-right","top-left","top-right","mid-left","mid-right"];
let lastNotePosition = "";
function showNote(tileNode) {
  clearTimeout(noteTypeTimer);
  if (!tileNode.dataset.note) return;

  noteKicker.textContent = tileNode.dataset.noteType || "A NOTE";
  noteText.textContent = "";
  const options = NOTE_POSITIONS.filter(position => position !== lastNotePosition);
  const position = options[Math.floor(rand() * options.length)];
  lastNotePosition = position;
  noteBox.dataset.position = position;
  noteBox.classList.remove("visible", "typing");
  // Restart the reveal transition even when two notes appear quickly.
  void noteBox.offsetWidth;
  noteBox.classList.add("visible", "typing");

  const characters = Array.from(tileNode.dataset.note);
  let index = 0;
  const typeNext = () => {
    if (activeTile !== tileNode || !noteBox.classList.contains("visible")) return;
    noteText.textContent = characters.slice(0, index).join("");
    index += 1;
    if (index <= characters.length) {
      noteTypeTimer = window.setTimeout(typeNext, 27);
    } else {
      noteBox.classList.remove("typing");
    }
  };
  typeNext();
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

const HLS_INSTANCES = new WeakMap();
let hlsLibraryPromise = null;

function loadHlsLibrary() {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (hlsLibraryPromise) return hlsLibraryPromise;
  hlsLibraryPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@1";
    script.async = true;
    script.onload = () => window.Hls ? resolve(window.Hls) : reject(new Error("HLS.js did not expose Hls"));
    script.onerror = () => reject(new Error("Could not load HLS.js"));
    document.head.appendChild(script);
  });
  return hlsLibraryPromise;
}

function releaseHlsVideo(video) {
  if (!video) return;
  const instance = HLS_INSTANCES.get(video);
  if (instance) {
    instance.destroy();
    HLS_INSTANCES.delete(video);
  }
  video.pause();
  video.removeAttribute("src");
  try { video.load(); } catch (_) {}
}

function startHlsVideo(video, source, autoplay = true) {
  if (!video || !source) return;
  releaseHlsVideo(video);
  video.controls = !video.classList.contains("mediaflow-preview");
  video.playsInline = true;
  video.muted = video.classList.contains("mediaflow-preview");

  const useNative = () => {
    video.src = source;
    video.load();
    if (autoplay) video.play().catch(() => {});
  };

  loadHlsLibrary().then(Hls => {
    if (!video.isConnected) return;
    if (Hls && Hls.isSupported()) {
      const instance = new Hls({enableWorker:true});
      HLS_INSTANCES.set(video, instance);
      instance.loadSource(source);
      instance.attachMedia(video);
      instance.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay && video.isConnected) video.play().catch(() => {});
      });
      instance.on(Hls.Events.ERROR, (_event, data) => {
        if (data && data.fatal) {
          video.dataset.streamError = "1";
          releaseHlsVideo(video);
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      useNative();
    } else {
      video.dataset.streamError = "1";
    }
  }).catch(() => {
    if (video.isConnected && video.canPlayType("application/vnd.apple.mpegurl")) useNative();
    else video.dataset.streamError = "1";
  });
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
  return project.preview || "";
}

function fitPreviewFrame(frame, tileNode, project) {
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
  const localMode = project.platform === "local";
  const mediaflowMode = project.platform === "mediaflow";
  projectModal.querySelector(".project-modal-dialog").classList.toggle("local-mode", localMode);
  projectModalFrame.classList.toggle("local-mode", localMode);
  projectModal.querySelector(".project-modal-dialog").classList.toggle("mediaflow-mode", mediaflowMode);
  projectModalFrame.classList.toggle("mediaflow-mode", mediaflowMode);
  projectModalTitle.textContent = "";
  projectModalLink.href = project.video;
  projectModalLink.textContent = localMode ? "OPEN VIDEO FILE ↗" : mediaflowMode ? "OPEN VIDEO STREAM ↗" : `OPEN ON ${project.platform.toUpperCase()} ↗`;
  projectModalFrame.replaceChildren();

  if (localMode) {
    const video = document.createElement("video");
    video.className = "project-player-frame local-player-frame";
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = new URL(project.video, document.baseURI).href;
    video.addEventListener("loadedmetadata", () => video.play().catch(() => {}), {once:true});
    projectModalFrame.appendChild(video);
    video.load();
  } else if (mediaflowMode) {
    const video = document.createElement("video");
    video.className = "project-player-frame mediaflow-player-frame";
    video.title = `${project.title} player`;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    projectModalFrame.appendChild(video);
    startHlsVideo(video, project.video, true);
  } else {
    const frame = document.createElement("iframe");
    frame.className = `project-player-frame ${project.platform}-player-frame`;
    frame.title = `${project.title} player`;
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen; web-share";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.src = projectEmbedUrl(project, "full");
    projectModalFrame.appendChild(frame);
  }
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("player-open");
  projectModal.querySelector(".project-modal-close").focus({preventScroll:true});
}

function closeProjectPlayer() {
  if (!projectModal.classList.contains("open")) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  const mediaflowVideo = projectModalFrame.querySelector(".mediaflow-player-frame");
  if (mediaflowVideo) releaseHlsVideo(mediaflowVideo);
  projectModalFrame.replaceChildren();
  projectModalFrame.classList.remove("local-mode", "mediaflow-mode");
  projectModal.querySelector(".project-modal-dialog").classList.remove("local-mode", "mediaflow-mode");
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
    if (project?.platform === "local" && project.ratio === tileNode.dataset.ratio) {
      const localPreview = tileNode.querySelector(".local-preview");
      if (localPreview) {
        const source = new URL(localPreview.dataset.src || project.preview, document.baseURI).href;
        if (localPreview.src !== source) {
          localPreview.src = source;
          localPreview.load();
        }
        localPreview.play().catch(() => {});
      }
    } else if (project?.platform === "mediaflow" && project.ratio === tileNode.dataset.ratio) {
      startHlsVideo(tileNode.querySelector(".mediaflow-preview"), project.video, true);
    } else if (project?.platform && project.ratio === tileNode.dataset.ratio) {
      mountProjectPreview(tileNode, project);
    } else {
      tileNode.querySelector(".hover-video")?.play().catch(() => {});
    }
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
  track.querySelectorAll(".reel-poster").forEach(image => {
    image.addEventListener("error", () => image.remove(), {once:true});
  });
  track.querySelectorAll(".tile-poster").forEach(image => {
    const showThumbnailPlaceholder = () => {
      const media = image.closest(".tile-media");
      image.remove();
      if (media && !media.querySelector(".placeholder-mark")) {
        const mark = document.createElement("span");
        mark.className = "placeholder-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = image.dataset.placeholder || "";
        media.prepend(mark);
      }
    };
    const advanceThumbnail = () => {
      const fallbacks = (image.dataset.fallbacks || "").split("|").filter(Boolean);
      const next = fallbacks.shift();
      if (next) {
        image.dataset.fallbacks = fallbacks.join("|");
        image.src = next;
      } else {
        showThumbnailPlaceholder();
      }
    };
    image.addEventListener("error", advanceThumbnail);
    image.addEventListener("load", () => {
      // YouTube may return a 120×90 placeholder with HTTP 200. Treat it as
      // unavailable even when it is the final fallback, then show a real tile placeholder.
      if (image.currentSrc.includes("img.youtube.com") && image.naturalWidth <= 120) {
        advanceThumbnail();
      }
    });
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
  const center = rect.left - viewport.getBoundingClientRect().left + rect.width / 2;
  const initial = center - viewport.clientWidth / 2;
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
  const center = rect.left - viewport.getBoundingClientRect().left + rect.width / 2;
  scrollToX(viewport.scrollLeft + center - viewport.clientWidth / 2, true);
}

function goToReel() {
  const node = middleRun()?.querySelector(".reel-tile");
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const center = rect.left - viewport.getBoundingClientRect().left + rect.width / 2;
  scrollToX(viewport.scrollLeft + center - viewport.clientWidth / 2, true);
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

