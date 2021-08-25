const database = require("./sequelize");
const { todo } = require("../models");
const Init = async () => {
  try {
    await database.sync();
    console.log("Database Started");
  } catch (error) {
    console.log("Error Initializing Database");
  }
};
Init();
