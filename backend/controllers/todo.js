const { todo } = require("../models");
const { Op } = require("sequelize");

const ValidateTodo = (title, description) => {
  console.log(title, description);
  const msg = "Both description and title may not be null";
  if (!title?.trim() && !description?.trim())
    throw new Error({ title: msg, description: msg });
};

const Create = async (req, res) => {
  delete req.body.id; // Deleta atributo id caso seja enviado na requisição
  try {
    try {
      ValidateTodo(req.body.title, req.body.description);
    } catch (err) {
      return res.status(400).json(err);
    }
    const created = await todo.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.log();
    res.status(500);
  }
};

const List = async (req, res) => {
  const { page = 1, itemsPerPage = 20, q = "", showDone = "false" } = req.query; // Pega página e quantidade de itens dos query parameters ou usa default caso não exista
  const selectParams = {};
  if (showDone.toLowerCase() !== "true") selectParams.done = { [Op.is]: false };
  if (q.trim() !== "") selectParams.searchTerm = { [Op.substring]: `%${q}%` };
  const { count: itemCount, rows: items } = await todo.findAndCountAll({
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
    where: selectParams,
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
  try {
    ValidateTodo(req.body.title, req.body.description);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
  try {
    const edited = await found.update(req.body); // Edita registro
    delete edited.dataValues.searchTerm;
    res.json(edited);
  } catch (err) {
    res.status(500);
  }
};
module.exports = {
  Create,
  List,
  Get,
  Edit,
};
