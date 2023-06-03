"use client"

import React from 'react';
import Image from 'next/image';

import ItalianPNG from '@/assets/products/italian.png'
import ChefHatPNG from '@/assets/products/chef_hat.png'

import Background from '@/assets/main/background-tile.jpg'
import Pizza from '@/assets/main/pizza.png'

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
                            key={i}
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
                                <div className='flex flex-col pl-2 justify-between'>
                                    <p className='text-3xl text-main-medium'>{e.title}</p>
                                    <div className='flex flex-row gap-2'>
                                        <div className='flex flex-row items-center gap-2 bg-main/20 px-2 rounded-lg'>
                                            <Image // i hate how many divs this is nested in but the layout it allot so i dont really know a better way to do this unless i use vanilla CSS and grid
                                                src={Pizza}
                                                width={20}
                                                height={20}
                                                alt='Amount'
                                            />
                                            <p className='text-2xl text-main-medium/70'>{e.price}</p>
                                        </div>
                                        <p className='text-lg text-main-medium/50 bg-main/20 px-2 rounded-lg grid place-items-center'>{e.perSecond}/s</p>
                                    </div>
                                </div>
                                <p className='text-main-medium drop-shadow-md text-6xl grid place-items-center pr-5'>{props.workers[e.name] || 0}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <pre>
                {JSON.stringify(props.workers, null, 4)}
            </pre>
        </section>
    )
}