const faker = require("faker");
const { todo } = require("../models/index");
const deburr = require("lodash.deburr");
const Generate = () => {
  const randomNumber = Math.random();
  const text = faker.random.words(40);
  const title = randomNumber >= 0.6 ? text.slice(0, 50) : null;
  const description = randomNumber <= 0.7 ? text : null;
  const searchTerm = deburr(title || "" + description || "");
  return {
    title,
    description,
    searchTerm,
    done: Math.random() >= 0.6,
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
