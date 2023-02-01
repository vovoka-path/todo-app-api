const { models } = require('../../../sequelize');
const { getIdAsNumber } = require('../../helpers/utils');

async function getAll(req, res) {
  const todos = await models.todo.findAll();
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).send('404 - Todos not found!');
  }
}

async function getById(req, res) {
  const id = getIdAsNumber(req);
  const todo = await models.todo.findByPk(id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).send(`404 - Todo with id=${id} not found!`);
  }
}

async function create(req, res) {
  if (req.body.id) {
    res.status(400).send(`Bad request: Todo with id=${id} already exists!`);
  } else {
    const todo = await models.todo.create(req.body);
    res.status(201).json(todo);
  }
}

async function updateById(req, res) {
  const id = getIdAsNumber(req);
  if (+req.body.id === id) {
    const todoFromDB = await models.todo.findOne({
      where: {
        id: id,
      },
    });
    todoFromDB.title = req.body.title;
    todoFromDB.isDone = req.body.isDone;
    todoFromDB.isEdited = req.body.isEdited;
    await todoFromDB.save();
    const todo = await models.todo.findByPk(id);
    res.status(200).json(todo);
  } else {
    res
      .status(400)
      .send(`Bad request: id=${id} does not match body id=${req.body.id}!`);
  }
}

async function removeById(req, res) {
  const id = getIdAsNumber(req);
  await models.todo.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send(`${id}`);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  removeById,
};
