import React, {useContext, createContext} from 'react'
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
    

    const formatAltText = (str) => {
        if (!str){
            return ""
        }
        let strSplit = JSON.stringify(str).split("/")[4].split("-")
        return strSplit.slice(0, strSplit.length -1).join(" ")
    }

    const PhotoCard = (props) => {
        return (
            <li style={{animationDelay: `calc(20ms * ${props.id})`}}>
                <a style={{backgroundColor: props.photo.avg_color}} href={props.photo.url}>
                    <img src={props.photo.src.large} alt={formatAltText(props.photo.url)}/>
                </a>
                <div className="photographer">
                    <span>photo <span id="photo_by">by</span><br />
                        <a aria-labelledby={"photo_by photographer_"+props.photo.id} id={"photographer_"+props.photo.id} href={props.photo.photographer_url}>{props.photo.photographer}</a>
                    </span>
                    <a href={props.photo.src.original} className="download-photo" download={props.photo.src.original} title="Download original size"><i aria-label="" className="material-icons">download</i></a>
                </div>
            </li>
        )
    }
    const MasonryGrid = () => {
        try {
            return (
                <>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                        aria-labelledby="gallery_label">
                        {gallery.photos.map( (photo, idx) => {
                            return <PhotoCard key={photo.id} id={idx} photo={photo} />
                            })
                        }
                    </Masonry>
                    <button className="load-more" onClick={gallery.loadMorePhotos}>Load more photos...</button>
                </>
        )
        }
        catch {
            return <div className="error-msg"><p className="emoji">&#x1F615;</p> <p>I'm sorry for this! The API reached it's limit rate. It'll be reset in 1 hour.</p> </div>
        }
    }

    return(
        <section className="gallery">
            <div className="container">
                <h1 id="gallery_label">{gallery.searchTerm ? `Photos of "${gallery.searchTerm}"` : "Curated"}</h1>
                <MasonryGrid />
            </div>
        </section>
    )
}

export default Gallery