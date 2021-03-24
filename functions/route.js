let rp = require('request-promise')

exports.handler = function(event, context, callback) {

  let urls = {
    ddot: `http://myddotbus.com/bustime/api/v3`,
    smart: `http://bustime.smartbus.org/bustime/api/v2`
  }

  let keys = {
    ddot: process.env.DDOT_KEY,
    smart: process.env.SMART_KEY
  }

  let { rt, provider } = event.queryStringParameters

  let url = `${urls[provider]}/getvehicles?key=${keys[provider]}&format=json&rt=${rt}`

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