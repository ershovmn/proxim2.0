import React, { useState } from 'react'
import Fullscreen from "react-full-screen"
import { useRouter } from 'next/router'

export interface Props {
    images: Array<string>
    width: string,
    startImage?: number,
}

const Gallery = (props : Props) => {

    const router = useRouter()

    let len = router.pathname.split('/').length - 2
    let str = ''
    if(len !== 0) {
        str = '.'
        for(let i = 0; i < len; i++) {
            str += './.'
        }
    }

    const scroll = (i : number) => {
        let newID = id + i
        if(newID < 0) newID = props.images.length - 1
        if(newID >= props.images.length) newID = 0
        setID(newID)
    }

    let [id, setID] = useState(0)
    let [full, setFull] = useState(false)
    let [leftButton, setLeftButton] = useState(false)
    let [rightButton, setRightButton] = useState(false)

    return (
        <div style={{position: 'relative', zIndex: 1}}>
            <Fullscreen enabled={full}>
                <img alt='' src={str + props.images[id]} width={full ? '100%' : props.width} height={full ? '100%' : '' }/>
                <div style={{position: 'absolute', display: 'flex', width: full ? '100%' : props.width, height: '100%', top: '0px'}}>
                    <div 
                        onClick={() => scroll(-1)} 
                        onMouseEnter={() => setLeftButton(true)}
                        onMouseLeave={() => setLeftButton(false)}
                        style={{height: '100%', flex: '1', backgroundColor: leftButton ? 'grey' : '', opacity: '0.3'}}>
                    </div>
                    <div onDoubleClick={() => setFull(!full)} style={{height: '100%', flex: '3'}}/>
                    <div
                        onClick={() => scroll(1)} 
                        onMouseEnter={() => setRightButton(true)}
                        onMouseLeave={() => setRightButton(false)}
                        style={{height: '100%', flex: '1', backgroundColor: rightButton ? 'grey' : '', opacity: '0.3'}}>
                    </div>
                </div>
            </Fullscreen>
        </div>
    )
}

export default Gallery