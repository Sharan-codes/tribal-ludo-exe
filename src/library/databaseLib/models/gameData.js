const {
    mongoose
} = require('../../../base/mongo');
const global = require('../../../global');

const autoIncrement = require('mongoose-sequence')(mongoose);

const gameDataSchema = new mongoose.Schema({
    gameMode: {
        type: Number
    },
    status: {
        type: Number,
        default: global.ACTIVE
    },
    userId: {
        type: Number
    },
    fourPlayerWinCount: {
        type: Number,
        required: true,
        default: 0
    },
    killCount: {
        type: Number,
        required: true,

        default: 0
    },
    matchWinCount: {
        type: Number,
        required: true,

        default: 0
    },
    rankOneCount: {
        type: Number,
        required: true,

        default: 0
    },
    rankTwoCount: {
        type: Number,
        required: true,

        default: 0
    },
    rankThreeCount: {
        type: Number,
        required: true,

        default: 0
    },
    totalMatchPlayed: {
        type: Number,
        required: true,

        default: 0
    },
    twoPlayerWinCount: {
        type: Number,
        required: true,

        default: 0
    }
}, {
    strict: false,
    versionKey: false,
    timestamps: true
});

gameDataSchema.plugin(autoIncrement, { inc_field: 'gameDataId' });

module.exports = mongoose.model('gameData', gameDataSchema, 'gameData');
