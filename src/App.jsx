import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Users from "./pages/Users";
import InfoCard from "./pages/InfoCard";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/infoCard" element={<InfoCard />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
