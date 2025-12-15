import autoBind from "auto-bind";
import TechnologyRepository from "../repositories/abstract/technology-repository.js";

class TechnologyController {
  /***
   * @param {TechnologyRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
    autoBind(this);
  }

  async getTechnologiesHandler(req, res) {
    const technologies = await this.repository.getAll();
    res.json({ success: true, data: technologies });
  }
}

export default TechnologyController;
