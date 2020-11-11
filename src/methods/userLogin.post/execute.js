const global = require('../../global');
const restBase = require("../../base/restBase.class");
const mgUserLib = require('../../library/databaseLib/user.lib.js');
const facebookLib = require('../../library/utilityLib/facebook.lib');
const awsSESLib = require('../../library/utilityLib/awsSESHelper');
const mgGameDataLib = require('../../library/databaseLib/gameData.lib');

const md5 = require("md5");
const bcrypt = require("bcrypt");
const utility = require('../../library/utilityLib/utility');

class userLoginAction extends restBase {

  async executeMethod() {
    try {

      let {
        loginType,
        deviceId,
        username,
        facebookAccessToken,
        emailId,
        password,
        referralCode,
        isForceLogin,
        linkType,
        forceLink,
        androidPushToken,
        iosPushToken
      } = this;

      if (loginType != global.LOGIN_TYPE.EMAIL && loginType != global.LOGIN_TYPE.FACEBOOK && loginType != global.LOGIN_TYPE.GUEST) {
        this.setResponse("INVALID_DATA");
        return {};
      }
      if (loginType == global.LOGIN_TYPE.EMAIL) {
        if (!emailId) {
          let options = [];
          options.paramName = "email_id";
          this.setResponse("PARAMETER_IS_MANDATORY", options);
          return {};
        }

        if (!password) {
          let options = [];
          options.paramName = "password";
          this.setResponse("PARAMETER_IS_MANDATORY", options);
          return {};
        }
        emailId = emailId.toLowerCase();
      }
      if (loginType == global.LOGIN_TYPE.FACEBOOK && !facebookAccessToken) {
        let options = [];
        options.paramName = "facebook_access_token";
        this.setResponse("PARAMETER_IS_MANDATORY", options);
        return {};
      }

      let user, facebookId, isFirstLogin = global.FALSE, isEmailFirstLoginWithNoAccountLinking = global.FALSE;
      let unlinkedGuestData = await mgUserLib.getUnlinkedGuestData(deviceId);

      if (loginType == global.LOGIN_TYPE.EMAIL) {
        user = await mgUserLib.getUserDetailFromEmailId(emailId);

        if (!user || user.isEmailVerified == global.FALSE) {
          this.setResponse("INVALID_USER");
          return {};
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          this.setResponse("INVALID_PASSWORD");
          return {};
        }

        if (user.status == global.BLOCKED) {
          this.setResponse("USER_IS_BANNED");
          return {};
        }

        if (!user.username) {
          isFirstLogin = global.TRUE;
          isEmailFirstLoginWithNoAccountLinking = global.TRUE;
          if (!username) {
            //The email user has no username in db and also no username is passed in login
            this.setResponse("USERNAME_UPDATE_REQUIRED");
            return {};
          }
          if (username.length < global.MIN_NEEDED_CHARACTERS_IN_USERNAME || username.length > global.MAX_ALLOWED_CHARACTERS_IN_USERNAME) {
            this.setResponse("INVALID_USERNAME");
            return {};
          }
        }

        //If it is first login by email and unlinked guest data exists, link them
        if (unlinkedGuestData && isFirstLogin == global.TRUE) {
          isEmailFirstLoginWithNoAccountLinking = global.FALSE;
          let userToDisable = user;
          user = await mgUserLib.linkEmailToGuestAccount(unlinkedGuestData.userId, user.emailId, user.password, user.isEmailVerified);
          await mgUserLib.disableOldUserAccount(userToDisable.userId);
        } else if (unlinkedGuestData) {
          //If there is unlinked guest data use forceLink
          if (forceLink != global.TRUE) {
            this.setResponse("DATA_CONFLICT");
            return {};
          } else if (forceLink == global.TRUE) {
            if (!linkType) {
              let options = [];
              options.paramName = "link_type";
              this.setResponse("PARAMETER_IS_MANDATORY", options);
              return {};
            }
            if (linkType == global.LINK_TYPE_LOCAL_GUEST) {
              let userToDisable = user;
              user = await mgUserLib.linkEmailToGuestAccount(unlinkedGuestData.userId, user.emailId, user.password, user.isEmailVerified);
              await mgUserLib.disableOldUserAccount(userToDisable.userId);
            } else if (linkType == global.LINK_TYPE_SERVER) {
              let userToDisable = unlinkedGuestData;
              user = await mgUserLib.linkDeviceIdToEmailAccount(user.userId, deviceId);
              await mgUserLib.disableOldUserAccount(userToDisable.userId);
            } else {
              this.setResponse("INVALID_DATA");
              return {};
            }
          }
        }

      } else if (loginType == global.LOGIN_TYPE.FACEBOOK) {
        facebookId = await facebookLib.getFacebookIdFromAccessToken(facebookAccessToken);

        if (!facebookId) {
          this.setResponse("INVALID_FACEBOOK_ACCESS_TOKEN");
          return {};
        }

        user = await mgUserLib.getUserDetailFromFacebookId(facebookId);
        if (!user) {
          isFirstLogin = global.TRUE;
          if (!username) {
            //No username is passed in login
            let options = [];
            options.paramName = "username";
            this.setResponse("PARAMETER_IS_MANDATORY", options);
            return {};
          }
          if (username.length < global.MIN_NEEDED_CHARACTERS_IN_USERNAME || username.length > global.MAX_ALLOWED_CHARACTERS_IN_USERNAME) {
            this.setResponse("INVALID_USERNAME");
            return {};
          }
        } else if (user.status == global.BLOCKED) {
          this.setResponse("USER_IS_BANNED");
          return {};
        }
        //If it is the first login by Facebook and unlinked guest data exists, link them
        if (unlinkedGuestData && isFirstLogin == global.TRUE) {
          user = await mgUserLib.linkFacebookIdToGuestAccount(unlinkedGuestData.userId, facebookId, username);
        } else if (unlinkedGuestData) {
          //If there is unlinked guest data use forceLink
          if (forceLink != global.TRUE) {
            this.setResponse("DATA_CONFLICT");
            return {};
          } else if (forceLink == global.TRUE) {
            if (!linkType) {
              let options = [];
              options.paramName = "link_type";
              this.setResponse("PARAMETER_IS_MANDATORY", options);
              return {};
            }
            if (linkType == global.LINK_TYPE_LOCAL_GUEST) {
              let userToDisable = user;
              user = await mgUserLib.linkFacebookIdToGuestAccount(unlinkedGuestData.userId, facebookId, user.username);
              await mgUserLib.disableOldUserAccount(userToDisable.userId);
            } else if (linkType == global.LINK_TYPE_SERVER) {
              let userToDisable = unlinkedGuestData;
              user = await mgUserLib.linkDeviceIdToFacebookAccount(user.userId, deviceId);
              await mgUserLib.disableOldUserAccount(userToDisable.userId);
            } else {
              this.setResponse("INVALID_DATA");
              return {};
            }
          }
        }

      } else {
        //If username is not passed for guest login
        if (!username) {
          let options = [];
          options.paramName = "username";
          this.setResponse("PARAMETER_IS_MANDATORY", options);
          return {};
        }
        if (username.length < global.MIN_NEEDED_CHARACTERS_IN_USERNAME || username.length > global.MAX_ALLOWED_CHARACTERS_IN_USERNAME) {
          this.setResponse("INVALID_USERNAME");
          return {};
        }
        user = unlinkedGuestData;
      }

      let accessToken = md5(md5(new Date().getTime()));
      let iteration = 0;

      //If unlinked guest data doesn't exist
      if (!user) {

        let code = utility.generateUniqueCode();
        let isCodeExist = false;

        //check in db if the code already exists
        do {
          iteration++;

          isCodeExist = await mgUserLib.getUserByReferralCode(code);

        } while (isCodeExist && iteration <= 100);

        //Add a new fb/guest user
        user = await mgUserLib.addNewUser({
          username,
          deviceId,
          facebookId,
          accessToken,
          referralCode: code,
          referredBy: referralCode
        })
        if (user.referredBy) {
          await utility.recordInvitingActivityOfUser(user);
        }

        let matchData = {
          "total_match_played": 0,
          "match_win_count": 0,
          "two_player_win_count": 0,
          "four_player_win_count": 0,
          "kill_count": 0,
          "rank_one_count": 0,
          "rank_two_count": 0,
          "rank_three_count": 0
        }

        await Promise.all([
          mgGameDataLib.updateNewGameData(user.userId, global.GAME_MODE.PLAY_ONLINE, matchData),
          mgGameDataLib.updateNewGameData(user.userId, global.GAME_MODE.PLAY_WITH_FRIENDS, matchData)
        ]);

      } else {
        //Already existing user in database

        if (isFirstLogin == global.TRUE || loginType == global.LOGIN_TYPE.GUEST) {
          user = await mgUserLib.updateUsername(user.userId, username);
          if (isEmailFirstLoginWithNoAccountLinking == global.TRUE) {
            if (user.referredBy) {
              await utility.recordInvitingActivityOfUser(user);
            }
          }
        }

        //Check if the last login was performed on same device
        if (user.deviceId == deviceId) {
          user = await mgUserLib.updateUserAccessToken(user.userId, accessToken);
        } else {
          if (!user.deviceId || isForceLogin == global.TRUE) {
            //update device id in db
            user = await mgUserLib.updateUserAccessTokenAndDeviceId(user.userId, deviceId, accessToken);
          } else {
            this.setResponse("USER_ALREADY_LOGGED_IN_OTHER_DEVICE");
            return {};
          }
        }
      }
      if (androidPushToken) {
        user = await mgUserLib.updateUserAndroidPushToken(user.userId, androidPushToken);
      } else if (iosPushToken) {
        user = await mgUserLib.updateUserIosPushToken(user.userId, iosPushToken);
      }
      this.setResponse("SUCCESS");
      return {
        user_id: user.userId,
        access_token: user.accessToken
      };
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = userLoginAction;
