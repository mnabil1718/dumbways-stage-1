import API from "./api.js";

export async function loadTechnologies() {
  return await API.get("/api/technologies");
}
