import React, {useState, useContext, createContext} from 'react'
import Masonry from 'react-masonry-css'
import {GalleryContext} from '../containers/Home';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

export const SearchContext = createContext()

function Gallery(){
    const gallery = useContext(GalleryContext)
    

    // const formatAltText = (str) => {
    //     let strSplit = JSON.stringify(str).split("/")[4].split("-")
    //     return strSplit.slice(0, strSplit.length -1).join(" ")
    // }

    const PhotoCard = (props) => {
        return (
            <li style={{animationDelay: `calc(20ms * ${props.id})`}}>
                <a style={{backgroundColor: props.photo.avg_color}} href={props.photo.url}>
                    <img src={props.photo.src.large} />
                </a>
                <div className="photographer">
                    <span>photo <span id="photo_by">by</span><br />
                        <a aria-labeledby={"photo_by photographer_"+props.photo.id} id={"photographer_"+props.photo.id} href={props.photo.photographer_url}>{props.photo.photographer}</a>
                    </span>
                    <a href={props.photo.src.original} className="download-photo" download={props.photo.src.original} title="Download original size"><i aria-label="" className="material-icons">download</i></a>
                </div>
            </li>
        )
    }

    return(
        <section className="gallery">
            <div className="container">
                <h1 id="gallery_label">{gallery.searchTerm ? `Photos of "${gallery.searchTerm}"` : "Curated"}</h1>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    ariaLabeledBy="gallery_label"
                    >
                    {gallery.photos.map( (photo, idx) => {
                        return <PhotoCard key={photo.id} id={idx} photo={photo} />
                        })
                    }
                </Masonry>
            </div>
            
            <button className="load-more" onClick={gallery.loadMorePhotos}>Load more photos...</button>
        </section>
    )
}

export default Gallery