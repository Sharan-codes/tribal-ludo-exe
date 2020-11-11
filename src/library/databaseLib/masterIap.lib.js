const masterIapModel = require('./models/masterIap.js');
const global = require('../../global');

let masterIapLib = [];

masterIapLib.getMasterIapData = async (options = []) => {

    const query = {
        status: global.ACTIVE
    }

    return await masterIapModel.find(query).sort().lean();
}

module.exports = masterIapLib;
