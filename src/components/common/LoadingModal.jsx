import React from "react";

const LoadingModal = ({ loading,adminPanel =false}) => {
  if (!loading) return null;
  return (
    <div className={adminPanel?"admin-loading-modal":"loading-modal"}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingModal;