const { reserveFile } = require('./fileUtil')
const path = require('path')
const tinify = require('tinify')

// 需要压缩png的图片文件夹路径
const imageDir = path.join(__dirname, '../src/assets')
// 调tinify库需要申请key 一个key每个月免费压缩500次  如果超出需要重新换个账号和key
tinify.key = '8494zbwqW6xkvqdrNlt0WrJ0YkmsZLyk'

const isPng = (filePath) => {
    const findPngReg = new RegExp(/\.png$/);
    if(typeof filePath != 'string') {
        throw Error()
    }
    return findPngReg.test(filePath)
}

/**
 * 调用tinify压缩单个png图片
 */
const compressPng = (filePath) => {
    if(!isPng(filePath)) {
        console.log('not Png, continue next')
        return
    }
    // 覆盖原文件
    tinify.fromFile(filePath).toFile(filePath)
    console.log('compressed', filePath)
}

reserveFile(imageDir, compressPng)
