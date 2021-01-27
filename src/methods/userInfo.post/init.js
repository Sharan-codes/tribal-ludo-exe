//const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class masterIapInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = false;
    this.requestMethod = "POST";
  }

  getParameters() {
    const param = [];

    param.opponentUserId = {
      name: "opponent_user_id",
      type: Number,
      description: "Opponent user id of whom the info is needed",
      required: false,
      default: ""
    }

    return param;
  }
}

module.exports = masterIapInitalize;
