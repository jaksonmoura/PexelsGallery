import React from 'react'
import github from '../assets/imgs/github.svg'

function Header() {
    return(
        <header>
            <div className="container">
                <a href="/" className="logo">P.</a>
                <nav>
                    <ul>
                    <li><a href="#">about</a></li>
                    <li><a href="#git"><img src={github} /></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header