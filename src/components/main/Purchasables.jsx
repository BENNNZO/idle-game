"use client"

import React from 'react';
import Image from 'next/image';

import ItalianPNG from '@/assets/products/italian.png'
import ChefHatPNG from '@/assets/products/chef_hat.png'

import Background from '@/assets/main/background-tile.jpg'

export default function Purchasables(props) {
    const purchasables = [
        {
            title: "Italian",
            name: "italian",
            price: 10,
            perSecond: 0.1,
            src: ItalianPNG
        },
        {
            title: "Chef's Hat",
            name: "chef_hat",
            price: 100,
            perSecond: 0.5,
            src: ChefHatPNG
        }
    ]

    return (
        <section className='select-none border-l border-black cursor-pointer p-5'>
            <div className='flex flex-col gap-5'>
                {purchasables.map((e, i) => {
                    return (
                        <div 
                            className='w-full animated_background shadow-md rounded-lg flex flex-row p-1' 
                            style={{ backgroundImage: `url(${Background.src})` }}
                            onClick={() => {
                                if (props.count >= e.price) { // if user has enough money it updates the global workers object and takes the money away
                                    props.setWorkers(prev => ({...prev, [e.name]: (prev[e.name] || 0) + 1}))
                                    props.setCount(count => count - e.price)
                                }
                            }}>
                            <div 
                                className='grid place-items-center px-2'
                            >
                                <Image 
                                    src={e.src}
                                    width={100}
                                    height={100}
                                    alt={e.title}
                                    className='drop-shadow-lg'
                                />
                            </div>
                            <div className='bg-white w-full rounded-md p-2 flex flex-row justify-between'>
                                <div className='flex flex-col'>
                                    <p>{e.title}</p>
                                    <p>{e.price}</p>
                                    <p>{e.perSecond}/s</p>
                                </div>
                                <p className='text-main drop-shadow-md text-6xl grid place-items-center pr-5'>{props.workers[e.title] || 0}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <pre>
                {JSON.stringify(props.workers, null, 4)}
            </pre> */}
        </section>
    )
}