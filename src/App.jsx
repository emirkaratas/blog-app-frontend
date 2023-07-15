import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </div>
  )
}

export default App
