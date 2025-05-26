import { Outlet } from 'react-router-dom'
import ConversationList from '../ConversationList/ConversationList'
import PrivateConversation from '../PrivateConversation/PrivateConversation'
import './ChatWindow.css'

export default function ChatWindow() {

    return (
        <main className='chat-window-main'>
            <aside className="sidebar">
                <ConversationList />
            </aside>

            <section className='private-conversation'>
                <Outlet />
            </section>

        </main>
    )
}