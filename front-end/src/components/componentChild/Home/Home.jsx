import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Card from '../../../UI/Card/Card'
import Button from '../../../UI/Button/Button'
import avatar from '../../../assets/image/icon/bigiconavatar.png'
import iconEdit from '../../../assets/image/icon/icons8-edit-24.png'
import iconMoney from '../../../assets/image/icon/icons8-money-bag-50.png'
import iconPython from '../../../assets/image/icon/icons8-python-48.png'
import iconJavascript from '../../../assets/image/icon/icons8-javascript-48.png'
import iconHTML from '../../../assets/image/icon/icons8-html-5-48.png'
import iconAddCourse from '../../../assets/image/icon/icons8-add-50.png'
import iconFacebook from '../../../assets/image/icon/icons8-facebook-50.png'
import iconLinkedin from '../../../assets/image/icon/icons8-linkedin-50.png'
import iconYoutube from '../../../assets/image/icon/icons8-youtube-play-button-50.png'


import styles from './Home.module.css'; 

function Home(props) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.teacher__info}>
          <Card className={styles['teacher__info--view']}>
            <div className={styles['teacher__info--base']}>
              <div className={styles['teacher--logo']}><img src={avatar} alt="" /></div>
              <div className={styles['teacher--name']}>Andy Do</div>
            </div>
            <div className={styles['teacher__info--base__add']}>
              <span className={styles['teacher__info--base__add-items']}>Viet Nam</span>
              <span className={styles['teacher__info--base__add-items']}>Last active 4 days ago</span>
              <span className={styles['teacher__info--base__add-items']}>Joined Mar 20, 2021</span>
            </div>
            <Button><img src={iconEdit} alt="" />Edit Your Profile</Button>

            <div className={styles['teacher__social']}>
              <h3>Following</h3>
              <div className={styles['teacher__social--icon']}><img src={iconFacebook} alt="iconFacebook" /></div>
              <div className={styles['teacher__social--icon']}><img src={iconLinkedin} alt="iconLinkedin" /></div>
              <div className={styles['teacher__social--icon']}><img src={iconYoutube} alt="iconYoutube" /></div>
            </div>
            <div className={styles['teacher__member--dated__at']}>
              MEMBER SINCE: OCTOBER 27, 2018
            </div>
          </Card>
        </div>
        <div className={styles['teacher__manage']}>
          <div className={styles['teacher__manage--nav__tools']}>
            <Button className={styles['teacher__manage--nav__tool']} >Course</Button>
            <Button className={styles['teacher__manage--nav__tool']}>LiveStreams</Button>
            <Button className={styles['teacher__manage--nav__tool']}><img src={iconMoney} alt="" /></Button>
            <Button className={styles['teacher__manage--nav__tool']}>Insights</Button>
            <Button className={styles['teacher__manage--nav__tool']}>Drafts</Button>
          </div>
          <div className={styles['teacher__manage--course__createds']}>
            <div className={styles['teacher__manage--course__created']}>
              <Card className={styles['teacher__manage--course__thumbnail']}><img src={iconPython} alt="PythonCourse" /></Card>
              <div className={styles['course__created--name']}>Understanding TypeScript - 2021 Edition</div>
              <div className={styles['course__created--info']}>
                <p>Catogory: Web development
                  Rating: 4.8 out of 5
                  4.8
                  (2,795)
                  Current price $16.99</p>
              </div>
            </div>
            <div className={styles['teacher__manage--course__created']}>
              <Card className={styles['teacher__manage--course__thumbnail']}><img src={iconJavascript} alt="JavascriptCourse" /></Card>
              <div className={styles['course__created--name']}>Understanding TypeScript - 2021 Edition</div>
              <div className={styles['course__created--info']}>
                <p>Catogory: Web development
                  Rating: 4.8 out of 5
                  4.8
                  (2,795)
                  Current price $16.99</p>
              </div>
            </div>
            <div className={styles['teacher__manage--course__created']}>
              <Card className={styles['teacher__manage--course__thumbnail']}><img src={iconHTML} alt="HTMLCourse" /></Card>
              <div className={styles['course__created--name']}>Understanding TypeScript - 2021 Edition</div>
              <div className={styles['course__created--info']}>
                <p>Catogory: Web development
                  Rating: 4.8 out of 5
                  4.8
                  (2,795)
                  Current price $16.99</p>
              </div>
            </div>
          </div>
          <div className={styles['teacher__manage--create__new--course']}>
            <Card className={styles['teacher__manage--create__new--course__add']} >
              <Button><img src={iconAddCourse} alt="add new Course" /></Button>
              <Button className={styles['teacher__manage--create__new--course--tilte']}>Create a Course</Button>
              <span>Get feedback, views, and appreciations. Public projects
                can be featured by our curators.</span>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
