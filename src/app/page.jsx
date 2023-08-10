"use client";
import CardInfo from "@/components/dashboard/cardInfo";
import TopBanner from "@/components/dashboard/topBanner";
import NodeUpTime from "@/components/dashboard/nodeUpTime";
import StakeMore from "@/components/dashboard/stakeMore";
import Withdraw from "@/components/dashboard/withdraw";
import { useEffect } from "react";
import {
  fetchNodeInfo,
} from "@/redux/features/nodeInfo";
import { useDispatch, useSelector } from "react-redux";
import { addressToShort } from "@/utils/showAddress";
import { useAccount } from "wagmi";
export function LightBtn({ children, onClick, className, bgColor, textColor }) {
  return (
    <button
      onClick={onClick}
      className={`inline-block rounded-[8px] ${
        bgColor ? bgColor : "bg-primary13"
      }  ${
        textColor ? textColor : "text-primary"
      } px-4 pb-2 pt-2.5 font-medium  leading-normal transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  useEffect(() => {
    dispatch(fetchNodeInfo(address));
  }, []);
  return (
    <div>
      <TopBanner></TopBanner>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <CardInfo title="IP Adress" data={selector.nodeIP}></CardInfo>
        <CardInfo title="Node ID" data={selector.id}></CardInfo>
        <CardInfo title="Node Address" data={selector.nodeAddress}></CardInfo>
        <CardInfo
          title="Peer ID"
          data={addressToShort(selector.peerId)}
        ></CardInfo>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <NodeUpTime onlinePercent={selector.onlinePercent}></NodeUpTime>
        <StakeMore></StakeMore>
        <Withdraw></Withdraw>
      </div>
    </div>
  );
}
