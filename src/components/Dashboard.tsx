"use client";
import React, { useEffect } from "react";
import useTransaction from "@/hooks/useTransaction";
import { STAKE_CONTRACT_ADDRESS, REWARD_DISPATCHER_CONTRACT_ADDRESS } from "@/lib/address";
import { STAKE_QUERY_MESSAGES } from "@/lib/Query/stakeQuery";
import { REWARD_QUERY_MESSAGES } from "@/lib/Query/rewardDispatcher";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME, getChainLogo } from "@/lib/utils";
import { stat } from "fs";

const Dashboard = () => {
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
    setRestakedPoints(restakedPoint.toString());
  }

  const getQueryDataFromContract = async () => {
    if (address === undefined) return;
    try {
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

      // const Stakeresult = await fetchQuery(
      //   STAKE_CONTRACT_ADDRESS,
      //   STAKE_QUERY_MESSAGES.staker(address)
      // );
      // setStakeQueryData(Stakeresult)
      // const StNIBI = Stakeresult?.amount_staked_stnibi?.toString();
      // const NIBI = Stakeresult?.amount_staked_unibi?.toString();
      // console.log("NIBI: ", NIBI, "StNIBI: ", StNIBI)
      // setDelegated(convertToNibi(NIBI));
      // console.log("Stakeresult", Stakeresult);

      // const Restakeresult = await fetchQuery(
      //   STAKE_CONTRACT_ADDRESS,
      //   STAKE_QUERY_MESSAGES.restake(address)
      // );
      // setRestakeQueryData(Stakeresult)
      // const stNIBI = Restakeresult?.stnibi_amount?.toString();
      // console.log("stNIBI: ", stNIBI)
      // setRestaked(convertToNibi(StNIBI));
      // console.log("Restakeresult", Restakeresult);
      // const Rewardresult = await fetchQuery(
      //   REWARD_DISPATCHER_CONTRACT_ADDRESS,
      //   REWARD_QUERY_MESSAGES.get_buffered_rewards
      // );
      // setRewardQueryData(Rewardresult)
      // console.log("Rewardresult", Rewardresult);
      // const unbondRequestsResult = await fetchQuery(
      //   STAKE_CONTRACT_ADDRESS,
      //   STAKE_QUERY_MESSAGES.unbond_requests(address)
      // );
      // setUnbondReQuestQueryData(unbondRequestsResult)
      // console.log("unbondRequestsResult", unbondRequestsResult);


      const DlegationDataResult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.delegation_data(STAKE_CONTRACT_ADDRESS)
      );
      setRestakeQueryData(DlegationDataResult)
      console.log("DlegationDataResult", DlegationDataResult);

      calculateRestakedPoints();

    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    setIsConnected(status === "Connected");
    getQueryDataFromContract();
  }, [status, address]);

  return (
    <div>
      <div className="pb-5 text-[30px] font-bold ">Dashboard</div>
      <div className="flex gap-5">
        <div className="card bg-[] shadow-xl w-[50%]">
          <div className="card-body">
            <h2 className="card-title"> Staked NIBI  </h2>
            <div className="p-5">
              {isConnected ? (
                <div className="font-bold text-2xl "> {restaked} stNIBI</div>
              ) : (
                <div>
                  <progress className="progress p-2 "></progress>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card bg-[] shadow-xl w-[50%]">
          <div className="card-body">
            <h2 className="card-title">Restaked NIBI</h2>
            <div className="p-5">
              {isConnected ? (
                <div className="font-bold text-2xl "> {delegated} rstNIBI</div>
              ) : (
                <div>
                  <progress className="progress p-2 "></progress>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className=" w-[50%]">
          <div className="m-5 p-5 rounded-lg">
            <div className="p-0">
              {isConnected ? (
                <div className="font-bold text-2xl "> {restakedPoints} Points</div>
              ) : (
                <div>
                  <progress
                    className="progress p-2 "
                    value={0}
                    max="100"
                  ></progress>
                </div>
              )}
            </div>
            <h2 className="">Restaked Points</h2>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="m-5 p-5 rounded-lg">
            <div className="p-0">
              {isConnected ? (
                <div className="font-bold text-2xl "> {restakedRatio} %</div>
              ) : (
                <div>
                  <progress
                    className="progress p-2 "
                    value={0}
                    max="100"
                  ></progress>
                </div>
              )}
            </div>
            <h2 className="">Restaked Ratio</h2>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold"> Your Stake</div>
        <div className="card w-full my-5 p-5 items-center bg-base-200 shadow-xl">
          {!isConnected ? (
            <div className="card-body">

              <h2 className="card-title">
                Connect your wallet to view your restaked tokens
              </h2>
            </div>
          )
            : (
              <div className="w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Validator
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Stake
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Voting Power
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Commission
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                          Action
                        </th> */}
                        {/* <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Delegate</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          nibiru-0
                        </th>
                        <td className="px-6 py-4">
                          0.00
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" ">98,481,678,444 NIBI</div>
                            <div className="text-sm text-gray-500">25.68%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          5%
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                        </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          nibiru-1
                        </th>
                        <td className="px-6 py-4">
                          0.00
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" ">95,000,259,372 NIBI</div>
                            <div className="text-sm text-gray-500">24.77%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          10%
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                        </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          nibiru-2
                        </th>
                        <td className="px-6 py-4">
                          0.00
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" ">95,000,135,539 NIBI
                            </div>
                            <div className="text-sm text-gray-500">24.77%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          10%
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                        </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          nibiru-3
                        </th>
                        <td className="px-6 py-4">
                          0.00
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" ">95,000,087,717 NIBI
                            </div>
                            <div className="text-sm text-gray-500">24.77%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          10%
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            )
          }
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
