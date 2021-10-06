import React from "react"
import { IoIosArrowForward } from "react-icons/io"

export const ReviewCourse = ({ tab, setTab, courseId }) => {
  return (
    <div
      className="reviewCourse"
      style={{ display: `${tab === 3 ? "block" : "none"}` }}
    >
      <h2 className="title-page">Review your course</h2>
      <div className="reviewCourse__course">
        <div className="badges">
          <div>
            <p className="badges_cate">category</p>
          </div>
          <span>
            <IoIosArrowForward />
          </span>
          <p className="badges_topic">topic</p>
        </div>
        <p className="title">
          JavaScript Advanced 2021 <label>-10%</label>
        </p>
        <p className="des">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          at ea alias quaerat deleniti sapiente ducimus. Provident laborum optio
          aliquam?
        </p>
        <div className="price">
          Final Price:
          <span className="price-old">1600vnd</span>
          <span className="price-new">1209vnd</span>
        </div>
      </div>
      <div className="reviewCourse__chapter">
        <p className="title">Chapters</p>
      </div>
      <div className="controls">
        <button
          className="button button--next"
          style={{ marginRight: "20px" }}
          onClick={() => {
            setTab(tab + -1)
          }}
        >
          {"< prev"}
        </button>
        <button className="button button--save" type="submit">
          public
        </button>
      </div>
    </div>
  )
}
