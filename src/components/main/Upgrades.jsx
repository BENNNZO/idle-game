"use client"

import React from 'react';
import { upgrades } from '@/constants/upgrades';

export default function Upgrades(props) {
    return (
        <section className='border-r-8 border-main-medium/80'>
            {upgrades.map((e, i) => {
                return (
                    <div key={i}></div>
                )
            })}
        </section>
    )
}