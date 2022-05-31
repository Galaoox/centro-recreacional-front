import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetMembresiaUsuario } from '@services/membresia.service';
import { Card, Typography, Row, Col, Table } from 'antd';
import { useState } from 'react';

const { Title } = Typography;


const InfoMembresia = () => {

    const [data, setData] = useState<any>(null);
    const { loading, callEndpoint } = useFetchAndLoad();

    const getData = async () => await callEndpoint(GetMembresiaUsuario());

    const adaptData = (res: any) => {
        setData(res);
    };

    useAsync(getData, adaptData, () => { });

    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Porcentaje de descuento',
            dataIndex: 'value',
            key: 'value',
        }
    ];

    return (
        <>
            <Title level={2}>Informacion Membresia</Title>
            <Card>
                {
                    data && (
                        <Row>
                            <Col span={12}>
                                <p><strong>Nombre:</strong> {data.tipoMembresia.nombre}</p>
                                <p><strong>Valor:</strong> {data.valor}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Fecha Inicio:</strong> {data.fechaInicio}</p>
                                <p><strong>Fecha Fin:</strong> {data.fechaFin}</p>
                            </Col>

                            <Col span={24}>
                                <Table dataSource={data.descuentos} columns={columns} />
                            </Col>






                        </Row>
                    )
                }
            </Card>
        </>
    )
}

export default InfoMembresia