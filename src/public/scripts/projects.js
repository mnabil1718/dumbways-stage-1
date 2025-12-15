import { getUploadUrl } from "./utils/file.js";
import {
  loadProjects,
  postProject,
  putProject,
  getProjectById,
  deleteProjectById,
} from "./utils/project-service.js";

let _editingId = null;
let _query = "";
let _projects = [];

const search = document.getElementById("search");
const form = document.getElementById("project-form");
const container = document.getElementById("project-list");
const buttonContainer = document.getElementById("action-container");
const preview = document.getElementById("image-preview"); // for edit
const fileInput = document.getElementById("image"); // for image preview listener

function debounce(fn, delay = 200) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

function revokePreview() {
  if (preview.src.startsWith("blob:")) {
    URL.revokeObjectURL(preview.src);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });
}

function showToast(message, delay = 3000) {
  const toastEl = document.getElementById("app-toast");
  toastEl.querySelector(".toast-body").textContent = message;

  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
    autohide: true,
    delay,
  });

  toast.show();
}

function resetEdit() {
  form.reset();
  _editingId = null;
  revokePreview();
  preview.src = "";
  preview.classList.remove("has-image");

  // Restore original submit button
  buttonContainer.innerHTML = `<button type="submit" class="btn btn-dark">Submit</button>`;

  scrollToSection("projects");
}

function resetSubmit() {
  revokePreview();
  preview.src = "";
  preview.classList.remove("has-image");
  form.reset();
  scrollToSection("projects");
}

async function onDeleteHandler(e) {
  const project = e.detail;

  if (project.id === _editingId) {
    console.error("Cannot edit project while editing");
    alert("Cannot edit project while editing");
    return;
  }

  if (!confirm(`Are you sure you want to delete project "${project.name}" ?`)) {
    return;
  }

  const message = await deleteProjectById(project.id);
  _projects = await loadProjects();
  showToast(message);
  render();
}

function onEditHandler(e) {
  const project = e.detail;
  _editingId = project.id;
  repopulateForm(project);

  scrollToTop();
}

function repopulateForm(project) {
  form.querySelector("[name='name']").value = project.name;
  form.querySelector("[name='startDate']").value = project.startDate;
  form.querySelector("[name='endDate']").value = project.endDate;
  form.querySelector("[name='description']").value = project.description;
  form.querySelectorAll("input[name='technology']").forEach((checkbox) => {
    checkbox.checked = project.technology.some(
      (tech) => tech.id === Number(checkbox.value),
    );
  });

  if (preview && project.imageUrl) {
    revokePreview();
    preview.src = getUploadUrl(project.imageUrl);
    preview.classList.add("has-image");
  }

  if (!buttonContainer) return;
  buttonContainer.innerHTML = "";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "btn btn-dark me-2";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("cancel-button");
  cancelButton.id = _editingId;
  cancelButton.addEventListener("cancel", (_) => {
    resetEdit();
  });

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
}

function validate({ startDate, endDate, technology }) {
  if (new Date(startDate) > new Date(endDate)) {
    console.error("start date has to be before end date.");
    alert("start date has to be before end date.");
    return false;
  }

  if (technology.length < 1) {
    console.error("you must choose at least 1 technology.");
    alert("you must choose at least 1 technology.");
    return false;
  }

  return true;
}

async function onSubmitHandler(e) {
  e.preventDefault();

  const data = new FormData(form);

  const startDate = data.get("startDate");
  const endDate = data.get("endDate");
  const technology = data.getAll("technology");
  const validateObj = {
    startDate,
    endDate,
    technology,
  };

  if (!validate(validateObj)) return;

  const message = await postProject(data);
  resetSubmit();

  _projects = await loadProjects();

  showToast(message);
  render();
}

async function onSaveHandler(e) {
  e.preventDefault();

  const project = await getProjectById(_editingId);
  if (!project) {
    console.error("Project not found");
    return;
  }

  const data = new FormData(form);
  const startDate = data.get("startDate");
  const endDate = data.get("endDate");
  const technology = data.getAll("technology");

  const validateObj = {
    startDate,
    endDate,
    technology,
  };

  if (!validate(validateObj)) return;

  const message = await putProject(project.id, data);
  resetEdit();

  _projects = await loadProjects();

  showToast(message);
  render();
}

async function render() {
  container.innerHTML = "";

  const q = _query.toLowerCase();
  const res = _projects.filter((p) => p.name.toLowerCase().includes(q));

  if (res.length === 0) {
    container.innerHTML = `<p class="empty-text">No projects yet.</p>`;
    return;
  }

  // Demo only
  const cards = res.map((p) => {
    const card = document.createElement("project-card");
    card.project = p;

    card.addEventListener("delete", onDeleteHandler);
    card.addEventListener("edit", onEditHandler);

    return card;
  });

  container.append(...cards);
}

_projects = await loadProjects();
render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (_editingId) {
    onSaveHandler(e);
  } else {
    onSubmitHandler(e);
  }
});

fileInput.addEventListener("change", (_) => {
  const file = fileInput.files[0];

  revokePreview();

  if (!file) {
    preview.src = "";
    preview.classList.remove("has-image");
    return;
  }

  preview.src = URL.createObjectURL(file);
  preview.classList.add("has-image");
});

search.addEventListener(
  "input",
  debounce((e) => {
    _query = e.target.value.trim();
    render();
  }, 200),
);
