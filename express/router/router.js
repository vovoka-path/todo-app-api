const Router = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const asyncErrorsHandler = require('../helpers/asyncErrorsHandler');

const router = new Router();

const routes = {
  users: require('./routes/users'),
  todos: require('./routes/todos'),
};

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    router.get(`/${routeName}`, asyncErrorsHandler(routeController.getAll));
  }
  if (routeController.getById) {
    router.get(
      `/${routeName}/:id`,
      asyncErrorsHandler(routeController.getById)
    );
  }
  if (routeController.create) {
    router.post(`/${routeName}`, asyncErrorsHandler(routeController.create));
  }
  if (routeController.updateById) {
    router.put(
      `/${routeName}/:id`,
      authMiddleware,
      asyncErrorsHandler(routeController.updateById)
    );
  }
  if (routeController.removeById) {
    router.delete(
      `/${routeName}/:id`,
      authMiddleware,
      asyncErrorsHandler(routeController.removeById)
    );
  }
  if (routeController.signup) {
    router.post(
      `/${routeName}/signup`,
      asyncErrorsHandler(routeController.signup)
    );
  }
  if (routeController.signin) {
    router.post(
      `/${routeName}/signin`,
      asyncErrorsHandler(routeController.signin)
    );
  }
  if (routeController.signout) {
    router.post(
      `/${routeName}/signout`,
      asyncErrorsHandler(routeController.signout)
    );
  }
  if (routeController.checkauth) {
    router.post(
      `/${routeName}/checkauth`,
      asyncErrorsHandler(routeController.checkauth)
    );
  }
  if (routeController.refresh) {
    router.get(
      `/${routeName}/refresh`,
      asyncErrorsHandler(routeController.refresh)
    );
  }
}

module.exports = router;
