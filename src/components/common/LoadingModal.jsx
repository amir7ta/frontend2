import React from "react";

const LoadingModal = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="loading-modal">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingModal;