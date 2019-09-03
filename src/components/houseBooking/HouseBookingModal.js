import React from 'react';
import Modal from 'react-responsive-modal';
import { BwmResError } from 'components/shared/form/BwmResError';

export function HouseBookingModal(props) {
  const { open, closeModal, booking, confirmModal, errors, housePriceH } = props;

  return (
    <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
     <h4 className='modal-title title'>Jelentekzés Beküldése</h4>
     <p className='dates'> Elérhetőséged : {booking.contactH}</p>
     <div className='modal-body'>

      <em>{housePriceH} HUF</em> per Óra

        <p>Neved: <em>{booking.guestsH}</em></p>
      <p>Időpont <em>{booking.startAtH}</em></p>
        <p><em>{booking.timeH}</em></p>

        <p>A Foglalásodat a </p>
      <p>Foglalásaid gombra kattintva</p>
      <p>tudod megnézni.</p>
        <p>Az óra után szintén ott tudod</p>
        <p>Értékelni az Oktatódat</p>
          <p>Az Oktató hamar vissza fog jelezni neked,</p>
          <p>hogy tudsz-e menni a kívánt időpontban</p>
    </div>
    <BwmResError errors={errors} />
    <div className='modal-footer'>
      <button onClick={confirmModal} type='button' className='btn btn-bwm'>Elfogad</button>
      <button type='button' onClick={closeModal} className='btn btn-bwm'>Mégsem</button>
    </div>
  </Modal>
  )
}
