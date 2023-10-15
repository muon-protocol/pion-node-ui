import axios from "axios";
const BASEURL =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_PROXY_URL_DEV
    : "";
const verificationEndPoint = BASEURL + "/uniqueness";

export const verification = async (staker) => {
  let res = await axios.request({
    method: "GET",
    url: `${verificationEndPoint}/verifications/${staker}?df`,
  });
  return res;
};

export const telegramVerification = async (user, staker) => {
  user.staker = staker;
  return axios.post(`${verificationEndPoint}/telegram`, JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
  });
};

export const preSaleRequest = async (staker, signer, signature) => {
  const data = JSON.stringify({
    staker: staker,
    signer: signer,
    signature: signature,
  });
  return await axios.post(`${verificationEndPoint}/sale`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getBrightIdContextId = async (staker, signature) => {
  const data = JSON.stringify({
    staker: staker,
    signature: signature,
  });
  return await axios.post(`${verificationEndPoint}/brightid/contextId`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sponsorBrightIdRequest = async (staker) => {
  return await axios.post(
    `${verificationEndPoint}/brightid/sponsor`,
    JSON.stringify({ staker: staker }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const checkBrightIdConnection = async (staker) => {
  return await axios.get(`${verificationEndPoint}/brightid?staker=${staker}`);
};

export const discordRequest = async (code, staker) => {
  const data = JSON.stringify({
    code: code,
    state: staker,
  });

  return await axios.post(`${verificationEndPoint}/discord`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const gitcoinMessage = async () => {
  return await axios.get(`${verificationEndPoint}/gitcoinMessage`);
};

export const gitcoinVerification = async (staker, signer, signature, nonce) => {
  const data = JSON.stringify({
    staker: staker,
    signer: signer,
    signature: signature,
    nonce: nonce,
  });
  return await axios.post(`${verificationEndPoint}/gitcoin`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTierSig = async (staker) => {
  return await axios.get(
    `https://monitor-pion.muon.net/uniqueness/getTierSig?staker=${staker}`
  );
};
