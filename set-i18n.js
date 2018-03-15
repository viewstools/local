const isText = line => /^(text|placeholder) /.test(line)

const withoutSlot = line => line.replace(/^(\<.+?)\s/, '')

const isBlock = line => /^[A-Z]/.test(line)
const setBlock = line => line.split(' ')[0]
const setText = line => line.replace(/^(text|placeholder) /, '')

function setI18n({ source, view, translations }) {
  const text = source.replace(/\r\n/g, '\n')
  const lines = text.split('\n').map(line => line.trim())

  // // TODO refactor so that we can extract other languages
  // const obj = {}

  // let currentBlock = null

  // lines.forEach(line => {
  //   if (isBlock(line)) {
  //   }

  //   if (isText(line)) {
  //     const text = setText(line)

  //     // TODO add path to translation View/Block Name or Type/line
  //     obj[line] = withoutSlot(text)
  //   }
  // })

  return lines.join('\n')
}
module.exports = setI18n
