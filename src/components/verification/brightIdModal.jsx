"use client";
import {
  incBrightIdTryed,
  resetBrightIdTryed,
  resetErrorMessage,
  setBrightIdContexId,
  setBrightidAuraVerified,
  setBrightidMeetsVerified,
  setErrorMessage,
  setMyInterval,
} from "@/redux/features/verification";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import {
  checkBrightIdConnection,
  getBrightIdContextId,
  sponsorBrightIdRequest,
} from "@/utils/requestVerifications";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
import Style from "@/app/style.module.css";
import QRCode from "react-qr-code";
import { WarningBox } from "@/app/verification/page";
import { CustomConnectButton } from "../layout/CustomConnectButton";
import PrimaryBtn from "../layout/PrimaryBtn";
import { LightBtn } from "@/app/page";

function Step1({ setBrightIdStep }) {
  const dispatch = useDispatch();
  dispatch(resetBrightIdTryed());
  return (
    <div className="grid content-between pb-4 ">
      <div className="flex flex-wrap">
        <Image
          width="100"
          height="100"
          src="/dashboard/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10 ">
          <span className="text-lg font-semibold">Step 1:</span>
          <p className="ml-2">Download BrightID app and create an account</p>
        </div>
        <div className="flex justify-center mx-auto mt-10">
          <a
            className="mx-2"
            href="https://play.google.com/store/apps/details?id=org.brightid&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <Image
              width="162"
              height="48"
              alt="Get it on Google Play"
              src="/dashboard/verification/googlePlay.svg"
            />
          </a>
          <a
            className="mx-2"
            href="https://play.google.com/store/apps/details?id=org.brightid"
          >
            <Image
              width="162"
              height="48"
              alt="Get it on Google Play"
              src="/dashboard/verification/appStore.svg"
            />
          </a>
        </div>
      </div>

      <div className="px-[60px] mt-20">
        <p>
          Need help? check our{" "}
          <a className="underline text-myPrimary hover:cursor-pointer">
            {" "}
            step-by-step guide
          </a>
        </p>
        <button
          onClick={() => setBrightIdStep(2)}
          className="w-full bg-primaryMain text-primaryText  text-xl font-semibold rounded-xl py-2 mt-2 "
        >
          I Have BrightID Account
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
          src="/dashboard/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <div className="w-fit">
            <span className="text-lg font-semibold">Step&nbsp;2:</span>
          </div>
          <div className="">
            <p className="ml-2 text-lg">
              Join a verification party at &nbsp;
              <a
                className="underline"
                target="_blank"
                href="https://meet.brightid.org"
                rel="noreferrer"
              >
                meet.brightid.org/
              </a>{" "}
              &nbsp; and choose from one of the scheduled meetings that fit your
              schedule. Once you&apos;ve successfully participated in a meeting,
              you&apos;ll be granted the Meet Verification badge in your
              BrightID app.
            </p>
          </div>
        </div>
      </div>

      <div className="px-[60px] mt-20 flex flex-wrap justify-center">
        <div className="flex">
          <WarningBox>
            Please note, it typically takes about 1 hour to receive you badge
            after the meeting.
          </WarningBox>
        </div>
        <button
          onClick={() => setBrightIdStep(3)}
          className="w-full bg-primaryMain text-primaryText  text-xl font-semibold rounded-xl py-2 mt-2"
        >
          I have Meet verification Badge
        </button>
      </div>
    </div>
  );
}

function Step3({ setBrightIdStep }) {
  const dispatch = useDispatch();

  const { address } = useAccount();
  const staker = address;
  const { data, isSuccess, signMessage } = useSignMessage({
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
          src="/dashboard/verification/BrightId.svg"
          className="mx-auto"
        ></Image>

        <div className="flex mt-10">
          <div className="w-fit">
            <span className="text-lg font-semibold">Step 3:</span>
          </div>
          <div className="w-fit">
            <p className="ml-2 text-lg">
              Please verify your staking address app.
            </p>
          </div>
        </div>
        {/* <div className="flex mt-10">
          <span>Step 3:</span>
          <p className="ml-2">Please verify your staking address</p>
        </div> */}
        <div className="w-full flex justify-center mt-8">
          <CustomConnectButton></CustomConnectButton>
        </div>
      </div>

      <div className="px-[60px] mt-20 flex justify-center">
        <button
          onClick={() => signMessage()}
          className="w-full bg-primaryMain text-primaryText  text-xl font-semibold rounded-xl py-2 mt-2"
        >
          Verify Address
        </button>
      </div>
    </div>
  );
}

function Step4({ setBrightIdStep }) {
  const dispatch = useDispatch();
  dispatch(resetErrorMessage());
  const { address } = useAccount();
  const staker = address;
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const brightidTryed = useSelector(
    (state) => state.rootReducer.verificationReducer.brightIdTryed
  );
  console.log(brightidTryed);

  useEffect(() => {
    if (brightidTryed) {
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
              setBrightidAuraVerified(response.result.brightidAuraVerified)
            );
            dispatch(
              setBrightidMeetsVerified(response.result.brightidMeetsVerified)
            );
            setBrightIdStep(5);
          } else if (!response.success && response.errorCode) {
            dispatch(
              setErrorMessage(ERRORCODE[response.errorCode]("BrightID"))
            );
            setBrightIdStep(6);
          } else {
            setTimeout(() => {
              dispatch(incBrightIdTryed(brightidTryed + 1));
            }, 5000);
            console.log("plus");
            console.log(brightidTryed);
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setErrorMessage(ERRORCODE["connection"]()));
        })
        .finally(() => {
          console.log(brightidTryed);
          if (brightidTryed > 12 * 3) {
            setBrightIdStep(6);
          }
        });
    }
  }, [brightidTryed]);

  const verifyLink = () => {
    dispatch(resetBrightIdTryed());
    dispatch(resetErrorMessage());
    dispatch(incBrightIdTryed(brightidTryed + 1));
  };

  return (
    <div className="grid content-between pb-4">
      <div className="flex flex-wrap">
        <div className="flex mt-10">
          <span className="min-w-max text-lg font-semibold">Step 4:</span>
          <p className="ml-2 text-lg">Open app and scan the QR Code below</p>
        </div>
        <div className="mx-auto mt-6">
          <QRCode
            value={`brightid://link-verification/http:%2F%2Fbrightid2.idealmoney.io/Muon/${selector.brightidContexId}`}
            size={150}
          ></QRCode>
        </div>
        <div className="flex mt-10">
          <span className="min-w-max text-lg font-semibold">Step 5:</span>
          <p className="ml-2 text-lg">
            After scanning the QR code, wait until you the &quot;Successfully
            linked&quot; message in the app. next, click on the &apos;Verify
            Link&apos; button. This confirms the connection between your
            BrightID and Alice, completing the linking process.
          </p>
        </div>
      </div>

      <div className="px-[60px] mt-8 flex justify-center">
        <button
          onClick={() => verifyLink()}
          className="px-8 bg-primaryMain text-primaryText  text-xl font-semibold rounded-xl py-2 mt-2"
        >
          Verify Link
        </button>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <>
      <div>
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
      </div>
      <p className="px-10 text-center mt-10">
        Congratulations! You&apos;ve passed the BrightID meet verification. You
        now have the access to run Alice Starter node.
      </p>
      <button
        className={`inline-block mt-10 rounded-[8px] bg-primary/13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
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
            src={`/dashboard/verification/BrightId.svg`}
            width="90"
            height="81"
          ></Image>

          <Image
            className={`absolute ${Style.child_telegram}`}
            src={`/dashboard/verification/Rejected.svg`}
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
        className={`inline-block mt-10 rounded-[8px] bg-primary/13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
        data-te-modal-dismiss
        aria-label="Close"
      >
        Back to verification center
      </button>
    </>
  );
}

export default function BrightIdModal({ isActive }) {
  const [brightIdStep, setBrightIdStep] = useState(1);
  useEffect(() => {
    const myModalEl = document.getElementById("brightidModal");
    myModalEl.addEventListener("hidden.te.modal", () => {
      setBrightIdStep(1);
    });
  });
  // useEffect(() => {
  //   const init = async () => {
  //     const { Collapse, Modal, Ripple, initTE } = await import("tw-elements");
  //     initTE({ Collapse, Modal, Ripple });
  //   };
  //   init();
  // }, []);
  return (
    <div className="flex">
      {/* <button
        className={`flex  ${
          isActive
            ? "bg-pacificBlue text-white"
            : "bg-primary/13 text-primary hover:bg-primary-20 active:bg-primary-50"
        }  rounded-[8px]  py-1 px-4 pb-2 pt-2.5 font-medium`}
        data-te-toggle="modal"
        data-te-target="#brightidModal"
      >
        {isActive ? "Verification passed!" : "Pass verification"}
      </button> */}
      <LightBtn
        btnDisabeld={isActive}
        bgColor={isActive ? "bg-uptime" : ""}
        dataTeToggle="modal"
        dataTeTarget="#brightidModal"
      >
        {isActive ? "Verification passed!" : "Pass verification"}
      </LightBtn>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="brightidModal"
        tabIndex="-1"
        aria-labelledby="brightidTitle"
        aria-modal="true"
        role="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] transform-none opacity-100"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-[18px] border-none bg-[#ECEDFF] bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-[18px]  p-4">
              {/* <!--Modal title--> */}
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                BrightID Meet verification
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!--Modal body--> */}
            <div className="flex flex-wrap w-full justify-center py-4 px-6 text-black">
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
