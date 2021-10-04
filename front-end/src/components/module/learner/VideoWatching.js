import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/header";
import { Container, Row, Col, Button } from "react-bootstrap";
import Styles from "./VideoWatching.module.scss";
import html from "../../../assets/images/icons8-html-5.png"
import javascript from "../../../assets/images/icons8-javascript.png"
import css from "../../../assets/images/icons8-css3.png"
import python from "../../../assets/images/icons8-python.png"
export default function VideoWatching() {
  const VIDEO = {
    user: {
      id: 0,
      username: 'Dang Xuan Chien',
    },
    continue: [
      {
        id: 1,
        nameVideo: "A Practical Guide to Algorithms with JavaScript Bianca Gandolfo",
        link: "https://www.youtube.com/embed/F1g3G-plMic",
        logo: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png"
      }, 
      {
        id: 2,
        nameVideo: "Intermediate TypeScript Mike North",
        link: "https://www.youtube.com/embed/gCgzPIi-cXg",
        logo: html
      }, 
      {
        id: 3,
        nameVideo: "A Practical Guide to Algorithms with JavaScript Bianca Gandolfo",
        link: "https://www.youtube.com/embed/F1g3G-plMic",
        logo: javascript
      }, 
    ],
    newCourse: [
      {
        id: 1,
        nameVideo: "A Practical Guide to Algorithms with JavaScript Bianca Gandolfo",
        link: "https://www.youtube.com/embed/F1g3G-plMic",
        logo: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png"
      }, 
      {
        id: 2,
        nameVideo: "Intermediate TypeScript Mike North",
        link: "https://www.youtube.com/embed/gCgzPIi-cXg",
        logo: html
      }, 
    ],
    upComing: [
      {
        id: 1,
        nameVideo: "A Practical Guide to Algorithms with JavaScript Bianca Gandolfo",
        link: "https://www.youtube.com/embed/F1g3G-plMic",
        logo: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png"
      }, 
      {
        id: 2,
        nameVideo: "Intermediate TypeScript Mike North",
        link: "https://www.youtube.com/embed/gCgzPIi-cXg",
        logo: html
      }, 
    ],
  };
  return (
    <div>
      <Header />
      <Container className={Styles.videoWatching}>
        <Row className={Styles.title}>Welcome Back, {VIDEO.user.username} </Row>
        <Row className={Styles.nameStyle}>Continue Watching </Row>
        {/* continute watching  */}
        <Row>
          {VIDEO.continue.map((value, key) =>{
            if(value.id === 1 || value.id ===2)
              return (
                <Col sm={6} className={Styles.contentVideo}>
                <div className={Styles.layerMain}>
                  <div className={Styles.video}>
                    <iframe
                      src={value.link}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className={Styles.logo}><img src={value.logo}></img></div>
                  <div className={Styles.nameVideo}>
                    {value.nameVideo}
                  </div>
                  <Button className={Styles.btnWatch}>Continue Watching</Button>
                </div>
              </Col>
              )
          })
          }
        </Row>
        {/* end continue watching  */}
        <Row className={Styles.nameStyle}>New Course </Row>
        {/* New Corse */}
        <Row>
          {VIDEO.newCourse.map((value, key) =>{
            if(value.id === 1 || value.id ===2)
              return (
                <Col sm={6} className={Styles.contentVideo}>
                <div className={Styles.layerMain}>
                  <div className={Styles.video}>
                    <iframe
                      src={value.link}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className={Styles.logo}><img src={value.logo} alt="logo"></img></div>
                  <div className={Styles.nameVideo}>
                    {value.nameVideo}
                  </div>
                  <Button className={Styles.btnWatch}>View</Button>
                </div>
              </Col>
              )
          })
          }
        </Row>
        {/* end new corse  */}
        <Row className={Styles.nameStyle}>Upcoming Workshop </Row>
        {/* upcoming */}
        <Row>
          {VIDEO.upComing.map((value, key) =>{
            if(value.id === 1 || value.id ===2)
              return (
                <Col sm={6} className={Styles.contentVideo}>
                <div className={Styles.layerMain}>
                  <div className={Styles.video}>
                    <iframe
                      src={value.link}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className={Styles.logo}><img src={value.logo}></img></div>
                  <div className={Styles.nameVideo}>
                    {value.nameVideo}
                  </div>
                  <Button className={Styles.btnWatch}>Attend Online</Button>
                </div>
              </Col>
              )
          })
          }
        </Row>
        {/* end upcoming */}

      </Container>
      <Footer />
    </div>
  );
}
