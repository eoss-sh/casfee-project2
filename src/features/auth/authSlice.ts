import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: {
        email: string,
        uid: string
    };
}

const initialState: AuthState = { 
    user: {
        email: '',
        uid: '',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login
        login: (state, action) => {
            state.user = action.payload
        },
        // logout
        logout: (state) => {
            state.user.email = '';
            state.user.uid = '';
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;