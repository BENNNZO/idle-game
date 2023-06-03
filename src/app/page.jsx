"use client"

import React, { useState, useEffect } from 'react';
import Clicker from "@/components/main/Clicker"
import Purchasables from "@/components/main/Purchasables"

export default function Home() {
    const [count, setCount] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    const [workers, setWorkers] = useState({})
    const [perSecond, setPerSecond] = useState(0)

    const [tick, setTick] = useState(0)
    const [controlDate, setControlDate] = useState(new Date)

    useEffect(() => {
        /* --------------------- update amount based on workers --------------------- */
        let amount = 0

        amount += workers.italian * 0.1 || 0 //    0.1s per  /  Italian
        amount += workers.chef_hat * 0.5 || 0 //   0.5s per  /  Chef's Hat

        setPerSecond(amount)


        /* ----------- set interval for updates ---------- */
        const updateCount = setInterval(() => {
            setTick(prevTick => prevTick + 1) // update tick so that a useEffect can handle all the updates
        }, 25);

        /* ----------------- create new interval when workers update ---------------- */
        return () => clearInterval(updateCount)
    }, [workers])

    useEffect(() => { // updates count as fast as possible but consistant cause of time
        let date = new Date // makes sure the next 2 lines use the same date and that is isnt off by a little amount
        setCount(count => count + (perSecond / (1000 / (date - controlDate))))
        setControlDate(date)
    }, [tick])
        
    return (
        <main className="grid grid-cols-3 w-screen h-screen">
            <div></div>
            <Clicker
                count={count}
                setCount={setCount}
                
                clickCount={clickCount}
                setClickCount={setClickCount}
                
                perSecond={perSecond}
            />
            <Purchasables 
                count={count}
                setCount={setCount}

                workers={workers}
                setWorkers={setWorkers}
            />
        </main>
    )
}
