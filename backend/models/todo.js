const Sequelize = require("sequelize");
const database = require("../db/sequelize");
const deburr = require("lodash.deburr");

const Todo = database.define(
  "todo",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    searchTerm: {
      type: Sequelize.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeSave(todo) {
        // Hook para adicionar o termo de busca ao salvar um registro

        todo.title = todo.title?.trim() ? todo.title : null;
        todo.description = todo.description?.trim() ? todo.description : null;
        todo.searchTerm = deburr(todo.title || "" + todo.description || "");
        todo.updatedAt = new Date().toISOString();
      },
    },
    defaultScope: {
      // Excluir termo de busca das queries
      attributes: { exclude: ["searchTerm"] },
    },
  }
);

module.exports = Todo;
