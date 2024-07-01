"use client";
import React, { useState, ChangeEvent } from "react";
import useTransaction from "@/hooks/useTransaction";
import { STAKE_CONTRACT_MESSAGES } from "@/lib/Message/stakeMessages";
import toast from "react-hot-toast";
import {
  STAKE_CONTRACT_ADDRESS,
  rstNIBI_TOKEN_CONTRACT_ADDRESS,
  stNIBITOKEN_CONTRACT_ADDRESS,
} from "@/lib/address";
import { Button } from "@/components/ui/moving-border";
import { TOKEN_CONTRACT_MESSAGES } from "@/lib/Message/token";
import { STAKE_QUERY_MESSAGES } from "@/lib/Query/stakeQuery";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME, getChainLogo } from "@/lib/utils";

export default function Staking() {
  const { sendTransaction, fetchQuery } = useTransaction();
  const { status, address } = useChain(CHAIN_NAME);
  const [state, setState] = useState<string>("deposit");
  const [queryData, setQueryData] = React.useState()
  const [exchange, setExchange] = useState("1");
  const [amount, setAmount] = useState<string>("0");
  const [open, setOpen] = useState(state); // withdraw
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [unstakedAmount, setUnstakedAmount] = useState<string>("0");
  const [withdrawStatus, setWithdrawStatus] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const getQueryDataFromContract = async () => {
    if (address) {
      console.log("address restake", address)

      try {
        const result2 = await fetchQuery(
          STAKE_CONTRACT_ADDRESS,
          STAKE_QUERY_MESSAGES.staker(address)
        );
        setQueryData(result2)
        setUnstakedAmount(convertToNibi(result2?.amount_staked_stnibi)) //burn
        setWithdrawAmount(convertToNibi(result2?.amount_restaked_rstnibi)) // withdraw
        console.log("result2", result2);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const convertToNibi = (value: string): string => {
    const valueAsNumber = parseFloat(value);
    const dividedValue = valueAsNumber / Math.pow(10, 6);
    return dividedValue.toString();
  }

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setState(searchParams.get("state") || "");
  }, []);

  React.useEffect(() => {
    getQueryDataFromContract();
  }, [address]);

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

  const transfer = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(amount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const toastId = toast.loading("Transferring...");
    console.log("multipliedAmount", multipliedAmount)
    console.log("transfering", stNIBITOKEN_CONTRACT_ADDRESS, "withdrawAmount", withdrawAmount, "amount", amount, "multipliedAmount", multipliedAmount)
    const tx = await sendTransaction(
      stNIBITOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.transfer(
        STAKE_CONTRACT_ADDRESS,
        multipliedAmount.toString()
      )
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Transferred Successfuly");
        console.log("transfer tx");
      })
      .catch((err) => {
        console.log("Transfer Failed", err);
      });
  };

  const transferRestake = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const amountAsNumber = parseFloat(withdrawAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    const toastId = toast.loading("Transferring...");

    console.log("transfering", stNIBITOKEN_CONTRACT_ADDRESS, "withdrawAmount", withdrawAmount, "amount", amount, "multipliedAmount", multipliedAmount)
    const tx = await sendTransaction(
      rstNIBI_TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.transfer(
        STAKE_CONTRACT_ADDRESS,
        multipliedAmount.toString()
      )
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Transferred Successfuly");
        console.log("transfer tx", tx);
      })
      .catch((err) => {
        console.log("Transfer Failed", err);
        toast.dismiss(toastId);
      });
  };

  const restake_deposit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
   await  transfer(event);
    const toastId = toast.loading("restaking...");
    console.log("restake", amount, "exchange", exchange)
    const amountAsNumber = parseFloat(amount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    try {
      console.log("try block")
      const tx = await sendTransaction(
        stNIBITOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_MESSAGES.increase_allowance("", multipliedAmount.toString(), null)
      )

      toast.dismiss(toastId);
      toast.success(`Staked ${amount} stNIBI successfully`);
      console.log("restake tx", tx)
    }
    catch (error) {
      console.log("error:", error);
      toast.dismiss(toastId);
    }
  };

  const burnrestake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const toastId = toast.loading("buring...");

    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.burnrestakenibi()
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success(`Unstaked ${withdrawAmount} stNIBI successfully`);
      }
      )
  }

  const withdraw_restaked = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

   await  transferRestake(event);
    const toastId = toast.loading("Withdrawing...");
    console.log("withdraw", amount, "exchange", exchange)
    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.withdraw_liquidity()
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success(`Withdraw ${amount} stNIBI successfully`);
      })
      .catch((err) => {
        console.log("Withdraw Failed", err);
        toast.dismiss(toastId);
      });
    await burnrestake(event);
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
                  ? " bg-purple-100 drop-shadow-2xl text-black font-semibold"
                  : " "
                }`}
            >
              <button onClick={() => handleTabOpen("deposit")}>Deposit</button>
            </div>

            <div
              className={`w-1/2 py-4 px-4 text-sm md:text-base lg:px-12 hover:underline-offset-8
                          text-center rounded-2xl transition-all delay-75 text-black  cursor-pointer ${open === "withdraw"
                  ? " bg-purple-100 drop-shadow-2xl text-black font-semibold "
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
                <div className="text-sm">
                  <div className="">
                    <div className="flex items-center justify-between"></div>
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
                  Restake
                </Button>
              </form>
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
                  <form
                    onSubmit={withdraw_restaked}
                    className="w-full max-w-lg"
                  >
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
                            {unstakedAmount} stNIBI
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
          )}
        </div>
      </div>
    </main>
  );
}

