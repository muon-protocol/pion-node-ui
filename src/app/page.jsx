"use client";
import CardInfo from "@/components/dashboard/cardInfo";
import TopBanner from "@/components/dashboard/topBanner";
import NodeUpTime from "@/components/dashboard/nodeUpTime";
import StakeMore from "@/components/dashboard/stakeMore";
import Withdraw from "@/components/dashboard/withdraw";
import { useEffect } from "react";
import { fetchNodeInfo } from "@/redux/features/nodeInfo";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { fetchVerification } from "@/redux/features/verification";
import { Loading } from "@/components/layout/Loading";
import { useRouter } from "next/navigation";
import { LiveChatWidget } from "@livechat/widget-react";
import Messages from "@/components/dashboard/Messages";
export function LightBtn({
  children,
  onClick,
  className,
  bgColor,
  textColor,
  disable,
  btnDisabeld,
  dataTeToggle,
  dataTeTarget,
}) {
  return (
    <button
      data-te-toggle={dataTeToggle}
      data-te-target={dataTeTarget}
      disabled={disable || btnDisabeld}
      onClick={onClick}
      className={`inline-block rounded-[8px] ${
        bgColor ? bgColor : "bg-primaryL3"
      }  ${
        textColor ? textColor : "text-[#4D3E9E]"
      } px-4 pb-2 pt-2.5 font-medium  leading-normal transition duration-150 ease-in-out ${
        disable
          ? "opacity-50"
          : btnDisabeld
          ? ""
          : "hover:bg-primaryL3/50 active:bg-primary-50"
      }   ${className}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const { address, isConnected, isDisconnected } = useAccount();
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  const verificationData = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const isVerify =
    verificationData.brightidAuraVerified ||
    verificationData.brightidMeetsVerified ||
    verificationData.discordVerified ||
    verificationData.gitcoinPassportVerified ||
    verificationData.presaleVerified ||
    verificationData.telegramVerified;

  useEffect(() => {
    if (
      isDisconnected &&
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_REDIRECT_FOR_DISCONNECT_WALLET
    ) {
      window.location.replace("/");
    }
  }, [isDisconnected]);
  useEffect(() => {
    if (isConnected) {
      dispatch(fetchNodeInfo(address));
      dispatch(fetchVerification(address));
    }
  }, [address]);
  const router = useRouter();

  useEffect(() => {
    if (selector.isNew) {
      router.push("/newNode");
    }
  }, [selector.isNew]);

  if (selector.fetchStatus === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className={`${isDisconnected ? "opacity-50" : ""}`} aria-disabled>
      <TopBanner
        isVerify={isVerify}
        privateSaleVerified={verificationData.privateSaleVerified}
      ></TopBanner>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <CardInfo title="IP Address" data={selector.nodeIP}></CardInfo>
        <CardInfo title="Node ID" data={selector.id}></CardInfo>
        <CardInfo title="Node Address" data={selector.nodeAddress}></CardInfo>
        <CardInfo title="Peer ID" data={selector.peerId}></CardInfo>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <NodeUpTime onlinePercent={selector.onlinePercent}></NodeUpTime>
        <StakeMore></StakeMore>
        <Withdraw address={address}></Withdraw>
      </div>
      <LiveChatWidget
        license="15138837"
        visibility="minimized"
      ></LiveChatWidget>
      <Messages></Messages>
    </div>
  );
}
