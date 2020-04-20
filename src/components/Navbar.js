import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/#">Navbar</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/#home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sobre">Add Series</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
