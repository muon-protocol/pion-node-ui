"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { BackToVerificationBtn } from "../../presale/[walletAddress]/page";
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
