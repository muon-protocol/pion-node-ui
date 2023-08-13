import {
  resetErrorMessage,
  setErrorMessage,
  setTelegramVerified,
} from "@/redux/features/verification";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import { telegramVerification } from "@/utils/requestVerifications";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TelegramLoginButton from "react-telegram-login";
import { useAccount } from "wagmi";
import Style from "@/app/verification/presale/style.module.css";
import { useRouter } from "next/navigation";

function Step2() {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="relative">
          <Image
            className=""
            src={`/dashboard/verification/Telegram.svg`}
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
        Congratulations! You passed Telegram active community member
        verification Your access granted to run Alice Starter node
      </p>
      <button
        onClick={router.push("/verification")}
        className={`inline-block mt-10 rounded-[8px] bg-primary13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
        data-te-modal-dismiss
        aria-label="Close"
      >
        Back to verification center
      </button>
    </>
  );
}
function Step3() {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const router = useRouter();
  return (
    <>
      <div>
        <div className="relative">
          <Image
            className=""
            src={`/dashboard/verification/Telegram.svg`}
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
        Sorry, it looks like you haven&apos;t met our activity requirement. Please
        consider trying another verification method {selector.errorMessage}
      </p>
      <button
        onClick={router.push("/verification")}
        className={`inline-block mt-10 rounded-[8px] bg-primary13 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30`}
        data-te-modal-dismiss
        aria-label="Close"
      >
        Back to verification center
      </button>
    </>
  );
}

export default function TelegramModal({ isActive }) {
  const dispatch = useDispatch();
  const [telegramStep, setTelegramStep] = useState(1);
  const { address,  } = useAccount();
  const staker = address;
  const telegramCallbackFunction = (user) => {
    dispatch(resetErrorMessage());
    // gets user as an input
    // id, first_name, last_name, username,
    // photo_url, auth_date and hash
    console.log(user);
    telegramVerification(user, staker)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch(setTelegramVerified(true));
          setTelegramStep(2);
        } else {
          console.log(res.data.message);
          dispatch(setErrorMessage(ERRORCODE[res.data.errorCode]("Telegram")));
          setTelegramStep(3);
        }
      })
      .catch(() => {
        dispatch(setErrorMessage(ERRORCODE["connection"]()));
        setTelegramStep(3);
      });
  };
  useEffect(() => {
    const init = async () => {
      const { Collapse, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Modal, Ripple });
    };
    init();
  }, []);
  useEffect(() => {
    const myModalEl = document.getElementById("telegramModal");
    myModalEl.addEventListener("hidden.te.modal", () => {
      setTelegramStep(1);
    });
  });
  return (
    <div className="flex">
      <button
        className={`flex ${
          isActive ? "bg-pacificBlue text-white" : "bg-primary13"
        } rounded-[8px]  py-1 px-4 pb-2 pt-2.5 font-medium`}
        
        data-te-toggle="modal"
        data-te-target="#telegramModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {isActive ? "Verification passed!" : "Pass verification"}
      </button>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="telegramModal"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md  p-4">
              {/* <!--Modal title--> */}
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              ></h5>
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
            <div className="flex flex-wrap w-full justify-center py-4 px-6">
              {telegramStep === 1 && (
                <>
                  <div>
                    <Image
                      src={`/dashboard/verification/Login.svg`}
                      width="90"
                      height="94"
                    ></Image>
                  </div>
                  <div className="px-10 mt-14">
                    <p className="text-center">
                      Please log in to your Telegram account to evaluate your
                      activity status
                    </p>
                  </div>
                  <div>
                    <TelegramLoginButton
                      dataOnauth={telegramCallbackFunction}
                      botName="MuonV2Bot"
                    ></TelegramLoginButton>
                  </div>
                </>
              )}
              {telegramStep === 2 && <Step2></Step2>}
              {telegramStep === 3 && <Step3></Step3>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
