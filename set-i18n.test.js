const setI18n = require('./set-i18n.js');

const READ_VIEW = `Read Vertical
Text
color #323232
fontFamily SlatePro
fontSize 20
fontWeight 600
text Assignment:

Name Text
text <name gets a default value

CaptureText
placeholder hi`;

const READ_VIEW_TRANSLATIONS = {
  en: {
    'Read/Name/text <name gets a default value': 'gets a default value',
    'Read/Text/text Assignment:': 'Assignment:',
    'CaptureText/placeholder hi:': 'hi',
  },
  es: {
    'Read/Name/text <name gets a default value': 'tiene un valor por defecto',
    'Read/Text/text Assignment:': 'Tarea:',
    'CaptureText/placeholder hi:': 'hola',
  },
  enIE: {
    'Read/Name/text <name gets a default value': 'has a default value',
    'Read/Text/text Assignment:': 'Assignment:',
    'CaptureText/placeholder hi:': 'hey',
  },
};

const READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS = `Read Vertical
Text
color #323232
fontFamily SlatePro
fontSize 20
fontWeight 600
text Assignment:
when <es
text Tarea:`;

const READ_VIEW_TRANSLATIONS_THAT_ALREADY_HAD_TRANSLATIONS = {
  en: {
    'Text/text Assignment:': 'Assignment:',
  },
  es: {
    'Text/text Assignment:': 'Tarea:',
  },
  enIE: {
    'Text/text Assignment:': 'Thing to do:',
  },
};

test('#setI18n', () => {
  expect(
    setI18n({
      defaultLanguage: 'en',
      source: READ_VIEW,
      translations: READ_VIEW_TRANSLATIONS,
      view: 'Read',
    })
  ).toMatchSnapshot();
  expect(
    setI18n({
      defaultLanguage: 'en',
      source: READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS,
      translations: READ_VIEW_TRANSLATIONS_THAT_ALREADY_HAD_TRANSLATIONS,
      view: 'Read',
    })
  ).toMatchSnapshot();
});
