import React, {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';

import {API_URL} from './../config'


const Layout = ({ title, description, className, children }) => {

       const [adsence, setAdsence] = useState([])

       async function fetchData() {
        await axios.get(`${API_URL}/adsence/getAll/`)
         .then(response =>{
             const allAds = response.data
             setAdsence(allAds)
         }).catch(error =>{
             console.log(error);
         })
     }

      
 useEffect(() => {
    fetchData()
}, [])
    
    return (
        <div>
            <div className="jumbotron ">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout
