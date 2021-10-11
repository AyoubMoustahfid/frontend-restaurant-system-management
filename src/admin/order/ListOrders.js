import React, {useState, useEffect} from 'react'
import {isAuthenticated} from './../../auth/helpers'
import moment from "moment"
import {listOfOrders, getStatus, updateOrderStatus} from './../ApiAdmin'
import Layout from "./../auth/Layout"
import lodash from "lodash"
import {Link} from "react-router-dom"

import toastr from 'toastr';
import "toastr/build/toastr.css";
import {API_URL} from "./../../config"

import {img_noOrder} from "./../../Constants/images"

const PageSize= 2;

function ListOrders() {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState()
    const [paginateCtegories, setPaginationctegories] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    
    const {user, token} = isAuthenticated();


    const loadOrders = (user, token) => {
        listOfOrders(user._id, token)
             .then(res => {
                console.log(res);
                setOrders(res)
                setPaginationctegories(lodash(res).slice(0).take(PageSize).value())

             })
             .catch(err => console.error(err))
    }

    const loadStatus = (user, token) => {
        getStatus(user._id, token)
             .then(res =>  {
              setStatus(res.status)
               console.log(res.status);
             })
             .catch(err => console.error(err))
    }

    
    useEffect(() => {

        loadOrders(user, token)
        loadStatus(user, token)
    } , [])

      // =============== DELETE ALL CATEGORY =================
      const deleteOrder = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/order/delete/${id}/${user._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
          .then(res => {
                toastr.success('This category is deleted successfully', 'Delete is successful', {
                    positionClass: "toast-bottom-left",
                })
                window.location.reload()
          }).catch(err => toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
            }))
    }

    const notOrders = () => {
        if(setPaginationctegories.length === 0){
            return (
                <div className="alert alert-warning text-center ">
                     Not Orders Yet !
                </div>
            )
        }else{
            return (
                <div className="alert alert-info text-center ">
                     Total Orders {orders.length}
                </div>
            )
        }
    }

    const showInput = (key, value) => {
          return (
              <div className="form-group my-3">
                 <label htmlFor={key}>{key}</label>
                 <p id={key}>{value}</p>
              </div>
          )
    }

    const handleStatus = (e, order) => {
        
        const {user, token} = isAuthenticated();
        console.log(order._id);
        updateOrderStatus(user._id, token, order._id, e.target.value)
               .then((res) => {
                   if(res.error){
                       console.log(res.error);
                   }
                   console.log(res);
                   loadOrders(user, token)
               })
    }


  const showStatus = (order) => {
      return status && status.length && (

        <div>
          <select onChange={e => handleStatus(e, order)} className="form-control">
             <option value="">{order.status}</option>
             {status.map(s => (
                 <option key={s} value={s}>{s}</option>
             ))}
          </select>
        </div>
      )
  }

      
 
//  ********************* PAGINATION TABLE ORDER ******************
    const pageCount = orders ? Math.ceil(orders.length/PageSize) : 0;

    if(pageCount === 1) return null;

    const pages = lodash.range(1, pageCount + 1)

    const pagination = (pageNumber) => {
      setCurrentPage(pageNumber);
      const startIndex = (pageNumber - 1) * PageSize;
      const paginateCategory = lodash(orders).slice(startIndex).take(PageSize).value()
      setPaginationctegories(paginateCategory)
    }



    const showOrders = () => {
        return (
           <div>
            {paginateCtegories && paginateCtegories.length === 0 ? (
                <div className="row">
                    <div className="col-6 mx-auto">
                        <img src={img_noOrder} alt="not found order" style={{height: "77.7vh"}}/>
                    </div>
                </div>
            ): (
            paginateCtegories && paginateCtegories.map(order => (
        
                <div className="" key={order._id}>
                    <h3 className="alert alert-success text-center my-3 mx-auto">Total Products {order.products.length}</h3>
                    <div className=" p-3" >
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Transact ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Ordered On</th>
                                <th scope="col">Track Order</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col">Details Tracking</th>
                                <th scope="col">Delete Order</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr key={order._id}>
                                    <th>{order.transaction_id}</th>
                                    <td>{showStatus(order)}</td>
                                    <td>{order.amount} DH</td>
                                    <td>{moment(order.createdAt).fromNow()}</td>
                                    <td><h5><span className={order.status === "Not processed" ? "badge bg-danger" : 
                                                    order.status === "Processing" ? "badge bg-dark" :
                                                    order.status === "Shipped" ? "badge bg-primary" :
                                                    order.status === "Delivered" ? "badge bg-warning":
                                                    order.status === "Cancelled" ? "badge bg-parimary" : "badge bg-danger"
                                            } 
                                        style={{color : 'white'}}>{order.status}</span></h5></td>
                                    <td>
                                        {order.user === null ? (order.admin.name || order.superAdmin.name || order.fournisseur.name || order.employee.name) : 
                                        order.admin === null ? (order.user.name || order.superAdmin.name || order.fournisseur.name || order.employee.name) : 
                                        order.superAdmin === null ? (order.user.name || order.admin.name || order.fournisseur.name || order.employee.name) :
                                        order.fournisseur === null ? (order.user.name || order.admin.name || order.superAdmin.name || order.employee.name) : 
                                        order.employee === null ? (order.user.name || order.admin.name || order.fournisseur.name || order.superAdmin.name) : 
                                        'user not found'
                                        }
                                    </td>
                                    <td>{order.address}</td>
                                    <td><Link to={`/detail-order/${order._id}`}>Show Details</Link></td>
                                    <td className="text-center"> 
                                        <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                        <div className="">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Product Price</th>
                                    <th scope="col">Product quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map(product => (
                                        <tr key={product._id}>
                                        <th>{product.name}</th>
                                        <td>{ showInput( product._id)}</td>
                                        <td>{ showInput( product.price)}</td>
                                        <td>{ showInput( product.count)}</td>
                                        
                                        </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                
                </div>
            ))
        )}
           </div>
        )
    }

  
    return (
        <Layout height='100%'>
            <div className="row">
                <div className="col-md-12">
                  {notOrders()}
                  {showOrders()}

                  
                    <nav className="d-flex justify-content-center my-2">
                        <div className="pagination">
                            {pages.map((page) => (
                                <li className={page === currentPage ? "page-item active" : "page-item"}>
                                    <p className="page-link" onClick={() => pagination(page)}>{page}</p>
                                </li>
                            ))}
                        </div>
                    </nav>
                   
                </div>
            </div>
        </Layout>
    )
}

export default ListOrders
