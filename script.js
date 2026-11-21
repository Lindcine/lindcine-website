/*
  LINDCINE — horizontal project archive.
  Replace each image with a direct JPG/WebP URL and add video / preview URLs.
  `video` opens YouTube or Vimeo in the player. `preview` is a direct MP4 URL
  and plays silently while the visitor hovers a card on desktop.
*/
const projects = [
  {title:"Cinematography Reel",detail:"Selected cinematography · 2026",year:"2026",image:"",video:"https://vimeo.com/994186610",preview:""},
  {title:"Documentary",detail:"Long-form · Cinematography",year:"2025",image:"",video:"",preview:""},
  {title:"Commercial & Brand",detail:"Campaign film · Cinematography",year:"2025",image:"",video:"",preview:""},
  {title:"People & Portraits",detail:"Interviews · Visual storytelling",year:"2024",image:"",video:"",preview:""},
  {title:"Narrative",detail:"Short film · Camera & lighting",year:"2024",image:"",video:"",preview:""},
  {title:"Selected Projects",detail:"Film · Editing · Collaboration",year:"2023",image:"",video:"",preview:""},
  {title:"Documentary Film",detail:"Character-led storytelling",year:"2025",image:"",video:"",preview:""},
  {title:"Brand Film",detail:"Commercial · Camera",year:"2024",image:"",video:"",preview:""},
  {title:"Portrait",detail:"People · Interview",year:"2024",image:"",video:"",preview:""},
  {title:"Behind the Scenes",detail:"Production · Camera",year:"2023",image:"",video:"",preview:""},
  {title:"Campaign",detail:"Commercial · Cinematography",year:"2023",image:"",video:"",preview:""},
  {title:"Live & Events",detail:"Event film · Editing",year:"2022",image:"",video:"",preview:""},
  {title:"Short-form",detail:"Social · Branded content",year:"2022",image:"",video:"",preview:""},
  {title:"Music & Culture",detail:"Performance · Visuals",year:"2022",image:"",video:"",preview:""},
  {title:"Documentary",detail:"Camera · Long-form",year:"2021",image:"",video:"",preview:""},
  {title:"Commercial",detail:"Production · Camera",year:"2021",image:"",video:"",preview:""},
  {title:"Portrait Series",detail:"Interview · Lighting",year:"2021",image:"",video:"",preview:""},
  {title:"Earlier Work",detail:"Selected projects · 2020",year:"2020",image:"",video:"",preview:""}
];

const grid=document.querySelector("#workGrid");
const viewport=document.querySelector("#workViewport");
const count=document.querySelector("#workCount");
const dialog=document.querySelector("#videoDialog");
const frame=document.querySelector("#dialogFrame");
const caption=document.querySelector("#dialogCaption");

function videoEmbed(url){
  if(!url)return "";
  const yt=url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if(yt)return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm=url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(vm)return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  return url;
}
function renderProjects(){
  count.textContent=`${String(projects.length).padStart(2,"0")} PROJECTS`;
  const copies=3;
  grid.innerHTML=Array.from({length:copies},(_,copy)=>`<div class="project-run" data-copy="${copy}" aria-hidden="${copy!==1}">`+projects.map((p,i)=>{
    const poster=p.image?`style="--poster:url('${p.image}');"`:"";
    const image=p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:"";
    const preview=p.preview?`<video muted loop playsinline preload="none" src="${p.preview}"></video>`:"";
    const hasVideo=Boolean(p.video);
    return `<article class="project tile-${i%10} ${hasVideo?"":"no-video"}" tabindex="${copy===1?0:-1}" role="button" data-index="${i}" aria-label="Open ${p.title}">
      <div class="project-media" ${poster}>${image}${preview}</div>
      ${hasVideo?'<span class="project-play" aria-hidden="true">↗</span>':""}
      <div class="project-info"><div><div class="project-title">${p.title}</div><div class="project-sub">${p.detail}</div></div><span class="project-number">${String(i+1).padStart(2,"0")}</span></div>
    </article>`;
  }).join("")+`</div>`).join("");

  grid.querySelectorAll(".project").forEach(card=>{
    const p=projects[Number(card.dataset.index)],vid=card.querySelector("video");
    card.addEventListener("mouseenter",()=>{if(vid)vid.play().catch(()=>{});});
    card.addEventListener("mouseleave",()=>{if(vid){vid.pause();vid.currentTime=0;}});
    card.addEventListener("click",()=>openProject(p));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openProject(p);}});
  });
}
function openProject(p){
  const src=videoEmbed(p.video);
  if(!src)return;
  frame.innerHTML=`<iframe src="${src}" title="${p.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  caption.textContent=p.title;
  dialog.showModal();
}
function closeDialog(){dialog.close();frame.innerHTML="";}
document.querySelector(".dialog-close").addEventListener("click",closeDialog);
dialog.addEventListener("click",e=>{if(e.target===dialog)closeDialog();});

// Seamless infinite archive with continuous easing.
// Three identical runs are rendered; the viewport lives on the middle run.
// Re-centering always shifts both the rendered position and animation target
// by exactly one run width, so the visible content and direction are preserved.
const workSection=document.querySelector("#work");
let cycleWidth=0;
let targetScroll=0;
let animationFrame=0;
let lastFrameTime=0;

function measureLoop(){
  const first=grid.querySelector('.project-run[data-copy="0"]');
  const middle=grid.querySelector('.project-run[data-copy="1"]');
  if(!first||!middle)return;
  // Both runs share the same flex parent; use their left-edge distance.
  cycleWidth=middle.getBoundingClientRect().left-first.getBoundingClientRect().left;
  if(cycleWidth>0){
    viewport.scrollLeft=cycleWidth;
    targetScroll=cycleWidth;
  }
}
function rebaseLoop(){
  if(!cycleWidth)return;
  // Keep the viewport in the middle copy. Shift target by the same amount,
  // preserving the exact distance still to travel and therefore the direction.
  while(viewport.scrollLeft>=cycleWidth*2){
    viewport.scrollLeft-=cycleWidth;
    targetScroll-=cycleWidth;
  }
  while(viewport.scrollLeft<0){
    viewport.scrollLeft+=cycleWidth;
    targetScroll+=cycleWidth;
  }
}
function animateScroll(time){
  if(!lastFrameTime)lastFrameTime=time;
  const dt=Math.min(32,time-lastFrameTime);
  lastFrameTime=time;
  const current=viewport.scrollLeft;
  const diff=targetScroll-current;
  // Frame-rate independent exponential easing; soft but responsive.
  const ease=1-Math.pow(0.0015,dt/1000);
  if(Math.abs(diff)<0.35){
    viewport.scrollLeft=targetScroll;
    rebaseLoop();
    animationFrame=0;
    lastFrameTime=0;
    return;
  }
  viewport.scrollLeft=current+diff*ease;
  rebaseLoop();
  animationFrame=requestAnimationFrame(animateScroll);
}
function requestSmoothScroll(){
  if(!animationFrame){lastFrameTime=0;animationFrame=requestAnimationFrame(animateScroll);}
}
function addWheelMovement(delta){
  if(!cycleWidth)return;
  targetScroll+=delta;
  requestSmoothScroll();
}
workSection.addEventListener('wheel',e=>{
  let dx=e.deltaX,dy=e.deltaY;
  if(e.deltaMode===1){dx*=16;dy*=16;}
  else if(e.deltaMode===2){dx*=viewport.clientWidth;dy*=viewport.clientWidth;}
  const delta=Math.abs(dx)>Math.abs(dy)?dx:dy;
  if(!delta)return;
  e.preventDefault();
  // A little momentum from each wheel notch; the easing handles the glide.
  addWheelMovement(delta*1.65);
},{passive:false});

let dragging=false,dragStartX=0,dragStartScroll=0;
viewport.addEventListener("pointerdown",e=>{
  if(e.pointerType==="touch"||e.target.closest(".project"))return;
  dragging=true;
  dragStartX=e.clientX;
  dragStartScroll=viewport.scrollLeft;
  viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener("pointermove",e=>{
  if(!dragging)return;
  const moved=dragStartScroll-(e.clientX-dragStartX);
  viewport.scrollLeft=moved;
  targetScroll=moved;
  rebaseLoop();
});
function stopDragging(){dragging=false;}
viewport.addEventListener("pointerup",stopDragging);
viewport.addEventListener("pointercancel",stopDragging);

viewport.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"){e.preventDefault();addWheelMovement(420);}
  if(e.key==="ArrowLeft"){e.preventDefault();addWheelMovement(-420);}
  if(e.key==="Home"){e.preventDefault();addWheelMovement(-cycleWidth);}
  if(e.key==="End"){e.preventDefault();addWheelMovement(cycleWidth);}
});

const menuButton=document.querySelector(".menu-button"),nav=document.querySelector(".main-nav");
menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
  menuButton.innerHTML=open?'CLOSE <span>×</span>':'MENU <span>＋</span>';
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.innerHTML='MENU <span>＋</span>';
}));
document.querySelector("#year").textContent=new Date().getFullYear();
renderProjects();
requestAnimationFrame(()=>requestAnimationFrame(measureLoop));
window.addEventListener('resize',()=>requestAnimationFrame(measureLoop));
