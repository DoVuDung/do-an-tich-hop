import './style.scss'
import React, { useContext } from "react"
import avatar from "../.../../../../../assets/images/avatar.png"
import {
  BsFillPencilFill,
  BsFacebook,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { UserContext } from '../../../../context/userContext'


const UserCard = ({user}) => {
  const { authState: { user: { _id } } } = useContext(UserContext)

  return (
    <div className="userCard">
      <div className="d-flex align-items-center mb-4">
        <div className="userCard-img me-4">
          <img src={user.avatar || avatar} alt="" />
        </div>

        <p className="userCard-name m-0">{user.firstName} {user.lastName}</p>
      </div>
      <p>{user.address.country}</p>
      <p className="mb-4">Join Mar 20, 2021</p>

      <button className="button userCard-button mb-4">
        <BsFillPencilFill style={{ marginRight: "10px", fontSize: "20px" }} />
        { _id && _id === user._id ? "Edit Your Profile" : "Send a Message " }
      </button>
      <p className="mb-1">Following</p>
      <div className="d-flex w-50 justify-content-between">
        <a href='#' className="userCard-social">
          <BsFacebook />
        </a>
        <a href="3" className="userCard-social">
          <BsLinkedin />
        </a>
        <a href="3" className="userCard-social">
          <BsTwitter />
        </a>
      </div>
      <div className='userCard-block'>
          <h4>More information</h4>
          <div className='userCard-block-list'>
              <p><AiOutlineMail /> - {user.email}</p>
              <p><AiOutlinePhone /> - {user.phoneNumber || '123123'}</p>
              <p><GoLocation /> - {user.address.street} {user.address.city}</p>
          </div>
      </div>
    </div>
  )
}

export default UserCard
