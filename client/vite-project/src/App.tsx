import { Route, Routes } from "react-router-dom";
import './App.css';
import IndexPage from "./pages/indexPage.tsx";
import Layout from "./Layout";
import LoginPage from "./pages/loginPage.tsx";
import RegisterPage from "./pages/registerPage.tsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage/>} />
          </Route>
      </Routes>
  )
}

export default App
