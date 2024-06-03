"use client"
import React from 'react'
import { CiDollar } from "react-icons/ci";


const Delegate = () => {
    const [isConnected, setIsConnected] = React.useState(false)

    return (
        <div>
            <div className='text-[30px] font-bold pb-5'>
                Delegate
            </div>
            <div className='py-4'>
                <div className='text-xl font-bold'> Node Operators</div>

                {/* creating token cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="card  my-5 bg-base-200 shadow-xl">
                        <div className=" p-5 justify-between items-center">
                            <div className='flex flex-row w-full items-center gap-4'>
                                <CiDollar className='bg-yellow-300 rounded-xl text-3xl' />
                                <div>
                                    <h2 className="text-left text-xl font-semibold ">NexusFi</h2>
                                    <div className='text-[12px]'>0x321980af329232423423</div>
                                </div>

                            </div>
                            <div className="divider divider-neutral"></div>

                            <div>
                                <div className='pb-4'>InfStones is committed to supporting a wide range of AVSes and reward delegators through our Giveaway!
                                </div>
                                <div className='text-sm'>
                                    <div className="my-1 border-t border-gray-300"></div>
                                    <div className="">
                                        <div className='flex items-center justify-between'>
                                            <div className=''>RESTAKE CONCENTRATION</div>
                                            <div> 5.3</div>
                                        </div>
                                    </div>

                                    <div className="my-1 border-t border-gray-300"></div>
                                    <div className="">
                                        <div className='flex items-center justify-between'>
                                            <div className=''>NIBI RESTAKED</div>
                                            <div> 0.000</div>
                                        </div>
                                    </div>

                                    <div className="my-1 border-t border-gray-300"></div>
                                    <div className="">
                                        <div className='flex items-center justify-between'>
                                            <div className=''>NEXUS RESTAKED</div>
                                            <div> 0.000</div>
                                        </div>
                                    </div>

                                    <div className="my-1 border-t border-gray-300"></div>
                                    <div className="">
                                        <div className='flex items-center justify-between'>
                                            <div className=''>TOTAL NUM. STAKERS</div>
                                            <div> 0.000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className='flex flex-row gap-4'>
                                <div className="flex items-center justify-center">
                                    <div className="w-px h-12 bg-green-300"></div>
                                    <div className='flex flex-col px-2'>
                                        <div> 0.000</div>
                                        <div className='text-xs'>Restaked</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="w-px h-12 bg-green-300"></div>
                                    <div className='flex flex-col px-2'>
                                        <div> 7320223</div>
                                        <div className='text-xs'>TVL</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="card w-full my-5 bg-base-200 shadow-xl">
                        <div className="flex p-5 justify-between items-center">
                            <div className='flex flex-row items-center gap-2'>
                                <CiDollar className='bg-yellow-300 rounded-xl text-xl' />
                                <h2 className="text-left text-2xl font-semibold ">NexusFi</h2>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className="flex items-center justify-center">
                                    <div className="w-px h-12 bg-green-300"></div>
                                    <div className='flex flex-col px-2'>
                                        <div> 0.000</div>
                                        <div className='text-xs'>Restaked</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="w-px h-12 bg-green-300"></div>
                                    <div className='flex flex-col px-2'>
                                        <div> 7320223</div>
                                        <div className='text-xs'>TVL</div>
                                    </div>
                                </div>
                                {/* <div className="divider lg:divider-horizontal divider-info">.</div>

                            <div className="flex flex-col w-full">
                                <div className="divider divider-info">Info</div>
                            </div> */}

                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Delegate;