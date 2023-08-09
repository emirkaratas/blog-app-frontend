import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/lost-password" element={<ForgotPassword/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
