const AWS = require('aws-sdk');
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY_ID, AWS_ROLE_ARN, AWS_FROM_EMAIL, AWS_FROM_EMAIL_RETURN_PATH, API_URL } = process.env;
const { getActivationEmailBody } = require("./activateAccountEmailBody");

// Configure aws config to run outside lambda
const sts = new AWS.STS({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
});

// Assume role to make aws sdk calls.
const getCrossAccountCredentials = async () => {
  return new Promise((resolve, reject) => {
    const timestamp = (new Date()).getTime();
    const params = {
      RoleArn: AWS_ROLE_ARN,
      RoleSessionName: `SNS-TRIBAL-LUDO-${timestamp}`
    };

    sts.assumeRole(params, (err, data) => {
      if (err) reject(err);
      else {
        resolve({
          region: 'ap-south-1',
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken,
        });
      }
    });
  });
}

const sendEmail = async (email, token) => {
  let link = `${API_URL}verify?id=${token}`;
  console.log("Link is ", link);
  let message = getActivationEmailBody(link);

  try {
    let credentials = await getCrossAccountCredentials();
    AWS.config.update(credentials);
    const SES = new AWS.SES(credentials);

    let emailParam = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message
          },
          Text: {
            Charset: 'UTF-8',
            Data: message
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Tribal Ludo: Email Verification'
        }
      },
      ReturnPath: AWS_FROM_EMAIL,
      Source: AWS_FROM_EMAIL_RETURN_PATH
    }

    let res = email ? await SES.sendEmail(emailParam).promise() : false;
    console.log("Email response ", res)
    return true;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  sendEmail,
  getCrossAccountCredentials
}
