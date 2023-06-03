"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Pizza from '@/assets/main/pizza.png'
import Background from '@/assets/main/background-tile.jpg'

export default function Clicker(props) {
    // const [ppsControl, setPpsControl] = useState(new Date)
    // const [pps, setPps] = useState(0)

    // useEffect(() => {
    //     setPps(Math.round(1000 / (new Date - ppsControl)))
    //     setPpsControl(new Date)
    // }, [count])

    function formatNumber(number) {
        let arr = number.split("")

        return 
    }

    return (
        <section 
            className='h-full flex flex-col justify-center items-center overflow-hidden relative select-none animated_background' 
            style={{ backgroundImage: `url(${Background.src})` }}
        >
            <div className='flex flex-col absolute top-16 text-white drop-shadow-md text-center'>
                <p className='text-7xl'>{(Math.round(props.count)).toLocaleString("en-US")}</p>
                <p className='text-2xl'>{(Math.round(props.perSecond * 10) / 10).toLocaleString("en-US")}/s</p>
            </div>
            {/* <Image
                src={Background}
                width={100}
                height={100}
                alt='background'
                className='absolute top-0 left-0 -z-10 pointer-events-none'
            /> */}
            <motion.div
                whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 800 }}}
                initial={{ y: 10, scaleY: 0.99 }}
                animate={{ y: 0, scaleY: 1, transition: { repeatType: "mirror", repeat: Infinity, duration: 2, ease: "easeInOut" }}}
                onClick={() => props.click(count => count + 1)}
            >
                <Image
                    src={Pizza}
                    width={500}
                    height={500}
                    alt='Click the PIZZAAAAAA'
                    className='cursor-pointer drop-shadow-2xl pointer-events-none'
                />
            </motion.div>
        </section>
    )
}