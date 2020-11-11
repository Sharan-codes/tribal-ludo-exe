const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const feedbackSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

feedbackSchema.plugin(autoIncrement, { inc_field: 'feedbackId' });

module.exports = mongoose.model('feedback', feedbackSchema, 'feedback');
