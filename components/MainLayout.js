/** @format */

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import Notify from '@components/Notify';

function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Dashify | Best Admin Panel </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar transparent={false} />
      <Notify />
      <main style={{ position: 'relative', marginTop: '80px' }}>{children}</main>
    </>
  );
}

export default MainLayout;
