import "./header.scss"
import React, { useEffect, useRef } from "react"
import { Container, Nav } from "react-bootstrap"
import { useState } from 'react'
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { BsBell } from "react-icons/bs"
import { FiMail } from "react-icons/fi";
import logo from "../../../assets/images/logoGuru.png"
import avatar from "../../../assets/images/avatar.png"
import { UserOption } from './user_option'

const ProtectedHeader = () => {
  const [isToggleUserOption, setIsToggleUserOption] = useState(false)
  const headerRef = useRef()

  useEffect(() => {
    const windowScroll = window.addEventListener('scroll', () => {
      if(window.pageYOffset > headerRef.current?.offsetTop + 300) {
        headerRef.current?.classList.add('fixed')
      } else headerRef.current?.classList.remove('fixed')
      })
      return () => {
        window.removeEventListener('scroll', windowScroll)
      }
      // eslint-disable-next-line
  }, [])

  return (
    <div className="header" id="header" ref={headerRef}>
      <Container className="header__container justify-content-between">
        <div className="header__img-wrapper">
          <Link to='/'>
            <img src={logo} alt="logo Guru Academy" />
          </Link>
        </div>
        <Nav className="header__menu d-none d-lg-flex" style={{flexGrow: '0', margin: '0'}}>
          <Nav.Item>
            <Link to="/courses" className="nav-link">
              for you
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/course" className="nav-link">
              live stream
            </Link>
          </Nav.Item>
          <form action="" className="header__menu-form nav-item py-0">
            <input type="text"/>
            <div className='button header__menu-form-button'>
              <BiSearch />
            </div>
          </form>
          <Nav.Item
          >
            <Link to="/" className="nav-link py-1 px-3"
            style={{
              border: '1px solid #ccc',
              borderRadius: '25px',
            }}>
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
            style={{ height: "50px", position: 'relative' }}
            onClick={(e) => {
              window.addEventListener('click', () => {setIsToggleUserOption(false)})
              setIsToggleUserOption(!isToggleUserOption)
              e.stopPropagation()
            }}
          >
            <div className="header__avatar" style={{ cursor: "pointer"}} >
              <img src={avatar} alt="" />
            </div>
            {isToggleUserOption &&  <UserOption />}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProtectedHeader
