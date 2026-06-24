import {createContext, useContext, useEffect, useState} from 'react'
import axiosInstance from '../utils/axiosInstance'


const UserContext = createContext()



export function UserProvider({ children }){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchCsrfToken(){

        try{

            const res = await axiosInstance.get('/csrf-token')
            console.log('Csrf token found')

            localStorage.setItem('csrf-token',res.data.csrfToken)

        }catch(error){

            console.log(error)
        }
    }

    async function fetchUser(){
        try{
            const token =localStorage.getItem('access-token')

            // GUEST USER

            if(!token){

                setUser(null)
                setLoading(false)
                return
            }
            

            // FETCH AUTHENTICATED USER

            const response = await axiosInstance.get('/api/auth/getMe')
            setUser(response.data)
            console.log('Authenticated user found ', response.data)
        }catch(error){

            console.log('User fetch failed:', error)

            setUser(null)

        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {

        async function initialize(){
            await fetchCsrfToken()
            await fetchUser()

        }

        initialize()

    }, [])

    return(

        <UserContext.Provider
            value={{
                user,
                setUser,
                loading,
                fetchUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}