import { LightBtn } from "@/app/page";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./upTimeModal"), {
  ssr: false,
});

export default function NodeUpTime(props) {
  const onlinePercent = props.onlinePercent;
  return (
    <div className="bg-primary13 w-full rounded-[10px] flex flex-wrap py-4 px-8 h-full min-h-[200px]">
      <div className="w-[50%] content-between grid justify-center">
        <h4>Uptime</h4>
        <div>{onlinePercent}%</div>
      </div>
      <div className="w-[50%] content-between grid justify-center">
        <div className="text-center">
          <h4>Status</h4>
          <b>Online</b>
        </div>
        <DynamicComponent></DynamicComponent>
      </div>
    </div>
  );
}
