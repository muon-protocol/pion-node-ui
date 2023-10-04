import fetchRewardData from "@/utils/fetchRewardData";
import { useSelector } from "react-redux";
import contractABI from "@/jsons/abi.json";
import { styled } from "styled-components";
import {
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

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

  const { config, error } = usePrepareContractWrite({
    address: "0xd788C2276A6f75a8B9360E9695028329C925b0AB",
    abi: contractABI,
    functionName: "getReward",
    chainId: 97,
    args: [
      "1668383488053202200",
      "30538104646955362",
      "0xda1ab82da58f941e865b5bcb01cb76b7375057e31b11163c66999c78bce57dc9",
      [
        "256",
        "0x9300E7F37F5Ed9133844e57cD88d7fD2FF6D769b",
        "0x8d5B475B765243BF1ef1B11Caf3d10A1002722f8",
      ],
    ],
  });
  const { write } = useContractWrite({
    address: "0xd788C2276A6f75a8B9360E9695028329C925b0AB",
    abi: contractABI,
    functionName: "getReward",
    chainId: 97,
    args: [
      "1668383488053202200",
      "30538104646955362",
      "0xda1ab82da58f941e865b5bcb01cb76b7375057e31b11163c66999c78bce57dc9",
      [
        "256",
        "0x9300E7F37F5Ed9133844e57cD88d7fD2FF6D769b",
        "0x8d5B475B765243BF1ef1B11Caf3d10A1002722f8",
      ],
    ],
  });

  const disable = true;
  return (
    <OrangeCard className=" w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>{selector.reward} ALICE</b>
      </div>
      {/* {error && error.message} */}
      <div className="w-full flex justify-end">
        <button
          onClick={async () => {
            fetchRewardData(address, blockNumber).then((response) => {
              write();
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
