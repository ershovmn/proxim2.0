import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'

import {NavDropdown, Navbar, Nav} from 'react-bootstrap'
import equipments from '../src/equipments'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    let [menuVisible, setMenuVisible] = useState(false)
    let [scrollX, setScrollX] = useState(0)

    if(menuVisible) {
        let credential = navigator.credentials.create({ publicKey: {
            challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
            rp: { id: "acme.com", name: "ACME Corporation" },
            user: {
              id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
              name: "jamiedoe",
              displayName: "Jamie Doe"
            },
            pubKeyCredParams: [ {type: "public-key", alg: -7} ]
          }});
    }
    
    console.log(menuVisible)
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
                            </>
                        : <Nav.Link onClick={() => {setMenuVisible(!menuVisible); setScrollX(document.documentElement.scrollTop)}}>Меню</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {menuVisible ?
                <div style={{position: 'absolute', top: `${scrollX}px`, left: '0px', height: '100vh', width: '100vw', backgroundColor: '#212529', zIndex: 1000, paddingTop: '80px'}}>
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