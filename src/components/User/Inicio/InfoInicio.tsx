import './InfoInicio.css';
import atraccionesImg from '@assets/centro_recreacional_1.jpeg';
import restauranteImg from '@assets/restaurante.jpeg';
import { Link } from 'react-router-dom';


const InfoInicio = () => {
    return (
        <>
            <div id="grid-info">
                <Link to={'/atracciones'}>
                    <div className="container-img-text">
                        <img className="img-carousel" src={atraccionesImg} />
                        <p className="centered">Atracciones</p>
                    </div>
                </Link>
                <Link to={'/restaurante'}>
                    <div className="container-img-text">
                        <img className="img-carousel" src={restauranteImg} />
                        <p className="centered">Restaurante</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default InfoInicio