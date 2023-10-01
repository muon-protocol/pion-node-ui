"use client";
import { Loading } from "@/components/layout/Loading";
import BrightIdModal from "@/components/verification/brightIdModal";
import DiscordVerified from "@/components/verification/discord";
import NormalVerificationCard from "@/components/verification/normalVerificationCard";
import PassVerification from "@/components/verification/passVerification";
import TelegramModal from "@/components/verification/telegramModal";
import TitleInfo from "@/components/verification/titleInfo";
import { fetchVerification } from "@/redux/features/verification";
import { LiveChatWidget } from "@livechat/widget-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

export function WarningBox({ children, className, dangerouslySetInnerHTML }) {
  return (
    <div
      className={`${className} flex rounded-lg items-center text-black bg-[#F7E2DB] px-4 py-2`}
    >
      <div className="min-w-[30px]">
        <Image
          width="30"
          height="20"
          src="/dashboard/verification/warrning-icon.svg"
        ></Image>
      </div>
      <p
        className={` text-sm ml-3`}
        dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
      >
        {children}
      </p>
    </div>
  );
}

export function ErrorBox({ children }) {
  return (
    <div className="flex rounded-lg items-center bg-[#FF3A5D]/20 px-4 py-2">
      <div>
        <Image
          width="20"
          height="20"
          src="/dashboard/verification/error.svg"
        ></Image>
      </div>
      <p className="text-sm ml-3">{children}</p>
    </div>
  );
}

export default function Verification() {
  const router = useRouter();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected) {
      window.location.replace("https://alice-v2.muon.net");
    }
  }, [isDisconnected]);

  useEffect(() => {
    dispatch(fetchVerification(address));
  }, []);

  if (selector.fetchStatus === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="mr-4 lg:max-w-[60%]">
          <TitleInfo></TitleInfo>
        </div>
        <div className="lg:ml-4 grow">
          <PassVerification passed={selector}></PassVerification>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        <NormalVerificationCard
          title="Muon Presale Participation"
          isActive={selector.presaleVerified}
          onClick={() => router.push(`/presale?staker=${address}`)}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="Active Community Member (Telegram)"
          isActive={selector.telegramVerified}
        >
          <TelegramModal isActive={selector.telegramVerified}></TelegramModal>
        </NormalVerificationCard>
        <NormalVerificationCard
          title="Active Community Member (Discord)"
          isActive={selector.discordVerified}
        >
          <DiscordVerified
            signer={address}
            isActive={selector.discordVerified}
          ></DiscordVerified>
        </NormalVerificationCard>
        <NormalVerificationCard
          title="BrightID Meet Verification"
          isActive={selector.brightidMeetsVerified}
        >
          <BrightIdModal
            isActive={selector.brightidMeetsVerified}
          ></BrightIdModal>
        </NormalVerificationCard>
        <NormalVerificationCard
          title="Gitcoin Passport"
          isActive={selector.gitcoinPassportVerified}
          onClick={() => router.push(`/gitcoin?staker=${address}`)}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="BrightID Aura Verification"
          data={true}
          disable={true}
          isActive={selector.brightidAuraVerified}
        ></NormalVerificationCard>
      </div>
      <LiveChatWidget
        license="15138837"
        visibility="minimized"
      ></LiveChatWidget>
    </div>
  );
}