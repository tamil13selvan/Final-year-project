import React from 'react'
import {Link} from 'react-router-dom'
function Header() {
  return (
    <>  

        <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/"><h1 className='display-3'>MOVERS AND CLEANERS</h1></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto ">
                <li className="nav-item">
                <Link className="nav-link active mx-4" aria-current="page" to="/About">About</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active mx-4" aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active mx-4" aria-current="page" to="/clientsignup">Signup</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active mx-4" aria-current="page" to="/help">Contact Us</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active mx-4" aria-current="page" to="/services">Services</Link>
                </li>
            </ul>
            </form>
            </div>
            </div>
            <hr />
        </nav>
    </>
  )
}
export default Header
        
        