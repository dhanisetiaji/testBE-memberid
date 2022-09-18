import React from 'react'
import { Link } from 'react-router-dom'
import { TbAlignJustified } from 'react-icons/tb'
import { BiFilter } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { AuthLogout } from '../redux/actions/auth'

const Navbar = () => {
    const dispatch = useDispatch()
    return (
        <nav className="navbar mb-3">
            <div className="container">
                <TbAlignJustified className='navbarIcon' data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" />
                <Link className="navbar-brand" to={'/'}>Awards</Link>
                <BiFilter className='navbarIcon2' data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar1" aria-controls="offcanvasNavbar1" />

                <div className="offcanvas leftoff offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                    </div>
                    <div className="offcanvas-body">
                        <div className="container">
                            <img src="../../images/star.png" alt="logo" />
                            <h4>Awards Menu</h4>
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 content">
                                {/* eslint-disable */}
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Cards</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={() => dispatch(AuthLogout())} className="nav-link" aria-current="page" >Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar