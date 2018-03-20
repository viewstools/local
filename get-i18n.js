const isText = line => /^(text|placeholder) /.test(line)

const withoutSlot = line => line.replace(/^(\<.+?)\s/, '')

const isBlock = line => /^[A-Z]/.test(line)
const getBlock = line => line.split(' ')[0]
const getText = line => line.replace(/^(text|placeholder) /, '')

function getI18n(view, rtext) {
  const text = rtext.replace(/\r\n/g, '\n')
  const lines = text.split('\n').map(line => line.trim())

  // TODO refactor so that we can extract other languages
  const obj = {}

  let currentBlock = null

  lines.forEach(line => {
    if (isBlock(line)) {
      currentBlock = line;
    }

    if (isText(line)) {
      const text = getText(line)

      // TODO add path to translation View/Block Name or Type/line
      obj[`${view} / ${currentBlock} / ${line}`] = withoutSlot(text)
    }
  })

  return obj
}
module.exports = getI18n
