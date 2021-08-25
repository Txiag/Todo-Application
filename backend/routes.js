const { Router } = require("express");
const todoControler = require("./controllers/todo");
const routes = Router();
routes.get("/todos", todoControler.List);
routes.get("/todos/:id", todoControler.Get);
routes.post("/todos", todoControler.Create);
routes.put("/todos/:id", todoControler.Edit);
module.exports = routes;
