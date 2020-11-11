const mgUserLib = require("../library/databaseLib/user.lib");
const global = require("../global");
const mgEventActivityLib = require('../library/databaseLib/eventActivity.lib');
const websocketHelper = require('../library/utilityLib/websocketHelper');

module.exports.handler = async (event) => {
    try {

        let userData = await mgUserLib.getUserDetailsBySocketId(event.requestContext.connectionId);
        if (userData) {
            await mgEventActivityLib.clearUnNotifiedStatusForCashRewardsOfUser(userData.userId);
            let data = {
                responseCode: 200,
                responseMessage: "Success",
                responseData: {}
            }
            websocketHelper.broadcastToUser(userData, data);
        }
    } catch (e) {
        console.log(e);
    }
}
