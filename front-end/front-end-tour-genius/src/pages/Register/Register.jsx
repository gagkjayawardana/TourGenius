import React, { useState, useEffect } from 'react';
import logo from '../../assests/images/logo.jpg';
import '../../utils/registerPage.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    country: ''
  };

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    age: yup.number().typeError('Age must be a number').required('Required'),
    country: yup.string().required('Required'),
    email: yup.string().email('Please Enter Valid Email').required('Required'),
    password: yup
      .string()
      .matches(passwordRules, { message: 'Please create a stronger password' })
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (data) => {
    const email = data.email.toLowerCase();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password === confirmPassword) {
      console.log('Email ', email);
      console.log('Password ', password);
      console.log('confirm Password', confirmPassword);
    }
  };

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/');
  };

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      setCountries(data);
    }
    fetchData();
  }, []);
  return (
    <div className="registerPage">
      <div className="registerForm">
        <div className="registerHeader">
          <img src={logo} width="50px" height="50px" />
          <h1 id="headerTopic">TourGenius</h1>
        </div>
        <div>
          <p id="signUpTopic">Sign Up</p>
        </div>
        <div className="formBody">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
              <div className="firstLastName">
                <Field
                  as={TextField}
                  sx={{ width: '49%' }}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  helperText={
                    <ErrorMessage
                      name="firstName"
                      render={(msg) => <span id="errMsg">{msg}</span>}
                    />
                  }
                />
                <Field
                  as={TextField}
                  sx={{ width: '49%' }}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  helperText={
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => <span id="errMsg">{msg}</span>}
                    />
                  }
                />
              </div>
              <div className="ageCountry">
                <Field
                  as={TextField}
                  sx={{ width: '49%' }}
                  name="age"
                  label="Age"
                  variant="outlined"
                  size="small"
                  helperText={
                    <ErrorMessage name="age" render={(msg) => <span id="errMsg">{msg}</span>} />
                  }
                />
                <Autocomplete
                  sx={{ width: '49%' }}
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <Field
                      as={TextField}
                      {...params}
                      label="Country"
                      name="country"
                      variant="outlined"
                      size="small"
                      helperText={
                        <ErrorMessage
                          name="country"
                          render={(msg) => <span id="errMsg">{msg}</span>}
                        />
                      }
                    />
                  )}
                  value={selectedCountry}
                  onChange={(event, newValue) => {
                    setSelectedCountry(newValue);
                  }}
                />
              </div>
              <Field
                as={TextField}
                sx={{ width: '100%' }}
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                helperText={
                  <ErrorMessage name="email" render={(msg) => <span id="errMsg">{msg}</span>} />
                }
              />

              <Field
                as={TextField}
                sx={{ width: '100%', marginTop: '35px' }}
                name="password"
                label="Password"
                type={'password'}
                variant="outlined"
                size="small"
                helperText={
                  <ErrorMessage name="password" render={(msg) => <span id="errMsg">{msg}</span>} />
                }
              />
              <Field
                as={TextField}
                sx={{ width: '100%', marginTop: '35px' }}
                name="confirmPassword"
                label="Confirm Password"
                type={'password'}
                variant="outlined"
                size="small"
                helperText={
                  <ErrorMessage
                    name="confirmPassword"
                    render={(msg) => <span id="errMsg">{msg}</span>}
                  />
                }
              />
              <Button variant="contained" sx={{ width: '100%', marginTop: '35px' }} type="submit">
                register
              </Button>
            </Form>
          </Formik>
        </div>
        <div>
          <Button variant="text" sx={{ marginTop: '20px' }} onClick={navigateToSignIn}>
            back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
