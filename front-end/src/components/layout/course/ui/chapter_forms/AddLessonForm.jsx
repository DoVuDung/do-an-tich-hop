import React from "react"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'

const validateSchema = yup.object().shape({
  title: yup.string().required('Your title can not be empty!'),
  link: yup.string().required("Your course's link can not be empty!")
})

export const AddLessonForm = ({ setFn, lessons, setLessons }) => {
  return (
    <div className="formWrap"
      onClick={() => {setFn(false)}}
    >
      <Formik
        initialValues={{
          title: "",
          link: "",
        }}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          setLessons([...lessons, {index: lessons.length, 
            title: values.title, 
            url: values.link.split('watch?v=').join('embed/')
          }])
          setFn(false)
        }}
      >
        {({ errors, handleChange, touched }) => (
          <Form className="formWrap__body lessonForm" 
            onClick={(e) => {e.stopPropagation()}}
          >
            <p className="formWrap__title">Add New Lesson</p>
            <label htmlFor="title">
              Title
              {errors.title && touched.title && (<span>{errors.title}</span>)}
            </label>
            <Field type="text" name="title" />
            <label htmlFor="link">
              Course's Link
              {errors.link && touched.link && (<span>{errors.link}</span>)}
            </label>
            <Field type="text" name="link" />
            <div className='submit-btn'>
                <button type='submit'>
                  submit
                </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
