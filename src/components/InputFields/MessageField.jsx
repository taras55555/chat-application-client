export default function MessageField({ className, messageFieldValue, setMessageFieldValue, handleMessageSend }) {

    return (
        <section className={className}>
            <input
                type="text"
                value={messageFieldValue}
                onChange={(e) => setMessageFieldValue(e.target.value)}
                placeholder="Type your message"
                onKeyDown={(e) => { if (e.key === 'Enter') handleMessageSend() }}
            />
            <button className="send-btn" onClick={handleMessageSend}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1e201e"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
            </button>

        </section>
    )
}