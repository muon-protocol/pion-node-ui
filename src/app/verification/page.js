"use client";
import GitCoinModal from "@/components/verification/GitcoinPassport";
import BrightIdModal from "@/components/verification/brightIdModal";
import { discordVerified } from "@/components/verification/discord";
import NormalVerificationCard from "@/components/verification/normalVerificationCard";
import PassVerification from "@/components/verification/passVerification";
import TelegramModal from "@/components/verification/telegramModal";
import TitleInfo from "@/components/verification/titleInfo";
import { fetchVerification } from "@/redux/features/verification";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function Verification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    dispatch(fetchVerification(address));
  }, []);
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
          onClick={() => router.push(`/verification/gitCoin/${address}`)}
        ></NormalVerificationCard>
      </div>
    </div>
  );
}
