import { AuthContext } from "./context/auth-context";
import { useContext } from "react";
import {
  Login,
  Mobil,
  MobilCreate,
  MobilUpdate,
  Register,
  Rental,
  RentalCreate,
  RentalUpdate,
} from "./pages";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/rental"
          element={
            <ProtectedRoute>
              <Rental />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rental/create"
          element={
            <ProtectedRoute>
              <RentalCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rental/update"
          element={
            <ProtectedRoute>
              <RentalUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mobil/"
          element={
            <ProtectedRoute>
              <Mobil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mobil/create"
          element={
            <ProtectedRoute>
              <MobilCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mobil/update"
          element={
            <ProtectedRoute>
              <MobilUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
