import React from 'react'

function NavbarSkeleton() {
    return (
        <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between">

            <div className="flex flex-col gap-2">
                <div className="h-3 w-16 rounded bg-zinc-800 animate-pulse"></div>
                <div className="h-5 w-28 rounded bg-zinc-800 animate-pulse"></div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
            </div>

        </nav>
    )
}

function RestaurantSkeleton() {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

            <div className="h-44 sm:h-52 bg-zinc-800 animate-pulse"></div>

            <div className="p-4 flex flex-col gap-3">

                <div className="h-6 w-2/3 rounded bg-zinc-800 animate-pulse"></div>

                <div className="h-4 w-1/2 rounded bg-zinc-800 animate-pulse"></div>

            </div>

        </div>
    )
}

function HomeSkeleton() {

    return (

        <div className="min-h-screen bg-black">

            <NavbarSkeleton />

            {/* SEARCH SECTION */}

            <div className="w-full flex justify-center mt-8">

                <div className="w-[80%] max-w-5xl flex flex-col gap-3">

                    <div className="h-14 rounded-2xl bg-zinc-800 animate-pulse"></div>

                    <div className="flex gap-3">

                        <div className="flex-1 h-12 rounded-xl bg-zinc-800 animate-pulse"></div>

                        <div className="flex-1 h-12 rounded-xl bg-zinc-800 animate-pulse"></div>

                    </div>

                </div>

            </div>

            {/* RESTAURANT GRID */}

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {[...Array(6)].map((_, index) => (

                    <RestaurantSkeleton key={index} />

                ))}

            </div>

        </div>

    )
}

export default HomeSkeleton