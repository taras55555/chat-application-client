import { useState } from "react"
import { useApi } from "../../hooks/useApi"

export default function MessageField({ className, messageFieldValue, setMessageFieldValue, handleMessageSend }) {

    return (
        <section className={className}>
            <input
                
                type="text"
                value={messageFieldValue}
                onChange={(e) => setMessageFieldValue(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handleMessageSend}>send</button>

        </section>
    )
}