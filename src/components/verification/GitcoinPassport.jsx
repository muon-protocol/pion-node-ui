"use client";
import Image from "next/image";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "@/app/verification/presale/style.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BackToVerificationBtn } from "@/app/verification/presale/[walletAddress]/page";
import { gitcoinMessage, gitcoinVerification } from "@/utils/requestVerifications";
import { resetErrorMessage, setErrorMessage, setGitcoinPassportVerified } from "@/redux/features/verification";
import { useAccount, useSignMessage } from "wagmi";
import { ErrorBox, WarningBox } from "@/app/verification/page";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import { useParams } from "next/navigation";

function Step1({ setGitCoinStep }) {
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/dashboard/verification/gitcoin.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <span className="min-w-max text-lg font-semibold">Step 1:</span>
          <p className="ml-2 text-lg ">
            Head over to passport.gitcoin.co and follow the provided
            instructions. Achieving a score of 15 or above is necessary to pass
            the verification.
          </p>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div>
          <WarningBox>
            We recommend linking your Staking Address to your Gitcoin Passport
            for an optimal verification experience.
          </WarningBox>
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => setGitCoinStep(2)} className="px-8 bg-myPrimary text-white text-xl font-semibold rounded-xl py-2 mt-2">
            Next step
          </button>
        </div>
      </div>
    </div>
  );
}

function Step2({ setGitCoinStep  }) {
  const dispatch = useDispatch();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const staker = useParams().walletAddress
  const [messageForSign, setMessageForSign] = useState("");
  const [nonce, setNonce] = useState("");
  const {address:signer} = useAccount();
  const { signMessage } = useSignMessage({
    message: messageForSign,
    onSuccess(signature) {
      gitcoinVerification(staker,signer,signature,nonce).then((gitcoinVerificationResponse) => {
          const resData = gitcoinVerificationResponse.data;
          if (resData.success) {
            setGitCoinStep(3)
            dispatch(setGitcoinPassportVerified(true))
          } else {
              dispatch(setErrorMessage(ERRORCODE[resData.errorCode]("Gitcoin")));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setErrorMessage(ERRORCODE["connection"]("Gitcoin")));
        });
    }
  });

  useEffect(() => {
    if (messageForSign) {
      signMessage()
    }
  }, [messageForSign]);



  const gitcoinVerify = () => {
    dispatch(resetErrorMessage());
    gitcoinMessage()
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.success) {
          
          setMessageForSign(response.result.message)
          setNonce(response.result.nonce)
        } else {
          dispatch(setErrorMessage(ERRORCODE[response.errorCode]("Gitcoin")))
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrorMessage(ERRORCODE["connection"]("Gitcoin")));

      })
      .finally(() => {
      });
  };
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/dashboard/verification/gitcoin.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <span className="min-w-max text-lg font-semibold">Step 2:</span>
          <p className="ml-2 text-lg">
            Select the address used in your Gitcoin Passport, then click &apos;Verify
            Score&apos; to check your eligibily
          </p>
        </div>
        <div className="w-full flex justify-center mt-8">
          <ConnectButton></ConnectButton>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div>
          {selector.errorMessage && <ErrorBox>{selector.errorMessage}</ErrorBox>
          }
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => gitcoinVerify()} className="px-8 bg-myPrimary text-white text-xl font-semibold rounded-xl py-2 mt-2">
            Verify score
          </button>
        </div>
      </div>
    </div>
  );
}

function Step3() {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap justify-center">
        <div className="relative">
          <Image
            className=""
            src={`/dashboard/verification/gitcoin.svg`}
            width="90"
            height="81"
          ></Image>

          <Image
            className={`absolute ${Style.child_git_coin}`}
            src={`/dashboard/verification/Success.svg`}
            width="20"
            height="20"
          ></Image>
        </div>

        <div className="flex mt-10">
          <p className="ml-2 w-fit text-center text-lg">
            Congratulations! <br></br> You&apos;ve passed the Gitcoin Passport verification.
            You now have the access to run Alice Starter node.
          </p>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div className="w-full flex justify-center">
          <BackToVerificationBtn className="text-myPrimary">Back to verification center</BackToVerificationBtn>
        </div>
      </div>
    </div>
  );
}


export default function GitCoin({ staker }) {
  const [gitcoinStep, setGitCoinStep] = useState(1);
  return (
    <div className="w-[570px] mt-2 rounded-[18px] bg-white min-h-[524px] p-4">
      <div className="flex flex-wrap w-full justify-center py-4 px-6">
        {gitcoinStep === 1 && <Step1 setGitCoinStep={setGitCoinStep}></Step1>}
        {gitcoinStep === 2 && (
          <Step2 staker={staker} setGitCoinStep={setGitCoinStep}></Step2>
        )}
        {gitcoinStep === 3 && <Step3 setGitCoinStep={setGitCoinStep}></Step3>}
      </div>
    </div>
  );
  
}
