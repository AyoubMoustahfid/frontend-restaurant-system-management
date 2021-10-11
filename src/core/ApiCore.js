  import { API_URL } from './../config';
  import queryString from 'query-string';
  import {isAuthenticated} from "./../auth/helpers"
 
 export const getProducts = (params) => {

    let query = queryString.stringify(params)

    return fetch(`${API_URL}/product?${query}`)
      .then(res => res.json())
      .then(res => res.products)
      .catch(err => console.error(err))

 }

 export const relatedProducts = (id) => {

return fetch(`${API_URL}/product/related/${id}`)
  .then(res => res.json())
  .then(res => res.products)
  .catch(err => console.error(err))

}


export const getBrainTreeToken = (userId, token) => {
  const {user} = isAuthenticated()
  const uri = user.role === "USER" ? `getToken/${userId}` : 
               user.role === "ADMIN" ? `admin/getToken/${userId}`:
               user.role === "SUPER_ADMIN" ? `super-admin/getToken/${userId}` :
               user.role === "FOURNISSEUR" ? `fournisseur/getToken/${userId}` :
               user.role === "EMPLOYEE" ? `employee/getToken/${userId}` : `getToken/${userId}`

  return fetch(`${API_URL}/braintree/${uri}`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
      .then(res => res.json())
}

export const procesPayment = (userId, token, paymentData) => {
  const {user} = isAuthenticated()
  const uri = user.role === "USER" ? `purchase/${userId}` : 
               user.role === "ADMIN" ? `admin/purchase/${userId}`:
               user.role === "SUPER_ADMIN" ? `super-admin/purchase/${userId}` :
               user.role === "FOURNISSEUR" ? `fournisseur/purchase/${userId}` :
               user.role === "EMPLOYEE" ? `employee/purchase/${userId}` : `purchase/${userId}`

  return  fetch(`${API_URL}/braintree/${uri}`, {
       method: "POST",
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
       },
       body: JSON.stringify(paymentData)
   })
   .then(res => res.json())
  
  }

 export const getOneProduct = (id) => {

return  fetch(`${API_URL}/product/${id}`, {
     method: "GET",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     }
 })
 .then(res => res.json())
 .then(res => res.product)
 .catch(err => console.error(err))

}


 
 export const getCategories = () => {

   return  fetch(`${API_URL}/category`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res.categories)
    .catch(err => console.error(err))

}



export const filterProducts = (skip, limit, filters) => {

  const data = {
    skip,
    limit,
    filters
  }

return  fetch(`${API_URL}/product/search`, {
     method: "POST",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
 })
 .then(res => res.json())
 .then(res => res.products)
 .catch(err => console.error(err))

}

export const createOrder = (userId, token, orderData) => {

  return  fetch(`${API_URL}/order/create/${userId}`, {
       method: "POST",
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
       },
       body: JSON.stringify(orderData)
   })
   .then(res => res.json())
  
  }
