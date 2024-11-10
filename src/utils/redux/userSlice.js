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
        },
        updatePaymentStatus: (state, action) => {
            if (state.user) {
                state.user.payment_status = action.payload; // Update payment status
            }
        }
    }
})
export const {signIn, signOut, updatePaymentStatus} = userSlice.actions;
export default userSlice.reducer;