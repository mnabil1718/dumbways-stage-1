import autoBind from "auto-bind";
import { navItems } from "../helper/nav-data.js";
import { config } from "../helper/config.js";

class PageController {
  constructor() {
    autoBind(this);
  }

  getIndexPageHandler(req, res) {
    const locals = {
      error: req.flash(config.session.errorFlashKey),
      success: req.flash(config.session.successFlashKey),
      navItems,
      active: "/",
      user: req.session.user,
    };
    res.render("index", locals);
  }

  getContactPageHandler(req, res) {
    const locals = { navItems, active: "/contact", user: req.session.user };
    res.render("contact", locals);
  }
}

export default PageController;
