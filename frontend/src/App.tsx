import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout"; // tu layout normal con header/footer
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Register from "./pages/register";
import Favorites from "./pages/Favorites";
import Ajustes from "./pages/footer_pages/Ajustes";
import ComoFunciona from "./pages/footer_pages/ComoFunciona";
import FAQ from "./pages/footer_pages/FAQ";
import Soporte from "./pages/footer_pages/Soporte";
import Reportar from "./pages/footer_pages/Reportar";
import Terminos from "./pages/footer_pages/Terminos";
import Privacidad from "./pages/footer_pages/Privacidad";
import Cookies from "./pages/footer_pages/Cookies";
import PlaceDetail from "./pages/PlaceDetail";

export default function App() {
  return (
    <Routes>
      {/* Rutas con layout normal (header + footer) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Ajustes />} />
        <Route path="/ayuda/como-funciona" element={<ComoFunciona />} />
        <Route path="/ayuda/faq" element={<FAQ />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
      </Route>

      {/* Rutas públicas (solo login/register) */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}