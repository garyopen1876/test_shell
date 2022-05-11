import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/LoginPage";
import Management from "./Pages/ManagementPage";
import NoFoundPage from "./Pages/NotFoundPage";

export const TokenContext = React.createContext(null);

export default function App() {
  const [tokenContext, setTokenContext] = React.useState(
    localStorage.getItem("login_token")
  );

  return (
    <TokenContext.Provider value={{ tokenContext, setTokenContext }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/ManagementPage"
            element={
              !tokenContext ? <Navigate to="/" replace /> : <Management />
            }
          />
          <Route path="*" element={<NoFoundPage />} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}
