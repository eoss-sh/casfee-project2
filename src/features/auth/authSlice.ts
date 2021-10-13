import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../../config/firebase' 
import logging from "../../config/logging";

// Move all the interfaces to the interfaces folder? probably not?
interface AuthState {
    user: {
        email: string | null | undefined,
        uid: string | null | undefined,
        error: any
    }
}
interface LoginData { 
    email: string,
    password: string, 
}

const initialState: AuthState = { 
    user: {
        email: '',
        uid: '',
        error: '',
    }
}

// Thunk for Login with Username ans Password
// Thunk to auth with firebase => RTK Async Thunks can only take one argument, therefore the object logindata
export const loginWithUsernameAndPassword = createAsyncThunk(
    'auth/login',
    async (loginData: LoginData, { rejectWithValue }) => {
        try {
            const { email, password } = loginData;
            await auth.setPersistence('local')
            const userCreds = await auth.signInWithEmailAndPassword(email, password)

            return {
                email: userCreds.user?.email,
                uid: userCreds.user?.uid,
                error: ''
            }
        }
        catch (error) { 
            // To Check => this is not too good I guess...search js stringify error
            // it has to be done so that we can compare the error to the firebase errormessages
            // to render different Messages per Error
            const msg = (error + '');
            console.log(error)
            let output:string = ''; 
            if (msg.includes('auth/invalid-email')) { 
                output = 'Der angegebene Nutzer existiert nicht. Bitte prüfe die Eingabe.'
            } else if (msg.includes('auth/wrong-password')) { 
                output = 'Das eingegebene Passwort ist nicht korrekt.'
            } else if (msg.includes('auth/too-many-requests')) { 
                output = 'Das Passwort wurde zu häufig falsch eingegeben. Das Konto ist temporär gesperrt.'
            } else { 
                output = 'Login aktuell nicht möglich. Bitte probiere es später wieder.'
            }
            return rejectWithValue(output)
        }
    }
)
// Thunk to logout
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await auth.signOut
        }
        catch (error) {
            logging.error(error)
        }
    }
)

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
    },
    // Extra Reducers are Reducers that use outside logic as from a Asyn Func or A Thunk as is this case. 
    // add the createAsyncThunk and call the different states of it below for different outcomes and states.
    extraReducers: (builder) => {
        builder
            .addCase(loginWithUsernameAndPassword.pending, (state: AuthState) => {
                state.user.email = '';
                state.user.uid = '';
            })
            .addCase(loginWithUsernameAndPassword.fulfilled, (state: AuthState, action) => {
                state.user = action.payload
            })
            .addCase(loginWithUsernameAndPassword.rejected, (state: AuthState, action) => {
                state.user.error = action.payload
            })
            .addCase(logout.fulfilled, (state: AuthState) => {
                state.user = {
                    email: '',
                    uid: '',
                    error: '',

                }
            })
    }
})

export const { login } = authReducer.actions;
export default authReducer.reducer;