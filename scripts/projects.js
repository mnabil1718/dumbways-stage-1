import StoreManager from "./db.js";

const STORE_NAME = "projects";
const store = new StoreManager(STORE_NAME);
const form = document.getElementById("project-form");
const container = document.getElementById("project-list");

function dateDelta(start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const ms = e - s;
  const days = ms / (1000 * 60 * 60 * 24);
  const months = Math.ceil(days / 30);

  return `${months} bulan`;
}

function attachDeleteHandlers() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      store.delete({ id });
      render();
    });
  });
}

function attachEditHandlers() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const project = store.getById(id);

      if (!project) {
        return;
      }

      repopulateForm(project);
    });
  });
}

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
                Durasi: ${dateDelta(p.startDate, p.endDate)}
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

  attachDeleteHandlers();
  attachEditHandlers();
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