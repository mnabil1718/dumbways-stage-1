import autoBind from "auto-bind";
import { navItems } from "../helper/nav-data.js";
import { config } from "../helper/config.js";

class PageController {
  constructor() {
    autoBind(this);
  }

  getIndexPageHandler(req, res) {
    res.locals.active = "/";
    res.render("index");
  }

  getContactPageHandler(req, res) {
    res.locals.active = "/contact";
    res.render("contact");
  }
}

export default PageController;
