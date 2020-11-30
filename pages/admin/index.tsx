import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, FormControl, ListGroup, Nav } from 'react-bootstrap'
import Header from '../../components/Header'
import Machine from '../../components/Machine'

const AdminPanel = () => {
    let [equipments, setEquipments] = useState(require('../../public/static/data/equipments.json'))
    let [section, setSection] = useState(-1)
    let [productID, setProductID] = useState(-1)
    let [product, setProduct] = useState(undefined)

    let [homeDes, setHomeDes] = useState(require('../../public/static/data/home.json').desription)
    let [homeImages, setHomeImages] = useState(require('../../public/static/data/home.json').images)

    let [newSection, setNewSection] = useState('')
    let [newSubSection, setNewSubSection] = useState('')

    let [newModel, setNewModel] = useState('')

    let myRef = useRef(null)
    let myRef1 = useRef(null)

    let sections = equipments.map(item => item.name)
    //let section : number | undefined = undefined

    const addNewSection = (e) => {
        let chars = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'}
        let t = newSection
        for (let i in chars) {
            t = t.replace(new RegExp(i, 'g'), chars[i])
        }
        if(e.key === 'Enter') {
            let equipments_clone = equipments
            equipments_clone.push({
                id: t.toLowerCase(),
                name: newSection,
                sections: [],
                items: []
            })
            setEquipments(equipments_clone)
            setNewSection('')
        }
    }

    const addNewSubSection = (e) => {
        if(e.key === 'Enter') {
            let equipments_clone = equipments
            equipments_clone[section].sections.push(newSubSection)
            setEquipments(equipments_clone)
            setNewSubSection('')
        }
    }

    const deleteSection = (idx : number) => {
        if(window.confirm(`Удалить секцию "${equipments[idx].name}"?`)){
            let equipments_clone = equipments
            console.log(equipments_clone)
            equipments_clone.splice(idx, 1)
            console.log(equipments_clone)
            setEquipments(equipments_clone)
        } 
    }

    const deleteSubSection = (idx : number) => {
        if(window.confirm(`Удалить подсекцию "${equipments[section].sections[idx]}"?`)){
            let equipments_clone = equipments
            console.log(equipments_clone)
            equipments_clone[section].sections.splice(idx, 1)
            console.log(equipments_clone)
            setEquipments(equipments_clone)
        } 
    }

    const deleteProduct = (idx : number) => {
        if(window.confirm(`Удалить продукт "${equipments[section].items[idx].name}"?`)){
            let equipments_clone = equipments
            console.log(equipments_clone)
            equipments_clone[section].items.splice(idx, 1)
            console.log(equipments_clone)
            setEquipments(equipments_clone)
        } 
    }

    const saveChanges = () => {
        fetch('/api/saveData',{
            method: 'POST',
            body: JSON.stringify({equipments: equipments, home: {desription: homeDes, images: homeImages}}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => document.location.reload())
    }

    const saveproduct = () => {
        console.log(productID)
        if(productID !== -1) {
            let equipments_clone = equipments
            equipments_clone[section].items[productID] = product
            setEquipments(equipments_clone)
        } else {
            let equipments_clone = equipments
            equipments_clone[section].items.push(product)
            setEquipments(equipments_clone)
        }
    }

    return ( 
        <>
            <Header />  
            <h1>Панель администратора</h1>
            <Nav>
                {section !== -1 ? <Nav.Link onClick={() => setSection(-1)}>Главная</Nav.Link> : null}
            </Nav>
            <hr style={{width: '100%'}} color="#ff0000" />
            {section === -1 ? 
                <>
                    <Form.Label>Категории продутов</Form.Label>
                        <Nav className="flex-column">
                            {equipments.map((item, index) => {
                                return (
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <img onClick={() => deleteSection(index)} src='/static/images/delete.png' height='25em' /> 
                                        <Nav.Link onClick={() => setSection(index)}>{item.name}</Nav.Link>
                                    </div>
                                )
                            })}
                            <Form.Control onKeyPress={addNewSection} value={newSection} onChange={(e) => setNewSection(e.target.value)} type='text' width='50%'/>
                        </Nav>
                    <Form.Label>Главная страница</Form.Label>
                    <FormControl as='textarea' rows={10} value={homeDes} onChange={(e) => {
                        setHomeDes(e.target.value)
                    }}/>
                    <Form.Label>Изображения</Form.Label>
                    <div style={{width: '50vw', height: '200px', overflowX: 'auto'}}>
                        <div style={{width: 'max-content', display: 'flex', flexDirection: 'row'}}>
                            {homeImages.map((image, idx) =>
                                <div style={{position: 'relative'}}>
                                    <img style={{position: 'absolute', top: '0px', right: '0px'}} onClick={() => {
                                        let clone = [...homeImages]
                                        clone.splice(idx, 1)
                                        setHomeImages(clone)
                                    }} src='/static/images/delete.png' height='25em' /> 
                                    <img src={image} height='200px' />
                                </div>
                            )}
                            <>
                            <input ref={myRef1} type='file' multiple accept='image/*' name='photo'/>
                            <Button onClick={() => {
                                console.log(myRef1.current.files.length)
                                for(let i = 0; i <  myRef1.current.files.length; i++) {
                                    const formData = new FormData()
                                    let file = myRef1.current.files[i]
                                    formData.append('file', file)
                                    fetch('/api/uploadImages', {
                                        method: 'POST',
                                        body: formData
                                    }).then(res => res.json())
                                    .then(data => {
                                        let path_name = data.name.replace('public', '')
                                        let clone = [...homeImages]
                                        clone.push(path_name)
                                        setHomeImages(clone)
                                    })
                                }
                            }}>Добавить</Button>
                            </>
                        </div>
                    </div>
                </>
                : null
            }
            {section !== -1 ?
                <>
                <Nav className="flex-column">
                    {equipments[section].sections.map((item, index) => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img onClick={() => deleteSubSection(index)} src='/static/images/delete.png' height='25em' /> 
                                <Nav.Link >{item}</Nav.Link>
                            </div>
                        )
                    })}
                    <Form.Control onKeyPress={addNewSubSection} value={newSubSection} onChange={(e) => setNewSubSection(e.target.value)} type='text' width='50%'/>
                </Nav>
                <hr style={{width: '100%'}} color="#ff0000" />
                <Nav className="flex-column">
                    {equipments[section].items.map((item, index) => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img onClick={() => deleteProduct(index)} src='/static/images/delete.png' height='25em' /> 
                                <Nav.Link onClick={() => {setProductID(index); setProduct(equipments[section].items[index])}}>{item.name}</Nav.Link>
                            </div>
                        )
                    })}
                    <Button onClick={() => setProduct({name: '', desription: '', images: [], models: [], section: 0})} style={{width: 'max-content'}}>Добавить продукт</Button>
                </Nav>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 1}}>
                        {product === undefined ? null :
                            <>
                                <Form.Label>Название</Form.Label>
                                <FormControl type='text' value={product.name} onChange={(e) => {
                                        let clone = {...product}
                                        clone.name = e.target.value 
                                        console.log('edit')
                                        setProduct(clone)
                                    }}/>
                                <Form.Label>Подсекция</Form.Label>
                                <FormControl as='select' value={product.section} onChange={(e) => {
                                    let clone = {...product}
                                    clone.section = parseInt(e.target.value) 
                                    setProduct(clone)
                                }}>
                                    {equipments[section].sections.map((name, idx) => <option value={idx}>{name}</option>)}
                                </FormControl>
                                <Form.Label>Модели</Form.Label>
                                <ListGroup>
                                    {product.models.map((model, index) => {return (
                                        <ListGroup.Item as='li'>
                                            <img onClick={() => {
                                                let clone = {...product}
                                                clone.models.splice(index, 1)
                                                console.log(clone)
                                                setProduct(clone)
                                            }} src='/static/images/delete.png' height='25em' /> 
                                            {model.name}
                                        </ListGroup.Item>)})}
                                    <ListGroup.Item>
                                        <FormControl type='text'onKeyPress={(e) => {
                                            if(e.key === 'Enter') {
                                                let clone = {...product}
                                                clone.models.push({name: e.target.value})
                                                console.log(clone)
                                                setProduct(clone)
                                                e.target.value = ''
                                            }
                                        }}/>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Form.Label>Описание</Form.Label>
                                <FormControl as='textarea' rows={10} value={product.desription} onChange={(e) => {
                                        let clone = {...product}
                                        clone.desription = e.target.value 
                                        setProduct(clone)
                                    }}/>
                                <Form.Label>Изображения</Form.Label>
                                <div style={{width: '50vw', height: '200px', overflowX: 'auto'}}>
                                    <div style={{width: 'max-content', display: 'flex', flexDirection: 'row'}}>
                                        {product.images.map((image, idx) =>
                                            <div style={{position: 'relative'}}>
                                                <img style={{position: 'absolute', top: '0px', right: '0px'}} onClick={() => {
                                                    let clone = {...product}
                                                    clone.images.splice(idx, 1)
                                                    console.log(clone)
                                                    setProduct(clone)
                                                }} src='/static/images/delete.png' height='25em' /> 
                                                <img src={image} height='200px' />
                                            </div>
                                        )}
                                        <>
                                        <input ref={myRef} type='file' multiple accept='image/*' name='photo'/>
                                        <Button onClick={() => {
                                            console.log(myRef.current.files.length)
                                            for(let i = 0; i <  myRef.current.files.length; i++) {
                                                const formData = new FormData()
                                                let file = myRef.current.files[i]
                                                formData.append('file', file)
                                                fetch('/api/uploadImages', {
                                                    method: 'POST',
                                                    // mode: 'no-cors',
                                                    // cache: 'no-cache',
                                                    // headers: {
                                                    //     'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
                                                    // },
                                                    body: formData
                                                }).then(res => res.json())
                                                .then(data => {
                                                    let path_name = data.name.replace('public', '')
                                                    let clone = {...product}
                                                    clone.images.push(path_name)
                                                    setProduct(clone)
                                                })
                                            }
                                            //let file = myRef.current.files[0]
                                        }}>Добавить</Button>
                                        </>
                                    </div>
                                </div>
                                <Button onClick={saveproduct}>Сохранить продукт</Button>
                            </>
                        }
                    </div>
                    <div style={{flex: 1, height: '50vh', overflow: 'auto', borderStyle: 'solid', borderWidth: '1px'}}>
                        {product !== undefined ? <Machine item={product}/> : null }
                    </div>
                </div>
                </>
                :null
            }
            <Button onClick={saveChanges}>Сохранить</Button>
        </>
    )
}

export default AdminPanel