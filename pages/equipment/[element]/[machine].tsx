import React, { useRef, useEffect, useState } from 'react'
import { list } from './index'
// import equipments , {des} from '../../../src/equipments'
import Gallery from '../../../components/Galery'
import { ListGroup } from 'react-bootstrap'
import { isMobile, isBrowser } from 'react-device-detect'
import Header from '../../../components/Header'
import { useRouter } from 'next/router'
import Head from 'next/head'
import fs  from 'fs'
import Machine from '../../../components/Machine'

const  AboutEquipment = (props : any) => {
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
    const myRef = useRef(null)
    const {element, machine} = router.query

    if(loading) return <></>

    console.log(equipments)

    // let equipments = JSON.parse(await getData()


    if(element === undefined || machine === undefined) {
        return (<></>)
    }

    let id = element
    let num = machine.toString()

    

    console.log(id, num)

    let i = -1

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
                <link rel="stylesheet" href="/static/styles.css"></link>
            </Head>
            <Header />
            <Machine item={item}/>
        </div>
    )
}

export default AboutEquipment