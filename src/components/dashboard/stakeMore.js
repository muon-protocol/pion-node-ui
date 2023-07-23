export default function StakeMore() {
  return (
    <div className="bg-primary13 w-full rounded-[10px] grid content-between py-4 px-8 h-full min-h-[200px]">
      <div className="flex justify-between">
        <h4>Staked ALICE</h4>
        <b>1500</b>
      </div>
      <div className="w-full flex justify-end">
        <button className="w-[50%] bg-primary13 rounded-lg py-2 px-2 font-medium text-primary">
          Staked More
        </button>
      </div>
    </div>
  );
}
