import NavbarSkeleton from "./NavbarSkeleton";

function ProfileOptionSkeleton() {

    return (

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 flex items-center justify-between animate-pulse">

            <div className="flex items-center gap-5">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-800 animate-pulse"></div>

                <div className="flex flex-col gap-2 animate-pulse">

                    <div className="h-6 w-36 rounded bg-zinc-800 animate-pulse"></div>

                    <div className="h-4 w-48 rounded bg-zinc-800 animate-pulse"></div>

                </div>

            </div>

            <div className="w-6 h-6 rounded bg-zinc-800"></div>

        </div>

    )

}

function ProfileSkeleton() {

    return (

        <div className="min-h-screen bg-black">

            <NavbarSkeleton />

            <div className="w-[90%] max-w-4xl mx-auto pt-8 sm:pt-10 flex flex-col gap-6 sm:gap-8">

                {/* Profile Header */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-8 flex items-center gap-4 sm:gap-6 animate-pulse">

                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-zinc-800 animate-pulse"></div>

                    <div className="flex flex-col gap-3 animate-pulse">

                        <div className="h-8 w-48 rounded bg-zinc-800 animate-pulse"></div>

                        <div className="h-5 w-64 rounded bg-zinc-800" animate-pulse></div>

                    </div>

                </div>

                {/* Options */}

                <div className="flex flex-col gap-5">

                    <ProfileOptionSkeleton />

                    <ProfileOptionSkeleton />

                    <ProfileOptionSkeleton />

                </div>

            </div>

        </div>

    )

}

export default ProfileSkeleton;