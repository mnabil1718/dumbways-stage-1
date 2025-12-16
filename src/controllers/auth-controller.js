import Hasher from "../helper/hasher.js";
import UserRepository from "../repositories/abstract/user-repository.js";

class AuthController {
  /***
   * @param {UserRepository} userRepository
   * @param {Hasher} passwordHasher
   */
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async getRegisterPageHandler(req, res) {
    res.render("register");
  }

  async getLoginPageHandler(req, res) {
    res.render("login");
  }

  async postUserHandler(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await this.passwordHasher.hash(password);
    await this.userRepository.insert({ name, email, hashedPassword });

    res.redirect("/login");
  }

  async postAuthenticationHandler(req, res) {
    const { email, password } = req.body;
    const user = await this.userRepository.getByEmail(email);
    await this.passwordHasher.compare(password, user.password);

    req.session.regenerate(function (err) {
      if (err) next(err);

      req.session.user = { id: user.id, name: user.name };

      req.session.save(function (err) {
        if (err) next(err);

        res.redirect("/");
      });
    });
  }

  async deleteAuthenticationHandler(req, res) {
    req.session.user = null;

    req.session.save(function (err) {
      if (err) next(err);

      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  }
}

export default AuthController;
