const mongoose = require('mongoose');
require('./env');

const uri = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
const options = {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false
  keepAlive: true,
  useUnifiedTopology: true,
  poolSize: 30,
  useCreateIndex: true,
  socketTimeoutMS: 30000,
  useFindAndModify: false,
  useNewUrlParser: true,
  auth: {
    authdb: 'admin'
  },
  authSource: 'admin',
  user: process.env.MONGO_DB_USER,
  pass: process.env.MONGO_DB_PASS
};

mongoose.connect(uri, options).catch(error => {
  console.log("ERROR----", error);
  throw error;
});

module.exports = {
  mongoose
}
