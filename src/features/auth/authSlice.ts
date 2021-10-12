import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../../config/firebase' 
interface AuthState {
    user: {
        email: string | null | undefined,
        uid: string | null | undefined
    };
}
interface LoginData { 
    email: string,
    password: string, 
}

const initialState: AuthState = { 
    user: {
        email: '',
        uid: '',
    }
}

export const loginWithUsernameAndPassword = createAsyncThunk(
    'auth/login',
    async (loginData: LoginData) => {
        const { email, password } = loginData;
        const userCreds = await auth.signInWithEmailAndPassword(email, password)
        return {
            email: userCreds.user?.email,
            uid: userCreds.user?.uid
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user.email = '';
            state.user.uid = '';
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(loginWithUsernameAndPassword.pending, (state) => { 
                state.user.email = '';
                state.user.uid = '';
            })
            .addCase(loginWithUsernameAndPassword.fulfilled, (state: AuthState, action) => { 
                state.user = action.payload
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;