#!/usr/bin/env node

const glob = require('fast-glob')
const fs = require('fs')
const fse = require('enfsensure')
const path = require('path')
const getI18n = require('./get-i18n.js')
const setI18n = require('./set-i18n.js')

async function get({ defaultLanguage, translationsRoot, viewsRoot }) {
  const list = await glob([path.join(viewsRoot, '**', '*.view')], {
    bashNative: ['linux'],
  })

  let i18n = {}

  list.forEach(file => {
    const viewI18n = getI18n({
      defaultLanguage,
      source: fs.readFileSync(file, 'utf-8'),
      view: path.basename(file, '.view'),
    })

    Object.keys(viewI18n).forEach(lang => {
      if (i18n[lang]) {
        i18n[lang] = Object.assign(i18n[lang], viewI18n[lang])
      } else {
        i18n[lang] = viewI18n[lang]
      }
    })
  })

  fse.ensureDirSync(translationsRoot)

  Object.keys(i18n).forEach(lang => {
    fs.writeFileSync(
      path.join(translationsRoot, `${lang}.json`),
      JSON.stringify(i18n[lang], null, ' '),
      'utf-8'
    )
  })
}

async function set({ defaultLanguage, translationsRoot, viewsRoot }) {
  const list = await glob([path.join(viewsRoot, '**', '*.view')], {
    bashNative: ['linux'],
  })

  const translationsFiles = await glob(
    [path.join(translationsRoot, '*.json')],
    {
      bashNative: ['linux'],
    }
  )
  const translations = {}
  translationsFiles.forEach(file => {
    translations[path.basename(file, '.json')] = JSON.parse(
      fs.readFileSync(file, 'utf-8')
    )
  })

  list.forEach(file => {
    const next = setI18n({
      defaultLanguage,
      source: fs.readFileSync(file, 'utf-8'),
      translations,
      view: path.basename(file, '.view'),
    })

    fs.writeFileSync(file, next, 'utf-8')
  })
}

switch (process.argv[2]) {
  case 'get':
    get({
      defaultLanguage: process.argv[3] || 'en',
      translationsRoot: process.argv[4] || 'translations',
      viewsRoot: process.argv[5] || 'src',
    })
    break

  case 'set':
    set({
      defaultLanguage: process.argv[3] || 'en',
      translationsRoot: process.argv[4] || 'translations',
      viewsRoot: process.argv[5] || 'src',
    })
    break

  case '-v':
  case '--version':
    console.log(`v${require('./package.json').version}`)
    break

  case 'help':
  default:
    console.log(`views-local usage:
  views-local get [translations root] [views root]
      gets I18n strings out of view files
      as JSON ready to be handed over to
      translators.
      [default language] defaults to 'en'.
      [translations root] defaults to './translations'.
      [views root] defaults to './src'.

  views-local set [translations root] [views root] 
      updates the view files with the
      I18n strings in JSON files
      provided by translators.
      [default language] defaults to 'en'.
      [translations root] defaults to './translations'.
      [views root] defaults to './src'.

  views-local version
      prints out the current version

  views-local help
      prints this message
`)
    break
}
