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

export default function NormalVerificationCard(props) {
  const Title = props.title;
  const Data = props.data;
  return (
    <div className="w-full grid grid-cols-1 bg-primary13 rounded-[10px] min-h-[116px] content-between py-2 px-4">
      <h5 className="text-[#6F7787]">{Title}</h5>
      <div className="w-full flex justify-between items-end">
        <div>
          <h5>Tier(s) authorization:</h5>
          {Data ? <Aura></Aura> : <Normal></Normal>}
        </div>
        <button>Pass verification</button>
      </div>
    </div>
  );
}
