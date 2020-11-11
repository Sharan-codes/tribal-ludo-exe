const { mongoose } = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({},
  {
    strict: false,
    versionKey: false,
    timestamps: true
  });

userSchema.plugin(autoIncrement, { inc_field: 'userId' });
userSchema.index({ userId: 1 }, { unique: true });
userSchema.index({ referralCode: 1 }, { unique: true });

module.exports = mongoose.model('user', userSchema, 'user');
