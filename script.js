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
  grid.innerHTML=projects.map((p,i)=>{
    const poster=p.image?`style="--poster:url('${p.image}');"`:"";
    const image=p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:"";
    const preview=p.preview?`<video muted loop playsinline preload="none" src="${p.preview}"></video>`:"";
    const hasVideo=Boolean(p.video);
    return `<article class="project ${hasVideo?"":"no-video"}" tabindex="0" role="button" data-index="${i}" aria-label="Open ${p.title}">
      <div class="project-media" ${poster}>${image}${preview}</div>
      ${hasVideo?'<span class="project-play" aria-hidden="true">↗</span>':""}
      <div class="project-info"><div><div class="project-title">${p.title}</div><div class="project-sub">${p.detail}</div></div><span class="project-number">${String(i+1).padStart(2,"0")}</span></div>
    </article>`;
  }).join("");
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

// Horizontal archive navigation.
// Keep the CSS grid implicit: grid-auto-flow + grid-auto-columns creates
// as many horizontal columns as the mosaic needs.
grid.style.gridTemplateColumns="none";
grid.style.width="max-content";
grid.style.minWidth="max-content";

// Wheel: bind directly to the Work section.
// A regular vertical mouse wheel is translated into horizontal movement.
// Trackpads can send either deltaX or deltaY; both are supported.
const workSection=document.querySelector("#work");
workSection.addEventListener("wheel",e=>{
  const max=viewport.scrollWidth-viewport.clientWidth;
  if(max<=1)return;

  let dx=e.deltaX;
  let dy=e.deltaY;
  // Normalize line/page-based wheel deltas to approximate pixel movement.
  if(e.deltaMode===1){dx*=16;dy*=16;}
  else if(e.deltaMode===2){dx*=viewport.clientWidth;dy*=viewport.clientWidth;}

  const movement=Math.abs(dx)>Math.abs(dy)?dx:dy;
  if(movement===0)return;

  // Only consume the wheel event when the archive can move in that direction.
  const next=viewport.scrollLeft+movement;
  if(next<0 || next>max)return;
  e.preventDefault();
  viewport.scrollLeft=next;
},{passive:false});

// Drag-to-scroll on empty areas of the viewport. Project cards remain clickable.
let dragging=false,startX=0,startScroll=0;
viewport.addEventListener("pointerdown",e=>{
  if(e.pointerType==="touch"||e.target.closest(".project"))return;
  dragging=true;startX=e.clientX;startScroll=viewport.scrollLeft;
  viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener("pointermove",e=>{
  if(!dragging)return;
  viewport.scrollLeft=startScroll-(e.clientX-startX);
});
function stopDragging(){dragging=false;}
viewport.addEventListener("pointerup",stopDragging);
viewport.addEventListener("pointercancel",stopDragging);

// Keyboard support when the archive is focused.
viewport.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"){e.preventDefault();viewport.scrollBy({left:360,behavior:"smooth"});}
  if(e.key==="ArrowLeft"){e.preventDefault();viewport.scrollBy({left:-360,behavior:"smooth"});}
  if(e.key==="Home"){e.preventDefault();viewport.scrollTo({left:0,behavior:"smooth"});}
  if(e.key==="End"){e.preventDefault();viewport.scrollTo({left:viewport.scrollWidth,behavior:"smooth"});}
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
