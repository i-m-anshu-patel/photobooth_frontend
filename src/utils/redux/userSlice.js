import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        signIn: (state, action) => {
            return { user : action.payload }
        },
        signOut: (state) => {
            return { user : null}
        }
    }
})
export const {signIn, signOut} = userSlice.actions;
export default userSlice.reducer;