"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LightBtn } from "@/app/page";
import contractABI from "@/jsons/tierAbi.json";
import { getTierSig } from "@/utils/requestVerifications";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSetTier } from "@/redux/features/verification";

export default function TopBanner({
  isVerify,
  privateSaleVerified,
  needSubmitTier,
  address,
}) {
  const dispatch = useDispatch();
  const [serverRequestLoading, setServerRequestLoading] = useState(false);
  const {
    data: contractData,
    write: writeSetTier,
    isLoading: walletLoading,
  } = useContractWrite({
    address: "0xF904Bf8eC671c548b6A8C69ABC27D65955E6472E",
    abi: contractABI,
    functionName: "setTier",
    chainId: 97,
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      dispatch(setIsSetTier(true));
    },
  });
  const { isSuccess: trSuccess, isLoading: trLoading } = useWaitForTransaction({
    hash: contractData?.hash,
  });
  const router = useRouter();
  return (
    <div
      className={`${
        isVerify && !needSubmitTier
          ? "bg-cardBackground/50"
          : "bg-helperWarning/20"
      } bg-cardBackground/50 grid grid-cols-1 lg:h-20 py-5 lg:py-0 w-full rounded-[10px] lg:flex items-center px-6 justify-between`}
    >
      <div className="flex flex-wrap items-center space-x-3">
        <div>
          {isVerify && !needSubmitTier ? (
            <Image
              src="/dashboard/dashboard/wallet-check.svg"
              width="43"
              height="43"
            ></Image>
          ) : (
            <Image
              width="30"
              height="20"
              src="/dashboard/verification/warrning-icon.svg"
            ></Image>
          )}
        </div>
        <div>
          <div className="flex flex-wrap">
            <span className="text-xl font-normal text-primaryText">
              Uniqueness Verification:
            </span>
            <h4 className="text-xl font-semibold text-primaryText ml-4">
              {privateSaleVerified
                ? "Verified for Master Node"
                : isVerify
                ? "Verified for Starter Node"
                : "Not Verified"}
            </h4>
          </div>
          {needSubmitTier ? (
            <p className="text-helperWarning">
              You haven't finalized your verification, Click ‘Submit Tier
              Update’ to start earning rewards
            </p>
          ) : !isVerify ? (
            <p className="text-helperWarning">
              You haven't passed any verification. Complete a verification to
              start earning!
            </p>
          ) : (
            ""
          )}
          {false}
        </div>
      </div>
      <LightBtn
        loading={walletLoading || trLoading || serverRequestLoading}
        className="mt-5 lg:mt-0 min-w-[176px]"
        onClick={() => {
          if (needSubmitTier) {
            getTierSig(address)
              .then((response) => {
                setServerRequestLoading(true);
                if (response.data.success) {
                  const data = response.data.result;
                  console.log(true);
                  writeSetTier({
                    args: [
                      data.stakerAddress,
                      data.tier,
                      data.timestamp,
                      data.signature,
                    ],
                  });
                }
              })
              .finally(() => {
                setServerRequestLoading(false);
              });
          } else {
            router.push("/verification");
          }
        }}
      >
        {needSubmitTier ? "Submit tier Update" : "Go to verification center"}
      </LightBtn>
    </div>
  );
}
