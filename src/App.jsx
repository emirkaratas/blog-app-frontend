import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Posts from "./pages/Posts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Giriş Sayfası</h1>} />
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </div>
  )
}

export default App
