import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Giriş Sayfası</h1>} />
      </Routes>
    </div>
  )
}

export default App
