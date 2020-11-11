const roomModel = require('./models/room.js');
const global = require('../../global');

let roomLib = [];

roomLib.createNewRoom = async (userId, roomId, gameMode, gameType, maxPlayers, betCoinCount, options = []) => {

    let data = {
        roomId,
        userId,
        gameType,
        betCoinCount,
        gameMode,
        maxPlayers,
        status: global.ROOM_STATE.PENDING
    }

    return await roomModel(data).save();
}

roomLib.getPendingAndActiveRoomsFromRoomCode = async (roomCode, options = []) => {

    const query = {
        roomCode,
        status: { $in: [global.ROOM_STATE.PENDING, global.ROOM_STATE.ACTIVE] }
    }

    return await roomModel.findOne(query).lean();
}

roomLib.changeRoomStatusToActive = async (roomId, options = []) => {

    const filter = {
        roomId,
        status: global.ROOM_STATE.PENDING
    }

    const update = {

        status: global.ROOM_STATE.ACTIVE

    }
    return await roomModel.findOneAndUpdate(filter, update).lean();
}

roomLib.changeRoomStatusToClosed = async (roomId, options = []) => {
    const filter = {
        roomId,
        status: { $in: [global.ROOM_STATE.ACTIVE, global.ROOM_STATE.PENDING] }
    }
    const update = {
        $set: {
            status: global.ROOM_STATE.FORCE_CLOSED
        }
    }
    return await roomModel.findOneAndUpdate(filter, update).lean();
}

roomLib.getRoomDetails = async (roomId, options = []) => {
    const filter = {
        roomId
    }

    return await roomModel.findOne(filter).lean();
}

roomLib.updatePlayerCount = async (roomId, value, options = []) => {
    const filter = {
        roomId
    }
    const data = {
        maxPlayers: value

    }

    return await roomModel.findOneAndUpdate(filter, data, { new: true }).lean();
}
module.exports = roomLib;
