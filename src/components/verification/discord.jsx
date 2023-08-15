"use client";

import { fetchNodeInfo } from "@/redux/features/nodeInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const discordVerified = (signer) => {
  const { address } = useAccount();
  const selector = useSelector(
    (state) => state.rootReducer.verificationReducer
  );
  const dispatch = useDispatch();

  const [state, setstate] = useState(initialState);
  useEffect(() => {
    setTimeout(() => {
      if (!selector.discordVerified) {
        dispatch(fetchNodeInfo(address));
        setstate(state + 1);
      }
    }, 2000);
  }, [state]);
  console.log("click");

  const URL = `https://discord.com/api/oauth2/authorize?client_id=1140034021099831326&redirect_uri=https%3A%2F%2Falice-v2.muon.net%2Fdashboard%2FdiscordVerification&response_type=code&scope=identify&state=${signer}`;
  // `https://discord.com/api/oauth2/authorize?client_id=1140034021099831326&redirect_uri=https%3A%2F%2Falice-v2.muon.net%2Fdashboard%2FdiscordVerification&response_type=code&scope=identify&state=${signer}`;
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
};
