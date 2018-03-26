const locales = require('i18n-locales')

const LOCAL_SCOPES = locales.map(item => item.replace(/-/g, ''))
const isText = line => /^(text|placeholder) /.test(line)
const withoutSlot = line => line.replace(/^(\<.+?)\s/, '')
const isBlock = line => /^[A-Z]/.test(line)
const getBlock = line => line.split(' ')[0]
const getText = line => line.replace(/^(text|placeholder) /, '')

function getI18n({view, rtext, defaultLanguage = 'en'}) {
  const text = rtext.replace(/\r\n/g, '\n')
  const lines = text.split('\n').map(line => line.trim())

  const obj = {};
  const base = {};
  let currentBlock = null
  let currentView = null
  const regexList = LOCAL_SCOPES.map(shortcode => new RegExp(`^when <${shortcode}`) );
  let textKey;

  lines.forEach((line, index) => {
    if (isBlock(line)) {
      currentBlock = line;
      textKey = null;
    }
    if (isText(line)) {
      const text = getText(line)
      const isTranslation = regexList.some(regex => regex.test(lines[index-1]));

      if(isTranslation && textKey){
        const langShortCode = lines[index-1].split('<')[1];
        if(!obj.hasOwnProperty(langShortCode)){
          obj[langShortCode] = {};
        }
        obj[langShortCode][`${view}/${currentBlock}/${textKey}`] = withoutSlot(text)
      } else if(!isTranslation){
        textKey = line;
        base[`${view}/${currentBlock}/${textKey}`] = withoutSlot(text)
        return
      } 

    }
  })
  obj[defaultLanguage] = base;
  return obj
}
module.exports = getI18n
