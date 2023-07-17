import '@/styles/globals.css'
import Head from 'next/head';
// import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
 
  return (
    <>
      <Head>
        <meta name="description" content="Author: A.N. Author, Illustrator: P. Picture, Category: Books, Price: $17.99, Length: 784 pages" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
