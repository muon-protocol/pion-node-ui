import fetchRewardData from "@/utils/fetchRewardData";
import { useSelector, useDispatch } from "react-redux";
import contractABI from "@/jsons/abi.json";
import { styled } from "styled-components";
import { useBlockNumber, useContractWrite, useWaitForTransaction } from "wagmi";
import { Loading } from "../layout/Loading";
import { useEffect, useState } from "react";
import { fetchNodeInfo } from "@/redux/features/nodeInfo";

const Absolute = styled.div`
  position: absolute;
  bottom: -70px;
  right: -50px;
  width: 180px;
`;

function Btn({ onclick, loading }) {
  const disable = loading;
  return (
    <button
      onClick={onclick}
      disabled={disable}
      className={`relative min-w-[80px] min-h-[40px] inline-block rounded-[8px] bg-[#FEEFE9] text-[#f59569] px-6 pb-2 pt-2.5 text-sm font-medium leading-normal transition duration-150 ease-in-outhover:bg-mysecondary/10  active:bg-mysecondary/30`}
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
  const [state, setstate] = useState(false);
  const {
    data: contractData,
    write,
    isLoading: walletLoading,
  } = useContractWrite({
    address: "0xd788C2276A6f75a8B9360E9695028329C925b0AB",
    abi: contractABI,
    functionName: "getReward",
    chainId: 97,
    onError(error) {
      console.log("Error", error);
    },
  });
  const { isSuccess: trSuccess, isLoading: trLoading } = useWaitForTransaction({
    hash: contractData?.hash,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (trSuccess) {
      dispatch(fetchNodeInfo(address));
    }
  }, [trSuccess]);
  return (
    <OrangeCard className=" w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>{selector.reward} ALICE</b>
      </div>
      <div className="w-full flex justify-end">
        <Btn
          onclick={async () => {
            setstate(true);
            fetchRewardData(address, blockNumber)
              .then((response) => {
                write({
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
    </OrangeCard>
  );
}
