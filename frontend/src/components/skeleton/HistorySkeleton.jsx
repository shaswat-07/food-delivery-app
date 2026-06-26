import NavbarSkeleton from "./NavbarSkeleton";

function OrderCardSkeleton() {

    return (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

            {/* Header */}

            <div className="border-b border-zinc-800 px-5 sm:px-6 py-5 animate-pulse">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">

                    <div>

                        <div className="h-6 w-40 rounded bg-zinc-800 animate-pulse"></div>

                        <div className="h-4 w-28 rounded bg-zinc-800 mt-3 animate-pulse"></div>

                    </div>

                    <div>

                        <div className="h-4 w-20 rounded bg-zinc-800 animate-pulse"></div>

                        <div className="h-7 w-24 rounded bg-zinc-800 mt-3 animate-pulse"></div>

                    </div>

                </div>

            </div>

            {/* Order Summary */}

            <div className="p-5 sm:p-6">

                <div className="h-52 sm:h-60 rounded-2xl bg-zinc-800"></div>

            </div>

            {/* Billing */}

            <div className="border-t border-zinc-800 px-5 sm:px-6 py-5">

                <div className="h-36 rounded-2xl bg-zinc-800"></div>

            </div>

        </div>

    );

}

function OrderHistorySkeleton() {

    return (

        <div className="min-h-screen bg-black pb-16">

            <NavbarSkeleton />

            {/* Heading */}

            <div className="w-[90%] max-w-5xl mx-auto pt-8 sm:pt-10 animate-pulse">

                <div className="h-10 w-64 rounded bg-zinc-800 animate-pulse"></div>

                <div className="h-5 w-72 rounded bg-zinc-800 mt-4 animate-pulse"></div>

            </div>

            {/* Orders */}

            <div className="w-[90%] max-w-5xl mx-auto mt-10 flex flex-col gap-8 animate-pulse">

                {Array.from({ length: 2 }).map((_, index) => (

                    <OrderCardSkeleton key={index} />

                ))}

            </div>

        </div>

    );

}

export default OrderHistorySkeleton;