const adActivityModel = require('./models/adActivity');
const global = require('../../global');
const utility = require('../utilityLib/utility');

let adActivityLib = [];

adActivityLib.insertNewAdActivity = async (userId, adType, counter = 1) => {

    const data = {
        userId,
        adType,
        counter,
        status: global.ACTIVE
    }

    return await adActivityModel(data).save();
}

adActivityLib.getUserAdActivityIn2Cycles = async (userId) => {

    const query = {
        userId,
        createdAt: { $gte: new Date(Date.now() - 2 * global.ONE_CYCLE_FOR_REWARDS_IN_SECONDS * 1000) },
        status: global.ACTIVE
    }
    return await adActivityModel.find(query).lean();
}

module.exports = adActivityLib;
