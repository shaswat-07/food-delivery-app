import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance.js'
import MenuSkeleton from '../components/skeleton/MenuSkeleton.jsx'
import FoodCard from '../components/FoodCard'
import Navbar from '../components/Navbar.jsx'

function Menu(){

    const location= useLocation()
    const search = location.state?.search
    const searchResult = location.state?.searchResult

    const { id } = useParams()

    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchMenu(){

            try{

                const res = await axiosInstance.get(`/api/restaurant/menu/${id}`)
                setFoods(res.data.foods)
                
            }
            catch(error){

                console.log(error)
                
            }
            finally{

                setLoading(false)

            }

        }

        fetchMenu()

    }, [id])

    if(loading){

        return <MenuSkeleton/>
        
    }

    return(

        <div className="p-10 flex flex-col gap-6 bg-black min-h-screen min-w-screen">
            
            
            <Navbar />


            {
            foods.map((food) => (
                <FoodCard food={food}/>
            ))
            }

        </div>
    )
}

export default Menu