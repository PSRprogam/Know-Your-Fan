import { Routes, Route, Navigate, } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/UserArea/Dashboard/dashboard";
import Home from "./pages/UserArea/Home/Home";
import Ponto from "./pages/UserArea/Pontos/Pontos";
import AlterarDados from "./pages/UserArea/AlterarDados/AlterarDados";
import RedesSociais from "./pages/UserArea/RedesSociais/RedesSociais";
import Upload from "./pages/UserArea/Upload/Upload";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/area-do-fa"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/ponto"
        element={
          <PrivateRoute>
            <Ponto />
          </PrivateRoute>
        }
      />
      <Route
        path="/alterar-dados"
        element={
          <PrivateRoute>
            <AlterarDados />
          </PrivateRoute>
        }
      />
      <Route
        path="/redes-sociais"
        element={
          <PrivateRoute>
            <RedesSociais />
          </PrivateRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
