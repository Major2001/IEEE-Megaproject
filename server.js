const dotenv = require('dotenv');
const sockets = require("./socket");

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  sockets(server);
  console.log(`Server Started on port ${port}`);
});


