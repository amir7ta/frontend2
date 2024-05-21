import React, { useState, useEffect,useRef } from 'react';
import StarRatings from 'react-star-ratings';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CommentForm({callBackSuccess}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const buttonRef = useRef(null);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
   
  
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setIsSubmitted(false); // Reset isSubmitted state
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    };

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('نظر نمی‌تواند خالی باشد!')
    });

    // const formik = useFormik({
    //   initialValues: {
    //       comment: ''
          
    //   },
    //   validationSchema: validationSchema,
    //   onSubmit: (values) => {
    //       console.log(values);
    //       setIsSubmitted(true);
    //       setTimeout(() => {
    //           closeModal();
    //       }, 1500); // Close modal after 1.5 seconds
    //   }
    // });


    return (
        <>
           

              <Formik
                    initialValues={{
                      rating: 5,
                      comment: ''
                    }}
                    validationSchema={Yup.object().shape({
                      rating: Yup.number()
                        .min(1, 'امتیاز باید حداقل 1 باشد')
                        .max(5, 'امتیاز نمی‌تواند بیشتر از 5 باشد')
                        .required('امتیاز الزامی است'),
                      comment: Yup.string()
                        .min(5, 'نظر باید حداقل 5 کاراکتر باشد')
                        .required('نظر الزامی است')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      callBackSuccess()
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div>
                        <label htmlFor="rating">امتیاز:</label>
                                              <StarRatings
                                              name="rating" 
                                                  rating={rating}
                                                  starRatedColor="gold"
                                                  changeRating={handleRatingChange}
                                                  numberOfStars={5}
                                                  starDimension="25px"
                                                  starSpacing="5px"
                                                  title="امتیاز"
                                              />
                          <ErrorMessage name="rating" component="div" className='errorMessage'/>
                        </div>
                        <div>
                          <label htmlFor="comment">نظر:</label>
                          <Field as="textarea" name="comment" id="comment" className='textarea-comment'/>
                          <ErrorMessage name="comment" component="div" className='errorMessage' />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'در حال ارسال...' : 'ثبت نظر'}
                        </button>
                      </Form>
                    )}
                  </Formik>
        </>
    );
}

export default CommentForm;
