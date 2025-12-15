import autoBind from "auto-bind";

class PageController {
  constructor() {
    autoBind(this);
  }

  getIndexPageHandler(req, res) {
    res.render("index");
  }

  getContactPageHandler(req, res) {
    res.render("contact");
  }
}

export default PageController;
