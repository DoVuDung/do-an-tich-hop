import "./style.scss"
import React, { useState } from "react"
import { BsThreeDots, BsPencil, BsFillTrashFill } from "react-icons/bs"

export const Popup = ({ setFn }) => {
  const [popup, setPopup] = useState(false)

  return (
    <div className="popup">
      <p
        className="popup__icon"
        onClick={(e) => {
          e.stopPropagation()
          setPopup(!popup)
          window.addEventListener('click', () => {setPopup(false)})
        }}
      >
        <BsThreeDots />
      </p>
      <div className={`popup__options ${popup && "active"}`}>
        <div
          className="popup__option"
          onClick={() => {
            setFn(true)
            setPopup(!popup)
          }}
        >
          <span>
            <BsPencil />
          </span>
          <label>Edit</label>
        </div>
        <div className="popup__option">
          <span>
            <BsFillTrashFill />
          </span>
          <label>Remove</label>
        </div>
      </div>
    </div>
  )
}