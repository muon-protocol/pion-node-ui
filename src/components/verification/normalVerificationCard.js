import { LightBtn } from "@/app/page";
import Image from "next/image";

function Normal() {
  return (
    <div>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/verification/Ellipse.svg"
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
          src="/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        Pion Pro: <span>bronze</span>
      </span>
      <span className="flex ml-4">
        <Image
          className="mr-2"
          src="/verification/Ellipse.svg"
          width="10"
          height="10"
        ></Image>
        Pion Pro: <span>Silver</span>
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
}) {
  return (
    <div
      className={` ${
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
            textColor={isActive ? "text-white" : ""}
            bgColor={isActive ? "bg-pacificBlue" : ""}
            onClick={onClick}
          >
            Pass verification
          </LightBtn>
        )}
      </div>
    </div>
  );
}
