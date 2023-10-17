import { LightBtn } from "@/app/page";
import { useAccount, useContractRead } from "wagmi";
import json from "@/jsons/abi.json";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function StakeMore() {
  const [valueOfToken, setValueOfToken] = useState(0);
  const { address, isDisconnected, status } = useAccount();
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "users",
    args: [address],
    onSuccess(res) {
      console.log(res);
    },
  });
  const temp = Web3.utils.fromWei(String(data[0]), "ether");
  const balance = Number(temp).toFixed(2);
  useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "valueOfBondedToken",
    args: [data && data[4]],
    onSuccess(res) {
      const valueOfToken = Web3.utils.fromWei(String(res), "ether");
      setValueOfToken(Number(valueOfToken).toFixed(2));
    },
  });
  useEffect(() => {
    if (isDisconnected) {
      setValueOfToken(0);
    }
  }, [status]);
  return (
    <div className="bg-cardBackground/50 w-full rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div>
        <div className="flex justify-between">
          <h4 className="text-xl">Active Node Power</h4>
          <b className="text-2xl font-medium">{balance}</b>
        </div>
        <div className="flex mt-5 ">
          <h4 className="mr-1 text-xs">Staked Amount:</h4>
          <b className="text-xs font-medium">{valueOfToken}</b>
        </div>
        {data}
      </div>
      <div className="w-full flex justify-end">
        <LightBtn
          onClick={() => {
            window.location.replace("/upgrade");
          }}
        >
          Boost
        </LightBtn>
      </div>
    </div>
  );
}
