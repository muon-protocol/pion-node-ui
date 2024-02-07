import {
  getTierSig,
  verification as verificationRequest,
} from "@/utils/requestVerifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchStatus: "init",
  brightidAuraVerified: false,
  brightidMeetsVerified: false,
  discordVerified: false,
  gitcoinPassportVerified: false,
  presaleVerified: false,
  privateSaleVerified: false,
  telegramVerified: false,
  temporary2ndTierVerified: false,
  brightidContexId: "",
  brightIdTryed: 0,
  errorMessage: "",
  interval: 0,
  fetchTierSigStatus: "init",
  tier: "init",
  eligibleTier: "init",
  isSetTier: false,
  tierSig: "",
  tierErrorMessage: "",
};

export const fetchVerification = createAsyncThunk(
  "get/fetchVerification",

  async (walletAddress) => {
    try {
      const response = await verificationRequest(walletAddress);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("fetchVerification error");
    }
  }
);

export const fetchTierSig = createAsyncThunk(
  "get/fetchTierSig",

  async (walletAddress) => {
    try {
      const response = await getTierSig(walletAddress);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verification = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setTier(state, action) {
      state.tier = action.payload;
    },
    setIsSetTier(state, action) {
      state.isSetTier = action.payload;
    },
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
        state.fetchStatus = "succeeded";
        if (action.payload.success != true) {
          state = initialState;
          // state.fetchStatus = "failed";
        } else {
          const verificationData = action.payload.result;
          state.brightidAuraVerified = verificationData.brightidAuraVerified;
          state.brightidMeetsVerified = verificationData.brightidMeetsVerified;
          state.discordVerified = verificationData.discordVerified;
          state.gitcoinPassportVerified =
            verificationData.gitcoinPassportVerified;
          state.presaleVerified = verificationData.presaleVerified;
          state.telegramVerified = verificationData.telegramVerified;
          state.privateSaleVerified = verificationData.privateSaleVerified;
          state.eligibleTier = verificationData.eligibleTier;
          if (verificationData.temp2ndTierVerified) {
            state.temporary2ndTierVerified =
              verificationData.temp2ndTierVerified;
          }
        }
      })
      .addCase(fetchVerification.rejected, (state, action) => {
        state.fetchStatus = "failed";
      });
    builder
      .addCase(fetchTierSig.pending, (state) => {
        state.fetchTierSigStatus = "loading";
      })
      .addCase(fetchTierSig.fulfilled, (state, action) => {
        state.fetchTierSigStatus = "succeeded";
        if (action.payload.data.success) {
          const data = action.payload.data.result;
          state.tier = data.tier;
          state.tierSig = data.signature;
        } else {
          state.tierErrorMessage = action.payload.data.message;
          if (action.payload.data.errorCode === 8) {
            state.isSetTier = true;
          }
        }
      })
      .addCase(fetchTierSig.rejected, () => {
        console.log("fetchTierSig rejected");
      });
  },
});
export const {
  setTier,
  setIsSetTier,
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
