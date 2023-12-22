"use client";
import CardInfo from "@/components/dashboard/cardInfo";
import TopBanner from "@/components/dashboard/topBanner";
import NodeUpTime from "@/components/dashboard/nodeUpTime";
import StakeMore from "@/components/dashboard/stakeMore";
import Withdraw from "@/components/dashboard/withdraw";
import { useEffect, useState } from "react";
import { fetchNodeInfo } from "@/redux/features/nodeInfo";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useNetwork } from "wagmi";
import { fetchTierSig, fetchVerification } from "@/redux/features/verification";
import { Loading } from "@/components/layout/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { LiveChatWidget } from "@livechat/widget-react";
import Messages from "@/components/dashboard/Messages";

export function contracts() {
  const { isConnected } = useAccount();
  if (isConnected) {
    const { chain } = useNetwork();
    switch (chain.id) {
      case 1:
        return {
          STAKING_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT_MAINNET,
          PION_TOKEN_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_PION_TOKEN_CONTRACT_MAINNET,
          NODE_MANAGER_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_MANAGER_CONTRACT_MAINNET,
        };
      case 56:
        return {
          STAKING_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT_BNB,
          PION_TOKEN_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_PION_TOKEN_CONTRACT_BNB,
          NODE_MANAGER_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_MANAGER_CONTRACT_BNB,
          TIER_SETTER_CONTRACT:
            process.env.NEXT_PUBLIC_TIER_SETTER_CONTRACT_BNB,
        };
      case 97:
        return {
          STAKING_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT_CHAPLE,
          PION_TOKEN_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_PION_TOKEN_CONTRACT_CHAPLE,
          NODE_MANAGER_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_MANAGER_CONTRACT_CHAPLE,
        };
      default:
        return {
          STAKING_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_STAKING_CONTRACT_BNB,
          PION_TOKEN_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_PION_TOKEN_CONTRACT_BNB,
          NODE_MANAGER_CONTRACT:
            process.env.NEXT_PUBLIC_MUON_NODE_MANAGER_CONTRACT_BNB,
          TIER_SETTER_CONTRACT:
            process.env.NEXT_PUBLIC_TIER_SETTER_CONTRACT_BNB,
        };
    }
  }
}

export function LightBtn({
  loading,
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
      disabled={disable || btnDisabeld || loading}
      onClick={onClick}
      className={`inline-block rounded-[8px] ${
        bgColor ? bgColor : "bg-primaryL3"
      }  ${
        textColor ? textColor : "text-[#4D3E9E]"
      } px-4 pb-2 pt-2.5 font-medium  leading-normal transition duration-150 ease-in-out ${
        disable
          ? "opacity-50"
          : btnDisabeld || loading
          ? ""
          : "hover:bg-primaryL3/50 active:bg-primary-50"
      }   ${className}`}
    >
      {loading ? (
        <svg
          aria-hidden="true"
          role="status"
          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { address: walletAddress, isConnected, isDisconnected } = useAccount();
  const stakerAddress = searchParams.get("staker");
  console.log(stakerAddress);

  const [address, setAddress] = useState(
    searchParams.has("staker") ? stakerAddress : walletAddress
  );

  const [needSubmitTier, setNeedSubmitTier] = useState(false);
  const [needFillOutFrom, setNeedFillOutFrom] = useState(false);
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
    verificationData.telegramVerified ||
    verificationData.privateSaleVerified ||
    verificationData.pionMeetsVerified ||
    verificationData.nodeDropVerified;

  useEffect(() => {
    console.log(
      `pionStaked: ${selector.pionStaked}, tiersMaxStakeAmount: ${selector.tiersMaxStakeAmount}`
    );
    if (
      verificationData.eligibleTier > verificationData.tier &&
      selector.pionStaked > selector.tiersMaxStakeAmount
    ) {
      setNeedSubmitTier(true);
      setNeedFillOutFrom(false);
    } else {
      setNeedSubmitTier(false);
      if (
        verificationData.eligibleTier == verificationData.tier &&
        [0, 1, 2].includes(verificationData.eligibleTier) &&
        selector.pionStaked > selector.tiersMaxStakeAmount &&
        selector.tiersMaxStakeAmount
      ) {
        setNeedFillOutFrom(true);
      } else {
        setNeedFillOutFrom(false);
      }
    }
  }, [
    verificationData.eligibleTier,
    verificationData.tier,
    selector.pionStaked,
    selector.tiersMaxStakeAmount,
  ]);

  useEffect(() => {
    if (
      isDisconnected &&
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_REDIRECT_FOR_DISCONNECT_WALLET
    ) {
      // window.location.replace("/");
    }
  }, [isDisconnected]);
  useEffect(() => {
    if (isConnected) {
      dispatch(fetchNodeInfo(address));
      dispatch(fetchVerification(address));
    }
  }, [address]);

  useEffect(() => {
    if (selector.isNew === true) {
      window.location.replace("/dashboard/preparing");
    }
  }, [selector.isNew]);

  if (selector.fetchStatus === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className={`${isDisconnected ? "opacity-20" : ""}`} aria-disabled>
      <TopBanner
        needSubmitTier={needSubmitTier}
        isVerify={isVerify}
        needFillOutFrom={needFillOutFrom}
        address={address}
      ></TopBanner>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        {/* <CardInfo title="IP Address" data={selector.nodeIP}></CardInfo> */}
        <CardInfo title="Node ID" data={selector.id}></CardInfo>
        <CardInfo title="Node Address" data={selector.nodeAddress}></CardInfo>
        <CardInfo title="Peer ID" data={selector.peerId}></CardInfo>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <NodeUpTime onlinePercent={selector.onlinePercent}></NodeUpTime>
        <StakeMore address={address}></StakeMore>
        <Withdraw
          needSubmitTier={needSubmitTier || !isVerify}
          address={address}
        ></Withdraw>
      </div>
      <LiveChatWidget
        license="15138837"
        visibility="minimized"
      ></LiveChatWidget>
      <Messages></Messages>
    </div>
  );
}
