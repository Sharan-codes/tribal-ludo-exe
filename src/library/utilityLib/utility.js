let utility = [];
const mgUserLib = require('../databaseLib/user.lib');
const inviteActivityLib = require('../../library/databaseLib/inviteActivity.lib');
const global = require("../../global");
const webSocketHelper = require("../../library/utilityLib/websocketHelper");

utility.validateUser = async (userId, accessToken) => {

    let user = await mgUserLib.getUserDetails(userId);

    if (!user) {
        return {
            success: false,
            responseCode: "INVALID_USER"
        }
    }
    if (user.status == global.BLOCKED) {
        return {
            success: false,
            responseCode: "USER_IS_BANNED"
        }
    }
    if (user.accessToken !== accessToken) {
        return {
            success: false,
            responseCode: "INVALID_ACCESS_TOKEN"
        }
    }
    return {
        success: true,
        responseData: user
    }
}


utility.generateUniqueCode = (digits = 3) => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-digits);
    secondPart = ("000" + secondPart.toString(36)).slice(-digits);

    return firstPart + secondPart;
}

utility.recordInvitingActivityOfUser = async (user) => {
    let referringUser = await mgUserLib.getUserByReferralCode(user.referredBy);
    if (referringUser && referringUser.status == global.ACTIVE) {
        //Record inviteActivity with claimed as FALSE until max limit of total invites
        let totalInvites = await inviteActivityLib.getTotalInvitesByUser(referringUser.userId, user.referredBy);
        let claimed = global.REFERRAL_CLAIM_STATUS.UNCLAIMED;
        if (totalInvites >= global.MAX_INVITES_TILL_REWARD_IS_EARNED) {
            claimed = global.REFERRAL_CLAIM_STATUS.MAX_INVITES_REACHED;
        } else {
            //Send a websocket event that a user has joined using their referral link
            webSocketHelper.broadcastToUser(referringUser, {
                eventType: global.WEBSOCKET_EVENT.REFERRAL_SUCCESS,
                data: {
                    reward_list: global.REWARD_FOR_REFERRING_GAME,
                    user_list: [user.userId]
                }
            })
        }
        await inviteActivityLib.addNewInviteActivity(referringUser.userId, user.referredBy, user.userId, claimed);
    }
    return;
}

module.exports = utility;
