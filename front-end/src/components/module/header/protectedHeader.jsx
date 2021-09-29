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

const protectedHeader = () => {
  return (
    <div className="header" id="header">
      <Container className="header__container justify-content-between">
        <div className="header__img-wrapper">
          <Link>
            <img src={logo} alt="logo Guru Academy" />
          </Link>
        </div>
        <Nav className="header__menu d-none d-lg-flex">
          <Link to='/course'>
            for you
          </Link>
          <Link to='/course'>
            live stream
          </Link>
          <form action="">
            <input type="text" />
            <div>
              <BiSearch />
            </div>
          </form>
          <Link to='/'>
            share your work
          </Link>
        </Nav>
      </Container>
    </div>
  )
}

export default protectedHeader
