const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const dailyRewardSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

dailyRewardSchema.plugin(autoIncrement, { inc_field: 'dailyRewardId' });
dailyRewardSchema.index({ day: 1 });

module.exports = mongoose.model('dailyReward', dailyRewardSchema, 'dailyReward');
