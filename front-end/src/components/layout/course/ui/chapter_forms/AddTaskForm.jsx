import React, { useState   } from "react"
import { BsPlusSquare } from "react-icons/bs"
import { Formik, Form, Field } from "formik"
import * as yup from "yup"

const validateSchema = yup.object().shape({
  title: yup.string().required('Title can not be empty!')
})

export const AddTasksForm = ({ setFn, tests, setTests }) => {
  const [questions, setQuestions] = useState([])


  const handleChangeInput = (index, address, value) => {
    setQuestions(
      questions.map((sItem, sIdx) => {
        if(sIdx === index){
          if(address === 'question')
            return {
              ...sItem,
              question: value
            }
          else if(address === 'a')
            return {
              ...sItem,
              a: value
            }
          else if(address === 'b')
            return {
              ...sItem,
              b: value
            }
          else if(address === 'c')
            return {
              ...sItem,
              c: value
            }
          else if(address === 'd')
            return {
              ...sItem,
              d: value
            }
          else if(address === 'answer')
            return {
              ...sItem,
              answer: value
            }
        }
        return sItem
      })
    )
  }
  const deleteQuestion = (index) => {
    const newQuestions =  questions.filter((_, idx) => index !== idx)
    setQuestions(newQuestions)
  }

  return (
    <div className="formWrap"
      onClick={() => {setFn(false)}}
    >
      {
        <Formik
          initialValues={{
            title: "",
            questions: [],
          }}
          validationSchema={validateSchema}
          onSubmit={(values) => {
            setTests([
              ...tests,
              {
                index: tests.length,
                title: values.title,
                questions: questions
              }
            ])
            setFn(false)
          }}
        >
          {({errors, touched}) => (
            <Form className="formWrap__body testForm"
              onClick={(e) => {e.stopPropagation()}}
            >
              <p className="formWrap__title">Add New Test</p>
              <div className="answer">
              <label htmlFor="title">title
                {errors.title && touched.title && (<span>{errors.title}</span>)}
              </label>
              <Field type="text" name="title"/>
              </div>
              <div className="testForm-items g-5">
                {
                  questions.map((item, index) => (
                    <div className="testForm-item" key={index}>
                      <label htmlFor="question" onClick={() => {deleteQuestion(index)}}>{`question ${index + 1}`}</label>
                      <Field type="text" name={`question${index}`} value={item.question}
                        onChange={(e) => {handleChangeInput(index, 'question', e.target.value)}}
                      />
                      <label htmlFor={`a${index}`}>answer A</label>
                      <Field type="text" name={`a${index}`} value={item.a}
                        onChange={(e) => {handleChangeInput(index, 'a', e.target.value)}}
                      />
                      <label htmlFor={`b${index}`}>answer B</label>
                      <Field type="text" name={`b${index}`} value={item.b}
                        onChange={(e) => {handleChangeInput(index, 'b', e.target.value)}}
                      />
                      <label htmlFor={`c${index}`}>answer C</label>
                      <Field type="text" name={`c${index}`} value={item.c}
                        onChange={(e) => {handleChangeInput(index, 'c', e.target.value)}}
                      />
                      <label htmlFor={`d${index}`}>answer D</label>
                      <Field type="text" name={`d${index}`} value={item.d}
                        onChange={(e) => {handleChangeInput(index, 'd', e.target.value)}}
                      />
              
                      <label className="mb-2">Correct answer</label>
                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className="correct-answer"
                      >
                        {
                          Array.from(["A", "B", "C", "D"]).map((value, iValues) => (
                            <label key={iValues}>
                            <Field type="radio" name={`${item.answer}${index}`} value={value}
                              checked={item.answer === value && true}
                              onChange={(e) => {handleChangeInput(index, 'answer', e.target.value)}}
                            />
                            <span className='m-0'>{value}</span>
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
                <div
                  className="testForm-addBtn"
                  onClick={() => {
                    setQuestions([
                      ...questions,
                      { question: "", a: "", b: "", c: "", d: "", answer: "" },
                    ])
                  }}
                >
                  <BsPlusSquare />
                </div>
              </div>

              <div className="submit-btn">
                <button type="submit" >submit</button>
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  )
}
