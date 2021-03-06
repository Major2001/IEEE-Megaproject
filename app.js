const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cycleRouter = require('./routes/cycleRouter');
const userRouter = require('./routes/userRouter');
const rentRouter = require('./routes/rentRouter');
const transactionRouter = require('./routes/transactionRouter');
const buyRouter = require('./routes/buyRouter');
const conversationRouter = require('./routes/conversationRouter');

const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', express.static(`${__dirname}/public/landing page/`));
app.use(express.static(`${__dirname}/public/`));
app.use((req, res, next) => {
  //console.log(req.cookies.token);
  next();
});
app.use('/api/cycles', cycleRouter);
app.use('/api/users', userRouter);
app.use('/api/rent', rentRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/buy', buyRouter);
app.use('/api/conversations', conversationRouter);
app.all('*', (req, res, next) => {
  console.log(req.originalUrl);
  next(new Error('Not Found'));
});
app.use((err, req, res, next) => {
  console.log('err detected', err.message);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});
module.exports = app;
