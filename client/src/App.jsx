import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard"; // Import your Dashboard component

const App = () => {
    return (
        <Provider store={store}>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/edit-profile"
                        element={
                            <ProtectedRoute>
                                <EditProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
