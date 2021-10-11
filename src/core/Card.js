 import React from 'react'
import { Link } from 'react-router-dom'

import { addToCart } from './../actions/cartActions'

import { useDispatch } from 'react-redux'

import ShowImage from './ShowImage';
import moment from 'moment'

const Card = ({product, showViewBtn = true}) => {
    
    let dispatch = useDispatch() 

    const showStock = (quantity) => {
     
         return quantity > 0 ? <span className="fs-6">{quantity} piéces</span> : <span className="fs-6" style={{color: "red"}}>Out of Stock</span>
      
    }

    return (
        <div>

        <div class="card my-2" style={{boxShadow: '0 30px 40px -10px rgb(26 77 160 / 12%)'}}>
            <ShowImage item={product} url="product/photo" className="card-img-top" height="300px"></ShowImage>
            <div class="card-body">
                <h5 class="card-title" style={{color: 'black !important', textAlign: 'left !important'}}>{product.name.substring(0, 30)}...</h5>
                <div className="d-flex justify-content-between my-2">
                    <h6 class="card-subtitle mb-2 text-muted">{showStock(product.quantity)}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{product.category.name}</h6>
                </div>
                <div class="row justify-content-between align-items-end">
                    <div class="col-4 d-flex justify-content-start">
                        <h5 class="card-title fs-5" style={{fontWeight: '700'}}>{product.price} Dhs</h5>
                    </div>
                    <div class="col-8 col-4 d-flex justify-content-end">
                    {showViewBtn && (
                      
                      <Link to={`/product/${product._id}`}>
                          <button class="btn btn-light mx-2 " style={{background: '#ecf4fe', borderColor: "#ecf4fe"}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                              </svg>
                          </button>
                      </Link>
                    )}

                        { product.quantity > 0 && (
                          
                          <button class="btn btn-primary" style={{background: "#0a5551", borderColor: "#0a5551"}} onClick={() => dispatch(addToCart(product))}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                              </svg>
                          </button>
                        ) }
                    </div>
                </div>
                <p>Added {moment(product.createdAt).fromNow()}</p>
            </div>
        </div>

        </div>
    )
}

export default Card
