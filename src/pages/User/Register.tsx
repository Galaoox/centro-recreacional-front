import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Card, Typography, Divider, Row, Col, Select } from 'antd';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllTiposDocumento } from '@services/tipos-documento.service';
import { useAsync } from '@hooks/useAsync';
import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [listDocumentos, setListDocumentos] = useState([]);
    const auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();



    const onFinish = async (values: any) => {
        auth.register(values, () => {
            return navigate('/');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const rulesForm = {
        nombre1: [{ required: true, message: 'El primer nombre es requerido' }],
        apellido1: [{ required: true, message: 'El primer apellido es requerido' }],
        documento: [{ required: true, message: 'El documento es requerido' }],
        correoElectronico: [{ required: true, message: 'El correo electronico es requerido' }],
        contrasena: [{ required: true, message: 'La contrasena es requerida' },],
        tipoDocumentoId: [{ required: true, message: 'El tipo de documento es requerido' }],
    }

    const getDataListTiposDocumentos = async () => await callEndpoint(GetAllTiposDocumento());

    const adaptTiposDocumentos = async (res: any) => {
        setListDocumentos(res);
    }

    useAsync(getDataListTiposDocumentos, adaptTiposDocumentos, () => { });

    return (
        <>
            <Card
                style={{
                    width: '50%',
                    margin: 'auto',
                }}>
                <Title style={{ textAlign: 'center' }}>Registro de usuario</Title>
                <Divider />
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='nombre1' label="Primer nombre" rules={rulesForm.nombre1}>
                                <Input type='text'  maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='nombre2' label="Segundo nombre" >
                                <Input type='text' maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='apellido1' label="Primer apellido" rules={rulesForm.apellido1}>
                                <Input type='text'  maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='apellido2' label="Segundo apellido" >
                                <Input type='text' maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='tipoDocumentoId' label="Tipo de documento" rules={rulesForm.tipoDocumentoId}>
                                <Select style={{ width: '100%' }} >
                                    {listDocumentos.map((item: any) => (<Option key={item.id} value={item.id}>{item.nombre}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='documento' label="Numero de documento" rules={rulesForm.documento} >
                                <Input type='text' maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name='correoElectronico' label="Correo electronico" rules={rulesForm.correoElectronico}>
                                <Input type='email' maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name='contrasena' label="Contrasena" rules={rulesForm.contrasena} >
                                <Input type='password' maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" htmlType="submit" >
                            Registrarse
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Register