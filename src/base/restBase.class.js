const global = require('../global');
const Autoload = require('./autoload.class');

class restBase {

  setResponse(code, options = []) {

    if (!global.RESPONSE[`${code}`]) {
      console.log("The following response code is not found", code);

      code = "RESPONSE_CODE_NOT_FOUND"
    }
    Autoload.responseCode = global.RESPONSE[`${code}`].responseCode;
    Autoload.responseMessage = global.RESPONSE[`${code}`].responseMessage;

    for (let keyName in options) {
      Autoload.responseMessage = Autoload.responseMessage.replace(keyName, options[`${keyName}`]);
    }
    return true;

  }

  setMemberVariable(paramName, value) {
    this[`${paramName}`] = value;
    return true;
  }
}

module.exports = restBase;
