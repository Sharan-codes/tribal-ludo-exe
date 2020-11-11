const global = require('../../global');
const restBase = require("../../base/restBase.class");
const mgUserLib = require('../../library/databaseLib/user.lib.js');
const facebookLib = require('../../library/utilityLib/facebook.lib');
const awsSESLib = require('../../library/utilityLib/awsSESHelper');
const mgGameDataLib = require('../../library/databaseLib/gameData.lib');

const md5 = require("md5");
const bcrypt = require("bcrypt");
const utility = require('../../library/utilityLib/utility');

class adminLoginAction extends restBase {

  async executeMethod() {
    try {

      const { username, password } = this;

      let admin = await mgUserLib.getAdminDetailFromUsername(username);

      if (!admin) {
        this.setResponse("INVALID_ADMIN");
        return {};
      }

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        this.setResponse("INVALID_PASSWORD");
        return {};
      }
      let accessToken = md5(md5(new Date().getTime()));

      admin = await mgUserLib.updateAdminAccessToken(admin.username, accessToken);

      this.setResponse("SUCCESS");
      return {
        user_id: admin.userId,
        access_token: admin.accessToken
      };
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = adminLoginAction;
