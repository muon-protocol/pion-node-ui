import Image from "next/image";
import aliceContract from "@/jsons/aliceContract.json";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const { address, isDisconnected, status } = useAccount();
  useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_PION_TOKEN_CONTRACT,
    abi: aliceContract,
    functionName: "balanceOf",
    args: [address],
    onSuccess(res) {
      const balance = Web3.utils.fromWei(String(res), "ether");
      setBalance(Number(balance).toFixed(4));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isDisconnected) {
      setBalance(0);
    }
  }, [status]);
  return (
    <div className="h-9 mb-1 bg-primaryMain flex items-center text-sm font-normal rounded-lg	px-5 mr-2">
      <Image
        src="/dashboard/pion-logo.svg"
        width="21"
        height="5"
        className="mr-3"
      ></Image>
      <span className="mr-3">Balance:</span>
      <b className="text-white font-semibold mr-2">{balance}</b>
      <b className="font-semibold">PION</b>
    </div>
  );
}
