import React, {useContext} from 'react'
import {GalleryContext} from '../containers/Home';

function Search(){
    const gallery = useContext(GalleryContext)
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
                    <ul className="pre-queries" aria-label="Search suggestions">
                        {preQueries.map((pq, i) => <QueryItem key={i} query={pq} />)}
                    </ul>
                </form>
            </div>
        </section>
    )
}

export default Search