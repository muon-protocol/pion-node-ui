"use client";
import Lottie from "lottie-react";
import done from "@/jsons/lottie/done.json";
import loading from "@/jsons/lottie/loading-primary.json";
import { fetchNodeInfo } from "@/redux/features/nodeInfo";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveChatWidget } from "@livechat/widget-react";
import { getNodeInfoData } from "@/utils/fetchNodeInfo";

export default function NewNode() {
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount();
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  const router = useRouter();

  const [tryed, setTryed] = useState(0);
  const [timeOut, setTimeOutState] = useState(0);
  const [isNewNode, setIsNewNode] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      getNodeInfoData(address).then((res) => {
        if (res.nodeInfo.isNew === false) {
          window.location.replace("/dashboard/");
        } else if (res.nodeInfo.isNew === true) {
          setIsNewNode(true);
          setTryed(tryed + 1);
          if (tryed == 2) {
            setTimeOutState(15000);
          }
        } else {
          window.location.replace("/");
        }
      });
    }, timeOut);
  }, [tryed]);

  useEffect(() => {
    if (isDisconnected) {
      window.location.replace("/");
    }
  }, [isDisconnected]);

  return (
    <div className="flex justify-center">
      <div
        className={`w-[480px] bg-[#3D3D3D] rounded-[18px] ${
          !isNewNode && "hidden"
        } `}
      >
        <div className="w-[260px] mx-auto">
          <Lottie width={50} height={50} animationData={done} />
        </div>
        <p className="text-xl mx-auto text-center text-[#918EF5]">
          Your node has been added to Pion network
        </p>
        <div className="flex mx-auto items-center justify-center">
          <p className="text-myPrimary">Preparing your dashboard</p>
          <div className="w-20">
            <Lottie animationData={loading}></Lottie>
          </div>
        </div>
        <LiveChatWidget
          license="15138837"
          visibility="minimized"
        ></LiveChatWidget>
      </div>
    </div>
  );
}
