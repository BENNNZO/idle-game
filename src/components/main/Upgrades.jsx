"use client"

import React from 'react';
import Image from 'next/image';

import { upgrades } from '@/constants/upgrades';

import Background from '@/assets/main/background-tile.jpg'
import Pizza from '@/assets/products/pizza.png'

export default function Upgrades(props) {
    return (
        <section className='border-r-8 border-main-medium/80 p-5'>
            <h2 className='text-main-medium text-7xl text-center'>UPGRADES</h2>
            <div className='grid grid-cols-2 gap-3'>
                {upgrades.map((e, i) => {
                    if (props.totalCount >= e.limit) {
                        return (
                            <div 
                                key={i}
                                className='animated_background p-1 rounded-lg'
                                style={{ backgroundImage: `url(${Background.src})` }}
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
        </section>
    )
}