"use client"

import React from 'react';

export default function Purchasables(props) {
    const purchasables = [
        {
            title: "Italian",
            name: "italian",
            price: 10,
            perSecond: 0.1
        },
        {
            title: "Chef's Hat",
            name: "chef_hat",
            price: 100,
            perSecond: 0.5
        }
    ]

    return (
        <section className='select-none'>
            {purchasables.map((e, i) => {
                return (
                    <div 
                        className='w-full bg-red-400 text-green-900 cursor-pointer' 
                        onClick={() => {
                            if (props.count >= e.price) { // if user has enough money it updates the global workers object and takes the money away
                                props.setWorkers(prev => ({...prev, [e.name]: (prev[e.name] || 0) + 1}))
                                props.setCount(count => count - e.price)
                            }
                        }}>
                        <p>Title: {e.title}</p>
                        <p>Price: {e.price}</p>
                        <p>{e.perSecond}/s</p>
                        <p>Amount:{props.workers[e.title] || 0}</p>
                    </div>
                )
            })}
            <pre>
                {JSON.stringify(props.workers, null, 4)}
            </pre>
        </section>
    )
}