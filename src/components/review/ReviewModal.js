import React from 'react';
import Modal from 'react-responsive-modal';
import StarRatings from 'react-star-ratings';

import * as actions from 'actions';


export class ReviewModal extends React.Component{

state={
  open:false,
  text:'',
  rating:3,
}

closeModal =()=>{
  this.setState({open:false});
}

publishReview=()=>{
  const{rating,text}=this.state;
  const{bookingId, onReviewCreated}=this.props;

  actions.createReview({rating,text},bookingId)
  .then(review=>{
  onReviewCreated(review);
    this.closeModal();
  })
}

openModal=()=>{
  this.setState({open:true});
}

handleTextChange=(event)=>{
  this.setState({text:event.target.value})
}

changeRating =( newRating, name )=> {
      this.setState({
        rating: newRating
      });
    }

  render(){

  const { open,text,rating } = this.state;

    return (
      <React.Fragment>
      <button style={{marginLeft:'5px',marginBottom:'10px',marginTop:'10px'}} className="btn btn-bwm-cool" onClick={this.openModal}>Oktató Értékelése</button>
      <Modal open={open} onClose={this.closeModal} little classNames={{ modal: 'review-modal' }}>
       <h4 className='modal-title title'>Írj Értékelést az Oktatódról</h4>
        <h8 className='modal-title title'>Csak az óra után írj Értékelést</h8>
       <div className='modal-body'>
        <textarea style={{marginBottom:'10px'}}
              value= {text}
              onChange={this.handleTextChange}
              className='form-control'
              placeholder='Milyen volt az Oktató és maga az óra'
              rows={10}
              cols={50}>
        </textarea>
      <StarRatings
        rating={rating}
        starRatedColor="orange"
        starHoverColor="orange"
        starDimensions='25px'
        starSpacing='2px'
        changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
    />

      </div>
      <div className='modal-footer'>
        <button disabled={!text|| !rating} onClick={this.publishReview} type='button' className='btn btn-bwm'>Elfogad</button>
        <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Mégsem</button>
      </div>
    </Modal>
    </React.Fragment>
    )
  }
}
