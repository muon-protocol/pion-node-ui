import { LightBtn } from "@/app/page";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import json from "@/jsons/abi.json";
import nodeManagerAbi from "@/jsons/nodeManagerAbi.json";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { setTier as setTierRedux } from "@/redux/features/verification";
import {
  setPionStaked,
  setActivePionStaked,
  setTiersMaxStakeAmount,
} from "@/redux/features/nodeInfo";

export default function StakeMore() {
  const dispatch = useDispatch();
  const [valueOfToken, setValueOfToken] = useState(0);
  const [tier, setTier] = useState(0);
  const [tierMaxStakeAmount, setTierMaxStakeAmount] = useState(0);
  const [nodePower, setNodePower] = useState("init");
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );

  const { address, isDisconnected, status } = useAccount();
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "users",
    args: [address],
    onSuccess(res) {
      console.log(res);
      let temp = Web3.utils.fromWei(String(res[0]), "ether");
      temp = Number(temp).toFixed(2);
      setNodePower(Number(temp));
      dispatch(setActivePionStaked(Number(temp)));
    },
  });
  useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "valueOfBondedToken",
    args: [data && data[4]],
    onSuccess(res) {
      const valueOfToken = Web3.utils.fromWei(String(res), "ether");
      const staked = Number(valueOfToken).toFixed(2);
      setValueOfToken(Number(staked));
      dispatch(setPionStaked(Number(staked)));
    },
  });
  useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "tiersMaxStakeAmount",
    args: [tier],
    onSuccess(res) {
      const toEther = Web3.utils.fromWei(String(res), "ether");
      const tierMaxAamount = Number(toEther).toFixed(2);
      setTierMaxStakeAmount(Number(tierMaxAamount));
      dispatch(setTiersMaxStakeAmount(Number(tierMaxAamount)));
    },
  });
  useContractRead({
    address: process.env.NEXT_PUBLIC_MUON_NODE_MANAGER_CONTRACT,
    abi: nodeManagerAbi,
    functionName: "stakerAddressInfo",
    args: [address],
    onSuccess(res) {
      dispatch(setTierRedux(Number(res.tier)));
      setTier(Number(res.tier));
    },
  });
  const {
    data: contractData,
    write: writeUpdateStaking,
    isLoading: walletLoading,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT,
    abi: json,
    functionName: "updateStaking",
  });
  useEffect(() => {
    if (isDisconnected) {
      setValueOfToken(0);
    }
  }, [status]);
  const needUpdateNodePower =
    Number(nodePower) < Number(tierMaxStakeAmount) &&
    Number(valueOfToken) > Number(nodePower);
  return (
    <div
      className={`${
        needUpdateNodePower ? "bg-helperWarning/20" : "bg-cardBackground/50"
      } w-full rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]`}
    >
      <div>
        <div className="flex justify-between">
          <h4
            className={`text-xl ${needUpdateNodePower && "text-helperWarning"}`}
          >
            Active Node Power
          </h4>
          <b
            className={`text-2xl font-medium ${
              needUpdateNodePower && "text-helperWarning"
            }`}
          >
            {nodePower && nodePower}
          </b>
        </div>
        <div className="flex mt-5 ">
          <h4
            className={`mr-1 text-xs ${
              needUpdateNodePower && "text-helperWarning"
            }`}
          >
            Staked Amount:
          </h4>
          <b
            className={`text-xs font-medium ${
              needUpdateNodePower && "text-helperWarning"
            }`}
          >
            {valueOfToken}
          </b>
        </div>
        {data}
      </div>
      <div className="w-full flex justify-end">
        <LightBtn
          loading={walletLoading}
          className={needUpdateNodePower && "min-w-[234px]"}
          onClick={() => {
            if (needUpdateNodePower) {
              writeUpdateStaking();
            } else {
              window.location.replace("/pion/bonPION/boost");
            }
          }}
        >
          {needUpdateNodePower ? "Update Node Power" : "Boost"}
        </LightBtn>
      </div>
    </div>
  );
}
