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

export default function NewNode() {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  const router = useRouter();

  const [tryed, setTryed] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchNodeInfo(address));
      if (selector.isNew) {
        setTryed(tryed + 1);
      } else {
        window.location.replace("/dashboard");
      }
    }, 15000);
  }, [tryed]);

  return (
    <div className="w-full bg-white rounded-[18px] ">
      <div className="w-[260px] mx-auto">
        <Lottie width={50} height={50} animationData={done} />
      </div>
      <p className="text-xl mx-auto text-center">
        Your node has been added to Alice network
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
  );
}
