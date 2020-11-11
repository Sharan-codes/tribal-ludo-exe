//const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class masterIapInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = true;
    this.requestMethod = "GET";
  }

  getParameters() {
    const param = [];

    param.opponentUserId = {
      name: "opponent_user_id",
      type: Number,
      description: "Opponent user id of whom the info is needed",
      required: true,
      default: ""
    }

    return param;
  }
}

module.exports = masterIapInitalize;
