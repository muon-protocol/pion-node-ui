"use client";
// import {
//   resetErrorMessage,
// } from "@/redux/features/verification";
// import { ERRORCODE } from "@/utils/errorCodeMessage";
// import {
//   gitCoinMessage,
//   gitCoinVerification,
// } from "@/utils/requestVerifications";
import Image from "next/image";
import {  useState } from "react";
import { useSelector } from "react-redux";
import Style from "@/app/verification/presale/style.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BackToVerificationBtn } from "@/app/verification/presale/[walletAddress]/page";

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
          <span className="w-[60px]">Step 1:</span>
          <p className="ml-2 w-fit">
            Head over to passport.gitcoin.co and follow the provided
            instructions. Achieving a score of 15 or above is necessary to pass
            the verification.
          </p>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div>
          <p>
            We recommend linking your Staking Address to your Gitcoin Passport
            for an optimal verification experience.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => setGitCoinStep(2)} className="">
            Next step
          </button>
        </div>
      </div>
    </div>
  );
}

function Step2({ setGitCoinStep }) {
  // const selector = useSelector(
  //   (state) => state.rootReducer.verificationReducer
  // );
  // const dispatch = useDispatch();
  // const gitCoinVerify = (staker) => {
  //   dispatch(resetErrorMessage());
  //   gitCoinMessage()
  //     .then((res) => {
  //       const response = res.data;
  //       if (response.success) {
  //         const signer = useDashboardStore().account;
  //         singMessage(response.result.message, signer)
  //           .then((signRes) => {
  //             gitCoinVerification(
  //               staker,
  //               signer,
  //               signRes,
  //               response.result.nonce
  //             )
  //               .then((gitCoinVerificationResponse) => {
  //                 const resData = gitCoinVerificationResponse.data;
  //                 if (resData.success) {
  //                   this.gitcoinStep = 3;
  //                   this.verifications.gitcoinPassportVerified = true;
  //                 } else {
  //                   this.gitCoinErrorMsg =
  //                     ERRORCODE[resData.errorCode]("Gitcoin");
  //                 }
  //               })
  //               .catch((error) => {
  //                 console.log(error);
  //                 this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
  //               });
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
  //           });
  //       } else {
  //         this.gitCoinErrorMsg = ERRORCODE[response.errorCode]("Gitcoin");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
  //     })
  //     .finally(() => {
  //       this.gitCoinLoading = false;
  //     });
  // };
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
          <span className="w-[60px]">Step 2:</span>
          <p className="ml-2 w-fit">
            Select the address used in your Gitcoin Passport, then click &apos;Verify
            Score&apos; to check your eligibily
          </p>
        </div>
        <div>
          <ConnectButton></ConnectButton>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div>
          {/* <p>{selector.errorMessage}</p> */}
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => setGitCoinStep(3)} className="">
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
      <div className="flex flex-wrap">
        <div className="relative">
          <Image
            className=""
            src={`/dashboard/verification/BrightId.svg`}
            width="90"
            height="81"
          ></Image>

          <Image
            className={`absolute ${Style.child_telegram}`}
            src={`/dashboard/verification/Success.svg`}
            width="20"
            height="20"
          ></Image>
        </div>

        <div className="flex mt-10">
          <p className="ml-2 w-fit">
            Congratulations! You&apos;ve passed the Gitcoin Passport verification.
            You now have the access to run Alice Starter node.
          </p>
        </div>
        <div>
          <ConnectButton></ConnectButton>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <div>
          <p>{selector.errorMessage}</p>
        </div>
        <div className="w-full flex justify-center">
          <BackToVerificationBtn></BackToVerificationBtn>
        </div>
      </div>
    </div>
  );
}

export default function GitCoin({ staker }) {
  const [gitCoinStep, setGitCoinStep] = useState(1);
  return (
    <div className="w-[570px] mt-2 rounded-[18px] bg-white min-h-[524px] px-8 py-4">
      <div className="flex flex-wrap w-full justify-center py-4 px-6">
        {gitCoinStep === 1 && <Step1 setGitCoinStep={setGitCoinStep}></Step1>}
        {gitCoinStep === 2 && (
          <Step2 staker={staker} setGitCoinStep={setGitCoinStep}></Step2>
        )}
        {gitCoinStep === 3 && <Step3 setGitCoinStep={setGitCoinStep}></Step3>}
      </div>
    </div>
  );
  
}
