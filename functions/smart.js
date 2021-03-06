let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  console.log(`Getting times for SMART bus stop ${event.queryStringParameters.stopId}`);
  let url = `http://bustime.smartbus.org/bustime/api/v2/getpredictions?key=${process.env.SMART_KEY}&format=json&stpid=${event.queryStringParameters.stopId}`

  rp(url)
    .then(body => {
      callback(null, {
        statusCode: 200,
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    })
}