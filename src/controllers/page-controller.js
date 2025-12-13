import autoBind from "auto-bind";

class PageController {
  /***
   *
   * @param {Repository} repo
   */
  constructor(repo) {
    this.repo = repo;
    autoBind(this);
  }

  getIndexPageHandler(req, res) {
    res.render("index");
  }

  getContactPageHandler(req, res) {
    res.render("contact");
  }

  getProjectsPageHandler(req, res) {
    res.render("projects");
  }

  getProjectDetailPageHandler(req, res) {
    const { id } = req.params;
    const project = this.repo.getById(id);
    if (!project) {
      res.status(404).render("404");
    }

    res.render("project-detail", { project });
  }
}

export default PageController;
