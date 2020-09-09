import React, { useState, useEffect } from 'react'
import Fullscreen from "react-full-screen"
import { useRouter } from 'next/router'

export interface Props {
    images: Array<string>
    width: string,
    startImage?: number,
}


const Gallery = (props : Props) => {

    const router = useRouter()

    let [id, setID] = useState(0)
    let [full, setFull] = useState(false)
    let [leftButton, setLeftButton] = useState(false)
    let [rightButton, setRightButton] = useState(false)

    useEffect(() => {
        props.images.map(image => {
            let img = new Image();
            img.src = image;
        })
    }, [])

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


    return (
        <div style={{position: 'relative', zIndex: 1}}>
            <Fullscreen enabled={full}>
                <img onLoad={() => console.log('load')} alt='' src={str + props.images[id]} style={{width: full ? '' : props.width, maxHeight: full ? '100%' : '', maxWidth: full ? '100%' : '', marginLeft: 'auto', marginRight: 'auto'}}/>
                { id < props.images.length - 1 ?
                    <a onClick={() => scroll(1)} style={{position: 'absolute', top: '50%', marginTop: '-10%', right: '1%', height: '20%'}}>
                        <img src={str + './static/images/next.png'} height='100%'/>
                    </a> : null
                }
                { id > 0 ?
                    <a onClick={() => scroll(-1)} style={{position: 'absolute', top: '50%', marginTop: '-10%', left: '1%', height: '20%'}}>
                        <img src={str + './static/images/prev.png'} height='100%'/>
                    </a> : null
                }
                {/* <div style={{position: 'absolute', display: 'flex', width: full ? '100%' : props.width, height: '100%', top: '0px'}}>
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
                </div> */}
            </Fullscreen>
        </div>
    )
}

export default Gallery