import { Formik, Form, FormikProps } from 'formik'
import React, { ReactElement } from 'react'
import * as Yup from 'yup'
import TextFieldWrapper from '../../../Shared/TextFieldWrapper/TextFieldWrapper'
import { Button } from '@material-ui/core'
import './RegistrationForm.scss'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../store'
import { useDispatch } from 'react-redux'

interface IRegistrationFormFields {
  username: string
  password: string
  email: string
  confirmPassword: string
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid format').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must have minimum 8 characters')
    .max(128, 'Password can have maximum 128 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
      'Password must contain at least one uppercase letter, one lowercase letter and one number'
    ),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

function RegistrationForm(): ReactElement {
  const dispatch = useDispatch()
  const { setFormError } = bindActionCreators(actionCreators, dispatch)

  const onSubmit = (
    values: { username: string; email: string; password: string },
    { resetForm, setStatus, setSubmitting }: any
  ) => {
    console.log(JSON.stringify(values))
    axios
      .post('https://localhost:5001/api/account/register', values)
      .then(function (response: any) {
        console.log(response)
      })
      .catch(function (error: any) {
        setStatus({ success: false })
        setSubmitting(false)
        if (error.response.data.title) {
          setFormError(error.response.data.title)
        } else {
          setFormError('Server error ' + error?.response?.data?.statusCode)
        }
        console.log(error)
      })
    resetForm()
  }

  return (
    <div className="RegistrationForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {(formik: FormikProps<IRegistrationFormFields>) => {
          return (
            <Form>
              <div className="RegistrationForm-form">
                <h1 className="RegistrationForm-title">REGISTER 👋</h1>
                <div className="RegistrationForm-form-and-btn-wrapper">
                  <div className="RegistrationForm-form-fields">
                    <TextFieldWrapper
                      label="Username *"
                      name="username"
                      type="text"
                    />
                    <TextFieldWrapper
                      label="E-mail *"
                      name="email"
                      type="email"
                    />
                    <TextFieldWrapper
                      label="Password *"
                      name="password"
                      type="password"
                    />
                    <TextFieldWrapper
                      label="Confirm password *"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>
                  <div className="RegistrationForm-btn-wrapper">
                    <Button
                      type="submit"
                      disabled={formik.isSubmitting}
                      variant="outlined"
                      color="primary">
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegistrationForm
