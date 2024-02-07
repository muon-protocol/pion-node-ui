import axios from "axios";

const BASEURL =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_APP_MUON_V1_URL_DEV
    : "";

const fetchRewardData = async (stakerAddress, blockNumber) => {
  const response = await axios.get(
    `${BASEURL}/v1/?app=pion_tss_reward_oracle&method=reward&params[stakerAddress]=${stakerAddress}&params[blockNumber]=${blockNumber.toString()}`
  );
  // const response = await axios.get(
  //   `${BASEURL}/poa/?app=tss_reward_oracle&method=reward&params[stakerAddress]=${staker}&params[blockNumber]=${blockNumber}`
  // );
  if (!response.data.success) return false;
  else {
    const data = response.data;
    return {
      amount: data.result.data.result.reward,
      paidRewardPerToken: data.result.data.result.rewardPerToken,
      reqId: data.result.reqId,
      signature: data.result.signatures[0].signature,
      owner: data.result.signatures[0].owner,
      nonce: data.result.data.init.nonceAddress,
    };
  }
};

export default fetchRewardData;
