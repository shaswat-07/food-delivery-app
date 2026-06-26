function OrderSummary({order, address, setAddress, saveAddress, addressError, isEditingAddress, setIsEditingAddress, button, addressSaving}) {
    

    return(

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-6">

            <div className="flex flex-col gap-1">

                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Order Summary
                </h2>

                <p className="text-zinc-400 text-xs sm:text-sm">
                    Review your final order
                </p>

            </div>

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 flex flex-col gap-3">

                <h3 className="text-white font-medium">
                    Delivery Address
                </h3>

                {
                    addressError &&
                    (
                        <p className="text-red-500 text-sm">
                            Please enter delivery address first
                        </p>
                    )
                }

                {
                    isEditingAddress
                    ?
                    (
                        <input
                            type="text"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            placeholder="Enter delivery address"
                            className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white"
                        />
                    )
                    :
                    (
                        <p className="text-zinc-400 text-sm leading-relaxed break-words">
                            {address}
                        </p>
                    )
                }


                {
                button &&
                (
                    !isEditingAddress
                    ?
                    (
                        <button
                            onClick={() => setIsEditingAddress(true)}
                            className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl text-white self-start"
                        >
                            Edit
                        </button>
                    )
                    :
                    (
                        <button
                            onClick={() => saveAddress(address)}
                            disabled={addressSaving}
                            className={`px-4 py-2 rounded-xl text-white self-start flex items-center gap-2 transition ${
                                addressSaving
                                    ? 'bg-green-500 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                            }`}
                        >
                            {
                            addressSaving &&
                            (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )
                            }

                            {addressSaving ? 'Saving' : 'Save Address'}

                        </button>
                    )
                )
                }


            </div>

            <div className="flex flex-col gap-4">

                {
                order.items.map(item => (

                    <div
                        key={item._id}
                        className="flex items-center justify-between gap-4"
                    >

                        <div>

                            <p className="text-white font-medium break-words">
                                {item.name}
                            </p>

                            <p className="text-zinc-400 text-sm">
                                Qty: {item.quantity}
                            </p>

                        </div>

                        <p className="text-white font-semibold whitespace-nowrap">
                            ₹{item.totalPrice}
                        </p>

                    </div>

                ))
                }

            </div>

        </div>

    )
}

export default OrderSummary