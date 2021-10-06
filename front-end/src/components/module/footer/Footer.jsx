import React from "react"
import { Container, Row, Col, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import apple from "../../../assets/images/apple.png"
import ggplay from "../../../assets/images/ggplay.png"
import "./style.scss"
import { AiOutlineFacebook , AiFillTwitterSquare, AiFillGithub } from "react-icons/ai"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <Container className='border-md-0'>
                    <Row className="g-4">
                        <Col sm={6} md={3} lg={3}>
                            <div className="footer__col">
                                <h2 className="footer__col-header">
                                    GuguAcademy
                                </h2>
                                <div className="footer__col-menu">
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        careers
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        Blogs
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        Parnerships
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3} lg={3}>
                            <div className="footer__col">
                                <h2 className="footer__col-header">
                                    Community
                                </h2>
                                <div className="footer__col-menu">
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        careers
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        Blogs
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        Partnerships
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3} lg={3}>
                            <div className="footer__col">
                                <h2 className="footer__col-header">Teaching</h2>
                                <div className="footer__col-menu">
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        become a teacher
                                    </Link>
                                    <Link
                                        to="/"
                                        className="footer__col-menu-text"
                                    >
                                        Teaching in GuruAcademy
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3} lg={3}>
                            <div className="footer__col">
                                <h2 className="footer__col-header">Teaching</h2>
                                <div className="footer__col-menu">
                                    <div className="footer__col-menu-img">
                                        <img src={apple} alt="" />
                                    </div>
                                    <div className="footer__col-menu-img">
                                        <img src={ggplay} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom d-none d-lg-block">
                <Container
                    className='d-flex align-items-center px-0'
                >
                <p className='mb-0 mt-0 footer-bottom-inc'>@GuruAcademy, Inc, 2021</p>
                <Nav
                    className='flex-grow-1 ms-5 ps-3'
                >
                    <Nav.Item>
                        <Nav.Link as={Link} to="/"className='footer-bottom-link'> 
                            Help
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" className='footer-bottom-link'>
                            Privacy
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" className='footer-bottom-link'>
                            Terms
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <a
                            href="https://fb.com"
                            className="nav-link social-link"
                        >
                            <AiOutlineFacebook />
                        </a>
                    </Nav.Item>
                    <Nav.Item>
                        <a
                            href="https://fb.com"
                            className="nav-link social-link"
                        >
                            <AiFillTwitterSquare />
                        </a>
                    </Nav.Item>
                    <Nav.Item>
                        <a
                            href="https://fb.com"
                            className="nav-link social-link"
                        >
                            <AiFillGithub />
                        </a>
                    </Nav.Item>
                </Nav>
                </Container>
            </div>
        </div>
    )
}

export default Footer
