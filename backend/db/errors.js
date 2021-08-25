module.exports = (err) =>
  err.errors.map((e) => {
    const error = {};
    error[e.path] = e.message;
    return error;
  });
