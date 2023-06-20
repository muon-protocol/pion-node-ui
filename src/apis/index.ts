import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === 'development'
      ? ''
      : import.meta.env.VITE_APP_API_URL,
});

export async function getRewardsAPI(addresses: string[]) {
  const response = await axiosInstance.get(
    `/rewards?addresses=${addresses.join(',')}`,
  );
  return response.data;
}
