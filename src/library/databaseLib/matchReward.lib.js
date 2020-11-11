const matchRewardModel = require('./models/matchReward');
const global = require('../../global');

let matchRewardLib = [];

matchRewardLib.getGameRewards = async (gameMode, rank, options = []) => {

    const query = {
        gameMode,
        rank,
        status: global.ACTIVE
    }
    return await matchRewardModel.findOne(query).lean();
}

module.exports = matchRewardLib;
