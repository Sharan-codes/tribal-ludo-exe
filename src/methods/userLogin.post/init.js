const global = require('../../global');
baseInitialize = require('../../base/baseInitialize.class');

class userLoginInitalize extends baseInitialize {

  constructor() {
    super();
    this.isSecured = false;
    this.requestMethod = "POST";
  }

  getParameters() {
    const param = [];

    param.loginType = {
      name: "login_type",
      type: Number,
      description: "Login type of the player",
      required: true,
      default: ""
    }
    param.deviceId = {
      name: "device_id",
      type: String,
      description: "Device id of the player",
      required: true,
      default: ""
    }
    param.username = {
      name: "username",
      type: String,
      description: "Username of the player",
      required: false,
      default: ""
    }

    param.facebookAccessToken = {
      name: "facebook_access_token",
      type: String,
      description: "Facebook access token of the player",
      required: false,
      default: ""
    }
    param.emailId = {
      name: "email_id",
      type: String,
      description: "Email Id of the player",
      required: false,
      default: ""
    }
    param.password = {
      name: "password",
      type: String,
      description: "Password of the email account",
      required: false,
      default: ""
    }
    param.referralCode = {
      name: "referral_code",
      type: String,
      description: "Referral code if the user has joined by any user's code",
      required: false,
      default: ""
    }
    param.isForceLogin = {
      name: "is_force_login",
      type: Number,
      description: "If the player has logged into in other device then do force login",
      required: false,
      default: global.FALSE
    }
    param.linkType = {
      name: "link_type",
      type: Number,
      description: "Link type for linking to local or server account",
      required: false,
      default: ""
    }
    param.forceLink = {
      name: "force_link",
      type: Number,
      description: "To decide linking of accounts",
      required: false,
      default: global.FALSE
    }
    param.androidPushToken = {
      name: "android_push_token",
      type: String,
      description: "Android device push token",
      required: false,
      default: ""
    }
    param.iosPushToken = {
      name: "ios_push_token",
      type: String,
      description: "ios device push token",
      required: false,
      default: ""
    }
    return param;
  }
}

module.exports = userLoginInitalize;
