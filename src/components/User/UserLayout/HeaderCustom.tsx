import { Link } from "react-router-dom";
import './HeaderCustom.css';

const HeaderCustom = () => {
    return (
        <>
<header>
  <nav className="grid search-bar">
    <img  className="menu-mobile" src="/assets/img/menu-mobile.svg" alt="" />
    <h1 className="title"><Link to="/">CentroRecreacional</Link></h1>

    <img className="account" src="/assets/img/icon-user.svg" alt="" />
    <button type="button" className="btn-sigin">Iniciar sesión</button>
  </nav>
  <nav className="menu-desktop">
    <ul>
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Atracciones</a></li>
      <li><a href="#">Horarios</a></li>
      <li><a href="#">Restaurante</a></li>
      <li><a href="#">Membresia</a></li>
      <li><a href="#">Hospedaje</a></li>
      <li><a href="#">Entradas</a></li>
    </ul>
  </nav>
</header>


{/* <div id="hamburguer-menu" #hamburguerMenu>
    <div class="button-close-container">
        <img src="/assets/img/icon-close.svg" #closeIcon alt="">
    </div>
    <ul>
        <li><a href="#">Hombre</a></li>
        <li><a href="#">Mujer</a></li>
        <li><a href="#">Junior</a></li>
        <li><a href="#">Niños</a></li>
        <li><a href="#">Accesorios</a></li>
        <li><a href="#">Ofertas</a></li>
    </ul>
</div> */}

        </>
    )
}

const style = {
    menuCustom: {
        display: 'flex',
        justifyContent: 'center',
    }
}

export default HeaderCustom