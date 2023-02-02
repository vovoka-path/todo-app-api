function getIdAsNumber (req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`# Invalid ':id' : "${id}"`);
};

module.exports = { getIdAsNumber };
