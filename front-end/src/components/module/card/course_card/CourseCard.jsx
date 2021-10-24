import './style.scss'
import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const CourseCard = ({item}) => {
  return (
    <>
      <Card className="userContent-card border-0 text-start">
        <div className="userContent-card-img">
          <Link to={`/course/${item?._id}`}>
            <Card.Img src='https://source.unsplash.com/random/800x800/?img=1' alt="" />
          </Link>
        </div>
        <Card.Body className="px-0">
          <Card.Title as={Link} to="/course" className="userContent-card-title">
            {item?.title}
          </Card.Title>
          <Card.Text className="userContent-card-text">
            Category: {item?.topic.courseCategoryId.title}
          </Card.Text>
          <Card.Text className="userContent-card-text">
            learner: {item?.learnersDetail.length}
          </Card.Text>
          <Card.Text className="userContent-card-text">
            Current price ${item?.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default CourseCard
