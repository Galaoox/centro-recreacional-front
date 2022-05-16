import { Layout } from "antd";
import './FooterCustom.css';

const { Footer } = Layout;

const FooterCustom = () => {
    return (
        <Footer id="user-footer">
            <div>
                <div className="grid">
                    <div className="section-footer">
                        <div className="title-container">
                            <h2 className="title">POLÍTICAS</h2>
                            <span className="icon-toggle">+</span>
                        </div>
                        <div className="content">
                            <ul>
                                <li><a href="#">Políticas de privacidad</a></li>
                                <li><a href="#">Políticas de cambio</a></li>
                                <li><a href="#">Términos y condiciones</a></li>
                                <li><a href="#">Responsabilidad social</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-footer">
                        <div className="title-container">
                            <h2 className="title">SOBRE NOSOTROS</h2>
                            <span className="icon-toggle">+</span>
                        </div>
                        <div className="content">
                            <ul>
                                <li><a href="#">Contáctanos</a></li>
                                <li><a href="#">Trabaja con nosotros</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="attribution">
                    <p>
                        © Copyright Colombia. Todos los derechos reservados
                    </p>
                </div>
            </div>

        </Footer>
    )
}

export default FooterCustom