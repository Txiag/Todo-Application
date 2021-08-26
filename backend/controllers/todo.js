const { todo } = require("../models");
const { Op, literal } = require("sequelize");
const errorMessage = require("../db/errors");

const Create = async (req, res) => {
  delete req.body.id; // Deleta atributo id caso seja enviado na requisição
  try {
    const created = await todo.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(400).json(errorMessage(err));
  }
};

const List = async (req, res) => {
  const { page = 1, itemsPerPage = 20, q = "", done = null } = req.query; // Pega página e quantidade de itens dos query parameters ou usa default caso não exista
  const { count: itemCount, rows: items } = await todo.findAndCountAll({
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
    where: {
      searchTerm: {
        [Op.substring]: `%${q}%`,
      },
      done: {
        [Op.not]: done === null ? null : done.toLowerCase() === "false",
      },
    },
  });
  res.json({
    page,
    itemCount,
    itemsPerPage,
    items,
  });
};

const Get = async (req, res) => {
  const { id } = req.params;
  const found = await todo.findByPk(id);
  if (!found) return res.status(404).json({ error: "Não encontrado" }); // Retorna erro caso registro não exista
  res.json(todo);
};

const Edit = async (req, res) => {
  const { id } = req.params;
  const found = await todo.findByPk(id);
  if (!found) return res.status(404).json({ error: "Não encontrado" }); // Retorna erro caso registro não exista
  delete req.body.id; // Apaga atributo de id no corpo para prevenir sobrescrita
  found.dataValues = {
    ...found.dataValues,
    ...req.body,
  };
  try {
    const edited = await found.save(); // Edita registro
    res.json(edited);
  } catch (err) {
    res.status(400).json(errorMessage(err));
  }
};
module.exports = {
  Create,
  List,
  Get,
  Edit,
};
