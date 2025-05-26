import { useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { useEffect, useState } from "react"
import MessageField from "../InputFields/MessageField"

import './PrivateConversation.css'
import { useAuth } from "../../hooks/useAuth"

export default function PrivateConversation() {
    const { id, name } = useAuth()
    const [currentUserInfo, setCurrentUserInfo] = useState({})
    const [chatHistory, setChatHistory] = useState([])
    const { chatId } = useParams()
    const { request, loading, error } = useApi()
    const [message, setmessage] = useState('')

    useEffect(() => {
        request(`${import.meta.env.VITE_BACKEND}/user/${chatId}`)
            .then(data => {
                data.user.id = data.user._id
                delete data.user._id
                setCurrentUserInfo(data.user)
            })

        request(`${import.meta.env.VITE_BACKEND}/messages/${chatId}`)
            .then(data => setChatHistory(data))
    }, [chatId])

    function handleMessageSend() {

        const participantId = currentUserInfo.id
        request(`${import.meta.env.VITE_BACKEND}/messages`, `POST`, { participantId, message })

    }

    return (
        <main>

            <header>
                {currentUserInfo.name}
            </header>

            <section className="chat-history">
                CHAT HISTORY
                {chatHistory.map((item) => {

                    const { sender, message, timeSent } = item

                    const senderName = currentUserInfo.id === sender ? currentUserInfo.name : name

                    return (
                        <div className={`message-container ${currentUserInfo.id === sender ? '' : 'current-user'}`}>
                            <p>{senderName}</p>
                            <p>{message}</p>
                            <p>{timeSent}</p>
                        </div>
                    )
                })}
            </section>

            <section>
                <MessageField
                    messageFieldValue={message}
                    setMessageFieldValue={setmessage}
                    handleMessageSend={handleMessageSend}
                />
            </section>

        </main>
    )
}