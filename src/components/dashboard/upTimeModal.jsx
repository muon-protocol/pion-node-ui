"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UpTimesModal() {
  useEffect(() => {
    const init = async () => {
      const { Collapse, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Modal, Ripple });
    };
    init();
  }, []);
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  return (
    <>
      <button
        className="inline-block rounded-[8px] bg-primaryL3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-[#4D3E9E] transition duration-150 ease-in-out hover:bg-primary-20  active:bg-primary/30"
        data-te-toggle="modal"
        data-te-target="#exampleModalCenter"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Details
      </button>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full max-h-[600px] w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[800px] "
        >
          <div className="text-black pointer-events-auto relative flex w-full flex-col rounded-[18px] border-none bg-[#ECEDFF] bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-[18px] border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel"
              >
                Node Details
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <Image
                  src="/dashboard/dashboard/close-x.svg"
                  width="20"
                  height="20"
                ></Image>
              </button>
            </div>

            <div className="text-black relative py-4 px-8 flex justify-between">
              <p>Join at</p>
              <p>{selector.startTime}</p>
            </div>
            <div id="accordionExample">
              <div className="rounded-[18px]  border border-neutral-200 bg-[#ECEDFF] dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="headingOne">
                  <button
                    className="group relative flex justify-between w-full items-center rounded-none border-0 bg-[#ECEDFF] px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-[#ECEDFF] [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                    type="button"
                    data-te-collapse-init
                    data-te-collapse-collapsed
                    data-te-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Down times
                    <div className="flex rounded-[18px] ">
                      <span>
                        {selector.downNodeTimes.length &&
                          selector.downNodeTimes.length}{" "}
                        time(s)
                      </span>
                      <span className="mr-1 ml-auto h-5  shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
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
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="!visible hidden"
                  data-te-collapse-item
                  aria-labelledby="headingOne"
                  data-te-parent="#accordionExample"
                >
                  <div className="text-black px-5 py-4 max-h-[300px] overflow-y-auto">
                    {selector.downNodeTimes.map((downTime, i) => (
                      <p key={i}>{downTime}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
