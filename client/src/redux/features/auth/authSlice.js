import { createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const persistedAuth = JSON.parse(localStorage.getItem("auth")) || {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: persistedAuth,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem("auth", JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            // Remove from localStorage
            localStorage.removeItem("auth");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
