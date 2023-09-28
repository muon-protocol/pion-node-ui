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
        <span className="text-[#EAA661]  font-semibold ml-1">bronze</span>
      </span>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/dashboard/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        <span className="font-medium">Pion Master:</span>
        <span className=" text-[#CBDEEB] font-semibold ml-1">Silver</span>
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
        isActive ? "bg-pacificBlue/30" : "bg-cardBackground/50"
      } w-full grid grid-cols-1 rounded-[10px] min-h-[116px] content-between py-2 px-4`}
    >
      <h5 className=" font-medium	">{title}</h5>
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
            btnDisabeld={isActive}
            textColor={isActive ? "text-white" : ""}
            bgColor={isActive ? "bg-uptime" : ""}
            onClick={onClick}
          >
            {isActive ? "Verification passed!" : "Pass verification"}
          </LightBtn>
        )}
      </div>
    </div>
  );
}
