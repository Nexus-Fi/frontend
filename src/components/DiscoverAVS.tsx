
"use client"
import React from 'react'
import OperatorCard from './OperatorCard';

const DiscoverAVS = () => {
    const [isConnected, setIsConnected] = React.useState(false)

    return (
        <div>
            <div className='text-[30px] font-bold pb-5'>
                Discover
            </div>
            <div className='py-4'>
                <div className='text-xl font-bold'>Actively Validated Services</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                        <OperatorCard
                            key={index}
                        // title={`Card ${index + 1}`}
                        // content={`This is the content for card ${index + 1}.`}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default DiscoverAVS;