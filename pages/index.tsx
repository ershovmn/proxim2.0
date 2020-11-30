import React from 'react'
import Gallery from '../components/Galery'
import { isMobile } from 'react-device-detect'
import {homeImages} from '../src/equipments'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import { convertDataToHtml } from '../components/Machine'

const Home = () => {
	console.log('hi')
	let data = require('../public/static/data/home.json')
    return(
      	<>
		  	<Head>
                <title>Proxim</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="stylesheet" href="/static/styles.css"></link>
            </Head>
			<Header />
			<div className='home-main'>
				<div className='home-block'>
					<div className='home-galery'>
						<Gallery images={data.images} width='100%'/>
					</div>
					<div className='home-text'>
						{convertDataToHtml(data.desription)}
					</div>
				</div>
			</div>
			
        </>
    )
}

export default Home