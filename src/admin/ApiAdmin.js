import {API_URL} from './../config'


export const listOfOrders = (userId, token) => {

    return fetch(`${API_URL}/order/${userId}`, {
        method: 'GET',
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
     
}

export const getStatus = (userId, token) => {

    return fetch(`${API_URL}/order/status/${userId}`, {
        method: 'GET',
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
     
}


export const updateOrderStatus = (userId, token, orderId, status) => {
    
    return fetch(`${API_URL}/order/${orderId}/status/${userId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({status})
    }).then(res => res.json())
     
}

export const getOneOrder = (orderId, userId, token) => {
    return fetch(`${API_URL}/order/show/${orderId}/${userId}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.json())
} 

export const getOneProduct = (id, userId, token) => {

    return  fetch(`${API_URL}/product/showOneProduct/${id}/${userId}`, {
         method: "GET",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
         }
     })
     .then(res => res.json())
     .then(res => res.product)
     .catch(err => console.error(err))
    
    }