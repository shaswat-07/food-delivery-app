import NavbarSkeleton from './NavbarSkeleton'

function CartItemSkeleton(){

    return(

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

            {/* Desktop */}

            <div className="hidden sm:flex items-center justify-between">

                <div className="flex flex-col gap-3">

                    <div className="h-6 w-48 rounded bg-zinc-800"></div>

                    <div className="h-4 w-24 rounded bg-zinc-800"></div>

                    <div className="h-10 w-24 rounded-xl bg-zinc-800 mt-2"></div>

                </div>

                <div className="flex items-center gap-5">

                    <div className="w-32 h-11 rounded-xl bg-zinc-800"></div>

                    <div className="h-6 w-16 rounded bg-zinc-800"></div>

                </div>

            </div>

            {/* Mobile */}

            <div className="flex flex-col gap-4 sm:hidden">

                <div className="flex items-center justify-between">

                    <div className="h-5 w-36 rounded bg-zinc-800"></div>

                    <div className="h-5 w-16 rounded bg-zinc-800"></div>

                </div>

                <div className="h-4 w-20 rounded bg-zinc-800"></div>

                <div className="flex items-center justify-between">

                    <div className="h-10 w-24 rounded-xl bg-zinc-800"></div>

                    <div className="h-11 w-32 rounded-xl bg-zinc-800"></div>

                </div>

            </div>

        </div>

    )

}

function CartSkeleton(){

    return(

        <div className="min-h-screen bg-black">

            <NavbarSkeleton />

            {/* Header */}

            <div className="w-[90%] mx-auto pt-8 sm:pt-10 pb-6 animate-pulse">

                <div className="h-9 w-56 rounded bg-zinc-800 animate-pulse"></div>

                <div className="h-5 w-80 rounded bg-zinc-800 mt-4 animate-pulse"></div>

            </div>

            {/* Items */}

            <div className="w-[90%] mx-auto flex flex-col gap-5 pb-40 sm:pb-36 animate-pulse">

                {Array.from({ length: 3 }).map((_, index)=>(

                    <CartItemSkeleton key={index} />

                ))}

            </div>

            {/* Bottom Summary */}

            <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 px-4 sm:px-6 py-4 sm:py-5 animate-pulse">

                <div className="w-[90%] mx-auto flex items-center justify-between animate-pulse">

                    <div>

                        <div className="h-4 w-24 rounded bg-zinc-800 animate-pulse"></div>

                        <div className="h-8 w-10 rounded bg-zinc-800 mt-2 animate-pulse"></div>

                    </div>

                    <div className="h-14 w-52 rounded-2xl bg-zinc-800 animate-pulse"></div>

                </div>

            </div>

        </div>

    )

}

export default CartSkeleton