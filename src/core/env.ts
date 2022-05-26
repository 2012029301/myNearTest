import {pathPrefix} from './config'

export function isDev() {
  return process.env.NODE_ENV == 'development'
}

const version = '1.11'

function getPrefixPath(path) {
  if (path[0] == '/') {
    return pathPrefix + path
  }
  return pathPrefix + '/' + path
}

export {getPrefixPath, version}
