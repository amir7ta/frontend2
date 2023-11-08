import React from 'react';
import { useUser} from "../../utils/hooks/useUser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../assets/icons/icons';
import useToggle  from "../../utils/hooks/useUtil"

function Details() {
    const { currentUser } = useUser();
    const { toggle, isToggled } = useToggle();

    return (
        <div className='shipping-content'>
            <div className='space-between'>
                <h1>آدرس تحویل</h1>
                <FontAwesomeIcon onClick={() => toggle()} icon={icons.edit}></FontAwesomeIcon>
            </div>
            <div className="line-divider"></div>
            <p>{currentUser?.firstName} {currentUser?.lastName}</p>
            <p>{currentUser?.address}</p>
            <p>{currentUser?.postalCode} {currentUser?.city}</p>
            <p>دانمارک</p>
            { isToggled() && <div>
                <div className="line-divider"></div>
                <div className="divider">
                    <label>
                        نام
                        <input value={currentUser?.firstName} readOnly />
                    </label>
                    <label>
                        نام خانوادگی
                        <input value={currentUser?.lastName} readOnly />
                    </label>
                </div>
                <label>
                    شماره موبایل
                    <input value={currentUser?.phone} readOnly />
                </label>
                <label>
                    آدرس
                    <input value={currentUser?.address} readOnly />
                </label>
                <div className='divider'>
                    <label>
                        شهر
                        <input value={currentUser?.city} readOnly />
                    </label>
                    <label>
                        کد پستی
                        <input value={currentUser?.postalCode} readOnly />
                    </label>
                </div>
                <button>ذخیره تغییرات</button>
            </div>}
        </div>
    );
}

export default Details;
