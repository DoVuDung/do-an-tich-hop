import React from "react"
import { Formik, Form, Field } from "formik"
import * as yup from "yup"

const validateSchema = {
  title: yup.string().required(),
  description: yup.string()
    .max(300, 'mô tả không được quá 300 ký tự!'),
  tags: yup.string()
    .max(50, 'tag không được quá 50 ký tự!'),
  price: yup.string().required(),
  categoryID: yup.string().required()
}

export const NewCourse = () => {
  return (
    <div className="newCourse">
      <h1 className='title-page'>Create New Course</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          tags: [],
          price: "",
          discount: "",
          categoryID: "",
        }}
        validateSchema={validateSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(errors, touched) => (
          <Form>
            <div className="input-box">
              <label htmlFor="title">Course's Name</label>
              <Field className='input' type="text" name="title" />
            </div>

            <div className="input-box">
              <label htmlFor="description">Description</label>
              <Field
                className='input' 
                type="textarea"
                name="description"
                component="textarea"
                rows="7"
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="input-box">
              <label htmlFor="tags">tags</label>
              <Field
                className='input' 
                type="textarea"
                name="tags"
                component="textarea"
                rows="2"
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="input-box">
              <label htmlFor="price">Course's price</label>
              <Field className='input' type="number" name="price" />
            </div>

            <div className="input-box">
              <label htmlFor="discount">discount</label>
              <Field className='input' type="number" name="discount" />
            </div>

            <div className="input-box">
              <label htmlFor="categoryID">course category</label>
              <div style={{width: '70%', textAlign: 'left'}}>
              <select name="categoryID" className='input-select'>
                <option value="" label="choose category" />
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
              </select>
              </div>
            </div>

            <div className='controls'>
              <button className='button button--save' type='submit'>
                save
              </button>
              <button className='button button--next'>
                {'next >'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
