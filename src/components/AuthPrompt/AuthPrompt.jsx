import './AuthPrompt.css'
import Button from "../Button/Button";

export default function AuthPrompt() {

    return (

        <main className='auth-prompt-main'>

            <section>
                To start chatting, please log in to your account.
            </section>

            <section>
                <a href='http://localhost:3000/login/federated/google'>
                    <Button value={`Sign in with Google`} />
                </a>
            </section>

        </main>

    )
}