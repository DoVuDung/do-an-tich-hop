import './home.scss';
import React from 'react';
import html from '../../../assets/images/icons8-html-5.png';
import javascript from '../../../assets/images/icons8-javascript.png';
import css from '../../../assets/images/icons8-css3.png';
import python from '../../../assets/images/icons8-python.png';
import trendingTopic from '../../../assets/images/trendingTopic.png';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Banner from '../../module/banner/Banner';
import TopTeachers from '../../module/top_teacher/TopTeachers';
import KeepUpToDate from '../../module/keep_up_to_date/KeepUpToDate';
import ShareSkill from '../../module/share_skill/ShareSkill';
import Header from '../../module/header/header';
// import ProtectedHeader from "../../module/header/protectedHeader"
import Footer from '../../module/footer/Footer';
import Chatbot from '../../module/chatbot/Chatbot';

const cartContext = [
  {
    title: 'JavaScript',
    totalCourse: 1,
    image: html,
  },
  {
    title: 'CSS',
    totalCourse: 11,
    image: css,
  },
  {
    title: 'HTML',
    totalCourse: 11,
    image: javascript,
  },
  {
    title: 'Python',
    totalCourse: 11,
    image: python,
  },
];

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="trending">
        <Container>
          <Row className="gx-5">
            <Col lg={7}>
              <div className="trending__cards">
                <Row className="g-5">
                  {cartContext.map((item, index) => (
                    <Col sm={6}>
                      <Link to="/card">
                        <div className="trending__card">
                          <div className="trending__card-context">
                            <div className="mb-4">
                              <h3 className="m-0 p-0">{item.title}</h3>
                              <p className="m-0 p-0">
                                {`${item.totalCourse} course${
                                  item.totalCourse > 1 ? 's' : ''
                                }`}
                              </p>
                            </div>
                            <button className="button trending__card-button">
                              take a look
                            </button>
                          </div>
                          <div className="trending__card-img">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col
              lg={5}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="trending__content mt-lg-0 mt-5">
                <h2>Trending technology</h2>
                <div className="trending__content-ads">
                  <p>Popular topics to learn now</p>
                  <div className="trending__content-ads-img">
                    <img src={trendingTopic} alt="" />
                  </div>
                </div>
                <p className="trending__content-des">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dicta maiores quasi, sapiente quae natus vel eum eaque quis
                  molestias voluptatem!
                </p>
                <Link to="/viewIndex" className="trending__link">
                  View the index
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <TopTeachers />
      <KeepUpToDate />
      <ShareSkill />
      <Chatbot />
      <Footer />
    </>
  );
};

export default Home;
