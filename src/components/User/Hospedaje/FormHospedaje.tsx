import { Button, Card, Col, Form, Input, Row, Select, Divider, DatePicker } from 'antd';
import './FormHospedaje.css';


import { Typography } from "antd";
import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllTiposAdiciones } from '@services/tipos-adiciones-alojamiento.service';
import { GetAllTiposAlojamiento } from '@services/tipos-alojamiento.service';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FormHospedaje = () => {
    const [form] = Form.useForm();
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [tiposAdiciones, setTiposAdiciones] = useState([]);
    const [total, setTotal] = useState(0);
    const [valorAlojamiento, setValorAlojamiento] = useState(0);
    const [valorAdiciones, setValorAdiciones] = useState(0);
    const { loading, callEndpoint } = useFetchAndLoad();
    const rules = {
        'tipoAlojamientoId': [{ required: true, message: 'Seleccione un tipo de alojamiento' }],
        'fechas': [{ required: true, message: 'Seleccione una fecha' }],
        'numeroPersonas': [{ required: true, message: 'Ingrese el numero de personas' }],
    }

    const onFinish = async (values: any) => {
        const data = {
            cantidadDias: calcCantidadDias(values),
            tipoAlojamientoId: values.tipoAlojamientoId,
            fechaInicio: values.fechas[0].format('YYYY-MM-DD'),
            fechaFin: values.fechas[1].format('YYYY-MM-DD'),
            numeroPersonas: Number(values.numeroPersonas),
            valor: calcValorTipoAlojamiento() / calcCantidadDias(values),
            valorTotal: calcValorTotal(),
            adiciones: values.adiciones,
        }
        console.log(data);
    };

    const calcCantidadDias = (values: any) => {

        if (values?.fechas && values.fechas.length > 0) {
            const start = values.fechas[0];
            const end = values.fechas[1];
            return (end.diff(start, 'days') + 1);
        }
        return 0;

    };

    const onFinishFailed = (errorInfo: any) => {
    };

    const getListTiposAdiciones = async () => await callEndpoint(GetAllTiposAdiciones());

    const adaptListTiposAdiciones = async (res: any) => {
        setTiposAdiciones(res);
    }

    const getListTiposAlojamientos = async () => await callEndpoint(GetAllTiposAlojamiento());

    const adaptListTiposAlojamientos = async (res: any) => {
        setTiposAlojamiento(res);
    }

    useAsync(getListTiposAdiciones, adaptListTiposAdiciones, () => { });
    useAsync(getListTiposAlojamientos, adaptListTiposAlojamientos, () => { });

    const calcValorAdiciones = () => {
        const values = form.getFieldsValue();
        if (values?.adiciones && values.adiciones.length > 0) {
            const adiciones = tiposAdiciones.filter((x: any) => values.adiciones.includes(x.id));
            return adiciones.reduce((anterior: any, actual: any) => {
                return anterior + actual.valor;
            }, 0);
        }
        return 0;
    }

    const calcValorTipoAlojamiento = () => {
        const values = form.getFieldsValue();
        const alojamiento: any = tiposAlojamiento.find((x: any) => values.tipoAlojamientoId == x.id);
        const cantidadDias = calcCantidadDias(values);

        return alojamiento ? alojamiento.valor * cantidadDias : 0;
    }

    const calcValorTotal = () => {
        return calcValorAdiciones() + calcValorTipoAlojamiento();
    }

    const calcValores = () => {
        setValorAdiciones(calcValorAdiciones());
        setValorAlojamiento(calcValorTipoAlojamiento());
        setTotal(calcValorTotal());
    }



    return (
        <div id="container-hospedaje">
            <Card>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    id="container-form-hospedaje"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='tipoAlojamientoId' label="Tipo de alojamiento" rules={rules.tipoAlojamientoId} >
                                <Select style={{ width: '100%' }} onChange={calcValores} >
                                    {tiposAlojamiento.map((item: any) => (<Option key={item.id} value={item.id}>{item.nombre} - ${item.valor}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='numeroPersonas' label="Numero de personas" rules={rules.numeroPersonas} >
                                <Input type='number' min="1" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='fechas' label="Fecha de ingreso y salida" rules={rules.fechas} >
                                <RangePicker style={{ width: '100%' }} onChange={calcValores} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item  label="Cantidad de dias" >
                                <Input type='number' value={calcCantidadDias(form.getFieldsValue())} disabled    />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name='adiciones' label="Adiciones"  >
                                <Select style={{ width: '100%' }}
                                    mode="multiple"
                                    allowClear
                                    onChange={calcValores}
                                >
                                    {tiposAdiciones.map((item: any) => (<Option key={item.id} value={item.id}>{item.nombre} - ${item.valor}</Option>))}
                                </Select>
                            </Form.Item>

                        </Col>

                    </Row>
                    <Form.Item style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" htmlType="submit" >
                            Reservar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card id="container-total-info">
                <Title level={2}>Resumen</Title>
                <Divider />
                <Title level={4}>Tipo Alojamiento x Dias: ${valorAlojamiento}</Title>
                <Divider />
                <Title level={4}>Adiciones: ${valorAdiciones}</Title>
                <Divider />
                <Title level={4}>Total: ${total}</Title>
            </Card>
        </div>
    )
}

export default FormHospedaje