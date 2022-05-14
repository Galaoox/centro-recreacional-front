import { Carousel } from "antd"
import './CarouselInicio.css';


const CarouselInicio = () => {
    return (
        <Carousel autoplay className="carousel--background-color">
            <div>
                <img src="https://via.placeholder.com/1000x500/000" className="carousel-image"  alt="logo" />
            </div>
            <div>
                <img src="https://via.placeholder.com/1000x500/red" className="carousel-image" alt="logo" />
            </div>

        </Carousel>
    )
}

export default CarouselInicio