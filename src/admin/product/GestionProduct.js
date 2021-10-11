import React, {useState, useEffect} from 'react'
import lodash from "lodash"

import {API_URL} from "./../../config"
import {isAuthenticated} from './../../auth/helpers'
import Layout from './../auth/Layout'
import ShowImage from './../../core/ShowImage'
import toastr from 'toastr';
import "toastr/build/toastr.css";

const PageSize = 6;
function GestionProduct() {


    const [product, setProduct] = useState("")

    const [productId, setProductId] = useState({})
    const [active, setActive] = useState(false)

    const [productUpdate, setProductUpdate] = useState('')
    
    const [formData, setFormData] = useState(new FormData()); 

    // *********** State Pagination Table ***********
    const [paginateProducts, setPaginationProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1)

    const handleChange = (e) => {

        const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;
       formData.set(e.target.id, value)
 
        setProductUpdate({...productUpdate, [e.target.id]: value})
        
     }
 
     const productById = async  (id) => {
          await fetch(`${API_URL}/product/${id}`, {
             method: 'GET',
             headers: {
                 "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then( res => {
                localStorage.setItem("product", JSON.stringify(res.product))
                 setProductId(res.product)
            }).catch(err => console.error(err))
    }
        
    const getProducts =  () => {
            return  fetch(`${API_URL}/product/all`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(res => {
                 console.log(res);
                setProduct(res.products)
                setPaginationProducts(lodash(res.products).slice(0).take(PageSize).value())
            })
            .catch(err => console.error(err))
            
    }


    // ******************** Method Update Product *******************
    const updateProduct =  async  e => {
         e.preventDefault()
         //const {user, token} = await isAuthenticated();
        const productStorage = await JSON.parse(localStorage.getItem('product'))
        
        console.log(productStorage._id);
        
        fetch(`${API_URL}/product/update/${productStorage._id}`, {
           method: "PUT",
           headers: {
               "Accept": "application/json",
           },
           body: formData
       })
       .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
                
            }

                toastr.success('Product is Updated', 'Update is Done', {
                    positionClass: "toast-bottom-left",
                })
                
                console.log(res.product);
                setProductUpdate(res.product)
                
                setFormData(new FormData())
                setActive(true)
                window.location.reload();
             
           }).catch(err =>  toastr.error(err, 'Server error !', {
                positionClass: "toast-bottom-left",
            }))
     }

    useEffect( () => {getProducts()}, [])

    // **************** Method Delete Product ****************
     const deleteProduct = id => {
        const {user, token} = isAuthenticated();
         fetch(`${API_URL}/product/delete/${id}/${user._id}`, {
             method: 'DELETE',
             headers: {
                'Authorization': `Bearer ${token}`
             }
         }).then(res => {
             console.log(res);
            toastr.success('This Product is deleted successfully', 'Delete is successful', {
                positionClass: "toast-bottom-left",
            })
            window.location.reload()
      }).catch(err => toastr.error(err, 'Server error !', {
                positionClass: "toast-bottom-left",
        }))
     }

     const pageCount = product ? Math.ceil(product.length/PageSize) : 0;

    if(pageCount === 1) return null;

    const pages = lodash.range(1, pageCount + 1)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * PageSize;
        const paginateCategory = lodash(product).slice(startIndex).take(PageSize).value()
        setPaginationProducts(paginateCategory)
    }

    return (
        <Layout height="92.2vh" background="rgb(236 236 236)">
            <div className="row px-3">
                <div className="col-12 bg-white p-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Product</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Name</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Description</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Quantity</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Price</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Sold</th>
                                <th scope="col"  style={{fontSize: '.75rem'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginateProducts && paginateProducts.map((item, i) => (
                                <tr key={i}>
                                    <td style={{fontSize: '.875rem'}}>
                                        <div className="row justify-content-center">
                                                <ShowImage item={item} url="product/photo" classDiv="col-12 mx-auto" height="100px" width="100%"></ShowImage>
                                        </div>
                                    </td>
                                    <td style={{fontSize: '.875rem'}}>{item.name}</td>
                                    <td style={{fontSize: '.875rem'}}>{item.description.substring(0, 50)} ....</td>
                                    <td style={{fontSize: '.875rem'}}>{item.quantity} Item</td>
                                    <td style={{fontSize: '.875rem'}}>{item.price} DH</td>
                                    <td style={{fontSize: '.875rem'}}>{item.sold}</td>
                                    <td style={{fontSize: '.875rem'}}>
                                        <div className="row">
                                            <div className="col-6">

                                                <button className="btn btn-success" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => productById(item._id)}>Edit</button>

                                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={active}>
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form onSubmit={updateProduct}>

                                                                    <div className="form-group py-2">
                                                                        <label htmlFor="photo">Update Photo</label>
                                                                        <input id="photo" type="file" className="form-control" name="photo" onChange={handleChange}  />
                                                                    </div>

                                                                    <div className="form-group py-2">
                                                                        <label htmlFor="name">Update Name</label>
                                                                        <input type="text" className="form-control" id="name" name="name"  defaultValue={productId.name}  onChange={handleChange}/>
                                                                    </div>

                                                                    <div className="form-group py-2">
                                                                        <label htmlFor="description">Update Description</label>
                                                                        <textarea type="text" rows="4" className="form-control" name="description" id="description"  defaultValue={productId.description}  onChange={handleChange}></textarea>
                                                                    </div>

                                                                    <div className="form-group py-2">
                                                                        <label htmlFor="price">Update Price</label>
                                                                        <input type="number" className="form-control" id="price" name="price" defaultValue={productId.price }  onChange={handleChange}/>
                                                                    </div>
                                                                    
                                                                    <div className="form-group py-2">
                                                                        <label htmlFor="quantity">Update Quantity</label>
                                                                        <input type="number" className="form-control" id="quantity" name="quantity" defaultValue={productId.quantity}  onChange={handleChange}/>
                                                                    </div>

                                                                    <div className="d-grid py-2">
                                                                        <button className="btn btn-primary ">Update Product</button>
                                                                    </div>

                                                                   
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-danger" onClick={() => deleteProduct(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <nav className="d-flex justify-content-center">
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

export default GestionProduct
