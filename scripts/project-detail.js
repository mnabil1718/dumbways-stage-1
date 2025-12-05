import IndexedDBStore from "./index-db.js";
import { toHumanReadable, dateDelta } from "./utils/date.js";
import { fallbackImageUrl } from "./utils/file.js";

const STORE_NAME = "projects";
const DB_NAME = "projectDB";
const VERSION = 1;
const store = new IndexedDBStore(DB_NAME, STORE_NAME, VERSION);
await store.open();

let project = null;

async function initPage() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) {
    window.location.href = "/404.html";
  }

  project = await store.getById(projectId);

  if (!project) {
    window.location.href = "/404.html";
  }

  document.title = `Muhammad Nabil - ${project.name}`;
  render(project);
}

function render(project) {
  document.getElementById('name').textContent = project.name;

  const image = document.getElementById("image");
  image.src = fallbackImageUrl(project.image);
  image.alt = project.name;

  const start = toHumanReadable(project.startDate);
  const end = toHumanReadable(project.endDate);
  document.getElementById("dateRange").textContent =
    `${start} - ${end}`;

  document.getElementById("dateDuration").textContent = dateDelta(project.startDate, project.endDate);

  const technologies = document.querySelector("#technology ul");
  technologies.innerHTML = project.technology
    .map(t => `<li>${t}</li>`)
    .join("");

  document.getElementById("description").textContent = project.description;
}

initPage();