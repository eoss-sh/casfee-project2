import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import {
  deleteUserFunc,
  getAdditionalUserInfo,
  updateUserDataFunc,
} from "./authApi";
import logging from "../../config/logging";
import User, { AuthState, LoginData } from "../../interfaces/user";

const initialState: AuthState = {
  user: {
    email: "",
    uid: "",
    error: "",
    admin: false,
    url: "",
    name: "",
    hcp: undefined,
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
        name: additionalUserInfo?.data()?.name,
        hcp: additionalUserInfo?.data()?.hcp,
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

// Thunk to Update User Infos
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (data: User) => {
    try {
      await updateUserDataFunc(data);
      return data;
    } catch (error) {
      logging.error(error);
    }
  }
);

// Thunk to delete User
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id: string | undefined) => {
    try {
      typeof id !== "string"
        ? logging.error("NO ID GIVEN")
        : await deleteUserFunc(id);

      return "User deleted";
    } catch (error) {
      logging.error(error);
    }
  }
);

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
          name: "",
          hcp: undefined,
        };
      })
      .addCase(updateUserData.fulfilled, (state: AuthState, action) => {
        state.user.url = action.payload?.url;
        state.user.name = action.payload?.name;
        state.user.hcp = action.payload?.hcp;
      })
      .addCase(updateUserData.rejected, (state: AuthState, action) => {
        state.user.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state: AuthState) => {
        state.user = {
          email: "",
          uid: "",
          error: "",
          admin: false,
          url: "",
          name: "",
          hcp: undefined,
        };
      })
      .addCase(deleteUser.rejected, (state: AuthState, action) => {});
  },
});

export const { login } = authReducer.actions;
export default authReducer.reducer;
