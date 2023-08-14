"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LightBtn } from "@/app/page";

export default function TopBanner({isVerify}) {
  const router = useRouter();
  return (
    <div className="bg-primary13 h-20 w-full rounded-[10px] flex items-center px-6 justify-between">
      <div className="flex  flex-wrap items-center space-x-3">
        <Image
          src="/dashboard/wallet-check.svg"
          width="43"
          height="43"
        ></Image>
        <span className="text-xl font-normal">Uniqueness Verification:</span>
      </div>
      <h4 className="text-xl font-semibold">{isVerify?"Muon presale Participation":"Not Verified"}</h4>
      <LightBtn onClick={() => router.push("/verification")}>
        Go to verification center
      </LightBtn>
    </div>
  );
}
