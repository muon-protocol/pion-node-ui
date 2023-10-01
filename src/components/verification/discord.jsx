"use client";

import { LightBtn } from "@/app/page";
import { fetchNodeInfo } from "@/redux/features/nodeInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function openDiscord(URL) {
  try {
    window.open(
      URL,
      "targetWindow",
      `toolbar=no,
    location=no,
    status=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    width=450,
    height=900,
    left=500`
    );
  } catch (error) {
    console.log(error);
  }
}

export default function DiscordVerified({ signer, isActive }) {
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const dispatch = useDispatch();

  const [state, setState] = useState(0);
  useEffect(() => {
    if (state && state < 15) {
      setTimeout(() => {
        if (!selector.discordVerified) {
          dispatch(fetchNodeInfo(signer));
          setState(state + 1);
        }
      }, 4000);
    }
  }, [state]);
  console.log("click");

  const URL = `https://discord.com/api/oauth2/authorize?client_id=1140034021099831326&redirect_uri=https%3A%2F%2Falice-v2.muon.net%2Fdashboard%2FdiscordVerification&response_type=code&scope=identify&state=${signer}`;
  // `https://discord.com/api/oauth2/authorize?client_id=1140034021099831326&redirect_uri=https%3A%2F%2Falice-v2.muon.net%2Fdashboard%2FdiscordVerification&response_type=code&scope=identify&state=${signer}`;

  return (
    // <button
    //   onClick={() => {
    //     openDiscord(URL);
    //     setState(1);
    //   }}
    //   className={`flex ${
    //     isActive
    //       ? "bg-pacificBlue text-white"
    //       : "bg-primaryL3 text-primary hover:bg-primary-20 active:bg-primary-50"
    //   } rounded-[8px]  py-1 px-4 pb-2 pt-2.5 font-medium`}
    // >
    //   {isActive ? "Verification passed!" : "Pass verification"}
    // </button>
    <LightBtn
      onClick={() => {
        openDiscord(URL);
        setState(1);
      }}
      btnDisabeld={isActive}
      bgColor={isActive ? "bg-uptime" : ""}
    >
      {isActive ? "Verification passed!" : "Pass verification"}
    </LightBtn>
  );
}
