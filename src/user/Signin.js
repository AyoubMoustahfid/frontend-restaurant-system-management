import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import {Link} from 'react-router-dom';
import { API_URL } from './../config'
import {img_login} from "../Constants/images"
import  "../superAdmin/css/signin.css"


const Signin = (props) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignin = e => {

        e.preventDefault();

        fetch(`${API_URL}/auth/signin`, {
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
                toastr.info('User is authenticated SuccessFully', 'Welcome', {
                    positionClass: "toast-bottom-left",
                })

                localStorage.setItem('jwt_info', JSON.stringify(res))

                props.history.push('/')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignin} className="my-4"> 
           
        <div className="form-group mb-4">
        <label htmlFor="email" className="text-muted fw-bold">Email : </label>
        <input onChange={handleChange} type="email" className="form-control " id="email" />
    </div>


    <div className="form-group">
        <div className="form-group mb-4">
            <label htmlFor="password" className="text-muted  fw-bold">Password :</label>
            <input onChange={handleChange} type="password" className="form-control " id="password"/>
        </div>
        <div className="d-flex justify-content-between align-items-top mb-4">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="remember"/> 
                <label className="form-check-label mb-0" htmlFor="remember">Remember me</label>
            </div>
            <div>
                <a href="./forgot-password.html" className="small text-right text-decoration">Lost password?</a>
            </div>
        </div>
    </div>

            <div className="d-grid my-2">
                <button type="submit" className="btn btn-gray-800  fw-bolder">Sign In</button>
            </div>

        
        </form>
    )

    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
        <div className="container">
            <div className="row justify-content-center form-bg-image" style={{backgroundImage: `url(${img_login})`}}>
                
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                        <div className="text-center text-md-center mb-4 mt-md-0">
                            <h1 className="mb-0 h3">Sign in to our platform </h1>
                        </div>
                        { form() } 
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <span className="fw-normal">Not registered? 
                                <Link to="/signup" className="fw-bold text-decoration mx-1">Create account</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </section>
    )
}

export default Signin
