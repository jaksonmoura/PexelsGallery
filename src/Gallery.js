import React, {useState, useEffect, useLayoutEffect} from 'react'
import {key} from './PEXELS_KEY.json'

function Gallery(){
    // const [photos, setPhotos] = useState({})
    const searchPhotosUrl = "https://api.pexels.com/v1/search?query=person"
    const curratedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=1"
    // const [photosData, setPhotosData] = useState({
    //     next_page: "",
    //     page: 1,
    //     per_page: 15,
    //     photos: [{
    //         avg_color: "",
    //         height: 0,
    //         id: 0,
    //         liked: false,
    //         photographer: "",
    //         photographer_id: 0,
    //         photographer_url: "",
    //         src: {
    //             landscape: "",
    //             large: "",
    //             large2x: "",
    //             medium: "",
    //             original: "",
    //             small: "",
    //         },
    //         url: "",
    //         width: 0
    //     }],
    //     total_results: 8000
    // })
    const [photosData, setPhotosData] = useState({
        next_page: "",
        page: 1,
        per_page: 15,
        photos: [
            {
                "id": 2014422,
                "width": 3024,
                "height": 3024,
                "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
                "photographer": "Joey Farina",
                "photographer_url": "https://www.pexels.com/@joey",
                "photographer_id": 680589,
                "avg_color": "#978E82",
                "src": {
                  "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
                  "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                  "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
                  "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                  "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                  "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                }
              }
        ],
        total_results: 8000
    })
    const [photos, setPhotos] = useState([
        {
            "id": 2014422,
            "width": 3024,
            "height": 3024,
            "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
            "photographer": "Joey Farina",
            "photographer_url": "https://www.pexels.com/@joey",
            "photographer_id": 680589,
            "avg_color": "#978E82",
            "src": {
                "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
                "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
                "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
                "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
            }
        },
        {
            "id": 3573351,
            "width": 3066,
            "height": 3968,
            "url": "https://www.pexels.com/photo/trees-during-day-3573351/",
            "photographer": "Lukas Rodriguez",
            "photographer_url": "https://www.pexels.com/@lukas-rodriguez-1845331",
            "photographer_id": 1845331,
            "avg_color": "#374824",
            "src": {
                "original": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
                "large2x": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "large": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
                "medium": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
                "small": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
                "portrait": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                "landscape": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                "tiny": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
            },
            "liked": false
        }
    ])
    

    
    useLayoutEffect(() => {
        // fetchData(searchPhotosUrl);
    }, [])

    const fetchData = (url) => {
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': key
            })
        })
        .then(response => {
            if (response.ok) {
                response.json()
                console.log(response)
            } else {
                console.log(response.status)
            }
        })
        .then(data => {
            setPhotosData(data)
            setPhotos(data.photos)
            console.log(photosData)
        })
    }

    const PhotoCard = (props) => {
        return (
            <li><img src={props.photo.medium} alt=""/></li>
        )
    }

    return(
        <ul>
            {photos.map( (photo, idx) => {
                console.log(photo.src)
                return (
                    <PhotoCard key={idx} photo={photo.src} />)
            })
            }
        </ul>
    )
}

export default Gallery