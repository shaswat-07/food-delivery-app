function CartItem({ item, onIncrease, onDecrease, handleSelect, selectedItems}) {
    
    
    return(

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

            {/* DESKTOP */}
            <div className="hidden sm:flex items-center justify-between">

                <div className="flex flex-col gap-2">

                    <div className="flex items-center gap-2">

                        <div
                            className={`w-3 h-3 rounded-full ${
                                item.food.isVeg ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>

                        <h2 className="text-white text-lg font-semibold">
                            {item.food.name}
                        </h2>

                    </div>

                    <p className="text-zinc-400 text-sm">
                        ₹{item.food.price} each
                    </p>

                    <button
                        className={`mt-2 px-4 py-2 rounded-xl text-sm transition self-start ${
                            selectedItems.includes(item.food._id)
                                ? 'bg-white text-black'
                                : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
                        }`}
                        onClick={handleSelect}
                    >
                        Select
                    </button>

                </div>

                <div className="flex items-center gap-5">

                    <div className="flex items-center bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">

                        <button
                            onClick={onDecrease}
                            className="px-4 py-2 text-white hover:bg-zinc-700 transition"
                        >
                            -
                        </button>

                        <span className="px-4 text-white font-medium">
                            {item.quantity}
                        </span>

                        <button
                            onClick={onIncrease}
                            className="px-4 py-2 text-white hover:bg-zinc-700 transition"
                        >
                            +
                        </button>

                    </div>

                    <p className="text-white text-lg font-bold w-16 text-right">
                        ₹{item.food.price * item.quantity}
                    </p>

                </div>

            </div>

            {/* MOBILE */}
            <div className="flex flex-col gap-4 sm:hidden">

                {/* TOP */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <div
                            className={`w-3 h-3 rounded-full ${
                                item.food.isVeg ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>

                        <h2 className="text-white text-base font-semibold">
                            {item.food.name}
                        </h2>

                    </div>

                    <p className="text-white text-lg font-bold whitespace-nowrap">
                        ₹{item.food.price * item.quantity}
                    </p>

                </div>

                <p className="text-zinc-400 text-sm">
                    ₹{item.food.price} each
                </p>

                {/* BOTTOM */}
                <div className="flex items-center justify-between">

                    <button
                        className={`px-4 py-2 rounded-xl text-sm transition ${
                            selectedItems.includes(item.food._id)
                                ? 'bg-white text-black'
                                : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
                        }`}
                        onClick={handleSelect}
                    >
                        Select
                    </button>

                    <div className="flex items-center bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">

                        <button
                            onClick={onDecrease}
                            className="px-4 py-2 text-white hover:bg-zinc-700 transition"
                        >
                            -
                        </button>

                        <span className="px-4 text-white font-medium">
                            {item.quantity}
                        </span>

                        <button
                            onClick={onIncrease}
                            className="px-4 py-2 text-white hover:bg-zinc-700 transition"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default CartItem