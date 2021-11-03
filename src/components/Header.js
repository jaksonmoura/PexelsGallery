import React from 'react'

function Header() {
    return(
        <header>
            <div className="container">
                <a href="/" className="logo">P.</a>
                <nav>
                    <ul>
                    <li><a href="#">about</a></li>
                    <li><a href="#git">github</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header