const querystring = require('querystring');
const responseHelper = require('./response.lib');
const global = require('../global');
const Autoload = require('./autoload.class');
const restBase = require("./restBase.class")

class ParameterProcessor extends restBase {

  processParameter(initializer, event, action) {
    let requestData;
    const params = initializer.getParameters();
    const isSecured = initializer.isSecured;

    try {
      //remove the request query/body parameters from request object
      if (event.httpMethod == 'GET') {
        console.log("GET Params ", event.queryStringParameters);

        requestData = event.queryStringParameters;
        event.queryStringParameters = null;
        event.multiValueQueryStringParameters = null;
      } else if (event.httpMethod == 'POST') {
        console.log("POST Params ", event.body);

        if (typeof (event.body) == "string") {
          requestData = querystring.parse(event.body);

        } else {
          requestData = event.body;
        }
        event.body = null;
      }

      Autoload.requestData = requestData;

      this.removeUndefinedParameters(params, this.getAuthParameters(), requestData);

      this.trimRequestParameterValues(requestData);

      //process the user_id and access_token parameters here
      if (isSecured) {
        const authParameters = this.getAuthParameters();
        if (!this.validateParameters(authParameters, requestData, action)) {
          return false;
        }
      }

      if (!this.validateParameters(params, requestData, action)) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e)
    }
  }

  //checks if all the parameters given in request has been specified in init script. if not removes them from requestData object
  removeUndefinedParameters(paramData, authParamData, requestData) {

    let matchFound = false;
    for (let requestParamName in requestData) {
      matchFound = false;
      for (let paramName in paramData) {
        if (requestParamName == paramData[`${paramName}`].name) {
          matchFound = true;
        }
      }
      for (let paramName in authParamData) {
        if (requestParamName == authParamData[`${paramName}`].name) {
          matchFound = true;
        }
      }
      if (!matchFound) {
        delete requestData[`${requestParamName}`];
      }
    }
  }


  //trims the spaces if any in the request parameter's value
  trimRequestParameterValues(requestData) {
    for (let paramName in requestData) {
      if (typeof (requestData[`${paramName}`]) == "string") {
        requestData[`${paramName}`] = requestData[`${paramName}`].trim();
      }
    }
  }

  //get the auth parameters(userId and accessToken)
  getAuthParameters() {
    const param = [];

    param.userId = {
      name: "user_id",
      type: Number,
      description: "user id",
      required: true,
      default: ""
    }

    param.accessToken = {
      name: "access_token",
      type: String,
      description: "access token",
      required: true,
      default: ""
    }
    return param;
  }

  validateParameters(param, requestData, action) {
    let errorParameterName, result = true;
    for (let paramName in param) {
      let isSuccessfull = this.verifyRequiredParameter(paramName, param, requestData);
      if (!isSuccessfull) {
        //the required parameter is not passed or has an empty value in the request
        result = false;
        errorParameterName = param[`${paramName}`].name;
        break;
      }

      if (!this.convertToGivenParameterType(paramName, param, requestData)) {
        return false;
      }
      this.setDefaultParameters(paramName, param, requestData);
      this.setVariableValues(paramName, param, requestData, action);
    }

    if (errorParameterName) {
      let options = [];
      options.paramName = errorParameterName;
      this.setResponse("PARAMETER_IS_MANDATORY", options);
      return false;
    }
    return true;
  }

  setVariableValues(paramName, paramData, requestData, action) {
    const requestParamName = paramData[`${paramName}`].name;
    action.setMemberVariable(paramName, requestData[`${requestParamName}`]);
  }
  //converts all the request parameters to the specified type(number and string)
  convertToGivenParameterType(paramName, paramData, requestData) {
    const requestParamName = paramData[`${paramName}`].name;

    if (requestData[`${requestParamName}`] && requestData[`${requestParamName}`] != "") {
      if (paramData[`${paramName}`].type == Number) {

        requestData[`${requestParamName}`] = Number(requestData[`${requestParamName}`]);

        if (isNaN(requestData[`${requestParamName}`])) {
          //set error response if a parameter is specified in request but is not an integer
          let options = [];
          options.paramName = requestParamName;
          this.setResponse("INVALID_INPUT_INTEGER", options);
          return false;
        }

      } else if (paramData[`${paramName}`].type == String) {
        requestData[`${requestParamName}`] = requestData[`${requestParamName}`].toString();
      }
    } else if (requestData[`${requestParamName}`] == "") {
      //Set default value if paramter is specified but is empty
      if (!this.setDefaultParameters(paramName, paramData, requestData)) {

        //set error response if a parameter is specified in request but is empty and has no default value

        let options = [];
        options.paramName = requestParamName;
        this.setResponse("INVALID_INPUT_EMPTY", options);
        return false;
      }
    }
    return true;
  }

  //if the given parameter has a default value specified and request does not have that parameter
  //then set that default value for that parameter in the request
  setDefaultParameters(paramName, paramData, requestData) {
    const requestParamName = paramData[`${paramName}`].name;

    if (!requestData[`${requestParamName}`]) {
      if (paramData[`${paramName}`].type == Number && paramData[`${paramName}`].default !== "") {

        requestData[`${requestParamName}`] = Number(paramData[`${paramName}`].default);
        return true;
      } else if (paramData[`${paramName}`].type == String && paramData[`${paramName}`].default !== "") {

        requestData[`${requestParamName}`] = paramData[`${paramName}`].default.toString();
        return true;

      }
    }
    return false;
  }

  //checks if the parameter is set as required and the that parameter has some value in the request
  verifyRequiredParameter(paramName, paramData, requestData) {
    const requestParamName = paramData[`${paramName}`].name;

    //if requestdata is empty and no params or body passed
    if (!requestData) {
      return false;
    }
    //checks if the paramater is given in request by user
    if (paramData[`${paramName}`].required && (!requestData[`${requestParamName}`] ||
      typeof (requestData[`${paramName}`]) == "string" && requestData[`${requestParamName}`].trim() == "")) {
      return false;
    }

    return true;
  }
}

module.exports = ParameterProcessor;
