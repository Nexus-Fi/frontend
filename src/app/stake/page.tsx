"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { CiDollar } from "react-icons/ci";
import useTransaction from "@/hooks/useTransaction";
import { CONTRACT_MESSAGES } from "@/lib/messages";
import { STAKE_CONTRACT_MESSAGES } from "@/components/stakeNibi/msg";
import toast from "react-hot-toast";
import { STAKE_CONTRACT_ADDRESS, stNIBITOKEN_CONTRACT_ADDRESS } from "@/lib/address";
import { TOKEN_CONTRACT_MESSAGES } from "@/lib/Message/token";
const contract_address =
  "nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y";

export default function Staking() {
  const { sendTransaction } = useTransaction();
  const [exchange, setExchange] = useState("1");
  const [amount, setAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  const [open, setOpen] = useState("stake"); // unstake, withdraw
  const [wallet, setWallet] = useState<string>("");
  const [unstakeStatus, setUnstakeStatus] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

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
        toast.success("Transferred Successfuly");
        console.log("transfer tx", tx)
      })
      .catch((err) => {
        console.log("Transfer Failed");
      });


  }

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
    const tx = await sendTransaction(
      STAKE_CONTRACT_ADDRESS,
      STAKE_CONTRACT_MESSAGES.bond_forstnibi(),
      tokenToStake
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Staked Successfuly");
        console.log("stake tx :", tx)
      })
      .catch((err) => {
        console.log("Staking Failed", err);
        toast.dismiss(toastId);
      });
  };

  const unstake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    transfer(event);
    const toastId = toast.loading("unstaking...");
    const amountAsNumber = parseFloat(unstakeAmount);
    const multipliedAmount = amountAsNumber * Math.pow(10, 6);

    console.log("unstaking unstakeAmount", unstakeAmount, "stakeAmount", amount)
    const tx = await sendTransaction(
      stNIBITOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_MESSAGES.send_from("", STAKE_CONTRACT_ADDRESS, multipliedAmount.toString(), "")
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Unstaked Successfuly");
        console.log("unstake sendFrom tx", tx)

      })
      .catch((err) => {
        console.log("Unstaking Failed", err);
        toast.dismiss(toastId);
      });
  };

  const update_params = async () => {
    const toastId = toast.loading("update_params...");
    const tx = await sendTransaction(
      contract_address,
      STAKE_CONTRACT_MESSAGES.update_params(1, 1)
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("update_params Successfuly");
      })
      .catch((err) => {
        "update_params Failed";
        toast.dismiss(toastId);
        toast.error(err.message);
      });
  };

  const withdraw = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const toastId = toast.loading("withdrawing...");
    console.log("staking", tokenToStake, "unstake", amount, "exchange", exchange)
    if (termsAccepted) {
      console.log('Terms accepted');
      // call contract withdraw function here
      // const tx = await sendTransaction(
      //   contract_address,
      //   CONTRACT_MESSAGES.bond_forstnibi,
      //   tokenToStake
      // )
      //   .then((res) => {
      //     toast.dismiss(toastId);
      //     toast.success("Staked Successfuly");
      //   })
      //   .catch((err) => {
      //     "Staking Failed";
      //   });
    } else {
      toast.error('Please tick the box to withdraw funds');
    }

  };

  return (
    <main className="flex flex-row justify-center align-middle py-5 ">
      <div className="card my-5 bg-base-200 shadow-xl w-[600px] px-10 py-5">
        <div className=" p-4 justify-between items-center">
          <div className='flex flex-row w-full items-center gap-4'>
            <div className="flex flex-wrap">
              <div className={`w-1/3 rounded-t-[40px] py-4 px-1 md:px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
                                            transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer ${open === "client" ? "bg-[#F1F1F1] text-black underline-offset-8" : " "
                }`}>
                <button
                  onClick={() => handleTabOpen("stake")}
                >
                  Stake
                </button>
              </div>

              <div className="w-1/3 rounded-t-[30px]">
                <div className={`rounded-t-[30px] py-4 px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
                                            transition-all delay-75 text-black  cursor-pointer ${open === "auditor" ? "bg-[#F1F1F1] text-black underline-offset-8" : " "
                  }`}>
                  <button
                    onClick={() => handleTabOpen("unstake")}
                  >
                    Unstake
                  </button>
                </div>
              </div>

              <div className="w-1/3 rounded-t-[30px]">
                <div className={`rounded-t-[30px] py-4 px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
                                            transition-all delay-75 text-black  cursor-pointer ${open === "auditor" ? "bg-[#F1F1F1] text-black underline-offset-8" : " "
                  }`}>
                  <button
                    onClick={() => handleTabOpen("withdraw")}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="divider divider-neutral mt-0"></div>

          {/* stake option */}
          {
            open === "stake" &&
            <div>

              <form onSubmit={stake} className="w-full max-w-lg">
                <div className="my-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <div>
                        Select the Asset
                      </div>
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
                      <div className="my-2">
                        Enter Amount
                      </div>
                    </div>
                    <input type="text" id='stake-value' defaultValue={amount} onChange={priceHandler} className="input input-lg input-bordered" placeholder="0" required />
                  </label>
                </div>

                <div className='text-sm'>
                  {/* <div className="my-1 border-t border-gray-300"></div> */}
                  <div className="">
                    <div className='flex items-center justify-between'>
                      <div className=''>You wil get</div>
                      <div>
                        {amount} stNIBI
                      </div>
                    </div>
                  </div>

                  <div className="my-2">
                    <div className='flex items-center justify-between'>
                      <div className=''>Exchange Rate</div>
                      <div>
                        1 stNIBI = {exchange} NIBI
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white py-4 mt-5 px-4 rounded-xl text-xl w-full"
                >
                  Stake
                </button>

              </form >


            </div>
          }

          {/* unstake option */}
          {
            open === "unstake" &&
            <div>
              <form onSubmit={unstake} className="w-full max-w-lg">
                <div className="my-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <div>
                        Withdraw stNIBI as
                      </div>
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
                      <div className="my-2">
                        Enter amount of stNIBI
                      </div>
                    </div>
                    <input type="text" id='unstake-value' defaultValue={unstakeAmount} onChange={unstakeHandler} className="input input-lg input-bordered" placeholder="0" required />
                  </label>
                </div>

                <div className='text-sm'>
                  {/* <div className="my-1 border-t border-gray-300"></div> */}
                  <div className="">
                    <div className='flex items-center justify-between'>
                      <div className=''>You wil get</div>
                      <div>
                        {amount} NIBI
                      </div>
                    </div>
                  </div>

                  <div className="my-2">
                    <div className='flex items-center justify-between'>
                      <div className=''>Exchange Rate</div>
                      <div>
                        1 stNIBI = {exchange} NIBI
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white py-4 mt-5 px-4 rounded-xl text-xl w-full"
                >
                  Unstake
                </button>

              </form >
              <div role="alert" className="mt-3 alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Unstake requests are processed in 7-10 days, subject to exit queue on Network</span>
              </div>

            </div>
          }

          {/* withdraw option */}
          {
            open === "withdraw" &&
            <div>
              <div role="alert" className="mt-3 alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Unstake requests are processed in 7-10 days, subject to exit queue on Network</span>
              </div>

              {
                !unstakeStatus ?
                  <div>
                    <div className="flex flex-col align-middle justify-center my-8 py-8 p-5 bg-white rounded-3xl ">
                      <div className="py-5 text-center text-3xl font-semibold">
                        No unstake requests found
                      </div>
                      <div className="py-5 text-center ">
                        You will be able to claim your tokens after the Unstake request has been processed. To Unstake your tokens go to Unstake tab
                      </div>
                    </div>
                  </div>
                  :
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
                        <label htmlFor="terms" className="text-lg font-semibold text-black dark:text-white">
                          I want to withdraw all available amount
                        </label>
                      </div>


                      <button
                        type="submit"
                        className="bg-black text-white py-4 mt-5 px-4 rounded-xl text-xl w-full"
                      >
                        Withdraw
                      </button>
                    </form >

                  </div>
              }



            </div>
          }
        </div>
      </div>
    </main >
  );
}
