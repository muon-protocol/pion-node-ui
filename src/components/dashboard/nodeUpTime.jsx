"use client";
import dynamic from "next/dynamic";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const DynamicComponent = dynamic(() => import("./upTimeModal"), {
  ssr: false,
});

export default function NodeUpTime(props) {
  const selector = useSelector((state) => state.rootReducer.nodeReducer);

  const onlinePercent = props.onlinePercent;
  return (
    <div className="bg-primary13 w-full rounded-[10px] flex flex-wrap py-4 px-8 h-full min-h-[200px]">
      <div className="w-[50%] text-center content-between grid justify-center">
        <h4>Uptime</h4>
        <div className="w-[105px]">
          <CircularProgressbarWithChildren
            value={onlinePercent}
            text={`${onlinePercent}%`}
          ></CircularProgressbarWithChildren>
        </div>
      </div>
      <div className="w-[50%] content-between grid justify-center">
        <div className="text-center">
          <h4>Status</h4>
          <b>{selector.active ? "Online" : "Offline"}</b>
        </div>
        <DynamicComponent></DynamicComponent>
      </div>
    </div>
  );
}
