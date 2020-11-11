const mongoose = require('mongoose');
require('./env');

const uri = ``
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
  user: '',
  pass: ''
};

mongoose.connect(uri, options).catch(error => {
  console.log("ERROR----", error);
  throw error;
});

module.exports = {
  mongoose
}
