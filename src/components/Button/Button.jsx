import './Button.css'


export default function Button({value, handleNewConversation=null}) {

    return (
        <button className='button' onClick={handleNewConversation}>
            {value}
        </button>
    )
}