"use client"
import React from 'react'
import { CiDollar } from "react-icons/ci";


const Restaking = () => {
    const [isConnected, setIsConnected] = React.useState(false)

    return (
        <div>
            <div className='text-[30px] font-bold pb-5'>
                Restaking
            </div>
            <div className='py-4'>
                <div className='text-xl font-bold'> Tokens</div>

                {/* creating token cards */}
                <div className="card w-full my-5 bg-base-200 shadow-xl">
                    <div className="flex p-5 justify-between items-center">
                        <div className='flex flex-row items-center gap-2'>
                            <CiDollar className='bg-yellow-300 rounded-xl text-xl' />
                            <h2 className="text-left text-lg font-semibold ">Nexus</h2>
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

            <div className='py-4'>
                <div className='text-xl font-bold'> NIBI</div>

                {/* creating token cards */}
                <div className="card w-full my-5 bg-base-200 shadow-xl">
                    <div className="flex p-5 justify-between items-center">
                        <div className='flex flex-row items-center gap-2'>
                            <CiDollar className='bg-yellow-300 rounded-xl text-xl' />
                            <h2 className="text-left text-lg font-semibold ">Nibiru</h2>
                        </div>                        <div className='flex flex-row gap-4'>
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
                                    <div> 0.000</div>
                                    <div className='text-xs'>Restaked Points</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-px h-12 bg-green-300"></div>
                                <div className='flex flex-col px-2'>
                                    <div> 7320223</div>
                                    <div className='text-xs'>TVL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='py-4'>
                <div className='text-xl font-bold'> LSTs</div>

                <div className="card w-full my-5 bg-base-200 shadow-xl">
                    <div className="flex p-5 justify-between items-center">
                        <h2 className="text-left text-lg font-semibold ">Lido Staked Ether</h2>
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
                                    <div> 0.000</div>
                                    <div className='text-xs'>Restaked Points</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-px h-12 bg-green-300"></div>
                                <div className='flex flex-col px-2'>
                                    <div> 7320223</div>
                                    <div className='text-xs'>TVL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-full my-5 bg-base-200 shadow-xl">
                    <div className="flex p-5 justify-between items-center">
                        <h2 className="text-left text-lg font-semibold ">Liquid Staked Ether</h2>
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
                                    <div> 0.000</div>
                                    <div className='text-xs'>Restaked Points</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-px h-12 bg-green-300"></div>
                                <div className='flex flex-col px-2'>
                                    <div> 7320223</div>
                                    <div className='text-xs'>TVL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-full my-5 bg-base-200 shadow-xl">
                    <div className="flex p-5 justify-between items-center">
                        <h2 className="text-left text-lg font-semibold ">Rocket Pool Ether</h2>
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
                                    <div> 0.000</div>
                                    <div className='text-xs'>Restaked Points</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-px h-12 bg-green-300"></div>
                                <div className='flex flex-col px-2'>
                                    <div> 7320223</div>
                                    <div className='text-xs'>TVL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Restaking;