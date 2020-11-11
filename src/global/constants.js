let constant = [];

constant.GAME_MODE = {
    PLAY_ONLINE: 1,
    PLAY_WITH_FRIENDS: 2,
    COMPUTER: 3,
    PASS_AND_PLAY: 4
}

//Following Values can be changed
constant.PLAYER_DEFAULT_COINS = 100000;
constant.PLAYER_DEFAULT_CRYSTALS = 25;
constant.PLAYER_DEFAULT_XP = 50;
constant.PLAYER_DEFAULT_AVATAR = 1;

constant.MAX_SHOP_FREE_COINS_REWARDS_PER_DAY = 5;
constant.TIME_IN_SECONDS_BETWEEN_EACH_SHOP_FREE_COINS_AD = 1800;
constant.REWARD_COINS_FOR_SHOP_FREE_COINS_AD = 200;
constant.ONE_CYCLE_FOR_REWARDS_IN_SECONDS = 24 * 60 * 60;

constant.MAX_ACTIVE_EVENTS_TO_JOIN = 1;
constant.ONE_CYCLE_FOR_LISTING_ENDED_EVENTS_IN_SECONDS = 24 * 60 * 60;
constant.ONE_CYCLE_SINCE_EVENT_ENDED_FOR_VIEWING_LEADERBOARD_IN_SECONDS = 24 * 60 * 60;
constant.ONE_ADMIN_CYCLE_FOR_LISTING_ENDED_EVENTS_IN_SECONDS = 0;// 0 for all events

constant.FOUR_PLAYER_RANK1_AMOUNT_MULTIPLIER = 1.8;
constant.FOUR_PLAYER_RANK2_AMOUNT_MULTIPLIER = 1.2;
constant.FOUR_PLAYER_RANK3_AMOUNT_MULTIPLIER = 1;

constant.THREE_PLAYER_RANK1_AMOUNT_MULTIPLIER = 1.8;
constant.THREE_PLAYER_RANK2_AMOUNT_MULTIPLIER = 1.2;

constant.TWO_PLAYER_RANK1_AMOUNT_MULTIPLIER = 2;

constant.LEADERBOARD_POINTS = {
    EVENTS_COMPLETED: 50,
    ONLINE_RANK_ONE: 40,
    ONLINE_RANK_TWO: 30,
    ONLINE_RANK_THREE: 20,
    KILL: 5
}

constant.EMAIL_VERIFICATION_MAX_TIME_SECONDS = 10 * 60;

constant.LEADERBOARD_LIMIT = {
    NORMAL: 50,
    EVENT_REWARD_COIN_OR_CRYSTAL_OR_CASH: false, //no limit
    EVENT_REWARD_PHYSICAL: 3
}

constant.REWARD_FOR_REFERRING_GAME = [{
    reward_type: 1,
    reward_count: 100
}]

constant.MAX_INVITES_TILL_REWARD_IS_EARNED = 25;

constant.ONLINE_MODES_XP = {
    rank1: 100,
    rank2: 50,
    rank3: 20,
    kill: 5,
}

constant.OFFLINE_MODES_XP = {
    rank1: 50,
    rank2: 20,
    rank3: 10,
    kill: 3,
}

constant.ADMIN_USER_LIST_COUNT_LIMIT = 20;
constant.LEADERBOARD_LIST_COUNT_LIMIT = 20;

constant.NOTIFICATION_TITLE = "Event Started"
constant.EVENT_ACTIVE_NOTIFICATION_MESSAGE = "A new event is active! Check it out now!";


//The following values can be changed but need to inform Front end
constant.PLAYER_DEFAULT_AVAILABLE_AVATAR = [1, 2];

constant.avatarPurchaseData = [
    { "avatarId": 3, "coin": 3000, "crystal": 0, "status": 1 },
    { "avatarId": 4, "coin": 7000, "crystal": 0, "status": 1 },
    { "avatarId": 5, "coin": 10000, "crystal": 0, "status": 1 },
    { "avatarId": 6, "coin": 15000, "crystal": 0, "status": 1 }
]

constant.UNDO_MOVE_BASE_CRSYTALS = 2;
constant.UNDO_MOVE_CRSYTAL_INCREMENT = 3;

constant.MATCH_BET_AMOUNTS = {
    [constant.GAME_MODE.PLAY_ONLINE]: [500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000],
    [constant.GAME_MODE.PLAY_WITH_FRIENDS]: [500, 1000, 5000, 10000, 50000, 100000]
};
constant.MIN_NEEDED_CHARACTERS_IN_USERNAME = 3;
constant.MAX_ALLOWED_CHARACTERS_IN_USERNAME = 20;

//DO NOT CHANGE BELOW VALUES

constant.FALSE = 1;
constant.TRUE = 2;
constant.BCRYPT_SALT_ROUNDS = 10;

constant.ACTIVE = 1;
constant.INACTIVE = 2;
constant.BLOCKED = 3;

constant.IAP_ITEM_TYPE = {
    COIN: 1,
    CRYSTAL: 2,
    AVATAR: 3
};

constant.REWARD_AD_TYPE_DAILY_REWARD = 1;
constant.REWARD_AD_TYPE_SHOP_FREE_COINS = 2;

constant.LINK_TYPE_LOCAL_GUEST = 1;
constant.LINK_TYPE_SERVER = 2;

constant.LOGIN_TYPE = {
    EMAIL: 1,
    FACEBOOK: 2,
    GUEST: 3
}

constant.GAME_TYPE = {
    NORMAL: 1,
    SLINGSHOT: 2
}

constant.GAME_ACTIVITY_TYPE = {
    MATCH_START: 1,
    KILL_TOKEN: 2,
    UNDO_MOVE: 3
}

constant.CHIPS_COLOR_BLUE = 1;
constant.CHIPS_COLOR_RED = 2;
constant.CHIPS_COLOR_GREEN = 3;
constant.CHIPS_COLOR_YELLOW = 4;

constant.REWARD_TYPE = {
    COIN: 1,
    CRYSTAL: 2,
    PHYSICAL: 3,
    CASH: 4
}

constant.NUMBER_OF_REWARDS = {
    COIN_OR_CRYSTAL_OR_CASH: 20,
    PHYSICAL: 3
}

constant.USER_TYPE = {
    ADMIN: 1,
    USER: 2
}

constant.LEADERBOARD_TYPE_NORMAL = 1;
constant.LEADERBOARD_TYPE_EVENT = 2;

constant.ONE_UNIT_TIME_SINCE_EVENTS_ENDED_IN_SECONDS = 60;

constant.MAX_INVITES_REACHED = 3;

constant.UPDATE_TYPE = {
    PROFILE_PICTURE: 1,
    UPI_DATA: 2,
    AVATAR_PURCHASE: 3,
    MATCH_DATA: 4,
    USERNAME: 5
}

constant.UPI_ACCOUNT_TYPE = {
    GOOGLE_PAY: 1,
    PHONEPE: 2,
    UPI_ID: 3
}

constant.WEBSOCKET_EVENT = {
    REFERRAL_SUCCESS: 1,
    UPI_AMOUNT_TRANSFER_SUCCESS: 2,
    PENDING_NOTIFICATION: 3

}

constant.DEVICE_TYPE = {
    ANDROID: 1,
    IOS: 2
}

constant.ROOM_STATE = {
    PENDING: 1,
    ACTIVE: 2,
    MATCH_COMPLETE: 3,
    FORCE_CLOSED: 4
}
constant.ROOM_USER_STATE = {
    ACTIVE: 1,
    MATCH_STARTED: 2,
    MATCH_COMPLETE: 3
}

constant.EVENTS = {
    MAX_WIN: 1,
    MAX_KILLS: 2,
    MAX_MATCH_PLAYED: 3
}

constant.REFERRAL_CLAIM_STATUS = {
    UNCLAIMED: 1,
    CLAIMED: 2,
    MAX_INVITES_REACHED: 3
}

module.exports = constant;
