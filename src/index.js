require('./globals').load();

import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import config from './config.json';
import pkg from '../package.json';
import initMongo from './db';
import rmdir from 'rimraf';

let app = express();
app.server = http.createServer(app);

// view engine setup
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  noCache: true,
  express: app,
});
app.set('view engine', 'html');

app.use(logger('dev'));

app.use(cors({
  origin: true,
  methods: config.corsMethods,
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Dynamically include routes (Controllers)
const ctrlDir = path.join(__dirname, 'controllers/');
fs.readdirSync(ctrlDir).forEach(function (file) {
  if (file.substr(-3) == '.js') {
    const route = require(ctrlDir + file);
    route.controller(app);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Remove the dist directory if not in production
if (process.env.NODE_ENV !== 'production') {
  const distPath = path.normalize('./dist');
  rmdir(distPath, function (err) {
    if (err) {
      console.error(err);
    }
  });
}

app.server.listen(process.env.PORT || config.port || 8080, () => {
  console.log(`Running ${pkg.name} v${pkg.version} on port ${app.server.address().port}`);
  initMongo();
});

export default app;
