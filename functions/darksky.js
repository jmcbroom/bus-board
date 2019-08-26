let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  console.log(`Getting weather for coordinates ${event.queryStringParameters.lon}, ${event.queryStringParameters.lat}`);

  let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${event.queryStringParameters.lat},${event.queryStringParameters.lon}`;

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