import axios from "axios";

const fetchRewardData = async (staker, blockNumber) => {
  const response = await axios.get(
    `/poa/?app=tss_reward_oracle&method=reward&params[stakerAddress]=${staker}&params[blockNumber]=${blockNumber}`
  );
  console.log(response);
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
