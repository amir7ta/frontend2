import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from '@fortawesome/free-solid-svg-icons';
import CommentForm from "./CommentForm";
import SuccessMessage from "./SuccessMessage";
import StarRatings from 'react-star-ratings';

const CommentList = ({ initialComments }) => {
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToReply, setCommentToReply] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openModal = (comment) => {
    setIsModalOpen(true);
    setCommentToReply(comment);
    document.body.classList.add("modal-open");
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

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);
  
  const handleLike = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.commentId === commentId) {
        return { ...comment, like: comment.like? comment.like+ 1:1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDislike = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.commentId === commentId) {
        return { ...comment, dislike: comment.dislike? comment.dislike+ 1:1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="comment-list">
      {comments && comments.map((comment) => (
        <Comment
          key={comment.commentId}
          comment={comment}
          onLike={handleLike}
          onDislike={handleDislike}
          replies={comment.replies}
          openModalCallBack = {openModal}
        />
        
      ))}
        {isModalOpen && (
          <div style={{"zIndex":'1000'}} className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              {!showSuccessMessage && (
                <CommentForm callBackSuccess={CommentSubmited} commentToReply={commentToReply} callBackClose={closeModal} />
              )}
              {showSuccessMessage && <SuccessMessage />}
            </div>
          </div>
        )}
    </div>
  );
};

const Comment = ({ comment, onLike, onDislike, replies , openModalCallBack}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const openModal=()=>{
    openModalCallBack(comment);
  }
  return (
    <>
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">کاربر</div>
       
      </div>
      <div className="star-rating rtl">
           <StarRatings 
                  name="rating" 
                  rating={comment.productRating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="5px"
                  ignoreInlineStyles = {false}
                  title="امتیاز"
            />
        </div>
      <div className="comment-body">{comment.text}</div>
      <div className="comment-footer">
        <div className="comment-date">{comment.curDate}</div>
        {/* <div className="comment-store">دیجی کالا</div> */}
        <div className="comment-actions">
          <span onClick={() => onLike(comment.commentId)} className="comment-action like">
            <FontAwesomeIcon icon={faThumbsUp} className='like'/> {comment.like}
          </span>
          <span onClick={() => onDislike(comment.commentId)} className="comment-action disLike">
            <FontAwesomeIcon icon={faThumbsDown} className='disLike' /> {comment.dislike}
          </span>
          {/* <span className="comment-action" onClick={openModal}>
            <FontAwesomeIcon icon={faReply} /> پاسخ
          </span>
         */}
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className="reply-list">
          {replies && replies.map((reply) => (
            <Comment
              key={reply.commentId}
              comment={reply}
              onLike={onLike}
              onDislike={onDislike}
              replies={reply.replies}
              openModalCallBack = {openModalCallBack}
            />
          ))}
        </div>
      )}
     
    
    </div>
          

          </>
  );
};

export default CommentList;
