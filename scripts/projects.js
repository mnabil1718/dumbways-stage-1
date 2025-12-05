import IndexedDBStore from "./index-db.js";

let editingId = null;
const STORE_NAME = "projects";
const DB_NAME = "projectDB";
const VERSION = 1;
const store = new IndexedDBStore(DB_NAME, STORE_NAME, VERSION);
await store.open();


const form = document.getElementById("project-form");
const container = document.getElementById("project-list");
const buttonContainer = document.getElementById("action-container");
const preview = document.getElementById("image-preview"); // for edit
const fileInput = document.getElementById("image"); // for image preview listener



function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetEdit() {
  form.reset();
  editingId = null;
  preview.src = "";
  preview.classList.remove("has-image");

  // Restore original submit button
  buttonContainer.innerHTML = `<button type="submit" class="btn btn-dark">Submit</button>`;
}

async function onDeleteHandler(e) {
  const project = e.detail;

  if (project.id === editingId) {
    console.error("Cannot edit project while editing");
    alert("Cannot edit project while editing");
    return;
  }

  await store.delete(project.id);
  render();
}

function onEditHanlder(e) {
  const project = e.detail;
  editingId = project.id;
  repopulateForm(project);

  scrollToTop();
}

function repopulateForm(project) {
  form.querySelector("[name='name']").value = project.name;
  form.querySelector("[name='start-date']").value = project.startDate;
  form.querySelector("[name='end-date']").value = project.endDate;
  form.querySelector("[name='description']").value = project.description;
  form.querySelectorAll("input[name='technology']").forEach((checkbox) => {
    checkbox.checked = project.technology.includes(checkbox.value);
  });

  if (preview && project.image) {
    preview.src = URL.createObjectURL(project.image);
    preview.classList.add("has-image");
  }

  if (!buttonContainer) return;
  buttonContainer.innerHTML = "";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "btn btn-dark me-2";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("cancel-button");
  cancelButton.id = editingId;
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

  const name = data.get('name');
  const startDate = data.get('start-date');
  const endDate = data.get('end-date');
  const description = data.get('description');
  const technology = data.getAll('technology');
  const image = data.get('image');
  const project = {
    id: crypto.randomUUID(),
    name,
    startDate,
    endDate,
    description,
    technology,
    image: image && image.size > 0 ? image : null
  };

  if (!validate(project)) return;

  await store.add(project);

  render();
  form.reset();
};

async function onSaveHandler(e) {
  e.preventDefault();

  const project = await store.getById(editingId);
  if (!project) {
    console.error("Project not found");
    return;
  }

  const data = new FormData(form);

  const name = data.get('name');
  const startDate = data.get('start-date');
  const endDate = data.get('end-date');
  const description = data.get('description');
  const technology = data.getAll('technology');
  const image = data.get('image');

  const updated = {
    id: project.id,
    name,
    startDate,
    endDate,
    description,
    technology,
    image: image && image.size > 0 ? image : project.image,
  };

  if (!validate(updated)) return;

  await store.update(updated);

  resetEdit();
  render();
}

async function render() {
  container.innerHTML = "";

  const projects = await store.getAll();

  if (projects.length === 0) {
    container.innerHTML = `<p class="empty-text">No projects yet.</p>`;
    return;
  }

  projects.forEach((p) => {
    const card = document.createElement("project-card");
    card.project = p;

    card.addEventListener("delete", onDeleteHandler);
    card.addEventListener("edit", onEditHanlder);

    container.appendChild(card);
  });
}

render();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editingId) {
    onSaveHandler(e);
  } else {
    onSubmitHandler(e);
  }
});

fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  if (!file) {
    preview.src = "";
    preview.classList.remove("has-image");
    return;
  }

  preview.src = URL.createObjectURL(file);
  preview.classList.add("has-image");
});