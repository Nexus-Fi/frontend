import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="flex justify-between items-center p-4 bg-white shadow">
                <h1 className="text-xl font-bold text-blue-600">nexusfi</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Connect Wallet</button>
            </header>
            <div className="flex flex-1">
                <aside className="w-1/4 bg-white p-4 shadow">
                    <nav>
                        <ul>
                            <li className="mb-4 text-blue-600">Dashboard</li>
                            <li className="mb-4">Stake</li>
                            <li className="mb-4 text-gray-400">Restake (Coming Soon)</li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Your balance</h2>
                        <div className="flex justify-between mt-4">
                            <div className="text-xl">15 stNIBI</div>
                            <div className="text-xl">15 stNIBI</div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Points earned</h3>
                            <p className="text-xl">9,432</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">TVL</h3>
                            <p className="text-2xl text-blue-600">$2,917,644.46</p>
                            <div className="bg-gray-200 h-2 rounded">
                                <div className="bg-blue-600 h-2 rounded" style={{ width: '70%' }}></div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Total stNIBI issued: $2,784,695.01</span>
                                <span>Total NIBI issued: $132,465.05</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-100 p-4 rounded">Unbonding period</div>
                            <div className="bg-gray-100 p-4 rounded">Total burned: 1,747,790.02 (/22,805.21)</div>
                            <div className="bg-gray-100 p-4 rounded">Staking reward: 10 NIBI</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};