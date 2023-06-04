"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Pizza from '@/assets/main/pizza.png'
import Background from '@/assets/main/background-tile.jpg'
import useSound from 'use-sound';

export default function Clicker(props) {
    const [clickPops, setClickPops] = useState([])
    const [clickSFX] = useSound('/audio/pop.mp3', { interrupt: false, playbackRate: (Math.random() / 5) + 0.9, volume: 0.4 })

    return (
        <section 
            className='h-full flex flex-col justify-center items-center overflow-hidden relative select-none animated_background' 
            style={{ backgroundImage: `url(${Background.src})` }}
        >
            <div className='flex flex-col absolute top-16 text-white drop-shadow-md text-center'>
                <p className='text-7xl'>{(Math.round(props.count)).toLocaleString("en-US")}</p>
                <p className='text-2xl'>{(Math.round(props.perSecond * 10) / 10).toLocaleString("en-US")}/s</p>
            </div>
            <motion.div
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 1000 }}}
                initial={{ y: 10 }}
                animate={{ y: 0, transition: { repeatType: "mirror", repeat: Infinity, duration: 2, ease: "easeInOut" }}}
                onMouseDown={e => {
                    clickSFX()
                    props.setCount(count => count + props.clickMultiplier)
                    props.setTotalCount(total => total + props.clickMultiplier)
                    clickPops.push({ x: e.pageX + (Math.random() * 20) - 10, y: e.pageY })
                    let control = clickPops.length
                    setTimeout(() => {
                        if (clickPops.length === control) setClickPops([])
                    }, 2100);
                }}
            >
                <Image
                    src={Pizza}
                    width={500}
                    height={500}
                    alt='Click the PIZZAAAAAA'
                    className='cursor-pointer drop-shadow-xl pointer-events-none'
                />
            </motion.div>
            <div className='pointer-events-none absolute w-screen h-screen'>
                {clickPops.map((e, i) => (
                    <div 
                        key={i}
                        className='absolute -translate-x-1/2 -translate-y-full'
                        style={{ top: e.y, left: e.x }}
                    >
                        <motion.p
                            className='text-3xl text-white drop-shadow-lg'
                            initial={{ opacity: 1, y: 0, scale: 1.25 }}
                            animate={{ opacity: 0, y: -75, scale: 1 }}
                            transition={{ duration: 2 }}
                        >
                            +{props.clickMultiplier}
                        </motion.p>
                    </div>
                ))}
            </div>
            {/* <pre className='absolute top-0 left-0 pointer-events-none'>
                {JSON.stringify(clickPops, null, 4)}
            </pre> */}
        </section>
    )
}