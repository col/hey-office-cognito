'use strict';

const util = require('util')

function inspect(obj) {
  return util.inspect(obj, false, null)
}

module.exports.trigger = (event, context, callback) => {
  console.log("Cognito Sync Trigger");
  console.log("Event = " + inspect(event));

  const response = {
    statusCode: 200,
    body: ""
  };
  callback(null, response);
};
