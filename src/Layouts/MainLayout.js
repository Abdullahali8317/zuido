import React from 'react'
import Header from './../Components/Header'
import Footer from '../Components/CustomFooter';

 const MainLayout = props => {
  return (
    <div>
        <Header {...props}/>
        <div className="Main">
            {props.children}
            
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;
