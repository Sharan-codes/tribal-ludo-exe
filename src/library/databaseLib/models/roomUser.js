const {
  mongoose
} = require('../../../base/mongo');

const roomUserSchema = new mongoose.Schema({},
  {
    strict: false,
    versionKey: false,
    timestamps: true
  });
roomUserSchema.index({ roomId: 1, userId: 1 });

module.exports = mongoose.model('roomUser', roomUserSchema, 'roomUser');
