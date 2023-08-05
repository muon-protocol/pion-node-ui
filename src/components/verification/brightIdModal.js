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

function Step1({ setBrightIdStep }) {
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <span>Step 1:</span>{" "}
          <p className="ml-2">Download BrightID app and create an account</p>
        </div>
        <div className="flex justify-center mx-auto mt-10">
          <a
            class="mx-2"
            href="https://play.google.com/store/apps/details?id=org.brightid&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <Image
              width="162"
              height="48"
              alt="Get it on Google Play"
              src="/verification/googlePlay.svg"
            />
          </a>
          <a
            class="mx-2"
            href="https://play.google.com/store/apps/details?id=org.brightid"
          >
            <Image
              width="162"
              height="48"
              alt="Get it on Google Play"
              src="/verification/appStore.svg"
            />
          </a>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <p>
          Need help? check our <a> step-by-step guide</a>
        </p>
        <button onClick={() => setBrightIdStep(2)} className="w-full">
          I have brightID account
        </button>
      </div>
    </div>
  );
}

function Step2({ setBrightIdStep }) {
  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <div className="w-[70px]">
            <span className="w-[70px]">Step 2:</span>
          </div>
          <div className="w-fit">
            <p className="ml-2">
              Join a verification party at
              <a target="_blank" href="https://meet.brightid.org">
                meet.brightid.org/
              </a>
              and choose from one of the scheduled meetings that fit your
              schedule. Once you've successfully participated in a meeting,
              you'll be granted the Meet Verification badge in your BrightID
              app.
            </p>
          </div>
        </div>
      </div>

      <div className="px-[60px] mt-20 flex flex-wrap justify-center">
        <div className="flex">
          <p>
            Please note, it typically takes about 1 hour to receive you badge
            after the meeting.
          </p>
        </div>
        <button onClick={() => setBrightIdStep(3)} className="w-full">
          I have Meet verification Badge
        </button>
      </div>
    </div>
  );
}

function Step3({ setBrightIdStep }) {
  const dispatch = useDispatch();

  const { address, isConnecting, isDisconnected } = useAccount();
  const staker = address;
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message:
      "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetErrorMessage());
      getBrightIdContextId(staker, data)
        .then((res) => {
          console.log(res);
          if (!res.data.success) {
            dispatch(
              setErrorMessage(ERRORCODE[res.data.errorCode]("BrightID"))
            );
            setBrightIdStep(6);
          } else {
            sponsorBrightIdRequest(staker).then((sponsorRes) => {
              console.log(sponsorRes);
              if (sponsorRes.data.success) {
                dispatch(setBrightIdContexId(res.data.result.contextId));
                setBrightIdStep(4);
                console.log("SUCCESS");
              } else {
                dispatch(
                  setErrorMessage(
                    ERRORCODE[sponsorRes.data.errorCode]("BrightID")
                  )
                );
                setBrightIdStep(6);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setErrorMessage(ERRORCODE["connection"]()));
          this.errorMessage = ERRORCODE["connection"]();
          setBrightIdStep(6);
        });
    }
  }, [isSuccess]);

  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <span>Step 3:</span>
          <p className="ml-2">Please verify your staking address</p>
        </div>
        <div className="w-full flex justify-center">
          <ConnectButton></ConnectButton>
        </div>
      </div>

      <div className="px-[60px] mt-20 flex justify-center">
        <button onClick={() => signMessage()} className="w-full">
          Verify Address
        </button>
      </div>
    </div>
  );
}

function Step4({ setBrightIdStep }) {
  const dispatch = useDispatch();

  dispatch(resetErrorMessage());
  const { address, isConnecting, isDisconnected } = useAccount();
  const staker = address;
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const [brightidTryed, setBrightidTryed] = useState(0);
  const brigthReq = () => {
    dispatch(resetErrorMessage());

    checkBrightIdConnection(staker)
      .then((res) => {
        const response = res.data;
        console.log(res);
        if (
          response.success &&
          (response.result.brightidAuraVerified ||
            response.result.brightidMeetsVerified)
        ) {
          dispatch(
            setBrightidAuraVerified(response.result.brightidMeetsVerified)
          );
          dispatch(
            setBrightidMeetsVerified(response.result.brightidAuraVerified)
          );
          window.clearInterval(selector.interval);
          setBrightIdStep(5);
        } else if (!response.success && response.errorCode) {
          dispatch(setErrorMessage(ERRORCODE[response.errorCode]("BrightID")));
          setBrightIdStep(6);
          window.clearInterval(selector.interval);
        } else {
          setBrightidTryed(brightidTryed + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = ERRORCODE["connection"]();
      })
      .finally(() => {
        if (this.brightidTryed > 12 * 3) {
          setBrightIdStep(6);
          window.clearInterval(selector.interval);
        }
      });
  };

  const verifyLink = () => {
    setBrightidTryed(0);
    const brighitIdIntervalRequest = window.setInterval(brigthReq, 5000);
    dispatch(setMyInterval(brighitIdIntervalRequest));
  };

  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <div className="flex mt-10">
          <span className="w-[60px]">Step 4:</span>
          <p className="ml-2 w-fit">Open app and scan the QR Code below</p>
        </div>
        <div className="mx-auto mt-6">
          <QRCode value={selector.brightidContexId} size={150}></QRCode>
        </div>
        <div className="flex mt-10">
          <span className="w-[60px]">Step 5:</span>
          <p className="ml-2 w-fit">
            After scanning the QR code, wait until you the "Successfully linked"
            message in the app. next, click on the 'Verify Link' button. This
            confirms the connection between your BrightID and Alice, completing
            the linking process.
          </p>
        </div>
      </div>

      <div className="px-[60px] mt-20 flex justify-center">
        <button onClick={() => verifyLink()} className="w-full">
          Verify Link
        </button>
      </div>
    </div>
  );
}

function Step5() {
  const selector = useSelector();
  return (
    <>
      <div>
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
      </div>
      <p className="px-10 text-center mt-10">
        Congratulations! You've passed the BrightID meet verification. You now
        have the access to run Alice Starter node.
      </p>
      <button
        class={`inline-block mt-10 rounded-[8px] bg-primary13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
        data-te-modal-dismiss
        aria-label="Close"
      >
        Back to verification center
      </button>
    </>
  );
}

function Step6() {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  return (
    <>
      <div>
        <div className="relative">
          <Image
            className=""
            src={`/verification/BrightId.svg`}
            width="90"
            height="81"
          ></Image>

          <Image
            className={`absolute ${Style.child_telegram}`}
            src={`/verification/Rejected.svg`}
            width="20"
            height="20"
          ></Image>
        </div>
      </div>
      <p className="px-10 text-center mt-10">
        Sorry, your verification process was unsuccessful. <br />
        {selector.errorMessage}
      </p>
      <button
        class={`inline-block mt-10 rounded-[8px] bg-primary13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
        data-te-modal-dismiss
        aria-label="Close"
      >
        Back to verification center
      </button>
    </>
  );
}

export default function BrightIdModal({ isActive }) {
  const [brightIdStep, setBrightIdStep] = useState(6);
  useEffect(() => {
    const myModalEl = document.getElementById("brightidModal");
    myModalEl.addEventListener("hidden.te.modal", (e) => {
      setBrightIdStep(1);
    });
  });
  useEffect(() => {
    const init = async () => {
      const { Collapse, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Modal, Ripple });
    };
    init();
  }, []);
  return (
    <div className="flex">
      <button
        className={`flex  ${
          isActive ? "bg-pacificBlue text-white" : "bg-primary13"
        }  rounded-[8px] px-2 py-1`}
        onClick={() => {
          if (isSameWallet) {
            router.push("/verification");
          }
        }}
        data-te-toggle="modal"
        data-te-target="#brightidModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Pass verification
      </button>
      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="brightidModal"
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
                BrightID Meet verification
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
            <div class="flex flex-wrap w-full justify-center py-4 px-6">
              {brightIdStep === 1 && (
                <Step1 setBrightIdStep={setBrightIdStep}></Step1>
              )}
              {brightIdStep === 2 && (
                <Step2 setBrightIdStep={setBrightIdStep}></Step2>
              )}
              {brightIdStep === 3 && (
                <Step3 setBrightIdStep={setBrightIdStep}></Step3>
              )}
              {brightIdStep === 4 && (
                <Step4 setBrightIdStep={setBrightIdStep}></Step4>
              )}
              {brightIdStep === 5 && (
                <Step5 setBrightIdStep={setBrightIdStep}></Step5>
              )}
              {brightIdStep === 6 && (
                <Step6 setBrightIdStep={setBrightIdStep}></Step6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
