"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LightBtn } from "@/app/page";

export default function TopBanner({ isVerify, privateSaleVerified }) {
  const router = useRouter();
  return (
    <div className="bg-primary13 grid grid-cols-1 lg:h-20 py-5 lg:py-0 w-full rounded-[10px] lg:flex items-center px-6 justify-between">
      <div className="flex flex-wrap items-center space-x-3">
        <Image
          src="/dashboard/dashboard/wallet-check.svg"
          width="43"
          height="43"
        ></Image>
        <span className="text-xl font-normal">Uniqueness Verification:</span>
      </div>
      <h4 className="text-xl font-semibold">
        {privateSaleVerified
          ? "Verified for Master Node"
          : isVerify
          ? "Verified for Starter Node"
          : "Not Verified"}
      </h4>
      <LightBtn
        className="mt-5 lg:mt-0"
        onClick={() => router.push("/verification")}
      >
        Go to verification center
      </LightBtn>
    </div>
  );
}
