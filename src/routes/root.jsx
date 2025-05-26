import AuthPrompt from "../components/AuthPrompt/AuthPrompt";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { useAuth } from "../hooks/useAuth";

export default function Root() {

  const { id, name } = useAuth()

  return (
    <>
      {!id && <AuthPrompt />}

      {id && <ChatWindow />}
    </>
  )
}