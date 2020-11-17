const global = require('../../global');
const restBase = require('../../base/restBase.class');
const utility = require("../../library/utilityLib/utility");
const mgGameDataLib = require('../../library/databaseLib/gameData.lib');
const mgEventActivityLib = require('../../library/databaseLib/eventActivity.lib');
const mgUserLib = require('../../library/databaseLib/user.lib');

class masterIapAction extends restBase {


  async executeMethod() {
    try {

      const { userId, accessToken, opponentUserId } = this;
      let result = await utility.validateUser(userId, accessToken);

      if (!result.success) {
        this.setResponse(result.responseCode);
        return {};
      }

      const opponentUser = await mgUserLib.getUserDetails(opponentUserId);

      if (!opponentUser) {
        this.setResponse("INVALID_OPPONENT_USER");
        return {};
      }

      let userGameData = await mgGameDataLib.getPlayerAllGameModeData(opponentUserId);

      let match_data = {
        "total_match_played": 0,
        "match_win_count": 0,
        "event_win_count": 0,
        "two_player_win_count": 0,
        "four_player_win_count": 0,
        "kill_count": 0
      }

      if (userGameData) {
        userGameData.map(data => {
          match_data.total_match_played += parseInt(data.totalMatchPlayed);
          match_data.match_win_count += parseInt(data.matchWinCount);
          match_data.two_player_win_count += parseInt(data.twoPlayerWinCount);
          match_data.four_player_win_count += parseInt(data.fourPlayerWinCount);
          match_data.kill_count += parseInt(data.killCount);
        })
      }

      match_data.event_win_count = opponentUser.eventWinCount ? opponentUser.eventWinCount : 0;
      match_data.total_event_count = await mgEventActivityLib.getTotalEventsOfUser(opponentUserId);

      this.setResponse("SUCCESS");
      return {
        "user_id": opponentUser.userId,
        "avatar_id": opponentUser.avatarId,
        "facebook_id": opponentUser.facebookId ? opponentUser.facebookId : "",
        "username": opponentUser.username ? opponentUser.username : "",
        "coin": opponentUser.coin ? opponentUser.coin : 0,
        "crystal": opponentUser.crystal ? opponentUser.crystal : 0,
        "xp": opponentUser.xp ? opponentUser.xp : 0,
        "match_data" : match_data
      };
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = masterIapAction;
