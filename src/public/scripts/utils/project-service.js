import { showToast } from "./toast.js";
import API from "./api.js";

export async function loadProjects() {
  const res = await API.get("/api/projects");

  if (!res.success) {
    showToast(res.message, "error");
    return [];
  }

  return res.data;
}

export async function getProjectById(id) {
  const res = await API.get(`/api/projects/${id}`);

  if (!res.success) {
    showToast(res.message, "error");
    return;
  }

  return res.data;
}

export async function deleteProjectById(id) {
  const { success, message } = await API.delete(`/api/projects/${id}`);
  if (!success) {
    showToast(message, "error");
    return;
  }

  showToast(message, "success");
}

export async function postProject(formData) {
  const { success, message } = await API.post("/api/projects", formData);
  if (!success) {
    showToast(message, "error");
    return;
  }

  showToast(message, "success");
}

export async function putProject(id, formData) {
  const { success, message } = await API.put(`/api/projects/${id}`, formData);

  if (!success) {
    showToast(message, "error");
    return;
  }

  showToast(message, "success");
}
