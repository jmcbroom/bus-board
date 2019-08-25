let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  console.log(`Getting scooters for Lime`);
  let url = `http://lime.bike/api/partners/v1/gbfs/detroit/free_bike_status.json`

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