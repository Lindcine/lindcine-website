/*
  LINDCINE — project list
  Add one object per project. YouTube and Vimeo links open in the lightbox.
  For hover motion, add a direct MP4 preview URL in `preview`.
  `image` can be a direct image URL (JPG/WebP). Keep images reasonably compressed.
*/
const projects = [
  {
    title: "Cinematography Reel",
    detail: "Selected cinematography · 2026",
    year: "2026",
    image: "",
    video: "https://vimeo.com/994186610",
    preview: ""
  },
  {
    title: "Documentary",
    detail: "Long-form · Cinematography",
    year: "2025",
    image: "",
    video: "",
    preview: ""
  },
  {
    title: "Commercial & Brand",
    detail: "Campaign film · Cinematography",
    year: "2025",
    image: "",
    video: "",
    preview: ""
  },
  {
    title: "People & Portraits",
    detail: "Interviews · Visual storytelling",
    year: "2024",
    image: "",
    video: "",
    preview: ""
  },
  {
    title: "Narrative",
    detail: "Short film · Camera & lighting",
    year: "2024",
    image: "",
    video: "",
    preview: ""
  },
  {
    title: "Selected Projects",
    detail: "Film · Editing · Collaboration",
    year: "2023",
    image: "",
    video: "",
    preview: ""
  }
];

const grid = document.querySelector("#workGrid");
const count = document.querySelector("#workCount");
const dialog = document.querySelector("#videoDialog");
const frame = document.querySelector("#dialogFrame");
const caption = document.querySelector("#dialogCaption");

function videoEmbed(url) {
  if (!url) return "";
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  return url;
}

function renderProjects() {
  count.textContent = `${String(projects.length).padStart(2, "0")} PROJECTS`;
  grid.innerHTML = projects.map((project, index) => {
    const poster = project.image ? `style="--poster:url('${project.image}');"` : "";
    const image = project.image ? `<img src="${project.image}" alt="${project.title}" loading="lazy">` : "";
    const preview = project.preview ? `<video muted loop playsinline preload="none" src="${project.preview}"></video>` : "";
    const hasVideo = Boolean(project.video);
    return `
      <article class="project ${hasVideo ? "" : "no-video"}" tabindex="0" role="button"
        data-index="${index}" aria-label="Open ${project.title}">
        <div class="project-media" ${poster}>${image}${preview}</div>
        ${hasVideo ? `<span class="project-play" aria-hidden="true">↗</span>` : ""}
        <div class="project-info">
          <div><div class="project-title">${project.title}</div><div class="project-sub">${project.detail}</div></div>
          <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll(".project").forEach(card => {
    const project = projects[Number(card.dataset.index)];
    const video = card.querySelector("video");
    card.addEventListener("mouseenter", () => { if (video) video.play().catch(() => {}); });
    card.addEventListener("mouseleave", () => { if (video) { video.pause(); video.currentTime = 0; } });
    card.addEventListener("click", () => openProject(project));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProject(project); }
    });
  });
}

function openProject(project) {
  const src = videoEmbed(project.video);
  if (!src) return;
  frame.innerHTML = `<iframe src="${src}" title="${project.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  caption.textContent = `${project.title}  /  ${project.detail}`;
  dialog.showModal();
}
function closeDialog() { dialog.close(); frame.innerHTML = ""; }
document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", event => { if (event.target === dialog) closeDialog(); });

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = open ? 'CLOSE <span>×</span>' : 'MENU <span>＋</span>';
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = 'MENU <span>＋</span>';
}));
document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
