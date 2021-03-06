import { useAsync } from "@hooks/useAsync";
import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { Button, Card, List, notification, Typography } from "antd";
import { useState } from "react";
import { GetAllTiposMembresia } from '../../services/tipos-membresia.service';
import { GetTiposDescuentos } from '@services/tipos-membresia.service';
import { CreateMembresia } from "@services/membresia.service";
import { useAuth } from "@hooks/useAuth";

const { Title } = Typography;


const Membresia = () => {
    const { user } = useAuth();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);
    const [listDescuentos, setListDescuentos] = useState<any>([]);


    const getApiData = async () => await callEndpoint(GetAllTiposMembresia());

    const adapt = (res: any) => {
        res = res.map((item: any) => {
            item.descuentos = item.descuentos.map((descuento: any) => {
                return {
                    ...descuento,
                    name: descuento.type == 1 ? 'Entradas' : 'Hospedaje'
                }
            })
            return item;
        });
        setData(res);
    }
    
    const adquirirMembresia = async (membresia:any) => {
        const start = new Date();
        const end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
        const data = {
            valor: membresia.valor,
            descuentos: membresia.descuentos,
            fechaInicio: start,
            fechaFin: end,
            tipoMembresiaId: membresia.id,
        };
        await callEndpoint(CreateMembresia(data));
        notification['success']({
            message: 'Membresia adquirida correctamente',
          });
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
                            <Button style={{width:'100%'}} type="primary" disabled={!user.accessToken} onClick={() => adquirirMembresia(item)} >{'Adquirir por: $'+item.valor}</Button>
                            {
                                !user.accessToken && (
                                    <p style={{textAlign: 'center'}}>Para adquirir una membresia debes iniciar sesion</p>
                                )
                            }
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