import { LightBtn } from "@/app/page";
import { useAccount, useContractRead } from "wagmi";
import json from "@/jsons/abi.json";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function StakeMore() {
  const [balance, setBalance] = useState(0);
  const { address, isDisconnected, status } = useAccount();
  const { data } = useContractRead({
    address: "0x34daa4F5a3d1cCB8eCE74af1c3CB209728A44a5C",
    abi: json,
    functionName: "users",
    args: [address],
    
  });
  useContractRead({
    address: "0x34daa4F5a3d1cCB8eCE74af1c3CB209728A44a5C",
    abi: json,
    functionName: "valueOfBondedToken",
    args: [data && data[4]],
    onSuccess(res) {
      const balance = Web3.utils.fromWei(String(res), "ether");
      setBalance(Number(balance).toFixed(2));
    },
  });
  useEffect(() => {
    if (isDisconnected) {
      setBalance(0);
    }
  }, [status]);
  return (
    <div className="bg-primary13 w-full rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Bonded ALICE Power</h4>
        <b>{balance}</b>
      </div>
      <div className="w-full flex justify-end">
        <LightBtn>Upgrade</LightBtn>
      </div>
    </div>
  );
}