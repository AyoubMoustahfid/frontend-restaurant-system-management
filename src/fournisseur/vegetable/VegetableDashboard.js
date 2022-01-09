import React,{ useState, useEffect} from 'react'
import Layout from "../Layout"
import {API_URL} from "./../../config"
import {isAuthenticated} from "./../../auth/helpers"
import toastr from 'toastr';
import "toastr/build/toastr.css";
import lodash from "lodash"

import {getFournisseurById, getAllVegetableByFournisseur, deleteFruit} from "./../ApiFournisseur"
import { Line } from 'react-chartjs-2';

const PageSize = 2;
function VegetableDashboard() {

    const { user, token } = isAuthenticated();

    const [fournisseur, setFournisseur] = useState("")
    const [elements, setElements] = useState("")
    const [active, setActive] = useState(false)
    const [vegetables, setVegetables] = useState({
        photo: '',
        name: '',
        price : 0,
        quantity: 0,
        package: 0,
        fournisseur: 0
    })
    const [vegetableId, setVegetableId] = useState({})
    const [vegetableUpdate, setVegetableUpdate] = useState("")
    const [formData, setFormData] = useState(new FormData())
    
    // ********** state to pagination ********* 
    const [paginateFruits, setPaginationFruits] = useState();
    const [currentPage, setCurrentPage] = useState(1)


    const handleChange = (e) => {
        const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;
       formData.set(e.target.id, value)
       
       setVegetables({...vegetables , [e.target.id] : value})
    } 

    const handleUpdateVegetable = (e) => {
        const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.id, value)
        setVegetableUpdate({...vegetableUpdate , [e.target.id] : value})
    }
    // *********** CREATE FRUIT *****************
    const submitFruit = e  => {
        e.preventDefault()
        
        fetch(`${API_URL}/vegetable/create/${user._id}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            
            }
            toastr.success(`Fruit ${vegetables.name} created`, 'new Fruit', {
                positionClass: "toast-bottom-left",
            })

            setVegetables({
                photo: '',
                name: '',
                price : 0,
                quantity: 0,
                fournisseur: 0
            })

            setFormData(new FormData())
            setActive(true)
            window.location.reload();
        }).catch(err =>  toastr.error(err, 'Server error !', {
            positionClass: "toast-bottom-left",
        }))
    }


       //*********** GET FRUIT BY ID ************
       const vegetableById = async  (id) => {
        await fetch(`${API_URL}/vegetable/${id}`, {
           method: 'GET',
           headers: {
               "Content-Type": "application/json"
              }
          }).then(res => res.json())
          .then( res => {
              localStorage.setItem("vegetable", JSON.stringify(res.vegetable))
               setVegetableId(res.vegetable)
          }).catch(err => console.error(err))
        }

             // =============== PUT ONE CATEGORY =================
      const updateFruit = async  (e) => {
        e.preventDefault();

        const {user, token} = isAuthenticated();
        const vegetable = await JSON.parse(localStorage.getItem('vegetable'))
        console.log(vegetable._id);
        fetch(`${API_URL}/vegetable/update/${vegetable._id}/${user._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then(res => res.json())
          .then(res => {
              if(res.error){
                  toastr.warning(res.error, 'Please Check your form !!', {
                      positionClass: "toast-bottom-left",
                  })
              }
              
            toastr.success(`Fruit is Updated`, 'Update is Successfully', {
                positionClass: "toast-bottom-left",
            })
            localStorage.removeItem('vegetable')
            console.log(res.vegetable);
            setVegetableUpdate(res.vegetable)
            setActive(true)
            window.location.reload();

          }).catch(err =>  toastr.error(err, 'Server error !', {
            positionClass: "toast-bottom-left",
        }))
    }

    useEffect(() => {
        getFournisseurById(user._id, token)
            .then(res => {
                setFournisseur(res.fournisseur)
                console.log(res);
            }).catch(err => console.error(err, 'Server error !'))
        
            getAllVegetableByFournisseur(user._id, token)
                .then(res => {
                    console.log(res.vegetable)
                    setElements(res.vegetable)
                    setPaginationFruits(lodash(res.vegetable).slice(0).take(PageSize).value())
                }).catch(err => console.error(err, 'Server error !'))
    }, [])


    //  ********************* PAGINATION TABLE ORDER ******************
    const pageCount = elements ? Math.ceil(elements.length/PageSize) : 0;

    if(pageCount === 1) return null;

    const pages = lodash.range(1, pageCount + 1)

    const pagination = (pageNumber) => {
      setCurrentPage(pageNumber);
      const startIndex = (pageNumber - 1) * PageSize;
      const paginateCategory = lodash(elements).slice(startIndex).take(PageSize).value()
      setPaginationFruits(paginateCategory)
    }

    const array = []
    const valeur = []

    console.log(elements && elements.forEach(item => array.push(item.name)))
    console.log(elements && elements.forEach(item => valeur.push(item.package)))

    return (
        <Layout>
        <div className="row px-3">
            <div className="col-12 bg-white my-2">
                <div className="row justify-content-between">
                        <div className="col-12   bg-white p-3">
                             <Line
                                data={{
                                labels: array,
                                datasets: [
                                    {
                                    label: 'Stock Fruit',
                                    data: valeur,
                                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                                    hoverBackgroundColor: ['rgba(255, 99, 132, 0.2)'],
                                    borderColor: ['rgba(255, 99, 132, 1)'],
                                    borderWidth: 1,
                                    },
                                    
                                ],
                                }}
                                height={400}
                                width={600}
                                options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                    {
                                        ticks: {
                                        beginAtZero: true,
                                        },
                                    },
                                    ],
                                },
                                legend: {
                                    labels: {
                                    fontSize: 25,
                                    },
                                },
                                }}
                            />
                            
                            
                        </div>
                    </div>
                <div className="row align-items-center p-2">
                    <div className="col-6">
                        <h2 className="page-heading">Hi,Welcome Back!</h2>
                        <p className="mb-0">Add Vegetables in your store</p>
                    </div>
                    <div className="col-6 text-end">
                        <button type="button" className="btn btn-success text-center" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                            Create Fruit
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg mx-2" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                            </svg>
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitFruit}> 
                                    <div className="mb-3 text-start">
                                        <label htmlFor="photo" className="form-label">Photo :</label>
                                        <input type="file" className="form-control" id="photo" name="photo" onChange={handleChange} />
                                    </div>

                                    <div className="mb-3 text-start">
                                        <label htmlFor="name" className="form-label">Name : </label>
                                        <input type="text" className="form-control" id="name" name="name" required onChange={handleChange}/>
                                    </div>

                                    <div className="mb-3 text-start">
                                        <label htmlFor="price" className="form-label">Price :</label>
                                        <input type="number" className="form-control" id="price" name="price" required onChange={handleChange}/>
                                    </div>

                                    <div className="mb-3 text-start">
                                        <label htmlFor="quantity" className="form-label">Quantity : </label>
                                        <input type="number" className="form-control" id="quantity" name="quantity" required onChange={handleChange}/>
                                    </div>

                                    <div className="mb-3 text-start">
                                        <label htmlFor="package" className="form-label">Package : </label>
                                        <input type="number" className="form-control" id="package" name="package" required onChange={handleChange}/>
                                    </div>

                                    <div className="mb-3 text-start">
                                        <label htmlFor="fournisseur" className="form-label">Fournisseur</label>
                                        <select value={vegetables.fournisseur} onChange={handleChange} name="fournisseur" id="fournisseur" className="form-control">
                                            <option value="0">Select a Fournisseur</option>
                                            <option value={fournisseur._id}>{fournisseur.name}</option>
                                        </select>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss={active ? "" : "modal"}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 bg-white pt-3">
            <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col-2" style={{fontSize: '.75rem'}}>Fruit</th>
                            <th scope="col-4" style={{fontSize: '.75rem'}}>Name</th>
                            <th scope="col-3" style={{fontSize: '.75rem'}}>Price</th>
                            <th scope="col-3" style={{fontSize: '.75rem'}}>Quantity</th>
                            <th scope="col-3" style={{fontSize: '.75rem'}}>Package</th>
                            <th scope="col-4" style={{fontSize: '.75rem'}}>Fournisseur</th>
                            <th scope="col-4" style={{fontSize: '.75rem'}}>Name Société</th>
                            <th scope="col-3" style={{fontSize: '.75rem'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {paginateFruits && paginateFruits.map((item, i) => (
                            <tr key={item._id}>
                                <th >
                                    <img  src={`${API_URL}/vegetable/photo/${item._id}`} alt={`${item.name}`} width="100px" />
                                </th>
                                <td><span style={{fontSize: '1.2rem'}}>{item.name}</span></td>
                                <td><span style={{fontSize: '1.2rem'}}>{item.price} DH </span></td>
                                <td><span style={{fontSize: '1.2rem'}}>{item.quantity} kg</span></td>
                                <td><span style={{fontSize: '1.2rem'}}>{item.package} Pack</span></td>
                                <td><span style={{fontSize: '1.2rem'}}>{fournisseur.name}</span></td>
                                <td><span style={{fontSize: '1.2rem'}}>{fournisseur.nameSociety}</span></td>
                                <td>
                                    <div className="d-flex justify-content-evenly">
                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateVegetable"  onClick={() => vegetableById(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil mx-2" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                        </button>
                                        <div className="modal fade" id="updateVegetable" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={active}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={updateFruit}> 
                                                        <div className="mb-3">
                                                            <label htmlFor="photo" className="form-label">Photo :</label>
                                                            <input type="file" className="form-control" id="photo" name="photo" onChange={handleUpdateVegetable} />
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Name : </label>
                                                            <input type="text" className="form-control" id="name" name="name" required onChange={handleUpdateVegetable} defaultValue={vegetableId && vegetableId.name}/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="price" className="form-label">Price :</label>
                                                            <input type="number" className="form-control" id="price" name="price" required onChange={handleUpdateVegetable} defaultValue={vegetableId && vegetableId.price}/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="quantity" className="form-label">Quantity : </label>
                                                            <input type="number" className="form-control" id="quantity" name="quantity" required onChange={handleUpdateVegetable} defaultValue={vegetableId && vegetableId.quantity}/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="package" className="form-label">Package : </label>
                                                            <input type="number" className="form-control" id="package" name="package" required onChange={handleUpdateVegetable} defaultValue={vegetableId &&  vegetableId.package}/>
                                                        </div>

                                                        <div className="d-grid">
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss={active ? "" : "modal"}>Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => deleteFruit(item._id, user._id, token)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash mx-2" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                               
                            </tr>
                        ))}
                        
                    </tbody>
                </table>

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

export default VegetableDashboard
