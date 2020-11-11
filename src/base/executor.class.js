const BaseInitialize = require('./baseInitialize.class');
const requireDir = require('require-dir');
const Autoload = require('./autoload.class');
const ParameterProcessor = require('./parameterProcessor.class');
const restBase = require("./restBase.class");
const global = require("../global");
const baseMethodsPath = "../methods/";
class executor extends restBase {

  constructor() {
    super();
    this.responseData = {};
  }

  async executeMethod(event) {
    try {

      let methodName = event.resource;
      if ((event.pathParameters && event.pathParameters.proxy)) {
        methodName = "/" + event.pathParameters.proxy;

      }
      if (methodName == null) {
        methodName = event.path;
      }

      let splitString = methodName.split("/");
      splitString = splitString.map((element, index) => {
        //Checking for index > 1 because if method name is "/user/detail" then second resource(detail) should
        //get converted to Pascal case "user" should be camel case
        if (index > 1) {
          element = this.capitalizeFirstLetter(element);
        }
        return element;
      })

      const pathName = baseMethodsPath + splitString.join("") + '.' + event.httpMethod.toLowerCase();
      console.log("Looking for folder --> ", pathName);

      if (!this.methodExists(pathName)) {
        this.setResponse('METHOD_NOT_FOUND');
        return false;
      }

      const {
        execute,
        init
      } = requireDir(pathName);

      const initializer = new init();
      const action = new execute();

      if (!this.executeInitializer(event, initializer, action)) {
        this.responseData = {};
        return false;
      }


      if (!(await this.executeAction(action))) {
        this.responseData = {};
        return false;
      }

      return true;
    } catch (e) {
      console.log("Exception caught", e);
      this.setResponse('METHOD_NOT_FOUND');
      return false;
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  executeInitializer(event, initializer, action) {


    if (!this.isValidRequestMethod(event.httpMethod, initializer.requestMethod)) {
      return false;
    }

    const parameterProcessor = new ParameterProcessor();
    if (!parameterProcessor.processParameter(initializer, event, action)) {
      return false;
    }

    return true;
  }

  async executeAction(action) {
    this.responseData = await action.executeMethod(Autoload.requestData);
    return true;
  }

  getResponse() {
    const response = {
      responseCode: Autoload.responseCode,
      responseMessage: Autoload.responseMessage,
      responseData: this.responseData,
    }
    if (Autoload.responseCode == global.RESPONSE["EMAIL_VERIFIED"].responseCode) {
      return "Congratulations! Email successfully verified"
    } else if (Autoload.responseCode == global.RESPONSE["INVALID_EMAIL_VERIFICATION"].responseCode) {
      return "Invalid link"
    }

    return response;
  }

  isValidRequestMethod(httpMethod, requestMethod) {
    if (httpMethod.toUpperCase() !== requestMethod.toUpperCase()) {
      this.setResponse('INVALID_REQUEST_METHOD');
      return false;
    }
    return true;
  }

  methodExists(pathName) {
    try {
      requireDir(pathName);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = executor;
