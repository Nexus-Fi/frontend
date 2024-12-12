"use client";
import Image from "next/image";
import React, {useState, useEffect} from "react";
// import Dashboard from "@/components/Dashboard";
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Wallet } from "@/components/wallet";
import { GoDotFill } from "react-icons/go";

import useTransaction from "@/hooks/useTransaction";
import { STAKE_CONTRACT_ADDRESS, REWARD_DISPATCHER_CONTRACT_ADDRESS } from "@/lib/address";
import { STAKE_QUERY_MESSAGES } from "@/lib/Query/stakeQuery";
import { REWARD_QUERY_MESSAGES } from "@/lib/Query/rewardDispatcher";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME, getChainLogo } from "@/lib/utils";
// import { StateQuery } from "@/lib/Message/stakeMessages";
import { STAKE_QUERY_MESSAGES_NEW} from "@/lib/Message/stakeMessages";
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
  const { sendTransaction, fetchQuery } = useTransaction();
  const { status, address } = useChain(CHAIN_NAME);
  console.log("status", status, "address", address)

  // create states for restaked, delegated, restaked points, restaked ratio
  const [restaked, setRestaked] = React.useState("0");
  const [delegated, setDelegated] = React.useState("0");
  const [restakedPoints, setRestakedPoints] = React.useState("0");
  const [restakedRatio, setRestakedRatio] = React.useState("0.000000001");

  const [isConnected, setIsConnected] = React.useState(status === "Connected");

  const [HistroyqueryData, setHistoryQueryData] = React.useState()
  const [StakequeryData, setStakeQueryData] = React.useState()
  const [RestakequeryData, setRestakeQueryData] = React.useState()
  const [RewardequeryData, setRewardQueryData] = React.useState()
  const [UnbondRequestData, setUnbondReQuestQueryData] = React.useState()
  const [DelegationData, setDelegationDataQueryData] = React.useState()


  const convertToNibi = (value: string): string => {
    const valueAsNumber = parseFloat(value);
    const dividedValue = valueAsNumber / Math.pow(10, 6);
    return dividedValue.toString();
  }

  const calculateRestakedPoints = () => {
    const restakedPoint = (parseFloat(restaked) + parseFloat(delegated)) * 2;
    return restakedPoint.toString();
  }

  const getQueryDataFromContract = async () => {
    if (address === undefined) return;
    try {
       const queryState = async (contractAddress: string) => {
         const query = STAKE_QUERY_MESSAGES_NEW.state()
        return fetchQuery(contractAddress, query);
      };

      console.log("state",queryState)
      

      const result2 = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.staker(address)
      );
      console.log("result2", result2);
      setDelegated(convertToNibi(result2?.amount_restaked_rstnibi));
      setRestaked(convertToNibi(result2?.amount_staked_stnibi));
      calculateRestakedPoints();

      const Historyresult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.all_history(1, 10)
      );
      setHistoryQueryData(Historyresult)
      console.log("Historyresult", Historyresult);
      const DlegationDataResult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.delegation_data(STAKE_CONTRACT_ADDRESS)
      );
      setRestakeQueryData(DlegationDataResult)
      console.log("DlegationDataResult", DlegationDataResult);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsConnected(status === "Connected");
    getQueryDataFromContract();
    const points = calculateRestakedPoints();
    setRestakedPoints(points);
  }, [status, address, delegated, restaked]);

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
                <div className="w-1/3 text-2xl font-semibold text-black text-center">{restaked} stNIBI</div>
                <div className="border-l border-gray-600 h-[10vh] w-1 mb-3"></div>
                <div className="w-1/3 text-2xl font-semibold text-center text-black">{delegated} rstNIBI</div>
              </div>
            </div>

          </Card>
          <StatsCard
            title="Points earned"
            value= {restakedPoints}
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
