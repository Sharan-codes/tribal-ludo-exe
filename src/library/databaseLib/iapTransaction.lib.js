const iapTransactionModel = require('./models/iapTransaction');
const global = require('../../global');

let iapTransactionLib = [];

iapTransactionLib.addIapTransactionData = async (userId, purchaseReceipt, masterIapId, options = []) => {

    const data = {
        userId,
        purchaseReceipt,
        masterIapId,
        status: global.ACTIVE
    }

    return await iapTransactionModel(data).save();
}

// iapTransactionLib.getIapTransactionData = async (userId, purchaseReceipt, masterIapId, options = []) => {
//     const query = {
//         userId,
//         purchaseReceipt,
//         masterIapId,
//         status: global.ACTIVE
//     }

//     return await iapTransactionModel.findOne(query).lean();
// }
module.exports = iapTransactionLib;
