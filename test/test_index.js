const conversation = require('alexa-conversation');
const app = require('../index.js'); // your Alexa skill's main file. `app.handle` needs to exist

const I18n = require('../modules/i18n/i18n').I18n;
let i18n = new I18n();

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
	.plainResponse.shouldEqual(i18n.t('WELCOME', '0'), i18n.t('WELCOME_REPROMPT'))
	.userSays('YesIntent')
	.plainResponse.shouldEqual(i18n.t('SAY_NUMBER_TO_START'), i18n.t('SAY_NUMBER_TO_START_REPROMT'))
.end();
