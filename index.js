// Based on Amazons Node.js sample skill HighLow, https://github.com/alexa/skill-sample-nodejs-highlowgame/blob/master/src/index.js

'use strict';

const Alexa = require('alexa-sdk');
const I18n = require('./modules/i18n/i18n').I18n;

const appId = ''; // TODO

const states = {
    GUESSMODE: '_GUESSMODE', // User is trying to guess the number.
    STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the game.
};

let i18n = new I18n();

exports.handler = function (event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.dynamoDBTableName = 'high-low-game';
    alexa.registerHandlers(newSessionHandlers, guessModeHandlers, startGameHandlers, guessAttemptHandlers);
    alexa.execute();
};

let newSessionHandlers = {
    'NewSession': function () {
        console.log('NewSession');
        if (Object.keys(this.attributes).length === 0) {
            this.attributes['gamesPlayed'] = 0;
        }
        this.handler.state = states.STARTMODE;
        this.emit(':ask',
            i18n.t('WELCOME', this.attributes['gamesPlayed'].toString()),
            i18n.t('WELCOME_REPROMPT'));
    },

    'AMAZON.StopIntent': function () {
        console.log('StopIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'AMAZON.CancelIntent': function () {
        console.log('CancelIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'SessionEndedRequest': function () {
        console.log('SessionEndedRequest');
        this.emit(':tell', i18n.t('BYE'));
    }
};

let startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NewSession': function () {
        console.log('STARTMODE NewSession');
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },

    'AMAZON.HelpIntent': function () {
        console.log('STARTMODE => HelpIntent');
        let message = i18n.t('STARTMODE_HELP');
        this.emit(':ask', message, message);
    },

    'YesIntent': function () {
        console.log('YesIntent');
        this.attributes['guessNumber'] = Math.floor(Math.random() * 100);
        this.handler.state = states.GUESSMODE;
        this.emit(':ask',
            i18n.t('SAY_NUMBER_TO_START'),
            i18n.t('SAY_NUMBER_TO_START_REPROMT'));
    },

    'NoIntent': function () {
        console.log('NoIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'AMAZON.StopIntent': function () {
        console.log('StopIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'AMAZON.CancelIntent': function () {
        console.log('CancelIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'SessionEndedRequest': function () {
        console.log('SessionEndedRequest');
        this.emit(':tell', i18n.t('BYE'));
    },

    'Unhandled': function () {
        console.log('STARTMODE => unhandled');
        this.emit(':ask',
            i18n.t('STARTMODE_UNHANDLED'),
            i18n.t('STARTMODE_UNHANDLED'));
    }
});

let guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {
    'NewSession': function () {
        console.log('GUESSMODE NewSession');

        this.handler.state = '';
        this.emitWithState('NewSession');
        // Equivalent to:
        // this.emit('NewSession');
    },

    'NumberGuessIntent': function () {
        let guessNum = parseInt(this.event.request.intent.slots.number.value);
        let targetNum = this.attributes['guessNumber'];
        console.log(`User guessed: ${guessNum}`);

        if (guessNum > targetNum) {
            this.emit('TooHigh', guessNum);
        } else if (guessNum < targetNum) {
            this.emit('TooLow', guessNum);
        } else if (guessNum === targetNum) {
            // With a callback, use the arrow function to preserve the correct 'this' context
            this.emit('JustRight', () => {
                this.emit(':ask',
                    i18n.t('CORRECT_ANSWER', guessNum.toString()),
                    i18n.t('CORRECT_ANSWER_REPROMPT'));
            });
        } else {
            this.emit('NotANum');
        }
    },

    'AMAZON.HelpIntent': function () {
        console.log('GUESSMODE HelpIntent');
        this.emit(':ask',
            i18n.t('GUESSMODE_HELP'),
            i18n.t('GUESSMODE_HELP_REPROMPT'));
    },

    'AMAZON.StopIntent': function () {
        console.log('StopIntent');
        this.emit(':tell', i18n.t('BYE'));
    },

    'AMAZON.CancelIntent': function () {
        console.log('CancelIntent');
    },

    'SessionEndedRequest': function () {
        console.log('SessionEndedRequest');
        this.emit(':tell', i18n.t('BYE'));
    },

    'Unhandled': function () {
        console.log('GUESSMODE Unhandled');
        this.emit(':ask',
            i18n.t('NOT_A_NUMBER'),
            i18n.t('NOT_A_NUMBER_REPROMPT'));
    }
});

// These handlers are not bound to a state
let guessAttemptHandlers = {
    'TooHigh': function (val) {
        console.log('TooHigh');
        this.emit(':ask',
            i18n.t('TOO_HIGH', val.toString()),
            i18n.t('TOO_HIGH_REPROMPT'));
    },

    'TooLow': function (val) {
        console.log('TooLow');
        this.emit(':ask',
            i18n.t('TOO_LOW', val.toString()),
            i18n.t('TOO_LOW_REPROMPT'));
    },

    'JustRight': function (callback) {
        console.log('JustRight');
        this.handler.state = states.STARTMODE;
        this.attributes['gamesPlayed']++;
        callback();
    },

    'NotANum': function () {
        console.log('NotANum');
        this.emit(':ask',
            i18n.t('NOT_A_NUMBER'),
            i18n.t('NOT_A_NUMBER_REPROMPT'));
    }
};