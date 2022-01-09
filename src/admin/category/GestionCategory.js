import React, { useState , useEffect}from 'react'

import {API_URL} from "./../../config"
import {isAuthenticated} from './../../auth/helpers'
import  {Link} from "react-router-dom"
import lodash from "lodash"

import Layout from "./../auth/Layout"

import toastr from 'toastr';
import "toastr/build/toastr.css";

const PageSize = 10;

function GestionCategory(){

    const [name, setName] = useState('')


    const handleChange = (e) => {

        setName(e.target.value)
    }

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("")
    
    const [paginateCtegories, setPaginationctegories] = useState();
    const [currentPage, setCurrentPage] = useState(1)
 

    // =============== PUT ONE CATEGORY =================
    const updateCategory = (e) => {
        e.preventDefault();

        const {user, token} = isAuthenticated();
        const category = localStorage.getItem('category')

        const categoryParse = JSON.parse(category)
    
        fetch(`${API_URL}/category/update/${categoryParse._id}/${user._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(name)
        }).then(res => res.json())
          .then(res => {

              if(res.error){
                  toastr.warning(res.error, 'Please Check your form !!', {
                      positionClass: "toast-bottom-left",
                  })
              }else{
                toastr.success(`Category ${name} is Updated`, 'Update is Successfully', {
                      positionClass: "toast-bottom-left",
                })
                  localStorage.removeItem('category')
                  setName('')
              }
          })
    }
    // =============== GET CATEGORY BY ID =================
    const categoryById = id => {
        fetch(`${API_URL}/category/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(res => {
              localStorage.setItem("category", JSON.stringify(res.category))
              setCategoryId(res.category)
          })
          .catch(err => console.error(err))
    }

    // =============== DELETE ALL CATEGORY =================
    const deleteCategory = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/category/delete/${id}/${user._id}`, {
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
    
    // =============== GET ALL CATEGORY =================
    const getCategories = async () => {
        
       await fetch(`${API_URL}/category`, {
           method: "GET",
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(async res => {
             setCategories(res.categories)
             console.log(res.categories);
             setPaginationctegories(lodash(res.categories).slice(0).take(PageSize).value())
        })
        .catch(err => console.error(err))
        
    }
    
    
    useEffect(() => {
            getCategories()
            // categoryById()
    }, [])

    const pageCount = categories ? Math.ceil(categories.length/PageSize) : 0;

    if(pageCount === 1) return null;

    const pages = lodash.range(1, pageCount + 1)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * PageSize;
        const paginateCategory = lodash(categories).slice(startIndex).take(PageSize).value()
        setPaginationctegories(paginateCategory)
    }
    return (
        <Layout height="92.2vh" background="rgb(236 236 236)">
            <div className="row mt-2 px-3">
                <div className="col-2 me-auto my-2">
                    <Link to="/category/create" type="button" className="btn btn-success d-flex align-items-center justify-content-evenly" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16" style={{margin: '0 5px'}}>
                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
                        </svg>
                        New Category
                    </Link>
                    
                </div>
                <div className="col-12 bg-white  p-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" style={{fontSize: '.75rem'}}>Name</th>
                                <th scope="col" style={{fontSize: '.75rem'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginateCtegories && paginateCtegories.map((item, i) => (
                                <tr key={i}>
                                    <td style={{fontSize: '.875rem'}}>{item.name}</td>
                                    <td style={{fontSize: '.875rem'}}>
                                        <div className="row">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => categoryById(item._id)} >
                                                    EDIT
                                                </button>

                                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form onSubmit={updateCategory}>
                                                                    <div className="form-group">
                                                                        <label htmlFor="name">Name Category</label>
                                                                        <input type="text" className="form-control" id="name" defaultValue={categoryId && categoryId.name}  placeholder="Update Name" onChange={handleChange}/>
                                                                    </div>
                                                                    <div className="d-grid my-2">
                                                                        <button type="submit" className="btn btn-primary">Update Category</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-6">
                                                <button type="button" className="btn btn-danger" onClick={() => deleteCategory(item._id)}>Delete</button>
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

export default GestionCategory;