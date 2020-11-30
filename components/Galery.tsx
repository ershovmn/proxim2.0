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

    console.log(id < props.images.length - 1, id, props.images.length - 1) 

    return (
        <div style={{position: 'relative', zIndex: 1, width: '100%', paddingTop: '56.25%'}}>
            <Fullscreen enabled={full}>
                <img onLoad={() => console.log('load')} alt='' src={props.images[id]} 
                    onDoubleClick={() => setFull(!full)}
                    //style={{width: full ? '' : props.width, maxHeight: full ? '100%' : '', maxWidth: full ? '100%' : '', marginLeft: 'auto', marginRight: 'auto'}}
                    style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', objectFit: 'contain'}}
                /> 
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
            </Fullscreen>
        </div>
    )
}

export default Gallery