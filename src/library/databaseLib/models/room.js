const {
  mongoose
} = require('../../../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const roomSchema = new mongoose.Schema({},
  {
    strict: false,
    versionKey: false,
    timestamps: true
  });

// roomSchema.plugin(autoIncrement, { inc_field: 'roomId' });
roomSchema.index({ roomId: 1 });

module.exports = mongoose.model('room', roomSchema, 'room');
