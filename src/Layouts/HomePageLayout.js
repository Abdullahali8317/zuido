import React from 'react'
import Header from './../Components/Header'
import Footer from '../Components/CustomFooter';

 const HomePageLayout = props => {
  return (
    <div className='fullHeight'>
        <Header {...props}/>
            {props.children}
            <Footer/>
    </div>
  );
};

export default HomePageLayout;
