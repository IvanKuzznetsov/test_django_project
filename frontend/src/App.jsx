import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import RegistrationSuccess from "./pages/Registration/RegistrationSuccess";
import RegistrationError from "./pages/Registration/RegistrationError";
import RegistrationUserExists from "./pages/Registration/RegistrationUserExists";
import AuthorizationPage from "./pages/Authorization/AuthorizationPage";
import AuthorizationError from "./pages/Authorization/AuthorizationError";
import ResetPassword from "./pages/Authorization/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/reg" element={<RegistrationPage />} />
          <Route path="/reg/success" element={<RegistrationSuccess />} />
          <Route path="/reg/err" element={<RegistrationError />} />
          <Route path="/reg/user-exists" element={<RegistrationUserExists />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/auth/err" element={<AuthorizationError />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
