import { useNavigate } from 'react-router-dom'

function RestaurantCard({ restaurant }){

    const navigate = useNavigate()

    return(
        <div
            onClick={() => navigate(`/menu/${restaurant._id}`)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-zinc-700 transition duration-300 w-full"
        >

            <div className="h-44 sm:h-52 w-full overflow-hidden">

                <img
                    src={restaurant.picture}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />

            </div>

            <div className="p-3 sm:p-4 flex flex-col gap-1">

                <h2 className="text-white text-lg sm:text-xl font-semibold">
                    {restaurant.name}
                </h2>

                <p className="text-zinc-400 text-xs sm:text-sm">
                    Burgers • Fast Food • Snacks
                </p>

            </div>

        </div>
    )
}

export default RestaurantCard