import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import login from "./../assets/images/bannerLogin.jpg"
import {Link} from 'react-router-dom'

import { API_URL } from './../config'


const Signup = (props) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        cin: '',
        postal: '',
        address: '',
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignup = e => {

        e.preventDefault();

        fetch(`${API_URL}/user/singnup`, {
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
                toastr.success('User is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })

                props.history.push('/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignup}> 
            <div className="form-group">
                <label htmlFor="name" className="text-muted">name</label>
                <input onChange={handleChange} type="text" className="form-control" id="name" />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="password" className="text-muted">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="password"/>
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="text-muted">Numéro Téléphone</label>
                <input onChange={handleChange} type="text" className="form-control" id="phone"/>
            </div>

            <div className="form-group">
                <label htmlFor="cin" className="text-muted">Carte D'identité</label>
                <input onChange={handleChange} type="text" className="form-control" id="cin"/>
            </div>

            <div className="form-group">
                <label htmlFor="postal" className="text-muted">Code Postal</label>
                <input onChange={handleChange} type="number" className="form-control" id="postal"/>
            </div>

            <div className="form-group">
                <label htmlFor="address" className="text-muted">Address</label>
                <input onChange={handleChange} type="text" className="form-control" id="address"/>
            </div>

            <div className="d-grid my-3">
                <button className="btn  btn-success">Sign Up</button>            
            </div>

        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-7 " >
                   <img src={login} style={{width: '100%', height: '92.4vh'}}/>
                </div>
                <div className="col-5 px-5 ">
                    <h1 style={{fontWeight: 'bold'}}>Se connecter à Fresh Food</h1>
                    { form() } 
                   
                </div>
            </div> 
        </div>
    )
}

export default Signup
