import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./utils/ProtectedRouts";
import Home from "./pages/Home";
import Users from "./pages/Users";
import InfoCard from "./pages/InfoCard";
import Login from "./pages/login";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
              path="/"
              element={ localStorage.getItem("user") ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />   
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route index element={<Navigate to="users" replace />} />             
              <Route path="users" element={<Users />} />
              <Route path="infoCard" element={<InfoCard />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
