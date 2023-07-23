import Image from "next/image";
export default function TopBanner() {
  return (
    <div className="bg-primary13 h-20 w-full rounded-[10px] flex items-center px-6 justify-between">
      <div className="flex  flex-wrap items-center space-x-3">
        <Image src="/dashboard/wallet-check.svg" width="43" height="43"></Image>
        <span className="text-xl font-normal">Uniqueness Verification:</span>
      </div>
      <h4 className="text-xl font-semibold">Muon presale Participation</h4>
      <button className="bg-primary13 rounded-lg py-2 px-6 font-medium text-primary">
        Go to verification center
      </button>
    </div>
  );
}
