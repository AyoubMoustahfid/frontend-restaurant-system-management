import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import {img_admin_login} from './../../Constants/images'

import { isAuthenticated } from '../../auth/helpers'

import Layout from "./Layout"

function AdminDashboard() {

    const { user: { name, email, role } } = isAuthenticated()


    const adminInfo = () => {

        return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">User Information :</h2>
                    <div className="row py-5">
                        <div className="col-4 d-flex justify-content-center">
                            <img src={img_admin_login} width="250px" height="250px"  style={{boxShadow: "rgb(26 77 160 / 12%) 0px 30px 40px"}} />
                        </div>
                        <div className="col-8">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name :</label>
                                    <input type="email" className="form-control" value={name} disabled/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email address :</label>
                                    <input type="email" className="form-control" value={email} disabled/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Role :</label>
                                    <input type="email" className="form-control" value={role ? 'Admin' : 'User'} disabled/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                   
                </div>
            </div>
        </Fragment>
        )
    }


    const adminLinks = () => {

        return (
            <div className="card" style={{height: '100%', maxHeight: '100%', border: "none"}}>
                <div className="card-body" style={{backgroundColor: 'black', color: '#eaedf2'}}>
                    <h2 className="card-header">
                        <img src={img_admin_login} width="50px" height="45px"/> 
                        <span className="mx-2" style={{fontSize: '1.4rem'}}>Admin</span>
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
                            <Link className="nav-link" to="/admin/adsence"
                                style={{
                                    color: '#eaedf2',
                                    backgroundColor: 'black',
                                    border: '0.0625rem solid #4c5680'
                                }}
                            >
                                Create Adsence
                            </Link>
                        </li>

                        <li className="list-group-item" style={{border: '0.0625rem solid transparent', marginBottom: '.2rem', backgroundColor: 'black'}}>
                            <Link className="nav-link" to="/admin/validation_seller"
                                style={{
                                    color: '#eaedf2',
                                    backgroundColor: 'black',
                                    border: '0.0625rem solid #4c5680'
                                }}
                            >
                                Validation Seller
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }

    return (
        <Layout height='92.2vh'>
            {adminInfo()}
        </Layout>
    )
}

export default AdminDashboard
