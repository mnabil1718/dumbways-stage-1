import express from "express";
import "dotenv/config";
import hbs from "hbs";
import bodyParser from "body-parser";
import Repository from "./repositories/sqlite/sqlite-repository.js";
import { singleImageUploadMiddleware } from "./middlewares.js";
import { dateDelta, toHumanReadable } from "./public/scripts/utils/date.js";
import PageController from "./controllers/page-controller.js";
import { registerPageRoutes } from "./routes/page-routes.js";
import { registerRoutes } from "./routes/index.js";
import { getPool } from "./db/postgresql.js";
import ProjectController from "./controllers/project-controller.js";
import { config } from "./helper/config.js";
import ProjectRepositoryPostgresql from "./repositories/postgresql/project-repository.js";
import TechnologyRepositoryPostgresql from "./repositories/postgresql/technology-repository.js";
import TechnologyController from "./controllers/technology-controller.js";
import { fallbackImageUrl } from "./helper/file.js";
import session from "express-session";
import Hasher from "./helper/hasher.js";
import bcrypt from "bcrypt";
import AuthController from "./controllers/auth-controller.js";
import UserRepositoryPostgresql from "./repositories/postgresql/user-repository.js";

const app = express();
const pool = getPool();

const passwordHasher = new Hasher(bcrypt, config.salt);
const projectRepository = new ProjectRepositoryPostgresql(pool);
const technologyRepository = new TechnologyRepositoryPostgresql(pool);
const userRepository = new UserRepositoryPostgresql(pool);

const technologyController = new TechnologyController(technologyRepository);
const projectController = new ProjectController(
  projectRepository,
  technologyRepository,
);
const pageController = new PageController();
const authController = new AuthController(userRepository, passwordHasher);

hbs.registerHelper("dateDelta", dateDelta);
hbs.registerHelper("toHumanReadable", toHumanReadable);
hbs.registerHelper("fallbackImageUrl", fallbackImageUrl);
hbs.registerPartials("src/views/partials");

app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
  }),
);

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", "src/views");

app.use("/static", express.static("src/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.use(
  "/",
  registerRoutes(
    authController,
    pageController,
    projectController,
    technologyController,
  ),
);

// global not found handler
app.use((req, res) => {
  res.render("404");
});

// error handler, must be last in the chain
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error. Something went wrong");
});

app.listen(config.port, () => {
  console.log(`Express js application is listening on port ${config.port}...`);
});
