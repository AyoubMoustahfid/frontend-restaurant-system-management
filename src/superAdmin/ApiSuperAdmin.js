import { API_URL } from './../config';

export const getAllFournisseur = (userId, token) => {

  return fetch(`${API_URL}/super-admin/all-fournisseur/${userId}`, {
      method: 'GET',
      headers: {
          "Accept": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
    .then(res => res.json())

}

export const getAllAdmin = (userId, token) => {

    return fetch(`${API_URL}/super-admin/all-admin/${userId}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
      .then(res => res.json())
  
  }