const faker = require("faker");
const { todo } = require("../models/index");
const deburr = require("lodash.deburr");
const Generate = () => {
  const title = Math.random() >= 0.9 ? faker.random.words(5) : null;
  const description = Math.random() <= 0.2 ? null : faker.lorem.paragraph(4);
  const searchTerm = deburr(title || "" + description || "");
  return {
    title,
    description,
    searchTerm,
    done: Math.random() > 0.6,
  };
};

const GenerateBulk = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) items.push(Generate());
  return items;
};
const Insert = async (quantity = 100) => {
  const toInsert = GenerateBulk(quantity);
  await todo.bulkCreate(toInsert);
};
module.exports = Insert;
