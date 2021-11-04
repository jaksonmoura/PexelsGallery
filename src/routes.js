import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './containers/Home'
import About from './containers/About'
import Header from './components/Header'


const Routes = () => {
    return(
        <BrowserRouter>
            <Header />
            <main>
                <Route component={Home} path="/" exact />
                <Route component={About} path="/about" exact />
            </main>
        </BrowserRouter>
    )
}

export default Routes