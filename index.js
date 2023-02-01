const app = require('./app');
const sequelize = require('./sequelize');
const ConsoleLogger = require('./express/helpers/consoleLogger');

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

async function connectDatabase() {
  ConsoleLogger.info(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    ConsoleLogger.success('Database connection OK!');
  } catch (error) {
    ConsoleLogger.error('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await connectDatabase();

  ConsoleLogger.info(`Starting on port ${PORT}...`);

  app.listen(PORT, () => {
    ConsoleLogger.success(`Express server started on port ${PORT}.`);
    ConsoleLogger.info(`You have access from origin:`);
    ConsoleLogger.link(`${CLIENT_URL}`);
  });
}

init();
