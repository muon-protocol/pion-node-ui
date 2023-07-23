import CardInfo from "@/components/dashboard/cardInfo";
import TopBanner from "@/components/dashboard/topBanner";
import Image from "next/image";

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
      <div className="grid grid-cols-3 gap-4 mt-8"></div>
    </div>
  );
}
