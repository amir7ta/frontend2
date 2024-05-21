import React, { useState, useEffect } from 'react';
import axios from 'axios'; // برای ارسال درخواست‌های HTTP به سمت سرور
import { useParams } from "react-router-dom";
import CommentList from './CommentList';
import CommentForm from "./CommentForm";
import SuccessMessage from "./SuccessMessage";
const CommentTab = () => {
    const { productId  } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLikedCommentIds, setUserLikedCommentIds] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        // درخواست به API برای دریافت کامنت‌ها
        axios.get(`comment/getbyproductid/${productId}`)
          .then(response => {
            setComments(response.data); // قرار دادن کامنت‌های دریافت شده در وضعیت
            setLoading(false); // پایان بارگیری
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
            setLoading(false); // در صورت بروز خطا هم باید وضعیت لودینگ را به پایان برسانیم
          });
      }, []); // درخواست فقط یک بار بعد از بارگیری اجرا می‌شود

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
          }, 1500); // 3 ثانیه
          return () => clearTimeout(timer);
        }
      }, [showSuccessMessage]);
 return (

  
    <div className="comment-section">
      <h3>نظرات کاربران</h3>
      <button onClick={openModal}>افزودن دیدگاه</button>

      <div>
        {/* مودال */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              {!showSuccessMessage && (
                <CommentForm callBackSuccess={CommentSubmited} />
              )}
              {showSuccessMessage && <SuccessMessage />}
            </div>
          </div>
        )}
      </div>
      <CommentList
        comments={comments}
        onLike={handleLike}
        onDislike={handleDislike}
        userLikedCommentIds={userLikedCommentIds}
      />
    </div>
  );
};

export default CommentTab;