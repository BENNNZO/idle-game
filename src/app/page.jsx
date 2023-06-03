"use client"

import React, { useState, useEffect } from 'react';
import Clicker from "@/components/main/Clicker"
import Purchasables from "@/components/main/Purchasables"

export default function Home() {
    const [count, setCount] = useState(0)
    const [workers, setWorkers] = useState({})
    const [perSecond, setPerSecond] = useState(0)

    useEffect(() => {
        let amount = 0
        amount += workers.Italian / 10 || 0 // 0.1s per
        setPerSecond(amount)

        const updateCount = setInterval(() => {
            setCount(count => count + amount)
        }, 1000);

        return () => clearInterval(updateCount)
    }, [workers])
        
    return (
        <main className="grid grid-cols-3 w-screen h-screen">
            <div></div>
            <Clicker
                count={count}
                click={setCount}
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
