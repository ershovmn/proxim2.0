import React, { useRef, useEffect } from 'react'
import { list } from './index'
import equipments from '../../../src/equipments'
import Gallery from '../../../components/Galery'
import { ListGroup } from 'react-bootstrap'
import { isMobile, isBrowser } from 'react-device-detect'
import Header from '../../../components/Header'
import { useRouter } from 'next/router'
import Head from 'next/head'
import '../../../src/styles.css'


const AboutEquipment = (props : any) => {
    let router = useRouter()
    const {element, machine} = router.query

    

    if(element === undefined || machine === undefined) {
        return (<></>)
    }

    let id = element
    let num = machine.toString()

    

    console.log(id, num)

    let i = -1

    const myRef = useRef(null)


    for (let j = 0; j < equipments.length; j++) {
        if(equipments[j].id === id) {
            i = j;
        }
    }


    let item = equipments[i].items[num]
    if(!item) {
        return (
            <Header />
        )
    }

    

    return (
        <div>
            <Head>
                <title>{item.name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div style={{marginRight: '1%', marginLeft: '1%', overflowX: 'auto', paddingTop: '70px'}} >
            {isBrowser ? 
                <>
                    <h2>
                        {item.name}
                    </h2>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{flex: 2}}>
                                <Gallery width='100%' images={item.images} />
                            </div>
                            <div style={{flex: 1}}/>
                            <div style={{flex: 1}}>
                                {equipments[i].items[num].models.length === 0 ? null : 'Модели'}
                                <ListGroup>
                                    {equipments[i].items[num].models.map((model, index) => {return (<ListGroup.Item as='li' disabled>{model.name}</ListGroup.Item>)})}
                                </ListGroup>
                            </div>
                        </div>
                        <div>
                            {equipments[i].items[num].desription}
                        </div>
                        <div ref={myRef} style={{marginTop: '40px'}}>
                            {lastParagraph}
                        </div>
                    </div>
                </> 
                : 
                <>
                    <h4>
                        {item.name}
                    </h4>
                    <div>
                        <Gallery width='100%' images={item.images} />
                        <div>
                            {equipments[i].items[num].models.length === 0 ? null : 'Модели'}
                            <div style={{width: '100%', overflowX: 'scroll'}}>
                                <ListGroup horizontal>
                                    {equipments[i].items[num].models.map((model, index) => {return (<ListGroup.Item as='li' disabled>{model.name}</ListGroup.Item>)})}
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                    <div>
                        {equipments[i].items[num].desription}
                    </div>
                    <div style={{marginTop: '40px'}}>
                        {lastParagraph}
                    </div>
                </>
            }
            </div>
        </div>
    )
}

const lastParagraph = <>
    <p>Условия поставки оборудования:</p>
    <ol>
        <li>Договор на поставку оборудования.</li>
        <li>Предоплата 50%.  </li>
        <li>Срок поставки – устанавливается в момент подписания договора (до 4-6 недель со времени получения предоплаты).</li>
        <li>Отправка – через транспортную компанию или само-вывоз.</li>
        <li>В цену оборудования не входит упаковка(обязательна при отгрузке транспортной компанией).</li>
        <li>При комплексном заказе оборудования предусматриваются скидки.</li>
        <li>Гарантия на оборудование-12 месяцев с даты отгрузки, послегарантийное обслуживание.</li>
    </ol>                        
    <p>E-mail: <a href="mailto:proxim@dubna.ru">proxim@dubna.ru</a></p>
    <p>Телефоны <a href="tel:+7 (495) 777-0-776">+7 (495) 777-0-776</a>, <a href="tel: +7 (916) 684-60-39">+7 (916) 684-60-39</a>.</p>
</>

export default AboutEquipment