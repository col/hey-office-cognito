'use strict';

const util = require('util')

function inspect(obj) {
  return util.inspect(obj, false, null)
}

module.exports.deep_link = (event, context, callback) => {
  console.log("Deep Link");
  console.log("Event = " + inspect(event));

  var command = event.pathParameters.command;
  var code = event.queryStringParameters.code;
  var username = event.queryStringParameters.username;
  const response = {
    statusCode: 302,
    headers: {
      'Location': 'heyoffice://'+command+'?code='+code+'&username='+username
    }
  };

  callback(null, response);
};
