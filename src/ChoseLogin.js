import React from 'react'
import "./chose.css"
import {Link} from 'react-router-dom'
import {img_user_login, img_superAdmin_login, img_admin_login, img_fournisseur_login, img_employee_login} from "./Constants/images"

function ChoseLogin() {
    return (
        <div className="container-fluid bg-dark " style={{height: '92.2vh'}}>
            <div className="d-flex flex-column justify-content-center " style={{height: '100%'}}>
                <h1 style={{color : 'white', textAlign: 'center'}} className="my-4">Who's Signing ? </h1>
                <div className="d-flex justify-content-center align-items-center">
                    {/* login from Super Admin */}
                <Link
                    to="/super-admin/signin" 
                    className="profile">
                    <div>
                        <img src={img_user_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)', width: '10vw', height: '10vw'}}/>
                    </div>
                    <div>
                        <h5 className="text-white">SUPER ADMIN</h5>
                    </div>
                </Link>

                {/* login from Admin */}
                <Link
                    to="/admin/signin" 
                    className="profile">
                    <div>
                        <img src={img_admin_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)', width: '10vw', height: '10vw'}}/>
                    </div>
                    <div>
                        <h5 className="text-white">ADMIN</h5>
                    </div>
                </Link>

                {/* login from Fournisseur */}
                <Link
                    to="/fournisseur/signin" 
                    className="profile">
                    <div>
                        <img src={img_fournisseur_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)', width: '10vw', height: '10vw'}}/>
                    </div>
                    <div>
                        <h5 className="text-white">FOURNISSEUR</h5>
                    </div>
                </Link>

                {/* login from Employee */}
                <Link
                    to="/employee/signin" 
                    className="profile">
                    <div>
                        <img src={img_superAdmin_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)', width: '10vw', height: '10vw'}}/>
                    </div>
                    <div>
                        <h5 className="text-white">EMPLOYEE</h5>
                    </div>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default ChoseLogin

/*
    <div className="col-4 my-3 d-flex justify-content-center">
        <img src={img_user_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)'}}/>
    </div>
    <div className="col-4 my-3 d-flex justify-content-center">
        <img src={img_superAdmin_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)'}}/>
    </div>
    <div className="col-4 my-3 d-flex justify-content-center">
        <img src={img_admin_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)'}}/>
    </div>
    <div className="col-4 my-3 d-flex justify-content-center">
        <img src={img_fournisseur_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)'}}/>
    </div>
    <div className="col-4 my-3 d-flex justify-content-center">
        <img src={img_employee_login} alt="" srcset="" style={{border: ' 5px solid rgb(32, 201, 151)'}}/>
    </div>
*/ 