import React, {useContext} from 'react'
import {GalleryContext} from '../containers/LandingPage';
import {SearchContext} from './Gallery';

function Search(){
    const gallery = useContext(GalleryContext)
    const search = useContext(SearchContext)

    const onSearchSubmit = (event, query) =>{
        event.preventDefault()
        if (query){
            console.log(query)
        }
    }

    return(
        <section className="search">
            <div className="container">
                <form action="" onSubmit={onSearchSubmit}>
                    <div className="search-field">
                        <input aria-label="Search" type="search" onChange={(e) => search.setSearchTerm(e.target.value)} name="query" placeholder="Search for free photos" />
                        <button aria-label="Search"><i className="material-icons">search</i></button>
                    </div>
                    <p>{search.searchTerm}</p>
                    <ul className="pre-queries">
                        <li><a href="#nature" onClick={(e) => onSearchSubmit(e, "nature")}>#nature</a></li>
                        <li><a href="#food" onClick={(e) => onSearchSubmit(e, "food")}>#food</a></li>
                        <li><a href="#architecture" onClick={(e) => onSearchSubmit(e, "architecture")}>#architecture</a></li>
                        <li><a href="#people" onClick={(e) => onSearchSubmit(e, "people")}>#people</a></li>
                    </ul>
                </form>
            </div>
        </section>
    )
}

export default Search