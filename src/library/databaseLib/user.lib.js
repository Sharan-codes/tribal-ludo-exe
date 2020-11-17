const userModel = require('./models/user');
const global = require('../../global');

let userLib = {};
userLib.addNewUser = async ({ username, accessToken, deviceId, facebookId, referralCode, referredBy }) => {

    const data = {
        userType: global.USER_TYPE.USER,
        username,
        accessToken,
        deviceId,
        eventWinCount: 0,
        coin: global.PLAYER_DEFAULT_COINS,
        crystal: global.PLAYER_DEFAULT_CRYSTALS,
        xp: global.PLAYER_DEFAULT_XP,
        referralCode: referralCode,
        avatarId: global.PLAYER_DEFAULT_AVATAR,
        availableAvatar: global.PLAYER_DEFAULT_AVAILABLE_AVATAR,
        status: global.ACTIVE
    }
    if (facebookId) {
        data.facebookId = facebookId;
    }
    if (referredBy) {
        data.referredBy = referredBy;
    }
    return await userModel(data).save();
}
userLib.addNewEmailUser = async ({ emailId, password, referralCode, referredBy }) => {

    const data = {
        userType: global.USER_TYPE.USER,
        emailId,
        password,
        // deviceId,
        isEmailVerified: global.FALSE,
        emailVerifyEndTime: new Date(new Date().getTime() + (global.EMAIL_VERIFICATION_MAX_TIME_SECONDS * 1000)),
        coin: global.PLAYER_DEFAULT_COINS,
        crystal: global.PLAYER_DEFAULT_CRYSTALS,
        xp: global.PLAYER_DEFAULT_XP,
        referralCode: referralCode,
        avatarId: global.PLAYER_DEFAULT_AVATAR,
        availableAvatar: global.PLAYER_DEFAULT_AVAILABLE_AVATAR,
        status: global.ACTIVE
    }
    if (referredBy) {
        data.referredBy = referredBy;
    }
    return await userModel(data).save();
}

userLib.updateUnverifiedEmailUserData = async ({ emailId, password, deviceId, referredBy }) => {
    const query = {
        userType: global.USER_TYPE.USER,
        emailId,
        isEmailVerified: global.FALSE,
        status: global.ACTIVE
    }

    const data = {
        emailId,
        password,
        deviceId,
        emailVerifyEndTime: new Date(new Date().getTime() + (global.EMAIL_VERIFICATION_MAX_TIME_SECONDS * 1000)),
    }
    if (referredBy) {
        data.referredBy = referredBy;
    }
    return await userModel.findOneAndUpdate(query, data).lean();
}

userLib.getUserDetails = async (userId, options = []) => {
    const query = {
        userId,
        $or: [{ status: global.ACTIVE }, { status: global.BLOCKED }]
    }
    return await userModel.findOne(query).lean();
}
userLib.getUserDetailsById = async (id, options = []) => {
    const query = {
        _id: id,
        status: global.ACTIVE
    }
    return await userModel.findOne(query).lean();
}

userLib.getUserDetailsBySocketId = async (socketId, options = []) => {
    const query = {
        connectionId: socketId,
        status: global.ACTIVE
    }
    return await userModel.findOne(query).lean();
}

userLib.updateUsername = async (userId, username) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        username
    }
    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}
userLib.getUserByReferralCode = async (referralCode) => {
    const query = {
        userType: global.USER_TYPE.USER,
        referralCode
    }
    return await userModel.findOne(query).lean();
}
userLib.getUserDetailFromDeviceId = async (deviceId) => {

    const query = {
        userType: global.USER_TYPE.USER,
        deviceId
    }

    return await userModel.findOne(query).lean();
}

userLib.getUserDetailFromFacebookId = async (facebookId) => {

    const query = {
        facebookId,
        userType: global.USER_TYPE.USER,
        $or: [{ status: global.ACTIVE }, { status: global.BLOCKED }]
    }

    return await userModel.findOne(query).lean();
}
userLib.getUserDetailFromEmailId = async (emailId) => {

    const query = {
        emailId,
        userType: global.USER_TYPE.USER,
        $or: [{ status: global.ACTIVE }, { status: global.BLOCKED }]
    }

    return await userModel.findOne(query).lean();
}


userLib.linkFacebookAccount = async ({ userId, username, facebookId }) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    let update;
    if (username) {
        update = {
            username,
            facebookId
        }

    } else {
        update = {
            facebookId
        }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.updateUserAccessToken = async (userId, accessToken, options = []) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        accessToken
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}
userLib.updateUserAccessTokenAndDeviceId = async (userId, deviceId, accessToken, options = []) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        accessToken,
        deviceId
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}
userLib.incrementCoinCount = async (userId, value) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { coin: value }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.incrementCrystalCount = async (userId, value) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { crystal: value }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}


userLib.incrementUserXp = async (userId, value) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { xp: value }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.decrementCoinCount = async (userId, value) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { coin: -value }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}
userLib.decrementCrystalCount = async (userId, value) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { crystal: -value }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}
userLib.updateSocketConnectionId = async (userId, connectionId) => {
    const filter = {
        userId,
        status: global.ACTIVE
    }
    const update = {
        connectionId
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}
userLib.clearUserSocketConnectionId = async (connectionId) => {
    const filter = {
        connectionId,
        status: global.ACTIVE
    }
    const update = {
        $unset: { "connectionId": "" }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.linkEmailToGuestAccount = async (userId, emailId, password, isEmailVerified) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        emailId,
        password,
        isEmailVerified
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.linkDeviceIdToEmailAccount = async (userId, deviceId) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        deviceId
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}



userLib.linkFacebookIdToGuestAccount = async (userId, facebookId, username) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        facebookId,
        username
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.linkDeviceIdToFacebookAccount = async (userId, deviceId) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        deviceId
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}


userLib.updateEmailVerificationStatus = async (userId, options = []) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        isEmailVerified: global.TRUE,
        emailVerifiedTime: new Date()
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.disableOldUserAccount = async (userId, options = []) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }

    const update = {
        $unset: {
            deviceId: "",
            facebookId: "",
            emailId: ""
        },
        status: global.INACTIVE
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.getUnlinkedGuestData = async (deviceId) => {

    const query = {
        userType: global.USER_TYPE.USER,
        deviceId,
        status: global.ACTIVE,
        $and: [
            { $or: [{ emailId: { $exists: false } }, { emailId: '' }] },
            { $or: [{ facebookId: { $exists: false } }, { facebookId: '' }] }
        ]
    }

    return await userModel.findOne(query).lean();
}

userLib.getAdminDetailFromUsername = async (username) => {
    const query = {
        userType: global.USER_TYPE.ADMIN,
        username,
        status: global.ACTIVE
    }
    return await userModel.findOne(query).lean();
}

userLib.addAdmin = async ({ username, password }) => {

    const data = {
        userType: global.USER_TYPE.ADMIN,
        username,
        password,
        referralCode: username,
        status: global.ACTIVE
    }

    return await userModel(data).save();
}

userLib.updateAdminAccessToken = async (username, accessToken) => {

    const filter = {
        userType: global.USER_TYPE.ADMIN,
        username,
        status: global.ACTIVE
    }
    const update = {
        accessToken
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.incrementUserXpAndPoints = async (userId, increasedXp, increasedPoints) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { xp: increasedXp, points: increasedPoints },
        pointsUpdatedAt: new Date()
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.getUsersBasedOnPointsWithLimit = async (limit = false) => {

    try {
        let query = {
            userType: global.USER_TYPE.USER,
            points: { $gt: 0 },
            status: global.ACTIVE
        };

        let options = {
            limit: limit,
            sort: {
                points: -1,
                pointsUpdatedAt: 1
            }
        }
        return await userModel.find(query, null, options).lean();
    } catch (e) {
        console.log(e);
    }
}

userLib.incrementCoinCountOfUsers = async (userIdList, coinCount) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId: { $in: userIdList },
        status: global.ACTIVE
    }
    const update = {
        $inc: { coin: coinCount }
    }

    return await userModel.updateMany(filter, update, { new: true }).lean();
}

userLib.incrementCrystalCountOfUsers = async (userIdList, crystalCount) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId: { $in: userIdList },
        status: global.ACTIVE
    }
    const update = {
        $inc: { crystal: crystalCount }
    }

    return await userModel.updateMany(filter, update, { new: true }).lean();
}

userLib.incrementUserPointsAndEventWinCount = async (userIdList, increasedPoints, value = 1) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId: { $in: userIdList },
        status: global.ACTIVE
    }
    const update = {
        $inc: { points: increasedPoints, eventWinCount: value },
        pointsUpdatedAt: new Date()
    }

    return await userModel.updateMany(filter, update, { new: true }).lean();
}

userLib.blockUser = async (userId, options = []) => {
    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }

    const update = {
        status: global.BLOCKED
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.getUsersByUsername = async (username, lastUserId, limit) => {

    const query = {
        username: { '$regex': `^${username}$`, $options: 'i' },
        userId: { $gt: lastUserId },
        userType: global.USER_TYPE.USER,
        $or: [{ status: global.ACTIVE }, { status: global.BLOCKED }]
    }

    return await userModel.find(query).limit(limit).lean();
}

userLib.getUsersByUserId = async (userIdList) => {

    const query = {
        userId: { $in: userIdList },
        userType: global.USER_TYPE.USER,
        status: global.ACTIVE
    }

    return await userModel.find(query).lean();
}

userLib.getUsers = async (lastUserId, limit) => {

    const query = {
        userId: { $gt: lastUserId },
        userType: global.USER_TYPE.USER,
        $or: [{ status: global.ACTIVE }, { status: global.BLOCKED }],
        $and: [{ username: { $exists: true } }, { username: { $ne: '' } }, { username: { $ne: null } }, { username: { $ne: undefined } }]
    }

    return await userModel.find(query).limit(limit).lean();
}

userLib.incrementCoinCountAndTotalInvite = async (userId, value) => {

    const filter = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const update = {
        $inc: { coin: value, totalInvite: 1 }
    }

    return await userModel.findOneAndUpdate(filter, update, { new: true }).lean();
}

userLib.updateUserUpiData = async (userId, upiData) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        upiData
    }
    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}

userLib.updateUserAvatar = async (userId, avatarId) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        avatarId
    }

    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}

userLib.updateAvatarPurchaseAndCurrency = async (userId, purchasedAvatarId, coinValue = 0, crystalValue = 0) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        $inc: { coin: -coinValue, crystal: -crystalValue },
        $push: { availableAvatar: { $each: purchasedAvatarId } }

    }
    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}

userLib.updateUserAndroidPushToken = async (userId, androidPushToken) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        androidPushToken,
        $unset: { iosPushToken: "" }
    }
    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}

userLib.updateUserIosPushToken = async (userId, iosPushToken) => {
    const query = {
        userType: global.USER_TYPE.USER,
        userId,
        status: global.ACTIVE
    }
    const data = {
        iosPushToken,
        $unset: { androidPushToken: "" }
    }
    return await userModel.findOneAndUpdate(query, data, { new: true }).lean();
}

userLib.getUserPushTokens = async () => {

    const query = {
        $or: [
            { androidPushToken: { $exists: true, $ne: "" } },
            { iosPushToken: { $exists: true, $ne: "" } }
        ],
        userType: global.USER_TYPE.USER,
        status: global.ACTIVE
    }

    return await userModel.find(query).lean();
}

module.exports = userLib;
