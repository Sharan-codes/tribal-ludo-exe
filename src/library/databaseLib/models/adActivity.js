const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const adActivitySchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

adActivitySchema.plugin(autoIncrement, { inc_field: 'activityId' });
adActivitySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('adActivity', adActivitySchema, 'adActivity');
