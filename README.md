# Alexa Workshop for Meet IT @HHN 2017

## Requirements

- node.js (6.10)
- npm
- text-editor
- Amazon Developer Account
- AWS Account
- Basic JavaScript-Skills
- Github-Account


## Step 1: Get a simple skill working

To start lean and simple, please clone our repo and checkout our branch: 1-Hello-World. 

````
git clone git@github.com:Kaufland/meet-it-alexa.git
cd meet-it-alexa
git checkout 1-Hello-World

````

Now go to console inside meet-it-alexa directory and run:

```
npm install
```

The dependencies from package.json are installed into a node_modules directory. Currently needed is only one dependency, `"alexa-sdk": "^1.0.9"` but the rest is coming soon.

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

---

## Step 2: Get BDD involved

To use BDD on Alexa-Projects we use [alexa-conversation](https://www.npmjs.com/package/alexa-conversation), a mocha-plugin from [expedia.com](https://techblog.expedia.com/2017/02/13/conversational-integration-tests-for-your-alexa-skills-nodejs/). To get this up and running, first install it on your project (In our Branch: 2-Hello-World-BDD this is already done):

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

On console in the project-directory now you can run `mocha` and the local tests are executed.

````
➜  meet-it-alexa git:(2-Hello-World-BDD) mocha


Warning: Application ID is not set
Warning: Application ID is not set
  Executing conversation: Test Conversation
    ✓ Finished executing conversation

  Conversation: Test Conversation
    User triggers: LaunchRequest 
      ✓ Alexa's plain text response should equal: Hello World!
    User triggers: HelloWorldIntent 
      ✓ Alexa's plain text response should equal: Hello World!


  3 passing (14ms)

````

Now you have a simple Skill and a working BDD test environment, have a good time coding. If you are interested in more complex skills and more complex testing, see next step.


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

If you take a look at the skill you'll see there is a more complex structure, using persistency, modules, i18n e.g. The skill would be a large part of our workshop.

Testing is set up and running, if you run mocha from commandline you should see:

````
➜  meet-it-alexa git:(3-Getting-Complex) mocha                          


Warning: Application ID is not set
  Executing conversation: Test Conversation
NewSession
Warning: Application ID is not set
YesIntent
    ✓ Finished executing conversation

  Conversation: Test Conversation
    User triggers: LaunchRequest 
      ✓ Alexa's plain text response should equal: Willkommen zum Alexa Workshop bei der Hochschule Heilbronn. Du hast das Zahlen-Ratespiel bisher 0 Mal gespielt. Möchtest du ein neues Spiel starten?
      ✓ Alexa's plain text reprompt should equal: Sag 'Ja', um ein neues Spiel zu starten oder 'Nein' zum Beenden.
    User triggers: YesIntent 
      ✓ Alexa's plain text response should equal: Schön! Sag eine Zahl, um mit dem Spiel zu starten.
      ✓ Alexa's plain text reprompt should equal: Sag eine Zahl zwischen null und 100.


  5 passing (271ms)
````



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
- [Parasaurolophus](https://de.wikipedia.org/wiki/Parasaurolophus) Just to see if you read this far... You did!


## Errata

If you have problems, find bugs or just want to leave feedback, please refer to the [issues section](https://github.com/Kaufland/meet-it-alexa/issues) of this repo or write us a line. We hope our information is useful, so tell us if not.

Have a lot of fun!

Have a lot of fun!


