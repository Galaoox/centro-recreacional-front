import AdminLayout from "@layouts/AdminLayout"
import UserLayout from "@layouts/UserLayout"
import CategoriasMenu from "@pages/Admin/CategoriasMenu"
import TiposAlojamientos from "@pages/Admin/TiposAlojamientos"
import Atracciones from "@pages/User/Atracciones"
import Horarios from "@pages/User/Horarios"
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
import { LoadingProvider } from './providers/LoadingProvider';
import Membresia from "@pages/User/Membresia"
import Hospedaje from "@pages/User/Hospedaje"
import Entradas from "@pages/User/Entradas"
import { Suspense } from "react"
import RequireAuth from "@guards/RequireAuth"
import Inicio from "@pages/User/Inicio"

export const Navigator = () => {
    return (
        <LoadingProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <Suspense><UserLayout /></Suspense>
                    }>
                        <Route index element={
                            <Inicio />
                        } />
                        <Route path="inicio-sesion" element={<Login />} />
                        <Route path="registro" element={<Register />} />
                        <Route path="horarios" element={<Horarios />} />
                        <Route path="restaurante" element={<Restaurante />} />
                        <Route path="atracciones" element={<Atracciones />} />
                        <Route path="membresia" element={<Membresia />} />
                        <Route path="hospedaje" element={<Hospedaje />} />
                        <Route path="entradas" element={<Entradas />} />


                    </Route>
                    <Route path="admin" element={
                        <Suspense>
                            {/* <RequireAuth>
                                <RequireIsAdmin>
                                </RequireIsAdmin>
                            </RequireAuth> */}
                            <AdminLayout />
                        </Suspense>

                    }>

                        <Route index element={<Dashboard />} />
                        <Route path="tipos-alojamientos" element={<TiposAlojamientos />} />
                        <Route path="atracciones" element={<AtraccionesAdmin />} />
                        <Route path="categorias-menu" element={<CategoriasMenu />} />
                        <Route path="elementos-menu" element={<ElementosMenu />} />
                        <Route path="horarios" element={<HorariosAdmin />} />
                        <Route path="tipos-documento" element={<TipoDocumento />} />
                        <Route path="tipos-membresia" element={<TipoMembresia />} />
                        <Route path="tipos-entradas" element={<TiposEntradas />} />
                        <Route path="tipos-adiciones-alojamientos" element={<TiposAdicionesAlojamiento />} />

                    </Route>


                </Routes>
            </AuthProvider>
        </LoadingProvider>

    )
}