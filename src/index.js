import express from "express";
import hbs from "hbs";
import { initSQLi } from "./db.js";
import Controller from "./handlers.js";
import bodyParser from "body-parser";
import Repository from "./repo.js";
import { singleImageUploadMiddleware } from "./middlewares.js";

const app = express();
const port = 3000;
const db = initSQLi("projects.db", { verbose: console.log });
const repo = new Repository(db);
const controller = new Controller(repo);

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", "src/views");

app.use("/static", express.static("src/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/api/projects", controller.getProjectsHandler);
app.get("/api/projects/:id", controller.getProjectHandler);
app.post(
  "/api/projects",
  singleImageUploadMiddleware,
  controller.postProjectsHandler,
);
app.put(
  "/api/projects/:id",
  singleImageUploadMiddleware,
  controller.putProjectsHandler,
);
app.delete("/api/projects/:id", controller.deleteProjectHandler);

app.get("/project-detail", (req, res) => {
  res.render("project-detail");
});

// error handler, must be last in the chain
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error. Something went wrong");
});

app.listen(port, () => {
  console.log(`Express js application is listening on port ${port}`);
});
