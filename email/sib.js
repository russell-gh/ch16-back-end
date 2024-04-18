//import sdk and set key
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications[`api-key`];
apiKey.apiKey = ``;

//initate the specific capability
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

function sendEmail(
  payload,
  sender = { name: "Russell", email: "test@tinsleymail.co.uk" },
  to
) {
  //the bit that matters
  sendSmtpEmail.subject = payload.subject;
  sendSmtpEmail.htmlContent = payload.content;
  sendSmtpEmail.sender = sender;
  sendSmtpEmail.to = to;

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

module.exports = { sendEmail };
