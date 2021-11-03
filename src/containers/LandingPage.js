import React, {useState, useEffect, createContext} from 'react'
import {key} from '../PEXELS_KEY.json'
import mockdata from '../mockdata.json'
import Header from '../components/Header'
import Search from '../components/Search'
import Gallery from '../components/Gallery'


export const GalleryContext = createContext()

function LandingPage(){
    
    const searchPhotosUrl = "https://api.pexels.com/v1/search?query=nature"
    const curratedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=1"
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
    
    useEffect(() => {
        // fetchData(searchPhotosUrl);
        setPhotos(mockdata)
    }, [])

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


    return(
        <GalleryContext.Provider value={{
            // searchTerm,
            // setSearchTerm,
            searchPhotosUrl,
            curratedPhotosUrl,
            photosData,
            setPhotosData,
            photos,
            setPhotos,
            loadMorePhotos
        }}>
        <Header />
        <main>
            <Search />
            <Gallery />
        </main>
        </GalleryContext.Provider>
    )
}

export default LandingPage

