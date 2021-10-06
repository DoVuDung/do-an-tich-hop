import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import { Popup } from "../../../../module/popup_edit/Popup"
import { AddLessonForm } from "./AddLessonForm"
import { AddTasksForm } from "./AddTaskForm"
import { postNewChapter } from '../../../../../api/chapter_api'

export const ChapterItem = ({chapters, setChapters, chapter, courseId, index}) => {
  const [tests, setTests] = useState([])
  const [lessons, setLessons] = useState([])
  const [isPopupLessonForm, setIsPopupLessonForm] = useState(false)
  const [isPopupTestForm, setIsPopupTestForm] = useState(false)
  const [collapseChapter, setCollapseChapter] = useState(false)

  const saveChaptersHandler = (idx, values) => {
    setChapters(
      chapters.map((item) => {
        if(item.number === idx){
            return {
              ...item,
              tests: values.tests,
              description: values.description,
              videos: values.videos
            }
        }
        return item
      })
    )
    console.log(index)
  }

  return (
    <>
      <Formik
        initialValues={{
          videos: tests,
          tests: lessons,
          description: "",
        }}
        onSubmit={(values) => {
          values.tests = tests
          values.videos = lessons
          saveChaptersHandler(chapter.number, values)
          postNewChapter({...chapters[index], courseId: courseId }).then(res => {
            alert(res.message)
          })
        }}
      >
        {() => (
          <Form className="chapter">
            <div className="chapter__header"
              onClick={() => {setCollapseChapter(!collapseChapter)}}
            >
              <h4>{`Chapter ${chapter.number + 1}: ${chapter.title}`}</h4>
            </div>
            <div className={`chapter__body ${collapseChapter && 'hidden'}`}>
              <div className="chapter__body-item lesson">
                <div className="item__header">
                  <h5>1. lessons</h5>
                  <Popup setFn={setIsPopupLessonForm} />
                </div>
                <div className="item__body">
                  {lessons.map((item, idx) => (
                    <div className="lesson-item" key={idx}>
                      <p>1. {` ${item.title}`}</p>
                      <div className="lesson-item-video">
                        <iframe
                          src={item.url}
                          width="100%"
                          height="100%"
                          title={idx}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chapter__body-item test">
                <div className="item__header">
                  <h5>2. Tests</h5>
                  <Popup setFn={setIsPopupTestForm} />
                </div>
                <div className="item__body">
                  {tests.map((item, idx) => (
                    <div className="test-item item__body-box" key={idx}>
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chapter__body-item attachment">
                <div className="item__header">
                  <h5>3. Attachment</h5>
                </div>
                <div className="item__body">
                  <div className="attachment-item item__body-box">
                    <p>Attachment 1</p>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="chapter__body-item description">
                <div className="item__header">
                  <h5>4. Description</h5>
                </div>
                <div className="item__body">
                  <Field
                    id="commentInput"
                    name="description"
                    type="textarea"
                    component="textarea"
                    rows="5"
                    style={{ resize: "vertical", width: "100%" }}
                  />
                </div>
              </div>
              <div className="chapter__footer">
              <button className="save--button" type="submit">
                save
              </button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
      {
        //eslint-disable-next-line
        (isPopupLessonForm && (
          <AddLessonForm
            setFn={setIsPopupLessonForm}
            lessons={lessons}
            setLessons={setLessons}
          />
        )) ||
          (isPopupTestForm && (
            <AddTasksForm
              setFn={setIsPopupTestForm}
              tests={tests}
              setTests={setTests}
            />
          ))
      }
    </>
  )
}
