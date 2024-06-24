"use client"
import React from 'react'

const Dashboard = () => {
    const [isConnected, setIsConnected] = React.useState(false)

    return (
        <div>
            <div className='pb-5 text-[30px] font-bold '>
                Dashboard
            </div>
            <div className='flex gap-5'>
                <div className="card bg-base-100 shadow-xl w-[50%]">
                    <div className="card-body">
                        <h2 className="card-title">Restaked</h2>
                        <div className='p-5'>
                            {isConnected ? <div>Value : 0</div> :
                                <div>
                                    <progress className="progress p-2 "></progress>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl w-[50%]">
                    <div className="card-body">
                        <h2 className="card-title">Delegated</h2>
                        <div className='p-5'>
                            {isConnected ? <div>Value : 0</div> :
                                <div>
                                    <progress className="progress p-2 "></progress>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className=" w-[50%]">
                    <div className="m-5 p-5 rounded-lg">
                        <div className='p-0'>
                            {isConnected ? <div>Value : 0</div> :
                                <div>
                                    <progress className="progress p-2 " value={0} max="100"></progress>
                                </div>}
                        </div>
                        <h2 className="">Restaked Points</h2>
                    </div>

                </div>
                <div className="w-[50%]">
                    <div className="m-5 p-5 rounded-lg">
                        <div className='p-0'>
                            {isConnected ? <div>Value : 0</div> :
                                <div>
                                    <progress className="progress p-2 " value={0} max="100"></progress>
                                </div>}
                        </div>
                        <h2 className="">Restaked Ratio</h2>
                    </div>

                </div>
            </div>
            <div>
                <div className='text-xl font-bold'> Your Stake</div>
                <div className="card w-full my-5 p-5 items-center bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Connect your wallet to view your restaked tokens</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;