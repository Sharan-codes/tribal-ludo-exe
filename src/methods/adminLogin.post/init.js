const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class adminLoginInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = false;
    this.requestMethod = "POST";
  }

  getParameters() {
    const param = [];

    param.username = {
      name: "username",
      type: String,
      description: "Username of the admin",
      required: true,
      default: ""
    }

    param.password = {
      name: "password",
      type: String,
      description: "Password of the admin",
      required: true,
      default: ""
    }
    return param;
  }
}

module.exports = adminLoginInitalize;
