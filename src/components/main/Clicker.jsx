"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Pizza from '@/assets/main/pizza.png'
import Background from '@/assets/main/background-tile.jpg'

export default function Clicker(props) {
    const [clickPops, setClickPops] = useState([])
    const [clickAmount, setClickAmount] = useState(1)

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
                onClick={e => {
                    props.setCount(count => count + clickAmount)
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
                {clickPops.map(e => (
                    <>
                        <div 
                            className='absolute -translate-x-1/2 -translate-y-full'
                            style={{ top: e.y, left: e.x }}
                        >
                            <motion.p
                                className='text-3xl text-white drop-shadow-lg'
                                initial={{ opacity: 1, y: 0, scale: 1.25 }}
                                animate={{ opacity: 0, y: -75, scale: 1 }}
                                transition={{ duration: 2 }}
                            >
                                +{clickAmount}
                            </motion.p>
                        </div>
                        {/* <div 
                            className='absolute -translate-x-1/2 -translate-y-full'
                            style={{ top: e.y, left: e.x }}
                        >
                            <motion.div
                                initial={{ y: 0, x: 0, opacity: 1, rotate: (Math.random() * 180) - 90 }}
                                animate={{ y: -50, x: 10, opacity: 0, rotate: 450 }}
                                transition={{ type: "spring", stiffness: 10, damping: 10 }}
                                className='w-[50px] h-[50px] origin-bottom'
                            >
                                <Image 
                                    src={Pizza}
                                    width={50}
                                    height={50}
                                    alt='pizza clickyyy'
                                    className='absolute top-1/2 left-0'
                                />
                            </motion.div>
                        </div> */}
                    </>
                ))}
            </div>
            {/* <pre className='absolute top-0 left-0 pointer-events-none'>
                {JSON.stringify(clickPops, null, 4)}
            </pre> */}
        </section>
    )
}