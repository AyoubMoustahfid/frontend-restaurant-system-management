import React from 'react'

import { Link } from 'react-router-dom'

import logo from './../assets/icons/logo-food.png'

import {img_superAdmin_login} from "./../Constants/images"
import { isAuthenticated } from '../auth/helpers'

function Layout({children}) {

    const { user: {role } } = isAuthenticated()
    return (
        <div className="container-fluid" style={{height: '92.2vh', maxHeight: '100vh'}}>
                <div className="row">
                    <div className="col-md-2 px-0" style={{height: '92.2vh', maxHeight: '100vh'}}>
                        <div className="card" style={{height: '100%', maxHeight: '100%', border: "none"}}>
                            <div className="card-body" style={{backgroundColor: 'black', color: '#eaedf2'}}>
                                <h2 className="card-header">
                                    <img src={img_superAdmin_login} width="50px" height="50px" style={{borderRadius: '5px'}}/> 
                                    <span className="mx-2" style={{fontSize: '1.4rem'}}>{role === "SUPER_ADMIN" ? 'Super Admin' : 'User'}</span>
                                </h2>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/super_admin/validation-fournisseur"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Validation Admin
                                        </Link>
                                    </li>
                                    
                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/super_admin/dashboard"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Profile
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 py-5" style={{background: '#f2f4f6'}}>
                        {children}
                    </div>
                </div>
            </div>
       
    )
}

export default Layout
