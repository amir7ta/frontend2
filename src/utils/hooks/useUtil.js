import { useState } from 'react';
import Persian from 'persianjs';

export const useStatusString = () => {
    return (status) => {
      const statusMap = {
        1: { statusString: 'تازه ثبت شده', className: 'yellow' },
        2: { statusString: 'در حال بسته بندی', className: 'pink' },
        3: { statusString: 'در حال حمل و نقل', className: 'blue' },
        4: { statusString: 'تحویل داده شد', className: 'green' },
        5: { statusString: 'لغو شده', className: 'red' }
      };
      const statusObj = statusMap[status] ?? { statusString: '', className: '' };
      return <p className={`txt ${statusObj.className}`}>{statusObj.statusString}</p>;
    };
};
export const persianToEnglishDigits = (str) => {
  if (typeof str !== 'string') {
    str = String(str);
  }
  
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  
  return str.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
};
// export const persianToEnglishDigits = (str) => {
//   const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//   const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//   return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
// };
export const useStock = () => {
  return (stock) => {
    const stockMap = {
      true: { statusString: 'موجود', className: 'green' },
      false: { statusString: 'تمام شد', className: 'red' },
    };
    const stockObj = stockMap[stock] ?? { statusString: '', className: '' };
    return <p className={`txt ${stockObj.className}`}>{stockObj.statusString}</p>;
  };
};

export default function useToggle(initialValue = false) {
  const [toggled, setToggled] = useState(initialValue);

  function toggle() {
    setToggled(!toggled);
  }

  function isToggled() {
    return toggled;
  }

  return { toggle, isToggled };
}

export const formatPrice = (price) => {
  if (price == null) {
    return '0';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('fa-IR', options);
}

export function formatDateTime(dateTime) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(dateTime).toLocaleDateString('fa-IR', options);
}
export function NumberInPersian(number) {
  if(number)
    return  Persian(number).englishNumber().toString();
  else 
  return ''
}
export function NumberInEnglish(number) {
  if(number)
    return  englishNumber(number);
  else 
  return ''
}
export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
export function truncateNumber(number, num) {
  if (number.length <= num) {
    return number;
  }
  return number.slice(0, num);
}
