"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { workers } from '@/constants/workers';

import Background from '@/assets/main/background-tile.jpg'
import Pizza from '@/assets/products/pizza.png'
import Upgrade from '@/assets/other/upgrade2.png'
import useSound from 'use-sound';

export default function Purchasables(props) {
    const [buySound] = useSound('/audio/click.mp3', { interrupt: false, playbackRate: (Math.random() / 5) + 0.9, volume: 0.4 })
    const [errorSound] = useSound('/audio/error2.mp3', { interrupt: false, playbackRate: (Math.random() / 5) + 0.9, volume: 0.75 })

    const [toggle, setToggle] = useState(true)

    return (
        <motion.section 
            className='select-none border-l-8 border-main-medium/80 cursor-pointer p-5 bg-white absolute top-0 right-0 w-1/3 h-full'
            initial={{ x: "100%" }}
            animate={toggle ? { x: 0 } : { x: "100%" }}
        >
            <div className='absolute h-full w-96 -right-96 bg-white top-0'></div>
            <button className='bg-white drop-shadow-md absolute top-10 z-10 right-full mr-10 rounded-full grid place-items-center w-12 h-12' onClick={() => setToggle(prev => !prev)}>
                <Image 
                    src={Upgrade}
                    width={50}
                    height={50}
                    alt='upgrade drawer toggle'
                    className={`${toggle ? '' : '-rotate-90'} transition-transform drop-shadow-sm`}
                />
            </button>
            <h2 className='header_nobg animated_background brightness-90' style={{ backgroundImage: `url(${Background.src})` }}>WORKERS</h2>
            <div className='flex flex-col gap-5 mt-5'>
                {workers.map((e, i) => {
                    let adjustedPrice = Math.round(e.basePrice * Math.pow(1.15, props.workers[e.name] || 0))
                    return (
                        <motion.div
                            key={i}
                            className={`w-full animated_background shadow-md rounded-lg flex flex-row p-1 transition-all ${props.count < adjustedPrice ? 'grayscale scale-95' : ''}`}
                            style={{ backgroundImage: `url(${Background.src})` }}
                            // whileTap={{ scale: 0.99, transition: { type: "spring", stiffness: 500 }}}
                            onClick={() => {
                                if (props.count >= adjustedPrice) { // if user has enough money it updates the global workers object and takes the money away
                                    buySound()
                                    props.setWorkers(prev => ({...prev, [e.name]: (prev[e.name] || 0) + 1}))
                                    props.setCount(count => count - adjustedPrice)
                                } else {
                                    errorSound()
                                }
                            }}
                        >
                            <motion.div
                                animate={{ scale: [0.9, 1], transition: { duration: 1, repeatType: "mirror", repeat: Infinity, ease: "easeInOut", delay: 0.25 * i }}}
                            >
                                <Image 
                                    src={e.src}
                                    width={100}
                                    height={100}
                                    alt={e.title}
                                    className='drop-shadow-lg p-2'
                                />
                            </motion.div>
                            <div className='bg-white w-full rounded-md p-2 flex flex-row justify-between'>
                                <div className='flex flex-col pl-2 justify-between'>
                                    <p className='text-3xl text-main-medium'>{e.title}</p>
                                    <div className='flex flex-row gap-2'>
                                        <div className='flex flex-row items-center gap-2 bg-main/20 px-2 rounded-lg'>
                                            <Image // i hate how many divs this is nested in but the layout it allot so i dont really know a better way to do this unless i use vanilla CSS and grid
                                                src={Pizza}
                                                width={25}
                                                height={25}
                                                alt='price'
                                            />
                                            <p className='text-2xl text-main-medium/70'>{adjustedPrice}</p>
                                        </div>
                                        <p className='text-lg text-main-medium/50 bg-main/20 px-2 rounded-lg grid place-items-center'>{e.perSecond * (props.multiplier[e.name] || 1)}/s</p>
                                    </div>
                                </div>
                                <p className='text-main-medium drop-shadow-md text-6xl grid place-items-center pr-5'>{props.workers[e.name] || 0}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
            {/* <pre>
                {JSON.stringify(props.workers, null, 4)}
            </pre> */}
        </motion.section>
    )
}