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

    return await res.json();
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

    return await res.json();
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

    return await res.json();
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

    return await res.json();
  }
}

export default API;
