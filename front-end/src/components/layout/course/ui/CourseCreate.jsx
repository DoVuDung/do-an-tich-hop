import "./style.scss"
import React, { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { NewCourse } from "./course/NewCourse"
import { ChapterCreate } from "./chapter_forms/ChapterCreate"
import { controlMenu } from "../logic/control_menu"
import { ReviewCourse } from "./review_course/ReviewCourse"
import PrivateMasterPage from "../../master_page/PrivateMaterPage"

const CourseCreate = () => {
  const [tab, setTab] = useState(1)
  const [courseId, setCourseId] = useState("")

  return (
    <PrivateMasterPage>
      <div className="course">
        <Container>
          <div className="course__top">
            <p>{"Teacher >"}</p>
            <h2>Create new course</h2>
          </div>
          <div className="course__content">
            <Row className="gx-5">
              <Col lg={3} className="course__content-menu">
                {controlMenu.map((item, idx) => (
                  <div
                    className={`course__content-menu-item ${
                      tab === idx + 1 && "active"
                    }`}
                    onClick={() => {
                      setTab(idx + 1)
                    }}
                    key={idx}
                  >
                    {`${idx + 1} ${item.name}`}
                  </div>
                ))}
              </Col>
              <Col lg={9} className="course__content-main">
                <NewCourse
                  tab={tab}
                  setTab={setTab}
                  setCourseId={setCourseId}
                />
                <ChapterCreate tab={tab} courseId={courseId} setTab={setTab} />
                <ReviewCourse tab={tab} setTab={setTab} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </PrivateMasterPage>
  )
}

export default CourseCreate
