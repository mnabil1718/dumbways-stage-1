import express from "express";
import hbs from "hbs";
import { initSQLi } from "./db.js";
import ApiController from "./controllers/api-controller.js";
import bodyParser from "body-parser";
import Repository from "./repo.js";
import { singleImageUploadMiddleware } from "./middlewares.js";
import { dateDelta, toHumanReadable } from "./public/scripts/utils/date.js";
import PageController from "./controllers/page-controller.js";
import { registerPageRoutes } from "./routes/page-routes.js";
import { registerAPIRoutes } from "./routes/api-routes.js";

const app = express();
const port = 3000;
const db = initSQLi("projects.db", { verbose: console.log });
const repo = new Repository(db);
const apiController = new ApiController(repo);
const pageController = new PageController(repo);

hbs.registerHelper("toHumanReadable", toHumanReadable);
hbs.registerHelper("dateDelta", dateDelta);

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", "src/views");

app.use("/static", express.static("src/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.use("/", registerPageRoutes(pageController));

app.use("/api", registerAPIRoutes(apiController));

// global not found handler
app.use((req, res) => {
  res.render("404");
});

// error handler, must be last in the chain
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error. Something went wrong");
});

app.listen(port, () => {
  console.log(`Express js application is listening on port ${port}...`);
});
