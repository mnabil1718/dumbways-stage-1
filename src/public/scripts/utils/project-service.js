import API from "./api.js";

export async function loadProjects() {
  return await API.get("/api/projects");
}

export async function getProjectById(id) {
  return await API.get(`/api/projects/${id}`);
}

export async function deleteProjectById(id) {
  return await API.delete(`/api/projects/${id}`);
}

export async function postProject(formData) {
  return await API.post("/api/projects", formData);
}

export async function putProject(id, formData) {
  return await API.put(`/api/projects/${id}`, formData);
}
