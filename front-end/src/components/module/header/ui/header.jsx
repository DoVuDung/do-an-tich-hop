import React, {useState} from "react"
import { Container, Nav } from "react-bootstrap"
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../../../assets/images/logoGuru.png"
import "./header.scss"

const headerItems = [
    {
        title: "course",
        path: "/course",
    },
    {
        title: "about",
        path: "/about",
    },
    {
        title: "category",
        path: "/category",
    },
]

const Header = () => {

    const [showOffcanvas, setShowOffcanvas] = useState(false)

    

    return (
        <div className="header" id="header">
            <Container className="header__container justify-content-between">
                <div className="header__img-wrapper">
                    <Link>
                        <img src={logo} alt="logo Guru Academy" />
                    </Link>
                </div>
                <Nav className="header__menu d-none d-lg-flex">
                    {headerItems.map((item, index) => (
                        <Nav.Item key={index}>
                            <Link
                                to={`${item.path}`}
                                className="nav-link translate-hover"
                            >
                                {item.title}
                            </Link>
                        </Nav.Item>
                    ))}
                </Nav>
                <div className="header__search d-none d-lg-flex">
                    <button className="button header__search-button">
                        <BiSearch />
                    </button>
                    <button className="button header__search-signIn">
                        <Link to="/signin" className="translate-hover">
                            Sign in
                        </Link>
                    </button>
                </div>
                <button 
                    onClick={() => {setShowOffcanvas(true)}} 
                    className='header__offcanvas-button d-block d-lg-none'
                >
                    <GiHamburgerMenu />
                </button>
            </Container>
            {/* menu off canvas */}
            <Offcanvas onHide={() => {setShowOffcanvas(false)}} show={showOffcanvas}>
                <Offcanvas.Header closeButton className='mb-5'>
                    <Offcanvas.Title>GuruAcademy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className='d-flex flex-column'>
                    {headerItems.map((item, index) => (
                        <Nav.Item key={index} className='header__offcanvas-item'>
                            <Link
                                to={`${item.path}`}
                                className="nav-link header__offcanvas-link"
                            >
                                {item.title}
                            </Link>
                        </Nav.Item>
                    ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Header
