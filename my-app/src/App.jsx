import { Routes, Route, Navigate } from "react-router-dom";
import Signup from '../pages/signup';
import Login from '../pages/login';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react-dom";

function App() {
  return (
    <Routes>
     <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;