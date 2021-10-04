import React from "react";
import Styles from "./Video.module.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
export default function Video(props) {
  return (
    <Row>
      <Col sm={6} className={Styles.contentVideo}>
        <div className={Styles.layerMain}>
          <div className={Styles.video}>
            <iframe
              src={props.link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className={Styles.logo}>
            <img src={props.logo}></img>
          </div>
          <div className={Styles.nameVideo}>{props.nameVideo}</div>
          <Button className={Styles.btnWatch}>Continue Watching</Button>
        </div>
      </Col>
    </Row>
  );
}
