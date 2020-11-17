const global = require('../../global');
const dailyRewardModel = require('./models/dailyReward');

let dailyRewardLib = [];

dailyRewardLib.insertReward = async (day, coins, crystals) => {

    const data = {
        day,
        coins,
        crystals,
        status: global.ACTIVE
    }

    return await dailyRewardModel(data).save();
}

dailyRewardLib.getDailyReward = async (day) => {

    const query = {
        day,
        status: global.ACTIVE
    }
    return await dailyRewardModel.findOne(query).lean();
}

module.exports = dailyRewardLib;
