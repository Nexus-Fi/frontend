"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ConnectWallet } from "@/components/connect-wallet"
import useTransaction from "@/hooks/useTransaction";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { STAKE_CONTRACT_ADDRESS, stNIBITOKEN_CONTRACT_ADDRESS } from "@/lib/address";
import { Button } from "@/components/ui/moving-border"
import { TOKEN_CONTRACT_MESSAGES } from "@/lib/Message/token";
import { Card } from "@/components/ui/card";
import { useChain, useWalletClient } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/lib/utils';
import { Cw20ReceiveMsg, STAKE_CONTRACT_MESSAGES } from "@/lib/Message/stakeMessages";
import { Wallet } from "@/components/wallet";
export default function Staking() {
  const [exchange, setExchange] = useState("1");
  const [amount, setAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  const [open, setOpen] = useState("stake"); // unstake, withdraw
  const [wallet, setWallet] = useState<string>("");
  const [unstakeStatus, setUnstakeStatus] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("1");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const { sendTransaction, fetchQuery } = useTransaction();
  const [queryData, setQueryData] = React.useState();
  const { address } = useChain(CHAIN_NAME);
  console.log("address", address)

  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };
  interface ReceiveWrapper {
    receive: Cw20ReceiveMsg;
  }
  const priceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    console.log("amount", amount);
  };

  const unstakeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUnstakeAmount(event.target.value);
    console.log("unstake amount", unstakeAmount);
  };

  const termsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const transfer = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(unstakeAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const toastId = toast.loading("Transferring...");
    console.log("transfering", stNIBITOKEN_CONTRACT_ADDRESS, "unstakeAmount", unstakeAmount)
    const tx = await sendTransaction(
      stNIBITOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.transfer(STAKE_CONTRACT_ADDRESS, multipliedAmount.toString()),
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Transferred Successfully");
        console.log("transfer tx", tx)
      })
      .catch((err) => {
        console.log("Transfer Failed");
      });


  }

  const getQueryDataFromContract = async () => {
    // if (address) {
    console.log("address", address)

    try {
      const result = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_CONTRACT_MESSAGES.withdraw_unbonded()
      );
      const amountAsNumber = parseFloat(result.withdrawable);
      const diviedAmount = amountAsNumber / Math.pow(10, 6);
      setWithdrawAmount(diviedAmount.toString());
      setQueryData(result)
      console.log("queryData", result);
    } catch (error) {
      console.log(error);
    }
    // }
  };

  React.useEffect(() => {
    getQueryDataFromContract();
  }, []);


  const stake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(amount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const tokenToStake = [
      {
        amount: multipliedAmount.toString(),
        denom: "unibi",
      },
    ];

    const toastId = toast.loading("Staking...");
    console.log("staking", tokenToStake, "amount", amount, "exchange", exchange)
    try {
      const tx = await sendTransaction(
        STAKE_CONTRACT_ADDRESS,
        STAKE_CONTRACT_MESSAGES.bond_forstnibi(),
        tokenToStake
      );

      toast.success(`Staked ${amount} NIBI successfully`, {
        position: "top-center"
      });

      toast(
        <div>
          Link - {`https://explorer.nibiru.fi/nibiru-testnet-1/tx/${tx}`}
          {"top-center"}
          <button> Retry</button>
        </div >
      )


      // toast.dismiss(toastId);
      // toast.success(`Staked ${amount} NIBI successfully`);

    } catch (err) {
      // If the transaction fails
      console.log("Staking Failed", err);

      toast.error("Staking Failed !", {
        position: "top-right"
      });

      toast(
        <div>
          {/* @ts-ignore */}
          {error?.reason}
          {/* by default will show on top-right */}
        </div>
      )
    }
  };

  const unstake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await transfer(event);
    const toastId = toast.loading("unstaking...");
    const amountAsNumber = parseFloat(unstakeAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    console.log("unstaking unstakeAmount", unstakeAmount, "stakeAmount", amount)
    // const tx = await sendTransaction(
    //   stNIBITOKEN_CONTRACT_ADDRESS,
    //   TOKEN_CONTRACT_MESSAGES.send_from("", STAKE_CONTRACT_ADDRESS, multipliedAmount.toString(), "")
    // )
    //   .then((res) => {
    //     toast.dismiss(toastId);
    //     toast.success(`Unstaked ${unstakeAmount} NIBI successfully`);
    //     console.log("unstake sendFrom tx", tx)

    //   })
    //   .catch((err) => {
    //     console.log("Unstaking Failed", err);
    //     toast.dismiss(toastId);
    //   });
    // console.log("Address", address)

    
      const cw20Recivemsg:Cw20ReceiveMsg = {
        sender:address!,
        amount: multipliedAmount.toString(),
        msg:"eyJ1bmJvbmQiOnt9fQ=="
      }

    const payload: ReceiveWrapper = {
      receive: cw20Recivemsg
    };

    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.receive(cw20Recivemsg),

    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success(`Unstaked ${unstakeAmount} NIBI successfully`);
        console.log("unstake sendFrom tx", tx)

      })
      .catch((err) => {
        console.log("Unstaking Failed", err);
        toast.dismiss(toastId);
      });


  };

  const withdraw = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const toastId = toast.loading("withdrawing...");
    // const amountAsNumber = parseFloat(withdrawAmount);
    // const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    console.log("withdraw", withdrawAmount, "termsAccepted", termsAccepted)
    if (termsAccepted) {
      // call contract withdraw function here
      const tx = await sendTransaction(
        STAKE_CONTRACT_ADDRESS,
        STAKE_CONTRACT_MESSAGES.withdraw_unbonded,
      )
        .then((res) => {
          toast.dismiss(toastId);
          toast.success(`Withdraw ${withdrawAmount} NIBI successfully`);
        })
        .catch((err) => {
          "Withdrawing Failed";
          console.log("withdraw error", err)
        });
      console.log("withdraw tx", tx)

    } else {
      toast.error('Please tick the box to withdraw funds');
    }

  };

  return (
    <div>
      <div className=" flex items-center w-full justify-between p-10">
        <div className="ml-auto">
          <Wallet />
        </div>

      </div>
      <div className="max-w-xl mx-auto pb-10 space-y-6">
        <div className="relative w-full h-[600px]">
          <Card className="bg-white border-gray-900 h-[600px] p-8 rounded-none ">
            <Card className="bg-white rounded-none  border-gray-800 p-6 absolute top-[-2%] left-[-2%] right-[2%] bottom-[2%]">
              <div className=" p-4 justify-between items-center">
                <div className="flex flex-wrap">
                  <div
                    className={`w-1/3 py-4 px-1 md:px-4 text- md:text-base lg:px-12 hover:underline-offset-8
                                  rounded text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer ${open === "stake"
                        ? "bg-blue-100 drop-shadow-xl text-black font-semibold"
                        : " "
                      }`}
                  >
                    <button onClick={() => handleTabOpen("stake")}>Stake</button>
                  </div>

                  <div
                    className={`w-1/3 py-4 px-1 md:px-4 text- md:text-base lg:px-12 hover:underline-offset-8
                                  rounded text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer ${open === "unstake"
                        ? "bg-blue-200 drop-shadow-xl text-black font-semibold"
                        : " "
                      }`}
                  >
                    <button onClick={() => handleTabOpen("unstake")}>
                      Unstake
                    </button>
                  </div>

                  <div
                    className={`w-1/3 py-4 px-1 md:px-4 text- md:text-base lg:px-12 hover:underline-offset-8
                                  rounded text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer ${open === "withdraw"
                        ? "bg-blue-200 drop-shadow-xl text-black font-semibold"
                        : " "
                      }`}
                  >
                    <button onClick={() => handleTabOpen("withdraw")}>
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="divider divider-neutral mt-0"></div> */}

              {/* stake option */}
              {open === "stake" && (
                <div>
                  <form onSubmit={stake} className="w-full max-w-lg">
                    <div className="my-4">
                      <label className="form-control w-full">
                        <div className="label">
                          <div>Select the Asset</div>
                        </div>
                        <select className="select select-bordered">
                          <option>NIBI</option>
                        </select>
                      </label>
                    </div>

                    <div className="my-6">
                      <label className="form-control w-full">
                        <div className="label">
                          <div className="my-2">Enter Amount</div>
                        </div>
                        <input
                          type="text"
                          id="stake-value"
                          defaultValue={amount}
                          onChange={priceHandler}
                          className="input input-lg input-bordered"
                          placeholder="0"
                          required
                        />
                      </label>
                    </div>

                    <div className="text-sm pb-5">
                      {/* <div className="my-1 border-t border-gray-300"></div> */}
                      <div className="my-2">
                        <div className="flex items-center justify-between">
                          <div className="">You wil get</div>
                          <div>{amount} stNIBI</div>
                        </div>
                      </div>

                      <div className="my-2">
                        <div className="flex items-center justify-between">
                          <div className="">Exchange Rate</div>
                          <div>1 stNIBI = {exchange} NIBI</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-blue-600 pt-10 dark:bg-blue-900 text-white text-lg font-bold py-4 px-4  dark:text-black border-blue-700 "
                    >
                      Stake
                    </Button>
                  </form>
                </div>
              )}

              {/* unstake option */}
              {open === "unstake" && (
                <div>
                  <form onSubmit={unstake} className="w-full max-w-lg">
                    <div className="my-4">
                      <label className="form-control w-full">
                        <div className="label">
                          <div>Withdraw stNIBI as</div>
                        </div>
                        <select className="select select-bordered">
                          <option>NIBI</option>
                          <option>ATOM</option>
                        </select>
                      </label>
                    </div>

                    <div className="my-6">
                      <label className="form-control w-full">
                        <div className="label">
                          <div className="my-2">Enter amount of stNIBI</div>
                        </div>
                        <input
                          type="text"
                          id="unstake-value"
                          defaultValue={unstakeAmount}
                          onChange={unstakeHandler}
                          className="input input-lg input-bordered"
                          placeholder="0"
                          required
                        />
                      </label>
                    </div>

                    <div className="text-sm">
                      {/* <div className="my-1 border-t border-gray-300"></div> */}
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="">You wil get</div>
                          <div>{amount} NIBI</div>
                        </div>
                      </div>

                      <div className="my-2 pb-10">
                        <div className="flex items-center justify-between">
                          <div className="">Exchange Rate</div>
                          <div>1 stNIBI = {exchange} NIBI</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-blue-600 dark:bg-blue-900 text-white text-lg font-bold py-4 px-4  dark:text-black border-blue-700 "
                    >
                      Unstake
                    </Button>
                  </form>
                  {/* <div role="alert" className="mt-3 alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Unstake requests are processed in 7-10 days, subject to exit
                  queue on Network
                </span>
              </div> */}
                </div>
              )}

              {/* withdraw option */}
              {open === "withdraw" && (
                <div>
                  <div role="alert" className="mt-3 alert alert-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>
                      Unstake requests are processed in 7-10 days, subject to exit
                      queue on Network
                    </span>
                  </div>

                  {!unstakeStatus ? (
                    <div>
                      <div className="flex flex-col align-middle justify-center my-8 py-8 p-5 bg-white rounded-3xl ">
                        <div className="py-5 text-center text-3xl font-semibold">
                          No unstake requests found
                        </div>
                        <div className="py-5 text-center ">
                          You will be able to claim your tokens after the Unstake
                          request has been processed. To Unstake your tokens go to
                          Unstake tab
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <form onSubmit={withdraw} className="w-full max-w-lg">
                        <div className="my-4">
                          <label className="form-control w-full">
                            <div className="label">
                              <div className="font-bold text-2xl pt-5">
                                Withdraw amount available
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className="my-6">
                          <label className="form-control w-full">
                            <div className="input input-lg input-bordered">
                              <div className="flex align-middle justify-between text-center pt-2 ">
                                {withdrawAmount} NIBI
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className="flex items-center mb-6">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={termsHandler}
                            className="mr-2"
                          />
                          <label
                            htmlFor="terms"
                            className="text-lg font-semibold text-black dark:text-white"
                          >
                            I want to withdraw all available amount
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="bg-blue-600 pt-10 dark:bg-blue-900 text-white text-lg font-bold py-4 px-4  dark:text-black border-blue-700 "
                        >
                          Withdraw
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>

  );
}
