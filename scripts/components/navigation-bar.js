class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const activate = this.getAttribute("activate");

    const data = [
      {
        link: "/index.html",
        label: "Home",
      },
      {
        link: "/projects.html",
        label: "My Projects",
      },
    ];

    const renderedLinks = data.map((nav) => {
      return `
        <li class="nav-item">
          <a class="nav-link ${nav.link === activate ? 'active' : ''}" href="${nav.link}">${nav.label}</a>
        </li>
      `;
    }).join("");

    this.classList.add("navbar", "sticky-top", "border-bottom", "navbar-expand-lg", "bg-body-tertiary");
    this.innerHTML = `
      <div class="container-fluid">
        <a class="navbar-brand" href="/index.html">
          <img
            src="./assets/branded.png"
            alt="Bootstrap"
            width="50"
            height="35"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${renderedLinks}
          </ul>
          <a href="/contact.html" class="btn btn-dark btn-sm"> Contact Me </a>
        </div>
      </div>
    `;
  }
}

customElements.define("navigation-bar", NavigationBar);