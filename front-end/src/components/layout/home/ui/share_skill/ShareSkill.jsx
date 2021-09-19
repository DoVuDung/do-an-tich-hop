import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import iconcmt1 from "../../../../../assets/images/iconcmt1.png"
import iconcmt2 from "../../../../../assets/images/iconcmt2.png"
import iconcmt3 from "../../../../../assets/images/iconcmt3.png"
import "./style.scss"

const commentList = [
    {
        title: "@dovudung",
        name: "Do Vu Dung",
        des: "this is amazing courses for every one who loves IT, bla bla bloa bloa bloe ple ple ple pla bla bla bloa bloa bloe ple ple ple pla",
        icon: iconcmt1,
    },
    {
        title: "@dqhuy",
        name: "Dang Quang Huy",
        des: "this is amazing courses for every one who loves IT",
        icon: iconcmt2,
    },
    {
        title: "@dxchien",
        name: "Dang Xuan Chien",
        des: "this is amazing courses for every one who loves IT",
        icon: iconcmt3,
    },
]

const ShareSkill = () => {
    return (
        <div className="share-skill">
            <Container>
                <p className="share-skill__title">follow us</p>
                <h2 className="share-skill__header">Share Your Skill</h2>
                <div>
                    <Row className="g-4">
                        {commentList.map((item, index) => (
                            <Col md={4} key={index}>
                                <div className="share-skill__card">
                                    <div className="share-skill__card-title d-flex justify-content-flex-start">
                                        <div className="share-skill__card-img">
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-flex-start">
                                            <Link to="/profile">
                                                {item.title}
                                            </Link>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                    <p className="share-skill__card-des">
                                        {item.des}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default ShareSkill
