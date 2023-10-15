"use client";
import Image from "next/image";
import styles from "@/app/style.module.css";
import { useAccount, useSignMessage } from "wagmi";
import { preSaleRequest } from "@/utils/requestVerifications";
import { useEffect, useState } from "react";
import {
  resetErrorMessage,
  setErrorMessage,
  setPresaleVerified,
} from "@/redux/features/verification";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import { useDispatch, useSelector } from "react-redux";
import { BackToVerificationBtn } from "@/app/presale/page";
import { LightBtn } from "@/app/page";
import { useSearchParams } from "next/navigation";
import { CustomConnectButton } from "../layout/CustomConnectButton";
import { SubmitTier } from "@/app/verification/page";

function PrimaryBtn({ children, onClick }) {
  return (
    <button
      className="bg-myPrimary hover:bg-myPrimary text-white rounded-[8px] px-4 pb-2 pt-2.5 font-medium  leading-normal transition duration-150 ease-in-out   active:bg-muPrimary/30"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Step1({ setStep }) {
  const { address } = useAccount();

  const searchParams = useSearchParams();
  const staker = searchParams.get("staker");

  const dispatch = useDispatch();
  const { data, isSuccess, signMessage } = useSignMessage({
    message:
      "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
  });

  useEffect(() => {
    if (isSuccess) {
      preSaleRequest(staker, address, data)
        .then((res) => {
          dispatch(resetErrorMessage());
          if (res.data.success) {
            setStep(2);
            dispatch(setPresaleVerified(true));
          } else {
            dispatch(setErrorMessage(ERRORCODE[res.data.errorCode]("presale")));
            setStep(3);
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setErrorMessage(ERRORCODE["connection"]()));
          setStep(3);
        });
    }
  }, [isSuccess]);
  return (
    <div>
      <p className="mt-12 text-center text-lg">
        select the address you used for the presale. Then use the &quot;Verify
        Address&quot; button to verify the ownership of the address.
      </p>
      <div className="w-full mt-8 flex justify-center">
        <CustomConnectButton></CustomConnectButton>
      </div>
      <div className="w-full flex justify-center mt-8">
        <LightBtn onClick={() => signMessage()}>verify Address</LightBtn>
      </div>
    </div>
  );
}

function Step2({ needSubmitTier }) {
  return (
    <div>
      <p className="text-lg text-center mt-6">
        Congratulations! <br /> You passed Presale participants verification
        Your access granted to run Pion Starter node
      </p>
      {needSubmitTier && <SubmitTier></SubmitTier>}
      <BackToVerificationBtn className="mx-auto mt-14 py-2">
        Back to verification center
      </BackToVerificationBtn>
    </div>
  );
}

function Step3({ setStep }) {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  return (
    <div>
      <p className="mt-10 text-center text-lg">{selector.errorMessage}</p>

      <div className="flex justify-around mt-28">
        <BackToVerificationBtn className="text-primaryText font-medium">
          Back to verification center
        </BackToVerificationBtn>
        <LightBtn onClick={() => setStep(1)}>Try another address</LightBtn>
      </div>
    </div>
  );
}

export default function Presale({ needSubmitTier }) {
  const [step, setStep] = useState(1);
  return (
    <div className="w-[570px] mt-2 rounded-[18px] bg-formCardBackground min-h-[524px] px-8 py-4">
      <h2 className="text-lg font-medium">Muon Presale Participation</h2>
      <div className="mx-auto mt-14 relative w-fit ">
        <Image
          className=""
          src={`/dashboard/verification/wallet.svg`}
          width="90"
          height="81"
        ></Image>
        {step === 2 && (
          <Image
            className={`absolute ${styles.child_image}`}
            src={`/dashboard/verification/Success.svg`}
            width="20"
            height="50"
          ></Image>
        )}
        {step === 3 && (
          <Image
            className={`absolute ${styles.child_image}`}
            src={`/dashboard/verification/Rejected.svg`}
            width="20"
            height="50"
          ></Image>
        )}
      </div>
      {step === 1 && <Step1 setStep={setStep}></Step1>}
      {step === 2 && <Step2 needSubmitTier={needSubmitTier}></Step2>}
      {step === 3 && <Step3 setStep={setStep}></Step3>}
    </div>
  );
}
