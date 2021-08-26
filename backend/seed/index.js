const db = require("../db");
const todosSeed = require("./todos");

const Seed = async () => {
  await todosSeed(100);
  console.log("created 100 todos");
};

Seed();
