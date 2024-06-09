import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import PasswordReset from "./components/forms/PasswordReset";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
