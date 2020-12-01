import React from 'react'
import Gallery from './Galery'
import { convertDataToHtml } from './Machine'

const HomeComponent = (props) => {
    return (
        <div className='home-main'>
				<div className='home-block'>
					<div className='home-galery'>
						<Gallery images={props.images.map(i => process.env.NEXT_PUBLIC_ENV_PROXIM_API + 'img/' + i)} width='100%'/>
					</div>
					<div className='home-text'>
						{convertDataToHtml(props.desription)}
					</div>
				</div>
			</div>
    )
}

export default HomeComponent