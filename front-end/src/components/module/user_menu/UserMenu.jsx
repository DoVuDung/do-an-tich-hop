import "./style.scss"
import React from "react"
import { Link } from "react-router-dom"

const menu = [
  {
    title: "Course",
    path: "/user/courser",
  },
  {
    title: "LiveStreams",
    path: "/user/livestreams",
  },
  {
    title: "Payment",
    path: "/user/payment",
  },
  {
    title: "Insights",
    path: "/user/insights",
  },
  {
    title: "Drafts",
    path: "/user/drafts",
  },
]

export const UserMenu = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {menu.map((item, index) => (
          <Link to={item.path} className="userContent-nav" key={index}>{item.title}</Link>
      ))}
    </div>
  )
}
