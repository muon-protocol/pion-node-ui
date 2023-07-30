"use client";
import NormalVerificationCard from "@/components/verification/normalVerificationCard";
import PassVerification from "@/components/verification/passVerification";
import TitleInfo from "@/components/verification/titleInfo";
import { fetchVerification } from "@/redux/features/verification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Verification() {
  const dispatch = useDispatch();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );

  useEffect(() => {
    dispatch(fetchVerification("0xF34e2737BD4A0162daA8e306A6fb379150902A74"));
  }, []);
  return (
    <div>
      {selector.fetchStatus}
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
