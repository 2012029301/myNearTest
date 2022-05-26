import React, { useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import classnames from 'classnames'

import { getPrefixPath } from '../core/env'

import Home from './home'


interface Props {

}

const Frameset: React.FC<Props> = function (this: null) {



  return (
    <div className={classnames('app')}>
      <Switch>
        <Route component={Home} path={getPrefixPath('/')} exact />
      </Switch>
    </div>
  )
}

export default Frameset
