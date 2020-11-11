const {
    mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const iapTransactionSchema = new mongoose.Schema({}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

iapTransactionSchema.plugin(autoIncrement, { inc_field: 'iapTransactionId' });

module.exports = mongoose.model('iapTransaction', iapTransactionSchema, 'iapTransaction');
