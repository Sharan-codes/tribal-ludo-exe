const inviteActivityModel = require('./models/inviteActivity.js');
const global = require('../../global');
const utility = require('../utilityLib/utility.js');

let inviteActivityLib = [];

inviteActivityLib.addNewInviteActivity = async (referringUser, referralCode, referredTo, claimed) => {

    const data = {
        referringUser,
        referralCode,
        referredTo,
        claimed: claimed,
        status: global.ACTIVE
    }

    return await inviteActivityModel(data).save();
}

inviteActivityLib.getTotalInvitesByUser = async (referringUser, referralCode) => {

    try {
        const query = {
            referringUser,
            referralCode,
            status: global.ACTIVE
        }

        return await inviteActivityModel.countDocuments(query).lean();
    } catch (e) {
        console.log(e);
    }
}

inviteActivityLib.getUnclaimedRewardInvitesByUser = async (referringUser, referralCode) => {

    try {
        const query = {
            referringUser,
            referralCode,
            claimed: global.REFERRAL_CLAIM_STATUS.UNCLAIMED,
            status: global.ACTIVE
        }

        let options = {
            limit: global.MAX_INVITES_TILL_REWARD_IS_EARNED,
            sort: {
                createdAt: 1
            }
        }

        return await inviteActivityModel.find(query, null, options).lean();
    } catch (e) {
        console.log(e);
    }
}

inviteActivityLib.updateInviteActivitiesClaimOfUser = async (invites, claimValue) => {

    try {
        const query = {
            inviteActivityId: { $in: invites },
            status: global.ACTIVE
        }
        const data = {
            claimed: claimValue
        }
        return await inviteActivityModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

module.exports = inviteActivityLib;
