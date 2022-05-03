import {BrowserRouter, Route, Switch} from  'react-router-dom'

import React from "react"
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'

const Routes = () => {
  return (
<BrowserRouter>
  <Switch>
  <Route path = '/' exact component={Home}/>
  <Route path = '/signin' exact component={Signin}/>
  <Route path = '/signup' exact component={Signup}/>
  </Switch>
</BrowserRouter>
);
}

export default Routes;
