import React from 'react';
import { OverLay, Content } from './Review.styles';
import Image from './../../../../assets/images/review.jpg';
const ReviewProduct = ({ show, setShow, data }) => {
  return (
    <OverLay className={show ? 'active' : ''} onClick={() => setShow(!show)}>
      <Content
        className={show ? 'container activeContent' : 'container'}
        onClick={(e) => e.stopPropagation()}
      >
        <p> {data.values.name} </p>
        <p> {data.values.video} </p>
        {data.values.description}
        <img src={Image} />{' '}
      </Content>
    </OverLay>
  );
};

export default ReviewProduct;
