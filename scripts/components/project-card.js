import { dateDelta } from "../utils/date.js";
import { fallbackImageUrl } from "../utils/file.js";

class ProjectCard extends HTMLElement {
  set project(p) {
    this._project = p;
    this.render();
  }

  get project() {
    return this._project;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this._project) return;
    const project = this._project;
    const imageUrl = fallbackImageUrl(project.image);
    let techs = project.technology
      .map((t) => `<li>${t}</li>`)
      .join("");

    this.classList.add("col-12", "col-md-6", "col-lg-4", "d-flex");
    this.innerHTML = `
          <div class="project-card h-100">
            <img src="${imageUrl}" alt="${project.name}" />

            <div class="content">
              <a href="/project-detail.html?id=${project.id}"><h2>${project.name}</h2></a>

              <span class="text-muted">
                Durasi: ${dateDelta(project.startDate, project.endDate)}
              </span>

              <p class="mt-4 line-clamp-3">${project.description}</p>

              <ul>
                ${techs}
              </ul>

              <div class="buttons d-flex gap-2 mt-4">
                <button class="btn btn-dark w-50 edit-btn">
                  Edit
                </button>

                <button class="btn btn-dark w-50 delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
      `;

    this.querySelector(".edit-btn").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("edit", { detail: this._project }));
    });

    this.querySelector(".delete-btn").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("delete", { detail: this._project }));
    });
  }
}

customElements.define("project-card", ProjectCard);