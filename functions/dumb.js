exports.handler = function(event, context, callback) {
      callback(null, {
        statusCode: 200,
        body: '{"bustime-response": {"error": "you"}}',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
}) }