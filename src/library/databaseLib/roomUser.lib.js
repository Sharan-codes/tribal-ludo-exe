const roomUserModel = require('./models/roomUser.js');

const global = require('../../global');

let roomUserLib = [];

roomUserLib.addUserToRoom = async (userId, roomId, tokenColor, betCoinCount, options = []) => {

    const data = {
        roomId,
        userId,
        tokenColor,
        betCoinCount,
        undoMoveCount: 0,
        status: global.ROOM_USER_STATE.ACTIVE
    }
    return await roomUserModel(data).save();
}

roomUserLib.getUserDetailInRoom = async (roomId, userId, options = []) => {

    const filter = {
        roomId,
        userId
        // status: global.ROOM_USER_STATE.ACTIVE
    }
    return await roomUserModel.findOne(filter).lean();
}

roomUserLib.updateMatchRankData = async (userId, roomId, rank) => {

    const filter = {
        roomId,
        userId,
        status: global.ROOM_USER_STATE.MATCH_STARTED
    }
    const update = {
        rank,
        status: global.ROOM_USER_STATE.MATCH_COMPLETE
    }
    return await roomUserModel.findOneAndUpdate(filter, update).lean();
}
roomUserLib.incrementTokenKillCount = async (userId, roomId, value = 1) => {

    const filter = {
        roomId,
        userId,
        status: global.ROOM_USER_STATE.MATCH_STARTED
    }
    const update = {
        $inc: { killCount: value }
    }
    return await roomUserModel.findOneAndUpdate(filter, update).lean();
}
roomUserLib.incrementUndoMoveCount = async (userId, roomId, value = 1) => {

    const filter = {
        roomId,
        userId,
        status: global.ROOM_USER_STATE.MATCH_STARTED
    }
    const update = {
        $inc: { undoMoveCount: value }
    }
    return await roomUserModel.findOneAndUpdate(filter, update).lean();
}

roomUserLib.changeUserStatusToMatchStarted = async (userId, roomId) => {

    const filter = {
        roomId,
        userId,
        status: global.ROOM_USER_STATE.ACTIVE
    }
    const update = {
        status: global.ROOM_USER_STATE.MATCH_STARTED
    }
    return await roomUserModel.findOneAndUpdate(filter, update).lean();
}
module.exports = roomUserLib;
