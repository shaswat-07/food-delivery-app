import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GoogleOAuthProvider }
from '@react-oauth/google'

import { UserProvider }
from './context/UserContext'

import './index.css'

import App from './App.jsx'

createRoot(
    document.getElementById('root')
).render(

    <StrictMode>

        <GoogleOAuthProvider
            clientId='265221761769-79hrcfsv44ua1d5sv9qnpon3gi2ue3oq.apps.googleusercontent.com'
        >

            <UserProvider>

                <App />

            </UserProvider>

        </GoogleOAuthProvider>

    </StrictMode>
)