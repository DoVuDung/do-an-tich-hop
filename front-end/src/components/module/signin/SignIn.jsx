import "./style.scss"
import React, {useContext} from "react"
import logo from "../../../assets/images/logoGuru.png"
import bgLogin from "../../../assets/images/bgLogin.png"
import { Link } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import { UserContext } from "../../../context/userContext"

const SignIn = () => {

    const { login } = useContext(UserContext)

    const validateEmail = (input) => {
        let error = ''
        if(!input){
            error = '*this field can not be empty!'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)){
            error = '*invalid email!'
        }
        return error
    }

    const validateInput = (input) => {
        let error = ''
        if(!input){
            error = '*this field can not be empty!'
        }
        return error
    }

    const loginUser = async (form) => {
		try {
			const loginData = await login(form)

            console.log(loginData)
            if(!loginData.success){
                alert('incorrect username or password!')
            }
		} catch (error) {
			console.log(error)
		}
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
                            email: '' ,
                            password: ''
                        }}
                        onSubmit={(values)=> {
                            loginUser({email: values.email, password: values.password})
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="signIn__context-form">
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
                                    type='email'
                                    className="signIn__context-input"
                                    validate={validateEmail}
                                />

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
                                    type='password'
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
                    <div className='w-100'>
                        <Link to="forgotPassword" className="signIn__option forgotPassword">
                            Forgot password
                        </Link>
                        <Link to="signup" className='signIn__option new-account'>Create new account</Link>
                    </div>
                </div>
                <div className='signIn__copyright'>
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

export default SignIn
