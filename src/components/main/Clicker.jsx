"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Pizza from '@/assets/main/pizza.png'
import Background from '@/assets/main/background.png'

export default function Clicker() {
    const [count, setCount] = useState(0)

    return (
        <section className='h-full flex flex-col justify-center items-center overflow-hidden relative'>
            <p className='text-white text-7xl drop-shadow-md absolute top-16'>{count}</p>
            <Image
                src={Background}
                width={1000}
                height={3000}
                alt='background'
                className='absolute top-0 left-0 -z-10'
            />
            <motion.div
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 800 }}
            >
                <Image
                    src={Pizza}
                    width={500}
                    height={500}
                    alt='Click the PIZZAAAAAA'
                    onClick={() => setCount(count => count + 1)}
                    className='cursor-pointer'
                />
            </motion.div>
        </section>
    )
}