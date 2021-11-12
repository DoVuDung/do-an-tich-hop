import "./style.scss"
import React from "react"

const teachersData = [
    {
        name: "chien pro",
        des: "senior front-end engineer. co-founder GuguAcademy",
        img: 'https://scontent.fdad8-1.fna.fbcdn.net/v/t1.6435-9/244638856_3208146092763813_7212306593299792211_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7INc9q0x4fUAX9VZQQs&_nc_ht=scontent.fdad8-1.fna&oh=9f5e6e6f5692f71abe9ed2f264150935&oe=61A509F6',
        subject: 'java',
        link: 'https://fb.com/xuan.chien.9022'
    },
    {
        name: "Do Vu Dung",
        des: "senior front-end engineer. co-founder GuguAcademy",
        img: 'https://scontent.fdad8-1.fna.fbcdn.net/v/t1.6435-9/106802319_639514623354200_3057396312417460894_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=4IxRCwZtcDwAX_j-CL1&_nc_ht=scontent.fdad8-1.fna&oh=c00d5cf1b10d0b6774d11e1b8dadecc9&oe=61A5D5B6',
        subject: 'c#',
        link: 'https://fb.com/chippopKiller'
    },
    {
        name: "Dang Quang Huy",
        des: "senior fullStack web developer. co-founder GuguAcademy",
        img: 'https://scontent.fdad8-1.fna.fbcdn.net/v/t1.6435-9/148397893_1918767138288358_6826919064066293838_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gwh7XB_6kWMAX9v52PR&tn=REuJYMrg2GWwsBO1&_nc_ht=scontent.fdad8-1.fna&oh=621933ac147a4f86f4600954e579b3ca&oe=61A38EB5',
        subject: 'Golang',
        link: 'https://fb.com/huy15399'
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
