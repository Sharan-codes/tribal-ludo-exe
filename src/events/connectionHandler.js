const utility = require("../library/utilityLib/utility");
const mgUserLib = require("../library/databaseLib/user.lib");
const global = require("../global");

module.exports.handler = async event => {
    console.log("connect request");
    try {
        const { user_id: userId, access_token: accessToken } = event.queryStringParameters;

        // if (isNaN(userId)) {
        // console.log(userId, accessToken);

        //     return {
        //         statusCode: global.RESPONSE.PARAMETER_IS_MANDATORY.responseCode,
        //         body: global.RESPONSE.PARAMETER_IS_MANDATORY.responseMessage
        //     };
        // }
        // if (!accessToken) {
        //     return {
        //         statusCode: global.RESPONSE.PARAMETER_IS_MANDATORY.responseCode,
        //         body: global.RESPONSE.PARAMETER_IS_MANDATORY.responseMessage
        //     };
        // }
        let result = await utility.validateUser(userId, accessToken);
        if (!result.success) {
            return {
                statusCode: result.responseCode,
                body: result.responseMessage
            };
        }

        if (result) {
            console.log(`User connected ${userId}`);
            await mgUserLib.updateSocketConnectionId(userId, event.requestContext.connectionId);
            return {
                statusCode: 200,
                body: "Success"
            };
        }

    } catch (e) {
        console.log(e);
    }

};
