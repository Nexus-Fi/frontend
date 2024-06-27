"use client";
import React from "react";
import useTransaction from "@/hooks/useTransaction";
import { STAKE_CONTRACT_ADDRESS,REWARD_DISPATCHER_CONTRACT_ADDRESS } from "@/lib/address";
import { STAKE_QUERY_MESSAGES } from "@/lib/Query/stakeQuery";
import { REWARD_QUERY_MESSAGES } from "@/lib/Query/rewardDispatcher";

const Dashboard = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const { sendTransaction, fetchQuery } = useTransaction();
  const [HistroyqueryData, setHistoryQueryData] = React.useState()
  const [StakequeryData, setStakeQueryData] = React.useState()
  const [RestakequeryData, setRestakeQueryData] = React.useState()
  const [RewardequeryData, setRewardQueryData] = React.useState()
  const [UnbondRequestData, setUnbondReQuestQueryData] = React.useState()
  const [DelegationData, setDelegationDataQueryData] = React.useState()




  const getQueryDataFromContract = async () => {
    try {
      const Historyresult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.all_history(1, 10)
      );
      setHistoryQueryData(Historyresult)
      console.log("Historyresult", Historyresult);

      const Stakeresult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.staker("nibi1hzty850q3vnew33yuft82j0v5fazyvfcescxhs")
      );
      setStakeQueryData(Stakeresult)
      console.log("Stakeresult", Stakeresult);

      const Restakeresult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.restake("nibi1hzty850q3vnew33yuft82j0v5fazyvfcescxhs")
      );
      setRestakeQueryData(Stakeresult)
      console.log("Restakeresult", Restakeresult);
      // const Rewardresult = await fetchQuery(
      //   REWARD_DISPATCHER_CONTRACT_ADDRESS,
      //   REWARD_QUERY_MESSAGES.get_buffered_rewards
      // );
      // setRewardQueryData(Rewardresult)
      // console.log("Rewardresult", Rewardresult);
      const unbondRequestsResult = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.unbond_requests("nibi1hzty850q3vnew33yuft82j0v5fazyvfcescxhs")
      );
      setUnbondReQuestQueryData(unbondRequestsResult)
      console.log("unbondRequestsResult", unbondRequestsResult);


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

  React.useEffect(() => {
    getQueryDataFromContract();
  }, []);

  return (
    <div>
      <div className="pb-5 text-[30px] font-bold ">Dashboard</div>
      <div className="flex gap-5">
        <div className="card bg-base-100 shadow-xl w-[50%]">
          <div className="card-body">
            <h2 className="card-title">Restaked</h2>
            <div className="p-5">
              {isConnected ? (
                <div>Value : 0</div>
              ) : (
                <div>
                  <progress className="progress p-2 "></progress>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl w-[50%]">
          <div className="card-body">
            <h2 className="card-title">Delegated</h2>
            <div className="p-5">
              {isConnected ? (
                <div>Value : 0</div>
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
                <div>Value : 0</div>
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
                <div>Value : 0</div>
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
          <div className="card-body">
            <h2 className="card-title">
              Connect your wallet to view your restaked tokens
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
