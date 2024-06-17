"use client";
import React, { useState } from "react";
import { CiDollar } from "react-icons/ci";
import useTransaction from "@/hooks/useTransaction";
import { CONTRACT_MESSAGES } from "@/lib/messages";
import toast from "react-hot-toast";

const contract_address =
  "nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y";

export default function Staking() {
  const { sendTransaction } = useTransaction();
  const [value, setValue] = useState("0");
  const [exchange, setExchange] = useState("1");
  const [amount, setAmount] = useState("2");

  const tokenToStake = [
    {
      amount,
      denom: "unibi",
    },
  ];

  const priceHandler = (event: { target: { defaultValue: React.SetStateAction<string>; }; }) => {
    console.log("price", event.target.defaultValue);
    setAmount(event.target.defaultValue);
  }

  const stake = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const toastId = toast.loading("Staking...");
    console.log("staking", tokenToStake, "amount", amount, value, exchange)
    const tx = await sendTransaction(
      contract_address,
      CONTRACT_MESSAGES.bond_forstnibi,
      tokenToStake
    )
      .then((res) => {
        toast.dismiss(toastId);
        toast.success("Staked Successfuly");
      })
      .catch((err) => {
        "Staking Failed";
      });
  };
  return (
    <main className="flex flex-row justify-center align-middle pt-8 ">
      {/* <button
        onClick={stake}
        className="bg-black text-white py-2 px-4 rounded-xl"
      >
        Stake
      </button> */}
      <div className="card my-5 bg-base-200 shadow-xl w-[600px] p-10">
        <div className=" p-5 justify-between items-center">
          <div className='flex flex-row w-full items-center gap-4'>
            {/* <CiDollar className='bg-yellow-300 rounded-xl text-3xl' /> */}
            <div>
              <h2 className="text-left text-xl font-semibold ">Stake</h2>
            </div>

          </div>
          <div className="divider divider-neutral"></div>

          <div>
            <form className="w-full max-w-lg">
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
                  <input type="text" placeholder="0.00" onChange={priceHandler} defaultValue="0" className="input input-lg input-bordered" />
                </label>
              </div>

              <div className='text-sm'>
                {/* <div className="my-1 border-t border-gray-300"></div> */}
                <div className="">
                  <div className='flex items-center justify-between'>
                    <div className=''>You wil get</div>
                    <div>
                      {value} stNIBI
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
                onClick={stake}
                className="bg-black text-white py-4 mt-5 px-4 rounded-xl text-xl w-full"
              >
                Stake
              </button>

            </form >


          </div>

          {/* <div className='flex flex-row gap-4'>
                <div className="flex items-center justify-center">
                    <div className="w-px h-12 bg-green-300"></div>
                    <div className='flex flex-col px-2'>
                        <div> 0.000</div>
                        <div className='text-xs'>Restaked</div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-px h-12 bg-green-300"></div>
                    <div className='flex flex-col px-2'>
                        <div> 7320223</div>
                        <div className='text-xs'>TVL</div>
                    </div>
                </div>
            </div> */}
        </div>
      </div>
    </main>
  );
}
