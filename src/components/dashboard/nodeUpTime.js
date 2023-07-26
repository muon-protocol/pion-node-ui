import { LightBtn } from "@/app/page";

export default function NodeUpTime() {
  return (
    <div className="bg-primary13 w-full rounded-[10px] flex flex-wrap py-4 px-8 h-full min-h-[200px]">
      <div className="w-[50%] content-between grid justify-center">
        <h4>Uptime</h4>
        <div>80%</div>
      </div>
      <div className="w-[50%] content-between grid justify-center">
        <div className="text-center">
          <h4>Status</h4>
          <b>Online</b>
        </div>
        <LightBtn>Details</LightBtn>
      </div>
    </div>
  );
}
