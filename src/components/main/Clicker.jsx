"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Pizza from '@/assets/main/pizza.png'
import Background from '@/assets/main/background.png'

export default function Clicker(props) {
    // const [ppsControl, setPpsControl] = useState(new Date)
    // const [pps, setPps] = useState(0)

    // useEffect(() => {
    //     setPps(Math.round(1000 / (new Date - ppsControl)))
    //     setPpsControl(new Date)
    // }, [count])

    return (
        <section className='h-full flex flex-col justify-center items-center overflow-hidden relative select-none'>
            <div className='flex flex-col absolute top-16 text-white drop-shadow-md text-center'>
                <p className='text-7xl'>{Math.round(props.count * 10) / 10}</p>
                <p className='text-2xl'>{props.perSecond}/s</p>
            </div>
            <Image
                src={Background}
                width={1000}
                height={3000}
                alt='background'
                className='absolute top-0 left-0 -z-10 pointer-events-none'
            />
            <motion.div
                whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 800 }}}
                initial={{ y: 10 }}
                animate={{ y: 0, transition: { repeatType: "mirror", repeat: Infinity, duration: 2, ease: "easeInOut" }}}
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