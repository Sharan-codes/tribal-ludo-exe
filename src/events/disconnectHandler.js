const utility = require("../library/utilityLib/utility");
const mgUserLib = require("../library/databaseLib/user.lib");
const global = require("../global");

module.exports.handler = async (event) => {
    try {
        const user = await mgUserLib.clearUserSocketConnectionId(event.requestContext.connectionId);

        if (!user) return;
        console.log("User disconnected", user.userId);

    } catch (e) {
        console.log(e);
    }
}
