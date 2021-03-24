let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  let url = `https://myddotbus.com/bustime/api/v3/getpatterns?key=${process.env.DDOT_KEY}&format=json&rt=${event.queryStringParameters.rt}`

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