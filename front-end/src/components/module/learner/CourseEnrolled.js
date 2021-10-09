import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Styles from "./CourseEnrolled.module.scss";
import avt from "../../../assets/images/chienpro.png";
import { FaPencilAlt, FaCertificate } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Footer from "../footer/Footer";
import Header from "../header/header";

export default function CourseEnrolled() {
  const courseEnroll = [
    {
      id: 1,
      name: "React Native",
      certificate: 1,
    },
    {
      id: 2,
      name: "C#",
      certificate: 2,
    },
    {
      id: 3,
      name: "C++",
      certificate: 1,
    },
    {
      id: 4,
      name: "React JS",
      certificate: 1,
    },
    {
      id: 5,
      name: "JavaScrip",
      certificate: 2,
    },
    {
      id: 6,
      name: "Node JS",
      certificate: 1,
    },
  ];
  var stateCourse = true;
  const setState = () => {
    if (stateCourse === true) {
      console.log(stateCourse);
      stateCourse = false;
    } else if (stateCourse === false) {
      console.log(stateCourse);
      stateCourse = true;
    }
  };
  const loadFull = () =>
    courseEnroll.map((value, key) => {
      return (
        <div className={Styles.content}>
          <p className={Styles.nameTitle}>Course</p>
          <div className={Styles.nameCourse}>{value.name}</div>
        </div>
      );
    });
  const loadDemo = () =>
    courseEnroll.map((value, key) => {
      if (value.id === 1 || value.id === 2 || value.id === 3) {
        return (
          <div className={Styles.content}>
            <p className={Styles.nameTitle}>Course</p>
            <div className={Styles.nameCourse}>{value.name}</div>
          </div>
        );
      }
    });
  const loadCourse = () => {
    // console.log("loadCourse "+stateCourse);
    if (stateCourse === true) {
      return loadDemo();
    } else {
      return loadFull();
    }
  };
  return (
    <div>
        <Header/>
      <Container fluid className={Styles.learner}>
        <Row>
          <Col sm={4} className={Styles.profile}>
            <div className={Styles.content}>
              <div className={Styles.avatar}>
                <img src={avt} alt="avatar"></img>
                <div className={Styles.fullName}>Dang Xuan Chien </div>
              </div>
              <div className={Styles.info}>
                <ul>
                  <li>Việt Nam</li>
                  <li>Last active 4 days ago</li>
                  <li>Joined Mar 20, 2021 </li>
                </ul>
              </div>
              {/* <Button as={Col} variant="warning" className={Styles.btnEditInfo}> */}
              <Button className={Styles.btnEditInfo}>
                <FaPencilAlt className={Styles.iconPen} />
                <p> Edit your profile</p>
              </Button>
            </div>
          </Col>
          <Col sm={8} className={Styles.course}>
            <div className={Styles.enroll}>
              <div className={Styles.title}>Course Enrolled</div>
              {loadCourse()}
              <Button className={Styles.btnShow}>Show all</Button>
            </div>

            <div className={`${Styles.enroll} ${Styles.certificate}`}>
              <div className={Styles.title}>Course Enrolled</div>
              {courseEnroll.map((value, key) => {
                if (value.certificate === 2) {
                  return (
                    <div className={Styles.content}>
                      <AiFillSafetyCertificate className={Styles.iconCertifi} />
                      <div className={Styles.contentCertifi}>
                            <p className={Styles.nameTitle}>Course</p>
                            <div className={Styles.nameCourse}>{value.name}</div>
                      </div>
                      <button className={Styles.btnCertifi}>Certificate</button>
                    </div>
                  );
                }
              })}
              <Button className={Styles.btnShow}>Show all</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}