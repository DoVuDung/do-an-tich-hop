import "./header.scss"
import React, { useState, useContext } from "react"
import { Container, Nav } from "react-bootstrap"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { BsBell, BsCaretDownFill } from "react-icons/bs"
import logo from "../../../assets/images/logoGuru.png"
import avatar from "../../../assets/images/avatar.png"
import { UserContext } from "../../../context/userContext"

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

  const { authState: {isAuthenticated} } = useContext(UserContext)
  console.log(isAuthenticated)

  const body = () => {
    if (!isAuthenticated)
      return (
        <button className="button header__search-signIn">
          <Link to="/signin" className="translate-hover">
            Sign in
          </Link>
        </button>
      )
    else return (
      <>
        <button className="button header__search-button">
          <BsBell />
        </button>
        <div
          className="d-flex align-items-center px-2"
          style={{ height: "50px" }}
        >
          <div className="header__avatar" style={{cursor: 'pointer'}}>
            <img src={avatar} alt="" />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="header" id="header">
      <Container className="header__container justify-content-between">
        <div className="header__img-wrapper">
          <Link>
            <img src={logo} alt="logo Guru Academy" />
          </Link>
        </div>
        <Nav className="header__menu d-none d-lg-flex ">
          {headerItems.map((item, index) => (
            <Nav.Item key={index}>
              <Link to={`${item.path}`} className="nav-link translate-hover">
                {item.title}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="header__search d-none d-lg-flex">
          <button className="button header__search-button">
            <BiSearch />
          </button>
          {
            body()
          }
        </div>

        {/* off canvas button */}
        <button
          onClick={() => {
            setShowOffcanvas(true)
          }}
          className="header__offcanvas-button d-block d-lg-none"
        >
          <GiHamburgerMenu />
        </button>
      </Container>
      {/* menu off canvas */}
      <Offcanvas
        onHide={() => {
          setShowOffcanvas(false)
        }}
        show={showOffcanvas}
      >
        <Offcanvas.Header closeButton className="mb-5">
          <Offcanvas.Title>GuruAcademy</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="d-flex flex-column">
            {headerItems.map((item, index) => (
              <Nav.Item key={index} className="header__offcanvas-item">
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
