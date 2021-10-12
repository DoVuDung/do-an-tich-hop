import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Button from '../../../UI/Button/Button'
import {Link} from 'react-router-dom'
function CreateCourse() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <div>
            <div>
              <p>{`Teacher>`}</p>
              <h3>Create new course</h3>
            </div>
            <hr />
          </div>
          <div>
            <div>
              <ul>
                <li><Button></Button></li>
                <li><Button></Button></li>
                <li><Button></Button></li>
                <li><Button></Button></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CreateCourse
