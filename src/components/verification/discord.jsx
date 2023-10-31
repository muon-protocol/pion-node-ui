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

  const URL = `https://discord.com/api/oauth2/authorize?client_id=1140034021099831326&redirect_uri=https%3A%2F%2Fapp.muon.net%2Fdashboard%2FdiscordVerification&response_type=code&scope=identify&state=${signer}`;

  return (
    <LightBtn
      onClick={() => {
        openDiscord(URL);
        setState(1);
      }}
      btnDisabeld={isActive}
      bgColor={isActive ? "bg-transparent" : ""}
      textColor={isActive ? "text-uptime" : ""}
    >
      {isActive ? "Verification passed!" : "Pass verification"}
    </LightBtn>
  );
}
