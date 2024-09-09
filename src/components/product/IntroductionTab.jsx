import React from 'react';

const IntroductionTab = ({introText}) => {
  return (
    <section id="introduction" >
    <span className="relative">معرفی</span>
    <div className='styles_Title_line_red'></div>
      <p dangerouslySetInnerHTML={{ __html: introText }} >
      </p>
    </section>
  );
};

export default IntroductionTab;