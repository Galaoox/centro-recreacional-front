import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllAtracciones } from '@services/atracciones.service';
import { Card, List, Typography } from 'antd';
import  { useState } from 'react'
import './Atracciones.css';

const { Title } = Typography;
const { Meta } = Card;


const Atracciones = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);

    const getApiData = async () => await callEndpoint(GetAllAtracciones());

    const adaptAtracciones = (atracciones: any) => {
        setData(atracciones);
    }

    useAsync(getApiData, adaptAtracciones, () => { });


    return (
        <>
            <Title level={1}>Atracciones</Title>
            <List
                grid={{
                    gutter: 50,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                }}
                
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card 
                            cover={<img alt="example" className='img-atraccion' src={item.imagen} />}
                        >
                            <Meta title={item.nombre} description={item.descripcion} />
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Atracciones