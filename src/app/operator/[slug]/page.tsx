import React from 'react'
import { ReactNode } from 'react';


const OperatorPage = () => {
    return (<div className="bg-indigo-900 min-h-screen text-white">
        <div className="flex justify-between items-center p-4 bg-indigo-900 text-white">
            <div className="text-2xl font-bold">EigenDA</div>
            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">Website</a>
            </div>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="my-4">
                    <h2 className="text-xl font-semibold mb-2">Eigen</h2>
                    <div className="space-y-4">testing</div>
                </div>
                <div className="p-4 bg-indigo-800 text-white rounded-md shadow-md">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center space-x-2">
                            <span className="bg-white text-indigo-900 rounded-full px-2 py-1">EIGEN</span>
                            <span>EIGEN</span>
                        </span>
                        <span>49,378,325.136</span>
                    </div>
                </div>
                <div className="p-4 bg-indigo-800 text-white rounded-md shadow-md">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center space-x-2">
                            <span className="bg-white text-indigo-900 rounded-full px-2 py-1">ETH</span>
                            <span>Beacon Ether</span>
                        </span>
                        <span>2,832,322.434</span>
                    </div>
                </div>
                <Section title="Liquid Staking Tokens">
                    <div className="p-4 bg-indigo-800 text-white rounded-md shadow-md">
                        <div className="flex justify-between items-center">
                            <span>Coinbase Staked Ether cbETH</span>
                            <span>1,015,889.669 ETH</span>
                        </div>
                    </div>
                    {/* Add more tokens similarly */}
                </Section>
            </div>
            <div>
                <div className="p-4 bg-indigo-800 text-white rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2">About EigenDA</h2>
                    <p>
                        EigenDA is a data availability solution with 10 MiB/s of write throughput and the lowest cost in its class. The system's design is inspired by Danksharding, which promises to scale Ethereum's DA beyond EIP-4844. EigenDA is available today. Learn more at
                        <a href="https://docs.eigenlayer.xyz/eigenda/overview/" className="text-blue-400 hover:underline ml-1">https://docs.eigenlayer.xyz/eigenda/overview/</a>.
                    </p>
                    {/* </div> */}
                </div>
            </div>
        </div >
    </div >
    )
}

export default OperatorPage;

interface SectionProps {
    title: string;
    children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="space-y-4">{children}</div>
        </div>
    );
};