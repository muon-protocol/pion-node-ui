import { addressToShort } from "@/utils/showAddress";
import Image from "next/image";

export default function CardInfo(props) {
  const Title = props.title;
  const Data = props.data;
  return (
    <div className="w-full grid grid-cols-1 bg-cardBackground/50 rounded-[10px] min-h-[116px] content-between py-2 px-4">
      <h5 className="text-primaryText">{Title}</h5>
      <div className="w-full flex justify-end">
        <span className="mr-2 font-Montserrat text-primaryText">
          {Data && Data.length > 18 ? addressToShort(Data) : Data}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(Data);
          }}
        >
          <Image
            src="/pion/dashboard/dashboard/copy-icon.svg"
            width="24"
            height="24"
          ></Image>
        </button>
      </div>
    </div>
  );
}
