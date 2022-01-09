import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './ApiCore';
import Card from './Card';
import Search from './Search'

function Home() {

    const [productsBestSellers, setProductsBestSellers] = useState([])
    const [productsArrivals, setProductsArrivals] = useState([])

    const loadBestSellers = () => {

        getProducts({sortBy: 'sold', order: 'desc', limit: 30})
          .then(products => setProductsBestSellers(products))

    }

    const loadArrivals = () => {

        getProducts({sortBy: 'createdAt', order: 'desc', limit: 3})
          .then(products => setProductsArrivals(products))

    }

    useEffect(() => {
        loadArrivals()
        loadBestSellers()

    }, [])

    return (
        <div className="container my-5">


                <Search />

                <hr/>

                <h1>Arrival Products</h1>
                    <div className="row mt-3 mb-5">
                        {productsArrivals && productsArrivals.map((product, i) => (
                        <div key={product._id} className="col-12  col-md-6 col-lg-4 ">
                                <Card product={product}></Card> 
                        </div>  
                        ))}
                    </div>
                <hr/>

                

                <h1>Best Sellers</h1>
                <div className="row mt-3 mb-5">
                        {productsBestSellers && productsBestSellers.map((product, i) => (
                        <div  key={product._id} className="col-12  col-md-6 col-lg-4 ">
                                <Card product={product}></Card> 
                        </div>  
                        ))}
                </div>
        </div>
    )
}

export default Home
