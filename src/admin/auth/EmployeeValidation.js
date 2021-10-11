import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import Layout from './Layout'

import { isAuthenticated } from './../../auth/helpers'

import {API_URL} from './../../config'

function EmployeeValidation() {

    const { user, token } = isAuthenticated()
   const [employeer, setEmployee] = useState([])

   useEffect(() => {
       fetch(`${API_URL}/admin/all-employeer/${user._id}`, {
           method: 'GET',
           headers:{
               Accept: 'application/json',
               Authorization: `Bearer ${token}`
           }
       }).then(res => res.json())
         .then(res => {
            console.log(res.employeer)
             setEmployee(res.employeer)
         })
   }, [])

    const activeEmployee = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/admin/validation-employeer/${user._id}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        }).then(res => res.json())
          .then(res => {
            if(res.error){
                toastr.warning(res.error, 'Admin not found with id !', {
                    positionClass: "toast-bottom-left",
                })
                console.log('error');
             }else{
                toastr.success(res.error, 'this Account is Activated', {
                    positionClass: "toast-bottom-left",
                })
             }
          })

    }
    return (
        <Layout height="92.2vh" background="rgb(236 236 236)">                
            <div className="row bg-white pt-3 mx-5 my-3">
                <div className="col-12">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-6">
                            <h1 className="fs-4">Validation Employee Account</h1>
                        </div>
                        <div className="col-4">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Employee Name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" style={{fontSize: '.75rem'}}>Name</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Email</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Phone</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>CIN</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Ville</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Position</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Age</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Joining Date</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Salary</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Valid</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Role</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeer && employeer.map((item, i) => (
                                <tr key={item._id}>
                                    <td><span style={{fontSize: '.875rem'}}>{item.name}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.email}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.phone}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.cin}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.ville}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.position}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.age} Years</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.joiningDate}</span></td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.salary} DH</span></td>
                                    <td>{item.is_valid ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-all" viewBox="0 0 16 16">
                                            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    }</td>
                                    <td><span style={{fontSize: '.875rem'}}>{item.role}</span></td>
                                    <td>
                                        <button className="btn btn-primary btn-block" onClick={() => activeEmployee(item._id)}>Employee</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    )
}

export default EmployeeValidation
