import React from 'react'


export default function MyApp({ Component, pageProps }) {
    console.log('hello')
    return <Component {...pageProps} />
}