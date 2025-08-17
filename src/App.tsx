import { Navigate, Route, Routes } from "react-router-dom";

import Profile from "@/pages/profile";

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/profile" />} path="/" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<Profile />} path="/list" />
    </Routes>
  );
}

export default App;
