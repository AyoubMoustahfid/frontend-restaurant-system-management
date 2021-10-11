import React, { useState } from 'react'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import {Link} from 'react-router-dom'
import {img_login} from "./../Constants/images"
import "./../superAdmin/css/signin.css"


import { API_URL } from './../config'


const Signup = (props) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cin: '',
        dateNaissance: '',
        phone: '',
        ville: '',
        position: '',
        age: 0,
        joiningDate: '',
        salary: 0
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignup = e => {

        e.preventDefault();

        fetch(`${API_URL}/employeer/signup`, {
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
                toastr.success('Employee is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })

                props.history.push('/employee/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignup}> 

            <div className="row my-2">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="name" className="text-muted">Nom Complet</label>
                        <input onChange={handleChange} type="text" className="form-control" id="name" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="cin" className="text-muted">Carte D'identifier</label>
                        <input onChange={handleChange} type="text" className="form-control" id="cin"/>
                    </div>
                </div>
            </div>
            <div className="form-group my-1">
                <label htmlFor="email" className="text-muted">Email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>
            <div className="form-group my-1">
                <label htmlFor="password" className="text-muted">Mot de passe</label>
                <input onChange={handleChange} type="password" className="form-control" id="password"/>
            </div>
            <div className="row my-2">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="dateNaissance" className="text-muted">Date Naissance</label>
                        <input onChange={handleChange} type="date" className="form-control" id="dateNaissance"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="joiningDate" className="text-muted">Date Joining</label>
                        <input onChange={handleChange} type="date" className="form-control" id="joiningDate"/>
                    </div>
                </div>
            </div>
        
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="ville" className="text-muted">Ville</label>
                        <input onChange={handleChange} type="text" className="form-control" id="ville"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="position" className="text-muted">Nom de poste</label>
                        <input onChange={handleChange} type="text" className="form-control" id="position"/>
                    </div>
                </div>
            </div>

            <div className="row my-2">
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="phone" className="text-muted">Téléphone</label>
                        <input onChange={handleChange} type="text" className="form-control" id="phone"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="age" className="text-muted">Age</label>
                        <input onChange={handleChange} type="number" className="form-control" id="age"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="salary" className="text-muted">Salarie</label>
                        <input onChange={handleChange} type="number" className="form-control" id="salary"/>
                    </div>
                </div>
            </div>
            <div className="d-grid my-3">
                <button className="btn btn-success">Sign Up</button>
            </div>

        </form>
    )

    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center form-bg-image" style={{backgroundImage: `url(${img_login})`}}>
                    
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light py-3 px-4 w-100 fmxw-500">
                            <div class="text-center text-md-center mb-4 mt-md-0">
                                <h1 class="mb-0 h3">Sign in to our platform Employeer</h1>
                            </div>
                            { form() } 
                            <div class="d-flex justify-content-center align-items-center mt-4">
                                <span class="fw-normal">Not registered? 
                                    <Link to="/employee/signin" class="fw-bold text-decoration mx-1">Log In</Link>
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
