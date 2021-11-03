import React, {useState, useContext, createContext} from 'react'
import Masonry from 'react-masonry-css'
import {GalleryContext} from '../containers/LandingPage';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

export const SearchContext = createContext()

function Gallery(){
    const gallery = useContext(GalleryContext)
    const [searchTerm, setSearchTerm] = useState("Curated")
    

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
        <SearchContext.Provider value={{
            searchTerm, 
            setSearchTerm
        }}>
        <section className="gallery">
            <div className="container">
                <h1>{gallery.searchTerm}</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {gallery.photos.map( (photo, idx) => {
                        return <PhotoCard key={photo.id} id={idx} photo={photo} />
                        })
                    }
                </Masonry>
            </div>
            
            <button className="load-more" onClick={gallery.loadMorePhotos}>Load more photos...</button>
        </section>
        </SearchContext.Provider>
    )
}

export default Gallery