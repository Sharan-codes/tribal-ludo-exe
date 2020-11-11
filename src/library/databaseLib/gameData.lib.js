const gameDataModel = require('./models/gameData');
const global = require('../../global');

let gameDataLib = [];
gameDataLib.updateNewGameData = async (userId, gameMode, matchData) => {

    try {
        const filter = {
            userId,
            gameMode,
            status: global.ACTIVE
        }
        const data = {
            userId,
            gameMode,
            totalMatchPlayed: matchData.total_match_played,
            matchWinCount: matchData.match_win_count,
            twoPlayerWinCount: matchData.two_player_win_count,
            fourPlayerWinCount: matchData.four_player_win_count,
            killCount: matchData.kill_count,
            rankOneCount: matchData.rank_one_count,
            rankTwoCount: matchData.rank_two_count,
            rankThreeCount: matchData.rank_three_count,
            status: global.ACTIVE
        }

        return await gameDataModel.findOneAndUpdate(filter, data, { upsert: true }).lean();
    } catch (e) {
        console.log(e)
    }
}

gameDataLib.getPlayerAllGameModeData = async (userId) => {

    try {
        const filter = {
            userId,
            status: global.ACTIVE
        }

        return await gameDataModel.find(filter).lean();
    } catch (e) {
        console.log(e)
    }
}
gameDataLib.getPlayerGameDataOfMode = async (userId, gameMode) => {

    try {
        const filter = {
            userId,
            gameMode,
            status: global.ACTIVE
        }

        return await gameDataModel.findOne(filter).lean();
    } catch (e) {
        console.log(e)
    }
}

gameDataLib.incrementOnlineModeMatchPlayedCount = async (userId, gameMode, value = 1) => {

    try {
        const filter = {
            userId,
            gameMode,
            status: global.ACTIVE
        }
        const data = {
            $inc: { totalMatchPlayed: value }
        }
        return await gameDataModel.findOneAndUpdate(filter, data, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
    } catch (e) {
        console.log(e)
    }
}

gameDataLib.incrementOnlineModeKillCount = async (userId, gameMode, value = 1) => {

    try {
        const filter = {
            userId,
            gameMode,
            status: global.ACTIVE
        }
        const data = {
            $inc: { killCount: value }
        }
        return await gameDataModel.findOneAndUpdate(filter, data, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
    } catch (e) {
        console.log(e)
    }
}
gameDataLib.updateOnlineRankData = async (userId, gameMode, maxPlayers, rank) => {

    try {
        const filter = {
            userId,
            gameMode,
            status: global.ACTIVE
        }
        // let data = {};
        let matchWinCount = 0, rankOneCount = 0, rankTwoCount = 0, rankThreeCount = 0, twoPlayerWinCount = 0, fourPlayerWinCount = 0;
        if (maxPlayers == 2) {
            if (rank == 1) {
                matchWinCount = 1;
                rankOneCount = 1;
                twoPlayerWinCount = 1;
                // data = {
                //     //  matchWinCount: { $inc: matchWinCount },
                //     rankOneCount: { $inc: rankOneCount },
                //     twoPlayerWinCount: { $inc: twoPlayerWinCount }
                // }
            }
        } else if (maxPlayers == 4) {
            if (rank == 1) {
                matchWinCount = 1;
                rankOneCount = 1;
                fourPlayerWinCount = 1;

                // data = {
                //     matchWinCount: { $inc: matchWinCount },
                //     rankOneCount: { $inc: rankOneCount },
                //     fourPlayerWinCount: { $inc: fourPlayerWinCount },
                // }

            } else if (rank == 2) {
                matchWinCount = 1;
                rankTwoCount = 1;
                fourPlayerWinCount = 1;

                // data = {
                //     matchWinCount: { $inc: matchWinCount },
                //     rankTwoCount: { $inc: rankTwoCount },
                //     fourPlayerWinCount: { $inc: fourPlayerWinCount },
                // }

            } else if (rank == 3) {
                matchWinCount = 1;
                rankThreeCount = 1;
                fourPlayerWinCount = 1;

                // data = {
                //     matchWinCount: { $inc: matchWinCount },
                //     rankThreeCount: { $inc: rankThreeCount },
                //     fourPlayerWinCount: { $inc: fourPlayerWinCount },
                // }

            }
        }
        const data = {
            $inc: {
                matchWinCount: matchWinCount,
                rankOneCount: rankOneCount,
                rankTwoCount: rankTwoCount,
                rankThreeCount: rankThreeCount,
                fourPlayerWinCount: fourPlayerWinCount,
                twoPlayerWinCount: twoPlayerWinCount
            }
        }
        console.log(data);
        return await gameDataModel.findOneAndUpdate(filter, data, { new: true }).lean().exec();
    } catch (e) {
        console.log(e)
    }
}
module.exports = gameDataLib;
