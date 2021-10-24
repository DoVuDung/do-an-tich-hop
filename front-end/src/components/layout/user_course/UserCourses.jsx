import "./style.scss"
import React, { useContext, useEffect } from "react"
import { UserMenu } from "../../module/user_menu/UserMenu"
import UserCard from "../../module/card/user_card/UserCard"
import CourseCard from "../../module/card/course_card/CourseCard"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsPlusCircle } from "react-icons/bs"
import { UserContext } from "../../../context/userContext"
import { CourseContext } from "../../../context/courseContext"
import { getUserTeachingCourse } from '../../../api/course_api'
import PrivateMaterPage from "../master_page/PrivateMaterPage"

const UserCourses = () => {

  const {
    authState: {
      user
    },
  } = useContext(UserContext)

  const { userTeachingCourses, setUserTeachingCourses } = useContext(CourseContext)

  console.log(user)

  useEffect(() => {
    getUserTeachingCourse().then(res => {
      setUserTeachingCourses(res.data.user)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <PrivateMaterPage>
      <div className="user">
        <Container>
          <Row className="g-4">
            <Col lg={3}>
              <UserCard user={user}/>
            </Col>
            <Col lg={9}>
              <div className="userContent">
                <UserMenu />
                <div className="pt-4">
                  <Row className="g-4">
                    {userTeachingCourses?.teachingCourses.map((item) => (
                      <Col lg={4} sm={6}>
                        <CourseCard item={item}/>
                      </Col>
                    ))}     
                    <Col lg={4} sm={6}>
                      <CreateNewCourseCard />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PrivateMaterPage>
  )
}

const CreateNewCourseCard = () => {
  return (
    <Card className="userContent-card addCourse">
      <Link className="addCourse-button" to="/user/course/create">
        <BsPlusCircle />
      </Link>
      <Link to="/user/course/create" className="button addCourse-tag">
        Create a Course
      </Link>
      <p>
        Get feedback, views, and appreciations. <br />
        Public projects
        <br />
        can be featured by our curators.
      </p>
    </Card>
  )
}

export default UserCourses
