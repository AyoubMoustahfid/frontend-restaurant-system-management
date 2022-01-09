import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from './../auth/helpers'

import logo from './../assets/icons/logo-food.png'

import { useSelector } from 'react-redux'

import toastr from 'toastr';
import "toastr/build/toastr.css";

import {API_URL} from './../config'

import "./../style.css"

const isActive = (history, path) => {

    if(history.location.pathname === path) {
        return { color: '#20c997', fontWeight: '900', borderBottom: '3px solid #20c997'}
    }
    else{
        return { color: '#fff' }
    }

}


const Menu = (props) => {

    let countItem = useSelector(state => state.cart.count)

    const signout = () => {

        fetch(`${API_URL}/auth/signout`)
          .then(() => {

            toastr.info('User SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/signin')

          })
          .catch()

    }

    const signoutSuperAdmin = () => {

        fetch(`${API_URL}/super-admin/signout`)
          .then(() => {

            toastr.info('Super Admin SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/chose')

          })
          .catch()

    }

    const signoutAdmin = () => {

        fetch(`${API_URL}/admin/signout`)
          .then(() => {

            toastr.info('Admin SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/chose')

          })
          .catch()

    }
    
    const signoutFournisseur = () => {

        fetch(`${API_URL}/fournisseur/signout`)
          .then(() => {

            toastr.info('Fournisseur SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/chose')

          })
          .catch()

    }
    
    const signoutEmployee = () => {

        fetch(`${API_URL}/employeer/signout`)
          .then(() => {

            toastr.info('Employeer SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/chose')

          })
          .catch()

    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'black'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" width="60px" height="50px"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
   
                        <Fragment> 
                            <li className="nav-item active">
                                <Link style={isActive(props.history, '/')} className="nav-link" to="/">Home</Link>
                            </li>
        
                            <li className="nav-item active">
                                <Link style={isActive(props.history, '/shop')} className="nav-link" to="/shop">Shop </Link>
                            </li>
                         
                            
                            {isAuthenticated() && isAuthenticated().user.role === 'ADMIN' && (
                                
                                <li className="nav-item active">
                                    <Link 
                                        style={isActive(props.history, '/admin/dashboard')} 
                                        className="nav-link" 
                                        to={`${isAuthenticated() && isAuthenticated().user.role === 'ADMIN' ? '/admin' : ''}/dashboard`}
                                        >
                                            Dashboard
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 'SUPER_ADMIN' && (
                                <li className="nav-item active">
                                    <Link 
                                        style={isActive(props.history, '/super_admin/dashboard')} 
                                        className="nav-link" 
                                        to={`${isAuthenticated() && isAuthenticated().user.role === 'SUPER_ADMIN' ? '/super_admin' : ''}/dashboard`}
                                        >
                                            Dashboard
                                    </Link>
                                </li>
                                
                            )}

                            {isAuthenticated() && isAuthenticated().user.role === 'FOURNISSEUR' && (
                                <li className="nav-item active">
                                    <Link 
                                        style={isActive(props.history, '/super_admin/dashboard')} 
                                        className="nav-link" 
                                        to={`${isAuthenticated() && isAuthenticated().user.role === 'FOURNISSEUR' ? '/fournisseur' : ''}/dashboard`}
                                        >
                                            Dashboard
                                    </Link>
                                </li>
                                
                            )}
                    
                        </Fragment> 
                    
                        </ul>
                        <ul className="d-flex mb-0 point">
        
                        { !isAuthenticated()  && (
                            
                                <Fragment>
                                    
                                    <li className="nav-item" id="list-point">
                                        <Link style={isActive(props.history, '/signin')} 
                                                className="nav-link "
                                                to="/signin">Connexion
                                                
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item" id="list-point">
                                        <Link style={isActive(props.history, '/signup')} className="nav-link" to="/signup">Register</Link>
                                    </li>
                                </Fragment>
                        ) }
        
                            {isAuthenticated() && (
                                <li className="nav-item mr-3 active">
                                        <Link  style={isActive(props.history, '/cart')} type="button" class="nav-link position-relative"  to="/cart">
                                            Cart
                                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{backgroundColor:'rgb(32, 201, 151)'}}>
                                            { countItem }
                                            </span>
                                        </Link>
                                        
                                    </li>
                            )}
                            {isAuthenticated() &&  isAuthenticated().user.role === "USER" && (
                                <Fragment>
                                    
                                    <li className="nav-item mx-3 active">
                                        <span className="nav-link btn btn-success" style={{ cursor: 'pointer', color: 'white' }} onClick={signout}>SignOut</span>
                                    </li>
                                </Fragment>
                            ) }

                            {isAuthenticated() &&  (isAuthenticated().user.role === "SUPER_ADMIN" || isAuthenticated().user.role === "ADMIN" || isAuthenticated().user.role === "FOURNISSEUR" || isAuthenticated().user.role === "EMPLOYEER")  && (
                                <Fragment>
                                    
                                    <li className="nav-item mx-3">
                                        <span className="nav-link btn btn-success" 
                                            style={{ cursor: 'pointer', color: 'white' }} 
                                            onClick={isAuthenticated() && isAuthenticated().user.role === "SUPER_ADMIN" ? signoutSuperAdmin : 
                                                    isAuthenticated() && isAuthenticated().user.role === "ADMIN" ? signoutAdmin : 
                                                    isAuthenticated() && isAuthenticated().user.role === "FOURNISSEUR" ? signoutFournisseur :
                                                    isAuthenticated() && isAuthenticated().user.role === "EMPLOYEER" ? signoutEmployee : null
                                                    }
                                            >SignOut</span>
                                    </li>
                                </Fragment>
                            ) }

                           
                        </ul>
                        
                    </div>
                </div>
            </nav> 

        </div>
    )
}

export default withRouter(Menu) 
