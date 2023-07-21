import React from 'react';
import { Formik } from 'formik';
import './App.css';

function App() {
  const [file, setFile] = React.useState(null);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  const handleFormSubmit = () => {
    alert('Sent successfully!!!');
  };

  return (
    <Formik
      initialValues={{
        email: '',
        title: '',
        message: '',
        file: null // Add the 'file' field to the initial values
      }}
      onSubmit={handleFormSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.title) {
          errors.title = 'Tiêu đề không được để trống';
        }

        if (!values.email) {
          errors.email = 'Email người nhận không được để trống';
        } else if (!REGEX.email.test(values.email)) {
          errors.email = 'Email người nhận chưa đúng';
        }

        if (!values.message) {
          errors.message = 'Tin nhắn không được để trống';
        }

        return errors;
      }}
    >
      {({ values, errors, handleChange, handleSubmit, handleBlur, touched, setFieldTouched }) => (
        <div className='main'>
          <form id='form-1' className='form' onSubmit={handleSubmit}>
            <h3 className='heading'>Mail form</h3>

            <div className={`form-group ${errors.email && touched.email ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='email'>
                To
              </label>
              <input
                name='email'
                id='email'
                placeholder='VD: email@domain.com'
                className='form-control'
                value={values.email}
                onChange={handleChange}
                onBlur={() => setFieldTouched('email', true)}
              />
              {errors.email && touched.email && <span className='form-message'>{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.title && touched.title ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='title'>
                Title
              </label>
              <input
                name='title'
                id='title'
                placeholder='VD: Báo cáo xyz'
                className='form-control'
                value={values.title}
                onChange={handleChange}
                onBlur={() => setFieldTouched('title', true)}
              />
              {errors.title && touched.title && <span className='form-message'>{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.message && touched.message ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='message'>
                Message
              </label>
              <textarea
                id='message'
                className='form-control'
                name='message'
                rows={4}
                cols={50}
                placeholder='Để lại lời nhắn'
                value={values.message}
                onChange={handleChange}
                onBlur={() => setFieldTouched('message', true)}
              ></textarea>
              {errors.message && touched.message && <span className='form-message'>{errors.message}</span>}
            </div>

            <div>
              <input type='file' name='file' onChange={(e) => {
                setFile(e.currentTarget.files[0]);
                handleChange(e);
              }} />
            </div>

            <button type='submit' className='form-submit'>
              Submit
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default App;