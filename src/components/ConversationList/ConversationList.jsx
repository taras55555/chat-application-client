import './ConversationList.css'
import { useAuth } from "../../hooks/useAuth"
import SearchField from "../InputFields/SearchField"
import { useApi } from '../../hooks/useApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ConversationList() {

    const { request, loading, error } = useApi()
    const { id, name } = useAuth()
    const [searchFieldValue, setSearchFieldValue] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    const [conversationList, setConversationList] = useState([])

    useEffect(() => {
        request(`${import.meta.env.VITE_BACKEND}/messages`)
            .then(data => setConversationList(data))
    }, [])

    useEffect(() => {

        const liveSearchUsers = () =>
            request(`${import.meta.env.VITE_BACKEND}/users/${searchFieldValue}`)
                .then(data => setFoundUsers(data))

        if (searchFieldValue) {
            liveSearchUsers()
        }

        return () => setFoundUsers([])

    }, [searchFieldValue])

    // function handleNewConversation(participantId) {
    //     console.log('run conversation ' + participantId)

    //     request(`${import.meta.env.VITE_BACKEND}/new-conversation`, `POST`, {participantId})
    //             .then(data => setFoundUsers(data))
    // }

    return (
        <>
            <section className="user">
                {name}
            </section>

            <section className="sear-field">
                <SearchField
                    searchFieldValue={searchFieldValue}
                    setSearchFieldValue={setSearchFieldValue}
                />
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

                        })}
                    </ul>
                </nav>

            </section>

        </>
    )
}