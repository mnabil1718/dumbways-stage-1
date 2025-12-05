import StoreManager from "./db.js";

let editingId = null;
const STORE_NAME = "projects";
const store = new StoreManager(STORE_NAME);
const form = document.getElementById("project-form");
const container = document.getElementById("project-list");
const buttonContainer = document.getElementById("action-container");
const preview = document.getElementById("image-preview"); // for edit

function resetEdit() {
  form.reset();
  editingId = null;
  preview.src = "";
  preview.classList.remove("has-image");

  // Restore original submit button
  buttonContainer.innerHTML = `<button type="submit" class="btn btn-dark">Submit</button>`;
}

function render() {
  container.innerHTML = "";

  const projects = store.getAll();

  if (projects.length === 0) {
    container.innerHTML = `<p class="empty-text">No projects yet.</p>`;
    return;
  }

  projects.forEach((p) => {
    const card = document.createElement("project-card");
    card.project = p;

    card.addEventListener("delete", (e) => {
      const project = e.detail;
      store.delete({ id: project.id });
      render();
    });


    card.addEventListener("edit", (e) => {
      const project = e.detail;
      editingId = project.id;
      repopulateForm(project);
    });

    container.appendChild(card);
  });
}

function onSubmitHandler(e) {
  e.preventDefault();

  const data = new FormData(form);

  const name = data.get('name');
  const startDate = data.get('start-date');
  const endDate = data.get('end-date');
  const description = data.get('description');
  const technology = data.getAll('technology');
  const image = data.get('image');


  const project = { id: crypto.randomUUID(), name, startDate, endDate, description, technology, image };
  store.add(project);

  render();

  form.reset();
};

function onSaveHandler(e) {
  e.preventDefault();

  const project = store.getById(editingId);
  if (!project) {
    console.error("Project not found");
    return;
  }

  const data = new FormData(form);

  const name = data.get('name') || project.name;
  const startDate = data.get('start-date') || project.startDate;
  const endDate = data.get('end-date') || project.endDate;
  const description = data.get('description') || project.description;

  const techs = data.getAll('technology');
  const technology = techs.length > 0 ? techs : project.technology;

  const imageFile = data.get('image');
  const image = imageFile?.size ? imageFile : project.image;

  const updated = {
    id: project.id,
    name,
    startDate,
    endDate,
    description,
    technology,
    image,
  };

  store.update(updated, project.id);

  resetEdit();
  render();
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

render();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editingId) {
    onSaveHandler(e);
  } else {
    onSubmitHandler(e);
  }
});