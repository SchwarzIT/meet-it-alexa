'use strict';

const i18next = require('i18next');
const backend = require('i18next-sync-fs-backend');
const sprintf = require('i18next-sprintf-postprocessor');

class I18n {
	constructor(lng, fallbackLng) {
		i18next
			.use(backend)
			.use(sprintf)
			.init({
				overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
				lng: lng || 'de',
				fallbackLng: fallbackLng || 'en',
				initImmediate: false,
				backend: {
					loadPath: './modules/i18n/locales/{{lng}}/{{ns}}.json'
				}
			});
	}

	t() {
		return i18next.t.apply(i18next, arguments);
	}
}

module.exports.I18n = I18n;
