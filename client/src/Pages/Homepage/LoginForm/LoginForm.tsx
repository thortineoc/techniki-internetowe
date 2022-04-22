import { Button } from '@material-ui/core'
import axios from 'axios'
import { Formik, Form, FormikProps } from 'formik'
import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Yup from 'yup'
import TextFieldWrapper from '../../../Shared/TextFieldWrapper/TextFieldWrapper'
import { actionCreators } from '../../../store'
import './LoginForm.scss'
import { useNavigate } from 'react-router-dom'

interface ILoginFormFields {
  username: string
  password: string
}

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})

function LoginForm(): ReactElement {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { login, setLoginModal } = bindActionCreators(actionCreators, dispatch)

  const onSubmit: (values: ILoginFormFields, { resetForm }: any) => void = (
    values: ILoginFormFields,
    { resetForm, setStatus, setSubmitting, setError }: any
  ) => {
    console.log(resetForm)
    console.log(JSON.stringify(values))
    axios
      .post('https://localhost:5001/api/account/login', values)
      .then(function (response) {
        console.log(response)
        login(response.data)
        setLoginModal(false)
        navigate('/map')
      })
      .catch(function (error) {
        setStatus({ success: false })
        setSubmitting(false)
        console.log(error.response)
        if (error.response.data.title) {
          setError(error.response.data.title)
        } else {
          setError(error.response.data)
        }
      })
    resetForm()
  }

  return (
    <div className="LoginForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {(formik: FormikProps<ILoginFormFields>) => {
          return (
            <Form>
              <div className="LoginForm-form">
                <h1 className="LoginForm-title">LOGIN 🤝</h1>
                <div className="LoginForm-form-and-btn-wrapper">
                  <div className="LoginForm-form-fields">
                    <TextFieldWrapper
                      label="Username *"
                      name="username"
                      type="text"
                    />
                    <TextFieldWrapper
                      label="Password *"
                      name="password"
                      type="password"
                    />
                  </div>

                  <div className="LoginForm-btn-wrapper">
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

export default LoginForm
