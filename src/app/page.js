import CardInfo from "@/components/dashboard/cardInfo";
import TopBanner from "@/components/dashboard/topBanner";
import NodeUpTime from "@/components/dashboard/nodeUpTime";
import StakeMore from "@/components/dashboard/stakeMore";
import Withdraw from "@/components/dashboard/withdraw";

export function LightBtn({ children }) {
  return (
    <button
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      class="inline-block rounded-[8px] bg-primary13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30"
    >
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <TopBanner></TopBanner>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <CardInfo title="IP Adress" data="0"></CardInfo>
        <CardInfo title="Node ID" data="1"></CardInfo>
        <CardInfo title="Node Address" data="2"></CardInfo>
        <CardInfo title="Peer ID" data="3"></CardInfo>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <NodeUpTime></NodeUpTime>
        <StakeMore></StakeMore>
        <Withdraw></Withdraw>
      </div>
    </div>
  );
}
