import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllHorarios } from '@services/horarios.service';
import { Card, Col, Divider, List, Row, Typography } from 'antd';
import { useState } from 'react';
const { Title } = Typography;


const Horarios = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);

    const getApiData = async () => await callEndpoint(GetAllHorarios());

    const adaptHorarios = (horarios: any) => {
        setData(horarios);
    }

    useAsync(getApiData, adaptHorarios, () => { });


    return (
        <>
            <Title level={1}>Horarios</Title>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 4,
                }}
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card title={item.nombre}>
                            <p>{item.descripcion}</p>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={12}>
                                <Title level={5}>Hora inicial: </Title> {item.horaInicial}
                                </Col>

                                <Col span={12}>
                                <Title level={5}>Hora Final: </Title>{item.horaFinal}
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Horarios