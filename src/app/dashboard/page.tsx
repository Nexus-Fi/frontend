"use client";
import { Wallet } from "@/components/wallet/Wallet";
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { STAKE_QUERY_MESSAGES_NEW } from "@/lib/Message/stakeMessages";
import { STAKE_CONTRACT_ADDRESS } from "@/lib/address";
import React from "react";
import { useChain, useWalletClient } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/lib/utils';
import useTransaction from "@/hooks/useTransaction";


// This would typically come from an API
const mockData = {
    balance: 15,
    pointsEarned: 9432,
    tvl: 2917644.46,
    totalStNIBIIssued: 2784695.01,
    totalNIBIIssued: 132459.05,
    totalBurned: {
        amount: 1747790.02,
        usdValue: 22805.21,
    },
    stakingReward: 10,
}

export default function DashboardPage() {
    const progress = (mockData.totalStNIBIIssued / (mockData.totalStNIBIIssued + mockData.totalNIBIIssued)) * 100
    const { address } = useChain(CHAIN_NAME);
    const { sendTransaction, fetchQuery } = useTransaction();

    const getQueryDataFromContract = async () => {
        // if (address) {
        console.log("address", address)

        try {
            const result = await fetchQuery(
                STAKE_CONTRACT_ADDRESS,
                STAKE_QUERY_MESSAGES_NEW.state()
            );
            console.log("queryData", result);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getQueryDataFromContract();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <div className="hidden md:block">
                    <Wallet />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <StatsCard
                    title="Your balance"
                    value={`${mockData.balance} stNIBI`}
                />
                <StatsCard
                    title="Points earned"
                    value={mockData.pointsEarned.toLocaleString()}
                />
            </div>

            <Card className="bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                        TVL
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 text-2xl font-bold text-blue-600">
                        $ {mockData.tvl.toLocaleString()}
                    </div>
                    <Progress value={progress} className="mb-2 h-2 bg-gray-200" />
                    <div className="flex justify-between text-sm text-gray-600">
                        <div>Total stNIBI issued: {mockData.totalStNIBIIssued.toLocaleString()}</div>
                        <div>Total NIBI issued: {mockData.totalNIBIIssued.toLocaleString()}</div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <StatsCard
                    title="Unbonding period"
                    value="--"
                />
                <StatsCard
                    title="Total burned"
                    value={mockData.totalBurned.amount.toLocaleString()}
                    subValue={`/$${mockData.totalBurned.usdValue.toLocaleString()}`}
                />
                <StatsCard
                    title="Staking reward"
                    value={`${mockData.stakingReward} NIBI`}
                />
            </div>
        </div>
    )
}

