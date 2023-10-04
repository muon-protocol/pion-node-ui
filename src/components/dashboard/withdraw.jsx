import fetchRewardData from "@/utils/fetchRewardData";
import { useSelector } from "react-redux";
import contractABI from "@/jsons/abi.json";
import { styled } from "styled-components";
import {
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useState } from "react";

const OrangeCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(217, 141, 81, 0.18) 0%,
    rgba(246, 81, 121, 0.18) 100%
  );
`;
export default function Withdraw({ address }) {
  const selector = useSelector((state) => state.rootReducer.nodeReducer);
  const { data: blockNumber } = useBlockNumber();
  const { write } = useContractWrite({
    address: "0xd788C2276A6f75a8B9360E9695028329C925b0AB",
    abi: contractABI,
    functionName: "getReward",
    chainId: 97,
    onError(error) {
      console.log("Error", error);
    },
  });

  const disable = false;
  return (
    <OrangeCard className=" w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>{selector.reward} ALICE</b>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={async () => {
            fetchRewardData(address, blockNumber).then((response) => {
              write({
                args: [
                  response.amount,
                  response.paidRewardPerToken,
                  response.reqId,
                  [response.signature, response.owner, response.nonce],
                ],
              });
            });
          }}
          disabled={disable}
          className={`inline-block rounded-[8px] bg-[#FEEFE9] text-[#f59569] px-6 pb-2 pt-2.5 text-sm font-medium leading-normal transition duration-150 ease-in-out ${
            disable
              ? "opacity-50"
              : " hover:bg-mysecondary/10  active:bg-mysecondary/30"
          }   }`}
        >
          Claim
        </button>
      </div>
    </OrangeCard>
  );
}
