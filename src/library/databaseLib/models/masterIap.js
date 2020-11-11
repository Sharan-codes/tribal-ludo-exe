const { mongoose } = require('../../../base/mongo');

const masterIapSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('masterIap', masterIapSchema, 'masterIap');
