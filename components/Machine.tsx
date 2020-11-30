import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { isBrowser } from 'react-device-detect'
import Gallery from './Galery'
import '../public/static/styles.css'

export const convertDataToHtml = (data : string) => {
    let array = data.split('\n')
    let res : Array<React.ReactElement> = []

    let paragrachFlag = false
    let paragraphStrs = []

    let tableFlag = false 
    let tableData = []

    let listFlag = false 
    let listData = []

    for(let i = 0; i < array.length; i++) {
        let h1 = /^#\s/
        let h2 = /^##\s/
        let br = /\s\s$/
        let newp = /^\s\s$/
        let table1 = /^\|\s/
        let table2 = /\s\|$/
        let list = /^\+\s/

        console.log(array[i], 
            h1.test(array[i]),
            h2.test(array[i]),
            br.test(array[i]),
            newp.test(array[i]),
            table1.test(array[i]),
            table2.test(array[i]),
            paragrachFlag, paragraphStrs,
            tableFlag, tableData
        )

        if(h1.test(array[i])) {
            if(paragrachFlag) {
                res.push(<p>{paragraphStrs}</p>)
                paragrachFlag = false
                paragraphStrs = []
            }
            if(tableFlag) {
                res.push(<table style={{overflowX: 'auto'}}>{tableData}</table>)
                tableData = []
                tableFlag = false
            }
            if(listFlag) {
                res.push(<ul>{listData}</ul>)
                listData = []
                listFlag = false
            }
            res.push(<h2>{array[i].replace('# ', '')}</h2>)
            continue
        }
        if(h2.test(array[i])) {
            if(paragrachFlag) {
                res.push(<p>{paragraphStrs}</p>)
                paragrachFlag = false
                paragraphStrs = []
            }
            if(tableFlag) {
                res.push(<table style={{overflowX: 'auto'}}>{tableData}</table>)
                tableData = []
                tableFlag = false
            }
            if(listFlag) {
                res.push(<ul>{listData}</ul>)
                listData = []
                listFlag = false
            }
            res.push(<h3>{array[i].replace('## ', '')}</h3>)
            continue
        }

        if(table1.test(array[i]) && table2.test(array[i])) {
            if(paragrachFlag) {
                res.push(<p>{paragraphStrs}</p>)
                paragrachFlag = false
                paragraphStrs = []
            }
            if(listFlag) {
                res.push(<ul>{listData}</ul>)
                listData = []
                listFlag = false
            }
            tableFlag = true
            let line = []
            array[i].split('|').forEach(s => {
                if(s !== '') line.push(<td>{s}</td>)
            })
            tableData.push(<tr>{line}</tr>)
            continue
        }

        if(tableFlag) {
            console.log('push tale')
            res.push(<table style={{overflowX: 'auto'}}>{tableData}</table>)
            tableData = []
            tableFlag = false
        }

        if(list.test(array[i])) {
            if(paragrachFlag) {
                res.push(<p>{paragraphStrs}</p>)
                paragrachFlag = false
                paragraphStrs = []
            }
            listData.push(<li>{array[i].replace('+ ', '')}</li>)
            listFlag = true
            continue
        }

        if(listFlag) {
            res.push(<ul>{listData}</ul>)
            listData = []
            listFlag = false
        }

        if(newp.test(array[i])) {
            if(paragrachFlag) {
                res.push(<p>{paragraphStrs}</p>)
                paragrachFlag = false
                paragraphStrs = []
            }
            continue
        }

        if(paragrachFlag) {
            paragraphStrs.push(array[i])
        } else {
            paragraphStrs.push(array[i])
            paragrachFlag = true
        }

        if(br.test(array[i])) {
            paragraphStrs.push(<br/>)
            continue
        }
    }
    if(listFlag) {
        res.push(<ul>{listData}</ul>)
        listData = []
        listFlag = false
    }
    if(paragrachFlag) {
        console.log(paragraphStrs)
        res.push(<p>{paragraphStrs}</p>)
        paragrachFlag = false
        paragraphStrs = []
    }
    if(tableFlag) {
        res.push(<table style={{overflowX: 'auto'}}>{tableData}</table>)
        tableData = []
        tableFlag = false
    }

    console.log(res)
    return res
}

const Machine = (props : any) => {
    let item = props.item 
    return (
        <div style={{marginRight: '1%', marginLeft: '1%', overflowX: 'auto'}} >
            {isBrowser ? 
                <>
                    <h2>
                        {item.name}
                    </h2>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{flex: 2}}>
                                <Gallery width='100%' images={item.images.map(i => process.env.NEXT_PUBLIC_ENV_PROXIM_API + 'img/' + i)} />
                            </div>
                            <div style={{flex: 1}}/>
                            <div style={{flex: 1}}>
                                {item.models.length === 0 ? null : 'Модели'}
                                <ListGroup>
                                    {item.models.map((model, index) => {return (<ListGroup.Item as='li' disabled>{model.name}</ListGroup.Item>)})}
                                </ListGroup>
                            </div>
                        </div>
                        <div>
                            {convertDataToHtml(item.desription)}
                        </div>
                        <div style={{marginTop: '40px'}}>
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
                            {item.models.length === 0 ? null : 'Модели'}
                            <div style={{width: '100%', overflowX: 'scroll'}}>
                                <ListGroup horizontal>
                                    {item.models.map((model, index) => {return (<ListGroup.Item as='li' disabled>{model.name}</ListGroup.Item>)})}
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                    <div>
                        {item.desription}
                    </div>
                    <div style={{marginTop: '40px'}}>
                        {lastParagraph}
                    </div>
                    
                </>
            }
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

export default Machine