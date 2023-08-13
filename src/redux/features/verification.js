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
  brightidContexId: "",
  brightIdTryed: 0,
  errorMessage: "",
  interval: 0,
};

export const fetchVerification = createAsyncThunk(
  "get/fetchVerification",

  async (walletAddress) => {
    try {
      const response = await verificationRequest(walletAddress);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("ehsan");
    }
  }
);

export const verification = createSlice({
  name: "verification",
  initialState,
  reducers: {
    resetBrightIdTryed: (state) => {
      state.brightIdTryed = 0;
    },
    incBrightIdTryed: (state, action) => {
      state.brightIdTryed = action.payload;
    },
    setGitcoinPassportVerified: (state, action) => {
      state.gitcoinPassportVerified = action.payload;
    },
    setBrightidAuraVerified: (state, action) => {
      state.brightidAuraVerified = action.payload;
    },
    setBrightidMeetsVerified: (state, action) => {
      state.brightidMeetsVerified = action.payload;
    },
    setMyInterval: (state, action) => {
      state.interval = action.payload;
    },
    resetInterval: (state) => {
      state.interval = 0;
    },
    setBrightIdContexId: (state, action) => {
      state.brightidContexId = action.payload;
    },
    setPresaleVerified: (state, action) => {
      state.presaleVerified = action.payload;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = "";
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setTelegramVerified: (state, action) => {
      state.telegramVerified = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVerification.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchVerification.fulfilled, (state, action) => {
        console.log(action);
        state.fetchStatus = "succeeded";
        if (action.payload.success != true) {
          state = initialState;
          state.fetchStatus = "failed";
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
        state.fetchStatus = "failed";
        console.log(action);
      });
  },
});
export const {
  setPresaleVerified,
  resetErrorMessage,
  setErrorMessage,
  setTelegramVerified,
  setBrightIdContexId,
  resetInterval,
  setMyInterval,
  setBrightidAuraVerified,
  setBrightidMeetsVerified,
  setGitcoinPassportVerified,
  resetBrightIdTryed,
  incBrightIdTryed,
} = verification.actions;
export default verification.reducer;
