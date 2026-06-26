import NavbarSkeleton from './NavbarSkeleton'

function FoodCardSkeleton(){

    return(

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 animate-pulse">

            {/* Top */}

            <div className="flex items-center justify-between animate-pulse">

                <div className="h-6 w-40 rounded bg-zinc-800 animate-pulse"></div>

                <div className="h-6 w-16 rounded bg-zinc-800 animate-pulse"></div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 flex-col sm:flex-row animate-pulse">

                <div className="h-10 w-full sm:w-36 rounded-xl bg-zinc-800 animate-pulse"></div>

                <div className="h-10 w-full sm:w-36 rounded-xl bg-zinc-800 animate-pulse"></div>

            </div>

        </div>

    )

}

function MenuSkeleton(){

    return(

        <div className="p-10 flex flex-col gap-6 bg-black min-h-screen">

            <NavbarSkeleton />

            {Array.from({ length: 6 }).map((_, index)=>(

                <FoodCardSkeleton key={index} />

            ))}

        </div>

    )

}

export default MenuSkeleton