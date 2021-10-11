import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import {Link} from 'react-router-dom';
import login from "./../assets/images/bannerLogin.jpg"
import { API_URL } from './../config'


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

        fetch(`${API_URL}/auth/singnin`, {
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
           
            <div className="form-group my-2">
                <label htmlFor="email" className="text-muted fs-4 fw-bold">Email : </label>
                <input onChange={handleChange} type="email" className="form-control py-3" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="password" className="text-muted fs-4 fw-bold">Password :</label>
                <input onChange={handleChange} type="password" className="form-control py-3" id="password"/>
            </div>

            <div className="d-grid my-2">
                <button type="submit" class="btn btn-primary py-2 fs-4 fw-bolder">Sign In</button>
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
                    <div className="d-flex justify-content-center">
                        <p style={{color: 'rgb(32, 201, 151)', fontWeight: 'bold', margin: '0px 5px'}}>Nouveau chez Fresh Food ? </p>
                        <Link to='/signup' style={{textDirection: 'none', color: 'black !important', fontWeight: 'bolder'}}> Inscription</Link>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Signin
