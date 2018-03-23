const isText = line => /^(text|placeholder) /.test(line)

const withoutSlot = line => line.replace(/^(\<.+?)\s/, '')

const isBlock = line => /^[A-Z]/.test(line)
const getBlock = line => line.split(' ')[0]
const getText = line => line.replace(/^(text|placeholder) /, '')

const locales = require('i18n-locales')
const LOCAL_SCOPES = locales.map(item => item.replace(/-/g, ''))

function getI18n(view, rtext) {
  const text = rtext.replace(/\r\n/g, '\n')
  const lines = text.split('\n').map(line => line.trim())

  const obj = {};
  const defaultLanguage = {};
  let currentBlock = null
  let currentView = null
  const regexList = LOCAL_SCOPES.map(shortcode => new RegExp(`^when <${shortcode}`) );
  let isTranslation = null;
  let textKey;

  lines.forEach((line, index) => {
    if (isBlock(line)) {
      currentBlock = line;
    }
    if (isText(line)) {
      const text = getText(line)
      isTranslation = regexList.some(regex => regex.test(lines[index-1]));
      if(!isTranslation){
        textKey = line;
        defaultLanguage[`${view}/${currentBlock}/${textKey}`] = withoutSlot(text)
        obj[`default`] = defaultLanguage;
      } else {
        const langShortCode = lines[index-1].split('<')[1];
        if(!obj.hasOwnProperty(langShortCode)){
          obj[langShortCode] = {};
        }
        obj[langShortCode][`${view}/${currentBlock}/${textKey}`] = withoutSlot(text)
      }
    }
  })

  return obj
}
module.exports = getI18n
