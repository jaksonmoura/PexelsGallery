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

function Gallery(){
    const [searchTerm, setSearchTerm] = useState("Curated")
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

    const PhotoCard = (props) => {
        // console.log(props)
        return (
            <li style={{animationDelay: `calc(20ms * ${props.id})`}}>
                <a style={{backgroundColor: props.photo.avg_color}} href={props.photo.url}>
                    <img src={props.photo.src.large} alt=""/>
                </a>
                <div className="photographer">
                    <span>photo by <br />
                        <a href={props.photo.photographer_url}>{props.photo.photographer}</a>
                    </span>
                    <a href={props.photo.src.original} className="download-photo" download={props.photo.src.original} title="Download original size"><i aria-label="" className="material-icons">download</i></a>
                </div>
            </li>
        )
    }

    return(
        <section className="gallery">
            <div className="container">
                <h1>{searchTerm}</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {photos.map( (photo, idx) => {
                        return <PhotoCard key={photo.id} id={idx} photo={photo} />
                        })
                    }
                </Masonry>
            </div>
            
            <button className="load-more" onClick={loadMorePhotos}>Load more photos...</button>
        </section>
    )
}

export default Gallery