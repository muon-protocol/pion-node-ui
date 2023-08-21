import { LightBtn } from "@/app/page";
import Image from "next/image";

function Normal() {
  return (
    <div>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/dashboard/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        Alice Starter
      </span>
    </div>
  );
}

function Aura() {
  return (
    <div>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/dashboard/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        <span className="font-medium">Pion Pro:</span>{" "}
        <span className="text-[#6A3805]  font-semibold">bronze</span>
      </span>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/dashboard/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        <span className="font-medium">Pion Master:</span>
        <span className=" text-[#989898] font-semibold">Silver</span>
      </span>
    </div>
  );
}

export default function NormalVerificationCard({
  isActive,
  title,
  data,
  onClick,
  children,
  disable,
}) {
  return (
    <div
      className={` ${disable && "opacity-50"} ${
        isActive ? "bg-pacificBlue/30" : "bg-primary13"
      } w-full grid grid-cols-1 rounded-[10px] min-h-[116px] content-between py-2 px-4`}
    >
      <h5 className="text-[#323245] font-medium	">{title}</h5>
      <div className="w-full flex justify-between items-end">
        <div>
          <h5>Tier(s) authorization:</h5>
          {data ? <Aura></Aura> : <Normal></Normal>}
        </div>
        {children ? (
          children
        ) : (
          <LightBtn
            disable={disable}
            textColor={isActive ? "text-white" : ""}
            bgColor={isActive ? "bg-pacificBlue" : ""}
            onClick={onClick}
          >
            {isActive ? "Verification passed!" : "Pass verification"}
          </LightBtn>
        )}
      </div>
    </div>
  );
}
