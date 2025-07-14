import React from 'react';
import Slider from '../../../components/Home/Slider/Slider';
import Category from '../../../components/Home/Category/Category';
import DiscountProducts from '../../../components/Home/DiscountProducts/DiscountProducts';
import LatestNews from '../../../components/Home/LatestNews/LatestNews';
import FAQ from '../../../components/Home/FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <DiscountProducts></DiscountProducts>
            <LatestNews></LatestNews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;