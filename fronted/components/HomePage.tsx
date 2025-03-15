"use client";

import React from 'react'
// import { useRouter } from "next/router";

import Header from './Header';
import Tagline from './Tagline';

function HomePage() {
    // const router =useRouter()
  return (
    <>
    <div className="main_homepage_blob_image">
        <div className="main_content">
            <Header />
             <Tagline />
        </div>
    </div>
    </>
  )
}

export default HomePage