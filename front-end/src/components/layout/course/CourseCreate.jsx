import "./style.scss"
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import ProtectedHeader from "../../module/header/protectedHeader"
import Footer from "../../module/footer/Footer"
import { NewCourse } from "./NewCourse"
import { ChapterCreate } from './ChapterCreate'

const CourseCreate = () => {
  return (
    <>
      <ProtectedHeader />
      <div className="course">
        <Container>
        <div className="course__top">
            <p>{'Teacher >'}</p>
            <h2>Create New Course</h2>
        </div>
        <div className="course__content">
          <Row className='gx-5'>
            <Col lg={3} className="course__content-menu">
            <div className='course__content-menu-item'>1 <span>Create Course</span></div>
            <div className='course__content-menu-item'>2 <span>setting chapter</span></div>
            <div className='course__content-menu-item'>3 <span>setting stream</span></div>
            <div className='course__content-menu-item'>4 <span>Course review</span></div>
            </Col>
            <Col lg={9} className="course__content-main">
              {/* <NewCourse /> */}
              <ChapterCreate />
            </Col>
          </Row>
        </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default CourseCreate
