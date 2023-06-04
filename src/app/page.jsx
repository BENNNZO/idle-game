"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useSound from 'use-sound';

import Clicker from "@/components/main/Clicker"
import Purchasables from "@/components/main/Purchasables"
import Upgrades from '@/components/main/Upgrades';

import { workers } from '@/constants/workers';
import PlayButton from '@/assets/other/play.svg'

export default function Home() {
    /* -------------------------------- init var -------------------------------- */
    const [init, setInit] = useState(true)

    /* ------------------------------- audio vars ------------------------------- */
    const [loop, setLoop] = useState(0)
    const [pauseState, setPauseState] = useState(false)
    const [play, { pause }] = useSound('/audio/background2.mp3', { volume: 0.65, onend: () => setLoop(c => c += 1), onload: () => setLoop(c => c += 1) })

    /* -------------------------------- game vars ------------------------------- */
    const [count, setCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [workersCount, setWorkersCount] = useState({})
    const [workersMultipliers, setWorkersMultipliers] = useState({})
    const [perSecond, setPerSecond] = useState(0)

    /* ------------------------------ control vars ------------------------------ */
    const [tick, setTick] = useState(0)
    const [controlDate, setControlDate] = useState(new Date)

    useEffect(() => {
        /* --------------------- update perSec based on workers --------------------- */
        let amount = 0
        workers.forEach(e => amount += (workersCount[e.name] * e.perSecond || 0) * (workersMultipliers[e.name] || 1)) // for each type of worker adjust amount per second
        setPerSecond(amount)
        
        /* ----------- set interval for updates ---------- */
        const updateCount = setInterval(() => {
            setTick(prevTick => prevTick + 1) // update tick so that a useEffect can handle all the updates
        }, 25);
        return () => clearInterval(updateCount)
    }, [workersCount, workersMultipliers])

    useEffect(() => { // updates count as fast as possible but consistant cause of time
        let date = new Date // makes sure the next 2 lines use the same date and that is isnt off by a little amount
        let amount = perSecond / (1000 / (date - controlDate))
        setCount(count => count + amount)
        setTotalCount(count => count + amount)
        setControlDate(date)
    }, [tick])
    
    // useEffect(() => { // Loop music (this is a callback function from the useSound hook that runs when the audio ends)
    //     play()
    // }, [loop])

    return (
        <main className="grid grid-cols-3 w-screen h-screen">
            {/* <button onClick={() => {pauseState ? play() : pause(); setPauseState(prev => !prev)}} className='absolute top-10 left-10 border border-black px-3 py-1'>Mute Music</button> */}
            {/* {init ? (
                <div className='z-50 absolute w-screen h-screen top-0 left-0 bg-main-medium/50 backdrop-blur-md' onKeyDown={() => setInit(prev => !prev)} onClick={() => setInit(prev => !prev)}>
                    <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-3'>
                        <Image
                            src={PlayButton}
                            width={50}
                            height={50}
                            alt='play button'
                            className='invert drop-shadow-md'
                        />
                        <p className='text-white text-lg drop-shadow-lg tracking-wide'>Press the play button or any key on your keyboard</p>
                    </button>
                </div>
            ) : null} */}

            <Upgrades
                count={count}
                setCount={setCount}

                setMultipliers={setWorkersMultipliers}
                multipliers={workersMultipliers}

                totalCount={totalCount}
            />
            <Clicker
                count={count}
                setCount={setCount}
                
                clickMultiplier={workersMultipliers.click || 1}

                setTotalCount={setTotalCount}

                perSecond={perSecond}
            />
            <Purchasables 
                count={count}
                setCount={setCount}

                workers={workersCount}
                setWorkers={setWorkersCount}

                multiplier={workersMultipliers}
            />
        </main>
    )
}
