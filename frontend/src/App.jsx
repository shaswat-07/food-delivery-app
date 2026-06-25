import { createBrowserRouter, RouterProvider, Outlet, Navigate, redirect} from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import History from "./pages/History.jsx";
import Navbar from './components/Navbar.jsx'
import Menu from './pages/Menu.jsx';


function RootLayout(){
    return(
        <div>
            <Outlet />
        </div>
    )
}

function AuthLayout(){

    return(

        <div className="min-h-screen bg-black flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-500 rounded-2xl shadow-2xl box-border p-4 sm:p-6">
            
                
                <div className="flex flex-col items-center mb-4">
                    
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
                        Food
                    </h1>

                    <p className="text-zinc-400 text-sm mt-2">
                        Fast & Fresh.
                    </p>

                </div>
                
                <Outlet />

            </div>
        </div>

    )

}


function HomeLayout(){

    return(

        <div>

            <Outlet />

        </div>

    )

}

function ProtectedLayout(){

    return(

        <div>
            
            <Outlet />

        </div>

    )

}

async function verify(){

    const token = localStorage.getItem('access-token')
    if(!token){

        throw redirect('/auth/login')

    }

    return null
}


const router = createBrowserRouter([

    {

        path: '/',
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: HomeLayout,
                children: [
                    {
                        index: true,
                        Component: Home
                    },
                    {
                        path: 'menu/:id',
                        Component: Menu
                    }
                ]
            },
            {
                path: 'auth',
                Component: AuthLayout,
                children: [
                    {
                        path: 'login',
                        Component: Login
                    },
                    {
                        path: 'signup',
                        Component: Signup
                    },
                ]
            },
            {
                Component: ProtectedLayout,
                loader: verify,
                children: [
                    {
                        path: 'cart',
                        Component: Cart
                    },
                    {
                        path: 'order',
                        Component: Order
                    },
                    {
                        path: 'history',
                        Component: History
                    },
                    {
                        path: 'profile',
                        Component: Profile
                    }
                ]
            }
        ]
    }
])

function App(){
    return <RouterProvider router={router} />
}

export default App