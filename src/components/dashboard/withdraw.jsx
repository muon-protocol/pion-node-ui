import fetchRewardData from "@/utils/fetchRewardData";
import { useSelector } from "react-redux";
import contractABI from "@/jsons/abi.json";
import { styled } from "styled-components";
import { useBlockNumber, useContractWrite, useWaitForTransaction } from "wagmi";
import { Loading } from "../layout/Loading";
import { useEffect, useState } from "react";
import { contracts } from "@/app/page";

const Absolute = styled.div`
  position: absolute;
  bottom: -70px;
  right: -45px;
  width: 180px;
`;

function Btn({ onclick, loading }) {
  const disable = loading;
  return (
    <button
      onClick={onclick}
      disabled={disable}
      className={`relative min-w-[90px] min-h-[40px] inline-block rounded-[8px] bg-primaryL3 text-[#4D3E9E] px-6 pb-2 pt-2.5 text-sm font-medium leading-normal transition duration-150 ease-in-out ${
        disable
          ? "opacity-50"
          : " hover:bg-primaryL3/80  active:bg-primaryL3/30"
      }   }`}
    >
      {loading ? (
        <Absolute className="absolute ">
          <Loading></Loading>
        </Absolute>
      ) : (
        "Claim"
      )}
    </button>
  );
}
export default function Withdraw({ address, needSubmitTier }) {
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  const { data: blockNumber } = useBlockNumber();
  const [state, setstate] = useState(false);
  const contractAddresses = contracts();
  const {
    data: contractData,
    write: writeGetReward,
    isLoading: walletLoading,
  } = useContractWrite({
    address: contractAddresses.STAKING_CONTRACT,
    abi: contractABI,
    functionName: "getReward",
    onError(error) {},
  });
  const { isSuccess: trSuccess, isLoading: trLoading } = useWaitForTransaction({
    hash: contractData?.hash,
  });

  useEffect(() => {
    if (trSuccess) {
      location.reload();
    }
  }, [trSuccess]);
  return (
    <div className="relative overflow-hidden bg-cardBackground/50 w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>{selector.reward} PION</b>
      </div>
      <div className="w-full flex justify-end">
        <Btn
          onclick={async () => {
            setstate(true);
            fetchRewardData(address, blockNumber)
              .then((response) => {
                writeGetReward({
                  args: [
                    response.amount,
                    response.paidRewardPerToken,
                    response.reqId,
                    [response.signature, response.owner, response.nonce],
                  ],
                });
              })
              .finally(() => {
                setstate(false);
              });
          }}
          loading={walletLoading || state || trLoading}
        ></Btn>
      </div>
      {needSubmitTier && (
        <div className="absolute flex z-40 bg-gray/80 w-full h-full justify-center items-center px-4">
          <h4 className="text-xl text-center">
            Complete <b>Uniqueness Verification</b> to start earning
          </h4>
        </div>
      )}
    </div>
  );
}
