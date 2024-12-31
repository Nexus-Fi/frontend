"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StatsCard } from "@/components/ui/stats-card"
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
import { STAKE_QUERY_MESSAGES_NEW } from "@/lib/Message/stakeMessages";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface StakeQueryData {
  total_bond_stnibi_amount?: string;
}

interface RewardQueryData {
  amount?: string;
}

export default function Home() {
  const { sendTransaction, fetchQuery } = useTransaction();
  const { status, address } = useChain(CHAIN_NAME);

  const [restaked, setRestaked] = React.useState("0");
  const [delegated, setDelegated] = React.useState("0");
  const [restakedPoints, setRestakedPoints] = React.useState("0");
  const [restakedRatio, setRestakedRatio] = React.useState("0.000000001");
  const [totalStaked, setTotalStaked] = React.useState("0");
  const [totalBurned, setTotalBurned] = React.useState("0");
  const [totalStnibIssued, setTotalStNibiIssued] = React.useState("0");
  const [totalStnibBurned, setTotalStNibiBurned] = React.useState("0");
  const [Tvl, setTvl] = React.useState("0");

  const [isConnected, setIsConnected] = React.useState(status === "Connected");
  const [HistroyqueryData, setHistoryQueryData] = React.useState()
  const [RestakequeryData, setRestakeQueryData] = React.useState()
  const [RewardQueryData, setRewardQueryData] = React.useState<RewardQueryData | undefined>(undefined);
  const [UnbondRequestData, setUnbondReQuestQueryData] = React.useState()
  const [DelegationData, setDelegationDataQueryData] = React.useState()
  const [StakequeryData, setStakeQueryData] = React.useState<StakeQueryData | undefined>(undefined);

  const [totalStNIBIIssued, setTotalStNIBIIssued] = React.useState(0);
  const [totalNIBIIssued, setTotalNIBIIssued] = React.useState(0);

  const progress = (totalStNIBIIssued / (totalStNIBIIssued + totalNIBIIssued)) * 100;

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
      const get_balance_history = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.balance_history(address, null, null)
      );
      console.log("get_balance_history", get_balance_history);

      console.log("restaked", get_balance_history?.updates[0]?.resulting_stnibi_balance, "delegated", get_balance_history?.updates[0]?.resulting_nibi_balance)
      setRestaked(convertToNibi(get_balance_history?.updates[0]?.resulting_stnibi_balance))
      setDelegated(convertToNibi(get_balance_history?.updates[0]?.resulting_nibi_balance))
      setTotalStaked(convertToNibi(get_balance_history?.total_bonded))
      setTotalBurned(convertToNibi(get_balance_history?.total_unbonded))


      // const get_balance_history = await fetchQuery(
      //   STAKE_CONTRACT_ADDRESS,
      //   STAKE_QUERY_MESSAGES_NEW.balance_history(address, null, null)
      // );
      // console.log("get_balance_history", get_balance_history);

      // const get_balance_updates = await fetchQuery(
      //   STAKE_CONTRACT_ADDRESS,
      //   STAKE_QUERY_MESSAGES_NEW.balance_updates(address, null, null)
      // );
      // console.log("get_balance_updates", get_balance_updates);

      const get_tvl = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.total_supply()
      );

      console.log("TVL",get_tvl);
      setTvl(get_tvl);
      const get_state = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.state()
      );
      console.log("state",get_state)

      setTotalStNibiIssued(convertToNibi(get_state?.total_stnibi_issued));
      setTotalStNibiBurned(convertToNibi(get_state?.total_stnibi_burned));




      const get_buffered_rewards = await fetchQuery(
        REWARD_DISPATCHER_CONTRACT_ADDRESS,
        REWARD_QUERY_MESSAGES.get_buffered_rewards(REWARD_DISPATCHER_CONTRACT_ADDRESS)
      );

      console.log("get_buffered_rewards", get_buffered_rewards)

      const get_user_rewards = await fetchQuery(
        REWARD_DISPATCHER_CONTRACT_ADDRESS,
        REWARD_QUERY_MESSAGES.get_user_rewards(address, STAKE_CONTRACT_ADDRESS, REWARD_DISPATCHER_CONTRACT_ADDRESS)
      );

      console.log("get_user_rewards", get_user_rewards)

      const resultNew = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.state()
      );

      // console.log("queryData new", resultNew);
      setStakeQueryData(resultNew);
      console.log("resultNew state", resultNew)
      // // get_unbonding_info, hub_balance, staker - fetchQuery
      const resultUnbondingInfo = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.get_unbonding_info(address)
      );
      console.log("resultUnbondingInfo", resultUnbondingInfo);

      const resultHubBalance = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.hub_balance(STAKE_CONTRACT_ADDRESS)
      );
      console.log("resultHubBalance", resultHubBalance);

      setTotalStNIBIIssued(parseFloat(resultHubBalance.total_stnibi_issued || "0"));
      setTotalNIBIIssued(parseFloat(resultHubBalance.total_nibi_issued || "0"));

      // console.log("address", address)
      const resultStaker = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.staker(address)
      );
      console.log("resultStaker", resultStaker);

      const resultStaker2 = await fetchQuery(
        REWARD_DISPATCHER_CONTRACT_ADDRESS,
        REWARD_QUERY_MESSAGES.get_user_rewards(address, STAKE_CONTRACT_ADDRESS, REWARD_DISPATCHER_CONTRACT_ADDRESS)
      );
      console.log("resultStaker2", resultStaker2);
      setRewardQueryData(resultStaker2);

      const queryState = async (contractAddress: string) => {
        const query = STAKE_QUERY_MESSAGES_NEW.state()
        return fetchQuery(contractAddress, query);
      };

      console.log("state", queryState)

      const result2 = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.staker(address)
      );
      console.log("result2", result2);

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

      /// getting balances 

      /// getting updates
      const get_balance_updates = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES_NEW.balance_updates(address, null, null)
      );
      console.log("balances 2", get_balance_updates);

      // it gives you below responce 
      /**
       * 
       * 
       * {
  "data": {
    "updates": [
      {
        "action": {
          "Bond": {
            "nibi_amount": "1000000",
            "stnibi_minted": "1000000",
            "validator": null
          }
        },
        "timestamp": 1734200964,
        "exchange_rate": "1",
        "resulting_nibi_balance": "1000000",
        "resulting_stnibi_balance": "1000000",
        "block_height": 10627161
      }
    ],
    "total_bonded": "1000000",
    "total_unbonded": "0",
    "current_stnibi": "1000000"
  }
}

       */





      /// it gives you same responce 

      /**
       * 
       * {
  "data": {
    "updates": [
      {
        "action": {  /// actions like bond | unbond -> so we can keep track of users balances depending on their actions
          "Unbond": {
            "stnibi_burned": "1000000",
            "nibi_unbonded": "1000000",
            "batch_id": 1
          }
        },
        "timestamp": 1734203830,
        "exchange_rate": "1",
        "resulting_nibi_balance": "1000000",
        "resulting_stnibi_balance": "0",
        "block_height": 10627699
      },
      {
        "action": {
          "Bond": {
            "nibi_amount": "1000000",
            "stnibi_minted": "1000000",
            "validator": null
          }
        },
        "timestamp": 1734200964,
        "exchange_rate": "1",
        "resulting_nibi_balance": "1000000",
        "resulting_stnibi_balance": "1000000",
        "block_height": 10627161
      }
    ],
    "total_bonded": "1000000",
    "total_unbonded": "1000000",
    "current_stnibi": "1000000"
  }
}
       */
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsConnected(status === "Connected");
    getQueryDataFromContract();
    const points = calculateRestakedPoints();
    setRestakedPoints(points);
  }, [status, address]);

  const getSafeRewardAmount = (): number => {
    const parsedAmount = parseFloat(RewardQueryData?.amount || "0");
    return isNaN(parsedAmount) ? 0 : parsedAmount;
  }

  return (
    <main className="flex flex-col justify-between px-5 md:px-20 py-6 md:py-12">
      <div className="space-y-4 md:space-y-6">
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
            <div className="flex justify-center pb-5">
              {isConnected ? (
                <div className="flex md:flex-row justify-center items-center w-full space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-semibold text-black">{(restaked || "0").toLocaleString()} lstNIBI</div>
                    <div className="text-sm text-gray-500">LST Tokens</div>
                  </div>

                  <div className="block border-l border-gray-600 h-10"></div>

                  <div className="flex-1 text-center">
                    <div className="text-2xl font-semibold text-black">{(delegated || "0").toLocaleString()} NIBI</div>
                    <div className="text-sm text-gray-500">Staked NIBI</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          </Card>

          <StatsCard
            title="Points earned"
            value={restakedPoints}
            isLoading={!isConnected}
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
              {Tvl?.total_bond_stnibi_amount ? `${Tvl.total_bond_stnibi_amount} nibi` : 'Loading...'}
            </div>
            <Progress value={progress} className="mb-2 h-2 bg-blue-100" />
            <div className="flex flex-col items-end text-sm text-gray-600">
              <div className="flex items-center">
                <GoDotFill className="text-blue-600 text-xl" />
                <div className="ml-1">Total stNIBI issued: {totalStnibIssued.toLocaleString()}</div>
              </div>
              <div className="flex items-center">
                <GoDotFill className="text-blue-200 text-xl" />
                <div className="ml-1">Total NIBI staked: {totalStaked.toLocaleString()}</div>
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
          value={totalStnibBurned.toLocaleString()}
          subValue={`/$${totalStnibBurned.toLocaleString()}`}
        />
        <StatsCard
          title="Staking reward"
          value={`${getSafeRewardAmount().toLocaleString()} NIBI`}
          isLoading={!isConnected}
        />
      </div>
    </main >
  );
}
