const glob = require('fast-glob')
const flatten = require('flatten')
const fs = require('fs')
const path = require('path')
const uniq = require('uniq')

const isBlock = line => /^[A-Z]/.test(line)
const isntProp = line => !/^props/.test(line) && !/^\</.test(line)
const isText = line => /^(text|placeholder) /.test(line)

const getBlock = line => line.split(' ')[0]
const getText = line => line.replace(/^(text|placeholder) /, '')

function getI18n(rtext) {
  const text = rtext.replace(/\r\n/g, '\n')
  const lines = text.split('\n').map(line => line.trim())
  return lines
    .filter(isText)
    .map(getText)
    .filter(isntProp)
}

module.exports = function(root) {
  glob([path.join(root, '**', '*.view')], {
    bashNative: ['linux'],
  }).then(list => {
    let i18n = {}

    uniq(
      flatten(list.map(file => getI18n(fs.readFileSync(file, 'utf-8')))).sort()
    ).forEach(text => {
      i18n[text] = text
    })

    console.log(JSON.stringify(i18n, null, '  '))
  })
}
