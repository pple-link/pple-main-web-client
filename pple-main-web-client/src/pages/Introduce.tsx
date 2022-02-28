import React from 'react';
import intro1 from '../static/images/intro/introPage1.svg';
import intro2 from '../static/images/intro/introPage2.svg';
const Introduce = () => {
  const imageStyle = {
    background: 'white',
    width: '100%',
  };
  return (
    <div>
      <div>
        <img src={intro1} alt="" style={imageStyle} />
      </div>
      <div>
        <img src={intro2} alt="" style={imageStyle} />
      </div>
    </div>
  );
};

export default Introduce;
