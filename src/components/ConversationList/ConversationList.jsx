import './ConversationList.css'
import SearchField from "../InputFields/SearchField"
import { useApi } from '../../hooks/useApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate, generateItemKey } from '../../utils/commonUtils'
import Button from '../Button/Button'

export default function ConversationList({ conversationList, name, id, handleLogOut }) {
    const { request, loading, error } = useApi()
    
    const [searchFieldValue, setSearchFieldValue] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const liveSearchContacts = () => {
            request(`http://${import.meta.env.VITE_BACKEND}/users/${searchFieldValue}`)
                .then(data => setFoundUsers(data))
        }

        if (searchFieldValue) {
            liveSearchContacts()
        }

        return () => setFoundUsers([])

    }, [searchFieldValue])

    

    return (
        <>
            <section className="user">

                <section className='user-data'>
                    <h2>{name}</h2>
                    <Button value={'Log Out'} onClick={handleLogOut} />
                </section>

                <SearchField
                    className={'input-wrapper search-input-position'}
                    searchFieldValue={searchFieldValue}
                    setSearchFieldValue={setSearchFieldValue}
                />
            </section>

            <section className='conversation-block'>

                {foundUsers.length > 0 && (
                    <>
                        <h2>Matching contacts</h2>
                        <nav>
                            <ul>
                                {foundUsers.map((contact) => {

                                    return (
                                        <Link
                                            to={`/chat/${contact._id}`}
                                            onClick={() => setFoundUsers([])}
                                            className='conversation-card'
                                        >
                                            <li key={generateItemKey()}>
                                                <p>{contact.name}</p>
                                                <p>{contact.email}</p>

                                                start conversation

                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </nav>
                    </>
                )}

                <h2>Existing Conversations</h2>
                <nav>
                    <ul className='conversation-list'>
                        {conversationList.map((contact) => {
                            const lastMessage = contact.chatHistory?.[0]?.['message']
                            const [[companionId, companionName]] = Object.entries(contact.memberNames)
                                .filter(item => !item.includes(id))

                            const formattedDate = formatDate(contact.lastActivity, { year: 'numeric', month: 'short', day: 'numeric' })

                            return (
                                <Link
                                    key={generateItemKey()}
                                    to={`/chat/${companionId}`}
                                    className='conversation-card'
                                >
                                    <p className='companion-name'>{companionName}</p>
                                    <p className='message-date last-activity'>{formattedDate}</p>
                                    {lastMessage && <p className='last-message'>{lastMessage}</p>}
                                </Link>
                            )
                        })}
                    </ul>
                </nav>

            </section>

        </>
    )
}