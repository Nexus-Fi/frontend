"use client";
import useTransaction from "@/hooks/useTransaction";
import { CONTRACT_MESSAGES } from "@/lib/messages";
import { STAKE_CONTRACT_MESSAGES } from "@/components/stakeNibi/msg";
import toast from "react-hot-toast";

const contract_address =
  "nibi1valvrt57mk90yl94jmqhj7z0fl24q87ztrkl5tlqgky4mcfg8kds9nrg7y";

export default function Staking() {
  const { sendTransaction } = useTransaction();

  const tokenToStake = [
    {
      amount: "10000",
      denom: "unibi",
    },
  ];
  
  const stake = async () => {
    const toastId = toast.loading("Staking...");
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
  return (
    <main className="flex flex-row px-28 py-16">
      <button
        onClick={stake}
        className="bg-black text-white py-2 px-4 rounded-xl"
      >
        Stake
      </button>
      <button
        onClick={update_params}
        className="bg-black text-white py-2 px-4 rounded-xl"
      >
        update_params
      </button>
    </main>
  );
}
