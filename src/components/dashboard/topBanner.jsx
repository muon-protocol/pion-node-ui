"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LightBtn, contracts } from "@/app/page";
import contractABI from "@/jsons/tierAbi.json";
import { getTierSig } from "@/utils/requestVerifications";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSetTier } from "@/redux/features/verification";

function getFerificationNameFromTier(tier) {
  let level = "";
  switch (tier) {
    case 1:
      level = "1st";
      break;
    case 2:
      level = "2nd";
      break;
    case 3:
      level = "3rd";
      break;
    case 4:
      level = "4th";

    default:
      break;
  }
  return `Verified for ${level} Tier`;
}

export default function TopBanner({
  isVerify,

  needSubmitTier,
  needFillOutFrom,
  address,
}) {
  const dispatch = useDispatch();
  const [serverRequestLoading, setServerRequestLoading] = useState(false);
  const verificationData = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const contractsAddresses = contracts();
  const {
    data: contractData,
    write: writeSetTier,
    isLoading: walletLoading,
  } = useContractWrite({
    address: contractsAddresses.TIER_SETTER_CONTRACT,
    abi: contractABI,
    functionName: "setTier",
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
  useEffect(() => {
    if (trSuccess) {
      location.reload();
    }
  }, [trSuccess]);
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
              {isVerify
                ? getFerificationNameFromTier(verificationData.eligibleTier)
                : "Not Verified"}
            </h4>
          </div>
          {isVerify && needSubmitTier ? (
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
        // disable={needSubmitTier && isVerify}
        loading={walletLoading || trLoading || serverRequestLoading}
        className="mt-5 lg:mt-0 min-w-[176px]"
        onClick={() => {
          if (needFillOutFrom) {
            window.open("https://form.typeform.com/to/DRyzP0zw");
          } else if (needSubmitTier && isVerify) {
            getTierSig(address)
              .then((response) => {
                setServerRequestLoading(true);
                if (response.data.success) {
                  const data = response.data.result;
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
        {needSubmitTier && isVerify
          ? "Submit tier Update"
          : needFillOutFrom
          ? "Fill out the form"
          : "Go to verification center"}
      </LightBtn>
    </div>
  );
}
