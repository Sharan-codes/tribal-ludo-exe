const global = require('../global');
const restBase = require("../base/restBase.class");
const utility = require("../library/utilityLib/utility");
const mgUserLib = require('../library/databaseLib/user.lib');
const mgEventLib = require('../library/databaseLib/event.lib.js');
const mgEventActivityLib = require('../library/databaseLib/eventActivity.lib');
const { sendPushNotification } = require("../library/utilityLib/pushNotificationHelper");

module.exports.handler = async (event, user) => {

    try {
        //Notify users of an event becoming active
        let activeEvents = await mgEventLib.getEventsActiveAndPushNotificationNotSent();
        if (activeEvents.length) {
            let activeEventsToBeNotified = [];
            activeEvents.map(event => activeEventsToBeNotified.push(event.eventId));
            sendPushNotification([], global.EVENT_ACTIVE_NOTIFICATION_MESSAGE);

            await mgEventLib.updatePushNotificationStatusOfEvents(activeEventsToBeNotified);
        }
        //Reward winners of events that have ended
        let events = await mgEventLib.getEventsEndedWithRewardsUnrewarded();
        console.log("event check");
        if (events.length) {
            let rewardedEvents = [];
            events.map(event => rewardedEvents.push(event.eventId));
            for (let index = 0; index < events.length; index++) {
                let event = events[index];

                let limit = false, maxWinValue = 0, maxKillValue = 0, maxMatchPlayedValue = 0;

                event.eventObjective.map((objective) => {
                    if (objective.type == global.EVENTS.MAX_WIN) {
                        maxWinValue = objective.value;
                    }
                    if (objective.type == global.EVENTS.MAX_KILLS) {
                        maxKillValue = objective.value;
                    }
                    if (objective.type == global.EVENTS.MAX_MATCH_PLAYED) {
                        maxMatchPlayedValue = objective.value;
                    }
                });

                let eventActivities = await mgEventActivityLib.getEventActivitiesWithObjectivesCompleted(event.eventId, limit, maxWinValue, maxKillValue, maxMatchPlayedValue);
                if (eventActivities.length) {
                    let eventCompletedUsersList = [], eventRewardWinnersList = [];
                    let users = eventActivities.map(activity => eventCompletedUsersList.push(activity.userId));
                    if (await Promise.all(users)) {
                        //Store userId of event coin or crystal reward winners and reward them
                        for (let i = 0; i < event.rewards.length; i++) {
                            let reward = event.rewards[i];
                            if (reward['reward_type'] == global.REWARD_TYPE.COIN || reward['reward_type'] == global.REWARD_TYPE.CRYSTAL || reward['reward_type'] == global.REWARD_TYPE.CASH) {
                                let count = 0;
                                eventRewardWinnersList = eventCompletedUsersList.filter(() => { count++; return count <= global.NUMBER_OF_REWARDS.COIN_OR_CRYSTAL_OR_CASH });
                                if (reward['reward_type'] == global.REWARD_TYPE.COIN) {
                                    await mgUserLib.incrementCoinCountOfUsers(eventRewardWinnersList, reward['reward_count']);
                                }
                                if (reward['reward_type'] == global.REWARD_TYPE.CRYSTAL) {
                                    await mgUserLib.incrementCrystalCountOfUsers(eventRewardWinnersList, reward['reward_count']);
                                }
                                //Set isWinner as true for cash reward winners
                                if (reward['reward_type'] == global.REWARD_TYPE.CASH) {
                                    await mgEventActivityLib.updateWinnerStatusOfUsers(event.eventId, eventRewardWinnersList);
                                }
                            }
                        }

                        //Update points and eventWincount for users who completed the event
                        let increasedPoints = global.LEADERBOARD_POINTS.EVENTS_COMPLETED;    
                        await mgUserLib.incrementUserPointsAndEventWinCount(eventCompletedUsersList, increasedPoints);
                    }
                }
            }
            await mgEventLib.updateWinnersRewardedStatusOfEvents(rewardedEvents);
        }

    } catch (e) {
        console.log(e);
    }
};
