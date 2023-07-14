import axios from 'axios';

const axiosInstance = axios.create();

export async function getRewardsAPI(addresses: string[]) {
  const response = await axiosInstance.get(
    '/reward-server/rewards?addresses=' + addresses.join(','),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
}

export async function getClaimSignatureFromPastAPI(claimer: string) {
  const response = await axiosInstance.get(
    '/reward-server/rewards?claimer=' + claimer,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
}

export async function getClaimSignatureAPI(
  signatures: (string | null)[],
  addresses: string[],
  claimer: `0x${string}`,
) {
  const response = await axiosInstance.post('/reward-server/rewards', {
    signatures: signatures,
    addresses: addresses,
    claimer: claimer,
  });
  return response.data;
}

export async function getNodeStatusAPI(ip: string) {
  const response = await axiosInstance.get('/reward-server/status?ip=' + ip);
  return response.data;
}
