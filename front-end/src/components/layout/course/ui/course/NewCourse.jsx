import React, { useState, useEffect } from "react"
import { Formik, Form, Field } from "formik"
import * as yup from "yup"
import { getCourseCategories } from "../../../../../api/category_api"
import { postNewCourse } from '../../../../../api/course_api'

const validateSchema = {
  title: yup.string().required(),
  description: yup.string().max(300, "mô tả không được quá 300 ký tự!"),
  tags: yup.string().max(50, "tag không được quá 50 ký tự!"),
  price: yup.string().required(),
  categoryId: yup.string().required(),
}

export const NewCourse = ({ tab, setCourseId, setTab }) => {
  const [Categories, setCategories] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    getCourseCategories().then((res) => {
      setCategories(res.data.courseCategories)
    })
  }, [])

  const topicsHandler = (id) => {
    Categories.map((item) => {
      if(item._id === id) setTopics(item.topics)
      return item
    })
  }

  return (
    <div
      className="newCourse"
      style={{ display: `${tab === 1 ? "block" : "none"}` }}
    >
      <h2 className="title-page">Create new course</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          tags: [],
          price: "",
          discount: "",
          categoryId: "",
          topicId: "",
        }}
        validateSchema={validateSchema}
        onSubmit={(values) => {
          values.tags = [`${values.tags}`]
          console.log(values)
          postNewCourse(values).then((res) => {
            if(res.success){
              setCourseId(res.data.course._id)
              console.log(res)
            }
          })
          
        }}
      >
        {({handleChange, values}) => {
          topicsHandler(values.categoryId)

          return (
          <Form>
            <div className="input-box">
              <label htmlFor="title">Course's Name</label>
              <Field className="input" type="text" name="title" />
            </div>

            <div className="input-box">
              <label htmlFor="description">Description</label>
              <Field
                className="input"
                type="textarea"
                name="description"
                component="textarea"
                rows="7"
                placeholder="Add description here!"
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="input-box">
              <label htmlFor="categoryId">course category</label>
              <div style={{ width: "70%", textAlign: "left" }}>
                <select name="categoryId" className="input-select"
                value={values.categoryId} onChange={handleChange}
                >
                  <option value='choose' label="choose category" />
                  {Categories.map((item, index) => (
                    <option
                      value={item._id}
                      label={item.title}
                      key={index}/>
                  ))}
                </select>
              </div>
            </div>

            <label className="big-label">What is your course about?</label>

            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="radio-group"
            >
              {topics.map((item, idx) => (
                <label className="radio" key={idx}>
                  <Field type="radio" name='topicId' value={item._id}/>
                  <span>{item.title}</span>
                </label>
              ))}
            </div>

            <label
              className="big-label"
              htmlFor="tags"
              style={{ marginBottom: "20px" }}
            >
              Tags
            </label>
            <div className="input-box">
              <Field
                className="input"
                type="textarea"
                name="tags"
                component="textarea"
                rows="2"
                style={{ resize: "vertical", width: "100%" }}
              />
            </div>

            <div className="input-box">
              <label htmlFor="price">Course's price</label>
              <Field className="input" type="number" name="price" />
            </div>

            <div className="input-box">
              <label htmlFor="discount">discount</label>
              <Field className="input" type="number" name="discount" />
            </div>

            <div className="controls">
              <button className="button button--save" type="submit">
                save
              </button>
              <button className="button button--next"
                onClick={() => {setTab(tab + 1 )}}
              >{"next >"}</button>
            </div>
          </Form>
        )}}
      </Formik>
    </div>
  )
}
