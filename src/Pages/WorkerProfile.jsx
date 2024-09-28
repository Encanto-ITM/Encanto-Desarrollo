import React from 'react';
import { ProfileHeader } from '../Components/Worker-components/ProfileHeader.jsx';
import { WorkerInfo } from '../Components/Worker-components/WorkerInfo.jsx';
import { SocialMedia } from '../Components/Worker-components/SocialMedia.jsx';
import { ProductList } from '../Components/Worker-components/ProductList.jsx';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';

export function WorkerProfile() {
  return (
    <div className=" mx-auto ">
         <Nav />
        <div className='px-8'>
      <ProfileHeader />
      <WorkerInfo />
      <SocialMedia />
      <ProductList />
      </div>
      <Footer />

    </div>
  );
}