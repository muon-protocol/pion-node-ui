"use client";
import { Loading } from "@/components/layout/Loading";
import BrightIdModal from "@/components/verification/brightIdModal";
import { discordVerified } from "@/components/verification/discord";
import NormalVerificationCard from "@/components/verification/normalVerificationCard";
import PassVerification from "@/components/verification/passVerification";
import TelegramModal from "@/components/verification/telegramModal";
import TitleInfo from "@/components/verification/titleInfo";
import { fetchVerification } from "@/redux/features/verification";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";


export function WarningBox({children}) {
  return (
    <div className="flex rounded-lg items-center bg-mysecondary/20 px-4 py-2">
      <div>
        <Image width="50"
          height="20"
          src="/verification/warrning-icon.svg"
          ></Image>
      </div>
      <p className="text-sm ml-3">{ children}</p>
    </div>
  )
}


export function ErrorBox({ children }) {
  return (
    <div className="flex rounded-lg items-center bg-[#FF3A5D]/20 px-4 py-2">
      <div>
        <Image width="20"
          height="20"
          src="/verification/error.svg"
          ></Image>
      </div>
      <p className="text-sm ml-3">{ children}</p>
    </div>
  )
}

export default function Verification() {
  const router = useRouter();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
    );
  const dispatch = useDispatch();
  const { address, } = useAccount();

  useEffect(() => {
    dispatch(fetchVerification(address));
  }, []);


  if (selector.fetchStatus === "loading") {
    return (<Loading></Loading>)
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-2/3 mr-4">
          <TitleInfo></TitleInfo>
        </div>
        <div className="basis-1/3 ml-4">
          <PassVerification passed={selector}></PassVerification>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <NormalVerificationCard
          title="Muon Presale Participation"
          isActive={selector.presaleVerified}
          onClick={() => router.push(`/verification/presale/${address}`)}
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
          onClick={() => discordVerified(address)}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="BrightID Aura Verification"
          data={true}
          isActive={selector.brightidAuraVerified}
        ></NormalVerificationCard>
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
          onClick={() => router.push(`/verification/gitcoin/${address}`)}
        ></NormalVerificationCard>
      </div>
    </div>
  );
}
