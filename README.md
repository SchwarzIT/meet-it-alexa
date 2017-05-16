# Alexa Workshop for Meet IT @HHN 2017

## Requirements

- node.js
- npm
- text-editor
- Amazon Developer Account
- Basic JavaScript-Skills


## Step 1: Get a simple skill working

## Step 2: Get BDD involved

To use BDD on Alexa-Projects we use [alexa-conversation](https://www.npmjs.com/package/alexa-conversation), a mocha-plugin from [expedia.com](https://techblog.expedia.com/2017/02/13/conversational-integration-tests-for-your-alexa-skills-nodejs/). To get this up and running, first install it on your project:

````
npm install --save-dev alexa-conversation
````

Now create a directory named test in your project-root. inside this folder create a file test_index.js and open it.

````

````

## Commandline Settings

To run the mocha tests with enabled alexa-persistency on commandline you need to expose some environment variables because the internally used aws-sdk cannot acces the ~/.aws/config` but the envvars:

```
export AWS_ACCESS_KEY_ID=your access key
export AWS_REGION = eu-west-1
export AWS_SECRET_ACCESS_KEY = your secret accesskey
```

## Run DynamoDB-Local

To run the DynamoDBLocal for local development with persistency, please install one of the jars found [here](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run it via: `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

## Further reading

- [Setting AWS environment variables](http://docs.aws.amazon.com/cli/latest/topic/config-vars.html#general-options) (This is important if you get missing-region config bugs. )
- [DynamoDBLocal](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)


Step 3: Build a more complex Skill...

## Vortrag:

7 Blabla
  Begriffe
  Architektur, Unterstützte Runtimes für Lambda-Funktionen, SDK, Serverless
  Voraussetzungen

MS 15 Lambda Funktion
MS 15 Skill anlegen
MS 10 Hello World deployen
MS 10 Test (Alexa Conversion)

Skill erweitern
- Reprompt vorführen, z. B. WELCOME_REPROMPT
- HelpIntent vorführen
- Wo man Lambda-Logs sehen kann

Wo es den Code zum Herunterladen gibt


----
## Links

* [Amazon Developer Account](https://developer.amazon.com) (free)
* [AWS Account](https://aws.amazon.com) (credit card needed)
* [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
* [Alexa Doc](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill)
* [Kaufland on GitHub](https://github.com/kaufland)
* [Serverless Framework](https://serverless.com) (for easy deployment to AWS)
 * [AWS - Installation](https://serverless.com/framework/docs/providers/aws/guide/installation)
 * [AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys)
