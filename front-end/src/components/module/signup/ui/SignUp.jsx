import "./style.scss"
import React from "react"
import logo from "../../../../assets/images/logoGuru.png"
import bgLogin from "../../../../assets/images/bgLogin.png"
import { Link } from "react-router-dom"
import { Formik, Form, Field } from "formik"

const SignUp = () => {
    const validateEmail = (input) => {
        let error = ""
        if (!input) {
            error = "*this field can not be empty!"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            error = "*invalid email!"
        }
        return error
    }

    const validateInput = (input) => {
        let error = ""
        if (!input) {
            error = "*this field can not be empty!"
        }
        return error
    }

    return (
        <div className="signIn">
            <div className="signIn__content">
                <div className="signIn__logo">
                    <img src={logo} alt="" />
                </div>
                <div className="signIn__context">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={() => {
                            alert("simitted")
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="signIn__context-form">
                                <label
                                    htmlFor="fullName"
                                    className="signIn__context-label"
                                >
                                    Full name
                                    {errors.fullName && touched.fullName && (
                                        <span>{errors.fullName}</span>
                                    )}
                                </label>
                                <Field
                                    name="fullName"
                                    type="text"
                                    className="signIn__context-input"
                                    validate={validateInput}
                                />
                                <label
                                    htmlFor="email"
                                    className="signIn__context-label"
                                >
                                    Email
                                    {errors.email && touched.email && (
                                        <span>{errors.email}</span>
                                    )}
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="signIn__context-input"
                                    validate={validateEmail}
                                />
                                <label
                                    htmlFor="email"
                                    className="signIn__context-label"
                                >
                                    Email
                                    {errors.email && touched.email && (
                                        <span>{errors.email}</span>
                                    )}
                                </label>

                                <div className="select-boxes">
                                    <select name="day">
                                        {
                                            Array.from({length: 30}).map((_, index) => (
                                                <option value={index} label={index} key={index} />
                                            )) 
                                        }
                                    </select>
                                    <select name="month">
                                        {
                                            Array.from({length: 12}).map((_, index) => (
                                                <option value={index + 1} label={index + 1} key={index} />
                                            )) 
                                        }
                                    </select>
                                    <select name="year">
                                        {
                                            Array.from({length: 30}).map((_, index) => (
                                                <option value={index} label={index} key={index} />
                                            )) 
                                        }
                                    </select>
                                </div>

                                <label
                                    htmlFor="password"
                                    className="signIn__context-label"
                                >
                                    password
                                    {errors.password && touched.password && (
                                        <span>{errors.password}</span>
                                    )}
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="signIn__context-input"
                                    validate={validateInput}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="signIn__context-label"
                                >
                                    Confirm password
                                    {errors.confirmPassword &&
                                        touched.confirmPassword && (
                                            <span>
                                                {errors.confirmPassword}
                                            </span>
                                        )}
                                </label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="signIn__context-input"
                                    validate={validateInput}
                                />
                                <button
                                    className="signIn__context-button"
                                    type="submit"
                                >
                                    Sign in
                                </button>
                            </Form>
                        )}
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
