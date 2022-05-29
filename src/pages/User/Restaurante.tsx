import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllElementoMenuGrouped } from '@services/elementos-menu.service';
import { Card, Collapse, Divider, List, Typography } from 'antd';
import { useState } from 'react'
const { Title } = Typography;
const { Panel } = Collapse;
const { Meta } = Card;


const Restaurante = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);

    const getApiData = async () => await callEndpoint(GetAllElementoMenuGrouped());

    const adaptData = (elementos: any) => {
        setData(elementos);
    }

    useAsync(getApiData, adaptData, () => { });
    return (
        <>
            <Title level={1}>Restaurante</Title>
            {
                Object.keys(data).map((categoria: string) => {
                    return (
                        < >
                            <Divider />

                            <Title level={2}>{categoria}</Title>
                            <List
                                grid={{
                                    gutter: 5,
                                    xs: 1,
                                    sm: 2,
                                    md: 5,
                                    lg: 4,
                                    xl: 6,
                                    xxl: 3,
                                }}
                                dataSource={data[categoria]}
                                renderItem={(item: any) => (
                                    <List.Item>
                                        <Card
                                            cover={<img alt="comida" className='img-comida' src={item.imagen} />}
                                        >
                                            <Title level={4}>{item.nombre}</Title>
                                            <p>{item.descripcion}</p>
                                            <p>Valor: <strong>{item.valor}</strong></p>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </>
                    )
                })
            }
        </>
    )
}

export default Restaurante