import { Outlet, useParams } from 'react-router-dom'
import ConversationList from '../ConversationList/ConversationList'
import './ChatWindow.css'
import { useEffect, useRef, useState } from 'react'
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../Toast/Toast';
import { useNavigate } from 'react-router-dom'

export default function ChatWindow() {
    const ws = useRef(null);
    const { id, name} = useAuth()
    const { chatId } = useParams()

    const [chat, setChat] = useState([])
    const [toastQueue, setToastQueue] = useState([]);
    const [socketEvent, setSocketEvent] = useState({})
    const [participantUser, setParticipantUser] = useState({})
    const [conversationList, setConversationList] = useState([])

    const { request, loading, error } = useApi()
    
    const navigate = useNavigate()
    useEffect(() => {
        if (socketEvent.type === `notification`) {
            setToastQueue(toasts => [...toasts, { message: `${socketEvent.participantName}: ${socketEvent.message}` }])
        }

        request(`http://${import.meta.env.VITE_BACKEND}/messages`)
            .then(data => {
                setConversationList(data)
            })

        if (chatId) {
            request(`http://${import.meta.env.VITE_BACKEND}/message/${chatId}`)
                .then(data => {
                    setChat(data)
                })

        }

    }, [socketEvent])

    useEffect(() => {
        if (chatId) {
            request(`http://${import.meta.env.VITE_BACKEND}/message/${chatId}`)
                .then(data => setChat(data))

            request(`http://${import.meta.env.VITE_BACKEND}/user/${chatId}`)
                .then(data => {
                    setParticipantUser(data)
                })
        }

    }, [chatId])

    useEffect(() => {
        ws.current = new WebSocket(`ws://${import.meta.env.VITE_BACKEND}`)
        ws.current.onmessage = (event) => {
            const { type, participantName = null, message = null } = JSON.parse(event.data)
            setSocketEvent({ type, participantName, message });
        };

        return () => {
            ws.current.close();
        };

    }, [])

    const handleLogOut = async () => {
        await request(`http://${import.meta.env.VITE_BACKEND}/logout`, 'POST')
        window.location.reload()   
    }

    return (
        <>
            {toastQueue.length > 0 && <Toast toastQueue={toastQueue} setToastQueue={setToastQueue} />}
            <main className='chat-window-main'>
                <aside className="sidebar">
                    <ConversationList
                        conversationList={conversationList}
                        name={name}
                        id={id}
                        handleLogOut={handleLogOut}
                    />
                </aside>

                <section className='private-conversation'>
                    <Outlet context={{ chat, id, chatId, participantUser }} />
                </section>

            </main>

        </>
    )
}