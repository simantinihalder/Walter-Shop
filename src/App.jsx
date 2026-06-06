import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AuthModal from './components/ui/AuthModal';
import SideCartDrawer from './components/ui/SideCartDrawer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export const AppContext = React.createContext(null);

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <AppContext.Provider value={{ setIsAuthOpen }}>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
              </Route>
            </Routes>
            
            <AuthModal 
              isOpen={isAuthOpen} 
              onClose={() => setIsAuthOpen(false)} 
            />
            
            <SideCartDrawer />
          </Router>
        </AppContext.Provider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
