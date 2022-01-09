import React, { useEffect, useState } from 'react'
import { getOneProduct, relatedProducts } from './ApiCore'
import { useDispatch } from 'react-redux'
import {addToCart} from "./../actions/cartActions"
import Card from './Card'
import ShowImage from "./ShowImage"

const Product = (props) => {

    let dispatch = useDispatch() 

    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])

    useEffect(() => {

        let productId = props.match.params.id;
        getOneProduct(productId)
          .then(res => {
              setProduct(res)
               return relatedProducts(productId)
            })
           .then(related => setRelated(related))
          .catch(err => console.error(err))

    }, [props])

    return (
        <div>  
           {product && product.description && (
                <div className="container">
                    <div class="row my-3">
                        <div class="col-6">
                            <ShowImage item={product} url="product/photo" className="card-img-top" height="100%" width="100%"></ShowImage>
                        </div>
                        <div class="col-6">
                            <div className="d-flex flex-column justify-content-evenly" style={{height: '100%'}}>
                                <div>
                                    <p className="fw-bold mb-0 ">Name: </p>
                                    <h3 className="mb-3 ">{product.name}</h3>
                                </div>

                                <div>
                                    <p className="fw-bold mb-0  ">Price: </p>
                                    <h5 className="mb-3">{product.price} DH</h5>
                                </div>

                                <div>
                                    <p className="fw-bold mb-0 ">Description: </p>
                                    <p className="mb-3">{product.description}</p>
                                </div>
                                <div className="d-flex">
                                    <button class="btn btn-primary fs-6 fw-bold"  onClick={() => dispatch(addToCart(product))} style={{backgroundColor: 'rgb(32, 201, 151)', borderColor: 'rgb(32, 201, 151)'}}>
                                        Add to cart
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag mx-1 pb-1" viewBox="0 0 16 16">
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <hr/>
                    <h1 className="mt-3 fw-bold">All Product Related</h1>
                    <div className="row">
                    {related.map((product, i) => (
                        <div className="col-12 col-md-6 col-lg-4">
                            <Card key={product._id} product={product} />
                        </div>
                    ))}
                    </div>   
                </div>
           )}
        </div>
    )
}

export default Product
