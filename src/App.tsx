import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Products" element={<Products />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
