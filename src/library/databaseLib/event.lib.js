const eventModel = require('./models/event.js');
const global = require('../../global');

let eventsLib = [];

eventsLib.getActiveEvents = async () => {

    const query = {
        endTime: { $gt: Math.ceil(new Date().getTime() / 1000) },
        status: global.ACTIVE
    }

    return await eventModel.find(query).lean();
}

eventsLib.addNewEvent = async ({ eventName, entryCoinCount, startTime, endTime, eventObjective, rewards, userId }) => {

    const data = {
        eventName,
        entryCoinCount,
        startTime,
        endTime,
        eventObjective,
        rewards,
        createdBy: userId,
        status: global.ACTIVE
    }

    return await eventModel(data).save();
}

eventsLib.getEventsActiveAndEnded1CycleAgo = async () => {

    const query = {
        endTime: { $gte: Math.ceil((new Date().getTime() / 1000) - global.ONE_CYCLE_FOR_LISTING_ENDED_EVENTS_IN_SECONDS) },
        status: global.ACTIVE
    }

    const options = {
        sort: {
            startTime: 1
        }
    }

    return await eventModel.find(query, null, options).lean();
}

eventsLib.getEventDetails = async (eventId) => {

    const query = {
        eventId,
        status: global.ACTIVE
    }

    return await eventModel.findOne(query).lean();
}

eventsLib.getEventsEndedUnitTimeAgo = async () => {

    const query = {
        endTime: {
            $gte: Math.ceil((new Date().getTime() / 1000) - global.ONE_UNIT_TIME_SINCE_EVENTS_ENDED_IN_SECONDS),
            $lte: Math.ceil(new Date().getTime() / 1000)
        },
        status: global.ACTIVE
    }

    return await eventModel.find(query).lean();
}

eventsLib.getEventsActiveAndEnded1AdminCycleAgo = async (durationOf1Cycle) => {

    const query = {
        status: global.ACTIVE
    }
    if (durationOf1Cycle) {
        query.endTime = { $gte: Math.ceil((new Date().getTime() / 1000) - durationOf1Cycle) };
    }
    return await eventModel.find(query).lean();
}

eventsLib.getEventsByEventId = async (eventIdList) => {

    const query = {
        eventId: { $in: eventIdList },
        status: global.ACTIVE
    }

    return await eventModel.find(query).lean();
}

eventsLib.getEventsEndedWithRewardsUnrewarded = async () => {

    const query = {
        areWinnersRewarded: { $ne: true },
        endTime: { $lte: Math.ceil(new Date().getTime() / 1000) },
        status: global.ACTIVE
    }

    return await eventModel.find(query).lean();
}

eventsLib.updateWinnersRewardedStatusOfEvents = async ( eventIdList ) => {

    try {
        const query = {
            eventId: { $in: eventIdList },
            status: global.ACTIVE
        }
        const data = {
            areWinnersRewarded: true
        }
        return await eventModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

eventsLib.getEventsActiveAndPushNotificationNotSent = async () => {

    const query = {
        isPushNotificationSent: { $ne: true },
        startTime: { $lte: Math.ceil(new Date().getTime() / 1000) },
        endTime: { $gt: Math.ceil(new Date().getTime() / 1000) },
        status: global.ACTIVE
    }

    return await eventModel.find(query).lean();
}

eventsLib.updatePushNotificationStatusOfEvents = async ( eventIdList ) => {

    try {
        const query = {
            eventId: { $in: eventIdList },
            status: global.ACTIVE
        }
        const data = {
            isPushNotificationSent: true
        }
        return await eventModel.updateMany(query, data, { new: true }).lean();
    } catch (e) {
        console.log(e);
    }
}

module.exports = eventsLib;
