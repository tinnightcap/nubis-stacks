var child_process = require('child_process');

exports.handler = function(event, context) {

	// print out output of the received event
	console.log("REQUEST RECEIVED:\n", JSON.stringify(event));

	// since this is a vpc lambda function we need to export proxy variable
	var command = event.command;
	if (!command) {
		command = "./main"
	}

	var args = event.args;
	if (!args) {
		args = []
	}
	console.log(args)

	var proc = child_process.spawn(command, args,{ stdio: 'inherit' });

	proc.on('close', function(code) {
		if(code !== 0) {
			return context.done(new Error("Process exited with non-zero status code"));
		}

		context.done(null);
	});
}
