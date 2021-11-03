import React, {useContext, createContext} from 'react'
import {GalleryContext} from '../containers/LandingPage';

function Search(){
    const gallery = useContext(GalleryContext)
    // const search = createContext(SearchContext)
    const preQueries = [
        'nature',
        'food',
        'architecture',
        'people'
    ]

    const QueryItem = (props) => {
        return(
            <li><a href={"#"+props.query} onClick={e => {gallery.onSearchSubmit(e, props.query)}}>#{props.query}</a></li>
        )
    }

    return(
        <section className="search">
            <div className="container">
                <form method="get" action="" onSubmit={(e) => {gallery.onSearchSubmit(e)}}>
                    <div className="search-field">
                        <input aria-label="Search" ref={gallery.searchTermRef} type="search" id="searchTerm" name="searchTerm" placeholder="Search for free photos" />
                        <button aria-label="Search"><i className="material-icons">search</i></button>
                    </div>
                    <ul className="pre-queries">
                        {preQueries.map((pq, i) => <QueryItem key={i} query={pq} />)}
                        {/* <li><a href="#nature" value="nature" onClick={gallery.onSearchSubmit}>#nature</a></li>
                        <li><a href="#food" value="food" onClick={gallery.onSearchSubmit}>#food</a></li>
                        <li><a href="#architecture" value="architecture" onClick={gallery.onSearchSubmit}>#architecture</a></li>
                        <li><a href="#people" value="people" onClick={gallery.onSearchSubmit}>#people</a></li> */}
                    </ul>
                </form>
            </div>
        </section>
    )
}

export default Search