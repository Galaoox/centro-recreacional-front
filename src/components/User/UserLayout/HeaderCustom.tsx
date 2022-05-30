import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { Link, useNavigate } from "react-router-dom";
const { Header } = Layout;
import './HeaderCustom.css';
import logo from '@assets/logo.png';
import { useEffect, useState } from 'react';
import { useAuth } from "@hooks/useAuth";

function createLink(path: string, text: string) {
    return <Link to={path}>{text}</Link>
}
function createImage() {
    return <img src={logo} id="logo" alt="logo" />
}


const originalItemsMenu = [
    { label: createImage(), key: 'imagen' },

    { label: createLink('/', 'Inicio'), key: 'inicio' },
    { label: createLink('/atracciones', 'Atracciones'), key: 'atracciones' },
    { label: createLink('/horarios', 'Horarios'), key: 'horarios' },
    { label: createLink('/restaurante', 'Restaurante'), key: 'restaurante' },
    { label: createLink('/membresia', 'Membresia'), key: 'membresia' },
    {
        label: 'Reservas',
        key: 'reservas',
        children: [
            { label: createLink('/hospedaje', 'Hospedaje'), key: 'hospedaje' },
            { label: createLink('/entradas', 'Entradas'), key: 'entradas' },
        ],
    },
];

const HeaderCustom = () => {
    const auth = useAuth();
    const [items, setItems] = useState<MenuProps['items']>(originalItemsMenu)
    let navigate = useNavigate();

    const cerrarSesion =()=>{
        auth.signout(()=>{
            return navigate('/');
        });
    }

    const itemsUserLogged = [
        {
            label: createLink('/cuenta', 'Cuenta'),
            key: 'cuenta',
        },
        {
            label: <span onClick={cerrarSesion}>Cerrar sesion</span>,
            key: 'cerrarSesion',
        }
    ];

    useEffect(() => {
        if (!auth.user.accessToken && items) {
            setItems([...originalItemsMenu,
            {
                label: createLink('/inicio-sesion', 'Iniciar Sesión'),
                key: 'inicio-sesion',
            },
            {
                label: createLink('/registro', 'Registro'),
                key: 'registro',
            }
            ]);
        } else if (auth.user.accessToken && items) {
            setItems([...originalItemsMenu,...itemsUserLogged]);
        }
        return () => {

        }
    }, [auth.user]);

    return (
        <>

            <Header id="header-user" className='header--no-padding header--auto-height header--background-white'>
                <Menu id="menu-user" className="menu--align-center menu--background--blue" items={items} mode="horizontal" />
            </Header>
        </>
    )
}



export default HeaderCustom