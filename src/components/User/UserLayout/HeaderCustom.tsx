import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
const { Header } = Layout;
import './HeaderCustom.css';
import logo from '@assets/logo.png';

function createLink(path: string, text: string) {
    return <Link to={path}>{text}</Link>
}
function createImage(){
    return <img src={logo} id="logo" alt="logo" />
}

const items: MenuProps['items'] = [
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


    return (
        <>

            <Header id="header-user" className='header--no-padding header--auto-height header--background-white'>
                {/* <div id="container-image-header">
                    
                </div> */}
                <Menu id="menu-user" className="menu--align-center menu--background--blue" items={items} mode="horizontal" />
            </Header>
        </>
    )
}



export default HeaderCustom