const conversation = require('alexa-conversation');
const app = require('../index.js'); // your Alexa skill's main file. `app.handle` needs to exist

const opts = { // those will be used to generate the requests to your skill
	name: 'Test Conversation',
	app: app,
	appId: 'amzn1.ask.skill.cee01027-f4c9-4b94-891f-fc314a47c3bf',
	fixSpaces: true,
	locale: 'de',
	region: 'eu-west-1'
	// Other optional parameters. See readme.md
};

// initialize the conversation
conversation(opts)
	.userSays('LaunchRequest')
		.plainResponse.shouldEqual('Hello World!')
	.userSays('HelloWorldIntent')
		.plainResponse.shouldEqual('Hello World!')
	.end();
	