import axios from "axios";

const fetchRewardData = async (staker, blockNumber) => {
  const response = await axios.get(
    `http://52.14.41.79:8000/v1/?app=tss_reward_oracle&method=reward&params[stakerAddress]=${staker}&params[blockNumber]=${blockNumber}`
  );
  if (!response.success) return false;
  else {
    console.log(response);
    return response;
  }
};

export default fetchRewardData;
