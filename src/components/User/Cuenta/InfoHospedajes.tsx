import React, { useState } from 'react'
import { Card, List, Typography, Row, Col, Divider, Table } from 'antd';
import { useAsync } from '@hooks/useAsync';
import { GetAllHospedajesByUsuario } from '@services/hospedaje.service';
import useFetchAndLoad from '@hooks/useFetchAndLoad';

const { Title } = Typography;


const InfoHospedajes = () => {
    const [data, setData] = useState([]);
    const { loading, callEndpoint } = useFetchAndLoad();

    const getData = async () => await callEndpoint(GetAllHospedajesByUsuario());

    const adaptData = (res: any) => {
        setData(res);
    };

    useAsync(getData, adaptData, () => { });


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        }
    ];

    return (
        <>
            <Title level={2}>Informacion Hospedajes</Title>
            <List
                itemLayout="vertical"
                size="large"
                grid={{ gutter: 16, column: 1 }}
                dataSource={data}

                renderItem={(item: any) => (
                    <List.Item
                        key={item.id}

                    >
                        <Card>

                            <Row>
                                <Col span={8}>
                                    <p><strong>Tipo Alojamiento:</strong> {item.tipoAlojamiento.nombre}</p>
                                    <p><strong>Valor Alojamiento:</strong> {item.tipoAlojamiento.valor}</p>
                                </Col>

                                <Col span={8}>
                                    <p><strong>Fecha ingreso:</strong> {item.fechaIngreso}</p>
                                    <p><strong>Fecha salida:</strong> {item.fechaSalida}</p>
                                </Col>
                                <Col span={8}>
                                    <p><strong>Numero de personas:</strong> {item.numeroPersonas}</p>
                                    <p><strong>Cantidad de dias:</strong> {item.cantidadDias}</p>
                                </Col>
                                <Col span={24}>
                                    <Title level={5}>Total pagado:{item.valorTotal}</Title>
                                </Col>
                                <Col span={24}>
                                    <Title level={5}>Adiciones:</Title>
                                    <Table dataSource={item.adiciones} columns={columns} />
                                </Col>
                            </Row>



                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default InfoHospedajes