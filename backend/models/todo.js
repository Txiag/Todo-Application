const Sequelize = require("sequelize");
const { isStringOrNull, isBoolean, isNotNull } = require("../db/validators");
const database = require("../db/sequelize");

const Todo = database.define("todo", {
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
    validate: {
      isStringOrNull,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      isStringOrNull,
      bothNullOrEmpty: (value) => {
        if (!value && !this.title)
          throw new Error(
            "Campo de descrição e título não podem estar vazios ao mesmo tempo"
          );
      },
    },
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      isBoolean,
    },
  },
});

module.exports = Todo;
