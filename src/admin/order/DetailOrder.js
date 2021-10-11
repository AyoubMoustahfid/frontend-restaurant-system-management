import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {isAuthenticated} from "./../../auth/helpers"
import {img_admin_login} from "./../../Constants/images"
import {icon_handleShack, icon_truck, icon_check, icon_usd, icon_warning} from "./../../Constants/icons"
import "./order.css"
import Layout from "./../auth/Layout"
import moment from "moment"
import {getOneProduct} from './../ApiAdmin'
import {getOneOrder} from './../ApiAdmin'
import ShowImage from "./../../core/ShowImage"

function DetailOrder(props) {
    const [orders, setOrders] = useState('')
    const [product, setProduct] = useState([])
    const {user , token}  = isAuthenticated();
    const showViewBtn = true
 

    useEffect( () => {
        let orderId = props.match.params.id;
        getOneOrder(orderId, user._id, token)
                .then(res => {
                    console.log(res.order);
                    setOrders(res.order)
                    localStorage.setItem('productId', res.order.products[0]._id)
                }).catch(err => console.log(err))

            const productId = localStorage.getItem('productId')
            console.log(productId);
            getOneProduct(productId, user._id, token)
            .then(res => {
                // console.log('product:', res);
                setProduct([res])
            })
    }, [])

   
    const showStock = (quantity) => {
     
        return quantity > 0 ? <span className="fs-6">{quantity} piéces</span> : <span className="fs-6" style={{color: "red"}}>Out of Stock</span>
     
   }

   console.log('pro:', product);
    return (
        <Layout height="92.1vh" background='#222840'>
            <div className="row justify-content-between mb-4 align-items-center mt-3">
                    <div className="col-xl-3 text-left">
                        <h2 className="page-heading" style={{color: 'white'}}>Hi,Welcome Back!</h2>
                        <p className="mb-0" style={{color: 'white'}}>ALL-IN-ONE PACKAGE TRACKING</p>
                    </div>
                    <div className="col-xl-9 mt-4 mt-xl-0 ">
                        <div className="card-traking mb-0 px-3" style={{backgroundColor: '#131633'}}>
                            <div className="card-traking-body">
                                <h4 className="card-traking-title">Track Order</h4>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={`ORDER-${orders.transaction_id}`} disabled/>
                                            <div className="input-group-append">
                                                <button className="btn btn-danger" type="button">Track</button>
                                            </div>
                                        </div>
                                        <span className="d-block mt-1">Your order is now preparing</span>
                                    </div>
                                    <div className="col-md-7 mt-3 mt-md-0 p-0">
                                        <div className="steps">
                                            <ul className="list-unstyled multi-steps">
                                                <li className={orders.status === "Not processed" ? "is-active" : ""}>Ordered</li>
                                                <li className={orders.status === "Processing" ? "is-active" : ""}>Pending</li>
                                                <li className={orders.status === "Shipped" ? "is-active" : ""}>Preparing</li>
                                                <li className={orders.status === "Delivered" ? "is-active" : ""}>Shipping</li>
                                                <li className={orders.status === "Cancelled" ? "is-active" : ""}>Completed</li>
                                            </ul>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card-traking" style={{backgroundColor: '#131633', color :'white'}}>
                        <div className="card-traking-header d-flex justify-content-between align-items-center">
                            <h4 className="card-traking-title m-0">{`order-${orders.transaction_id}`}</h4>
                            {/*"badge bg-dark" */}
                            <span className={orders.status === "Not processed" ? "badge bg-danger" : 
                                        orders.status === "Processing" ? "badge bg-dark" :
                                        orders.status === "Shipped" ? "badge bg-primary" :
                                        orders.status === "Delivered" ? "badge bg-warning":
                                        orders.status === "Cancelled" ? "badge bg-parimary" : "badge bg-danger"
                                }>{orders.status}</span>
                        </div>
                        <div className="card-traking-body pt-0">
                            <div className="row">
                                <div className="col-xl-4 col-sm-5 col-xxl-5 align-items-center d-flex justify-content-center">
                                    <div className="progress__chart">
                                        <div className="easy-pie-chart pie-chart-4" data-percent="20" data-size="150">
                                            <div className={orders === "Not processed" ? "inner-danger" : 
                                                        orders.status === "Processing" ? "inner" :
                                                        orders.status === "Shipped" ? "inner-primary" :
                                                        orders.status === "Delivered" ? "inner-warning":
                                                        orders.status === "Cancelled" ? "inner-success" : "inner-danger"
                                                }>
                                                <img src={orders.status === "Not processed" ? icon_warning : 
                                                            orders.status === "Processing" ? icon_handleShack :
                                                            orders.status === "Shipped" ? icon_truck :
                                                            orders.status === "Delivered" ? icon_usd :
                                                            orders.status === "Cancelled" ? icon_check : icon_warning
                                                    } alt="" width="100px" height="100px"/>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-sm-7 col-xxl-7 align-items-center d-flex mt-3 mt-sm-0">
                                    <div className="row flex-fill">
                                        <div className="col-xl-6 col-xxl-6">
                                            <ul className="order__info">
                                                <li className="mb-3">
                                                    <div className="media">
                                                        <div className="custommer_img">
                                                           
                                                            <img width="35" height="35" src={img_admin_login} alt="custommer" style={{borderRadius: '30px', marginRight: '5px'}}/>
                                                        </div>
                                                        <div className="media-body ml-2">
                                                            <span className="d-block text-uppercase">Order Handed By</span>
                                                            <h6 style={{fontSize:'.875rem'}}>Janet Smith</h6>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media">
                                                        <div className="status__icon">
                                                            <i className="fa fa-clock" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="media-body ml-2">
                                                            <span className="d-block text-uppercase">Ordered on</span>
                                                            <h6>{moment(orders.createdAt).format('LL')}</h6>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-6 col-xxl-6">
                                            <ul className="order__info">
                                                <li className="mb-3">
                                                    <div className="media">
                                                        <div className="status__icon">
                                                            <i className="far fa-dollar-sign" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="media-body ml-2">
                                                            <span className="d-block text-uppercase">Order Total</span>
                                                            <h6>{orders.amount} DH</h6>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media">
                                                        <div className="status__icon">
                                                            <i className="fa fa-truck" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="media-body ml-2">
                                                            <span className="d-block text-uppercase">Shipping Method</span>
                                                            <h6>Postal</h6>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 mt-sm-5 p-0 ">
                                    <div className="progress__timeline">
                                        <div className="steps">
                                         {/*["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] */}
                                            <ul className="list-unstyled multi-steps">
                                                <li className={orders.status === "Not processed" ? "is-active" : ""}>Ordered</li>
                                                <li className={orders.status === "Processing" ? "is-active" : ""}>Pending</li>
                                                <li className={orders.status === "Shipped" ? "is-active" : ""}>Preparing</li>
                                                <li className={orders.status === "Delivered" ? "is-active" : ""}>Shipping</li>
                                                <li className={orders.status === "Cancelled" ? "is-active" : ""}>Completed</li>
                                            </ul>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-6 ">
                    <div className="row">
                        <div className="col-6">
                        {product && product.map(item => (
                            <div className="card my-2 " key={item._id} style={{boxShadow: '0 30px 40px -10px rgb(26 77 160 / 12%)', backgroundColor: '#131633', color :'white'}}>
                            <ShowImage item={item} url="product/photo" className="card-img-top" height="300px"></ShowImage>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title fw-bold" style={{color: 'black !important', textAlign: 'left !important'}}>{item && item.name}</h5> 
                                    <h4><span className="badge bg-danger text-white">{item && item.price} Dhs</span></h4>
                                </div>
                                <div className="d-flex justify-content-between my-2">
                                    <h6 style={{color : '#8790a6'}}>Revenue: {orders.amount}DH</h6>
                                    <h6 style={{color : '#8790a6'}}>Category: {item && item.category.name}</h6>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-4">
                                    {showViewBtn && (
                                    
                                    <Link to={`/product/${item && item._id}`} className="d-grid text-decoration-none">
                                        <button className="btn btn-light py-2 fw-bolder" style={{background: '#ecf4fe', borderColor: "#ecf4fe"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-link-45deg mx-2" viewBox="0 0 16 16">
                                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                                            </svg>
                                        </button>
                                    </Link>
                                    )}
                                    </div>
                                    <div className="col-8">
                                        <p className="text-end">Added {moment(item && item.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
           </div>
        </Layout>
    )
}

export default DetailOrder
