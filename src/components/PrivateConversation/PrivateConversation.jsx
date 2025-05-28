import { useOutletContext, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { useEffect, useRef, useState } from "react"
import MessageField from "../InputFields/MessageField"

import './PrivateConversation.css'

export default function PrivateConversation() {
    const { chat, id: me, chatId, participantUser } = useOutletContext()
    const { chatHistory = [], memberNames = {} } = chat
    const { request, loading, error } = useApi()
    const [message, setmessage] = useState('')
    const participantName = participantUser?.user?.name
    const [participantsWithoutMe] = Object.keys(memberNames).filter(id => id !== me).length === 0 ? [chatId] : Object.keys(memberNames).filter(id => id !== me)
    const ws = useRef(null)

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3000')

        return () => ws.current.close()
    }, [])

    async function handleMessageSend() {
        if (message) {
            await request(`${import.meta.env.VITE_BACKEND}/messages`, `POST`, { participantsWithoutMe, message })

            if (participantsWithoutMe && ws.current.readyState === WebSocket.OPEN) {
                console.log(`SOCKET OPEN`)

                ws.current.send(JSON.stringify({ participantsWithoutMe, me }));

            }
            setmessage('')
        }
    }

    return (
        <main>

            <header>
                {participantName}
            </header>

            <section className="chat-history">
                CHAT HISTORY
                {chatHistory.map((item) => {

                    const { sender, currentUserName, message, timeSent } = item

                    return (
                        <div className={`message-container ${me !== sender ? '' : 'current-user'}`}>
                            <p>{currentUserName}</p>
                            <p>{message}</p>
                            <p>{timeSent}</p>
                        </div>
                    )
                })}
            </section>


            <MessageField
                className={`message-input-container`}
                messageFieldValue={message}
                setMessageFieldValue={setmessage}
                handleMessageSend={handleMessageSend}
            />


        </main>
    )
}