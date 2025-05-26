import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/variables.css'
import './styles/global.css'
import Root from './routes/root.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContexts.jsx';
import PrivateConversation from './components/PrivateConversation/PrivateConversation.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: 'chat/:chatId',
        element: <PrivateConversation />
      },
    
    ]
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
