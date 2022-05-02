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
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from './providers/AuthProvider';
import RequireIsAdmin from '../guards/RequireIsAdmin';
import AtraccionesAdmin from "@pages/Admin/AtraccionesAdmin"
import ElementosMenu from "@pages/Admin/ElementosMenu"
import HorariosAdmin from "@pages/Admin/HorariosAdmin"
import TipoDocumento from "@pages/Admin/TipoDocumento"
import TipoMembresia from "@pages/Admin/TipoMembresia"
import TiposAdicionesAlojamiento from "@pages/Admin/TiposAdicionesAlojamiento"
import TiposEntradas from "@pages/Admin/TiposEntradas"
import Dashboard from "@pages/Admin/Dashboard"

export const Navigator = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* <Route path="/" element={<UserLayout />}>
                    <Route index element={
                        <Index />
                    } />
                    <Route path="inicio-sesion" element={<Login />} />
                    <Route path="registro" element={<Register />} />
                    <Route path="horarios" element={<Horarios />} />
                    <Route path="restaurante" element={<Restaurante />} />
                    <Route path="atracciones" element={<Atracciones />} />
                </Route> */}
                <Route path="/" element={
                    // <RequireAuth>
                        // <RequireIsAdmin>
                                <AdminLayout />
                        // </RequireIsAdmin>
                    // </RequireAuth>
                }>
                    
                    <Route index element={<Dashboard />} />
                    <Route path="tipos-alojamientos" element={<TiposAlojamientos />} />
                    <Route path="atracciones" element={<AtraccionesAdmin />} />
                    <Route path="categorias-menu" element={<CategoriasMenu />} />
                    <Route path="elementos-menu" element={<ElementosMenu />} />
                    <Route path="horarios" element={<HorariosAdmin />} />
                    <Route path="tipos-documento" element={<TipoDocumento />} />
                    <Route path="tipos-membresia" element={<TipoMembresia />} />
                    <Route path="tipos-adiciones-alojamientos" element={<TiposAdicionesAlojamiento />} />
                    <Route path="tipos-alojamientos" element={<TiposAlojamientos />} />
                    <Route path="tipos-entradas" element={<TiposEntradas />} />

                </Route>


            </Routes>
        </AuthProvider>
    )
}