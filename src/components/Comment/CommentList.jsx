import React from 'react';

const Comment = ({ comment, onLike, onDislike, userLiked }) => {
    return (
      <div className="comment">
        <p>{comment.content}</p>
        <div>
          <button onClick={onLike} disabled={userLiked}>
            لایک
          </button>
          <span>تعداد لایک‌ها: {comment.likes}</span>
          <button onClick={onDislike} disabled={userLiked}>
            دیس‌لایک
          </button>
        </div>
      </div>
    );
  };


  const CommentList = ({ comments, onLike, onDislike, userLikedCommentIds }) => {
    return (
      <div className="comment-list">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={() => onLike(comment.id)}
            onDislike={() => onDislike(comment.id)}
            userLiked={userLikedCommentIds.includes(comment.id)}
          />
        ))}
      </div>
    );
  };

export default CommentList;
