var uuid = require('uuid');

exports.handler = function(event, context) {
    var id = uuid.v4();
    console.log('Generated UUID', id);
    context.succeed(id);  // Echo back the first key value
};