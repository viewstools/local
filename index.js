const glob = require('fast-glob')
const flatten = require('flatten')
const fs = require('fs')
const path = require('path')
const uniq = require('uniq')
const getI18n = require('./get-i18n.js')

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
