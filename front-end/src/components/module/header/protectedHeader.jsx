import "./header.scss"
import React from "react"
import { Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { BsBell } from "react-icons/bs"
import { FiMail } from "react-icons/fi";
import logo from "../../../assets/images/logoGuru.png"
import avatar from "../../../assets/images/avatar.png"
import { UserContext } from "../../../context/userContext"

const protectedHeader = () => {
  return (
    <div className="header" id="header">
      <Container className="header__container justify-content-between">
        <div className="header__img-wrapper">
          <Link>
            <img src={logo} alt="logo Guru Academy" />
          </Link>
        </div>
        <Nav className="header__menu d-none d-lg-flex" style={{flexGrow: '0', margin: '0'}}>
          <Nav.Item>
            <Link to="/course" className="nav-link">
              for you
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/course" className="nav-link">
              live stream
            </Link>
          </Nav.Item>
          <form action="" className="header__menu-form nav-item" >
            <input type="text"/>
            <div className='button header__menu-form-button'>
              <BiSearch />
            </div>
          </form>
          <Nav.Item
            style={{
              border: '1px solid #ccc',
              borderRadius: '25px',
            }}
          >
            <Link to="/" className="nav-link py-1 px-3">
              share your work
            </Link>
          </Nav.Item>
        </Nav>

        <div className="header__search d-none d-lg-flex">
        <button className="button header__search-button ms-1">
            <FiMail />
          </button>

          <button className="button header__search-button ms-1">
            <BsBell />
          </button>
          <div
            className="d-flex align-items-center px-2"
            style={{ height: "50px" }}
          >
            <div className="header__avatar" style={{ cursor: "pointer" }}>
              <img src={avatar} alt="" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default protectedHeader
