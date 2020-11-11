const axios = require("axios");
const global = require("../../global");
const mgUserLib = require("../databaseLib/user.lib");
const { FCM_SERVER_KEY } = process.env;

module.exports.sendPushNotification = async (userIds, notificationMessage) => {
  try {

    //TODO : Get the complete list of push token of all users
    let users = await mgUserLib.getUserPushTokens();
    let pushTokens = [];
    users.map(user => {
      let pushToken = user.androidPushToken ? user.androidPushToken : user.iosPushToken;
      pushTokens.push(pushToken);
    });
    if (pushTokens.length == 0) return;
    await Promise.all(pushTokens.map(async userToken => {
      const formatedData = {
        "notification": {
          "title": global.NOTIFICATION_TITLE,
          "body": notificationMessage
        },
        "data": {
          "title": global.NOTIFICATION_TITLE,
          "body": notificationMessage
        },
        "to": userToken
      };

      let res = await axios({
        body: JSON.stringify(formatedData),
        headers: {
          "Authorization": `key=${FCM_SERVER_KEY}`,
          "Content-Type": "application/json"
        },
        method: 'POST',
        url: `https://fcm.googleapis.com/fcm/send`
      });
      console.log(res);
    }));
  } catch (e) {
    console.log(e);
  }
};
