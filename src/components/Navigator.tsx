import RequireAuth from "@guards/RequireAuth"
import AdminLayout from "@layouts/AdminLayout"
import UserLayout from "@layouts/UserLayout"
import CategoriasMenu from "@pages/Admin/CategoriasMenu"
import TiposAlojamientos from "@pages/Admin/TiposAlojamientos"
import Atracciones from "@pages/User/Atracciones"
import Horarios from "@pages/User/Horarios"
import Index from "@pages/User/Index"
import Login from "@pages/User/Login"
import Register from "@pages/User/Register"
import Restaurante from "@pages/User/Restaurante"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from './AuthProvider';

export const Navigator = () => {
    return (
        <AuthProvider>
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route index element={
                    <RequireAuth>
                        <Index />
                    </RequireAuth>
                } />
                <Route path="inicio-sesion" element={<Login />} />
                <Route path="registro" element={<Register />} />
                <Route path="horarios" element={<Horarios />} />
                <Route path="restaurante" element={<Restaurante />} />
                <Route path="atracciones" element={<Atracciones />} />
        
            </Route>
            <Route path="admin" element={<AdminLayout />}>
                <Route path="tipos-alojamientos" element={<TiposAlojamientos />} />
                <Route path="categorias-menu" element={<CategoriasMenu />} />
                <Route path="categorias-menu" element={<CategoriasMenu />} />
            </Route>
        </Routes>
        </AuthProvider>
    )
}