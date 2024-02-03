import React, { useState } from 'react'

export const MessageInput = ({send}:{ send : (val: string) => void}) => {
    const [value, setValue] = useState<string>("")
    const handleEvent = (e: any) => {
        setValue(e.target.value)
    }
    return (
    <>
        <input  placeholder="type your message" value={value} onChange={handleEvent} />
        <button onClick={() => send(value)}>send</button>
    </>
  )
}
