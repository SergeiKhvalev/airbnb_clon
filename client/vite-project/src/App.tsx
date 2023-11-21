import { Route, Routes } from "react-router-dom";
import './App.css';
import IndexPage from "./pages/indexPage.tsx";
import Layout from "./Layout";
import LoginPage from "./pages/loginPage.tsx";
import RegisterPage from "./pages/registerPage.tsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import AccountPage from "./pages/accountPage";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;


function App() {

  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<IndexPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage/>} />
                  <Route path="/account/:subpage?" element={<AccountPage/>} />
                  <Route path="/account/:subpage/:action" element={<AccountPage/>} />
              </Route>
          </Routes>
      </UserContextProvider>
  )
}

export default App
