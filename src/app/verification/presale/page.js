import Presale from "@/components/verification/presale";
import Image from "next/image";
export default function PresalePage() {
  return (
    <div className="mx-auto w-[570px]">
      <div className="flex justify-end">
        <button className="flex">
          <Image src="/verification/back.svg" width="24" height="24"></Image>
          Back to verification center
        </button>
      </div>
      <Presale></Presale>
    </div>
  );
}
