/*
  LINDCINE — INFINITE WORLD (v14)
  Replace image with a direct image URL, preview with a direct MP4/WebM URL,
  and video with a YouTube/Vimeo URL. Comments are optional and intentionally
  used on only selected tiles to keep the archive unpredictable.
*/
const projects = [
  {title:"Cinematography Reel",kind:"production",size:"feature",detail:"Selected cinematography",image:"",video:"https://vimeo.com/994186610",preview:"",nav:"showreel"},
  {title:"Documentary",kind:"production",size:"tall",detail:"Long-form film",image:"",video:"",preview:""},
  {title:"Commercial & Brand",kind:"production",size:"wide",detail:"Campaign film",image:"",video:"",preview:""},
  {title:"A study in available light",kind:"fragment",size:"small",image:"",video:"",preview:"",comment:"A study in available light.",commentType:"A SMALL OBSERVATION"},
  {title:"People & Portraits",kind:"production",size:"small",detail:"Visual storytelling",image:"",video:"",preview:""},
  {title:"Wedding moment",kind:"moment",size:"wide",image:"",video:"",preview:"",comment:"The moments in between.",commentType:"A PERSONAL NOTE"},
  {title:"Narrative",kind:"production",size:"small",detail:"Camera & lighting",image:"",video:"",preview:""},
  {title:"Selected Projects",kind:"production",size:"wide",detail:"Film & collaboration",image:"",video:"",preview:""},
  {title:"Somewhere between here and nowhere",kind:"fragment",size:"tall",image:"",video:"",preview:"",comment:"Somewhere between here and nowhere.",commentType:"A SMALL OBSERVATION"},
  {title:"Brand Film",kind:"production",size:"small",detail:"Commercial",image:"",video:"",preview:""},
  {title:"Behind the Scenes",kind:"moment",size:"tall",image:"",video:"",preview:"",comment:"A little chaos behind the scenes.",commentType:"A PERSONAL NOTE"},
  {title:"Campaign",kind:"production",size:"small",detail:"Cinematography",image:"",video:"",preview:""},
  {title:"Live & Events",kind:"production",size:"wide",detail:"Event film",image:"",video:"",preview:""},
  {title:"Chasing the last light",kind:"fragment",size:"small",image:"",video:"",preview:"",comment:"Chasing the last light.",commentType:"A SMALL OBSERVATION"},
  {title:"Music & Culture",kind:"production",size:"small",detail:"Performance & visuals",image:"",video:"",preview:""},
  {title:"Documentary Film",kind:"production",size:"wide",detail:"Character-led storytelling",image:"",video:"",preview:""},
  {title:"An afternoon that turned into something else",kind:"moment",size:"small",image:"",video:"",preview:"",comment:"Didn't plan this one. Glad it happened.",commentType:"A PERSONAL NOTE"},
  {title:"Earlier Work",kind:"production",size:"tall",detail:"Selected projects",image:"",video:"",preview:""}
];

const grid=document.querySelector("#workGrid");
const viewport=document.querySelector("#workViewport");
const dialog=document.querySelector("#videoDialog");
const frame=document.querySelector("#dialogFrame");
const caption=document.querySelector("#dialogCaption");
const comment=document.querySelector("#hoverComment");
const commentText=document.querySelector("#commentText");
const commentKicker=document.querySelector("#commentKicker");
const navButtons=[...document.querySelectorAll("[data-nav]")];
let hoverTimer=0, commentTimer=0, activeCard=null, activeVideo=null;

function videoEmbed(url){
  if(!url)return "";
  const yt=url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if(yt)return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm=url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(vm)return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  return url;
}
function safeText(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

const aboutPanel=`<article class="world-panel about-panel" data-anchor="about" aria-label="About Lucas Lindgren">
  <div class="panel-image-wash"></div><div class="panel-content">
    <span class="panel-kicker">BEHIND THE CAMERA</span>
    <h1>Lucas<br>Lindgren<span>.</span></h1>
    <div class="panel-copy"><p class="panel-lead">Cinematographer, filmmaker and editor based in Stockholm.</p><p>I work across documentaries, commercials, branded films and other visual projects — moving between cinematography, camera, lighting and editing. I’m interested in people, atmosphere and images that serve a story.</p><p>Available for selected projects in Sweden and internationally.</p></div>
  </div>
</article>`;
const rightNowPanel=`<article class="world-panel rightnow-panel" data-anchor="right-now" aria-label="What Lucas is working on right now">
  <div class="panel-image-wash"></div><div class="panel-content rightnow-content">
    <span class="panel-kicker">A CURRENT CHAPTER</span><h2>Right<br>now<span>.</span></h2>
    <div class="current-project"><span class="current-label">IN PRODUCTION</span><h3>DO THE GAME</h3><p>A documentary journey following the people behind the creation of Den of Wolves, and the personal cost of pursuing a dream.</p><span class="current-meta">DOCUMENTARY SERIES · STOCKHOLM</span></div>
    <p class="rightnow-note">More soon.</p>
  </div>
</article>`;
const contactPanel=`<article class="world-panel contact-panel" data-anchor="contact" aria-label="Contact Lucas Lindgren">
  <div class="panel-image-wash"></div><div class="panel-content contact-content">
    <span class="panel-kicker">HAVE SOMETHING IN MIND?</span><h2>Let's<br>make something<span>.</span></h2>
    <a class="contact-email" href="mailto:lucas@lindcine.com">lucas@lindcine.com <span>↗</span></a>
    <span class="contact-location">STOCKHOLM, SWEDEN · AVAILABLE INTERNATIONALLY</span>
  </div>
</article>`;

function projectMarkup(p,i,copy){
  const poster=p.image?`style="--poster:url('${p.image.replace(/'/g,"%27")}')"`:"";
  const image=p.image?`<img src="${safeText(p.image)}" alt="${safeText(p.title)}" loading="lazy" decoding="async">`:"";
  const preview=p.preview?`<video muted loop playsinline preload="none" src="${safeText(p.preview)}"></video>`:"";
  const hasOpen=Boolean(p.video);
  const commentAttrs=p.comment?`data-comment="${safeText(p.comment)}" data-comment-type="${safeText(p.commentType||"A NOTE")}"`:"";
  return `<article class="project tile-${i%10} size-${p.size||"small"} kind-${p.kind||"production"} ${hasOpen?"has-project":""} ${p.preview?"has-preview":"no-preview"}" data-index="${i}" ${commentAttrs} tabindex="${copy===1?0:-1}" role="button" aria-label="${safeText(p.title)}" ${copy!==1?'aria-hidden="true"':''}>
    <div class="project-media" ${poster}>${image}${preview}<div class="placeholder-mark" aria-hidden="true">L.</div></div>
    <div class="project-info"><div class="project-title">${safeText(p.title)}</div>${p.detail?`<div class="project-sub">${safeText(p.detail)}</div>`:""}</div>
    ${hasOpen?'<span class="project-play" aria-hidden="true">↗</span>':""}
  </article>`;
}
function renderRun(copy){
  const cards=projects.map((p,i)=>projectMarkup(p,i,copy)).join("");
  return `<div class="project-run" data-copy="${copy}" aria-label="Archive sequence">${cards}${aboutPanel}${rightNowPanel}${contactPanel}</div>`;
}
function renderWorld(){grid.innerHTML=[0,1,2].map(renderRun).join("");}

function stopPreview(){
  if(activeVideo){activeVideo.pause();try{activeVideo.currentTime=0;}catch(e){} activeVideo.closest(".project")?.classList.remove("is-playing");}
  activeVideo=null;
}
function hideComment(){clearTimeout(commentTimer);comment.classList.remove("is-visible","is-typing");comment.setAttribute("aria-hidden","true");}
function clearActive(){clearTimeout(hoverTimer);clearTimeout(commentTimer);stopPreview();if(activeCard)activeCard.classList.remove("is-active");activeCard=null;document.body.classList.remove("has-active-tile");hideComment();}
function activateCard(card){
  if(activeCard===card)return;
  clearActive();activeCard=card;card.classList.add("is-active");document.body.classList.add("has-active-tile");
  const p=projects[Number(card.dataset.index)];
  const vid=card.querySelector("video");
  if(vid){activeVideo=vid;vid.play().then(()=>card.classList.add("is-playing")).catch(()=>{});}
  if(card.dataset.comment){
    commentTimer=window.setTimeout(()=>{
      commentKicker.textContent=card.dataset.commentType||"A NOTE";
      commentText.textContent=card.dataset.comment;
      comment.classList.add("is-visible","is-typing");
      comment.setAttribute("aria-hidden","false");
      window.setTimeout(()=>comment.classList.remove("is-typing"),650);
    },650);
  }
}
function bindRun(run,copy){
  run.querySelectorAll(".project").forEach(card=>{
    if(copy!==1)return;
    card.addEventListener("mouseenter",()=>{clearTimeout(hoverTimer);hoverTimer=window.setTimeout(()=>activateCard(card),190);});
    card.addEventListener("mouseleave",()=>{if(activeCard===card)clearActive();else clearTimeout(hoverTimer);});
    card.addEventListener("focus",()=>activateCard(card));
    card.addEventListener("blur",()=>{if(activeCard===card)clearActive();});
    card.addEventListener("click",()=>openProject(projects[Number(card.dataset.index)]));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openProject(projects[Number(card.dataset.index)]);}});
  });
}
function openProject(p){
  if(!p.video)return;
  clearActive();
  const src=videoEmbed(p.video);
  frame.innerHTML=`<iframe src="${src}" title="${safeText(p.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  caption.textContent=p.title;
  if(!dialog.open)dialog.showModal();
}
function closeDialog(){dialog.close();frame.innerHTML="";}
document.querySelector(".dialog-close").addEventListener("click",closeDialog);
dialog.addEventListener("click",e=>{if(e.target===dialog)closeDialog();});
dialog.addEventListener("close",()=>{frame.innerHTML="";});
document.querySelector("#dialogFullscreen").addEventListener("click",()=>{
  const iframe=frame.querySelector("iframe");
  if(!iframe)return;
  if(iframe.requestFullscreen)iframe.requestFullscreen().catch(()=>{});
  else if(iframe.webkitEnterFullscreen)iframe.webkitEnterFullscreen();
});

// One continuous horizontal sequence, repeated three times. The viewport starts
// in the middle copy; rebasing by one sequence width preserves direction.
let cycleWidth=0,targetScroll=0,animationFrame=0,lastFrameTime=0;
function middleRun(){return grid.querySelector('.project-run[data-copy="1"]');}
function measureLoop(){
  const first=grid.querySelector('.project-run[data-copy="0"]'),middle=middleRun();
  if(!first||!middle)return;
  cycleWidth=middle.getBoundingClientRect().left-first.getBoundingClientRect().left;
  if(cycleWidth>0){viewport.scrollLeft=cycleWidth;targetScroll=cycleWidth;}
}
function rebaseLoop(){
  if(!cycleWidth)return;
  while(viewport.scrollLeft>=cycleWidth*2){viewport.scrollLeft-=cycleWidth;targetScroll-=cycleWidth;}
  while(viewport.scrollLeft<0){viewport.scrollLeft+=cycleWidth;targetScroll+=cycleWidth;}
}
function animateScroll(time){
  if(!lastFrameTime)lastFrameTime=time;
  const dt=Math.min(32,time-lastFrameTime);lastFrameTime=time;
  const current=viewport.scrollLeft,diff=targetScroll-current;
  const ease=1-Math.pow(0.0015,dt/1000);
  if(Math.abs(diff)<.35){viewport.scrollLeft=targetScroll;rebaseLoop();animationFrame=0;lastFrameTime=0;return;}
  viewport.scrollLeft=current+diff*ease;rebaseLoop();animationFrame=requestAnimationFrame(animateScroll);
}
function requestSmoothScroll(){if(!animationFrame){lastFrameTime=0;animationFrame=requestAnimationFrame(animateScroll);}}
function moveBy(delta){if(!cycleWidth)return;targetScroll+=delta;requestSmoothScroll();}
function scrollToAnchor(name){
  const target=middleRun()?.querySelector(`[data-anchor="${name}"]`);
  if(!target||!cycleWidth)return;
  const viewportRect=viewport.getBoundingClientRect(),targetRect=target.getBoundingClientRect();
  const targetCenter=targetRect.left+targetRect.width/2;
  targetScroll=viewport.scrollLeft+(targetCenter-(viewportRect.left+viewport.clientWidth/2));
  requestSmoothScroll();
}
function scrollToShowreel(){
  const card=middleRun()?.querySelector('.project[data-index="0"]');
  if(!card||!cycleWidth)return;
  const vr=viewport.getBoundingClientRect(),cr=card.getBoundingClientRect();
  targetScroll=viewport.scrollLeft+(cr.left+cr.width/2-(vr.left+vr.width/2));
  requestSmoothScroll();
}

viewport.addEventListener("wheel",e=>{
  let dx=e.deltaX,dy=e.deltaY;
  if(e.deltaMode===1){dx*=16;dy*=16;}else if(e.deltaMode===2){dx*=viewport.clientWidth;dy*=viewport.clientWidth;}
  const delta=Math.abs(dx)>Math.abs(dy)?dx:dy;
  if(!delta)return;e.preventDefault();moveBy(delta*1.55);
},{passive:false});
let dragging=false,dragStartX=0,dragStartScroll=0;
viewport.addEventListener("pointerdown",e=>{
  if(e.pointerType==="touch"||e.target.closest(".project,.world-panel"))return;
  dragging=true;dragStartX=e.clientX;dragStartScroll=viewport.scrollLeft;viewport.setPointerCapture(e.pointerId);clearActive();
});
viewport.addEventListener("pointermove",e=>{if(!dragging)return;const moved=dragStartScroll-(e.clientX-dragStartX);viewport.scrollLeft=moved;targetScroll=moved;rebaseLoop();});
function stopDragging(){dragging=false;}viewport.addEventListener("pointerup",stopDragging);viewport.addEventListener("pointercancel",stopDragging);
viewport.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();moveBy(440);}if(e.key==="ArrowLeft"){e.preventDefault();moveBy(-440);}if(e.key==="Home"){e.preventDefault();scrollToShowreel();}if(e.key==="End"){e.preventDefault();scrollToAnchor("contact");}});

navButtons.forEach(button=>button.addEventListener("click",()=>{
  const target=button.dataset.nav;
  if(target==="home")scrollToShowreel();else if(target==="showreel")scrollToShowreel();else scrollToAnchor(target);
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector(".menu-button").setAttribute("aria-expanded","false");
  document.querySelector(".menu-button").innerHTML="MENU <span>＋</span>";
}));
const menuButton=document.querySelector(".menu-button"),nav=document.querySelector(".main-nav");
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.innerHTML=open?'CLOSE <span>×</span>':'MENU <span>＋</span>';});

renderWorld();
grid.querySelectorAll(".project-run").forEach((run,i)=>bindRun(run,i));
requestAnimationFrame(()=>requestAnimationFrame(()=>{measureLoop();document.body.classList.remove("world-loading");}));
window.addEventListener("resize",()=>requestAnimationFrame(measureLoop));
window.addEventListener("blur",clearActive);
