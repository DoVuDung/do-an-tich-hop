import React, { useState } from "react"
import { CgMenuGridR } from "react-icons/cg"
import { ChapterItem } from "./chapter_item"

export const ChapterCreate = ({tab, courseId, setTab}) => {
  const [chapters, setChapters] = useState([])

  return (
    <div className="chapterCreate" style={{display: `${tab === 2 ? 'block' : 'none'}`}}>
      <h2 className="title-page">Setup your Chapter</h2>
      {chapters.map((item, idx) => (
        <ChapterItem
          chapter={item}
          chapters={chapters}
          setChapters={setChapters}
          key={idx}
          courseId={courseId}
          index={idx}
        />
      ))}
      <div className="chapter__popup">
        <div
          className="popup__option"
          onClick={() => {
            setChapters([
              ...chapters,
              {
                number: chapters.length,
                title: `chapter ${chapters.length + 1}`,
              },
            ])
          }}
        >
          <span>
            <CgMenuGridR />
          </span>
          <label>Add New Chapter</label>
        </div>
      </div>

      <div className="controls">
              <button className="button button--next" style={{marginRight: '20px'}}
                onClick={() => {setTab(tab + - 1 )}}
              >{"< prev"}</button>
              <button className="button button--save" type="submit">
                save
              </button>
              <button className="button button--next"
                onClick={() => {setTab(tab + 1 )}}
              >{"next >"}</button>
      </div>
    </div>
  )
}
