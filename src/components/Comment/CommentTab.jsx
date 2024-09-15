import React, { useState, useEffect  } from 'react';
import axios from 'axios'; // برای ارسال درخواست‌های HTTP به سمت سرور
import { useParams } from "react-router-dom";
import CommentList from './CommentList';
import CommentForm from "./CommentForm";
import SuccessMessage from "./SuccessMessage";
import { fetchComments, selectComments, selectLoading, selectError } from '../../store/reducers/commentSlice';
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from "../common/LoadingModal";
import StarRatings from 'react-star-ratings';

const CommentTab = ({selectedProductSizeId}) => {
    // const { productId  } = useParams();
    // const { id } = useParams();
    const [isFixed, setIsFixed] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [userLikedCommentIds, setUserLikedCommentIds] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const comments = useSelector(selectComments);
    const productDetail = useSelector(selectProductDetail);
    const [rating, setRating] = useState(5);
    const size = productDetail.sizes.find(size => size.productSizeId === selectedProductSizeId);

    const dispatch = useDispatch();

    useEffect(() => {
      if(!productDetail) return;
      if(!comments || comments.length ==0 )
        dispatch(fetchComments(productDetail.productId));
       
    }, [productDetail, dispatch]);

    useEffect(() => {
      if(comments && comments.productRating && comments.productRating>0) 
       { setRating(comments.productRating)}
       else
       {   setRating(-1)}
    }, [comments]);

      const handleLike = commentId => {
        // ارسال درخواست به API برای لایک کردن کامنت با شناسه commentId
        axios.post(`آدرس_API/like/${commentId}`)
          .then(response => {
            setUserLikedCommentIds(prevIds => [...prevIds, commentId]); // اضافه کردن شناسه کامنت به آرایه لایک‌شده‌ها
          })
          .catch(error => {
            console.error('Error liking comment:', error);
          });
      };

      const handleDislike = commentId => {
        // ارسال درخواست به API برای دیس‌لایک کردن کامنت با شناسه commentId
        axios.post(`آدرس_API/dislike/${commentId}`)
          .then(response => {
            setUserLikedCommentIds(prevIds => [...prevIds, commentId]); // اضافه کردن شناسه کامنت به آرایه دیس‌لایک‌شده‌ها
          })
          .catch(error => {
            console.error('Error disliking comment:', error);
          });
      };
      const openModal = () => {
        setIsModalOpen(true);
        document.body.classList.add("modal-open");
        setModalContent({
            image: productDetail.mainImage,
            name: productDetail.name,
            price: size.price || productDetail.defaultPrice,
            size: size
        });
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove("modal-open");
      };
    
      const CommentSubmited = () => {
        setShowSuccessMessage(true);
      };
      useEffect(() => {
        if (showSuccessMessage) {
          const timer = setTimeout(() => {
            setShowSuccessMessage(false);
            closeModal();
          },1500); // 3 ثانیه
          return () => clearTimeout(timer);
        }
      }, [showSuccessMessage]);
      const handleComment = (event) => {
        event.preventDefault();
        if (newReview) {
          onReviewSubmit(newReview);
          setNewReview('');
        }
      };


 return (
  <section id="comments">
<span className="relative">امتیاز و دیدگاه کاربران</span>
<div className='styles_Title_line_red'></div>
    <div className="comment-section">
      
    <div className="review-container sticky-review-container">
          {
            rating > -1 && (
              <>
                <div className="average-rating">
                  <span className="rating">{rating}</span> از 5
                </div>
                <div className="star-rating rtl">
                  <StarRatings 
                    name="rating" 
                    rating={rating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="25px"
                    starSpacing="5px"
                    ignoreInlineStyles={false}
                    title="امتیاز"
                  />
                </div>
              </>
        )
      }
      <span style={{fontSize:'.8rem',paddingBottom:'20px'}}>شما هم درباره این کالا دیدگاه ثبت کنید</span>
      <button className='review-container-button' onClick={openModal}>ثبت دیدگاه</button>
      {/* لیست نظرات را در اینجا نمایش دهید */}
     
    </div>

      <div>
        {/* مودال */}
        {isModalOpen && (
          <div style={{"zIndex":'1000'}} className="modal">
            <div className="modal-content">
              {/* <span className="close" onClick={closeModal}>
                &times;
              </span> */}
              {!showSuccessMessage && (
                <CommentForm callBackSuccess={CommentSubmited} callBackClose={closeModal}  modalContent={modalContent}/>
              )}
              {showSuccessMessage && <SuccessMessage />}
            </div>
          </div>
        )}
      </div>
      <LoadingModal loading={loading} />
      <CommentList
        initialComments={comments.comments}
        
      />
      
    </div>
    </section>
  );
};

export default CommentTab;