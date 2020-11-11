const feedbackModel = require('./models/feedback');
const global = require('../../global');

let feedbackLib = [];

feedbackLib.submitFeedback = async (userId, message) => {

    try {
        const data = {
            userId,
            message,
            status: global.ACTIVE
        }

        return await feedbackModel(data).save();
    } catch (e) {
        console.log(e)
    }
}

module.exports = feedbackLib;
