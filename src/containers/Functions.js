import React, {useState, useEffect} from 'react'
import {key} from '../PEXELS_KEY.json'
import mockdata from '../mockdata.json'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };


  function Functions(){

      
      
      const [searchTerm, setSearchTerm] = useState("Curated")
      const searchPhotosUrl = "https://api.pexels.com/v1/search?query="
      const curratedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=15"
      const [photosData, setPhotosData] = useState({
          next_page: "",
        page: 1,
        per_page: 15,
        photos: [{
            avg_color: "",
            height: 0,
            id: 0,
            liked: false,
            photographer: "",
            photographer_id: 0,
            photographer_url: "",
            src: {
                "original": "",
                "large2x": "",
                "large": "",
                "medium": "",
                "small": "",
                "portrait": "",
                "landscape": "",
                "tiny": ""
            },
            url: "",
            width: 0
        }],
        total_results: 0
    })
    
    const [photos, setPhotos] = useState([
        {
            "id": 0,
            "width": 0,
            "height": 0,
            "url": "",
            "photographer": "",
            "photographer_url": "",
            "photographer_id": 0,
            "avg_color": "",
            "src": {
                "original": "",
                "large2x": "",
                "large": "",
                "medium": "",
                "small": "",
                "portrait": "",
                "landscape": "",
                "tiny": "",
            },
            "liked": false
        }
    ])
    
    
    const loadMorePhotos = (event) =>{
        event.preventDefault()
        // let nextPage =  fetchData(photosData.next_page);
        setPhotos(prevState => {
            return [
                ...prevState,
                ...mockdata
            ]
        })
        
    }
    
    const fetchData = async (url) => {
        // Had to use async because setPhotos, apparently,
        // was firing before data was downloaded
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': key
            })
        })
        response.json().then(data => {
            setPhotosData(data)
            setPhotos(prevState => {
                return [
                    ...prevState,
                    ...data.photos
                ]
            })
            console.log(photos)
        })
    }
}

export default Functions