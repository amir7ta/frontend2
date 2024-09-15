import React, { useState, useEffect,useRef } from 'react';
import { useParams } from "react-router-dom";

import StarRatings from 'react-star-ratings';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createComment, selectLoading, selectError } from '../../store/reducers/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from "../common/LoadingModal";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { StarRate } from '@mui/icons-material';

function CommentForm({callBackSuccess, callBackClose, commentToReply, modalContent}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const productDetail = useSelector(selectProductDetail);


    const initialComment = {
      userId:1,
      rating: 5,
      comment: '',
      parentId:commentToReply?.commentId ||null,
      productId: productDetail.productId || ''
  };

    // useEffect(()=>{
    //   setComment(prevState => ({ ...prevState, ['productId']: productDetail.productId }));
    // },[productDetail])

    // useEffect(()=>{
    //   setComment(prevState => ({ ...prevState, ['parentId']: commentToReply.commentId }));
    // },[commentToReply])

    const handleRatingChange = (newRating) => {
        setRating(newRating)  
        setComment(prevState => ({ ...prevState, ['rating']: newRating }));
    };
    const buttonRef = useRef(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setComment(prevState => ({ ...prevState, [name]: value }));
    };  

    const validationSchema = Yup.object().shape({
        rating: Yup.number()
            .min(1, 'امتیاز باید حداقل 1 باشد')
            .max(5, 'امتیاز نمی‌تواند بیشتر از 5 باشد')
            .required('امتیاز الزامی است'),
        comment: Yup.string()
            .min(5, 'نظر باید حداقل 5 کاراکتر باشد')
            .required('نظر الزامی است')
    });

    return (
        <>
         <LoadingModal loading={loading} />
              

                      <div className="comment-modal-overlay">
                          <div className="comment-modal">
                          <div className="comment-modal-header">
                                  <span className="comment-modal-title">دیدگاه و امتیاز من</span>
                                  <div className="comment-modal-close" onClick={callBackClose}>
                                      <svg style={{ width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                          <path d="M19.293 6.707a1 1 0 00-1.414-1.414L12 10.586 6.121 4.707A1 1 0 004.707 6.12L10.586 12l-5.879 5.879a1 1 0 001.414 1.414L12 13.414l5.879 5.879a1 1 0 001.414-1.414L13.414 12l5.879-5.879z"/>
                                      </svg>
                                  </div>
                              </div>
                              <div className="comment-modal-container">
                                <div className='comment-div-item'><img src={modalContent.image} alt="Product" className="buy-modal-product-image" />
                                </div>
                                <div className="comment-div-item">
                                  {modalContent.name}
                                  {modalContent.size && (
                                    <span>{` سایز ${modalContent.size.size}`}</span>
                                  )}
                              
                                  </div>
                                  <div className='comment-div-item'>
                              <Formik
                            initialValues={initialComment}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await dispatch(createComment(values)).unwrap();
                                    callBackSuccess();
                                } catch (err) {
                                    console.error("Failed to create comment: ", err);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                              >
                                {({ isSubmitting , setFieldValue }) => (
                                  <Form>
                                    <div>
                                    <label htmlFor="rating">امتیاز:</label>
                                                          <StarRatings
                                                          name="rating" 
                                                              rating={rating}
                                                              starRatedColor="gold"
                                                              changeRating={(newRating) => {
                                                                handleRatingChange(newRating);
                                                                setFieldValue('rating', newRating);
                                                            }}
                                                              numberOfStars={5}
                                                              starDimension="25px"
                                                              starSpacing="5px"
                                                              title="امتیاز"
                                                          />
                                      <ErrorMessage name="rating" component="div" className='errorMessage'/>
                                    </div>
                                    <div>
                                      {commentToReply&& (<label htmlFor="comment">پاسخ به : {commentToReply.text}</label>)}
                                      {!commentToReply&& (<label htmlFor="comment">نظر:</label>)}

                                      <Field as="textarea" name="comment" id="comment" className='textarea-comment' />
                                      <ErrorMessage name="comment" component="div" className='errorMessage' />
                                    </div>
                                    {error && <div>خطا: {error}</div>}

                                    <button className="comment-modal-btn" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'در حال ارسال...' : 'ثبت امتیاز و دیدگاه'}
                                    </button>
     
                                  </Form>
                                )}
                              </Formik>
                              </div>
                              </div>
                          </div>
                      </div>
        </>
    );
}

export default CommentForm;




