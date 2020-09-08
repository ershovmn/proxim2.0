import React from 'react'
import Gallery from '../components/Galery'
import { isMobile } from 'react-device-detect'
import {homeImages} from '../src/equipments'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'

const Home = () => {
    console.log('hi')
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
						<Gallery images={homeImages} width='100%' />
					</div>
					<div className='home-text'>
						<p>Компания ООО "ПРОКСИМА" осуществляет свою деятельность на российском рынке более 20 лет. Мы специализируемся на разработке, производстве, поставке и сервисном обслуживании оборудования для трафаретной печати, применяемом в малом и среднем бизнесе.</p>
						<p>Все разработанное оборудование проходит испытание на опытном производстве компании (цех трафаретной печати - шелкография) в реальных условиях эксплуатации. По замечаниям опытного производства происходит модернизация уже выпущенного оборудования.</p>
						<p>Наши специалисты помогут Вам решить широкий спектр вопросов в области трафаретной печати таких как: выбор необходимого оборудования, обучение Ваших работников, сервисное обслуживание (гарантийное и после гарантийное), оптимизация Вашего технологического процесса и многое другое.</p>
						<p>Мы будем рады сотрудничать с Вами!</p>
					</div>
				</div>
			</div>
			
        </>
    )
}

export default Home