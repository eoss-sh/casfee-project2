import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { getAdditionalUserInfo } from "./authApi";
import logging from "../../config/logging";

// Move all the interfaces to the interfaces folder? probably not?
interface AuthState {
  user: {
    email: string | null | undefined;
    uid: string | undefined;
    error: any;
    admin: boolean;
    url: string;
  };
}
interface LoginData {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: {
    email: "",
    uid: "",
    error: "",
    admin: false,
    url: "",
  },
};

// Thunk for Login with Username ans Password
// Thunk to auth with firebase => RTK Async Thunks can only take one argument, therefore the object logindata
export const loginWithUsernameAndPassword = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      await auth.setPersistence("local");
      const userCreds = await auth.signInWithEmailAndPassword(email, password);
      const tokens = await userCreds.user?.getIdTokenResult();
      const additionalUserInfo = await getAdditionalUserInfo(
        "appUser",
        userCreds.user?.uid
      );
      return {
        email: userCreds.user?.email,
        uid: userCreds.user?.uid,
        error: "",
        admin: tokens?.claims.admin,
        url: additionalUserInfo?.data()?.url,
      };
    } catch (error) {
      const msg = error + "";
      let output: string = "";
      if (msg.includes("auth/invalid-email")) {
        output =
          "Der angegebene Nutzer existiert nicht. Bitte prüfe die Eingabe.";
      } else if (msg.includes("auth/wrong-password")) {
        output = "Das eingegebene Passwort ist nicht korrekt.";
      } else if (msg.includes("auth/too-many-requests")) {
        output =
          "Das Passwort wurde zu häufig falsch eingegeben. Das Konto ist temporär gesperrt.";
      } else {
        output =
          "Login aktuell nicht möglich. Bitte probiere es später wieder.";
      }
      return rejectWithValue(output);
    }
  }
);
// Thunk to logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await auth.signOut();
  } catch (error) {
    logging.error(error);
  }
});

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
  // Extra Reducers are Reducers that use outside logic as from a Asyn Func or A Thunk as is this case.
  // add the createAsyncThunk and call the different states of it below for different outcomes and states.
  extraReducers: (builder) => {
    builder
      .addCase(loginWithUsernameAndPassword.pending, (state: AuthState) => {
        state.user.email = "";
        state.user.uid = "";
      })
      .addCase(
        loginWithUsernameAndPassword.fulfilled,
        (state: AuthState, action) => {
          state.user = action.payload;
        }
      )
      .addCase(
        loginWithUsernameAndPassword.rejected,
        (state: AuthState, action) => {
          state.user.error = action.payload;
        }
      )
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.user = {
          email: "",
          uid: "",
          error: "",
          admin: false,
          url: "",
        };
      });
  },
});

export const { login } = authReducer.actions;
export default authReducer.reducer;
