let nodePath = require('path')
let fs = require('fs')
let json5 = require('json5')

let utils = require('./fileUtil')

let path = nodePath.join(__dirname, './language.i18n')

let content = utils.getFileContent(path)

let parts = content.split('\r\n')

let zh = {}
let en = {}
let key = null
let currentIndex = 0
let ns = ''
let isZh = false

parts.forEach(part => {
  if (!part) {
    return
  }
  if (part.match(/#\w+:/)) {
    currentIndex = 0
    ns = part.match(/#(\w+):/)[1]
    isZh = true
  } else if (isZh) {
    let zhAndKey = part.match(/(.*) \((.*)/)
    if (!zhAndKey) {
      console.log(1)
    }
    let localKey = zhAndKey[2].substring(0, zhAndKey[2].length - 1)
    key = ns + '.' + localKey
    zh[key] = zhAndKey[1]
    isZh = false
  } else {
    en[key] = part
    isZh = true
  }
})

fs.writeFileSync(nodePath.join(__dirname, '../src/i18n/zh.ts'), 'export default ' + json5.stringify(zh, {space: 2, quote: '"'}))
fs.writeFileSync(nodePath.join(__dirname, '../src/i18n/en.ts'), 'export default ' + json5.stringify(en, {space: 2, quote: '"'}))
