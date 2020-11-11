const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const inviteActivitySchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

inviteActivitySchema.plugin(autoIncrement, { inc_field: 'inviteActivityId' });
inviteActivitySchema.index({ ReferredBy: 1, createdAt: -1 });

module.exports = mongoose.model('inviteActivity', inviteActivitySchema, 'inviteActivity');
