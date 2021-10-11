import {API_URL} from "./../config"
import queryString from "query-string"


export const getFournisseurById = (id, token) => {
   return fetch(`${API_URL}/fournisseur/byId/${id}`, {
       method: "GET",
       headers: {
           'Accept': 'application/json',
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }).then(res => res.json());
}


export const getAllFruitByFournisseur = (id, token) => {
    return fetch(`${API_URL}/fruit/all-fruit/${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.json());
}

export const deleteFruit = (id, userId, token) => {
    return fetch(`${API_URL}/fruit/delete/${id}/${userId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.json())
      
}


// ================ VEGETABLE ==================

export const getAllVegetableByFournisseur = (id, token) => {
    return fetch(`${API_URL}/vegetable/all-vegetable/${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.json());
}