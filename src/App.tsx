import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PhotoProvider } from './context/PhotoContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import GalleryPage from './pages/GalleryPage';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import WeeEyesPage from './pages/WeeEyesPage';

export default function App() {
  return (
    <AuthProvider>
      <PhotoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/wee-eyes" element={<WeeEyesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredPermission="view">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PhotoProvider>
    </AuthProvider>
  );
}
