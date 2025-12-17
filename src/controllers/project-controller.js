import autoBind from "auto-bind";
import ProjectRepository from "../repositories/abstract/project-repository.js";
import TechnologyRepository from "../repositories/abstract/technology-repository.js";
import { navItems } from "../helper/nav-data.js";

class ProjectController {
  /***
   * @param {ProjectRepository} projectRepository
   * @param {TechnologyRepository} technologyRepository
   */
  constructor(projectRepository, technologyRepository) {
    this.projectRepository = projectRepository;
    this.technologyRepository = technologyRepository;
    autoBind(this);
  }

  async getProjectsPageHandler(req, res) {
    const technologies = await this.technologyRepository.getAll();
    res.locals.active = "/projects";
    res.locals.technologies = technologies;
    res.render("projects");
  }

  async getProjectDetailPageHandler(req, res) {
    const { id } = req.params;
    const project = await this.projectRepository.getById(id);
    if (!project) {
      res.status(404).render("404");
    }
    res.locals.active = "/projects";
    res.locals.project = project;
    res.render("project-detail");
  }

  async getProjectsHandler(req, res) {
    const projects = await this.projectRepository.getAll();
    res.json({ success: true, data: projects });
  }

  async postProjectsHandler(req, res) {
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
      technologies: technologyArray,
      imageUrl: image?.filename ?? null,
    };
    await this.projectRepository.insert(data);
    res.json({ success: true, message: "Project added successfully" });
  }

  async getProjectHandler(req, res) {
    const { id } = req.params;
    const project = await this.projectRepository.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, data: project });
  }

  async putProjectsHandler(req, res) {
    const { id } = req.params;
    const project = await this.projectRepository.getById(id);
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
      technologies: technologyArray,
      imageUrl: image?.filename ?? project.imageUrl,
    };
    await this.projectRepository.update(data);
    res.json({ success: true, message: "Project updated successfully" });
  }

  async deleteProjectHandler(req, res) {
    const { id } = req.params;
    const project = await this.projectRepository.getById(id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
    }

    await this.projectRepository.delete(id);
    res.json({ success: true, message: "Project deleted successfully" });
  }
}

export default ProjectController;
