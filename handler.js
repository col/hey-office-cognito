'use strict';

const util = require('util');

function inspect(obj) {
  return util.inspect(obj, false, null);
}

function htmlTemplate(bodyContent) {
    return "<!DOCTYPE html>" +
    "<html xmlns=\"http://www.w3.org/1999/xhtml\">" +
    "<head>" +
    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
    "</head>" +
    "<body>" + bodyContent + "</body>" +
    "</html>";
}

module.exports.custom_messages = (event, context) => {
  console.log("Event = " + inspect(event));
  var baseUrl = process.env.BASE_URL;
  var username = event.userName;
  var code = event.request.codeParameter;
  if(event.userPoolId === process.env.COGNITO_USER_POOL_ID) {
      if(event.triggerSource === "CustomMessage_SignUp") {
          event.response.emailSubject = "Welcome to the Hey Office";
          event.response.emailMessage = htmlTemplate(
            " Thank you for signing up. <br/>" +
            " Your verification code is "+code+". <br/>" +
            " <a href=\""+baseUrl+"/confirm_registration?code="+code+"&username="+username+"\">Confirm Link</a> <br/>"
          );
      }
      else if(event.triggerSource === "CustomMessage_ForgotPassword") {
          event.response.emailSubject = "Hey Office - Reset Password";
          event.response.emailMessage = htmlTemplate(
            " Your password reset verification code is "+code+". <br/>" +
            " You can also try clicking the link below: <br/>" +
            " <a href=\""+baseUrl+"/confirm_forgot_password?code="+code+"&username="+username+"\">Reset Password</a> <br/>"
          );
      }
  }
  context.done(null, event);
};
