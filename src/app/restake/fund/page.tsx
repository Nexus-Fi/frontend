"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import { CiDollar } from "react-icons/ci";
import useTransaction from "@/hooks/useTransaction";
import { CONTRACT_MESSAGES } from "@/lib/messages";
import { STAKE_CONTRACT_MESSAGES } from "@/lib/Message/stakeMessages";
import toast from "react-hot-toast";
import { STAKE_CONTRACT_ADDRESS, rstNIBI_TOKEN_CONTRACT_ADDRESS, stNIBITOKEN_CONTRACT_ADDRESS } from "@/lib/address";
import { Button } from "@/components/ui/moving-border";
import { TOKEN_CONTRACT_MESSAGES } from "@/lib/Message/token";
import { STAKE_QUERY_MESSAGES } from "@/lib/Query/stakeQuery";
const contract_address =
  "nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y";
import { useChain, useWalletClient } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/lib/utils';

export default function Staking() {
  const { address } = useChain(CHAIN_NAME);
  const { sendTransaction, fetchQuery } = useTransaction();
  const router = useRouter();
  const searchParams = useSearchParams()
  const state = searchParams.get('state')
  const [queryData, setQueryData] = React.useState()
  const [exchange, setExchange] = useState("1");
  const [amount, setAmount] = useState<string>("0");
  const [open, setOpen] = useState(state); // withdraw
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [withdrawStatus, setWithdrawStatus] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const getQueryDataFromContract = async () => {
    // if (address) {
    console.log("address", address)

    try {
      const result = await fetchQuery(
        STAKE_CONTRACT_ADDRESS,
        STAKE_QUERY_MESSAGES.restake("nibi1hzty850q3vnew33yuft82j0v5fazyvfcescxhs")
      );
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

  console.log("queryresult", queryData)

  if (queryData) {
    setAmount(queryData)
    console.log("if is called")
  }



  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

  const priceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    console.log("amount", amount);
  };

  const termsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const transfer = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(withdrawAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const toastId = toast.loading("Transferring...");
    console.log("transfering", stNIBITOKEN_CONTRACT_ADDRESS, "withdrawAmount", withdrawAmount)
    const tx = await sendTransaction(
      stNIBITOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.transfer(STAKE_CONTRACT_ADDRESS, multipliedAmount.toString()),
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Transferred Successfuly");
        console.log("transfer tx", tx)
      })
      .catch((err) => {
        console.log("Transfer Failed");
      });
  }

  const transferRestake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(withdrawAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const toastId = toast.loading("Transferring...");
    console.log("transfering", stNIBITOKEN_CONTRACT_ADDRESS, "withdrawAmount", withdrawAmount)
    const tx = await sendTransaction(
      rstNIBI_TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.transfer(STAKE_CONTRACT_ADDRESS, multipliedAmount.toString()),
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Transferred Successfuly");
        console.log("transfer tx", tx)
      })
      .catch((err) => {
        console.log("Transfer Failed");
      });
  }

  

  const restake_deposit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    transfer(event);
    const toastId = toast.loading("restaking...");
    console.log("unstake", amount, "exchange", exchange)
    const tx = await sendTransaction(
      stNIBITOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.increase_allowance("", amount, ""),
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success(`ReStaked ${amount} NIBI successfully`);
      })
      .catch((err) => {
        "ReStaking Failed";
        toast.dismiss(toastId);
      });
  };

  const burnrestake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.burnrestakenibi()
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


  const withdraw_restaked = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const toastId = toast.loading("restaking...");
    console.log("unstake", amount, "exchange", exchange)
    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.withdraw_liquidity(),
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success(`Withdraw ${amount} NIBI successfully`);
      })
      .catch((err) => {
        "UnStaking Failed";
        toast.dismiss(toastId);
      });
  };


  return (
    <main className="flex flex-row justify-center align-middle py-5 ">
      <div className="card my-5 bg-base-200 shadow-xl w-[600px] px-10 py-5">
        <div className=" p-4 justify-between items-center">
          <div className="flex flex-row w-full items-center gap-4">
            <div
              className={`w-1/2 py-4 px-1 md:px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
                              rounded-2xl text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer 
                              ${open === "deposit"
                  ? "bg-base-200 drop-shadow-2xl text-black font-semibold"
                  : " "
                }`}
            >
              <button onClick={() => handleTabOpen("deposit")}>Deposit</button>
            </div>

            <div
              className={`w-1/2 py-4 px-4 text-sm md:text-base lg:px-12 hover:underline-offset-8
                              text-center rounded-2xl transition-all delay-75 text-black  cursor-pointer ${open === "withdraw"
                  ? "bg-base-200 drop-shadow-2xl text-black font-semibold "
                  : " "
                }`}
            >
              <button onClick={() => handleTabOpen("withdraw")}>
                Withdraw
              </button>
            </div>
          </div>
          <div className="divider divider-neutral mt-0"></div>

          {/* stake option */}
          {open === "deposit" && (
            <div>
              <form onSubmit={restake_deposit} className="w-full max-w-lg">
                <div className="my-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <div>Select the Asset</div>
                    </div>
                    <select className="select select-bordered">
                      <option>stNIBI</option>
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
                <div className='text-sm'>
                  <div className="">
                    <div className="flex items-center justify-between">
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="flex items-center justify-between">
                      <div className="">Exchange Rate</div>
                      <div>1 stNIBI = {exchange} rstNIBI</div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-black dark:bg-slate-900 text-white text-lg font-bold py-4 px-4  dark:text-black border-blue-700 "
                >
                  Stake
                </Button>
              </form>
            </div >
          )
          }

          {/* withdraw option */}
          {
            open === "withdraw" && (
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
                    Withdraw requests are processed in 7-10 days, subject to exit
                    queue on Nexus Finance.
                  </span>
                </div>

                {!withdrawStatus ? (
                  <div>
                    <div className="flex flex-col align-middle justify-center my-8 py-8 p-5 bg-white rounded-3xl ">
                      <div className="py-5 text-center text-3xl font-semibold">
                        No withdraw requests found
                      </div>
                      <div className="py-5 text-center ">
                        You will be able to claim your tokens after the Withdraw
                        request has been processed. To Withdraw your tokens go to
                        Withdraw tab
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={withdraw_restaked} className="w-full max-w-lg">
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
                              {withdrawAmount} stNIBI
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
                        className="bg-black dark:bg-slate-900 text-white text-lg font-bold py-4 px-4  dark:text-black border-blue-700 "
                      >
                        Withdraw
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            )
          }
        </div >
      </div >
    </main >
  );
}
function fetchQuery(STAKE_CONTRACT_ADDRESS: string, arg1: any) {
  throw new Error("Function not implemented.");
}

