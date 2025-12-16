import autoBind from "auto-bind";
import Hasher from "../helper/hasher.js";
import UserRepository from "../repositories/abstract/user-repository.js";
import flash from "express-flash";
import { config } from "../helper/config.js";
import { navItems } from "../helper/nav-data.js";

class AuthController {
  /***
   * @param {UserRepository} userRepository
   * @param {Hasher} passwordHasher
   */
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    autoBind(this);
  }

  async getRegisterPageHandler(req, res) {
    res.render("register", {
      error: req.flash(config.session.errorFlashKey),
      success: req.flash(config.session.successFlashKey),
      navItems,
    });
  }

  async getLoginPageHandler(req, res) {
    res.render("login", {
      error: req.flash(config.session.errorFlashKey),
      success: req.flash(config.session.successFlashKey),
      navItems,
    });
  }

  async postUserHandler(req, res) {
    const { name, email, password, password_confirmation } = req.body;

    if (password !== password_confirmation) {
      req.flash(config.session.errorFlashKey, "Passwords have to match");
      return res.redirect("/register");
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    await this.userRepository.insert({ name, email, hashedPassword });
    req.flash(
      config.session.successFlashKey,
      "User registered sucessfully. Plese log in",
    );
    res.redirect("/login");
  }

  async postAuthenticationHandler(req, res) {
    const { email, password } = req.body;
    const user = await this.userRepository.getByEmail(email);
    await this.passwordHasher.compare(password, user.password);

    req.session.user = { id: user.id, name: user.name };
    req.flash(config.session.successFlashKey, "User logged in successfully");
    res.redirect("/");
  }

  async deleteAuthenticationHandler(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

export default AuthController;
