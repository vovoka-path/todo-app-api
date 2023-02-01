const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router/router');
const errorMiddleware = require('./middlewares/errorMiddleware');

require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL || '*',
  })
);
app.use('/api', router);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send(`
		<h2>Server started!</h2>
		<p><b>Connection has been established successfully.</b></p>
	`);
});

module.exports = app;
