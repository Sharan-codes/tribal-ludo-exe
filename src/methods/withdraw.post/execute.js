const global = require('../../global');
const restBase = require('../../base/restBase.class');
const utility = require("../../library/utilityLib/utility");
const mgUserLib = require('../../library/databaseLib/user.lib');
const axios = require("axios");
const { PAYOUTS_CLIENT_ID, PAYOUTS_CLIENT_SECRET } = process.env;

class withdrawAction extends restBase {

  async executeMethod() {
    try {

      const { userId, customerName, customerPhone, customerEmail, address1, amount, vpa } = this;
      console.log("USER DETAILS:")
      console.log("customerName : "+customerName)
      console.log("customerPhone : "+customerPhone)
      console.log("customerEmail : "+customerEmail)
      console.log("address : "+address1)
      console.log("vpa : "+vpa)
      console.log("amount : "+amount)

      let message;

      //Authenticate with the Cashfree system and obtain the authorization bearer token
      let authenticate = {
        method: 'post',
        url: 'https://payout-gamma.cashfree.com/payout/v1/authorize',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Secret': PAYOUTS_CLIENT_SECRET,
          'X-Client-Id': PAYOUTS_CLIENT_ID
        }
      };
      let authenticationResult = await axios(authenticate);
      console.log("\nAUTHENTICATION:");
      console.log(authenticationResult.data);

      if (authenticationResult.data.status != 'SUCCESS') {
        message = authenticationResult.data.message ? authenticationResult.data.message : "";
      } else {
        const token = authenticationResult.data.data.token;//token is valid for 10 min

        //Add a beneficiary
        const beneId = new Date().getTime();
        console.log("\nbeneId: "+beneId);
        const beneficiaryData = {
          beneId: beneId,
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address1: address1,
          vpa: vpa
        }
        let addBeneficiary = {
          method: 'post',
          url: 'https://payout-gamma.cashfree.com/payout/v1/addBeneficiary',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          data: beneficiaryData
        };
        let addBeneficiaryResult = await axios(addBeneficiary);
        console.log("\nADD BENEFICIARY:");
        console.log(addBeneficiaryResult.data);
  
        if (addBeneficiaryResult.data.status != 'SUCCESS') {
          message = addBeneficiaryResult.data.message ? addBeneficiaryResult.data.message : "";
        } else {
          //Request an amount transfer
          const transferId = new Date().getTime();
          console.log("\ntransferId: "+transferId);
          const transferData = {
            beneId: beneId,
            amount: amount,
            transferId: transferId,
            transferMode: 'upi'
          }

          let transferRequest = {
            method: 'post',
            url: 'https://payout-gamma.cashfree.com/payout/v1/requestTransfer',
            headers: {
              //'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            data: transferData
          };
          let transferResult = await axios(transferRequest);
          console.log("\nREQUEST FOR TRANSFER:");
          console.log(transferResult.data);
          message = transferResult.data.message ? transferResult.data.message : "";
        }
      }
      this.setResponse("SUCCESS");
      return {
        message: message ? message : ""
      };
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = withdrawAction;
