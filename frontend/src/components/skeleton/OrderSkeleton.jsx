import NavbarSkeleton from './NavbarSkeleton'

function OrderSkeleton(){

    return(

        <div className="min-h-screen bg-black">

            <NavbarSkeleton />

            <div className="w-[90%] max-w-5xl mx-auto pt-8 sm:pt-10 flex flex-col gap-6 sm:gap-8">

                {/* Heading */}

                <div>

                    <div className="h-10 w-48 rounded bg-zinc-800 animate-pulse animate-pulse"></div>

                    <div className="h-5 w-64 rounded bg-zinc-800 mt-4 animate-pulse"></div>

                </div>

                {/* Order Summary */}

                <div className="w-full h-80 sm:h-96 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse"></div>

                {/* Billing Details */}

                <div className="w-full h-72 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse"></div>

                {/* Place Order Button */}

                <div className="w-full h-16 rounded-2xl bg-zinc-800 animate-pulse"></div>

            </div>

        </div>

    )

}

export default OrderSkeleton