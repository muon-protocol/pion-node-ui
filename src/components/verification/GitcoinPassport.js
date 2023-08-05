"use client";
import {
  resetErrorMessage,
  setBrightIdContexId,
  setBrightidAuraVerified,
  setBrightidMeetsVerified,
  setErrorMessage,
  setMyInterval,
  setTelegramVerified,
} from "@/redux/features/verification";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import {
  checkBrightIdConnection,
  getBrightIdContextId,
  gitCoinMessage,
  sponsorBrightIdRequest,
  telegramVerification,
} from "@/utils/requestVerifications";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TelegramLoginButton from "react-telegram-login";
import { useAccount, useSignMessage } from "wagmi";
import Style from "@/app/verification/presale/style.module.css";
import { LightBtn } from "@/app/page";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import QRCode from "react-qr-code";
import { BackToVerificationBtn } from "@/app/verification/presale/[walletAddress]/page";

function Step1({ setGitCoinStep }) {
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/verification/gitcoin.svg"
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

function Step2({ setGitCoinStep, staker }) {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const dispatch = useDispatch();
  const gitCoinVerify = (staker) => {
    dispatch(resetErrorMessage());
    gitCoinMessage()
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const signer = useDashboardStore().account;
          singMessage(response.result.message, signer)
            .then((signRes) => {
              gitCoinVerification(
                staker,
                signer,
                signRes,
                response.result.nonce
              )
                .then((gitCoinVerificationResponse) => {
                  const resData = gitCoinVerificationResponse.data;
                  if (resData.success) {
                    this.gitcoinStep = 3;
                    this.verifications.gitcoinPassportVerified = true;
                  } else {
                    this.gitCoinErrorMsg =
                      ERRORCODE[resData.errorCode]("Gitcoin");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
                });
            })
            .catch((error) => {
              console.log(error);
              this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
            });
        } else {
          this.gitCoinErrorMsg = ERRORCODE[response.errorCode]("Gitcoin");
        }
      })
      .catch((error) => {
        console.log(error);
        this.gitCoinErrorMsg = ERRORCODE["connection"]("Gitcoin");
      })
      .finally(() => {
        this.gitCoinLoading = false;
      });
  };
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/verification/gitcoin.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <span className="w-[60px]">Step 2:</span>
          <p className="ml-2 w-fit">
            Select the address used in your Gitcoin Passport, then click 'Verify
            Score' to check your eligibily
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
          <button onClick={() => setGitCoinStep(3)} className="">
            Verify score
          </button>
        </div>
      </div>
    </div>
  );
}

function Step3({ setGitCoinStep }) {
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <div className="relative">
          <Image
            className=""
            src={`/verification/BrightId.svg`}
            width="90"
            height="81"
          ></Image>

          <Image
            className={`absolute ${Style.child_telegram}`}
            src={`/verification/Success.svg`}
            width="20"
            height="20"
          ></Image>
        </div>

        <div className="flex mt-10">
          <p className="ml-2 w-fit">
            Congratulations! You've passed the Gitcoin Passport verification.
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
      <div class="flex flex-wrap w-full justify-center py-4 px-6">
        {gitCoinStep === 1 && <Step1 setGitCoinStep={setGitCoinStep}></Step1>}
        {gitCoinStep === 2 && (
          <Step2 staker={staker} setGitCoinStep={setGitCoinStep}></Step2>
        )}
        {gitCoinStep === 3 && <Step3 setGitCoinStep={setGitCoinStep}></Step3>}
      </div>
    </div>
  );
  return (
    <div className="flex">
      <button
        className="flex bg-primary13 rounded-[8px] px-2 py-1"
        onClick={() => {
          if (isSameWallet) {
            router.push("/verification");
          }
        }}
        data-te-toggle="modal"
        data-te-target="#gitcoinModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Pass verification
      </button>
      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="gitcoinModal"
        tabindex="-1"
        aria-labelledby="brightidTitle"
        aria-modal="true"
        role="true"
      >
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] transform-none opacity-100"
        >
          <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md  p-4">
              {/* <!--Modal title--> */}
              <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                Gitcoin passport verification
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!--Modal body--> */}
          </div>
        </div>
      </div>
    </div>
  );
}
