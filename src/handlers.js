import autoBind from "auto-bind";
import Repository from "./repo.js";

class Controller {
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
    console.log(projects);
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

  putProjectsHandler(req, res) {
    const { id } = req.params;
    const project = repo.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

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
}

export default Controller;
