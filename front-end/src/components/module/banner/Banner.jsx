import "./style.scss"
import React from "react"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

const Banner = () => {
    return (
        <div className="banner">
            <Container>
                <div className="banner__content">
                    <h1 className="banner__header">
                        Build better
                        <br />
                        Learn Better
                    </h1>
                    <Link to="plan" className='banner__button'>view plan</Link>
                    <div className="banner__intro">
                        GuruAcademy
                        <p>#GuruAcademy</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Banner
