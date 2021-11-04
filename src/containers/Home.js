import React, {useState, useEffect, createContext, useMemo, useCallback} from 'react'
import {key} from '../PEXELS_KEY.json'
import mockdata from '../mockdata.json'
import Header from '../components/Header'
import Search from '../components/Search'
import Gallery from '../components/Gallery'


export const GalleryContext = createContext()

function LandingPage(){
    
    const searchPhotosUrl = "https://api.pexels.com/v1/search?query="
    const curratedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=18"
    const [searchTerm, setSearchTerm] = useState("")
    const searchTermRef = React.useRef("")
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

    const onSearchSubmit = (event, str) =>{
        event.preventDefault()
        let query = str || event.target.searchTerm.value
        let nextTitle = "PexelsGallery"
        let nextURL = ""
        if (query){
            fetchData(`${searchPhotosUrl}=${query}`, false)
            nextTitle += " - Search for "+ query
            nextURL = "/?query=" + query
        } else {
            fetchData(curratedPhotosUrl, false)
        }
        searchTermRef.current.value = query
        changeSearchTerm(query);
         
        window.history.pushState("", nextTitle, nextURL);
    }

    const changeSearchTerm = useCallback((str) => {
        setSearchTerm(str)
    }, [])
    
    useEffect(() => {
        let urlQuery = window.location.search
        if (urlQuery){
            urlQuery = urlQuery.split("=")[1]
            console.log(urlQuery)
            searchTermRef.current.value = urlQuery
            setSearchTerm(urlQuery)
            fetchData(`${searchPhotosUrl}=${urlQuery}`, false)
        } else {
            fetchData(curratedPhotosUrl, false)
        }
        // console.log(window.location.search)
        // setPhotos(mockdata)
    }, [])

    const fetchData = async (url, append = true) => {
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
            if (append){
                setPhotos(prevState => {
                    return [
                        ...prevState,
                        ...data.photos
                    ]
                })
            } else {
                setPhotos(data.photos)
            }
        })
    }

    const loadMorePhotos = (event) =>{
        event.preventDefault()
        let nextPage =  fetchData(photosData.next_page);
        // setPhotos(prevState => {
        //     return [
        //         ...prevState,
        //         ...mockdata
        //     ]
        // })
    }


    return(
        <GalleryContext.Provider value={{
            searchTerm,
            searchTermRef,
            setSearchTerm,
            searchPhotosUrl,
            curratedPhotosUrl,
            photosData,
            setPhotosData,
            photos,
            setPhotos,
            loadMorePhotos,
            onSearchSubmit
        }}>
            <Search />
            <Gallery />
        </GalleryContext.Provider>
    )
}

export default LandingPage