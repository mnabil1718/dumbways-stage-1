import StoreManager from "./db.js";

const STORE_NAME = "projects";
const store = new StoreManager(STORE_NAME);
const form = document.getElementById("project-form");
const container = document.getElementById("project-list");

function render() {
  const projects = store.getAll();

  if (projects.length === 0) {
    container.innerHTML = `<p class="empty-text">No projects yet.</p>`;
    return;
  }

  container.innerHTML = projects
    .map((p) => {
      const techList = p.technology
        .map((t) => `<li>${t}</li>`)
        .join("");

      const imageUrl = p.image ? URL.createObjectURL(p.image) : "/assets/pas foto.jpg";

      return `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="project-card">
            <img src="${imageUrl}" alt="${p.name}" />

            <div class="content">
              <h2>${p.name}</h2>

              <span class="text-muted">
                Durasi: ${p.startDate} → ${p.endDate}
              </span>

              <p class="mt-4">${p.description}</p>

              <ul>
                ${techList}
              </ul>

              <div class="buttons d-flex gap-2 mt-4">
                <button class="btn btn-dark w-50 edit-btn" data-id="${p.id}">
                  Edit
                </button>

                <button class="btn btn-dark w-50 delete-btn" data-id="${p.id}">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}



render();


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

form.addEventListener("submit", onSubmitHandler);