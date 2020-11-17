const mgUserLib = require("../library/databaseLib/user.lib");
const global = require("../global");

const inviteActivityLib = require('../library/databaseLib/inviteActivity.lib');
const mgEventActivityLib = require('../library/databaseLib/eventActivity.lib');
const mgEventLib = require('../library/databaseLib/event.lib');
const websocketHelper = require('../library/utilityLib/websocketHelper');

module.exports.handler = async (event) => {
    try {
        let userData = await mgUserLib.getUserDetailsBySocketId(event.requestContext.connectionId);
        if (userData) {
            let inviteActivities = await inviteActivityLib.getUnclaimedRewardInvitesByUser(userData.userId, userData.referralCode);

            let userIdList = [], userList = [];
            inviteActivities.map(activity => userIdList.push(activity.referredTo));
            let users = await mgUserLib.getUsersByUserId(userIdList);
            let invitesCount = inviteActivities.length;

            users.map(user => userList.push({
                user_id: user.userId,
                username: user.username ? user.username : ""
            }));

            let rewardList = [];
            global.REWARD_FOR_REFERRING_GAME.map((reward) => {
                rewardList.push({
                    reward_type: reward.reward_type,
                    reward_count: reward.reward_count * invitesCount
                });
            });
            let referral_reward = {
                reward_list: userList.length ? rewardList : [],
                user_list: userList
            }

            //Get unnotified cash rewards of the user
            let unNotifiedCashRewardEventActivities = await mgEventActivityLib.getUnNotifiedCashRewardsOfUser(userData.userId);
            let eventIdList = [], totalAmount = 0;
            unNotifiedCashRewardEventActivities.map(activity => eventIdList.push(activity.eventId));
            let events = await mgEventLib.getEventsByEventId(eventIdList);

            events.map((event) => {
                event.rewards.map((reward) => {
                    if (reward.reward_type == global.REWARD_TYPE.CASH) {
                        totalAmount += reward.reward_count;
                    }
                });
            });

            let upi_reward = {};
            if (totalAmount > 0) {
                upi_reward.amount = totalAmount;
            }

            let data = {
                responseCode: 200,
                responseMessage: "Success",
                responseData: {
                    referral_reward,
                    upi_reward
                }
            }

            websocketHelper.broadcastToUser(userData, data);
        }
    } catch (e) {
        console.log(e);
    }
}
