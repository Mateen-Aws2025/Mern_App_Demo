import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected routes */}
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;