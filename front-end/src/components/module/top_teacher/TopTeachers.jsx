import "./style.scss"
import React from "react"
import teacher from "../../../assets/images/chienpro.png"

const teachersData = [
    {
        name: "chien pro",
        des: "senior front-end engineer. co-founder GuguAcademy",
        img: teacher,
        subject: 'java',
        link: 'https://fb.com'
    },
    {
        name: "Do Vu Dung",
        des: "senior front-end engineer. co-founder GuguAcademy",
        img: teacher,
        subject: 'c#',
        link: 'https://fb.com'
    },
    {
        name: "Dang Quang Huy",
        des: "senior fullStack web developer. co-founder GuguAcademy",
        img: teacher,
        subject: 'Golang',
        link: 'https://fb.com'
    },
]

const TopTeachers = () => {
    return (
        <div className="topTeacher">
            <h2 className="topTeacher__header">Top teachers</h2>
            <div>
                {teachersData.map((item, index) => (
                    <div className={`topTeacher__box-wrap topTeacher__box--${index % 2 === 0 ? 'right' : 'left'}`}>
                        <div className="topTeacher__box">
                            <div className="topTeacher__box-content">
                                <p className="topTeacher__box-content-title">{item.name}</p>
                                <p className="topTeacher__box-content-des">{item.des}</p>
                            </div>
                            <div className="topTeacher__box-img">
                                <img src={item.img} alt="" />
                            </div>
                        </div>
                        <div className="topTeacher__box-labels">
                            <div className='label'>{item.subject}</div>
                            <div className='topTeacher__box-linkInfo label'>
                                <a href={item.link}>Click to view more information</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopTeachers
