const axios = require("axios");

let facebookLib = [];

facebookLib.getFacebookIdFromAccessToken = async (facebookAccessToken, options = []) => {

    let res;
    try {
        await axios.get(`https://graph.facebook.com/me?fields=id&access_token=${facebookAccessToken}`)
            .then(response => {
                res = response.data.id
            })

    } catch (e) {
        return;
    }
    return res;

}

module.exports = facebookLib;
