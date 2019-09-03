
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';

import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmFileUpload } from 'components/shared/form/BwmFileUpload';
import { BwmResError } from 'components/shared/form/BwmResError';
// import { required, minLength4 } from 'components/shared/form/validators';d

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
    <Field
      name="name2"
      type="text"
      label='Teljes neved'
      placeholder="Szóközzel"
      className='form-control'
      component={BwmInput}
    />
    <Field
      name="shared"
      type="checkbox"
      label='Pipáld be ha ez egy Csoportos óra(Több mint egy diákot tanítasz egy órában) '
      className='form-control'
      component={BwmInput}
    />
    <Field
      name="city"
      type="text"
      label='Milyen Tárgyakat Oktatnál'
      placeholder="pl. Angol, Pénzügyi Számvitel"
      className='form-control'
      component={BwmInput}
    />
    <Field
      options={options}
      name="category"
      label='Jelenlegi Státuszod'
      className='form-control'
      component={BwmSelect}
    />
    <Field
        name="title"
        type="text"
        label='Intézmény/Munkahely neve'
        placeholder="Jelenlegi"
        className='form-control'
        component={BwmInput}
      />
      <Field
       name="description"
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
       name="street"
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

     <Field

       name="major"
       type="text"
       label='Milyen Szakot végzel/végeztél'
       placeholder="pl. Pénzügy Számvitel"
       className='form-control'
       component={BwmInput}
     />
     <Field
       name="email"
       type="text"
       label='Elérhetőség '
       placeholder="Emailcímed"
       className='form-control'
       component={BwmInput}
     />
     <Field
       name="contact2"
       type="text"
       label='Elérhetőség '
       placeholder="Mobilszámod(nem kötelező)"
       className='form-control'
       component={BwmInput}
     />
     <Field
       name="dailyRate"
       type="text"
       label='Órabéred '
       placeholder="Csak szám"
       className='form-control'
       symbol='HUF'
       component={BwmInput}
     />
     <Field
       name="available"
       type="text"
       label='Mikor Érsz rá általában '
       placeholder="Írj több időpontot(pl. Kedd 15:00-18:00, Szerda 08:00-12:00 stb.)"
       className='form-control'
       component={BwmTextArea}
     />

     <Field
       name="reserve"
       type="checkbox"
       label='Pipald be ha használod a Gyors Foglalót. Ammenyiben használod, a Tantárgyaid menüre kell rámenned, hogy lásd a beérkező foglalásokat. A diákok csak akkor tudnak értékelést írni rólad ha használod a Gyors Foglalót. A Profilodat sokkal többen fogják megnézni ha használod a Gyors Foglalót '
       className='form-control'
       component={BwmInput}
     />

     <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
       Profil Elkészítése
     </button>
     <BwmResError errors={errors} />
   </form>
 )
 }

 export default reduxForm({
 form: 'rentalCreateForm',
 initialValues: { shared: false, category:'Másodéves Hallgató',reserve:false}
 })(RentalCreateForm)
