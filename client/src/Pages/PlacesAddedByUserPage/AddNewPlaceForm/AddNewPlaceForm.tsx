import React, { useEffect, useState } from 'react'
import './AddNewPlaceForm.scss'
import TextFieldWrapper from '../../../Shared/TextFieldWrapper/TextFieldWrapper'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { Button, TextField } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import jsonData from '../../../Data/categories.json'
import { useSelector } from 'react-redux'

const initialValues = {
  name: '',
  category: '',
  country: '',
  city: '',
  location: ''
}

interface INewPlaceFormFields {
  name: string
  category: string
  country: string
  city: string
  location: string
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  location: Yup.string().required('Required')
})

interface Iapidata {
  error: boolean
  msg: string
  data: Array<ICountry>
}

interface ICountry {
  name: string
  iso2: string
  iso3: string
  unicodeFlag: string
}

function AddNewPlaceForm({ setIsOpen }: any) {
  const { user } = useSelector((state: any) => state.userReducer)

  const onSubmit: (values: INewPlaceFormFields, { resetForm }: any) => void = (
    values: INewPlaceFormFields,
    { resetForm, setStatus, setSubmitting }: any
  ) => {
    const req = { ...values, appUserId: user.id }
    console.log(req)
    axios
      .post('https://localhost:5001/api/Places/', req)
      .then((response) => setIsOpen(false))
      .catch((err) => console.log(err))
    console.log('SUMBIT :)')
  }
  const [countries, setCountries] = useState<Array<string>>([])
  const [cities, setCities] = useState<Array<string>>([])
  const [categories, setCategories] = useState<Array<string>>(
    JSON.parse(JSON.stringify(jsonData))
  )

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/flag/unicode')
      .then((res: AxiosResponse<Iapidata>) => {
        setCountries(
          res.data.data
            .sort((a: ICountry, b: ICountry): number => {
              if (a.name < b.name) return -1
              if (a.name > b.name) return 1
              return 0
            })
            .map((x: ICountry) => x.unicodeFlag + ' ' + x.name)
        )
      })
      .catch((err: Error) => console.log(err))
  }, [])

  return (
    <div className="AddNewPlaceForm">
      <b>New place</b>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {(formik: FormikProps<INewPlaceFormFields>) => {
          // @ts-ignore
          return (
            <Form>
              <div className="AutocompleteWrapper">
                <TextFieldWrapper name="name" label="Name" type="text" />
              </div>
              <Autocomplete
                className="AutocompleteWrapper"
                disablePortal
                id="category"
                options={categories}
                onChange={(event, value: string | null) => {
                  formik.setFieldValue('category', value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={formik.handleChange}
                    label="Category"
                    fullWidth
                    value={formik.values?.category}
                  />
                )}
              />
              <Autocomplete
                className="AutocompleteWrapper"
                disablePortal
                id="country"
                options={countries}
                onChange={(event, value: string | null) => {
                  formik.setFieldValue(
                    'country',
                    value?.slice(value.indexOf(' ') + 1)
                  )
                }}
                renderInput={(configSelect) => (
                  <TextField
                    {...configSelect}
                    onChange={formik.handleChange}
                    label="Country"
                    name="country"
                    type="text"
                    value={formik.values?.country}
                  />
                )}
              />

              <TextFieldWrapper name="city" label="City" type="text" />
              <TextFieldWrapper name="location" label="Address" type="text" />

              <div className="button-wrapper">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="outlined"
                  color="primary">
                  SUBMIT
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AddNewPlaceForm
