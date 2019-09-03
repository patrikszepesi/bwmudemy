import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmResError } from 'components/shared/form/BwmResError';
import { BwmSelect } from 'components/shared/form/BwmSelect';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors,options } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        placeholder='Teljes Neved'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        placeholder='Email'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        placeholder='Jelszó'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        placeholder='Jelszó újra'
        className='form-control'
        component={BwmInput}
      />

      <Field
        options={options}
        name="role"
        label='Jelenlegi Státuszod'
        className='form-control'
        component={BwmSelect}
      />

      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Regisztráció
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Teljes Név minimum 4 karakter kell, hogy legyen!';
  }

  if (!values.email) {
    errors.email = 'Az email kötelező!';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Írd be a Jelszót újra!';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'A Jelszónak egyeznie kell';
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
