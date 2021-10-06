import "./style.scss"
import React, { useState, useContext } from "react"
import logo from "../../../assets/images/logoGuru.png"
import bgLogin from "../../../assets/images/bgLogin.png"
import { UserContext } from "../../../context/userContext"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useHistory } from "react-router-dom"
import { signUp } from "../../../api/auth_api"

const ObjectSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  address: Yup.string()
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'password must be more than 8 characters')
    .max(30, 'password must be less than 8 characters')
    .required('This field is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
})

const SignUp = () => {

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(1980)
  const history = useHistory()

  return (
    <div className="signIn">
      <div className="signIn__content">
        <div className="signIn__logo">
          <img src={logo} alt="" />
        </div>
        <div className="signIn__context">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              dayOfBirth: "",
              password: "",
              confirmPassword: "",
              role: 2,
            }}
            validationSchema={ObjectSchema}
            onSubmit={async (values) => {
              values.dayOfBirth = `${day}/${month}/${year}`
              values.address = {
                "street": values.address.split('-')[0],
                "city": values.address.split('-')[1],
                "country": values.address.split('-')[2]
              }
              if(typeof values.role === 'object')
                values.role = Number(values.role[0])
              delete values["confirmPassword"]
              console.log('alter values:', values)
              const { message, success } = await signUp(values)
              if(!success) {
                alert(message)
              }
              else{
                history.push('/')
                alert(message, ' please turn to login')
              }
              values.address = ''
            }}
          >
            {({ errors, touched }) => {
              const currentYear = new Date().getFullYear()
              return (
                <Form className="signIn__context-form" style={{marginTop: '-40px'}}>
                  <label htmlFor="firstName" className="signIn__context-label">
                    first Name
                    {errors.firstName && touched.firstName && (
                      <span>{errors.firstName}</span>
                    )}
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    className="signIn__context-input"
                  />
  
                  <label htmlFor="lastName" className="signIn__context-label">
                    last Name
                    {errors.lastName && touched.lastName && (
                      <span>{errors.lastName}</span>
                    )}
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    className="signIn__context-input"
                  />
  
                  <label htmlFor="email" className="signIn__context-label">
                    Email
                    {errors.email && touched.email && <span>{errors.email}</span>}
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="signIn__context-input"
                  />
  
                  <label htmlFor="address" className="signIn__context-label">
                    address
                    {errors.address && touched.address && (
                      <span>{errors.address}</span>
                    )}
                  </label>
                  <Field
                    name="address"
                    type="text"
                    className="signIn__context-input"
                    placeholder="street - city - country"
                  />
  
                  <label htmlFor="dayOfBirth" className="signIn__context-label">
                    Day of birth
                    {errors.dayOfBirth && touched.dayOfBirth && (
                      <span>{errors.dayOfBirth}</span>
                    )}
                  </label>
                  <div className="select-boxes" style={{marginBottom: '10px'}}>
                    <select name="day" value={day} onChange={(e) => {setDay(e.target.value)}}>
                      {Array.from({ length: 30 }).map((_, index) => (
                        <option value={index} label={index} key={index} />
                      ))}
                    </select>
                    <select name="month" value={month} onChange={(e) => {setMonth(e.target.value)}}>
                      {Array.from({ length: 12 }).map((_, index) => (
                        <option value={index + 1} label={index + 1} key={index} />
                      ))}
                    </select>
                    <select name="year" value={year} onChange={(e) => {setYear(e.target.value)}}>
                      {Array.from({ length: 50 }).map((_, index) => (
                        <option
                          value={currentYear - index}
                          label={currentYear - index}
                          key={index}
                        />
                      ))}
                    </select>
                  </div>
  
                  <label htmlFor="password" className="signIn__context-label">
                    password
                    {errors.password && touched.password && (
                      <span>{errors.password}</span>
                    )}
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="signIn__context-input"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="signIn__context-label"
                  >
                    Confirm password
                    {errors.confirmPassword && touched.confirmPassword && (
                      <span>{errors.confirmPassword}</span>
                    )}
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="signIn__context-input"
                  />
  
                  <label htmlFor="role"> 
                    <Field type="checkbox" name="role" value='3' />
                    {' '}Continue as teacher ?
                  </label>
  
                  <button className="signIn__context-button" type="submit">
                    Sign up
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
        <div className="signIn__copyright">
          <p>copyright © 2021 GuruAcademy LLC.All rights reversed.</p>
          <p>Terms of Use| privacy Policy</p>
        </div>
      </div>
      <div className="signIn__background d-none d-lg-block">
        <img src={bgLogin} alt="" />
      </div>
    </div>
  )
}

export default SignUp
