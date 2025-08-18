import { Navigate, Route, Routes } from "react-router-dom";

import Profile from "@/pages/profile";
import Lists from "@/pages/lists";

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/profile" />} path="/" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<Lists />} path="/list" />
    </Routes>
  );
}

export default App;
