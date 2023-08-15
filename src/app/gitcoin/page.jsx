"use client";
import { BackToVerificationBtn } from "../presale/page";
import GitCoin from "@/components/verification/GitcoinPassport";

export default function PresalePage({ params }) {
  const walletAddress = params.walletAddress;
  return (
    <div className="mx-auto w-[570px]">
      <div className="flex justify-end">
        <BackToVerificationBtn>Back to dashboard</BackToVerificationBtn>
      </div>
      <GitCoin staker={walletAddress}></GitCoin>
    </div>
  );
}
