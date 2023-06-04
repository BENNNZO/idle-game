"use client"

import React, { useState, useEffect } from 'react';
import Clicker from "@/components/main/Clicker"
import Purchasables from "@/components/main/Purchasables"
import Upgrades from '@/components/main/Upgrades';

import { workers } from '@/constants/workers';
import useSound from 'use-sound';

export default function Home() {
    const [loop, setLoop] = useState(0)
    const [pauseState, setPauseState] = useState(false)
    const [play, { pause }] = useSound('/audio/background2.mp3', { volume: 0.65, onend: () => setLoop(c => c += 1), onload: () => setLoop(c => c += 1) })


    const [count, setCount] = useState(1000)
    const [workersCount, setWorkersCount] = useState({})
    const [workersMultipliers, setWorkersMultipliers] = useState({})
    const [perSecond, setPerSecond] = useState(0)

    const [tick, setTick] = useState(0)
    const [controlDate, setControlDate] = useState(new Date)

    useEffect(() => {
        /* --------------------- update perSec based on workers --------------------- */
        let amount = 0
        workers.forEach(e => amount += workersCount[e.name] * e.perSecond || 0) // for each type of worker adjust amount per second
        setPerSecond(amount)
        
        /* ----------- set interval for updates ---------- */
        const updateCount = setInterval(() => {
            setTick(prevTick => prevTick + 1) // update tick so that a useEffect can handle all the updates
        }, 25);
        return () => clearInterval(updateCount)
    }, [workersCount])

    useEffect(() => { // updates count as fast as possible but consistant cause of time
        let date = new Date // makes sure the next 2 lines use the same date and that is isnt off by a little amount
        setCount(count => count + (perSecond / (1000 / (date - controlDate))))
        setControlDate(date)
    }, [tick])
    
    useEffect(() => {
        play()
    }, [loop])

    return (
        <main className="grid grid-cols-3 w-screen h-screen">
            <button onClick={() => {pauseState ? play() : pause(); setPauseState(prev => !prev)}} className='absolute top-10 left-10 border border-black px-3 py-1'>Mute Music</button>
            {/* <div>
                upgrades section
                <p>Tick: {String(tick)}</p>
            </div> */}
            <Upgrades
                count={count}
                setCount={setCount}
            />
            <Clicker
                count={count}
                setCount={setCount}
                
                perSecond={perSecond}
            />
            <Purchasables 
                count={count}
                setCount={setCount}

                workers={workersCount}
                setWorkers={setWorkersCount}
            />
        </main>
    )
}
