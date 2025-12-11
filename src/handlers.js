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
    this.repo.getAll();
    res.render("projects");
  }

  postProjectsHandler(req, res) {
    const project = req.body;
    this.repo.insert(project);
    res.json({ success: true });
  }
}

export default Controller;
