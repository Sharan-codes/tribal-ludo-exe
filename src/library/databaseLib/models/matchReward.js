const { mongoose } = require('../../../base/mongo');

const matchRewardSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});
matchRewardSchema.index({ modeId: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('matchReward', matchRewardSchema, 'matchReward');
