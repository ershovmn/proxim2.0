import React, { useState, useEffect } from 'react'
import {Nav} from 'react-bootstrap'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Head from 'next/head'

const Equipment = () => {
    let [equipments, setEquipments] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMyApi() {
            const res = await fetch('http://localhost:8000/getdata')
			const data = await res.json()
			console.log(data)
            setEquipments(data.equipments)
            setLoading(false)
        }
        fetchMyApi()
        document.body.style.setProperty('padding-top', '70px')
	}, [])
    let router = useRouter()
    let {element} = router.query
    let i = -1

    for (let j = 0; j < equipments.length; j++) {
        if(equipments[j].id === element) {
            i = j;
        }
    }

    let array = i !== -1 ? equipments[i].items : []

    if(i === -1) {
        return (
            <>
                <Header />
            </>
        )
    }

    return(
        <div>
            <Head>
                <title>{equipments[i].name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div style={{marginRight: '1%', marginLeft: '1%', overflowX: 'auto'}} >
                <Nav className="flex-column">
                    {array.map((item, index) => {
                        if(item.section !== -1) return null
                        return (
                            <Nav.Link href={`/equipment/${element}/${index}`}>{item.name}</Nav.Link>
                        )
                    })}
                </Nav>
                {equipments[i].sections.map((section, ind) => {
                    return (
                        <>
                            <h5>{section}</h5>
                            <Nav className="flex-column">
                                {array.map((item, index) => {
                                    if(item.section !== ind) return null
                                    return (
                                    <Nav.Link href={`/equipment/${element}/${index}`}>{item.name}</Nav.Link>
                                    )
                                })}
                            </Nav>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export const list = [
    [
        {name: 'Станок для трафаретной печати карусельного типа «К4х4»', images: [], desription: []},
        {name: 'Станок для трафаретной печати карусельного типа «К6х6»', images: [], desription: []},
        {name: 'Станок для трафаретной печати карусельного типа «К6х8»', images: [], desription: []}
    ],
    [
        {name: 'Термопресс ТП400 400х400мм', images: [], desription: []},
        {name: 'Термопресс ТП600 400х600мм', images: [], desription: []},
        {name: 'Термопресс ТП800 600х800мм', images: [], desription: []},
    ],
    [
        {name: 'сушильная камера проходного типа Прометей 27М( данное название уточним позже)', images: [], desription: []},
        {name: 'Тоннельная сушка конвейерного типа Прометей 8М', images: [], desription: []},
        {name: 'Промежуточная сушка кпс 6 380V', images: [], desription: []},
        {name: 'Промежуточная сушка кпс 6 авто 380V', images: [], desription: []}
    ]
]

export default Equipment