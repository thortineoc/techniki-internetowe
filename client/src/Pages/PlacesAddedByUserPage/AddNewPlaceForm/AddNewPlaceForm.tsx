import React from 'react'
import './AddNewPlaceForm.scss'
import TextFieldWrapper from '../../../Shared/TextFieldWrapper/TextFieldWrapper'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  country: '',
  city: ''
}

interface INewPlaceFormFields {
  country: string
  city: string
}

const validationSchema = Yup.object({
  country: Yup.string().required('Required'),
  city: Yup.string().required('Required')
})

function AddNewPlaceForm() {
  const onSubmit = () => {}

  return (
    <div className="AddNewPlaceForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {(formik: FormikProps<INewPlaceFormFields>) => {
          return (
            <Form>
              <TextFieldWrapper name="country" label="country" type="text" />
              <TextFieldWrapper name="city" label="city" type="text" />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AddNewPlaceForm
