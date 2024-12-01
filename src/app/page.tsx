"use client";
import Image from "next/image";
// import Dashboard from "@/components/Dashboard";
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Wallet } from "@/components/wallet";
import { GoDotFill } from "react-icons/go";

const mockData = {
  nibiBalance: 15,
  stNibiBalance: 50,
  pointsEarned: 9432,
  tvl: 2917644.46,
  totalStNIBIIssued: 84695.01,
  totalNIBIIssued: 132459.05,
  totalBurned: {
    amount: 1747790.02,
    usdValue: 22805.21,
  },
  stakingReward: 10,
}

const progress = (mockData.totalStNIBIIssued / (mockData.totalStNIBIIssued + mockData.totalNIBIIssued)) * 100

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-20 py-12">

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="hidden md:block">
            <Wallet />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white w-full shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Your balance
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center">
              <div className="flex justify-center items-center w-full">
                {/* <div className=" w-full text-xl font-semibold text-black text-center">
                </div> */}
                <div className="w-1/3 text-2xl font-semibold text-black text-center">{mockData.nibiBalance} Nibi</div>
                <div className="border-l border-gray-600 h-[10vh] w-1 pb-5"></div>
                <div className="w-1/3 text-2xl font-semibold text-center text-black">{mockData.stNibiBalance} stNibi</div>
              </div>
            </div>

          </Card>
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
            <div className="mb-4 text-2xl font-semibold text-blue-600">
              $ {mockData.tvl.toLocaleString()}
            </div>
            <Progress value={progress} className="mb-2 h-2 bg-blue-100" />
            <div className="flex flex-col items-end text-sm text-gray-600">
              <div className="flex items-center">
                <GoDotFill className="text-blue-600 text-xl" />
                <div className="ml-1">Total stNIBI issued: {mockData.totalStNIBIIssued.toLocaleString()}</div>
              </div>
              <div className="flex items-center">
                <GoDotFill className="text-blue-200 text-xl" />
                <div className="ml-1">Total NIBI issued: {mockData.totalNIBIIssued.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6 grid gap-6 md:grid-cols-3">
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

    </main >
  );
}
