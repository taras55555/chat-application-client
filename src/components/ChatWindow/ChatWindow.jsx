import { Outlet, useParams } from 'react-router-dom'
import ConversationList from '../ConversationList/ConversationList'
import './ChatWindow.css'
import { useEffect, useRef, useState } from 'react'
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

export default function ChatWindow() {
    const { id, name } = useAuth()
    const { chatId } = useParams()
    const [socketEvent, setSocketEvent] = useState('')
    const ws = useRef(null);
    const [conversationList, setConversationList] = useState([])
    const [participantUser, setParticipantUser] = useState({})
    const [chat, setChat] = useState([])

    const { request, loading, error } = useApi()

    useEffect(() => {
        request(`${import.meta.env.VITE_BACKEND}/messages`)
            .then(data => {
                setConversationList(data)
            })

        if (chatId) {
            request(`${import.meta.env.VITE_BACKEND}/messages/${chatId}`)
                .then(data => {
                    setChat(data)
                })

        }

    }, [socketEvent])

    useEffect(() => {
        if (chatId) {
            request(`${import.meta.env.VITE_BACKEND}/messages/${chatId}`)
                .then(data => setChat(data))

            request(`${import.meta.env.VITE_BACKEND}/user/${chatId}`)
                .then(data => {
                    setParticipantUser(data)
                })
        }

    }, [chatId])

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3000')

        ws.current.onmessage = (event) => {
            setSocketEvent(event.data);
        };

        return () => {
            ws.current.close();
        };

    }, [])

    return (
        <main className='chat-window-main'>
            <aside className="sidebar">
                <ConversationList
                    conversationList={conversationList}
                    name={name}
                />
            </aside>

            <section className='private-conversation'>
                <Outlet context={{ chat, id, chatId, participantUser }} />
            </section>

        </main>
    )
}