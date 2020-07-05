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
            </Head>
			<Header />
			<div style={{marginRight: '1%', marginLeft: '1%', overflowX: 'auto', paddingTop: '70px'}} >
				<div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', marginLeft: '30px', marginRight: '30px', marginTop: '10px', flex: 1}}>
					<div style={{width: isMobile ? '100%' : '60%', marginTop: '40px'}}>
						<Gallery images={homeImages} width='100%' />
					</div>
					<div style={{marginTop: '50px', marginLeft: '50px', flex: 1, fontSize: '18px'}}>
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