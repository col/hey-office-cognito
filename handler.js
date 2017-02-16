'use strict';

const util = require('util');

function inspect(obj) {
  return util.inspect(obj, false, null);
}

module.exports.custom_messages = (event, context) => {
  console.log("Event = " + inspect(event));
  var baseUrl = process.env.BASE_URL;
  var username = event.userName;
  var code = event.request.codeParameter;
  if(event.userPoolId === process.env.COGNITO_USER_POOL_ID) {
      if(event.triggerSource === "CustomMessage_SignUp") {
          event.response.emailSubject = "Welcome to the Hey Office";
          event.response.emailMessage = "<!DOCTYPE html>" +
          "<html xmlns=\"http://www.w3.org/1999/xhtml\">" +
          "<head>" +
          "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
          "</head>" +
          "<body>" +
          " Thank you for signing up. <br/>" +
          " Your verification code is "+code+". <br/>" +
          " <a href=\""+baseUrl+"/confirm_registration?code="+code+"&username="+username+"\">Confirm Link</a> <br/>" +
          "</body>" +
          "</html>";
      }
  }
  context.done(null, event);
};
