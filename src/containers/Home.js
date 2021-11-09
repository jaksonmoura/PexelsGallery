import React, {useState, useEffect, createContext, useCallback} from 'react'
// import mockdata from '../mockdata.json'
import Search from '../components/Search'
import Gallery from '../components/Gallery'
import Modal from '../components/Modal'

export const GalleryContext = createContext()

function LandingPage(){
    const searchPhotosUrl = "https://api.pexels.com/v1/search?query="
    const curatedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=18"

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

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [photo, setPhoto] = useState({
        img: {
            "id": 0,
            "photographer": "",
            "src": {
                "original": "",
                "large2x": "",
                "large": "",
            }
        }
    })

    function openModal(){
        setIsModalOpen(true)
    }

    // function closeModal(){
    //     setIsModalOpen(false)
    // }

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
            fetchData(curatedPhotosUrl, false)
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
            searchTermRef.current.value = urlQuery
            setSearchTerm(urlQuery)
            fetchData(`${searchPhotosUrl}=${urlQuery}`, false)
        } else {
            fetchData(curatedPhotosUrl, false)
        }
    }, [])

    const fetchData = async (url, append = true) => {
        // Had to use async because setPhotos, apparently,
        // was firing before data was downloaded
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': process.env.REACT_APP_PEXELS_KEY
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
        fetchData(photosData.next_page);
    }


    const fetchPhoto = async (id) => {
        const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': process.env.REACT_APP_PEXELS_KEY
            })
        })
        response.json().then(data => {
            // openModalRef.current = data
            // setOpenModal({img: data})
            setPhoto(data)
            openModal()
        })
    }
    
    const openModalBtn =    (event, imgId) =>{
        event.preventDefault()
        event.stopPropagation()
        fetchPhoto(imgId)
        // document.querySelector("body").style.overflow = "hidden";
    }

    

    return(
        <GalleryContext.Provider value={{
            searchTerm,
            searchTermRef,
            setSearchTerm,
            searchPhotosUrl,
            curatedPhotosUrl,
            photosData,
            setPhotosData,
            photos,
            setPhotos,
            loadMorePhotos,
            onSearchSubmit,
            openModal,
            openModalBtn
        }}>
            <Search />
            <Gallery />
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} photo={photo} />
        </GalleryContext.Provider>
    )
}

export default LandingPage