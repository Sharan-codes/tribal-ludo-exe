const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const eventSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

eventSchema.plugin(autoIncrement, { inc_field: 'eventId' });
eventSchema.index({ endTime: 1, status: 1 });

module.exports = mongoose.model('event', eventSchema, 'event');
