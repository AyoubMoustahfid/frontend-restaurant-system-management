import React, {useState, useEffect} from 'react'
import {API_URL} from './../config'
import {isAuthenticated} from "./../auth/helpers"
import axios from "axios"
import {getAllFournisseur, getAllAdmin} from "./ApiSuperAdmin"

import toastr from 'toastr';
import "toastr/build/toastr.css";

import Layout from "./Layout"

function ValidationFournisseur() {
    
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);

    const activeFournisseur = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/super-admin/validation-fournisseur/${user._id}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        }).then(res => res.json())
          .then(res => {
            if(res.error){
                toastr.warning(res.error, 'Fournisseur not found with id !', {
                    positionClass: "toast-bottom-left",
                })
                console.log('error');
             }else{
                toastr.success(res.error, 'this Account is Activated', {
                    positionClass: "toast-bottom-left",
                })

                window.location.reload();
             }
          })

    }

    const activeAdmin = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/super-admin/validation-admin/${user._id}/${id}`, {
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

    useEffect(() => {
        const {user, token} = isAuthenticated();

        getAllFournisseur(user._id, token).then(res => {
            setUsers(res.fournisseur)
            console.log(res.fournisseur)
        }).catch(err => console.log(`err: ${err}`))

        getAllAdmin(user._id, token).then(res => {
            setAdmins(res.admin)
            console.log(res.admin)
        }).catch(err => console.log(`err: ${err}`))
           
    }, [])

    return (
        <Layout>
            <div className="row bg-white pt-3 mx-5">
                <div className="col-12">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-6">
                            <h1 className="fs-4">Validation Fournisseur Account</h1>
                        </div>
                       
                    </div>
                </div>

                <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" style={{fontSize: '.75rem'}}>Name</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Email</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Society Name</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Phone</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Address</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>CIN</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Valid</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Role</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((item, i) => (
                                <tr key={item._id}>
                                <th><span style={{fontSize: '.875rem'}}>{item.name}</span></th>
                                <td><span style={{fontSize: '.875rem'}}>{item.email}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.nameSociety}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.phone}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.address}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.cin}</span></td>
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
                                    <button className="btn btn-primary btn-block" onClick={() => activeFournisseur(item._id)}>Fournisseur</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                            
            <div className="row bg-white pt-3 mx-5 my-3">
                <div className="col-12">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-6">
                            <h1 className="fs-4">Validation Admin Account</h1>
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
                                <th scope="col" style={{fontSize: '.75rem'}}>Valid</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Role</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins && admins.map((item, i) => (
                                <tr key={item._id}>
                                <th><span style={{fontSize: '.875rem'}}>{item.name}</span></th>
                                <td><span style={{fontSize: '.875rem'}}>{item.email}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.phone}</span></td>
                                <td><span style={{fontSize: '.875rem'}}>{item.cin}</span></td>
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
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-block" onClick={() => activeAdmin(item._id)}>Admin</button>
                                    </div>
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

export default ValidationFournisseur
