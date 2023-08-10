import { styled } from "styled-components";

const OrangeCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(217, 141, 81, 0.18) 0%,
    rgba(246, 81, 121, 0.18) 100%
  );
`;
export default function Withdraw() {
  return (
    <OrangeCard className=" w-fulzl rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Reward</h4>
        <b>6.6142 ALICE</b>
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={true}
          className={`inline-block rounded-[8px] bg-[#FEEFE9] text-[#f59569] px-6 pb-2 pt-2.5 text-sm font-medium leading-normal transition duration-150 ease-in-out hover:bg-primary/20  active:bg-primary/30 }`}
        >
          Withdraw
        </button>
      </div>
    </OrangeCard>
  );
}
