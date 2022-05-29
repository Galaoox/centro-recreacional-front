import { useAsync } from "@hooks/useAsync";
import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { Card, List, Typography } from "antd";
import { useState } from "react";
import { GetAllTiposMembresia } from '../../services/tipos-membresia.service';
import { GetTiposDescuentos } from '@services/tipos-membresia.service';

const { Title } = Typography;


const Membresia = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);
    const [listDescuentos, setListDescuentos] = useState<any>([]);


    const getApiData = async () => await callEndpoint(GetAllTiposMembresia());

    const adapt = (res: any) => {
        res = res.map((item: any) => {
            item.descuentos = item.descuentos.map((descuento: any) => {
                return {
                    ...descuento,
                    name: descuento.id == 1 ? 'Entradas' : 'Hospedaje'
                }
            })
            return item;
        });
        setData(res);
    }
    useAsync(getApiData, adapt, () => { });
    return (
        <>
            <Title level={1}>Membresias</Title>
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
                    <List.Item key={item.id}>
                        <Card title={item.nombre}
                        >
                            <p>{item.descripcion}</p>
                            <Title level={5}>Descuentos:</Title>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>

                            {
                                item.descuentos.map((descuento: any, index:number) => {
                                    return (
                                        <div style={{
                                            marginRight: '1rem',
                                        }}
                                            key={index}
                                        >
                                            <p>{descuento.name}</p>
                                            <strong><p>{descuento.value}%</p></strong>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

const style = {
    
}

export default Membresia