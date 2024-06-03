"use client"
import React from 'react'
import OperatorCard from './OperatorCard';
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

export default Delegate;