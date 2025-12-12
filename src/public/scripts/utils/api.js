class API {
  /***
   *
   * @param {string} endpoint
   * @param {FormData} formData
   * @returns {any}
   */
  static async post(endpoint, formData = undefined) {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      console.error("POST request failed");
      return;
    }

    const json = await res.json();
    if (json.message) {
      return json.message;
    }
  }

  /***
   *
   * @param {string} endpoint
   * @param {FormData} formData
   * @returns {any}
   */
  static async get(endpoint) {
    const res = await fetch(endpoint, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("GET request failed");
      return;
    }

    const json = await res.json();

    if (json.data) {
      return json.data;
    }
  }

  /***
   *
   * @param {string} endpoint
   * @param {FormData} formData
   * @returns {any}
   */
  static async put(endpoint, formData = undefined) {
    const res = await fetch(endpoint, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) {
      console.error("PUT request failed");
      return;
    }

    const json = await res.json();
    if (json.message) {
      return json.message;
    }
  }

  /***
   *
   * @param {string} endpoint
   * @returns {any}
   */
  static async delete(endpoint) {
    const res = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("DELETE request failed");
      return;
    }

    const json = await res.json();
    if (json.message) {
      return json.message;
    }
  }
}

export default API;
