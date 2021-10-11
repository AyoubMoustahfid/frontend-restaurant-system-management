import React from 'react'

import { Link } from 'react-router-dom'


import {img_admin_login} from "./../../Constants/images"
import { isAuthenticated } from '../../auth/helpers'

function Layout({children, height, background}) {

    const { user: {role } } = isAuthenticated()
    return (
        <div className="container-fluid" style={{height: height}}>
                <div className="row">
                    <div className="col-md-2 px-0" style={{minHeight: height}}>
                        <div className="card" style={{height: '100%', maxHeight: '100%', border: "none"}}>
                            <div className="card-body" style={{backgroundColor: 'black', color: '#eaedf2'}}>
                                <h2 className="card-header">
                                    <img src={img_admin_login} width="50px" height="50px" style={{borderRadius: '5px'}}/> 
                                    <span className="mx-2" style={{fontSize: '1.4rem'}}>{role === "SUPER_ADMIN" ? 'Super Admin' : 'User'}</span>
                                </h2>
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/category/gestion"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Gestion category
                                        </Link>
                                    </li>
                                            
                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/admin/order"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            View Order
                                        </Link>
                                    </li>
            
                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/admin/product/create"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Create Product
                                        </Link>
                                    </li>

                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/admin/product/gestion"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Gestion Product
                                        </Link>
                                    </li>
            
                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                        <Link className="nav-link" to="/admin/validation_employee"
                                            style={{
                                                color: '#eaedf2',
                                                backgroundColor: 'black',
                                                border: '0.0625rem solid #4c5680'
                                            }}
                                        >
                                            Validation Employee
                                        </Link>
                                    </li>

                                    <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                                    <Link className="nav-link" to="/admin/dashboard"
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
                    <div className="col-md-10 py-4" style={{background: background}}>
                        {children}
                    </div>
                </div>
            </div>
       
    )
}

export default Layout
