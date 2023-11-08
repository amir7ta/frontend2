import React  from 'react';

function Profile({currentUser}) {

  return (
    <>
          <h1>ویرایش مشخصات کاربر</h1>
          <div>
            <div className="divider">
              <label>
                نام
                <input value={currentUser.firstName} readOnly />
              </label>
              <label>
                نام خانوادگی
                <input value={currentUser.lastName} readOnly />
              </label>
            </div>
            <label>
              آدرس ایمیل
              <input value={currentUser.email} readOnly/>
            </label>
            <label>
              شماره موبایل
              <input value={currentUser.phone}readOnly />
            </label>
          </div>
          <h2>جزییات تحویل</h2>
          <label>
            آدرس
            <input value={currentUser.address} readOnly/>
          </label>
          <div className="divider">
            <label>
              کد پستی
              <input value={currentUser.postalCode} readOnly/>
            </label>
            <label>
              شهر
              <input value={currentUser.city} readOnly/>
            </label>
          </div>
          <div className="divider">
            <button className='second-button'>CANCEL</button>
            <button>ذخیره تغییرات</button>
          </div>
    </> 
  );
}

export default Profile;
