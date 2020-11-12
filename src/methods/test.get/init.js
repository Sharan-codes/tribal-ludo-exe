//const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class testInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = false;
    this.requestMethod = "GET";
  }

  getParameters() {
    const param = [];
    
    return param;
  }
}

module.exports = testInitalize;
