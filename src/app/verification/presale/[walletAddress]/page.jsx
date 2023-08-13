"use client";
import Presale from "@/components/verification/presale";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { addressToShort } from "@/utils/showAddress";

export function BackToVerificationBtn({ params ,children,className }) {
  const router = useRouter();
  const { address } = useAccount();
  const staker = useParams().walletAddress;
  const [isSameWallet, setIsSameWallet] = useState(staker === address);

  useEffect(() => {
    setIsSameWallet(staker === address);
  }, [address]);
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
        className={`${className} flex content-center items-center bg-primary13 rounded-[8px] px-4 py-1`}
        onClick={(e) => {
          if (isSameWallet) {
            e.preventDefault()
            router.push("/verification");
          }
        }}
        data-te-toggle={isSameWallet ? "" : "modal"}
        data-te-target="#exampleModalCenter"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <Image
          src="/dashboard/verification/back-icon.svg"
          width="24"
          height="24"
        ></Image>
        {children}
      </button>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalCenter"
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
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md   p-4 ">
              {/* <!--Modal title--> */}
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
               
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
            <div className="relative px-4 pb-8 pt-4">
              <Image className="mx-auto" src="/dashboard/verification/switchWallet.svg" width="106" height="106"></Image>
              <p className="text-lg mx-auto text-center mt-4">To access your dashboard, please switch <br></br> back to your Staking Address ({addressToShort(staker)})</p>
            </div>

            {/* <!--Modal footer--> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PresalePage() {
  return (
    <div className="mx-auto w-[570px]">
      <div className="flex justify-end">
        <BackToVerificationBtn>Back to dashboard</BackToVerificationBtn>
      </div>
      <Presale></Presale>
    </div>
  );
}
