import React, { useState, useEffect } from 'react'
import { getCategories, getProducts } from './ApiCore'
import Card from './Card'

const Search = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    // const [result, setResult] = useState('')
    const [searchData, setSearchData] = useState({search: '', category: ''})

    const handleChange = (e) => {

        setSearchData({...searchData, [e.target.id]: e.target.value})

    }


    const resultMessage = () => {

        return products && products.length > 0 && (
            <h3>Found {products.length} Product(s)</h3>
        )

    }
 
    const searchSubmit = (e) => {

        e.preventDefault()

        let { search, category } = searchData

        if(search || category) {

            getProducts({search: search || undefined, category})
              .then(res => setProducts(res))
        }
        else {
            setProducts([])
        }
       

    }

    useEffect(() => {

        getCategories()
          .then(categories => setCategories(categories))

    }, [])

    return (
        <div>

           <form onSubmit={searchSubmit}>

           <div class="input-group mb-3">
                <div class="input-group-text p-0" id="basic-addon1">
                    <select onChange={handleChange} id="category" className="form-select">
                        <option value="">Select a Category</option>
                        {categories && categories.map((category, i) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input onChange={handleChange} id="search" type="search" className="form-control"/>
                <button className="input-group-text" id="basic-addon2" >Search</button>
            </div>

         


           </form>

           <hr/>

           {resultMessage()}

           <div className="row">
              {products.map((product, i) => (
                <div key={product._id} className=" col-12 col-md-6 col-lg-4">
                    <Card product={product} />
                </div>
              ))}
           </div>

        </div>
    )
}

export default Search
