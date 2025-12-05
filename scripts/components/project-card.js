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

  dateDelta(start, end) {
    const s = new Date(start);
    const e = new Date(end);

    const ms = e - s;
    const days = ms / (1000 * 60 * 60 * 24);
    const months = Math.ceil(days / 30);

    return `${months} bulan`;
  }

  render() {
    if (!this._project) return;
    const project = this._project;
    const imageUrl = project.image ? URL.createObjectURL(project.image) : "#";
    let techs = project.technology
      .map((t) => `<li>${t}</li>`)
      .join("");

    this.classList.add("col-12", "col-md-6", "col-lg-4");
    this.innerHTML = `
          <div class="project-card">
            <img src="${imageUrl}" alt="${project.name}" />

            <div class="content">
              <h2>${project.name}</h2>

              <span class="text-muted">
                Durasi: ${this.dateDelta(project.startDate, project.endDate)}
              </span>

              <p class="mt-4">${project.description}</p>

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