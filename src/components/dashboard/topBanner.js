import Image from "next/image";
import { LightBtn } from "@/app/page";

export default function TopBanner() {
  return (
    <div className="bg-primary13 h-20 w-full rounded-[10px] flex items-center px-6 justify-between">
      <div className="flex  flex-wrap items-center space-x-3">
        <Image src="/dashboard/wallet-check.svg" width="43" height="43"></Image>
        <span className="text-xl font-normal">Uniqueness Verification:</span>
      </div>
      <h4 className="text-xl font-semibold">Muon presale Participation</h4>
      <LightBtn>Go to verification center</LightBtn>
    </div>
  );
}
