import "./style.scss"
import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const CourseDetailChapter = ({ chapters }) => {
console.log(chapters)
  return (
    <Row className="g-4">
      {chapters?.map((item) => (
        <Col lg={6}>
          <div className="courseDetail-chapter">
            <div style={{ padding: "20px" }}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
            <div className="courseDetail-chapter-lessons">
              {item.videos.map(itm => (
                <Link to={`/chapter/${item._id}?lesson=${itm.index}`} className="courseDetail-chapter-lesson">
                  {itm.index}
                </Link>
              ))}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default CourseDetailChapter
