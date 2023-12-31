const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// router

const authCMSRouter = require('./app/api/v1/auth/router');
const customerRouter = require('./app/api/v1/customer/router');
const productRouter = require('./app/api/v1/product/router');
const cartRouter = require('./app/api/v1/cart/router');


const v1 = '/api/v1';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api volkpedia',
  });
});


app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}`, customerRouter);
app.use(`${v1}`, productRouter);
app.use(`${v1}`, cartRouter);



app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
