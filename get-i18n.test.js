const getI18n = require('./get-i18n.js')

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
placeholder hi`

const READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS = `Read Vertical
Text
color #323232
fontFamily SlatePro
fontSize 20
fontWeight 600
text Assignment:
when <es
text Tarea:

NameLabel Text
text Name:
when <es
text Nombre:
when <deCH
text Namen:
`

test('#getI18n', () => {
  expect(getI18n('Read', READ_VIEW)).toMatchSnapshot()

  expect(
    getI18n('Read', READ_VIEW_THAT_ALREADY_HAS_TRANSLATIONS)
  ).toMatchSnapshot()
})
