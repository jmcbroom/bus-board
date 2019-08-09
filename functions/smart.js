let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  console.log(`Getting times for stop ${event.queryStringParameters.stopId}`);
  let smartKey = `7UBBSGK5hjE3htqH8BhRzy7AU`
  let url = `http://bustime.smartbus.org/bustime/api/v2/getpredictions?key=${smartKey}&format=json&stpid=${event.queryStringParameters.stopId}`

  rp(url)
    .then(body => {
      callback(null, {
        statusCode: 200,
        body
      })
    })
}