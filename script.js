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
  caption.textContent=`${p.title} / ${p.detail}`;
  dialog.showModal();
}
function closeDialog(){dialog.close();frame.innerHTML="";}
document.querySelector(".dialog-close").addEventListener("click",closeDialog);
dialog.addEventListener("click",e=>{if(e.target===dialog)closeDialog();});

// Smooth, seamless horizontal archive loop.
// Three identical project runs are rendered; the visitor starts in the middle run.
// When the scroll position approaches either outer run, we shift by one run-width.
// Since the content is duplicated pixel-for-pixel, the recentering is invisible.
const workSection=document.querySelector("#work");
let cycleWidth=0;
let targetScroll=0;
let animationFrame=0;
let lastWheelTime=0;

function measureLoop(){
  const firstRun=grid.querySelector('.project-run[data-copy="0"]');
  const middleRun=grid.querySelector('.project-run[data-copy="1"]');
  if(!firstRun||!middleRun)return;
  cycleWidth=middleRun.offsetLeft-firstRun.offsetLeft;
  if(cycleWidth>0){
    viewport.scrollLeft=cycleWidth;
    targetScroll=cycleWidth;
  }
}
function keepLoopCentered(){
  if(!cycleWidth)return;
  const low=cycleWidth*.5;
  const high=cycleWidth*2-viewport.clientWidth*.5;
  if(viewport.scrollLeft<low){
    viewport.scrollLeft+=cycleWidth;
    targetScroll+=cycleWidth;
  }else if(viewport.scrollLeft>high){
    viewport.scrollLeft-=cycleWidth;
    targetScroll-=cycleWidth;
  }
}
function animateScroll(){
  const current=viewport.scrollLeft;
  const diff=targetScroll-current;
  if(Math.abs(diff)<.45){
    viewport.scrollLeft=targetScroll;
    animationFrame=0;
    keepLoopCentered();
    return;
  }
  viewport.scrollLeft=current+diff*.14;
  keepLoopCentered();
  animationFrame=requestAnimationFrame(animateScroll);
}
function requestSmoothScroll(){
  if(!animationFrame)animationFrame=requestAnimationFrame(animateScroll);
}
function addWheelMovement(delta){
  if(!cycleWidth)return;
  targetScroll+=delta;
  // Keep the target within the duplicated buffer while preserving the same
  // visual position after a whole-cycle shift.
  while(targetScroll<cycleWidth*.5)targetScroll+=cycleWidth;
  while(targetScroll>cycleWidth*2-viewport.clientWidth*.5)targetScroll-=cycleWidth;
  requestSmoothScroll();
}
workSection.addEventListener("wheel",e=>{
  let dx=e.deltaX,dy=e.deltaY;
  if(e.deltaMode===1){dx*=16;dy*=16;}
  else if(e.deltaMode===2){dx*=viewport.clientWidth;dy*=viewport.clientWidth;}
  const delta=Math.abs(dx)>Math.abs(dy)?dx:dy;
  if(!delta)return;
  e.preventDefault();
  // Slightly amplify the wheel so the archive feels responsive, then ease it.
  addWheelMovement(delta*1.35);
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
  keepLoopCentered();
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
