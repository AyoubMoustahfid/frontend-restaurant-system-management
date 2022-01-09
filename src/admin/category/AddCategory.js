import React, { useState , useEffect}from 'react'

import {API_URL} from "./../../config"
import {isAuthenticated} from './../../auth/helpers'
import Layout from "./../auth/Layout"
import  {Link} from "react-router-dom"
import toastr from 'toastr';
import "toastr/build/toastr.css";

function AddCategory(props) {
    const [name, setName] = useState('')

    const handleChange = (e) => {
        setName(e.target.value)
    }
      // ++++++++++++ CREATE ONE CATEGORY +++++++++++++++++++
      const submitCategory = (e) => {

        e.preventDefault();

        const { user, token } = isAuthenticated();

        fetch(`${API_URL}/category/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Category ${name} created`, 'new Category', {
                    positionClass: "toast-bottom-left",
                })

                setName("")
                props.history.push('/category/gestion')

            }

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))

        }
    return (
        <Layout height="92.2vh" background="rgb(236 236 236)">
            <div className="row mx-2">
                <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mx-auto bg-white p-2 ">
                    <form onSubmit={submitCategory}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-muted fw-bold pb-2 ">category :</label>
                            <input value={name} required autoFocus placeholder="Add name of Category" onChange={handleChange} type="text" className="form-control" id="name" name="name"/>
                        </div>
                        <div className="d-grid my-2">
                            <button type="submit" className="btn btn-primary ">New Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
