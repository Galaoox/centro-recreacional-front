import { Carousel } from "antd"
import './CarouselInicio.css';
import img1 from '@assets/carousel/img1.jpeg';
import img2 from '@assets/carousel/img2.jpeg';
import img3 from '@assets/carousel/img3.jpeg';
import img4 from '@assets/carousel/img4.jpeg';




const CarouselInicio = () => {
    return (
        <Carousel autoplay className="carousel--background-color">
            <div >
                <img src={img1} className="carousel-image"  alt="logo" />
            </div>
            <div >
                <img src={img2} className="carousel-image" alt="logo" />
            </div>
            <div >
                <img src={img3} className="carousel-image" alt="logo" />
            </div>
            <div >
                <img src={img4} className="carousel-image" alt="logo" />
            </div>

        </Carousel>
    )
}

export default CarouselInicio