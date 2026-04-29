import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./utils/ProtectedRouts";
import Home from "./pages/Home";
import Users from "./pages/Users";
import InfoCard from "./pages/InfoCard";
import Login from "./pages/login";
import Gallery from "./pages/Gallery";
import Calendar from "./pages/Calendar";
import WorldMap from "./pages/WorldMap";
import Documents from "./pages/Documents";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/login"
            element={
              sessionStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Login />
              )
            }
          />   

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="users" replace />} />             
              <Route path="users" element={<Users />} />
              <Route path="infoCard" element={<InfoCard />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="calendar" element={<Calendar/>} />
              <Route path="worldMap" element={<WorldMap/>} />
              <Route path="documents" element={<Documents/>} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
