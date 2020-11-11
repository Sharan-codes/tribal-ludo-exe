const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const eventActivitySchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

eventActivitySchema.plugin(autoIncrement, { inc_field: 'eventActivityId' });
eventActivitySchema.index({ eventId: 1, userId: 1 });

module.exports = mongoose.model('eventActivity', eventActivitySchema, 'eventActivity');
