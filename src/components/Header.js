import React from 'react'
import {Link} from 'react-router-dom'
import github from '../assets/imgs/github.svg'

function Header() {
    return(
        <header>
            <div className="container">
                <Link to="/" className="logo" aria-label="Pexel Gallery">P.</Link>
                <nav>
                    <ul>
                    <li><Link to="/about">about</Link></li>
                    <li><a href="https://github.com/jaksonmoura/PexelsGallery"><img src={github} alt="See project on Github" title="See project on Github" /></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header