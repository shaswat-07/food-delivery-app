import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import RestaurantCard from '../components/RestaurantCard'
import FoodCard from '../components/FoodCard'


function Home(){
    const location = useLocation()
    const navigate= useNavigate()


    const [restaurants, setRestaurants] = useState([])
    const [search, setSearch]= useState('')
    const [searchResult, setSearchResult]=useState([])
    const [isVeg, setIsVeg]= useState(null)
    const [page,setPage]= useState(1)
    const [hasMore, setHasMore]= useState(true)

    useEffect(()=>{
        async function fetchRestaurants(){
            try{
                const res= await axiosInstance.get('/api/restaurant/all')
                setRestaurants(res.data.restaurants)
            }catch(error){
                console.log(error)
            }
        }
        fetchRestaurants()
    },[])


    async function handleSearch(e){


        setSearch(e)
        if(e.trim()===''){
            setSearchResult([])
            setPage(1)
            setHasMore(true)
            return
        }
        
        try{
            
            
            const res= await axiosInstance.get(`/api/food/search`,{
                params:{
                    search: e,
                    page: 1
                }
            })
            
            setSearchResult([...res.data.foods])
            setHasMore(res.data.totalPages>1);
                
            
        }catch(error){
            setSearchResult([])
            console.log(error)
        }
    }

    async function loadMore() {


        if(!hasMore){
            return;
        }

        try{
            
            const nextPage= page+1
            const res= await axiosInstance.get('/api/food/search',{
                params:{
                    search: search,
                    page: nextPage
                }
            })
            setSearchResult(prev=>[...prev, ...res.data.foods])
            setPage(nextPage)


            if(nextPage>= res.data.totalPages){
                setHasMore(false)
            }


        }catch(error){
            console.log(error)
        }
        
    }

    

    useEffect(() => {

        if(location.state){

            setSearch(location.state.search || '')
            setSearchResult(location.state.searchResult || [])
            
            navigate('/', {
                replace: true,
                state: null
            })
        }

    }, [])


    async function handleFilter(isVeg){
        if(search.trim()===''){
            return
        }
        try{
            const res= await axiosInstance.get('/api/food/search',{
                params:{
                    search: search,
                    isVeg: isVeg
                }
            })
            setSearchResult([,...res.data.foods])
        }catch(error){
            console.log(error)
        }
    }

    
    return(
        <div className="min-h-screen bg-black">

            <Navbar />

            {/* SEARCH SECTION */}

            <div className="w-full flex justify-center mt-8">

                <div className="w-[80%] max-w-5xl flex flex-col gap-3">

                    {/* SEARCH BAR */}

                    <input
                        type="text"
                        placeholder="Search food..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-zinc-900 text-white px-5 py-4 rounded-2xl border border-zinc-700 outline-none"
                    />

                    <div className="flex gap-3">

                        <button
                            onClick={() => handleFilter(true)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                        >
                            Veg
                        </button>

                        <button
                            onClick={() => handleFilter(false)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
                        >
                            Non Veg
                        </button>

                    </div>

                </div>

            </div>

            {/* SEARCH RESULTS */}

            {
            search && search.trim() !== ''
            ?
            (
                <div className="w-[92%] sm:w-[90%] max-w-6xl mx-auto mt-8 sm:mt-10 flex flex-col gap-6">

                    {
                    searchResult && searchResult.map((food) => (
                        <FoodCard
                            key={food._id}
                            food={food}
                            switchToRestaurant={true}
                            search={search}
                            searchResult={searchResult}
                        />
                    ))
                    }

                    {
                    hasMore?
                    (
                        <button 
                            className="self-center mt-4 px-8 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-white font-medium hover:bg-zinc-800 hover:border-zinc-600 transition cursor-pointer"
                            onClick={loadMore}
                        >Load More</button>
                    ):
                    (null)
                    }
                    
                    
                </div>
            )
            :
            (
                /* RESTAURANTS */

                <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
                    restaurants.map((restaurant) => (

                        <RestaurantCard
                            key={restaurant._id}
                            restaurant={restaurant}
                            switchToRestaurant={true}
                            search={search}
                            searchResult={searchResult}
                        />

                    ))
                    }

                </div>
            )
            }
        </div>
    )
}

export default Home
