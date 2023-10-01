export const ERRORCODE = {
  1: () => "Staker address is not valid or does not belong to a node.",
  2: (platform) =>
    `This ${platform} ${
      platform === "presale" ? "address" : "account"
    } is not eligible.`,
  3: (platform) =>
    `This ${platform} ${
      platform === "presale" ? "address" : "account"
    } is already registred by another node.`,
  4: () => "Your request has already been registered.",
  5: () => "Your signature is not valid.",
  11: () => "Something went wrong. Please try after a while. (error code: 11)",
  12: () => "Something went wrong. Please try after a while. (error code: 12)",
  13: () =>
    "Unable to fetch signing-message due to an internal issue. Please try again later.",
  14: () =>
    "Unable to submit passport due to an internal issue. Please try again later.",
  15: () =>
    `Unable to get score due to an internal issue. Please try again later.`,
  16: () => `The user's Gitcoin passport score is too low.`,
  17: () => `registration has been closed`,
  connection: () =>
    "Something went wrong. Please try after a while. (connection problem)",
};
