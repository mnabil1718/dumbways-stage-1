import autoBind from "auto-bind";
import Repository from "../repo.js";

class ApiController {
  /***
   *
   * @param {Repository} repo
   */
  constructor(repo) {
    this.repo = repo;
    autoBind(this);
  }

  getProjectsHandler(req, res) {
    const projects = this.repo.getAll();
    res.json({ success: true, data: projects });
  }

  postProjectsHandler(req, res) {
    const project = req.body;
    const image = req.file;
    const technologyArray = Array.isArray(project.technology)
      ? project.technology
      : [project.technology];

    const data = {
      id: crypto.randomUUID(),
      name: project.name,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      technology: JSON.stringify(technologyArray),
      imageUrl: image?.filename ?? null,
    };
    this.repo.insert(data);
    res.json({ success: true, message: "Project added successfully" });
  }

  getProjectHandler(req, res) {
    const { id } = req.params;
    const project = this.repo.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, data: project });
  }

  putProjectsHandler(req, res) {
    const { id } = req.params;
    const project = this.repo.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

    const updated = req.body;
    const image = req.file;
    const technologyArray = Array.isArray(updated.technology)
      ? updated.technology
      : [updated.technology];

    const data = {
      id,
      name: updated.name,
      startDate: updated.startDate,
      endDate: updated.endDate,
      description: updated.description,
      technology: JSON.stringify(technologyArray),
      imageUrl: image?.filename ?? project.imageUrl,
    };
    this.repo.update(data);
    res.json({ success: true, message: "Project updated successfully" });
  }

  deleteProjectHandler(req, res) {
    const { id } = req.params;
    const project = this.repo.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

    this.repo.delete(id);
    res.json({ success: true, message: "Project deleted successfully" });
  }
}

export default ApiController;
