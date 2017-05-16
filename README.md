# Alexa Workshop for Meet IT @HHN 2017

## Requirements

- node.js
- npm
- text-editor
- Amazon Developer Account
- AWS Account
- Basic JavaScript-Skills


## Step 1: Get a simple skill working

To start lean and simple, please checkout our branch: 1-Hello-World. Now go to console, cd into your checked out meet-it-alexa directory and run:

```
npm install
```

Now the dependencies from package.json are installed into a node_modules directory. Currently needed is only one dependency, `"alexa-sdk": "^1.0.9"` but the rest is coming soon.

If you look at index.js, you'll see your first simple Hello-World-Skill for Amazon Alexa. This can be a first and good starting point for your explorations. Have fun!

````
'use strict';
// Das Alexa-SDK wird geladen, siehe: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
var Alexa = require("alexa-sdk");

// Alexa wird initialisiert und ausgeführt
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Die Skill-Handler für ein simples »Hello World!«
var handlers = {
	// Wird beim Start des Skills aufgerufen, ruft den Handler für SayHello auf
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
    	// Ein möglicher Intent, ruft ebenfalls SayHello auf
        this.emit('SayHello')
    },
    'SayHello': function () {
    	// Auf diesen Intent zeigen die beiden anderen. Diese internen Aufrufe bieten z.B. eine Möglichkeit in verschiedenen Kontexten eine gleichartige Ausgabe zu erzeugen.
        this.emit(':tell', 'Hello World!');
    }
};

````

- 

## Step 2: Get BDD involved

To use BDD on Alexa-Projects we use [alexa-conversation](https://www.npmjs.com/package/alexa-conversation), a mocha-plugin from [expedia.com](https://techblog.expedia.com/2017/02/13/conversational-integration-tests-for-your-alexa-skills-nodejs/). To get this up and running, first install it on your project:

````
npm install --save-dev alexa-conversation
````

Now create a directory named test in your project-root. inside this folder create a file test_index.js and open it. (This is already done in branch: 2-Hello-World-BDD)

````
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
````

## Step 3: Build a more complex Skill...

With this more complex skill some new things appear: 
- In index.js there will be states for the application GUESSMODE and STARTMODE
- We'll use i18n to deal with translations
- We'll use persistence with DynamoDB: `alexa.dynamoDBTableName = 'high-low-game'`
- For local testing we need DynamoDB-Local and some environmental settings

### Run DynamoDB-Local

To run the DynamoDBLocal for local development with persistency, please install one of the jars found [here](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run it via: `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`


### Commandline Settings

To run the mocha tests with enabled alexa-persistency on commandline you need to expose some environment variables because the internally used aws-sdk cannot acces the ~/.aws/config` but the envvars:

```
export AWS_ACCESS_KEY_ID=your access key
export AWS_REGION = eu-west-1
export AWS_SECRET_ACCESS_KEY = your secret accesskey
```



## Further reading

- [Setting AWS environment variables](http://docs.aws.amazon.com/cli/latest/topic/config-vars.html#general-options) (This is important if you get missing-region config bugs. )
- [DynamoDBLocal](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
- [Amazon Developer Account](https://developer.amazon.com) (free)
- [AWS Account](https://aws.amazon.com) (credit card needed)
- [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
- [Alexa Doc](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill)
- [Kaufland on GitHub](https://github.com/kaufland)
- [Serverless Framework](https://serverless.com) (for easy deployment to AWS)
- [AWS - Installation](https://serverless.com/framework/docs/providers/aws/guide/installation)
- [AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys)
