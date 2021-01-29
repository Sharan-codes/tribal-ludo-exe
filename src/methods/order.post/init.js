//const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class orderInitalize extends baseInitialize {

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
    param.orderAmount = {
      name: "order_amount",
      type: Number,
      description: "Amount to deposit",
      required: false,
      default: ""
    }
    return param;
  }
}

module.exports = orderInitalize;
