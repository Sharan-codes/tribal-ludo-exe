const global = require('../../global');
const restBase = require('../../base/restBase.class');
const utility = require("../../library/utilityLib/utility");
const mgUserLib = require('../../library/databaseLib/user.lib');
const axios = require("axios");
const { PAYMENT_GATEWAY_APP_ID, PAYMENT_GATEWAY_SECRET_KEY } = process.env;

class orderAction extends restBase {

  async executeMethod() {
    try {

      const { userId, customerName, customerPhone, customerEmail, orderAmount } = this;
      console.log("\nPAYMENT GATEWAY:");

      console.log("customerName : "+customerName)
      console.log("customerPhone : "+customerPhone)
      console.log("customerEmail : "+customerEmail)
      console.log("orderAmount : "+orderAmount)

      const params = {
        appId: PAYMENT_GATEWAY_APP_ID,
        secretKey: PAYMENT_GATEWAY_SECRET_KEY,
        orderId: new Date().getTime(),
        orderAmount: orderAmount,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        returnUrl: 'http://localhost:3000/',
        notifyUrl: 'http://localhost:3000/userNotify',
        paymentModes: 'upi,wallet'
      }

      var str = [];
      for (var key in params) {
           if (params.hasOwnProperty(key)) {
                 str.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))                  
                 //console.log(key + " -> " + params[key]);
           }
      }
      const data = str.join("&");
 
      let order = {
        method: 'post',
        url: 'https://test.cashfree.com/api/v1/order/create',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      let paymentLink, reason, orderResult;
      try {
        orderResult = await axios(order);
        console.log("\nORDER RESULT:");
        console.log(orderResult.data)

        paymentLink = orderResult.data.paymentLink ? orderResult.data.paymentLink : "";
      } catch (e) {
        console.log(e.response.data)
        reason = e.response.data.reason ? e.response.data.reason : "";
      }

      this.setResponse("SUCCESS");
      return {
        paymentLink: paymentLink ? paymentLink : "",
        reason: reason ? reason : ""
      };
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = orderAction;
