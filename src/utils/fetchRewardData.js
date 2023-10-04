import axios from "axios";

const fetchRewardData = async (staker, blockNumber) => {
  const response = await axios.get(
    `http://52.14.41.79:8000/v1/?app=tss_reward_oracle&method=reward&params[stakerAddress]=${staker}&params[blockNumber]=${blockNumber}`
  );
  if (!response.success) return false;
  else {
    console.log(response);
    return {
      amount: response.result.data.result.reward,
      paidRewardPerToken: response.result.data.result.rewardPerToken,
      reqId: result.reqId,
      signature: [
        result.signatures[0].signature,
        result.signatures[0].owner,
        result.data.result.init.nonceAddress,
      ],
    };
  }
};

export default fetchRewardData;
