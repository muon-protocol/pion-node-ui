import { verification as verificationRequest } from "@/utils/requestVerifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchStatus: "init",
  brightidAuraVerified: false,
  brightidMeetsVerified: false,
  discordVerified: false,
  gitcoinPassportVerified: false,
  presaleVerified: false,
  telegramVerified: false,
};

export const fetchVerification = createAsyncThunk(
  "get/fetchVerification",

  async (walletAddress) => {
    const response = await verificationRequest(walletAddress);
    console.log(response);
    return response.data;
  }
);

export const verification = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerification: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVerification.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchVerification.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        if (action.payload.data.success != true) {
          state = initialState;
          state.fetchStatus = "faild";
        } else {
          const verificationData = action.payload.result;
          (state.brightidAuraVerified = verificationData.brightidAuraVerified),
            (state.brightidMeetsVerified =
              verificationData.brightidMeetsVerified),
            (state.discordVerified = verificationData.discordVerified),
            (state.gitcoinPassportVerified =
              verificationData.gitcoinPassportVerified),
            (state.presaleVerified = verificationData.presaleVerified),
            (state.telegramVerified = verificationData.telegramVerified);
        }
      })
      .addCase(fetchVerification.rejected, (state, action) => {
        state.fetchStatus = "faild";
        console.log(action);
      });
  },
});

export default verification.reducer;
