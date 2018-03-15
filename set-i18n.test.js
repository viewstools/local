const setI18n = require('./set-i18n.js')

const READ_VIEW = `Read Vertical
Text
color #323232
fontFamily SlatePro
fontSize 20
fontWeight 600
text Assignment:

Name Text
text <name sets a default value

CaptureText
placeholder hi`

const READ_VIEW_TRANSLATIONS = {
  es: {
    'Read/Name/text <name gets a default value': 'tiene un valor por defecto',
    'Read/Text/text Assignment:': 'Tarea:',
    // TODO capture
  },
  // TODO test enIE
}

const READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS = `Read Vertical
Text
color #323232
fontFamily SlatePro
fontSize 20
fontWeight 600
text Assignment:
when <es
text Tarea:`

test('#setI18n', () => {
  expect(
    setI18n({
      source: READ_VIEW,
      translations: READ_VIEW_TRANSLATIONS,
      view: 'Read',
    })
  ).toMatchSnapshot()

  // expect(
  //   setI18n('Read', READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS)
  // ).toMatchSnapshot()
})
