import "./style.scss"
import React, { useState } from "react"
import UserCard from "../../module/card/user_card/UserCard"
import { Container, Row, Col } from "react-bootstrap"
import { ProfileCourses } from './ProfileCourses'
import { ProfileBlogs } from './ProfileBlogs'
import { useHistory } from  'react-router-dom'
import PublishMasterPage from "../master_page/PublishMasterPage"
const menu = [
  {
    id: 1,
    title: "courses",
  },
  {
    id: 2,
    title: "blogs",
  },
]

const Profile = () => {
  const history = useHistory()
  const [tab, setTab] = useState(1)

  const userId = history.location.pathname.split('/')[2]

console.log(userId)

  return (
    <PublishMasterPage>
      <div className="profile">
        <Container>
          <Row className="g-4">
            <Col lg={3}>
              {/* <UserCard /> */}
            </Col>
            <Col lg={9}>
              <div>
                <div className="profile-tabs">
                  {menu.map((i) => (
                    <div className="profile-tab" key={i.id}
                      onClick={() => setTab(i.id)}
                    >
                      {i.title}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {tab === 1 && <ProfileCourses />}
                {tab === 2 && <ProfileBlogs />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PublishMasterPage>
  )
}

export default Profile
