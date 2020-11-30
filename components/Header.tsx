import React, {useState, useEffect} from 'react'
import {isMobile} from 'react-device-detect'

import {NavDropdown, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    let [menuVisible, setMenuVisible] = useState(false)
    let [scrollX, setScrollX] = useState(0)

    let equipments = require('../public/static/data/equipments.json')

    useEffect(() => {
        document.body.style.setProperty('padding-top', '70px')
    }, [])
    
    useEffect(() => {
        document.body.style.overflow = 'auto'
        if(menuVisible) {
            document.body.style.overflow = 'hidden'
            setScrollX(document.body.scrollTop)
        }
    }, [menuVisible])

    return (
        <>
            <Navbar fixed='top' bg="dark" variant="dark">
                <Navbar.Brand href="/">Proxim</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className='justify-content-end'>
                        {!isMobile ?
                            <>
                            <Nav.Link href='/'>Главная</Nav.Link>
                            <NavDropdown title='Оборудование' id="basic-nav-dropdown">
                                {equipments.map((equipment, index) => {
                                        return (
                                            <NavDropdown.Item href={`/equipment/${equipment.id}`} key={index}>{equipment.name}</NavDropdown.Item>
                                        )
                                    })
                                }
                            </NavDropdown>
                            <Nav.Link href='/servises'>Услуги</Nav.Link>
                            <Nav.Link href='/contacts'>Контакты</Nav.Link>
                            </>
                        : <Nav.Link onClick={() => {setMenuVisible(!menuVisible); setScrollX(document.documentElement.scrollTop)}}>Меню</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {menuVisible ?
                <div style={{position: 'fixed', top: `0px`, left: '0px', height: '100vh', width: '100vw', backgroundColor: '#212529', zIndex: 1000, paddingTop: '80px'}}>
                    <Nav className='flex-column'>
                            <Nav.Link href='/'>Главная</Nav.Link>
                            <NavDropdown title='Оборудование' id="basic-nav-dropdown">
                                {
                                    equipments.map((equipment, index) => {
                                        return (
                                            <NavDropdown.Item href={`/equipment/${equipment.id}`} key={index}>{equipment.name}</NavDropdown.Item>
                                        )
                                    })
                                }
                            </NavDropdown>
                            <Nav.Link href='/servises'>Услуги</Nav.Link>
                            <Nav.Link href='/contacts'>Контакты</Nav.Link>
                    </Nav>
                </div> : null}
        </>
    )
}

export default Header