"use client";
import dynamic from "next/dynamic";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const DynamicComponent = dynamic(() => import("./upTimeModal"), {
  ssr: false,
});

export default function NodeUpTime(props) {
  const selector = useSelector((state) => state.rootReducer.nodeReducer);

  const onlinePercent = props.onlinePercent;
  return (
    <div className="bg-cardBackground/50 w-full rounded-[10px] flex flex-wrap pt-4 pb-8 px-8 h-full min-h-[200px]">
      <div className="w-[50%] text-center content-between grid justify-center">
        <h4 className="text-primaryText">Uptime</h4>
        <div className="w-[75px]">
          <CircularProgressbar
            className="overflow-visible"
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.75,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "24px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `#B7F03C`,
              textColor: "#323245",
              trailColor: "#5F5B91",

              backgroundColor: "#B7F03C",
            })}
            background
            backgroundPadding={-20}
            value={onlinePercent}
            text={`${onlinePercent}%`}
          ></CircularProgressbar>
        </div>
      </div>
      <div className="w-[50%] content-between grid justify-center">
        <div className="text-center">
          <h4 className="text-primaryText">Status</h4>
          <b
            className={`${
              selector.nodeIsActive === "Online"
                ? "text-[#B7F03C]"
                : "text-primaryText"
            } text-2xl font-medium	
            `}
          >
            {selector.nodeIsActive}
          </b>
        </div>
        <DynamicComponent></DynamicComponent>
      </div>
    </div>
  );
}
