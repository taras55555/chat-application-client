import './ConversationList.css'
import SearchField from "../InputFields/SearchField"
import { useApi } from '../../hooks/useApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ConversationList({ conversationList, name }) {

    const { request, loading, error } = useApi()

    const [searchFieldValue, setSearchFieldValue] = useState('')
    const [foundUsers, setFoundUsers] = useState([])

    useEffect(() => {

        const liveSearchUsers = () =>
            request(`${import.meta.env.VITE_BACKEND}/users/${searchFieldValue}`)
                .then(data => setFoundUsers(data))

        if (searchFieldValue) {
            liveSearchUsers()
        }

        return () => setFoundUsers([])

    }, [searchFieldValue])

    return (
        <>
            <section className="user">
                <p>{name}</p>
                <p>
                    <SearchField
                        searchFieldValue={searchFieldValue}
                        setSearchFieldValue={setSearchFieldValue}
                    />
                </p>
            </section>

            <section className='conversation-list'>

                {foundUsers.length > 0 && (
                    <>
                        <h2>Search new contact</h2>
                        <nav>
                            <ul>
                                {foundUsers.map((contact) => {

                                    return (<li key={contact._id}>
                                        <p>{contact.name}</p>
                                        <p>{contact.email}</p>
                                        <Link to={`/chat/${contact._id}`}>
                                            start conversation
                                        </Link>
                                    </li>)
                                })}
                            </ul>
                        </nav>
                    </>
                )}

                <h2>Chats</h2>
                <nav>
                    <ul>
                        {conversationList.map((contact) => {

                            const [companionName] = Object.values(contact.memberNames)

                            const formattedDate = new Date(contact.lastActivity).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',  // 'May'
                                day: 'numeric'
                            })

                            return (
                                <Link to={`/chat/${contact.members[0]}`} className='conversation-card'>
                                    <p className='companion-name'>{companionName}</p>
                                    <p className='message-date last-activity'>{formattedDate}</p>
                                    <p className='last-message'>{contact.chatHistory[0]['message']}</p>
                                </Link>
                            )
                        })}
                    </ul>
                </nav>

            </section>

        </>
    )
}