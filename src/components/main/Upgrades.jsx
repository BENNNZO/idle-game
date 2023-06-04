"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { upgrades } from '@/constants/upgrades';

import Background from '@/assets/main/background-tile.jpg'
import Pizza from '@/assets/products/pizza.png'
import Upgrade from '@/assets/other/upgrade2.png'

export default function Upgrades(props) {
    const [bought, setBought] = useState([]) // array of id's that match the index of certain upgrades depending on what you buy
    const [toggle, setToggle] = useState(true)

    return (
        <motion.section 
            className='border-r-8 border-main-medium/80 p-5 absolute top-0 left-0 z-10 bg-white h-full w-1/3'
            initial={{ x: "-100%" }}
            animate={toggle ? { x: 0 } : { x: "-100%" }}
        >
            <div className='absolute h-full w-96 -left-96 bg-white top-0'></div>
            <button className='bg-white drop-shadow-md absolute top-10 z-10 left-full ml-10 rounded-full grid place-items-center w-12 h-12' onClick={() => setToggle(prev => !prev)}>
                <Image 
                    src={Upgrade}
                    width={50}
                    height={50}
                    alt='upgrade drawer toggle'
                    className={`${toggle ? '' : 'rotate-90'} transition-transform delay-200 ease-out drop-shadow-sm`}
                />
            </button>
            <h2 className='header animated_background brightness-90' style={{ backgroundImage: `url(${Background.src})` }}>UPGRADES</h2>
            <p className='text-md text-black/20 text-center'>Unlock more upgrades buy collecting more pizzas!</p>
            <div className='grid grid-cols-2 gap-3 mt-5'>
                {upgrades.map((e, i) => {
                    if (props.totalCount >= e.limit && !bought.includes(i)) {
                        return (
                            <div 
                                key={i}
                                className={`animated_background p-1 rounded-lg cursor-pointer transition-all ${props.count >= e.price ? '' : 'grayscale scale-95 opacity-80'}`}
                                style={{ backgroundImage: `url(${Background.src})` }}
                                onClick={() => {
                                    if (props.count >= e.price) {
                                        props.setCount(count => count - e.price)
                                        props.setMultipliers(prev => ({...prev, [e.worker_name]: (props.multipliers[e.worker_name] || 0) + e.multiplier}))
                                        setBought(prev => [...prev, i])
                                    }
                                }}
                            >
                                <div className='bg-white rounded-md py-2 px-4'>
                                    <p className='text-main-medium text-2xl'>{e.title}</p>
                                    <p className='text-main-medium/70'>{e.desc}</p>
                                </div>
                                <div className='flex flex-row gap-2 py-1 items-center backdrop-blur-md px-2 rounded-lg'>
                                    <Image 
                                        src={Pizza}
                                        width={25}
                                        height={25}
                                        alt='price'
                                    />
                                    <p className='text-main-dark/70 text-2xl'>{e.price}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {/* <pre>
                {JSON.stringify(props.multipliers, null, 4)}
            </pre>
            <pre>
                {JSON.stringify(bought, null, 4)}
            </pre>
            <pre>
                {String(toggle)}
            </pre> */}
        </motion.section>
    )
}