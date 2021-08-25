module.exports = {
  isString: (value, msg = "Campo deve ser string") => {
    if (typeof value !== "string") throw new Error(msg);
    return true;
  },
  isBoolean: (value, msg = "Campo deve ser booleano") => {
    if (typeof value !== "boolean") throw new Error(msg);
    return true;
  },
  isStringOrNull: (value, msg = "Campo deve ser string ou nulo") => {
    if (typeof value !== "string" && value !== null) throw new Error(msg);
    return true;
  },
  isNotNull: (value, msg = "Campo não pode ser nulo") => {
    if (value === null) throw new Error(msg);
    return true;
  },
};
