import React from "react"
import "./style.scss"
import { Container, Row, Col } from "react-bootstrap"
import { CgChevronUp } from "react-icons/cg"
import { Link } from "react-router-dom"
import avatar from "../../../assets/images/avatar.png"
import { AiFillStar } from "react-icons/ai";
import PrivateMaterPage from "../master_page/PrivateMaterPage"

const Lesson = () => {
  return (
    <PrivateMaterPage>
      <div className="lesson">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <div className="lesson-main">
                <iframe
                  src="https://www.youtube.com/embed/nABXRQ_4V00"
                  title="1"
                  frameborder="0"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="lesson-info">
                <div className="lesson-info-top">
                    <p className="mb-0 lesson-info-top-tag">#css #htmlcss #webdev</p>
                    <h3>
                      Midnight Drive - Lofi hip hop ~ Stress Relief, Relaxing
                      Music
                    </h3>
                    <p className='mb-0'>789.092 lượt xem | 23 thg 6, 2021</p>
                    <p className='mb-0'>{Array.from({length: 5}).map((_,idx) => (<AiFillStar key={idx}/>))}</p>
                </div>
                <div className="lesson-info-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-flex start align-items-center">
                      <div className="lesson-info-bottom-authorImg me-3">
                        <Link to="/">
                          <img src={avatar} alt="" />
                        </Link>
                      </div>
                      <Link to='/duonglam'>Chill with Me</Link>
                    </div>
                    <button className='button lesson-info-subcEd'>
                      subscribed
                    </button>
                  </div>
                  <div className='lesson-info-description'>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="lesson-header-list">
                <div className="lesson-header-list-info">
                  <p className="mb-2">Lorem ipsum dolor sit amet.</p>
                  <h4>Andy Do</h4>
                </div>
                <button className="button lesson-header-list-button">
                  <CgChevronUp />
                </button>
              </div>
              <div className="lesson-list">
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
                <div className="lesson-item">
                  <div className="lesson-item-video">
                    <iframe
                      src="https://www.youtube.com/embed/nABXRQ_4V00"
                      title="1"
                      frameborder="0"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <p className="text-start">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, iste!
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PrivateMaterPage>
  )
}

export default Lesson
