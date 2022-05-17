import {BrowserRouter, Route, Switch} from  'react-router-dom'

import React from "react"
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import Profile from './user/Profile'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import Orders from './admin/Orders'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import ManageProducts from './admin/ManageProducts'

const Routes = () => {
  return (
<BrowserRouter>
  <Switch>
  <Route path = '/' exact component={Home}/>
  <Route path = '/shop' exact component={Shop}/>
  <Route path = '/signin' exact component={Signin}/>
  <Route path = '/signup' exact component={Signup}/>
  <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
  <PrivateRoute path="/profile/:userId" exact component={Profile}/>
  <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
  <AdminRoute path="/create/category" exact component={AddCategory}/>
  <AdminRoute path="/create/product" exact component={AddProduct}/>
  <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
  <AdminRoute path="/admin/orders" exact component={Orders}/>
  <AdminRoute path="/admin/products" exact component={ManageProducts}/>
  <Route path = '/product/:productId' exact component={Product}/>
  <Route path = '/cart' exact component={Cart}/>
  </Switch>
</BrowserRouter>
);
}

export default Routes;
