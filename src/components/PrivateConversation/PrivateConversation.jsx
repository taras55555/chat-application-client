import { useOutletContext, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { useEffect, useRef, useState } from "react"
import MessageField from "../InputFields/MessageField"

import './PrivateConversation.css'
import { formatDate, generateItemKey } from "../../utils/commonUtils"

export default function PrivateConversation() {
    const { chat, id: me, chatId, participantUser } = useOutletContext()
    const { chatHistory = [], memberNames = {}, isPredefined = false } = chat
    const participantName = participantUser?.user?.name
    const [participantsWithoutMe] = Object.keys(memberNames)
        .filter(id => id !== me)
        .length === 0 ? [chatId] : Object.keys(memberNames).filter(id => id !== me)
    const { request, loading, error } = useApi()
    const [message, setmessage] = useState('')

    const ws = useRef(null)

    useEffect(() => {
        ws.current = new WebSocket(`ws://${import.meta.env.VITE_BACKEND}`)

        return () => ws.current.close()
    }, [])

    async function handleMessageSend() {
        if (message) {
            await request(`${import.meta.env.VITE_BACKEND}/messages`, `POST`, { participantsWithoutMe, message })

            if (participantsWithoutMe && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ participantsWithoutMe, me, isPredefined, participantName, message }));
            }
            setmessage('')
        }
    }

    return (
        <>

            <header className="private-conversation-header">
                <section>
                    {participantName}
                </section>
            </header>

            <section className="chat-history">
                {chatHistory.map((item) => {

                    const { sender, message, timeSent } = item
                    const formattedDate = formatDate(timeSent)
                    const senderClass = me !== sender ? '' : ' current-user'

                    return (
                        <section key={generateItemKey()} className={`message-container${senderClass}`}                        >
                            <section className="message">
                                <p>{message}</p>
                            </section>

                            <section className="message-date">{formattedDate}</section>
                        </section>
                    )
                })}
            </section>

            <MessageField
                className={'input-wrapper send-input-position'}
                messageFieldValue={message}
                setMessageFieldValue={setmessage}
                handleMessageSend={handleMessageSend}
            />
        </>
    )
}