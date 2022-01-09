import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Shop from './core/Shop';

import Dashboard from './user/Dashboard';
import AdminDashboard from './admin/auth/AdminDashboard';
import EmployeeValidation from './admin/auth/EmployeeValidation';
import SuperAdminDashboard from './superAdmin/SuperAdminDashboard';
import ValidationFournisseur from "./superAdmin/ValidationFournisseur"
import Menu from './core/Menu';
import ChoseLogin from './ChoseLogin'

// **************** LOGIN FROM USER ***********************
import Signin from './user/Signin';
import Signup from './user/Signup';

// **************** LOGIN FROM SUPER ADMIN ***********************
import SigninSuperAdmin from "./superAdmin/Signin"
import SignupSuperAdmin from "./superAdmin/Signup"

// **************** LOGIN FROM ADMIN ***********************
import SigninAdmin from "./admin/auth/Signin"
import SignupAdmin from "./admin/auth/Signup"

// **************** LOGIN FROM FOURNISSEUR ***********************
import SigninFournisseur from "./fournisseur/Signin"
import SignupFournisseur from "./fournisseur/Signup"
import FournisseurRoute from "./auth/FournisseurRoute"
import DashboardFournisseur from "./fournisseur/Dashboard"
import FruitDashboard  from "./fournisseur/fruit/FruitDashboard"
import VegetableDashboard from './fournisseur/vegetable/VegetableDashboard';

// **************** LOGIN FROM EMPLOYEE ***********************
import SigninEmployee from "./employee/Signin"
import SignupEmployee from "./employee/Signup"

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import DetailOrder from './admin/order/DetailOrder'
import SuperAdminRouter from './auth/SuperAdminRouter'

// *****************PART: ADMIN ********************
import GestionCategory from './admin/category/GestionCategory'
import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import GestionProduct from './admin/product/GestionProduct'
import ListOrders from './admin/order/ListOrders'
import AddAdsence from "./admin/adsence/AddAdsence"
import Product from './core/Product'
import ValidationSeller from './core/ValidationSeller'
import ValidationAdmin from './core/ValidationAdmin'

import Cart from './core/Cart'

const Routes = () => {
    return (
        <BrowserRouter>
           <Menu />
            <Switch>
                <PrivateRoute path='/' exact component={Home} />
                <PrivateRoute path='/shop' exact component={Shop} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />

                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/gestion' exact component={GestionCategory} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/admin/order' exact component={ListOrders} />
                <AdminRoute path='/admin/validation_seller' exact component={ValidationSeller} />
                <AdminRoute path='/admin/adsence' exact component={AddAdsence} />
                <AdminRoute path='/admin/product/create' exact component={AddProduct} />
                <AdminRoute path='/admin/product/gestion' exact component={GestionProduct} />
                <AdminRoute path='/admin/validation_employee' exact component={EmployeeValidation} />


                <SuperAdminRouter path='/super_admin/dashboard' exact component={SuperAdminDashboard} />
                <SuperAdminRouter path='/super_admin/validation_admin' exact component={ValidationAdmin} />
                <SuperAdminRouter path='/super_admin/validation-fournisseur' exact component={ValidationFournisseur} />

                <FournisseurRoute path="/fournisseur/dashboard" exact component={DashboardFournisseur} />
                <FournisseurRoute path="/fournisseur/dashboard/fruit" exact component={FruitDashboard} />
                <FournisseurRoute path="/fournisseur/dashboard/vegetable" exact component={VegetableDashboard} />

                <Route path='/chose' exact component={ChoseLogin}/>
                {/* ******** Route Login with User *************** */}
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                
                {/* ******** Route Login with Super Admin *************** */}
                <Route path='/super-admin/signin' exact component={SigninSuperAdmin}/>
                <Route path='/super-admin/signup' exact component={SignupSuperAdmin}/>

                {/* ******** Route Login with Admin *************** */}  
                <Route path='/admin/signin' exact component={SigninAdmin}/>
                <Route path='/admin/signup' exact component={SignupAdmin}/>

                {/* ******** Route Login with Fournisseur *************** */}  
                <Route path='/fournisseur/signin' exact component={SigninFournisseur}/>
                <Route path='/fournisseur/signup' exact component={SignupFournisseur}/>

                {/* ******** Route Login with Employee *************** */}  
                <Route path='/employee/signin' exact component={SigninEmployee}/>
                <Route path='/employee/signup' exact component={SignupEmployee}/>

                <Route path='/cart' exact component={Cart} />
                <Route path='/product/:id' exact component={Product} />
                <Route path='/detail-order/:id' exact component={DetailOrder} />
            </Switch>
        
        </BrowserRouter>
    )
}

export default Routes
