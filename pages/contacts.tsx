import React from 'react'
import {isMobile} from 'react-device-detect'
import Header from '../components/Header'
import Head from 'next/head'

const Contacts = () => {
    return (
        <>
        <Head>
            <title>Proxim</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <div style={{marginRight: '1%', marginLeft: '1%', overflowX: 'auto', paddingTop: '70px'}} >
            <div style={isMobile ? styleMobile : styleDesktop}>
                <div style={{flex: 2}}>
                    <p>
                        Время работы - с 9:00 до 18:00 <br/>
                        Обеденный перерыв с 12:00 до 13:30
                    </p>
                    <p>
                        Телефон\факс - <a href="tel:8 (495) 777-0-776">8 (495) 777-0-776</a>, <br />
                        Телефон - <a href="tel:8 (49621) 2-40-99">8 (49621) 2-40-99</a>
                    </p>
                    <p> 
                        Юридический адрес: <br/>
                        141983, Московская область, г.Дубна, ул.Жуковского, д.2
                    </p>
                    <p>
                        Почтовый адрес: <br/>
                        141983, Московская область, г.Дубна, Макаренко 23, кв 39
                    </p>
                    <p> 
                        E -mail - <a href="mailto:proxim@dubna.ru">proxim@dubna.ru</a> - оборудование для трафаретной печати
                    </p>
                </div>
                <div style={{flex: 1, height: '50vh', maxWidth: '96vw'}}>
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6dea6a8a5029fd09ee2ff78945c4a93dc7102ff8f24d85314c8f963369d386a5&amp;source=constructor" width="100%" height="100%"></iframe>
                </div>
            </div>
        </div>
        </>
    )
}

const styleDesktop = {
    marginTop: '10px', 
    marginLeft: '20px', 
    marginRight: '20px', 
    display: 'flex', 
    flexDirection: 'row'
}

const styleMobile = {
    marginTop: '10px', 
    marginLeft: '20px', 
    marginRight: '20px', 
}

export default Contacts