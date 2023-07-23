import NormalVerificationCard from "@/components/verification/normalVerificationCard";
import PassVerification from "@/components/verification/passVerification";
import TitleInfo from "@/components/verification/titleInfo";
import Image from "next/image";

export default function Verification() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-2/3 mr-4">
          <TitleInfo></TitleInfo>
        </div>
        <div className="basis-1/3 ml-4">
          <PassVerification></PassVerification>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <NormalVerificationCard
          title="Muon Presale Participation"
          data={false}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="Active Community Member (Telegram)"
          data={false}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="Active Community Member (Discord)"
          data={false}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="BrightID Aura Verification"
          data={true}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="Muon Presale Participation"
          data={false}
        ></NormalVerificationCard>
        <NormalVerificationCard
          title="Gitcoin Passport"
          data={false}
        ></NormalVerificationCard>
      </div>
    </div>
  );
}
