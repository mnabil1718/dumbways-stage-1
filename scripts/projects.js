import StoreManager from "./db.js";

const STORE_NAME = "projects";
const store = new StoreManager(STORE_NAME);
const form = document.getElementById("project-form");
const container = document.getElementById("project-list");



function render() {

  container.innerHTML = "";
  const projects = store.getAll();

  if (projects.length === 0) {
    container.innerHTML = `<p class="empty-text">No projects yet.</p>`;
    return;
  }

  projects.map((p) => {
    const card = document.createElement("project-card");
    card.project = p;

    card.addEventListener("delete", (e) => {
      const project = e.project;
      store.delete({ id: project.id });
      render();
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
  console.log(project);
  store.add(project);

  render();

  form.reset();
};

function repopulateForm(project) {
  form.querySelector("[name='name']").value = project.name;
  form.querySelector("[name='start-date']").value = project.startDate;
  form.querySelector("[name='end-date']").value = project.endDate;
  form.querySelector("[name='description']").value = project.description;
  form.querySelectorAll("input[name='technology']").forEach((checkbox) => {
    checkbox.checked = project.technology.includes(checkbox.value);
  });

  // Just show preview
  const preview = document.getElementById("image-preview");
  if (preview && project.image) {
    preview.src = URL.createObjectURL(project.image);
  }
}

render();


form.addEventListener("submit", onSubmitHandler);