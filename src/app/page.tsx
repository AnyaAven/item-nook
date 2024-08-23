'use client'
import { route } from '@/utilities'
import { useState } from 'react'

export default function Home() {
    const [count, setCount] = useState(0)

    const rt = route('api.api-tokens.index',undefined, true)
    return (
        <>
            <div>{count}</div>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <div>
                {rt}
            </div>
        </>
    )
}
