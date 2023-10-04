import fetchRewardData from "@/utils/fetchRewardData";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { useBlockNumber } from "wagmi";

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
  const disable = true;
  return (
    <div className="bg-cardBackground/50 w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>{selector.reward} ALICE</b>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            fetchRewardData(address, blockNumber);
          }}
          disabled={false}
          className={`inline-block rounded-[8px] bg-primaryL3 text-[#4D3E9E] px-6 pb-2 pt-2.5 text-sm font-medium leading-normal transition duration-150 ease-in-out ${
            disable
              ? "opacity-50"
              : " hover:bg-primaryL3/10  active:bg-primaryL3/30"
          }   }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
