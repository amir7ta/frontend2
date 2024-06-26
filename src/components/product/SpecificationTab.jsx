import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';

const SpecificationsTab = () => {
  const { id } = useParams();
  const [specifications, setSpecifications] = useState([]);
  const productDetail = useSelector(selectProductDetail);

  // useEffect(() => {
  //   fetch(`/api/products/${productDetail.productId}/specifications`)
  //     .then((response) => response.json())
  //     .then((data) => setSpecifications(data));
  // }, [productDetail]);

  return (
    <section id="specifications">
    <span className="relative">مشخصات</span>
<div className='styles_Title_line_red'></div>
      <ul>
        {specifications.map((spec) => (
          <li key={spec.id}>
            <span className="spec-title">{spec.title}</span>
            <span className="spec-value">{spec.value}</span>
          </li>
        ))}
      </ul>
      <p>

      امکانات و تجهیزات:

شاهین مجهز به امکانات رفاهی و ایمنی متعددی است. از جمله این امکانات می‌توان به سیستم تهویه مطبوع، سیستم کنترل پایداری الکترونیکی (ESC)، سیستم ترمز ضد قفل (ABS)، کیسه‌های هوای جلو و جانبی، سیستم صوتی پیشرفته با قابلیت اتصال به بلوتوث، و صفحه نمایش لمسی اشاره کرد.
فضای داخلی:

فضای داخلی شاهین با طراحی ارگونومیک و استفاده از مواد با کیفیت، راحتی و رفاه را برای سرنشینان فراهم می‌کند. صندلی‌ها با طراحی مناسب و قابلیت تنظیم به صورت برقی یا دستی، سفرهای طولانی را راحت‌تر می‌کنند.
مزایا:
قیمت مناسب: یکی از نقاط قوت شاهین، قیمت مناسب آن در مقایسه با خودروهای هم‌رده خود است که آن را به گزینه‌ای جذاب برای خریداران تبدیل می‌کند.
مصرف سوخت بهینه: با توجه به موتور توربوشارژ و تکنولوژی‌های به کار رفته، شاهین مصرف سوخت بهینه‌ای دارد که برای استفاده‌های شهری و جاده‌ای مناسب است.
ایمنی: امکانات ایمنی متعددی در این خودرو وجود دارد که رانندگی را ایمن‌تر می‌کند.
نتیجه‌گیری:
ماشین شاهین به عنوان یکی از جدیدترین محصولات سایپا، ترکیبی از طراحی مدرن، کارایی مناسب و امکانات رفاهی و ایمنی را ارائه می‌دهد. این خودرو با قیمت مناسب و ویژگی‌های رقابتی، گزینه‌ای خوب برای خریداران خودروهای سدان در بازار ایران محسوب می‌شود.
      </p>
    </section>
  );
};

export default SpecificationsTab;