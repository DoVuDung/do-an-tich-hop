import "./style.scss"
import React, { useState, useEffect } from "react"
import UserCard from "../../module/card/user_card/UserCard"
import { Container, Row, Col } from "react-bootstrap"
import { ProfileCourses } from './ProfileCourses'
import { ProfileBlogs } from './ProfileBlogs'
import { useHistory } from  'react-router-dom'
import PublishMasterPage from "../master_page/PublishMasterPage"
import { getUserProfile } from '../../../api/user_api'
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
  const [currentUser, setCurrentUser] = useState()
  const userId = history.location.pathname.split('/')[2]

  useEffect(() => {
    getUserProfile(userId).then(res => {
      setCurrentUser(res.data.user)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PublishMasterPage>
      <div className="profile">
        <Container>
          <Row className="g-4">
            <Col lg={3}>
              {currentUser && <UserCard user={currentUser}/>}
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
