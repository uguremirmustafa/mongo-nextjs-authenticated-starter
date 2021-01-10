/** @format */

import '@styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from '@components/MainLayout';
import { DataProvider } from '../store/GlobalState';
function Application({ Component, pageProps }) {
  const Layout = Component.Layout || MainLayout;

  return (
    <DataProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DataProvider>
  );
}

export default Application;
