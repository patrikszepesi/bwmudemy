import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';

import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmFileUpload } from 'components/shared/form/BwmFileUpload';
import { BwmResError } from 'components/shared/form/BwmResError';
// import { required, minLength4 } from 'components/shared/form/validators';d

const HouseCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>

    <Field
      name="sharedH"
      type="checkbox"
      label='Pipáld be ha ez egy Csoportos óra(Több mint egy diákot tanítasz egy órában) '
      className='form-control'
      component={BwmInput}
    />
    <Field
      name="cityH"
      type="text"
      label='Milyen Tárgyakat Oktatnál'
      placeholder="pl. Angol, Pénzügyi Számvitel"
      className='form-control'
      component={BwmInput}
    />
    <Field
      options={options}
      name="categoryH"
      label='Jelenlegi Státuszod'
      className='form-control'
      component={BwmSelect}
    />
    <Field
        name="titleH"
        type="text"
        label='Intézmény/Munkahely neve'
        placeholder="Jelenlegi"
        className='form-control'
        component={BwmInput}
      />
      <Field
       name="descriptionH"
       type="text"
       label='Magadról'
       rows='6'
       placeholder="Tapasztalataid a tárggyal, stb."
       className='form-control'
       component={BwmTextArea}
     />
     <Field
       name="city2"
       type="text"
       label='Tanítás Helyszíne'
       placeholder='Város'
       className='form-control'
       component={BwmInput}
     />
     <Field
       name="streetH"
       type="text"
       label='Tanítás Helyszíne'
       placeholder='Utca'
       className='form-control'
       component={BwmInput}
     />

     <Field
       name="image"
       label='Image'
       component={BwmFileUpload}
     />

     

     <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
       Profil Elkészítése
     </button>
     <BwmResError errors={errors} />
   </form>
 )
 }

 export default reduxForm({
 form: 'houseCreateForm',
 initialValues: { shared: false, category:'Másodéves Hallgató',reserve:false}
 })(HouseCreateForm)
