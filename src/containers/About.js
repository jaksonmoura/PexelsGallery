import React, {useEffect, useState} from 'react'
import {key} from '../PEXELS_KEY.json'

const About = () => {

    const [singlePhoto, setSinglePhoto] = useState({
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
    })

    const fetchSingle = async () => {
        // Had to use async because setPhotos, apparently,
        // was firing before data was downloaded
        const response = await fetch("https://api.pexels.com/v1/search?per_page=1&query=plants", {
            method: 'GET',
            headers: new Headers({
                'Authorization': key
            })
        })
        response.json().then(data => {      
            setSinglePhoto(data.photos[0])
            console.log(data.photos) 
        })
    }

    
    useEffect(() => {
        fetchSingle()
    },[])

    

    return(
            <div className="about-container">
                <div className="about-pic" role="presentation">
                    <img src={singlePhoto.src.large} alt="" />
                </div>
                <div className="about-text">
                    <h1>About this project</h1>
                    <p>Hi! My name is Jakson Moura.</p>
                    <p>This project was my first on my journey to learn React.</p>
                    <p>I chose this Pexel clone so I could learn a lot but not feel overwhelmed with too many features to develop.</p>
                    <p>In this project I created my own CSS, basic React and a css component call <a href="https://www.npmjs.com/package/react-masonry-css">React Masonry</a>. I also tried to make it as accessible as I could. On that note, I had to improvise on the photo description, since currently the API doesn't provide a description property, so I sewed up the text from the photo's url.</p>

                    <p className="thanks">Thank you for taking the time to browse here!</p>
                </div>
                
            </div>
    )
}

export default About