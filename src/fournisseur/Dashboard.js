import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import {img_fournisseur_login} from './../Constants/images'

import { isAuthenticated } from '../auth/helpers'

import Layout from "./Layout"

function Dashboard() {

    const { user: { name, email, role } } = isAuthenticated()


    const adminInfo = () => {

        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Information User</h2>
                    <div className="row py-5">
                        <div className="col-4 d-flex justify-content-center">
                            <img src={img_fournisseur_login} width="250px" height="250px" style={{boxShadow: "rgb(26 77 160 / 12%) 0px 30px 40px"}} />
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
                                    <input type="email" className="form-control" value={role === "FOURNISSEUR" ? 'Fournisseur' : 'User'} disabled/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                
                </div>
            </div>

        )
    }


    return (
        <Layout>
            {adminInfo()}
        </Layout>
    )
}

export default Dashboard
