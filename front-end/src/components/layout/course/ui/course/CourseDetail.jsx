import './style.scss'
import React, { useEffect, useState } from 'react'
import avatar from '../../../../../assets/images/avatar.png'
import { Container, Row, Col } from 'react-bootstrap'
import { BsPeople,BsStack, BsWindowDock } from "react-icons/bs"
import { BiTime } from "react-icons/bi";
import CourseDetailChapter from '../course_detail_content/course_detail_chaper'
import { useHistory } from 'react-router'
import { getCourseIdOrSlug } from '../../../../../api/course_api' 
import PrivateMasterPage from '../../../master_page/PrivateMaterPage'

const tabBar = [
    {
        id: 1,
        title: 'Lessons'
    },
    {
        id: 2,
        title: 'Details'
    },
    {
        id: 2,
        title: 'Feedback'
    },
]

const CourseDetail = () => {
    const history = useHistory()
    const courseId = history.location.pathname.split('/')[2]
    const [course, setCourse] = useState()

    useEffect(() => {
        getCourseIdOrSlug(courseId).then(res => {
            setCourse(res.data.course)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <PrivateMasterPage>
            <Container className='courseDetail'>
                <div className='courseDetail-header'>
                    <h2 className='courseDetail-header-title'>{course?.title}</h2>
                    <Row className="g-5 py-3" style={{borderBottom: '1px solid #ccc'}}>
                        <Col lg={6}>
                        <div>
                            <div className='author-info'>
                                <div className='author-info-img' >
                                    <img src={avatar} alt="" />
                                </div>
                                <p>{`${course?.author.firstName} ${course?.author.lastName}`}</p>
                                <p><BsPeople className='me-1'/>21233 học viên</p>
                                <p>4.7 (175 đánh giá)</p>
                            </div>
                            <p className='text-start'>{course?.description}</p>
                        </div>
                        </Col>
                        <Col lg={3} style={{borderLeft: '1px solid #ccc'}}>
                        <div className='course-info'>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <p style={{color: 'rgb(165, 173, 186)'}}><BiTime className='me-2'/>Time</p>
                                <p>20 hours</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <p style={{color: 'rgb(165, 173, 186)'}}><BsStack className='me-2'/>Total</p>
                                <p>{course?.chapters.length} Chapters</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p style={{color: 'rgb(165, 173, 186)'}}><BsWindowDock className='me-2'/>Lessons</p>
                                <p>{course?.chapters.lessons?.length} Lessons</p>
                            </div>
                        </div>
                        </Col>
                        <Col lg={3} style={{borderLeft: '1px solid #ccc'}}>
                            <div className='courseDetail-header-subc'>
                                <h3>${course?.price}</h3>
                                <button className='button'>Subscribe</button>
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex">
                        {
                            tabBar.map(i => (
                                <div key={i.id} className='courseDetail-header-tab'>{i.title}</div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-4'>
                    <CourseDetailChapter chapters={course?.chapters}/>
                </div>
            </Container>
        </PrivateMasterPage>
    )
}

export default CourseDetail
