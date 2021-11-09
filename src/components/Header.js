import React from 'react'
import {NavLink} from 'react-router-dom'
import github from '../assets/imgs/github.svg'

function Header() {
    return(
        <header>
            <div className="container">
                <NavLink to="/" exact className={isActive => "current" + (!isActive ? " unselected" : "") + " logo"} aria-label="Pexel Gallery">P.</NavLink>
                <nav>
                    <ul>
                    <li>
                        <NavLink
                            to="/about"
                            className={isActive => "current" + (!isActive ? " unselected" : "")}
                        >about</NavLink>
                    </li>
                    <li><a href="https://github.com/jaksonmoura/PexelsGallery"><img src={github} alt="See project on Github" title="See project on Github" /></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header