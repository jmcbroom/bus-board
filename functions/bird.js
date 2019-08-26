let rp = require("request-promise");

exports.handler = function(event, context, callback) {
  console.log(`Getting scooters for Bird`);
  let url = `https://mds.bird.co/gbfs/detroit/free_bikes`;

  rp(url).then(body => {
    callback(null, {
      statusCode: 200,
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  });
};
