export const discordVerified = (signer) => {
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
