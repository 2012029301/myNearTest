let gulp = require('gulp')
let moment = require('moment')
let del = require('del')
let zip = require('gulp-zip')
let webpack = require('webpack')
let {exec} = require('child_process')

let config = require('./webpack.prod.config')

let zipName = `web-${moment().format('MMDD-HHmm')}.zip`
let mobileZipName = `mobile-${moment().format('MMDD-HHmm')}.zip`

gulp.task('clean', (callback) => {
  del(['dist']).then(() => callback())
})

gulp.task('build', (callback) => {
  config.entry[0] = './src/index-attract.tsx'
  let compiler = webpack(config)
  compiler.run(() => {
    callback()
  })
})

function getZipTask(taskName, src, dist, zipName) {
  return gulp.task(taskName, (callback) => {
    gulp.src(src)
      .pipe(zip(zipName))
      .pipe(gulp.dest(dist))
      .on('finish', () => {
        callback()
      })
  })
}

getZipTask('zip-web', './dist/**', './build', zipName)
getZipTask('zip-mobile', './dist/**', './build', mobileZipName)

function execute(cmd, callback) {
  exec(cmd, (error) => {
    if (error) {
      callback(error)
    } else {
      callback()
    }
  })
}

gulp.task('copy-web-config', (callback) => {
  if (process.env.VERCEL_ENV == 'production') {
    execute(`cp src/core/config-prod.ts src/core/config.ts`, callback)
  }
  if (process.env.VERCEL_ENV == 'preview') {
    execute(`cp src/core/config-test.ts src/core/config.ts`, callback)
  }
})

gulp.task('reset-web-config-file', (callback) => {
  execute(`git checkout src/core/config.ts`, callback)
})

gulp.task('web', gulp.series('clean', 'copy-web-config', 'build', 'reset-web-config-file'))
