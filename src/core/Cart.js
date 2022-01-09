import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import cartImage from "./../assets/images/empty-cart.png"

import { incProductCount, decProductCount, removeProduct, convertDH} from './../actions/cartActions'

import ShowImage from './ShowImage'
import Checkout from './Checkout'

function Cart() {

    let productsInCart = useSelector(state => state.cart.products)
    let dispatch = useDispatch()
    
    console.log('productsInCart', productsInCart)
    return (
        <div className="container py-5">
            {!productsInCart && !productsInCart ? (
                <div className="row">
                    <div className="col-12">
                        <img src={cartImage} alt="cart not found"/>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <h3>Your Cart</h3>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {productsInCart.map((product, index) => (
                                        <tr key={product._id}>
                                            <td width="100px">
                                                <ShowImage item={product} url="product/photo" className="card-img-top" height="80px" width="80px"></ShowImage>
                                            </td>
                                            <td>
                                                <h5 style={{fontWeight: "700"}}>{product.name}</h5>
                                                <p className="well">{product.description.substring(0, 40)} ...</p>
                                            </td>
                                            <td>
                                                    <div>
                                                        
                                                        <div className="d-flex  justify-content-evenly">
                                                            <button onClick={() => dispatch(incProductCount(product))} className="btn ml-2 btn-raised btn-sm " style={{background: 'rgb(10, 85, 81)'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                                                </svg>
                                                            </button>
                                                            <h4><span className="span span-success">{product.count}</span></h4>
                                                        { product.count > 1 && (

                                                            <button onClick={() => dispatch(decProductCount(product))} className="btn btn-raised btn-sm" style={{background: 'rgb(236, 244, 254)'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-dash" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                                                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                                                </svg>
                                                            </button>

                                                        ) }  
                                                        </div>
                                                    
                                                    </div>

                                            </td>
                                            <td>
                                                <h5 className="text-center">${product.price.toString().substr(0, 5)} </h5>
                                                {/* <button className="btn btn-raised btn-success" onClick={() => dispatch(convertDH(product))}>DH</button>  */}
                                            </td>
                                            <td><h5 className="text-center">$ {(product.price * product.count ).toString().substr(0, 5)}</h5></td>
                                            <td className="text-right">
                                                <button onClick={() => dispatch(removeProduct(product._id))} className="btn btn-sm btn-danger btn-raised">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
                    </div>
                                                            
                    <hr/>

                    <div className="row justify-content-end">
                        <div className="col-md-6">
                            <Checkout products={productsInCart}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
