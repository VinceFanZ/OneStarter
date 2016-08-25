import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
// views must async load
// Auth
import InitPassword from 'react-router!views/Auth/InitPassword'
import ConfirmPassword from 'react-router!views/Auth/ConfirmPassword'

export default (
  <Route component={CoreLayout} path="/">
    <IndexRoute component={InitPassword} title="设置交易密码" />
    <Route component={InitPassword} path="/auth/initPwd" title="设置交易密码" />
    <Route component={ConfirmPassword} path="/auth/confirmPwd" title="确认交易密码" />
  </Route>
)
