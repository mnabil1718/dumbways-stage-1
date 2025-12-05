class CancelButton extends HTMLElement {
  set id(id) {
    this._id = id;
    this.render();
  }

  get id() {
    return this._id;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <button class="btn btn-outlined cancel-btn">
            Cancel
          </button>
      `;

    this.querySelector(".cancel-btn").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("cancel"));
    });
  }
}

customElements.define("cancel-button", CancelButton);