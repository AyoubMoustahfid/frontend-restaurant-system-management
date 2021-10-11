import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import {img_login} from "./../Constants/images"
import {Link} from "react-router-dom"
import "./../superAdmin/css/signin.css"


import { API_URL } from './../config'


const Signup = (props) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cin: '',
        nameSociety: '',
        phone: '',
        address: '',
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignup = e => {

        e.preventDefault();

        fetch(`${API_URL}/fournisseur/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success('Fournisseur is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })
                console.log(res);
                props.history.push('/fournisseur/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignup}> 
            <div className="form-group">
                <label htmlFor="name" className="text-muted">Nom Complet</label>
                <input onChange={handleChange} type="text" className="form-control" id="name" />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="password" className="text-muted">Mot de passe</label>
                <input onChange={handleChange} type="password" className="form-control" id="password"/>
            </div>

            <div className="form-group">
                <label htmlFor="cin" className="text-muted">Carte D'identifier</label>
                <input onChange={handleChange} type="text" className="form-control" id="cin"/>
            </div>

            <div className="form-group">
                <label htmlFor="nameSociety" className="text-muted">Nom Société</label>
                <input onChange={handleChange} type="text" className="form-control" id="nameSociety"/>
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="text-muted">Téléphone</label>
                <input onChange={handleChange} type="text" className="form-control" id="phone"/>
            </div>

            <div className="form-group">
                <label htmlFor="address" className="text-muted">Address</label>
                <input onChange={handleChange} type="text" className="form-control" id="address"/>
            </div>

            <div className="d-grid my-2">
                <button type="submit" class="btn btn-gray-800  fw-bolder">Sign In</button>
            </div>

        </form>
    )

    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center form-bg-image" style={{backgroundImage: `url(${img_login})`}}>
                    
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div class="text-center text-md-center mb-4 mt-md-0">
                                <h1 class="mb-0 h3">Sign in to our platform Fournisseur</h1>
                            </div>
                            { form() } 
                            <div class="d-flex justify-content-center align-items-center mt-4">
                                <span class="fw-normal">Not registered? 
                                    <Link to="/fournisseur/signin" class="fw-bold text-decoration mx-1">Connexion</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
    )
}

export default Signup
