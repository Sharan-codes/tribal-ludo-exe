//const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class withdrawInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = false;
    this.requestMethod = "POST";
  }

  getParameters() {
    const param = [];

    param.userId = {
      name: "user_id",
      type: Number,
      description: "User Id",
      required: false,
      default: ""
    }
    param.customerName = {
      name: "customer_name",
      type: String,
      description: "User name",
      required: false,
      default: ""
    }
    param.customerPhone = {
      name: "customer_phone",
      type: Number,
      description: "User phone",
      required: false,
      default: ""
    }
    param.customerEmail = {
      name: "customer_email",
      type: String,
      description: "User email",
      required: false,
      default: ""
    }
    param.address1 = {
      name: "address1",
      type: String,
      description: "User address",
      required: false,
      default: ""
    }
    param.amount = {
      name: "amount",
      type: Number,
      description: "Amount to withdraw",
      required: false,
      default: ""
    }
    param.vpa = {
      name: "vpa",
      type: String,
      description: "VPA of the user",
      required: false,
      default: ""
    }
    return param;
  }
}

module.exports = withdrawInitalize;
