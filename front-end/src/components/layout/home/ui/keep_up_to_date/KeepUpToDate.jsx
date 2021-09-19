import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import error from "../../../../../assets/images/errorCourse.png"
import "./style.scss"

const KeepUpToDate = () => {
    return (
        <div className="keep-up">
            <Container>
                <h2 className="keep-up__header">keep up to date</h2>
                <p className="keep-up__ads">Discover more about GuruAcademy</p>
                <div>
                    <Row className="g-5">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Col  sm={6} lg={3}>
                                <Card className="keep-up__card py-3">
                                    <div className="position-relative overflow-hidden" style={{borderRadius: '10px'}}>
                                        <Card.Img src={error} className='keep-up__card-img'/>
                                    </div>
                                    <Card.Body className="keep-up__card-body">
                                        <Card.Title as={Link} to='/course' className="keep-up__card-title">
                                            Card title
                                        </Card.Title>
                                        <Card.Text className="keep-up__card-text">
                                            This is a longer card with
                                            supporting text below as a natural
                                            lead-in to additional content. This
                                            content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default KeepUpToDate
