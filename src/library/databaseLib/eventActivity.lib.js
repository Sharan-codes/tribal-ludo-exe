const eventActivityModel = require('./models/eventActivity');
const global = require('../../global');

let eventActivityLib = [];

eventActivityLib.addNewEventActivity = async (userId, eventId) => {

    try {
        const data = {
            eventId,
            userId,
            winCount: 0,
            killCount: 0,
            matchPlayedCount: 0,
            status: global.ACTIVE
        }

        return await eventActivityModel(data).save();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getUserEventActivity = async (userId, eventIdList) => {

    try {
        const query = {
            eventId: { $in: eventIdList },
            userId,
            status: global.ACTIVE
        }

        return await eventActivityModel.find(query).lean();
    } catch (e) {
        console.log(e);
    }
}
eventActivityLib.incrementMaxMatchPlayedCount = async (userId, eventId, value = 1) => {

    try {
        const query = {
            eventId,
            userId,
            status: global.ACTIVE
        }
        const data = {
            $inc: { matchPlayedCount: value },
            lastEventActivityAt: new Date()
        }

        return await eventActivityModel.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.incrementKillCount = async (userId, eventId, value = 1) => {

    try {
        const query = {
            eventId,
            userId,
            status: global.ACTIVE
        }
        const data = {
            $inc: { killCount: value },
            lastEventActivityAt: new Date()
        }

        return await eventActivityModel.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.incrementWinCount = async (userId, eventId, value = 1) => {

    try {
        const query = {
            eventId,
            userId,
            status: global.ACTIVE
        }
        const data = {
            $inc: { winCount: value },
            lastEventActivityAt: new Date()
        }

        return await eventActivityModel.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getEventActivitiesOfEvent = async ( eventId ) => {

    try {
        const query = {
            eventId,
            status: global.ACTIVE
        }

        return await eventActivityModel.find(query).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.updateEventRewardClaim = async ( userId, eventId ) => {

    try {
        const query = {
            eventId,
            userId,
            isWinner : true,
            status: global.ACTIVE
        }
        const data = {
            isClaimed : true
        }
        return await eventActivityModel.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getEventActivitiesWithObjectivesCompleted = async ( eventId, limit = 0, maxWinValue = 0, maxKillValue = 0, maxMatchPlayedValue = 0 ) => {

    try {
        let query = {
            eventId,
            status: global.ACTIVE
        };
        if (maxWinValue) {
            query.winCount = maxWinValue;
        }
        if (maxKillValue) {
            query.killCount = maxKillValue;
        }
        if (maxMatchPlayedValue) {
            query.matchPlayedCount = maxMatchPlayedValue;
        }
        
        let options = {
            limit: limit,
            sort:{
                lastEventActivityAt: 1
            }
        }
        return await eventActivityModel.find(query,null,options).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.blockEventActivitiesOfUser = async ( userId ) => {

    try {
        const query = {
            userId,
            status: global.ACTIVE
        }
        const data = {
            status: global.BLOCKED
        }
        return await eventActivityModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getTotalEventsOfUser = async ( userId ) => {

    try {
        const query = {
            userId,
            status: global.ACTIVE
        }
        return await eventActivityModel.countDocuments(query).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getEventActivitiesWithObjectivesCompletedWithPagination = async ( eventId, lastUserLastEventActivityAt, limit = 0, maxWinValue = 0, maxKillValue = 0, maxMatchPlayedValue = 0 ) => {

    try {
        let query = {
            eventId,
            lastEventActivityAt: { $gt: lastUserLastEventActivityAt },
            status: global.ACTIVE
        };
        if (maxWinValue) {
            query.winCount = maxWinValue;
        }
        if (maxKillValue) {
            query.killCount = maxKillValue;
        }
        if (maxMatchPlayedValue) {
            query.matchPlayedCount = maxMatchPlayedValue;
        }
        
        let options = {
            limit: limit,
            sort:{
                lastEventActivityAt: 1
            }
        }
        return await eventActivityModel.find(query,null,options).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.updateEventRewardRewarded = async ( userId, eventId ) => {

    try {
        const query = {
            eventId,
            userId,
            status: global.ACTIVE
        }
        const data = {
            isRewarded : true,
            isNotified : false,
            cashRewardedAt: new Date()
        }
        return await eventActivityModel.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.updateWinnerStatusOfUsers = async ( eventId, userIdList ) => {

    try {
        const query = {
            eventId,
            userId: { $in: userIdList },
            status: global.ACTIVE
        }
        const data = {
            isWinner: true
        }
        return await eventActivityModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.getUnNotifiedCashRewardsOfUser = async ( userId ) => {

    try {
        const query = {
            userId,
            isNotified : false,
            status: global.ACTIVE
        }

        return await eventActivityModel.find(query).lean();
    } catch (e) {
        console.log(e);
    }
}

eventActivityLib.clearUnNotifiedStatusForCashRewardsOfUser = async ( userId ) => {

    try {
        const query = {
            userId,
            isNotified : false,
            status: global.ACTIVE
        }
        const data = {
            isNotified: true
        }
        return await eventActivityModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}


module.exports = eventActivityLib;
