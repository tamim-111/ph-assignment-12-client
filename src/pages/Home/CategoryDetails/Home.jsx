import React from 'react';
import Slider from '../../../components/Home/Slider/Slider';
import Category from '../../../components/Home/Category/Category';
import DiscountProducts from '../../../components/Home/DiscountProducts/DiscountProducts';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <DiscountProducts></DiscountProducts>
        </div>
    );
};

export default Home;